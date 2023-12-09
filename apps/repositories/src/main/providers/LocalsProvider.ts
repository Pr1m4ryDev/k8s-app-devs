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

  const PORT = process.env.PORT || 5003;
  const NODE_ENV = process.env.NODE_ENV || "dev";
  const APP_NAME = process.env.APP_NAME || "@k8s-api-devs/repositories";
  const FILE_NAME = `${__dirname}/../../../logs/${APP_NAME.replace(
    "/",
    "-"
  )}-${dayjs().tz("America/Guayaquil").format("YYYYMMDD")}.log`;

  return {
    PORT,
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
