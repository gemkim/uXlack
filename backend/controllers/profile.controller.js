/* eslint-disable @typescript-eslint/explicit-function-return-type */
// 프로필 생성은 해당 컨트롤러가 아닌 회원가입(auth.controller.js)시에 같이 처리됩니다.

import Profile from '../models/profile.model.js'

export const updateProfileName = async (req, res) => {
  const userId = req.session.user?.id
  const { name } = req.body

  if (!userId) {
    return res.status(401).json({ message: '로그인이 필요합니다.' })
  }

  try {
    const updatedProfile = await Profile.findOneAndUpdate(
      { accountId: userId },
      { name },
      { new: true } // 수정된 값 반환
    )

    if (!updatedProfile) {
      return res.status(404).json({ message: '프로필을 찾을 수 없습니다.' })
    }

    res.status(200).json({
      message: '프로필 이름이 성공적으로 수정되었습니다.',
      profile: updatedProfile
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: '서버 오류 발생' })
  }
}

export const updateProfileIconSeed = async (req, res) => {
  const userId = req.session.user?.id
  const { iconSeed } = req.body

  if (!userId) {
    return res.status(401).json({ message: '로그인이 필요합니다.' })
  }

  try {
    const updatedProfile = await Profile.findOneAndUpdate(
      { accountId: userId },
      { iconSeed },
      { new: true } // 수정된 값 반환
    )

    if (!updatedProfile) {
      return res.status(404).json({ message: '프로필을 찾을 수 없습니다.' })
    }

    res.status(200).json({
      message: '아이콘 시드가 성공적으로 수정되었습니다.',
      profile: updatedProfile
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: '서버 오류 발생' })
  }
}

export const getProfileList = async (req, res) => {
  const { profileIdList } = req.body

  try {
    const profileList = await Profile.find({
      _id: { $in: profileIdList }
    })

    return res.status(200).json({
      message: '프로필 조회 성공!',
      data: profileList
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: '서버 오류 발생' })
  }
}
