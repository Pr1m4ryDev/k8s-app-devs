import { Application } from "express";
import bodyParser from "body-parser";
import helmet from "helmet";
import cors from "cors";
import compress from "compression";
import morgan from "morgan";

export const HttpMiddlewareProvider =
  (express: Application, Stream: { write: (message: string) => void }) =>
  (): Application => {
    const WHITE_LIST: Array<string> = [];

    express.use(
      bodyParser.urlencoded({
        limit: "10mb",
        parameterLimit: 3000,
        extended: false,
      })
    );

    express.use(
      bodyParser.json({
        limit: "10mb",
      })
    );

    express.use(helmet.xssFilter());
    express.use(helmet.noSniff());
    express.use(helmet.hidePoweredBy());
    express.use(helmet.frameguard({ action: "deny" }));
    express.use(helmet());

    express.use(
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

    express.use(
      morgan(
        "HTTP V:http-version :user-agent :remote-addr :method :url :status :response-time[digits]ms :referrer ",
        {
          stream: Stream,
        }
      )
    );

    express.disable("x-powered-by");

    express.use(compress());

    return express;
  };
