import { ETableNames } from "../../database/ETableNames";
import { Knex } from "../../database/knex";
import { IUser } from "../../database/models";

export const getByIdUser = async (id: number): Promise< IUser | Error > => {

    try {
        const result = await Knex(ETableNames.user)
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