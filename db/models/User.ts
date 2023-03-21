import mongoose from "mongoose"
import type { DatabaseUser } from "@/types"

const schema = new mongoose.Schema<DatabaseUser>({
  name: {type: String, required: true, unique: true},
  email: {type: String, required: true, unique: true},
  passwordHash: {type: String, required: false, default: ''},
  provider: {type: String, required: false, default: 'credentials'}
})

export default mongoose.models.User || mongoose.model<DatabaseUser>('User', schema)