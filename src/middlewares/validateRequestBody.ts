import { RequestHandler } from 'express';
import expressAsyncHandler from 'express-async-handler';
import { ZodSchema } from 'zod';

type ParamsDictionary = {
  [key: string]: string;
};

export const validateRequestBody = <TBody>(
  zodSchema: ZodSchema<TBody>
): RequestHandler<ParamsDictionary, any, TBody, any> => {
  return expressAsyncHandler((req, res, next) => {
    req.body = zodSchema.parse(req.body);
    return next();
  });
};
