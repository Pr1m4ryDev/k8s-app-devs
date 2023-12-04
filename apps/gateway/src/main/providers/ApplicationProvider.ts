import express, { Express } from "express";
import Router from "express-promise-router";
import http from "http";
import helmet from "helmet";
import { InitLogger, IOptions } from "@k8s-api-devs-back/logger";
import cors from "cors";
import morgan from "morgan";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import tz from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(tz);

export const server = {
  httpServer: null as http.Server | null,
};

export const ApplicationProvider = async (): Promise<Express> => {
  const app = express();
  const router = Router();
  const { Logger, Stream } = InitLogger({
    label: "@k8s-api-devs/gateway",
    filename: `${__dirname}/../../../logs/k8s-api-gateway-${dayjs()
      .tz("America/Guayaquil")
      .format("YYYYMMDD")}.log`,
  } as IOptions);

  const port = process.env.PORT || 5000;

  const WHITE_LIST: Array<string> = [];

  app.use(router);
  app.use(helmet());
  app.use(express.json());
  app.use(
    cors({
      origin: WHITE_LIST,
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
      allowedHeaders: [
        "Content-Type",
        "Authorization",
        "X-Requested-With",
        "Accept",
        "Origin",
        "x-access-token",
        "X-Csrf-Token",
      ],
      maxAge: 3000,
    })
  );
  app.use(
    morgan(
      "HTTP V:http-version :user-agent :remote-addr :method :url :status :response-time[digits]ms :referrer ",
      {
        stream: Stream,
      }
    )
  );

  server.httpServer = app.listen(port, () => {
    console.clear();
    Logger.info(`🚀 Server started on http://localhost:${port}/`);
  });

  return app;
};
