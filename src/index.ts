import { Response } from "./http/response";
import { Request } from "./http/request";
import { Router } from "./routing/router";
import { ServerImpl } from "./server/serverImpl";

const server = new ServerImpl();

Router.get("/", (req: Request, res: Response) => {
  return res.json({ name: req.query.user });
});

Router.get("/user/{username}", (req: Request, res: Response) => {
  const id = req.params.username;
  return res.json({ name: "Hello From Users Route "+id });
});

server.start(8080, () => {
  console.log("Server started");
});
