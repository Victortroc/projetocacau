import { Request, Response } from "express";
import * as yup from "yup";
import { validation }from "../../middleware";
import { getAllWithdraw } from "../../services/withdrawService/GetAllWithdraw";
import { counteWithdraw } from "../../services/withdrawService/CountWithdraw";

interface IQueryProps {
    id?: number,
    page?: number,
    limit?: number,
    filter?: string,
    order?: string,
    period?: string,
    statusBy?: string
};

export const getAllValidation = validation((getSchema) => ({
    query: getSchema<IQueryProps>(yup.object().shape({
        page: yup.number().optional().moreThan(0),
        limit: yup.number().optional().moreThan(0),
        id: yup.number().integer().optional().default(0),
        filter: yup.string().optional(),
        order: yup.string().optional().default("desc"),
        period: yup.string().optional().default(""),
        statusBy: yup.string().optional().default("")
    }))
}));


export const getAll = async (req: Request<{}, {}, {}, IQueryProps>, res: Response) => {

    const result = await getAllWithdraw(
        req.query.page || 1,
        req.query.limit || 7,
        req.query.filter || "",
        Number(req.query.id),
        req.query.order || "desc",
        req.query.period || "",
        req.query.statusBy || ""
    );

    const count = await counteWithdraw(req.query.filter, req.query.period, req.query.statusBy);

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
