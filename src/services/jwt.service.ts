import { injectable } from "inversify";
import { sign, verify } from "jsonwebtoken";
import { configuration } from "../config/config";

@injectable()
export class JwtService {
  generateAccessToken(id: string) {
    return sign({ id: id }, configuration.atSecret, { expiresIn: configuration.tokenLife });
  }

  generateRefreshToken(id: string) {
    return sign({ id: id }, configuration.rtSecret);
  }

  validateToken(token: string, config: string) {
    return verify(token, config);
  }
}
