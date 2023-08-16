import { schedulesRepository } from "../repository/Schedule";
import { randomUUID } from "crypto";
import { Status } from "../../entity/Schedules";
import { Request, Response } from "express";

export class SchedulesController {
    async Save(req: Request, res: Response){
        const {date,time ,id_services} = req.body

        try{

        const exist = await schedulesRepository.findOneBy({
            services:{
                id: id_services
            }
        })
        if(exist){
            return res.status(403).send('Serviço ja Agendado')
        }

        const schedule = schedulesRepository.create({
            id: randomUUID(),
            date: date,
            time: time,
            status: Status.AGENDADO,
            services:{
                id: id_services
            }

        })

            await schedulesRepository.save({...schedule})
            const response = {
                id: schedule.id,
                service_id: schedule.services.id,
                date: schedule.date,
                time: schedule.time,
                status: schedule.status
            }
            res.status(200).send(response)

        }catch(error){
            console.log("error: ", error);
            res.status(400).send(error)
        }
    }

    async listProfessionalAvailable(req: Request, res: Response){
        const limit = Number(req.query?.limit)
        const page = (Number(req.query?.page) - 1 ) * limit | 10
        try{
            const ArrayList = await schedulesRepository.find({
                relations: {
                    services: {
                        professional: true,
                    },
                },
                order: {
                    services: {
                        professional: {
                            name: 'ASC',
                        },
                    }
                },
                take: limit,
                skip: Number(page)
            })
            const NewArr = ArrayList.map(opts => ({
                id: opts.id,
                professional: opts.services.professional.name,
                available_slots: opts.services.professional.availabilitily,
                status: opts.status
            }))
        
            return res.status(200).send(NewArr)
        }catch(error){
            console.log("error: ", error);
            return res.status(400).send(error)
        }
    }

    async updateStatus(req:Request , res: Response){
        const id = req.params.id
        try {
            const schedule = await schedulesRepository.findOneBy({
                id: id
            })
            if(!schedule){
                return res.status(404).send('Não encontrado')
            }
            const test = await schedulesRepository.update(id,{
                status: Status.CONCLUIDO
            })

            return res.status(200).send('Status Atualizado')
        } catch (error) {
            return res.status(400).send('Parametros inválidos')   
        }
    }

    async CancelSchedule(req: Request, res: Response){
        const id = req.params.id
        try{
            const schedule = await schedulesRepository.findOneBy({
                id: id
            })
            if(!schedule){
                return res.status(404).send('Não Encontrado')
            }            
            await schedulesRepository.update(id,{
                status: Status.CANCELADO
            })

            return res.status(200).send('Status Cancelado')
        } catch(error){
            return res.status(400).send('Parametros inválidos')
        }
    }
}