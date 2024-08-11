import { ETableNames } from "../../database/ETableNames";
import { Knex } from "../../database/knex";
import { IUser } from "../../database/models";

export const updateByIdUser = async (id: number, user: Pick<IUser, "name" | "updatedAt">): Promise< void | Error > => {

    try {
        const result = await Knex(ETableNames.user)
            .update(user)
            .where("id", "=", id)

        if (result > 0) return;
    
        return new Error ("Erro ao atualizar registro"); 
    } catch (error) {
        console.log("Falha assíncrona excluir");
        return new Error ("Erro ao atualizar registro"); 
    }


}