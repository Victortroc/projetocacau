import { Request, Response } from "express";
import * as yup from "yup";
import { validation }from "../../middleware";
import { IUser } from "../../database/models";
import { updateByIdUser } from "../../services/userService/UpdateById";

interface IBodyProps extends Pick<IUser, "name"> {}

interface IParamsProps {
    id?: number
};

export const putByIdValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(yup.object().shape({
        name: yup.string().required()
    })),
    params: getSchema<IParamsProps>(yup.object().shape({
        id: yup.number().integer().required().moreThan(0)
    }))
}));


export const putById = async (req: Request<IParamsProps, {}, IBodyProps>, res: Response) => {

    if(!req.params.id) {
        return res.status(400).json({
            errors: {
                default: "O parâmetro 'id' precisa ser informado."
            }
        });
    }

    const userData: Pick<IUser, "name" | "updatedAt"> = {
        ...req.body,
        updatedAt: new Date().toLocaleString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
        }).replace(',', '').replace(/(\d{2})\/(\d{2})\/(\d{4})/, '$1-$2-$3')
    };

    const result = await updateByIdUser(req.params.id, userData);

    if (result instanceof Error) {
        return res.status(500).json({
            error: {
                default: result.message
            }
        })
    }


    return res.status(204).json(result);

};
