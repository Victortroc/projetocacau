import { IDeposit, IUser, IWithdraw } from "../../models";

declare module "knex/types/tables" {
    interface Tables {
        user: IUser,
        deposit: IDeposit,
        withdraw: IWithdraw
    }
}