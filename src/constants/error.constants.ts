export const FIELD_NOT_GENERATED =
    "To call this method, a field must be generated";

export const DUPLICATION_ERROR = "All columns and rows must be unique";

export const BALANCE_ERROR =
    "Tiles of different colors should be in equal quantity on each row and column";

export const TRIPLE_ERROR =
    "No more than two consecutive tiles of the same color are allowed";

export const OUT_OF_RANGE = (line: "row" | "column") =>
    `Invalid ${line} index. Going out of range`;

export const INVALID_FILL_FACTOR =
    "Invalid fill factor. Allowable filling range is 0.2 to 0.5";
