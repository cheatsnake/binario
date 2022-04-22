import {
    arrayFromLength,
    countSubstring,
    getRandomBoolean,
    getRandomNumber,
} from "./helpers";

export enum FieldValues {
    ZERO = "0",
    ONE = "1",
    EMPTY = "x",
}

export function generateField(size: number): string[][] | null {
    const field = [];
    const columns = arrayFromLength(size);
    let rows = generateRows(size);
    let index: number, row: string;

    for (let i = 0; i < size; i++) {
        if (i > 1) {
            let nextRowPattern = defineNextRow(columns);
            if (i == size - 1) {
                // last row
                row = nextRowPattern;
                field.push(row);
                return splitFieldIntoTiles(field);
            } else {
                const filteredRows = filteringRows(rows, nextRowPattern);
                index = getRandomNumber(filteredRows.length - 1);
                row = filteredRows[index];
                if (!row) return null; // Dead end random (5-10% chance)
                index = rows.indexOf(row);
            }
        } else {
            index = getRandomNumber(rows.length - 1);
            row = rows[index];
        }

        field.push(row);

        for (let j = 0; j < row.length; j++) {
            columns[j] += row[j]; // Update columns
        }

        switch (index) {
            case 0:
                rows = rows.splice(1);
                break;
            case rows.length - 1:
                rows.pop();
                break;
            default:
                rows = [...rows.slice(0, index), ...rows.slice(index + 1)];
                break;
        }
    }
}

function generateRows(size: number) {
    const rows: string[] = [];
    const max = 2 ** size;

    for (let i = 0; i < max; i++) {
        const str = i.toString(2).padStart(size, FieldValues.ZERO).toString();

        if (
            str.includes(FieldValues.ZERO.repeat(3)) ||
            str.includes(FieldValues.ONE.repeat(3)) ||
            countSubstring(str, FieldValues.ZERO) > size / 2 ||
            countSubstring(str, FieldValues.ONE) > size / 2
        )
            continue;
        rows.push(str);
    }
    return rows;
}

function defineNextRow(columns: string[]) {
    let nextRow = "";

    for (let i = 0; i < columns.length; i++) {
        if (columns[i].slice(-2) == FieldValues.ZERO.repeat(2)) {
            nextRow += FieldValues.ONE;
        } else if (columns[i].slice(-2) == FieldValues.ONE.repeat(2)) {
            nextRow += FieldValues.ZERO;
        } else if (
            countSubstring(columns[i], FieldValues.ZERO) ==
            columns.length / 2
        ) {
            nextRow += FieldValues.ONE;
        } else if (
            countSubstring(columns[i], FieldValues.ONE) ==
            columns.length / 2
        ) {
            nextRow += FieldValues.ZERO;
        } else {
            nextRow += FieldValues.EMPTY;
        }
    }

    return nextRow;
}

function filteringRows(rows: string[], pattern: string) {
    const filteredRows = rows.filter((row: string) => {
        let isNextRow = true;
        for (let i = 0; i < rows.length; i++) {
            if (pattern[i] == FieldValues.EMPTY) continue;
            if (row.split("")[i] != pattern[i]) {
                isNextRow = false;
                break;
            }
        }
        return isNextRow;
    });

    return filteredRows;
}

function splitFieldIntoTiles(field: string[]) {
    const splittedField: string[][] = [];
    for (let i = 0; i < field.length; i++) {
        const splittedRow: string[] = [];
        for (let j = 0; j < field[i].length; j++) {
            splittedRow.push(field[i][j]);
        }
        splittedField.push(splittedRow);
    }
    return splittedField;
}

export function prepareField(field: string[][], fillFactor: number) {
    const preparedField: string[][] = [];
    for (let i = 0; i < field.length; i++) {
        const preparedRow: string[] = [];
        for (let j = 0; j < field[i].length; j++) {
            getRandomBoolean(fillFactor)
                ? preparedRow.push(field[i][j])
                : preparedRow.push(FieldValues.EMPTY);
        }
        preparedField.push(preparedRow);
    }

    return preparedField;
}
