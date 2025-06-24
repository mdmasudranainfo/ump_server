import { NextFunction, Request, Response } from "express";

import { AnyZodObject, z, ZodEffects } from "zod";

const ValidationRequest =
  (schema: AnyZodObject | ZodEffects<AnyZodObject>) =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
        cookies: req.cookies,
        headers: req.headers,
      });

      return next();
    } catch (err) {
      next(err);
    }
  };

export default ValidationRequest;
