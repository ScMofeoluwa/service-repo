import Joi from "joi";
import { Request } from "express";

export function validateLogin(req: Request) {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).email().required(),
    password: Joi.string().min(5).max(255).required(),
  });
  return schema.validate(req);
}
