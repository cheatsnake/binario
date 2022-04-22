import {
    FIELD_NOT_GENERATED,
    INVALID_FILL_FACTOR,
    OUT_OF_RANGE,
} from "../constants/error.constants";
import type { VerificationResult } from "../types";
import { FieldValues, generateField, prepareField } from "./generator";
import { verifyField } from "./verification";

export default class BinarioCore {
    constructor(size: number) {
        this.size = size;
    }

    readonly size: number;
    private field: string[][];
    public task: string[][];

    generate() {
        let field: string[][] | null;
        while (!field) {
            field = generateField(this.size);
        }
        this.field = field;
    }

    prepare(fillFactor = 0.33) {
        if (!this.field) throw new Error(FIELD_NOT_GENERATED);
        if (fillFactor > 0.5 || fillFactor < 0.2)
            throw new Error(INVALID_FILL_FACTOR);
        this.task = prepareField(this.field, fillFactor);
    }

    change(row: number, column: number, value: FieldValues) {
        if (row >= this.size || row < 0) throw new Error(OUT_OF_RANGE("row"));
        if (column >= this.size || column < 0)
            throw new Error(OUT_OF_RANGE("column"));

        this.task[row][column] = value;
    }

    verify(): VerificationResult {
        return verifyField(this.task);
    }
}
