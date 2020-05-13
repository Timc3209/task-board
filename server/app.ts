import * as express from "express";
import { Application, Request, Response } from "express";
import * as path from "path";

class App {
  public app: Application;
  public port: any;

  constructor(appInit: { port: any; middleWares: any; controllers: any }) {
    this.app = express();
    this.port = appInit.port;

    this.middlewares(appInit.middleWares);
    this.routes(appInit.controllers);
    this.assets();
  }

  private middlewares(middleWares: []) {
    middleWares.forEach((middleWare) => {
      this.app.use(middleWare);
    });
  }

  private routes(controllers: []) {
    controllers.forEach((controller: any) => {
      this.app.use("/api" + controller.path, controller.router);
    });

    this.app.get("/", (req: Request, res: Response): void => {
      res.sendFile(path.resolve("./") + "/dist/client/index.html");
    });
  }

  private assets() {
    this.app.use(express.static(path.resolve("./") + "/dist/client"));
  }

  public listen() {
    const server = this.app.listen(this.port, () => {
      console.log(`App listening on the port: ${this.port}`);
    });
    return server;
  }
}

export default App;
