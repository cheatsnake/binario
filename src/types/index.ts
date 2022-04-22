export type VerificationErrorType = "triple" | "duplicate" | "balance" | null;

export interface VerificationResult {
    isError: boolean;
    type: VerificationErrorType;
    message: string | null;
    position: number[][] | null;
}
