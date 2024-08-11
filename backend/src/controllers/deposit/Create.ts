import { Request, Response } from "express";
import * as yup from "yup";
import { validation }from "../../middleware";
import { IDeposit } from "../../database/models";
import { createDeposit } from "../../services/depositService/CreateDepositService";
import { getByIdUser } from "../../services/userService/GetByIdUser";
import { updateBalanceUser } from "../../services/userService/UpdateBalanceUser";



interface IBodyProps extends Omit<IDeposit, "id" | "createdAt" | "updatedAt" | "nameUser"> {}

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

    const depositData: Omit<IDeposit, "id" | "updatedAt"> = {
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

    const result = await createDeposit(depositData);

    if (result instanceof Error) {
        return res.status(500).json({
            error: {
                default: result.message
            }
        })
    }

    const resultUpdateAmount = await updateBalanceUser(req.body.userId, req.body.amount);

    if (resultUpdateAmount instanceof Error) {
        return res.status(500).json({
            error: {
                default: resultUpdateAmount.message
            }
        })
    }

    return res.status(201).json(result);

};
