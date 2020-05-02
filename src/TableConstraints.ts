import { Column } from "./Column";
import { Conflict } from "./ConstraintConflict";
import { ForeignKey } from "./ForeignKey";

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
    columns: Array<string | Column> = [];
    onConflict?: Conflict;

    constructor({
        name,
        columns,
        onConflict
    }: PrimaryKeyOrUniqueOptions) {
        super();
        this.name = name;
        this.columns = columns;
        this.onConflict = onConflict;
    }
    
    build(): string {
        return `${this.name ? `CONSTRAINT ${this.name} ` : ""} ${(this.constructor as any).type} (${this.columns.map((c) => {
            if(c instanceof Column) {
                return c.name;
            }
            return c;
        }).join(",")})${this.onConflict ? ` ${this.onConflict}`: ""}`;
    }
}

export class PrimaryKeyConstraint extends PrimaryKeyOrUnique {
    static type: TableConstraintType = TableConstraintType.PrimaryKey;
}

export class UniqueConstraint extends PrimaryKeyOrUnique {
    static type: TableConstraintType = TableConstraintType.Unique;
}

interface CheckOptions extends TableConstraintOptions {
    expr: string;
}

export class CheckConstraint extends TableConstraint implements CheckOptions {
    static type = TableConstraintType.Check;

    expr: string;
    name?: string;

    constructor({
        name,
        expr
    }: CheckOptions) {
        super();
        this.name = name;
        this.expr = expr;
    }

    build(): string {
        return `${this.name ? `CONSTRAINT ${this.name} ` : ""} ${(this.constructor as any).type} (${this.expr})`;
    }
}

interface ForeignKeyOptions extends TableConstraintOptions {
    columns: Array<string | Column>;
    foreignKey: ForeignKey;
}

export class ForeignKeyConstraint extends TableConstraint implements ForeignKeyOptions {
    static type = TableConstraintType.ForeignKey;
    
    name?: string | undefined;
    columns: Array<string | Column>;
    foreignKey: ForeignKey;

    constructor({
        name,
        columns,
        foreignKey
    }: ForeignKeyOptions) {
        super();
        this.name = name;
        this.columns = columns;
        this.foreignKey = foreignKey;
    }

    build(): string {
        return `${this.name ? `CONSTRAINT ${this.name} ` : ""} ${(this.constructor as any).type} (${this.columns.map((c) => {
            if(c instanceof Column) {
                return c.name;
            }
            return c;
        }).join(",")}) ${this.foreignKey.build()}`;
    }
}
