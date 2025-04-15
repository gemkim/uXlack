import { Router } from 'express'
import { updateProfileIconSeed, updateProfileName } from '../controllers/profile.controller.js'

const profileRouter = Router()

/**
 * @swagger
 * /profile/update-name:
 *   put:
 *     summary: profile의 name 변경 api
 *     description: api 생성만 해두고 테스트를 해보지 못했습니다. 근데 될 거 같음
 *     tags: [Profile]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: 프로필 이름 변경 완료
 *       401:
 *         description: 로그인이 필요합니다.
 *       404:
 *         description: 프로필을 찾을 수 없습니다.
 *       500:
 *         description: 그 외 서버 에러
 */
profileRouter.put('/update-name', updateProfileName)

/**
 * @swagger
 * /profile/update-icon:
 *   put:
 *     summary: profile의 iconSeed 변경 api
 *     tags: [Profile]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               iconSeed:
 *                 type: string
 *     responses:
 *       200:
 *         description: 프로필 아이콘 시드 변경 완료
 *       401:
 *         description: 로그인이 필요합니다.
 *       404:
 *         description: 프로필을 찾을 수 없습니다.
 *       500:
 *         description: 그 외 서버 에러
 */
profileRouter.put('/update-icon', updateProfileIconSeed)

export default profileRouter
