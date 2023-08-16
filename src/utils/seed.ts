import { servicesRepository } from '../app/repository/Services'
import Seed from '../Fakes/services.json'
import { UserRepository } from '../app/repository/User'
import { randomInt, randomUUID } from 'crypto'
import { Status } from '../entity/Schedules'
import { schedulesRepository } from '../app/repository/Schedule'
import {AppDataSource} from '../data-source'
export const populate = async () => {
    AppDataSource.initialize().then(async() => {
        try {   
            const {services} = Seed
            const professional = services.map(item => ({
                id: randomUUID(),
                name: item.professional,
                availabilitily: item.availability.join(',')
            }))
    
            const newArr = services.map(item => ({
                id: item.id,
                name: item.name,
                description: item.description,
                duration: item.duration,
                price: item.price,
                professional:{
                    id:professional.find(prop => prop.name == item.professional).id
                }
            }))
    
            const mockSchedules = services.map(item => ({
                id: randomUUID(),
                date: `${randomInt(1,30)}/0${randomInt(1,9)}/2023`,
                time: '9h',
                status: Status.ABERTO,
                services: {
                    id: item.id
                }
    
            }))
    
            await UserRepository.insert(professional)
            await servicesRepository.insert(newArr)
            await schedulesRepository.insert(mockSchedules)
            return 
        } catch (error) {
            console.log(error);
        }
    })
}

populate()