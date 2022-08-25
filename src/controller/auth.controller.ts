import { UserService } from "../services/user.service";
import { container } from "../inversify.config";
import { controller, httpPost } from "inversify-express-utils";
import { Request, Response } from "express";
import { JwtService } from "../services/jwt.service";
import { validateLogin } from "../validators/auth.validator";

@controller("/login")
export class AuthController {
  public jwtService = container.get(JwtService);
  constructor(public readonly _service: UserService) {}

  @httpPost("/")
  async check(req: Request, res: Response): Promise<any> {
    const { error } = validateLogin(req.body);
    if (error) res.status(400).send({ message: error.details[0].message, data: null });

    const user = await this._service.getUserByEmail(req.body.email);
    if (!user) return res.status(400).send({ message: "Invalid email or password", data: null });

    const validPassword = this._service.isValidPassword(req.body.password, user.password);
    if (!validPassword) return res.status(400).send({ message: "Invalid email or password", data: null });

    const response = {
      accessToken: this.jwtService.generateAccessToken(user._id),
      refreshToken: this.jwtService.generateRefreshToken(user._id),
    };
    res.status(200).send({ message: "login successful", data: response });
  }
}
