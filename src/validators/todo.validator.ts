import Joi from "joi";
import { Request } from "express";

export function validateCreate(req: Request) {
  const schema = Joi.object({
    title: Joi.string().min(5).max(255).required(),
    status: Joi.string().valid("pending", "completed"),
  });
  return schema.validate(req);
}

export function validateUpdate(req: Request) {
  const schema = Joi.object({
    title: Joi.string().min(5).max(255),
    status: Joi.string().valid("pending", "completed"),
  });
  return schema.validate(req);
}
