import { ZodError, z } from 'zod';
import { validateRequestQuery } from '../middlewares/validateRequestQuery';

describe('validateRequestQuery', () => {
  it('Should be defined', () => {
    expect(validateRequestQuery).toBeDefined();
  });

  it('Should use zodSchema to validate request query and stripe out extra values (remove extra : "random")', () => {
    const req: any = {
      query: {
        teachers: ['teacherken@gmail.com'],
        extra: 'random',
      },
    };
    const res: any = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };
    const next: any = jest.fn();

    const zodSchema = z.object({
      teachers: z.array(z.string().email()),
    });

    validateRequestQuery(zodSchema)(req, res, next);

    expect(req.query).toMatchObject({
      teachers: ['teacherken@gmail.com'],
    });
  });

  it('Should throw error if validation fails (invalid teacher emails)', () => {
    const req: any = {
      body: {
        teachers: ['teacherkengmail.com'],
      },
    };
    const res: any = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };
    const next: any = jest.fn();

    const zodSchema = z.object({
      teachers: z.array(z.string().email()),
    });

    expect(() => validateRequestQuery(zodSchema)(req, res, next)).toThrowError(
      ZodError
    );
  });
});
