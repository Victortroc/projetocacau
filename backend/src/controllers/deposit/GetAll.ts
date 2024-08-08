import { Request, Response } from "express";
import * as yup from "yup";
import { validation }from "../../middleware";
import { getAllDeposit } from "../../services/depositService/GetAllDeposit";
import { counteDeposit } from "../../services/depositService/CountDeposit";

interface IQueryProps {
    id?: number,
    page?: number,
    limit?: number,
    filter?: string,
    order?: string,
    period?: string
};

export const getAllValidation = validation((getSchema) => ({
    query: getSchema<IQueryProps>(yup.object().shape({
        page: yup.number().optional().moreThan(0),
        limit: yup.number().optional().moreThan(0),
        id: yup.number().integer().optional().default(0),
        filter: yup.string().optional(),
        order: yup.string().optional().default("desc"),
        period: yup.string().optional().default("")
    }))
}));


export const getAll = async (req: Request<{}, {}, {}, IQueryProps>, res: Response) => {

    const result = await getAllDeposit(
        req.query.page || 1,
        req.query.limit || 7,
        req.query.filter || "",
        Number(req.query.id),
        req.query.order || "desc",
        req.query.period || ""
    );

    const count = await counteDeposit(req.query.filter, req.query.period);

    if (result instanceof Error) {
        return res.status(500).json({
            error: {
                default: result.message
            }
        })
    } else if (count instanceof Error) {
        return res.status(500).json({
            error: {
                default: count.message
            }
        })
    };

    res.setHeader("access-control-expose-headers", "x-total-count");
    res.setHeader("x-total-count", count);

    return res.status(200).json(result);

};
