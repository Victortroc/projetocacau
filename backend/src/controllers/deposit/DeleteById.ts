import { Request, Response } from "express";
import * as yup from "yup";
import { validation }from "../../middleware";
import { deleteByIdDeposit } from "../../services/depositService/DeleteByIdDeposit";


interface IParamsProps {
    id?: number
};

export const deleteByIdValidation = validation((getSchema) => ({
    params: getSchema<IParamsProps>(yup.object().shape({
        id: yup.number().integer().required().moreThan(0)
    }))
}));


export const deleteById = async (req: Request<IParamsProps>, res: Response) => {
    
    if(!req.params.id) {
        return res.status(400).json({
            errors: {
                default: "O parâmetro 'id' precisa ser informado."
            }
        });
    }

    const result = await deleteByIdDeposit(req.params.id);

    if (result instanceof Error) {
        return res.status(500).json({
            error: {
                default: result.message
            }
        })
    }


    return res.status(204).send();

};
