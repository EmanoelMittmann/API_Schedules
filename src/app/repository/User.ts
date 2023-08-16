import {AppDataSource} from '../../data-source'
import {Professional} from '../../entity/Professional'

export const UserRepository = AppDataSource.getRepository(Professional)