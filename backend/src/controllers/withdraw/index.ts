import * as create from "./Create";
import * as getById from "./GetById";
import * as getAll from "./GetAll";
import * as updateById from "./UpdateById";
import * as deleteById from "./DeleteById";

export const WithdrawController = {
    ...create,
    ...getById,
    ...getAll,
    ...updateById,
    ...deleteById
};