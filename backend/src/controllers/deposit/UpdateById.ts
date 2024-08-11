import { Request, Response } from "express";
import * as yup from "yup";
import { validation }from "../../middleware";
import { IDeposit } from "../../database/models";
import { updateByIdDeposit } from "../../services/depositService/UpdateById";
import { getByIdDeposit } from "../../services/depositService/GetByIdDeposit";
import { updateBalanceUser } from "../../services/userService/UpdateBalanceUser";

interface IBodyProps extends Pick<IDeposit, "amount"> {}

interface IParamsProps {
    id?: number
};

export const putByIdValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(yup.object().shape({
        amount: yup.number().required()
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

    const amountDepositEdit = await getByIdDeposit(req.params.id);

    if (amountDepositEdit instanceof Error) {
        return res.status(500).json({
            error: {
                default: amountDepositEdit.message
            }
        })
    }

    const decremetAmount = await updateBalanceUser(amountDepositEdit.userId, amountDepositEdit.amount, 1);

    if (decremetAmount instanceof Error) {
        return res.status(500).json({
            error: {
                default: decremetAmount.message
            }
        })
    }

    const incrementAmount = await updateBalanceUser(amountDepositEdit.userId, req.body.amount); 
    

    if (incrementAmount instanceof Error) {
        return res.status(500).json({
            error: {
                default: incrementAmount.message
            }
        })
    }


    const userData: Pick<IDeposit, "amount" | "updatedAt"> = {
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

    const result = await updateByIdDeposit(req.params.id, userData);

    if (result instanceof Error) {
        return res.status(500).json({
            error: {
                default: result.message
            }
        })
    }
    

    return res.status(204).json(result);

};
