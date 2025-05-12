import Invite from '../models/invite.model.js'

/* eslint-disable @typescript-eslint/explicit-function-return-type */
// controllers/invite.controller.js

export const sendInvite = async (req, res) => {
  const inviterId = req.session?.user?.profile?._id // 로그인한 사람
  const { inviteeId, projectId } = req.body

  if (!inviterId || !inviteeId || !projectId) {
    return res.status(400).json({ message: '필수 값이 누락되었습니다.' })
  }

  try {
    // 중복 초대 방지 (선택사항)
    const existing = await Invite.findOne({
      inviterId,
      inviteeId,
      projectId,
      status: 'pending'
    })

    if (existing) {
      return res.status(201).json({ message: '이미 초대가 전송되었습니다.' })
    }

    const invite = new Invite({
      inviterId,
      inviteeId,
      projectId
    })

    await invite.save()

    // socket 알림 보내려면 여기서 emit 처리
    // io.to(inviteeId).emit('invite', { projectId, inviterId })

    return res.status(200).json({
      message: '초대가 성공적으로 전송되었습니다.',
      data: invite
    })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ message: '서버 오류 발생' })
  }
}

export const getReceivedInvites = async (req, res) => {
  const { _id } = req.session.user.profile

  try {
    const inviteList = await Invite.find({ inviteeId: _id })
      .populate('inviterId', 'name iconSeed tag')
      .populate('projectId', 'name')

    const inviteDtoList = inviteList.map((invite) => ({
      _id: invite._id.toString(),
      inviter: {
        name: invite.inviterId.name,
        iconSeed: invite.inviterId.iconSeed,
        tag: invite.inviterId.tag
      },
      inviteeId: invite.inviteeId.toString(),
      project: {
        name: invite.projectId.name
      },
      status: invite.status,
      createAt: invite.createdAt.toISOString()
    }))

    return res.status(200).json({ message: '초대 조회 성공!', data: inviteDtoList })
  } catch {
    return res.status(500).json({ message: '서버 오류 발생' })
  }
}
