import { Server } from "./server";
import http from "node:http";
import { Handler } from "./handler";

export class ServerImpl implements Server {
  private server!: http.Server;
  start(port: number, callback: () => void): void {
    try {
      this.server ??= http.createServer((req, res) => {
        Handler.handleRequest(req, res);
      });

      this.server.listen(port, callback);
    } catch (error: any) {
      console.log(error);
    }
  }

  stop(): void {
    throw new Error("Method not implemented.");
  }
}
