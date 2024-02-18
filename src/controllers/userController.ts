import { Response } from 'express';
import { User } from '../models/user.model';
import { RequestWithUser } from '../interfaces/request';
import { REQUEST_FAILURE, REQUEST_SUCCESS } from '../utils/response';


const getUsersList = async (req: RequestWithUser, res: Response) => {
    try {
        interface IProjectionData {
            title: Number
            firstName: Number,
            lastName: Number,
            gender: Number,
            role: Number,
            email: Number,
            phone: Number,
        }
        const projectionData: IProjectionData = {
            title: 1,
            firstName: 1,
            lastName: 1,
            gender: 1,
            role: 1,
            email: 1,
            phone: 1
        }

        const { page = 1, limit = 10 } = req.query;
        console.log(req?.user);
        const skip = (parseInt(page as string) - 1) * parseInt(limit as string);

        const userlist = await User.find({}, projectionData).skip(skip).limit(parseInt(limit as string));
        const totalCounts = await User.countDocuments();
        REQUEST_SUCCESS(res, { data: { message: "User fetched successfully", data: { userlist, totalCounts } } }, 201)
    } catch (error) {
        console.error(error);
        REQUEST_FAILURE(res, { error: 'Internal server error' }, 500)
    }
};

export { getUsersList };
