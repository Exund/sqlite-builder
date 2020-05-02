import { ColumnConstraint } from "./ColumnConstraints";

interface ColumnOptions {
    name: string;
    type: ColumnType;
    constraints?: Array<ColumnConstraint>;
}

export class Column implements ColumnOptions {
    name: string;
    type: ColumnType;
    constraints: Array<ColumnConstraint>;

    constructor({
        name,
        type,
        constraints = []
    }: ColumnOptions) {
        this.name = name;
        this.type = type;
        this.constraints = constraints;
    }

    build(): string {
        return `${this.name} ${this.type}${this.constraints.map(c => c.build()).join(" ")}`
    }
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