import { Router } from 'express'
import { getReceivedInvites, sendInvite } from '../controllers/invite.controller.js'

const inviteRouter = Router()

inviteRouter.post('/send', sendInvite)
inviteRouter.post('/get-received', getReceivedInvites)

export default inviteRouter
