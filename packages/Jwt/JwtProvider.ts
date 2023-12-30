import { sign } from "jsonwebtoken";
import { TCreateJwtProvider } from "./domain/TJwtProvider";
import { config } from "auth/src/main/providers/LocalsProvider";

export const CreateJwtProvider: TCreateJwtProvider =
  () => (object, options?) => {
    return sign(object, config().APP_SECRET, options);
  };
