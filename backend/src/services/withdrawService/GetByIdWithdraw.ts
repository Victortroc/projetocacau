import { ETableNames } from "../../database/ETableNames";
import { Knex } from "../../database/knex";
import { IWithdraw } from "../../database/models";

export const getByIdWithdraw = async (id: number): Promise< IWithdraw | Error > => {

    try {
        const result = await Knex(ETableNames.withdraw)
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