import Profile from '../models/profile.model.js'
import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const registerUser = async (req, res) => {
  const { account, password, name } = req.body
  try {
    const existingUser = await User.findOne({ account })
    if (existingUser) {
      return res.status(400).json({ message: '이미 사용 중인 아이디입니다.' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = new User({ account, password: hashedPassword })
    const newProfile = new Profile({ accountId: newUser._id, name, projectList: [] })
    await newUser.save()
    await newProfile.save()

    res.json({ message: '회원가입 성공!' })
  } catch {
    res.status(500).json({ message: '서버 오류 발생' })
  }
}
