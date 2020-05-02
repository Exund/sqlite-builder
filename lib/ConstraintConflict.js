"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Conflict;
(function (Conflict) {
    Conflict["Rollback"] = "ON CONFLICT ROLLBACK";
    Conflict["Abort"] = "ON CONFLICT ABORT";
    Conflict["Fail"] = "ON CONFLICT FAIL";
    Conflict["Ignore"] = "ON CONFLICT IGNORE";
    Conflict["Replace"] = "ON CONFLICT REPLACE";
})(Conflict = exports.Conflict || (exports.Conflict = {}));
