import User from './models/userModel.js'
import {connect, disconnect} from 'mongoose';
import "dotenv/config";

connect(process.env.MONGO_URI)
  .then(() => {
    console.log("connected to db")
  })
  .catch((err) => {
    console.log("error connecting to db", err);
  })

const userSeed = async() => {
    await User.deleteMany({})
    await User.create({
      firstName: "Admin",
      lastName: "User",
      role: "0",
      password: "12345678",
      email: "admin@test.com",
    });
}

userSeed().then(() => {
  disconnect()
})