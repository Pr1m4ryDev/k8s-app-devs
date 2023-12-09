import proxy from "express-http-proxy";
import { Application } from "express";

export const ProxyProvider = (express: Application) => (): Application => {
  const { config } = express.locals;

  express.use("/api/v1/auth", proxy(`http://localhost:${config.PORT_AUTH}`));
  express.use(
    "/api/v1/developers",
    proxy(`http://localhost:${config.PORT_DEVS}`)
  );
  express.use(
    "/api/v1/repositories",
    proxy(`http://localhost:${config.PORT_REPOS}`)
  );

  return express;
};
