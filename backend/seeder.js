import User from './models/userModel.js'

const userSeed = async() => {

    await User.create({
      firstName: "Admin",
      lastName: "User",
      role: "0",
      password: "12345678",
      email: "admin@test.com",
    });

    process.exit()
}

userSeed()