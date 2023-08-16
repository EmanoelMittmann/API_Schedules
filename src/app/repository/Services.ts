import { AppDataSource } from "../../data-source";
import {Services} from '../../entity/Services'

export const servicesRepository = AppDataSource.getRepository(Services)