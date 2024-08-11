import { Request, Response } from "express";
import { ETableNames } from "../../database/ETableNames";
import { Knex } from "../../database/knex";

interface CustomRequest extends Request {
    user?: {
        id: number;
        username: string;
        email: string;
    };
}


export const remove = async (req: CustomRequest, res: Response): Promise<Response> => {
    const { id } = req.user!;

    try {
        const user = await Knex(ETableNames.user)
        .select("*")
        .where("id", "=", id)
        .first();

        if (!user) {
            return res.status(404).json({ 
                errors: {
                    default: "User not found"
                } 
            });
        }

        res.clearCookie("jrt");

        return res.status(204).send(); 
    } catch (error) {
        return res.status(500).json({ 
            errors: {
                default: "Erro ao deslogar"
            } 
        });
    }
    
};