import { IDeposit, IUser } from "../../models";

declare module "knex/types/tables" {
    interface Tables {
        user: IUser,
        deposit: IDeposit
    }
}