import { getCommonStudents } from '../services/common-students/service';

describe('getCommonStudents', () => {
  it('Should be defined', () => {
    expect(getCommonStudents).toBeDefined();
  });

  it('Should handle empty teacher array', async () => {
    const teacher: string[] = [];

    const teacherModel: any = {};
    const studentModel: any = {};

    const res = await getCommonStudents({
      teacher,
      teacherModel,
      studentModel,
    });

    expect(res).toMatchObject([]);
  });

  it('Should handle teacher undefined or null', async () => {
    // eslint-disable-next-line @typescript-eslint/no-inferrable-types
    const teacher: null = null;

    const teacherModel: any = {};
    const studentModel: any = {};

    const res = await getCommonStudents({
      teacher,
      teacherModel,
      studentModel,
    });

    expect(res).toMatchObject([]);
  });

  it('Should get students for one teacher', async () => {
    const teacher = ['teacherken@gmail.com'];
    const students = [
      'studentmac@gmail.com',
      'studentkendall@gmail.com',
      'studentmary@gmail.com',
    ];

    const teacherModel: any = {};
    const studentModel: any = {
      findAll: jest.fn().mockResolvedValue([
        {
          id: 1,
          email: 'studentmac@gmail.com',
          Teachers: [{ id: 1, email: 'teacherken@gmail.com' }],
        },
        {
          id: 2,
          email: 'studentkendall@gmail.com',
          Teachers: [{ id: 1, email: 'teacherken@gmail.com' }],
        },
        {
          id: 3,
          email: 'studentmary@gmail.com',
          Teachers: [{ id: 1, email: 'teacherken@gmail.com' }],
        },
      ]),
    };

    const res = await getCommonStudents({
      teacher,
      teacherModel,
      studentModel,
    });

    expect(res).toBeDefined();
    expect(res).toMatchObject(students);
  });

  it('Should get students for two teacher', async () => {
    const teacher = ['teacherken@gmail.com', 'teacherkaia@gmail.com'];
    const students = ['studentmac@gmail.com', 'studentkendall@gmail.com'];

    const teacherModel: any = {};
    const studentModel: any = {
      findAll: jest.fn().mockResolvedValue([
        {
          id: 1,
          email: 'studentmac@gmail.com',
          Teachers: [
            { id: 1, email: 'teacherken@gmail.com' },
            { id: 2, email: 'teacherkaia@gmail.com' },
          ],
        },
        {
          id: 2,
          email: 'studentkendall@gmail.com',
          Teachers: [
            { id: 1, email: 'teacherken@gmail.com' },
            { id: 2, email: 'teacherkaia@gmail.com' },
          ],
        },
        {
          id: 3,
          email: 'studentmary@gmail.com',
          Teachers: [{ id: 1, email: 'teacherken@gmail.com' }],
        },
      ]),
    };

    const res = await getCommonStudents({
      teacher,
      teacherModel,
      studentModel,
    });

    expect(res).toBeDefined();
    expect(res).toMatchObject(students);
  });
});
