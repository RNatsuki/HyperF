import { Route } from "../routing/route";
import { HttpMethod } from "./httpmethod";

export class Request {
  protected uri: string = "";
  protected method: HttpMethod = HttpMethod.GET;
  protected data: { [key: string]: any } = {};
  public params: { [key: string]: any } = {};
  public query: { [key: string]: any } = {};
  protected route?: Route<CallableFunction>;

  public getUri(): string {
    return this.uri;
  }

  public setUri(uri: string): Request {
    this.uri = uri;
    return this;
  }

  public setRoute(route: Route<CallableFunction>): Request {
    this.route = route;
    return this;
  }

  public getRoute(): Route<CallableFunction> | undefined {
    return this.route;
  }

  public getMethod(): HttpMethod {
    return this.method;
  }

  public setMethod(method: HttpMethod): Request {
    this.method = method;
    return this;
  }

  public getData(key?: string): { [key: string]: any } {
    if (key) {
      return this.data[key];
    }

    return this.data;
  }

  public setData(data: { [key: string]: any }): Request {
    this.data = data;
    return this;
  }

  public setPostData(data: { [key: string]: any }, key?: string): Request {
    if (key) {
      this.data[key] = data;
    } else {
      this.data = data;
    }
    return this;
  }

  public getQuery(key?: string): { [key: string]: any } {
    if (key) {
      return this.query[key];
    }

    return this.query;
  }

  public setQuery(key: string, value: any): Request {
    this.query[key] = value;
    return this;
  }

  public setDatas(data: { [key: string]: any }): Request {
    this.data = data;
    return this;
  }
}
