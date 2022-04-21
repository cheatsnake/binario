import { FIELD_NOT_GENERATED } from "../constants/error.constants";
import { generateField, prepareField } from "./generator";
import { verifyField } from "./verification";

export class BinarioCore {
    constructor(size: number) {
        this.size = size;
    }

    readonly size: number;
    private field: string[][];
    task: string[][];

    generate() {
        let field: string[][] | null;
        while (!field) {
            field = generateField(this.size);
        }
        this.field = field;
    }

    prepare(fillFactor = 1 / 3) {
        if (!this.field) throw new Error(FIELD_NOT_GENERATED);
        this.task = prepareField(this.field, fillFactor);
    }

    change(row: number, column: number, value: "0" | "1" | "x") {
        this.task[row][column] = value;
    }

    verify() {
        return verifyField(this.task);
    }
}
