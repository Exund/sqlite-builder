import { Column } from "./Column";
import { TableConstraint } from "./TableConstraints";

interface TableOptions {
    schema_name?: string;
    name: string;
    columns: Array<Column>;
    constraints?: Array<TableConstraint>;
    isTemporary?: boolean;
    checkForExists?: boolean;
}

export class Table implements TableOptions {
    schema_name?: string;
    name: string;
    columns: Array<Column>;
    constraints: Array<TableConstraint>;
    isTemporary: boolean;
    checkForExists: boolean;

    constructor({
        name,
        schema_name,
        columns,
        constraints = [],
        isTemporary = false,
        checkForExists = true
    }: TableOptions) {
        this.name = name;
        this.schema_name = schema_name;
        this.columns = columns;
        this.constraints = constraints;
        this.isTemporary = isTemporary;
        this.checkForExists = checkForExists;
    }

    build(): string {
        return `CREATE${this.isTemporary ? " TEMPORARY" : ""} TABLE${this.checkForExists ? " IF NOT EXISTS" : ""} ${this.schema_name ? `${this.schema_name}.` : ""}${this.name} (
            ${this.columns.map(c => c.build()).concat(this.constraints.map(c => c.build())).join(",")}
        )`;
    }
}