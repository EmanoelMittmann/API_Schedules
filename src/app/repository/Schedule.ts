import { Schedules } from "../../entity/Schedules";
import { AppDataSource } from "../../data-source";

export const schedulesRepository = AppDataSource.getRepository(Schedules)