import Express, { RequestHandler, Response } from 'express';
import { registerStudents } from '../services/registerStudents';
import { StatusCodes } from 'http-status-codes';
import asyncHandler from 'express-async-handler';
import { getCommonStudents } from '../services/getCommonStudents';
import { suspendStudent } from '../services/suspendStudent';
import { getStudentsForNotifications } from '../services/getStudentsForNotifications';

const MainController = Express.Router();

MainController.post(
  '/register',
  asyncHandler(async (req, res) => {
    const { teacher, students } = req.body;

    await registerStudents({
      teacher,
      students,
    });

    res.status(StatusCodes.NO_CONTENT).json({});
  })
);

MainController.get(
  '/commonstudents',
  asyncHandler(async (req, res) => {
    const { teacher } = req.query;

    const students = await getCommonStudents({
      teacher: typeof teacher === 'string' ? teacher : (teacher as string[]),
    });

    res.status(StatusCodes.OK).json({ students });
  })
);

MainController.post(
  '/suspend',
  asyncHandler(async (req, res) => {
    const { student } = req.body;

    await suspendStudent({
      student,
    });

    res.status(StatusCodes.NO_CONTENT).json({});
  })
);

MainController.post(
  '/retrievefornotifications',
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
