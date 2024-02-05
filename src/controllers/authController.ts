import { Request, Response } from 'express';
import bcrypt, { compareSync } from 'bcryptjs';
import { User } from '../models/user.model'
import { createAccessToken, verifyToken } from '../utils/auth';
import { REQUEST_FAILURE, REQUEST_SUCCESS } from '../utils/response';
import logger from '../../config/logger';

const signup = async (req: Request, res: Response) => {
  logger.info('sihnup:controller:invoke');
  try {
    const { title, firstName, lastName, gender, email, phone, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ title, firstName, lastName, gender, email, phone, password: hashedPassword });
    await user.save();
    return REQUEST_SUCCESS(res, { data: { message: "User created successfully", data: "" } }, 201)
  } catch (error) {
    console.error(error);
    REQUEST_FAILURE(res, { error: 'Internal server error' }, 500)
  }
};

const login = async (req: Request, res: Response) => {
  logger.info('login:controller:invoke');
  try {
    const { email, password } = req.body;
    let userData: any = await User.findOne({ email: email });
    if (!userData) {
      REQUEST_FAILURE(res, { error: 'Invalid credentails' }, 401)
    }
    if (!(userData?.email === email && compareSync(password, userData?.password))) {
      REQUEST_FAILURE(res, { error: 'Invalid credentails' }, 401)
    }
    else {
      const incodeDataInAccessToken = {
        _id: userData._id,
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        phone: userData.phone,
        role: userData.role
      }

      const incodeDataInRefreshToken = {
        _id: userData._id,
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        phone: userData.phone
      }
      const accessToken = await createAccessToken(incodeDataInAccessToken)
      const refreshToken = await createAccessToken(incodeDataInRefreshToken)

      const userDataRes = { ...incodeDataInAccessToken, gender: userData.gender, accessToken, refreshToken }
      REQUEST_SUCCESS(res, { data: { message: "Login successfull", data: userDataRes } }, 201)
    }

  } catch (error) {
    console.error(error);
    REQUEST_FAILURE(res, { error: 'Internal server error' }, 500)
  }
};

export { signup, login };
