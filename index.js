/*export { Table } from "./lib/Table";
export { Column, ColumnType } from "./lib/Column";
export * as TableConstraints from "./lib/TableConstraints";
export * as ColumnConstraints from "./lib/ColumnConstraints";
export * from "./lib/ForeignKey";
export * from "./lib/ConstraintConflict";*/

module.exports = {
    ...require("./lib/Table"),
    ...{ Column, ColumnType } = require("./lib/Column"),
    TableConstraints: require("./lib/TableConstraints"),
    ColumnConstraints: require("./lib/ColumnConstraints"),
    ...require("./lib/ForeignKey"),
    ...require("./lib/ConstraintConflict")
};