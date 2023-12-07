

export class HttpNotFoundException extends Error {
  constructor(message: string) {
    super(message);
    this.name = "HttpNotFoundException";
  }
}