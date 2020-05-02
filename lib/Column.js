"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Column {
    constructor({ name, type, constraints = [] }) {
        this.name = name;
        this.type = type;
        this.constraints = constraints;
    }
    build() {
        return `${this.name} ${this.type}${this.constraints.map(c => c.build()).join(" ")}`;
    }
}
exports.Column = Column;
var ColumnType;
(function (ColumnType) {
    ColumnType["BIGINT"] = "BIGINT";
    ColumnType["BLOB"] = "BLOB";
    ColumnType["BOOLEAN"] = "BOOLEAN";
    ColumnType["CHAR"] = "CHAR";
    ColumnType["DATE"] = "DATE";
    ColumnType["DATETIME"] = "DATETIME";
    ColumnType["DECIMAL"] = "DECIMAL";
    ColumnType["DOUBLE"] = "DOUBLE";
    ColumnType["INT"] = "INT";
    ColumnType["INTEGER"] = "INTEGER";
    ColumnType["NONE"] = "NONE";
    ColumnType["NUMERIC"] = "NUMERIC";
    ColumnType["REAL"] = "REAL";
    ColumnType["STRING"] = "STRING";
    ColumnType["TEXT"] = "TEXT";
    ColumnType["TIME"] = "TIME";
    ColumnType["VARCHAR"] = "VARCHAR";
})(ColumnType = exports.ColumnType || (exports.ColumnType = {}));
