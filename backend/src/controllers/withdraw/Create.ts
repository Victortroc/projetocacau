import { Request, Response } from "express";
import * as yup from "yup";
import { validation }from "../../middleware";
import { IWithdraw } from "../../database/models";
import { createWithdraw } from "../../services/withdrawService/CreateWithdrawService";
import { getByIdUser } from "../../services/userService/GetByIdUser";



interface IBodyProps extends Omit<IWithdraw, "id" | "createdAt" | "updatedAt" | "nameUser" | "status"> {}

export const createValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(yup.object().shape({
        userId: yup.number().required().moreThan(0),
        amount: yup.number().required().moreThan(0),
    }))
}));


export const create = async (req: Request<{}, {}, IBodyProps>, res: Response) => {

    const resultUserName = await getByIdUser(req.body.userId);  

    if (resultUserName instanceof Error) {
        return res.status(500).json({
            error: {
                default: resultUserName.message
            }
        })
    }

    const depositData: Omit<IWithdraw, "id" | "updatedAt" | "status"> = {
        ...req.body,
        createdAt: new Date().toLocaleString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
        }).replace(',', '').replace(/(\d{2})\/(\d{2})\/(\d{4})/, '$1-$2-$3'),
        nameUser: resultUserName.name
    };

    const result = await createWithdraw(depositData);

    if (result instanceof Error) {
        return res.status(500).json({
            error: {
                default: result.message
            }
        })
    }

    return res.status(201).json(result);

};
