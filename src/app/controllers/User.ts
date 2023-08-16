import { randomUUID } from "crypto";
import { UserRepository } from "../repository/User";
import { Request, Response } from "express";


export class UserController{
    async list(req: Request, res: Response){
        try {
            const Professional = await UserRepository.find({
                select: {
                    name: true,
                    availabilitily: true
                },
                order: {
                    id: 'ASC'
                },
                take: 10
            })
            res.status(200).send(Professional)
        } catch (error) {
            return res.status(400).send(error)
        }
    }   
}