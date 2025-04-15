import { Router } from 'express'
import { updateProfileIconSeed, updateProfileName } from '../controllers/profile.controller.js'

const profileRouter = Router()

profileRouter.put('/update-icon', updateProfileIconSeed)
profileRouter.put('/update-name', updateProfileName)

export default profileRouter
