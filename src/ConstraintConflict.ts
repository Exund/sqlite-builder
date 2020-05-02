export enum Conflict {
    Rollback = "ON CONFLICT ROLLBACK",
    Abort = "ON CONFLICT ABORT",
    Fail = "ON CONFLICT FAIL",
    Ignore = "ON CONFLICT IGNORE",
    Replace = "ON CONFLICT REPLACE"
}