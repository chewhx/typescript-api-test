import Express, { Response } from 'express';
import asyncHandler from 'express-async-handler';
import { StatusCodes } from 'http-status-codes';
import { Student, Teacher } from '../models';
import {
  getCommonStudents,
  getCommonStudentsDto,
  getStudentsForNotifications,
  getStudentsForNotificationsDto,
  registerStudentsDto,
  registerStudents,
  suspendStudent,
  suspendStudentDto,
} from '../services';
import { validateRequestBody } from '../middlewares/validateRequestBody';
import { validateRequestQuery } from '../middlewares/validateRequestQuery';

const MainController = Express.Router();

MainController.post(
  '/register',
  validateRequestBody(registerStudentsDto),
  asyncHandler(async (req, res: Response<unknown>) => {
    const { teacher, students } = req.body;

    await registerStudents({
      teacher,
      students,
      teacherModel: Teacher,
      studentModel: Student,
    });

    res.status(StatusCodes.NO_CONTENT).json({});
  })
);

MainController.get(
  '/commonstudents',
  validateRequestQuery(getCommonStudentsDto),
  asyncHandler(async (req, res: Response<{ students: string[] }>) => {
    const { teacher } = req.query;

    const students = await getCommonStudents({
      teacher,
      studentModel: Student,
      teacherModel: Teacher,
    });

    res.status(StatusCodes.OK).json({ students });
  })
);

MainController.post(
  '/suspend',
  validateRequestBody(suspendStudentDto),
  asyncHandler(async (req, res: Response<unknown>) => {
    const { student } = req.body;

    await suspendStudent({ student, studentModel: Student });

    res.status(StatusCodes.NO_CONTENT).json({});
  })
);

MainController.post(
  '/retrievefornotifications',
  validateRequestBody(getStudentsForNotificationsDto),
  asyncHandler(async (req, res: Response<{ recipients: string[] }>) => {
    const { teacher, notification } = req.body;

    const recipients = await getStudentsForNotifications({
      teacher,
      notification,
      teacherModel: Teacher,
      studentModel: Student,
    });

    res.status(StatusCodes.OK).json({ recipients });
  })
);

export default MainController;
