export enum TileValues {
    ZERO = "0",
    ONE = "1",
    EMPTY = "x",
}

export type VerificationErrorType = "triple" | "duplicate" | "balance" | null;

export interface VerificationResult {
    isError: boolean;
    type: VerificationErrorType;
    message: string | null;
    position: string[] | null;
}
