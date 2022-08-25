import { injectable } from "inversify";
import { Request, Response, NextFunction } from "express";
import { JwtService } from "../services/jwt.service";
import { configuration } from "../config/config";
import { container } from "../inversify.config";

@injectable()
export class AuthMiddleware {
  authorize(req: Request, res: Response, next: NextFunction) {
    const jwtService = container.get(JwtService);
    const header: any = req.header("Authorization");
    const bearer = header.split(" ");
    const token = bearer[1];
    const url = req.originalUrl.split("/").at(-1);
    const isRefresh = url === "refresh";
    if (!token) return res.status(401).send({ message: "Access Denied: No token provided" });
    try {
      //@ts-expect-error
      req.user = isRefresh
        ? jwtService.validateToken(token, configuration.rtSecret)
        : jwtService.validateToken(token, configuration.atSecret);
      next();
    } catch (ex) {
      res.status(400).send({ message: "Invalid token" });
    }
  }
}
