import { FIELD_NOT_GENERATED } from "../constants/error.constants";
import { generateField, prepareField } from "./generator";

export class BinarioCore {
    constructor(size: number) {
        this.size = size;
    }

    readonly size: number;
    public field: string[][];
    public preparedField: string[][];

    generate() {
        let field: string[][] | null;
        while (!field) {
            field = generateField(this.size);
        }
        this.field = field;
    }
    prepare(fillFactor = 1 / 3) {
        if (!this.field) throw new Error(FIELD_NOT_GENERATED);
        this.preparedField = prepareField(this.field, fillFactor);
    }
    verify() {}
}

console.time("bench");
const binario = new BinarioCore(16);
console.timeLog("bench");
binario.generate();
console.timeLog("bench");
binario.prepare(0.5);
console.timeLog("bench");

// binario.field.forEach((row) => {
//     console.log(row.join(""));
// });
// console.log("-".repeat(8));
// binario.preparedField.forEach((row) => {
//     console.log(row.join(""));
// });
console.timeEnd("bench");
