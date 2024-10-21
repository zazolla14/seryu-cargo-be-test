export class InvalidData extends Error {
  code: number;

  constructor(message: string = "") {
    super(`Invalid Input Data! ${message ? "Error: " + message : ""}`);
    this.name = "InvalidData";
    this.code = 422;
  }
}
