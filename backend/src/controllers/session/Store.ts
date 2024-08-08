import { Request, Response } from "express";
import AuthUserService from "../../services/userService/AuthUserService";
import * as yup from "yup";
import { IUser } from "../../database/models";
import { validation }from "../../middleware";

interface IBodyProps extends Pick<IUser, "email" | "password"> {}

export const loginValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(yup.object().shape({
        email: yup.string().email().required(),
        password: yup.string().required()
    }))
}));

export const store = async (req: Request, res: Response): Promise<Response> => {
    const { email, password } = req.body;
  
    try {

        const { token, serializedUser } = await AuthUserService({
            email,
            password
        });

        
        return res.status(200).json({
            token,
            user: serializedUser
        });


    } catch (err) {
        
        return res.status(400).json({
            error: {
                default: err.message
            }
        })

    }
    
    
};