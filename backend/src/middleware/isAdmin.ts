import { Request, Response, NextFunction } from "express";
import { getByIdUser } from "../services/userService/GetByIdUser";



interface CustomRequest extends Request {
    user?: {
        id: number;
        username: string;
        email: string;
    };
}

const isAdmin = async (req: CustomRequest, res: Response, next: NextFunction): Promise< Response | void > => {

    const { id } = req.user!;

    const result = await getByIdUser(id);

    if (result instanceof Error) {
        return res.status(500).json({
            error: {
                default: result.message
            }
        })
    }
    
    if (result.admin) {
        return next(); 
    } else {
        return res.status(401).json({ 
            error: {
                default: 'Usuário não é admin'
            } 
        });
    }
    
  
};

export default isAdmin;
