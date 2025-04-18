import { Router } from 'express'
import {
  getProfileByNameTag,
  getProfileList,
  updateProfileIconSeed,
  updateProfileName
} from '../controllers/profile.controller.js'

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

/**
 * @swagger
 * /profile/get-profile-list:
 *   post:
 *     summary: profileId를 참조하여 프로필을 조회하는 api
 *     description: 배열을 인자로 받기 때문에 한명 또는 두명 이상 모두 조회할 수 있습니다.
 *     tags: [Profile]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               profileIdList:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["profileId"]
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
profileRouter.post('/get-profile-list', getProfileList)
/**
 * @swagger
 * /profile/get-profile-by-name-tag:
 *   post:
 *     summary: 사용자가 'name', 'tag'를 통해 profile을 조회하는 api
 *     description: 프로젝트에 멤벌르 초대하는 기능 등에 사용합니다.
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
 *               tag:
 *                 type: string
 *     responses:
 *       200:
 *         description: 프로필 조회 성공
 *       400:
 *         description: 존재하지 않는 유저 입니다.
 *       500:
 *         description: 그 외 서버 에러
 */
profileRouter.post('/get-profile-by-name-tag', getProfileByNameTag)
export default profileRouter
