import { UserController } from './app/controllers/User'
import { Router } from 'express'
import { SchedulesController } from './app/controllers/Schedules'

const {list} = new UserController
const { 
    listProfessionalAvailable,
    updateStatus,
    CancelSchedule
    } = new SchedulesController

const router = Router()

router
    .route('/Professional')
    .get(list)

router
    .route('/Schedules')
    .get(listProfessionalAvailable)

router.put('/updateSchedule/:id', updateStatus)
router.put('/cancelStatus/:id', CancelSchedule)

export default router