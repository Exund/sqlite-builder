"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Table_1 = require("./Table");
const Column_1 = require("./Column");
var Triggers;
(function (Triggers) {
    Triggers["Delete"] = "ON DELETE";
    Triggers["Update"] = "ON UPDATE";
})(Triggers = exports.Triggers || (exports.Triggers = {}));
var Actions;
(function (Actions) {
    Actions["SetNull"] = "SET NULL";
    Actions["SetDefault"] = "SET DEFAULT";
    Actions["Cascade"] = "CASCADE";
    Actions["Restrict"] = "RESTRICT";
    Actions["NoAction"] = "NO ACTION";
})(Actions = exports.Actions || (exports.Actions = {}));
var DeferrableTypes;
(function (DeferrableTypes) {
    DeferrableTypes["Deferred"] = "INITIALLY DEFERRED";
    DeferrableTypes["Immediate"] = "INITIALLY IMMEDIATE";
})(DeferrableTypes || (DeferrableTypes = {}));
class ForeignKey {
    constructor({ table, columns, events }) {
        this.table = table;
        this.columns = columns;
        this.events = events;
    }
    build() {
        let columns_strings = this.columns.map(v => v instanceof Column_1.Column ? v.name : v);
        let events_strings = this.events.map(e => `${e.trigger} ${e.action}`);
        return `REFERENCES ${this.table instanceof Table_1.Table ? this.table.name : this.table}${columns_strings.length ? ` (${columns_strings.join(",")})` : ""} ${events_strings.join(" ")}`;
    }
}
exports.ForeignKey = ForeignKey;
