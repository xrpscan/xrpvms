declare namespace Express {
  export interface Request {
    ledger_index: string;
    messages: object;
  }
}
