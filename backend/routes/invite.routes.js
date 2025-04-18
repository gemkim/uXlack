import { Router } from 'express'
import { sendInvite } from '../controllers/invite.controller.js'

const inviteRouter = Router()

inviteRouter.post('/send', sendInvite)

export default inviteRouter
