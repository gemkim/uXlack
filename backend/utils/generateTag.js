/* eslint-disable @typescript-eslint/explicit-function-return-type */

import Profile from '../models/profile.model.js'

function generateTag() {
  return Math.floor(1000 + Math.random() * 9000).toString()
}

export async function generateUniqueTag(name) {
  let uniqueTag
  let exists = true

  while (exists) {
    const tag = generateTag()
    const existingProfile = await Profile.findOne({ name, tag })
    if (!existingProfile) {
      uniqueTag = tag
      exists = false
    }
  }

  return uniqueTag
}
