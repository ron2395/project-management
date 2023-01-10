import User from "../models/userModel.js"
import generateToken from '../utils/generateToken.js'

export const registerUser = async(req, res) => {
    const { firstName, lastName, email, password, role } = req.body
    const duplicateEmail = await User.findOne({ email })
    if(duplicateEmail){
      return res.status(400).send('Email already registered')
    }
    const newUser = await User.create({
        firstName,
        lastName,
        email,
        password,
        role
    })
    if(newUser){
        res.json({
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            email: newUser.email,
            _id: newUser._id,
            role: newUser.role,
            token: generateToken(newUser._id)
        })
    }
}

export const authUser = async(req, res) => {
        const { email, password } = req.body;
        const user = await User.findOne({ email })
        if(user && (await user.matchPasswords(password))){
            return res.json({
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email,
              _id: user._id,
              role: user.role,
              token: generateToken(user._id),
            });
        } else{
            res.status(401).send('Invalid credentials. Try again.')
    }
}

export const getAllUsers = async(req, res) => {
    const userList = await User.find({}).select('-password')
    res.json(userList)
}

export const getUserById = async(req, res) => {
    const { id } = req.params
    const user = await User.findById(id).select('-password')
    res.json(user)
}

export const updateUser = async (req, res) => {
  const { firstName, lastName, email, password, role } = req.body;
  const { id } = req.params
  const user = await User.findById(id)
  if(user){
    user.firstName = firstName || user.firstName
    user.lastName = lastName || user.lastName
    user.email = email || user.email
    user.role = role || user.role

    if(password){
        user.password = password
    }
    const updatedUser = await user.save()
    if(updatedUser){
        return res.json({
          firstName: updatedUser.firstName,
          lastName: updatedUser.lastName,
          email: updatedUser.email,
          role: updatedUser.role,
          token: generateToken(updatedUser._id),
          _id: updatedUser._id,
        });
    }else{
        res.status(400).send('error updating user details')
    }
  }else{
    res.status(404).send('User not found')
  }
}

export const userProfile = async(req, res) => {
    const user = await User.findById(req.user._id)
    if(user){
        res.json({
          _id: user._id,
          role: user.role,
          email: user.email,
          firstName: user.firstName,
          image: user.image,
          lastName: user.lastName
        });
    } else {
        res.status(404).send('user not found')
    }
}

export const updateUserProfile = async (req, res) => {
  const { firstName, lastName, email, image } = req.body
  const user = await User.findById(req.user._id)
  if (user) {
    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.email = email || user.email;
    user.image = image || user.image
    const updatedUser = await user.save();
    if (updatedUser) {
      return res.json({
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        email: updatedUser.email,
        image: updateUser.image,
        role: updatedUser.role,
        token: generateToken(updatedUser._id),
        _id: updatedUser._id,
      });
    } else {
      res.status(400).send("error updating user details");
    }
  } else {
    res.status(404).send("User not found");
  }
};

export const deleteUser = async(req, res) => {
    const { id } = req.params
    const user = await User.findById(id)

    if(user){
        await user.remove()
        res.json('user removed')
    }else{
        res.status(404).send('User not found')
    }
}

export const getUserByRole = async(req, res) => {
  const { role } = req.params
  const roleUsers = await User.find({ role: role })
  if(roleUsers){
    return res.json(roleUsers)
  }else{
    res.status(404).send('No users with this role were found')
  }
}