import { randomUUID } from "crypto";
import { UserRepository } from "../repository/User";
import { Request, Response } from "express";
import { httpStatusCode } from "Errors";


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
            res.status(httpStatusCode.OK).send(Professional)
        } catch (error) {
            return res.status(httpStatusCode.BAD_REQUEST).send(error)
        }
    }   
}