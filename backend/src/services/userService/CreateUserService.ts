import { ETableNames } from "../../database/ETableNames";
import { Knex } from "../../database/knex";
import { IUser } from "../../database/models";

export const createUser = async (user: Omit<IUser, "id" | "updatedAt">): Promise< number | Error > => {

    try {
        const [result] = await Knex(ETableNames.user).insert(user).returning("id");

        if (typeof result === "object") {
            return result.id;
        } else if (typeof result === "number"){
            return result;
        }
    
        return new Error ("Erro ao cadastrar registro"); 
    } catch (error) {
        console.log("Falha assíncrona");
        return new Error('Email já cadastrado');
    }


}