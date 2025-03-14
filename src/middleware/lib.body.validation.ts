import type { NextFunction, Request, Response } from "express";
import type { AnyZodObject, ZodIssue } from "zod";
import { ZodError } from "zod";
import response from "../lib/lib.api.response";

export function validateInput(schema: AnyZodObject) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      return next();
    } catch (error: unknown) {
      if (error instanceof ZodError) {
        return response(
          res,
          400,
          {
            ...error.errors
              .map((e: ZodIssue) => {
                return {
                  [String(e.path[0])]: e.message,
                };
              })
              .reduce(
                (acc: Record<string, string>, curr: Record<string, string>) => {
                  Object.assign(acc, curr);
                  return acc;
                },
                {},
              ),
          },
          undefined,
        );
      }
    }
  };
}
