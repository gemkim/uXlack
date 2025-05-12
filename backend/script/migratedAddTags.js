/* eslint-disable @typescript-eslint/explicit-function-return-type */
// scripts/migrateAddTags.js
import mongoose from 'mongoose'
import dotenv from 'dotenv'

import { generateUniqueTag } from '../utils/generateTag.js'
import Profile from '../models/profile.model.js'

dotenv.config()

const MONGO_URI = process.env.MONGO_URI

async function migrate() {
  await mongoose.connect(MONGO_URI)
  console.log('DB connected')

  const profiles = await Profile.find({ tag: { $exists: false } })

  for (const profile of profiles) {
    const tag = await generateUniqueTag(profile.name)
    profile.tag = tag
    await profile.save()
    console.log(`Updated profile ${profile.name} with tag #${tag}`)
  }

  console.log('Migration complete')
  process.exit(0)
}

migrate().catch((err) => {
  console.error('Migration error:', err)
  process.exit(1)
})
