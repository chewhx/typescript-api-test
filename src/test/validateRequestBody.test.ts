import { ZodError, z } from 'zod';
import { validateRequestBody } from '../middlewares/validateRequestBody';

describe('validateRequestBody', () => {
  it('Should be defined', () => {
    expect(validateRequestBody).toBeDefined();
  });

  it('Should use zodSchema to validate request body and stripe out extra values (remove extra : "random")', () => {
    const req: any = {
      body: {
        email: 'teacherken@gmail.com',
        age: 45,
        extra: 'random',
      },
    };
    const res: any = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };
    const next: any = jest.fn();

    const zodSchema = z.object({
      email: z.string().email(),
      age: z.number(),
    });

    validateRequestBody(zodSchema)(req, res, next);

    expect(req.body).toMatchObject({
      email: 'teacherken@gmail.com',
      age: 45,
    });
  });

  it('Should throw error if validation fails (invalid email)', () => {
    const req: any = {
      body: {
        email: 'teacherkengmail.com',
        age: 45,
      },
    };
    const res: any = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };
    const next: any = jest.fn();

    const zodSchema = z.object({
      email: z.string().email(),
      age: z.number(),
    });

    expect(() => validateRequestBody(zodSchema)(req, res, next)).toThrowError(
      ZodError
    );
  });

  it('Should throw error if validation fails (no email)', () => {
    const req: any = {
      body: {
        age: 45,
      },
    };
    const res: any = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };
    const next: any = jest.fn();

    const zodSchema = z.object({
      email: z.string().email(),
      age: z.number(),
    });

    expect(() => validateRequestBody(zodSchema)(req, res, next)).toThrowError(
      ZodError
    );
  });
});
