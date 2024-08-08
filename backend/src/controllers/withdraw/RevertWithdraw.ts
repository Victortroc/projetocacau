import { Request, Response } from "express";
import * as yup from "yup";
import { validation }from "../../middleware";
import { IWithdraw } from "../../database/models";
import { updateBalanceUser } from "../../services/userService/UpdateBalanceUser";
import { updateByIdWithdraw } from "../../services/withdrawService/UpdateStatus";
import { getByIdWithdraw } from "../../services/withdrawService/GetByIdWithdraw";
import { getByIdUser } from "../../services/userService/GetByIdUser";


interface IBodyProps extends Pick<IWithdraw, "amount"> {}

interface IParamsProps {
    id?: number
};

export const revertByIdValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(yup.object().shape({
        amount: yup.number().required().moreThan(0)
    })),
    params: getSchema<IParamsProps>(yup.object().shape({
        id: yup.number().integer().required().moreThan(0)
    }))
}));


export const revertWithdraw= async (req: Request<IParamsProps, {}, IBodyProps>, res: Response) => {

    if(!req.params.id) {
        return res.status(400).json({
            errors: {
                default: "O parâmetro 'id' precisa ser informado."
            }
        });
    }

    const withdrawRevert = await getByIdWithdraw(req.params.id);

    if (withdrawRevert instanceof Error) {
        return res.status(500).json({
            error: {
                default: withdrawRevert.message
            }
        })
    }

    const verificationAdmin = await getByIdUser(withdrawRevert.userId);

    if (verificationAdmin instanceof Error) {
        return res.status(500).json({
            error: {
                default: verificationAdmin.message
            }
        })
    }

    if (verificationAdmin.admin) {

        const incremetAmount = await updateBalanceUser(withdrawRevert.userId, withdrawRevert.amount);

        if (incremetAmount instanceof Error) {
            return res.status(500).json({
                error: {
                    default: incremetAmount.message
                }
            })
        }

        const userData: Pick<IWithdraw, "amount" | "updatedAt" | "status"> = {
            ...req.body,
            status: "pending",
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

        const result = await updateByIdWithdraw(req.params.id, userData);

        if (result instanceof Error) {
            return res.status(500).json({
                error: {
                    default: result.message
                }
            })
        }
        
        return res.status(204).json(result);

    } else {
        return res.status(500).json({
            error: {
                default: "Usuário não é ADMIN"
            }
        });
    }

    

};
