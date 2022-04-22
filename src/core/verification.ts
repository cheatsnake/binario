import {
    BALANCE_ERROR,
    DUPLICATION_ERROR,
    TRIPLE_ERROR,
} from "../constants/error.constants";
import type { VerificationErrorType, VerificationResult } from "../types";
import { FieldValues } from "./generator";
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

    const duplicationRows = checkDuplication(rows);
    if (duplicationRows.length) {
        return defineError("duplicate", DUPLICATION_ERROR, [
            duplicationRows,
            [0],
        ]);
    }

    const duplicationColumns = checkDuplication(columns);
    if (duplicationColumns.length) {
        return defineError("duplicate", DUPLICATION_ERROR, [
            [0],
            duplicationColumns,
        ]);
    }

    // check columns
    for (let i = 0; i < columns.length; i++) {
        const isTripled = checkTripleTiles(columns[i]);
        if (isTripled) return defineError("triple", TRIPLE_ERROR, [[0], [i]]);
        const isBalanced = checkBalance(columns[i]);
        if (isBalanced)
            return defineError("balance", BALANCE_ERROR, [[0], [i]]);
    }

    // check rows
    for (let i = 0; i < rows.length; i++) {
        const isTripled = checkTripleTiles(rows[i]);
        if (isTripled) return defineError("triple", TRIPLE_ERROR, [[i], [0]]);
        const isBalanced = checkBalance(rows[i]);
        if (isBalanced)
            return defineError("balance", BALANCE_ERROR, [[i], [0]]);
    }

    return result;
}

function checkTripleTiles(line: string): boolean {
    const result =
        line.includes(FieldValues.ZERO.repeat(3)) ||
        line.includes(FieldValues.ONE.repeat(3));
    return result;
}

function checkBalance(line: string): boolean {
    const zeros = countSubstring(line, FieldValues.ZERO);
    const ones = countSubstring(line, FieldValues.ONE);
    const result = !(zeros === ones);
    return result;
}

function checkDuplication(lines: string[]): number[] {
    let position: number[] = [];
    for (let i = 0; i < lines.length; i++) {
        for (let j = i + 1; j < lines.length; j++) {
            if (lines[i] === lines[j]) {
                position.push(i, j);
            }
        }
    }
    return position;
}

function defineError(
    type: VerificationErrorType,
    message: string,
    position: number[][]
): VerificationResult {
    return {
        isError: true,
        type,
        message,
        position,
    };
}
