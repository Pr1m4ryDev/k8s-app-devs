import * as path from "path";
import * as dotenv from "dotenv";
import { Application } from "express";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import tz from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(tz);

const config = () => {
  dotenv.config({ path: path.join(__dirname, "../../../.env") });

  const PORT = process.env.PORT || 5000;
  const PORT_AUTH = process.env.PORT_AUTH;
  const PORT_DEVS = process.env.PORT_DEVS;
  const PORT_REPOS = process.env.PORT_REPOS;
  const NODE_ENV = process.env.NODE_ENV || "dev";
  const APP_NAME = process.env.APP_NAME || "@k8s-api-devs/gateway";
  const FILE_NAME = `${__dirname}/../../../logs/${APP_NAME.replace(
    "/",
    "-"
  )}-${dayjs().tz("America/Guayaquil").format("YYYYMMDD")}.log`;

  return {
    PORT,
    PORT_AUTH,
    PORT_DEVS,
    PORT_REPOS,
    NODE_ENV,
    APP_NAME,
    FILE_NAME,
  };
};

const init = (_express: Application) => {
  _express.locals.config = config();
  return _express;
};

export { config, init };
