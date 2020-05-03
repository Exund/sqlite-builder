import { Conflict } from "./ConstraintConflict";
import { ForeignKey } from "./ForeignKey";

enum ColumnConstraintType {
    PrimaryKey = "PRIMARY KEY",
    NotNull = "NOT NULL",
    Unique = "UNIQUE",
    Check = "CHECK",
    Default = "DEFAULT",
    Collate = "COLLATE",
    ForeignKey = "",
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
    static type: ColumnConstraintType = ColumnConstraintType.PrimaryKey;

    name?: string;
    onConflict?: Conflict;
    sort?: PrimaryKeySortType;
    autoIncrement?: boolean;

    constructor({
        name,
        onConflict,
        sort,
        autoIncrement = false
    }: PrimaryKeyOptions) {
        super();
        this.name = name;
        this.onConflict = onConflict;
        this.sort = sort;
        this.autoIncrement = autoIncrement;
    }
    
    build(): string {
        return `${this.name ? `CONSTRAINT ${this.name} ` : ""} ${(this.constructor as any).type}${this.sort ? ` ${this.sort}` : ""}${this.onConflict ? ` ${this.onConflict}`: ""}${this.autoIncrement ? " AUTOINCREMENT" : ""}`;
    }
}

class NotNullOrUniqueConstraint extends ColumnConstraint implements ConflictOptions {
    name?: string;
    onConflict?: Conflict;

    constructor({
        name,
        onConflict
    }: ConflictOptions = {}) {
        super();
        this.name = name;
        this.onConflict = onConflict;
    }

    build(): string {
        return `${this.name ? `CONSTRAINT ${this.name} ` : ""} ${(this.constructor as any).type}${this.onConflict ? ` ${this.onConflict}`: ""}`;
    }
}

export class NotNullConstraint extends NotNullOrUniqueConstraint {
    static type = ColumnConstraintType.NotNull;
}

export class UniqueConstraint extends NotNullOrUniqueConstraint {
    static type = ColumnConstraintType.Unique;
}

interface CheckOptions extends ColumnConstraintOptions {
    expr: string;
}

export class CheckConstraint extends ColumnConstraint implements CheckOptions {
    static type = ColumnConstraintType.Check;

    name?: string;
    expr: string;

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

interface CollateOptions extends ColumnConstraintOptions {
    collationName: string;
}

export class CollateConstraint extends ColumnConstraint implements CollateOptions {  
    static type = ColumnConstraintType.Collate;
    
    name?: string;
    collationName: string;

    constructor({
        name,
        collationName
    }: CollateOptions) {
        super();
        this.name = name;
        this.collationName = collationName;
    }

    build(): string {
        return `${this.name ? `CONSTRAINT ${this.name} ` : ""} ${(this.constructor as any).type} ${this.collationName}`;
    }
}

interface ForeignKeyOptions extends ColumnConstraintOptions {
    foreignKey: ForeignKey;
}

export class ForeignKeyConstraint extends ColumnConstraint implements ForeignKeyOptions {
    static type = ColumnConstraintType.ForeignKey;
    
    name?: string;
    foreignKey: ForeignKey;

    constructor({
        name,
        foreignKey
    }: ForeignKeyOptions) {
        super();
        this.name = name;
        this.foreignKey = foreignKey;
    }

    build(): string {
        return `${this.name ? `CONSTRAINT ${this.name} ` : ""} ${(this.constructor as any).type} ${this.foreignKey.build()}`;
    }
}