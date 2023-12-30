import express, { Express } from "express";
import http from "http";
import { HttpMiddlewareProvider } from "./MiddlewaresProvider";
import { InitLogger, IOptions } from "@k8s-api-devs-back/logger";
import { init as initLocals } from "./LocalsProvider";
import { ProxyProvider } from "./ProxyProvider";

export const server = {
  httpServer: null as http.Server | null,
};

export const ApplicationProvider = async (): Promise<Express> => {
  const app = express();
  initLocals(app);

  const { config } = app.locals;

  const { Logger, Stream } = InitLogger({
    label: config.APP_NAME,
    filename: config.FILE_NAME,
  } as IOptions);

  HttpMiddlewareProvider(app, Stream)();

  ProxyProvider(app)();

  const port = config.PORT;
  server.httpServer = app.listen(port, () => {
    console.clear();
    Logger.info(`🚀 Server started on http://localhost:${port}/ `);
  });

  return app;
};
