const SIZE = 8;
const regExpZeros = new RegExp("0", "g");
const regExpOnes = new RegExp("1", "g");

const getRandomNumber = (max, min = 0) => {
    return Math.round(Math.random() * (max - min)) + min;
};

const arrayFromLength = (length) => {
    return Array.from(new Array(length).keys()).map(() => "");
};

const getRandomBoolean = (chance = 0.5) => chance > Math.random();

function generateRows(size) {
    const res = [];
    const max = 2 ** size;

    for (let i = 0; i < max; i++) {
        const str = i.toString(2).padStart(size, "0").toString();

        if (
            str.includes("000") ||
            str.includes("111") ||
            str.match(regExpZeros).length > size / 2 ||
            str.match(regExpOnes).length > size / 2
        )
            continue;
        res.push(str);
    }
    return res;
}

function defineNextRow(columns) {
    let next = "";

    columns.forEach((column) => {
        if (column.slice(-2) == "00") {
            next += "1";
        } else if (column.slice(-2) == "11") {
            next += "0";
        } else if (
            column.includes("0") &&
            column.match(regExpZeros).length == SIZE / 2
        ) {
            next += "1";
        } else if (
            column.includes("1") &&
            column.match(regExpOnes).length == SIZE / 2
        ) {
            next += "0";
        } else {
            next += "x";
        }
    });

    return next;
}

function filteringRows(rows, pattern) {
    const filteredRows = rows.filter((elem) => {
        let isNext = true;

        for (let j = 0; j < SIZE; j++) {
            if (pattern[j] == "x") continue;
            if (elem.split("")[j] != pattern[j]) {
                isNext = false;
                break;
            }
        }

        return isNext;
    });
    return filteredRows;
}

function generateField() {
    const result = [];
    const columns = arrayFromLength(SIZE);
    let rows = generateRows(SIZE);
    let index, row;

    for (let i = 0; i < SIZE; i++) {
        index = getRandomNumber(rows.length - 1);
        row = rows[index];

        if (i > 1) {
            let nextRowPattern = defineNextRow(columns);

            // last row
            if (i == SIZE - 1) {
                row = nextRowPattern;
                result.push(row);
                return result;
            } else {
                const filteredRows = filteringRows(rows, nextRowPattern);

                index = getRandomNumber(filteredRows.length - 1);
                row = filteredRows[index];

                if (!row) return false; // Dead-end random (5-10% chance)

                index = rows.indexOf(row);
            }
        }

        result.push(row);

        for (let j = 0; j < row.length; j++) {
            columns[j] += row[j]; // Update columns
        }

        if (index == 0) {
            rows = rows.splice(1);
        } else if (index == rows.length - 1) {
            rows.pop();
        } else {
            rows = [...rows.slice(0, index), ...rows.slice(index + 1)];
        }
    }
    return result;
}
const field = generateField();
console.log(field);

function prepareField(field, fillFactor = 0.33) {
    for (let i = 0; i < field.length; i++) {
        let row = "";
        for (let j = 0; j < field[i].length; j++) {
            getRandomBoolean(fillFactor) ? (row += field[i][j]) : (row += "x");
        }
        field[i] = row;
    }

    return field;
}

console.log(prepareField(field));
