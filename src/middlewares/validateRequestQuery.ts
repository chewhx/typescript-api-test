import { RequestHandler } from 'express';
import expressAsyncHandler from 'express-async-handler';
import { ZodSchema } from 'zod';

type ParamsDictionary = {
  [key: string]: string;
};

export const validateRequestQuery = <TQuery>(
  zodSchema: ZodSchema<TQuery>
): RequestHandler<ParamsDictionary, any, any, TQuery> => {
  return expressAsyncHandler((req, res, next) => {
    req.query = zodSchema.parse(req.query);
    return next();
  });
};
