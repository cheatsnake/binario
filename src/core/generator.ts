import {
    arrayFromLength,
    countSubstring,
    getRandomBoolean,
    getRandomNumber,
} from "./helpers";

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
        const str = i.toString(2).padStart(size, "0").toString();

        if (
            str.includes("000") ||
            str.includes("111") ||
            countSubstring(str, "0") > size / 2 ||
            countSubstring(str, "1") > size / 2
        )
            continue;
        rows.push(str);
    }
    return rows;
}

function defineNextRow(columns: string[]) {
    let nextRow = "";

    for (let i = 0; i < columns.length; i++) {
        if (columns[i].slice(-2) == "00") {
            nextRow += "1";
        } else if (columns[i].slice(-2) == "11") {
            nextRow += "0";
        } else if (countSubstring(columns[i], "0") == columns.length / 2) {
            nextRow += "1";
        } else if (countSubstring(columns[i], "1") == columns.length / 2) {
            nextRow += "0";
        } else {
            nextRow += "x";
        }
    }

    return nextRow;
}

function filteringRows(rows: string[], pattern: string) {
    const filteredRows = rows.filter((row: string) => {
        let isNextRow = true;
        for (let i = 0; i < rows.length; i++) {
            if (pattern[i] == "x") continue;
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
                : preparedRow.push("x");
        }
        preparedField.push(preparedRow);
    }

    return preparedField;
}
