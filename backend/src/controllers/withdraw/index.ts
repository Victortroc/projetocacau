import * as create from "./Create";
import * as getById from "./GetById";
import * as getAll from "./GetAll";
import * as updateStatus from "./UpdateStatus";
import * as deleteById from "./DeleteById";

export const WithdrawController = {
    ...create,
    ...getById,
    ...getAll,
    ...updateStatus,
    ...deleteById
};