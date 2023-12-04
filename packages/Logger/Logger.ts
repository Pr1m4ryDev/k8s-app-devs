import { createLogger, format, transports } from "winston";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import tz from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(tz);

export interface IOptions {
  label: string;
  level?: string;
  filename: string;
}

export const InitLogger = (options: IOptions) => {
  const console = format.combine(
    format.errors({ stack: true }),
    format.metadata(),
    format.json(),
    format.colorize({ all: true }),
    format.label({ label: options.label }),
    format.timestamp({
      format: "YYYY-MM-DD HH:MM:SS",
    }),
    format.printf(
      (info) =>
        `|${info.label}|${dayjs()
          .tz("America/Guayaquil")
          .format("YYYYMMDDHmmss")}|${info.level}|${info.message}|${
          info.meta ? JSON.stringify(info.meta) : ""
        }`
    )
  );

  const file = format.combine(
    format.errors({ stack: true }),
    format.metadata(),
    format.json(),
    format.label({ label: options.label }),
    format.timestamp({
      format: "YYYY-MM-DD HH:MM:SS",
    }),
    format.printf(
      (info) =>
        `|${info.label}|${dayjs()
          .tz("America/Guayaquil")
          .format("YYYYMMDDHmmss")}|${info.level}|${info.message}|${
          info.meta ? JSON.stringify(info.meta) : ""
        }`
    )
  );

  const Logger = createLogger({
    transports: [
      new transports.File({
        maxsize: 209715200,
        maxFiles: 10,
        filename: options.filename,
        format: format.combine(file),
      }),
      new transports.Console({
        level: options.level || "debug",
        format: format.combine(console),
      }),
    ],
  });

  const Stream = {
    write: (message: string) => {
      Logger.info(message);
    },
  };

  return { Logger, Stream };
};
