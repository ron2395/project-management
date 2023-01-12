import mongoose from "mongoose";

export const requestSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  role: {
    type: String,
  },
}, {
  timestamps: true
});

const Request = mongoose.model('Request', requestSchema)

export default Request