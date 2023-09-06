import Express from 'express';
import asyncHandler from 'express-async-handler';
import { StatusCodes } from 'http-status-codes';
import {
  validateRequestBody,
  validateRequestQuery,
} from 'zod-express-middleware';
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

const MainController = Express.Router();

MainController.post(
  '/register',
  validateRequestBody(registerStudentsDto),
  asyncHandler(async (req, res) => {
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
  asyncHandler(async (req, res) => {
    const { teacher } = req.query;

    const students = await getCommonStudents({
      teacher,
      studentModel: Student,
    });

    res.status(StatusCodes.OK).json({ students });
  })
);

MainController.post(
  '/suspend',
  validateRequestBody(suspendStudentDto),
  asyncHandler(async (req, res) => {
    const { student } = req.body;

    await suspendStudent(student);

    res.status(StatusCodes.NO_CONTENT).json({});
  })
);

MainController.post(
  '/retrievefornotifications',
  validateRequestBody(getStudentsForNotificationsDto),
  asyncHandler(async (req, res) => {
    const { teacher, notification } = req.body;

    const recipients = await getStudentsForNotifications({
      teacher,
      notification,
    });

    res.status(StatusCodes.OK).json({ recipients });
  })
);

export default MainController;
