import { Knex } from "knex";
import { ETableNames } from "../ETableNames";
import bcrypt from 'bcryptjs';
import { IUser } from "../models";


export const seed = async (knex: Knex) => {

    try {
        const hashedPassword = await bcrypt.hash("admin123", 10);

        const userData: Omit<IUser, "id" | "updatedAt"> = {
            name: "Admin",
            email: "admin@gmail.com",
            admin: true,
            createdAt: new Date().toLocaleString('pt-BR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false,
            }).replace(',', '').replace(/(\d{2})\/(\d{2})\/(\d{4})/, '$1-$2-$3'),
            password: hashedPassword
        };


        await knex(ETableNames.user).insert(userData).returning("id");

    } catch (error) {
        console.log("Erro ao criar seed: ", error);   
    }
    
}