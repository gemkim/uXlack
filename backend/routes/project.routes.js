import { Router } from 'express'
import { getProjectListByProfileId, registerProject } from '../controllers/project.controller.js'

const projectRouter = Router()

// 메세지 가져오기
/**
 * @swagger
 * /project/create:
 *   post:
 *     summary: 새 프로젝트 생성 api
 *     tags: [Project]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               memberList:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["profileId"]
 *     responses:
 *       200:
 *         description: 프로젝트 생성 완료
 *       500:
 *         description: 그 외 서버 에러
 */
projectRouter.post('/create', registerProject)
projectRouter.post('/getProjectList', getProjectListByProfileId)
// projectRouter.post('/delete', () => {})
// projectRouter.post('/edit', () => {})

export default projectRouter
