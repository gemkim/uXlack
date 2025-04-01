/* eslint-disable @typescript-eslint/explicit-function-return-type */
import Project from '../models/project.model.js'

export const registerProject = async (req, res) => {
  try {
    const newProject = new Project({ ...req.body })

    await newProject.save()

    return res.json({ message: '프로젝트 생성 성공!', project: newProject })
  } catch {
    return res.status(500).json({ message: '서버 오류 발생' })
  }
}
