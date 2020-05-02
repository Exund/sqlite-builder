"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Column_1 = require("./Column");
var TableConstraintType;
(function (TableConstraintType) {
    TableConstraintType["PrimaryKey"] = "PRIMARY KEY";
    TableConstraintType["Unique"] = "UNIQUE";
    TableConstraintType["Check"] = "CHECK";
    TableConstraintType["ForeignKey"] = "FOREIGN KEY";
})(TableConstraintType || (TableConstraintType = {}));
class TableConstraint {
}
exports.TableConstraint = TableConstraint;
class PrimaryKeyOrUnique extends TableConstraint {
    constructor({ name, columns, onConflict }) {
        super();
        this.columns = [];
        this.name = name;
        this.columns = columns;
        this.onConflict = onConflict;
    }
    build() {
        return `${this.name ? `CONSTRAINT ${this.name} ` : ""} ${this.constructor.type} (${this.columns.map((c) => {
            if (c instanceof Column_1.Column) {
                return c.name;
            }
            return c;
        }).join(",")})${this.onConflict ? ` ${this.onConflict}` : ""}`;
    }
}
class PrimaryKeyConstraint extends PrimaryKeyOrUnique {
}
exports.PrimaryKeyConstraint = PrimaryKeyConstraint;
PrimaryKeyConstraint.type = TableConstraintType.PrimaryKey;
class UniqueConstraint extends PrimaryKeyOrUnique {
}
exports.UniqueConstraint = UniqueConstraint;
UniqueConstraint.type = TableConstraintType.Unique;
class CheckConstraint extends TableConstraint {
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
CheckConstraint.type = TableConstraintType.Check;
class ForeignKeyConstraint extends TableConstraint {
    constructor({ name, columns, foreignKey }) {
        super();
        this.name = name;
        this.columns = columns;
        this.foreignKey = foreignKey;
    }
    build() {
        return `${this.name ? `CONSTRAINT ${this.name} ` : ""} ${this.constructor.type} (${this.columns.map((c) => {
            if (c instanceof Column_1.Column) {
                return c.name;
            }
            return c;
        }).join(",")}) ${this.foreignKey.build()}`;
    }
}
exports.ForeignKeyConstraint = ForeignKeyConstraint;
ForeignKeyConstraint.type = TableConstraintType.ForeignKey;
