import { HttpMethod } from "../http/httpmethod";

export class Route<T> {
  protected uri!: string;
  protected method!: HttpMethod;
  protected action!: CallableFunction;
  public params: { [key: string]: string } = {};
  protected regex!: string;

  constructor(uri: string, method: HttpMethod, action: CallableFunction) {
    this.uri = uri; // /user/{id}
    this.action = action;
    this.regex = this.uri.replace(/\{[a-zA-Z0-9]+\}/g, "([a-zA-Z0-9]+)");
    this.method = method;
    this.regex = `^${this.regex}$`; // ^/user/([a-zA-Z0-9]+)$
    
   
  }

  public getUri(): string {
    return this.uri;
  }

  public getAction(): CallableFunction {
    return this.action;
  }

  public matches(uri: string): boolean {
    return uri.match(this.regex) !== null;
  }

  public hasParameters(): boolean {
    return Object.keys(this.params).length > 0;
  }

  public getParameters(): { [key: string]: string } {
    return this.params;
  }
}
