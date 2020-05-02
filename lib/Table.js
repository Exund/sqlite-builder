"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Table {
    constructor({ name, schema_name, columns, constraints = [], isTemporary = false, checkForExists = true }) {
        this.name = name;
        this.schema_name = schema_name;
        this.columns = columns;
        this.constraints = constraints;
        this.isTemporary = isTemporary;
        this.checkForExists = checkForExists;
    }
    build() {
        return `CREATE${this.isTemporary ? " TEMPORARY" : ""} TABLE${this.checkForExists ? " IF NOT EXISTS" : ""} ${this.schema_name ? `${this.schema_name}.` : ""}${this.name} (
            ${this.columns.map(c => c.build()).concat(this.constraints.map(c => c.build())).join(",")}
        )`;
    }
}
exports.Table = Table;
