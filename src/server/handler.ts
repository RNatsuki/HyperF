import http from "node:http";
import { Router } from "../routing/router";
import { Request } from "../http/request";
import { Response } from "../http/response";
import { HttpMethod } from "../http/httpmethod";
import { HttpNotFoundException } from "../http/httpNotFound";

export class Handler {
  public static async handleRequest(
    req: http.IncomingMessage,
    res: http.ServerResponse
  ) {
    try {
      const request = this.processRequest(req);
      
      
      const response = request.getRoute()?.getAction()(request, new Response());
      console.log(response);
      
      this.sendResponse(res, response as Response);
    } catch (error: any) {
      if (error instanceof HttpNotFoundException) {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.write(error.message);
        res.end();
      }
    }
  }

  private static processRequest(req: http.IncomingMessage): Request {
    const request = new Request();
    request.setMethod(req.method as HttpMethod);
    request.setUri(req.url as string);
    request.setRoute(Router.resolve(request));
    request.params = Router.extractParams(request);

    return request;
  }

  private static extractQueryParams(
    req: http.IncomingMessage,
    request: Request
  ): Request {
    const url = req.url?.split("?")[1];
    const query = url?.split("&");
    query?.forEach((element) => {
      const [key, value] = element.split("=");

      request.setQuery(key, value);
    });

    return request;
  }

  private static sendResponse(res: http.ServerResponse, response: Response) {
    res.writeHead(response.getStatusCode(), response.getHeaders());
    res.write(response.getContent());
    res.end();
  }
}
