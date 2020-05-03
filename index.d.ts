declare module 'sqlite-builder' {
    export enum Conflict {
        Rollback = "ON CONFLICT ROLLBACK",
        Abort = "ON CONFLICT ABORT",
        Fail = "ON CONFLICT FAIL",
        Ignore = "ON CONFLICT IGNORE",
        Replace = "ON CONFLICT REPLACE"
    }

    interface TableOptions {
        schema_name?: string;
        name: string;
        columns: Array<Column>;
        constraints?: Array<TableConstraints.TableConstraint>;
        isTemporary?: boolean;
        checkForExists?: boolean;
    }

    export class Table implements TableOptions {
        schema_name?: string;
        name: string;
        columns: Array<Column>;
        constraints: Array<TableConstraints.TableConstraint>;
        isTemporary: boolean;
        checkForExists: boolean;
        constructor({ name, schema_name, columns, constraints, isTemporary, checkForExists }: TableOptions);
        build(): string;
    }

    interface ColumnOptions {
        name: string;
        type: ColumnType;
        constraints?: Array<ColumnConstraints.ColumnConstraint>;
    }

    export class Column implements ColumnOptions {
        name: string;
        type: ColumnType;
        constraints: Array<ColumnConstraints.ColumnConstraint>;
        constructor({ name, type, constraints }: ColumnOptions);
        build(): string;
    }

    export enum ColumnType {
        BIGINT = "BIGINT",
        BLOB = "BLOB",
        BOOLEAN = "BOOLEAN",
        CHAR = "CHAR",
        DATE = "DATE",
        DATETIME = "DATETIME",
        DECIMAL = "DECIMAL",
        DOUBLE = "DOUBLE",
        INT = "INT",
        INTEGER = "INTEGER",
        NONE = "NONE",
        NUMERIC = "NUMERIC",
        REAL = "REAL",
        STRING = "STRING",
        TEXT = "TEXT",
        TIME = "TIME",
        VARCHAR = "VARCHAR"
    }

    export enum Triggers {
        Delete = "ON DELETE",
        Update = "ON UPDATE"
    }

    export enum Actions {
        SetNull = "SET NULL",
        SetDefault = "SET DEFAULT",
        Cascade = "CASCADE",
        Restrict = "RESTRICT",
        NoAction = "NO ACTION"
    }

    interface Event {
        trigger: Triggers;
        action: Actions;
    }

    interface ForeignKeyOptions {
        table: string | Table;
        columns: Array<string | Column>;
        events: Array<Event>;
    }

    export class ForeignKey implements ForeignKeyOptions {
        table: string | Table;
        columns: (string | Column)[];
        events: Event[];
        constructor({ table, columns, events }: ForeignKeyOptions);
        build(): string;
    }

    export namespace TableConstraints {
        enum TableConstraintType {
            PrimaryKey = "PRIMARY KEY",
            Unique = "UNIQUE",
            Check = "CHECK",
            ForeignKey = "FOREIGN KEY"
        }
        interface TableConstraintOptions {
            name?: string;
        }
        export abstract class TableConstraint implements TableConstraintOptions {
            static type: TableConstraintType;
            abstract name?: string;
            abstract build(): string;
        }
        interface PrimaryKeyOrUniqueOptions extends TableConstraintOptions {
            columns: Array<string | Column>;
            onConflict?: Conflict;
        }
        class PrimaryKeyOrUnique extends TableConstraint implements PrimaryKeyOrUniqueOptions {
            name?: string;
            columns: Array<string | Column>;
            onConflict?: Conflict;
            constructor({ name, columns, onConflict }: PrimaryKeyOrUniqueOptions);
            build(): string;
        }
        export class PrimaryKeyConstraint extends PrimaryKeyOrUnique {
            static type: TableConstraintType;
        }
        export class UniqueConstraint extends PrimaryKeyOrUnique {
            static type: TableConstraintType;
        }
        interface CheckOptions extends TableConstraintOptions {
            expr: string;
        }
        export class CheckConstraint extends TableConstraint implements CheckOptions {
            static type: TableConstraintType;
            expr: string;
            name?: string;
            constructor({ name, expr }: CheckOptions);
            build(): string;
        }
        interface ForeignKeyOptions extends TableConstraintOptions {
            columns: Array<string | Column>;
            foreignKey: ForeignKey;
        }
        export class ForeignKeyConstraint extends TableConstraint implements ForeignKeyOptions {
            static type: TableConstraintType;
            name?: string | undefined;
            columns: Array<string | Column>;
            foreignKey: ForeignKey;
            constructor({ name, columns, foreignKey }: ForeignKeyOptions);
            build(): string;
        }
    }

    export namespace ColumnConstraints {
        enum ColumnConstraintType {
            PrimaryKey = "PRIMARY KEY",
            NotNull = "NOT NULL",
            Unique = "UNIQUE",
            Check = "CHECK",
            Default = "DEFAULT",
            Collate = "COLLATE",
            ForeignKey = ""
        }
        interface ColumnConstraintOptions {
            name?: string;
        }
        export abstract class ColumnConstraint implements ColumnConstraintOptions {
            static type: ColumnConstraintType;
            abstract name?: string;
            abstract build(): string;
        }
        interface ConflictOptions extends ColumnConstraintOptions {
            onConflict?: Conflict;
        }
        export enum PrimaryKeySortType {
            Asc = "ASC",
            Desc = "DESC"
        }
        interface PrimaryKeyOptions extends ConflictOptions {
            sort?: PrimaryKeySortType;
            autoIncrement?: boolean;
        }
        export class PrimaryKeyConstraint extends ColumnConstraint implements PrimaryKeyOptions {
            static type: ColumnConstraintType;
            name?: string;
            onConflict?: Conflict;
            sort?: PrimaryKeySortType;
            autoIncrement?: boolean;
            constructor({ name, onConflict, sort, autoIncrement }: PrimaryKeyOptions);
            build(): string;
        }
        class NotNullOrUniqueConstraint extends ColumnConstraint implements ConflictOptions {
            name?: string;
            onConflict?: Conflict;
            constructor({ name, onConflict }?: ConflictOptions);
            build(): string;
        }
        export class NotNullConstraint extends NotNullOrUniqueConstraint {
            static type: ColumnConstraintType;
        }
        export class UniqueConstraint extends NotNullOrUniqueConstraint {
            static type: ColumnConstraintType;
        }
        interface CheckOptions extends ColumnConstraintOptions {
            expr: string;
        }
        export class CheckConstraint extends ColumnConstraint implements CheckOptions {
            static type: ColumnConstraintType;
            name?: string;
            expr: string;
            constructor({ name, expr }: CheckOptions);
            build(): string;
        }
        interface CollateOptions extends ColumnConstraintOptions {
            collationName: string;
        }
        export class CollateConstraint extends ColumnConstraint implements CollateOptions {
            static type: ColumnConstraintType;
            name?: string;
            collationName: string;
            constructor({ name, collationName }: CollateOptions);
            build(): string;
        }
        interface ForeignKeyOptions extends ColumnConstraintOptions {
            foreignKey: ForeignKey;
        }
        export class ForeignKeyConstraint extends ColumnConstraint implements ForeignKeyOptions {
            static type: ColumnConstraintType;
            name?: string;
            foreignKey: ForeignKey;
            constructor({ name, foreignKey }: ForeignKeyOptions);
            build(): string;
        }
    }
}