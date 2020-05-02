import { Table } from "./Table";
import { Column } from "./Column";

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

enum DeferrableTypes {
    Deferred = "INITIALLY DEFERRED",
    Immediate = "INITIALLY IMMEDIATE"
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

    constructor({
        table,
        columns,
        events
    } : ForeignKeyOptions) {
        this.table = table;
        this.columns = columns;
        this.events = events;
    }

    build(): string {
        let columns_strings = this.columns.map(v => v instanceof Column ? v.name : v);
        let events_strings = this.events.map(e => `${e.trigger} ${e.action}`);
        return `REFERENCES ${this.table instanceof Table ? this.table.name : this.table}${columns_strings.length ? ` (${columns_strings.join(",")})` : ""} ${events_strings.join(" ")}`;
    }
}