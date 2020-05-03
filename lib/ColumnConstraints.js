"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ColumnConstraintType;
(function (ColumnConstraintType) {
    ColumnConstraintType["PrimaryKey"] = "PRIMARY KEY";
    ColumnConstraintType["NotNull"] = "NOT NULL";
    ColumnConstraintType["Unique"] = "UNIQUE";
    ColumnConstraintType["Check"] = "CHECK";
    ColumnConstraintType["Default"] = "DEFAULT";
    ColumnConstraintType["Collate"] = "COLLATE";
    ColumnConstraintType["ForeignKey"] = "";
})(ColumnConstraintType || (ColumnConstraintType = {}));
class ColumnConstraint {
}
exports.ColumnConstraint = ColumnConstraint;
var PrimaryKeySortType;
(function (PrimaryKeySortType) {
    PrimaryKeySortType["Asc"] = "ASC";
    PrimaryKeySortType["Desc"] = "DESC";
})(PrimaryKeySortType = exports.PrimaryKeySortType || (exports.PrimaryKeySortType = {}));
class PrimaryKeyConstraint extends ColumnConstraint {
    constructor({ name, onConflict, sort, autoIncrement = false }) {
        super();
        this.name = name;
        this.onConflict = onConflict;
        this.sort = sort;
        this.autoIncrement = autoIncrement;
    }
    build() {
        return `${this.name ? `CONSTRAINT ${this.name} ` : ""} ${this.constructor.type}${this.sort ? ` ${this.sort}` : ""}${this.onConflict ? ` ${this.onConflict}` : ""}${this.autoIncrement ? " AUTOINCREMENT" : ""}`;
    }
}
exports.PrimaryKeyConstraint = PrimaryKeyConstraint;
PrimaryKeyConstraint.type = ColumnConstraintType.PrimaryKey;
class NotNullOrUniqueConstraint extends ColumnConstraint {
    constructor({ name, onConflict } = {}) {
        super();
        this.name = name;
        this.onConflict = onConflict;
    }
    build() {
        return `${this.name ? `CONSTRAINT ${this.name} ` : ""} ${this.constructor.type}${this.onConflict ? ` ${this.onConflict}` : ""}`;
    }
}
class NotNullConstraint extends NotNullOrUniqueConstraint {
}
exports.NotNullConstraint = NotNullConstraint;
NotNullConstraint.type = ColumnConstraintType.NotNull;
class UniqueConstraint extends NotNullOrUniqueConstraint {
}
exports.UniqueConstraint = UniqueConstraint;
UniqueConstraint.type = ColumnConstraintType.Unique;
class CheckConstraint extends ColumnConstraint {
    constructor({ name, expr }) {
        super();
        this.name = name;
        this.expr = expr;
    }
    build() {
        return `${this.name ? `CONSTRAINT ${this.name} ` : ""} ${this.constructor.type} (${this.expr})`;
    }
}
exports.CheckConstraint = CheckConstraint;
CheckConstraint.type = ColumnConstraintType.Check;
class CollateConstraint extends ColumnConstraint {
    constructor({ name, collationName }) {
        super();
        this.name = name;
        this.collationName = collationName;
    }
    build() {
        return `${this.name ? `CONSTRAINT ${this.name} ` : ""} ${this.constructor.type} ${this.collationName}`;
    }
}
exports.CollateConstraint = CollateConstraint;
CollateConstraint.type = ColumnConstraintType.Collate;
class ForeignKeyConstraint extends ColumnConstraint {
    constructor({ name, foreignKey }) {
        super();
        this.name = name;
        this.foreignKey = foreignKey;
    }
    build() {
        return `${this.name ? `CONSTRAINT ${this.name} ` : ""} ${this.constructor.type} ${this.foreignKey.build()}`;
    }
}
exports.ForeignKeyConstraint = ForeignKeyConstraint;
ForeignKeyConstraint.type = ColumnConstraintType.ForeignKey;
