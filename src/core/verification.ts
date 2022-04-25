import {
    BALANCE_ERROR,
    DUPLICATION_ERROR,
    TRIPLE_ERROR,
} from "../constants/error.constants";
import {
    TileValues,
    VerificationErrorType,
    VerificationResult,
} from "../types";
import { countSubstring } from "./helpers";

export function verifyField(field: string[][]): VerificationResult {
    let result: VerificationResult = {
        isError: false,
        type: null,
        message: null,
        position: [],
    };

    const rows: string[] = [];
    const columns: string[] = [];

    // Transform rows & columns into strings
    for (let i = 0; i < field.length; i++) {
        const row = field[i].join("");
        let column = "";
        for (let j = 0; j < field.length; j++) {
            column += field[j][i];
        }
        rows.push(row);
        columns.push(column);
    }

    const duplicationRows = checkDuplication(rows, "row");
    if (duplicationRows.length) {
        return defineError("duplicate", DUPLICATION_ERROR, duplicationRows);
    }

    const duplicationColumns = checkDuplication(columns, "col");
    if (duplicationColumns.length) {
        return defineError("duplicate", DUPLICATION_ERROR, duplicationColumns);
    }

    // check columns
    for (let i = 0; i < columns.length; i++) {
        const isTripled = checkTripleTiles(columns[i]);
        if (isTripled) return defineError("triple", TRIPLE_ERROR, [`col-${i}`]);
        const isBalanced = checkBalance(columns[i]);
        if (isBalanced)
            return defineError("balance", BALANCE_ERROR, [`col-${i}`]);
    }

    // check rows
    for (let i = 0; i < rows.length; i++) {
        const isTripled = checkTripleTiles(rows[i]);
        if (isTripled) return defineError("triple", TRIPLE_ERROR, [`row-${i}`]);
        const isBalanced = checkBalance(rows[i]);
        if (isBalanced)
            return defineError("balance", BALANCE_ERROR, [`row-${i}`]);
    }

    return result;
}

function checkTripleTiles(line: string): boolean {
    const result =
        line.includes(TileValues.ZERO.repeat(3)) ||
        line.includes(TileValues.ONE.repeat(3));
    return result;
}

function checkBalance(line: string): boolean {
    const zeros = countSubstring(line, TileValues.ZERO);
    const ones = countSubstring(line, TileValues.ONE);
    const result = !(zeros === ones);
    return result;
}

function checkDuplication(lines: string[], type: string): string[] {
    let position: string[] = [];
    for (let i = 0; i < lines.length; i++) {
        for (let j = i + 1; j < lines.length; j++) {
            if (lines[i] === lines[j]) {
                position.push(`${type}-${i}`, `${type}-${j}`);
            }
        }
        if (position.length) break;
    }
    return position;
}

function defineError(
    type: VerificationErrorType,
    message: string,
    position: string[]
): VerificationResult {
    return {
        isError: true,
        type,
        message,
        position,
    };
}
