/* eslint-disable @typescript-eslint/explicit-function-return-type */
import Project from '../models/project.model.js'

export const registerProject = async (req, res) => {
  const { name, memberList } = req.body
  console.log(req.body)
  try {
    const newProject = new Project({
      name,
      memberList,
      messageList: [],
      taskList: [],
      coverSrc: null,
      createdBy: memberList[0]
    })

    await newProject.save()

    return res.json({ message: '프로젝트 생성 성공!', project: newProject })
  } catch {
    return res.status(500).json({ message: '서버 오류 발생' })
  }
}

export const getProjectListByProfileId = async (req, res) => {
  const { profileId } = req.query
  try {
    const projectList = await Project.find({ memberList: profileId })
    console.log(projectList)

    return res.status(200).json({ message: '프로젝트 조회 성공!', data: projectList })
  } catch {
    return res.status(500).json({ message: '서버 오류 발생' })
  }
}
