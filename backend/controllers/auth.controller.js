/* eslint-disable @typescript-eslint/explicit-function-return-type */
import Profile from '../models/profile.model.js'
import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'
import { generateUniqueTag } from '../utils/generateTag.js'

// 회원가입
export const registerUser = async (req, res) => {
  const { account, password, name } = req.body
  try {
    const existingUser = await User.findOne({ account })
    if (existingUser) {
      return res.status(400).json({ message: '이미 사용 중인 아이디입니다.' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = new User({ account, password: hashedPassword })
    const tag = await generateUniqueTag(name)
    const newProfile = new Profile({
      accountId: newUser._id,
      name,
      tag,
      projectList: [],
      iconSeed: name
    })
    await newUser.save()
    await newProfile.save()

    return res.json({ message: '회원가입 성공!' })
  } catch {
    return res.status(500).json({ message: '서버 오류 발생' })
  }
}

export const login = async (req, res) => {
  const { account, password } = req.body

  try {
    const user = await User.find({ account })

    if (user.length < 1) {
      return res.status(201).json({ message: '존재하지 않는 유저 입니다.' })
    }

    const isPasswordMatch = await bcrypt.compare(password, user[0].password)

    if (!isPasswordMatch) {
      return res.status(202).json({ message: '비밀번호가 일치하지 않습니다.' })
    }

    if (isPasswordMatch) {
      const profile = await Profile.find({ accountId: user[0]._id.toString() })
      req.session.user = { id: user[0]._id.toString(), profile: profile[0] }
      console.log('Session after login:', req.session)
      return res.status(200).json({ message: '로그인 성공', user: req.session.user })
    }
  } catch {
    return res.status(500).json({ message: '서버 오류 발생' })
  }
}

export const logout = async (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).json({ message: '로그아웃 실패' })
    res.clearCookie('connect.sid') // 세션 쿠키 삭제
    res.status(200).json({ message: '로그아웃 성공' })
  })
}
