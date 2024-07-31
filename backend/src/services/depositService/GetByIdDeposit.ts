import { ETableNames } from "../../database/ETableNames";
import { Knex } from "../../database/knex";
import { IDeposit } from "../../database/models";

export const getByIdDeposit = async (id: number): Promise< IDeposit | Error > => {

    try {
        const result = await Knex(ETableNames.deposit)
            .select("*")
            .where("id", "=", id)
            .first();

        if (result) return result;
    
        return new Error ("Registro não encontrado"); 
    } catch (error) {
        console.log("Falha assíncrona procurar ID");
        return new Error ("Registro não encontrado"); 
    }


}