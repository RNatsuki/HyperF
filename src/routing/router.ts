import { HttpMethod } from "../http/httpmethod";
import { Route } from "./route";
import { Request } from "../http/request";
import { Response } from "../http/response";
import { HttpNotFoundException } from "../http/httpNotFound";

export class Router {
  protected static routes: { [key: string]: Route<Response>[] } = {};
  private static instance: Router;

  private constructor() {
    for (const method in HttpMethod) {
      Router.routes[HttpMethod[method as keyof typeof HttpMethod]] = [];
    }
  }

  public static resolve(req: Request): Route<Response> {
    const method = req.getMethod();
    const uri = req.getUri();
    const routes = this.routes[method];
    for (const route of routes) {
      if (route.matches(uri)) {
        return route;
      }
    }

    throw new HttpNotFoundException("Route not found");
  }

  protected registerRoute(
    method: HttpMethod,
    uri: string,
    action: CallableFunction
  ): void {
    Router.routes[method].push(new Route<Response>(uri, method, action));
  }

  protected get(uri: string, action: CallableFunction): void {
    this.registerRoute(HttpMethod.GET, uri, action);
  }

  protected post(uri: string, action: CallableFunction): void {
    this.registerRoute(HttpMethod.POST, uri, action);
  }

  protected put(uri: string, action: CallableFunction): void {
    this.registerRoute(HttpMethod.PUT, uri, action);
  }

  protected delete(uri: string, action: CallableFunction): void {
    this.registerRoute(HttpMethod.DELETE, uri, action);
  }

  protected patch(uri: string, action: CallableFunction): void {
    this.registerRoute(HttpMethod.PATCH, uri, action);
  }

  public static getInstance(): Router {
    if (!Router.instance) {
      Router.instance = new Router();
    }

    return Router.instance;
  }

  public static extractParams(req: Request): { [key: string]: any } {
    const route = req.getRoute();
    const uri = req.getUri();
    const params: { [key: string]: any } = {};
    if (route) {
      const routeParts = route.getUri().split("/");
      const uriParts = uri.split("/");
      routeParts.forEach((part, index) => {
        if (part.startsWith("{") && part.endsWith("}")) {
          const key = part.replace("{", "").replace("}", "");
          params[key] = uriParts[index];
        }
      });
    }

    return params;
  }



  public static get(uri: string, action: CallableFunction): void {
    Router.getInstance().get(uri, action);
  }

  public static post(uri: string, action: CallableFunction): void {
    Router.getInstance().post(uri, action);
  }

  public static put(uri: string, action: CallableFunction): void {
    Router.getInstance().put(uri, action);
  }

  public static delete(uri: string, action: CallableFunction): void {
    Router.getInstance().delete(uri, action);
  }

  public static patch(uri: string, action: CallableFunction): void {
    Router.getInstance().patch(uri, action);
  }
}
