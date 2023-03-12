import mongoose from "mongoose"

const schema = new mongoose.Schema({
  name: {type: String, required: true, unique: true},
  email: {type: String, required: true, unique: true}
})

export default mongoose.models.User || mongoose.model('User', schema)