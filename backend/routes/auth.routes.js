import { Router } from 'express'
import { login, logout, registerUser } from '../controllers/auth.controller.js'

const authRouter = Router()

/**
 * @swagger
 * /auth/register-user:
 *   post:
 *     summary: 유저 회원가입 API
 *     description: acoount와 password, username을 받고, db에 User Model과 Profile Model을 생성합니다.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               account:
 *                 type: string
 *               password:
 *                 type: string
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: 회원가입 성공
 *       400:
 *         description: 이미 사용중인 계정 (중복 계정)
 *       500:
 *         description: 그 외 서버 에러
 */
authRouter.post('/register-user', registerUser)
/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: 유저 로그인 API
 *     description: acoount와 password를 받아 유저를 검증합니다. 검증이 성공하면 세션도 생성합니다.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               account:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: 로그인 성공
 *       201:
 *         description: 존재하지 않는 유저
 *       202:
 *         description: 비밀번호가 일치하지 않습니다.
 *       500:
 *         description: 그 외 서버 에러
 */
authRouter.post('/login', login)
/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: 로그아웃 API
 *     description: 현재 로그인된 사용자의 세션을 삭제하고 로그아웃 처리합니다.
 *     tags: [Auth]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: 로그아웃 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 로그아웃 성공
 *       500:
 *         description: 서버 오류 (세션 삭제 실패)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 로그아웃 실패
 */
authRouter.post('/logout', logout)

export default authRouter
