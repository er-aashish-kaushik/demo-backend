import Joi from 'joi'
import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/auth';
import { User } from '../models/user.model';
import { RequestWithUser } from '../interfaces/request';
import { REQUEST_FAILURE } from '../utils/response';
import logger from '../../config/logger';

const validateSignup = (req: Request, res: Response, next: NextFunction): any => {
  logger.info('signup:validateSignup:invoke');
  const signupSchema: Joi.Schema = Joi.object({
    title: Joi.string().required().valid('Mr.', 'Mrs.'),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().length(10).required(),
    gender: Joi.string().required(),
    password: Joi.string().required()
      .min(8)
      .max(32)
  });
  const { error } = signupSchema.validate(req.body);
  if (error) {
    return REQUEST_FAILURE(res, {
      error: error.details
    });
  }

  next()

}

const validateLogin = (req: Request, res: Response, next: NextFunction): any => {
  logger.info('login:validateLogin:invoke');
  const loginSchema: Joi.Schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
      .min(8)
      .max(32)
  });
  const { error } = loginSchema.validate(req.body);
  if (error) {
    return REQUEST_FAILURE(res, {
      error: error.details
    });
  }

  next()
}

const validateToken = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  logger.info('validateToken::invoke');
  try {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    const decodedToken: any = await verifyToken(token);
    const user = await User.findById(decodedToken?._id);
    if (!user) {
      return REQUEST_FAILURE(res, { error: "Unauthorized" }, 401)
    }
    req['user'] = user;
    next();
  } catch (error: any) {
    console.error('Error during authentication:', error.message);
    REQUEST_FAILURE(res, { error: error.message || "Forbidden" }, 403)
  }
};

export { validateSignup, validateLogin, validateToken };


