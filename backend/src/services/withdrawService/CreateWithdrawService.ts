import { ETableNames } from "../../database/ETableNames";
import { Knex } from "../../database/knex";
import { IWithdraw } from "../../database/models";

export const createWithdraw = async (withdraw: Omit<IWithdraw, "id" | "updatedAt" | "status">): Promise< number | Error > => {

    try {
        const [result] = await Knex(ETableNames.withdraw).insert(withdraw).returning("id");

        if (typeof result === "object") {
            return result.id;
        } else if (typeof result === "number"){
            return result;
        }
    
        return new Error ("Falha ao cadastrar saque"); 
    } catch (error) {
        console.log("Falha assíncrona");
        return new Error("Falha ao cadastrar saque");
    }

}