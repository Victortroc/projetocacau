import { ETableNames } from "../../database/ETableNames";
import { Knex } from "../../database/knex";
import { IDeposit } from "../../database/models";

export const createDeposit = async (deposit: Omit<IDeposit, "id" | "updatedAt">): Promise< number | Error > => {

    try {
        const [result] = await Knex(ETableNames.deposit).insert(deposit).returning("id");

        if (typeof result === "object") {
            return result.id;
        } else if (typeof result === "number"){
            return result;
        }
    
        return new Error ("Falha ao cadastrar depósito"); 
    } catch (error) {
        console.log("Falha assíncrona");
        return new Error("Falha ao cadastrar depósito");
    }

}