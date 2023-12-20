const { Role, Permission, RolePermission,User,UserRole,leader } = require('../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')


async function registerAdmin(req, res){
  const {username, email, first_name, last_name, password, password_confirm,numberPhone} = req.body

  if(!username || !email || !password || !password_confirm || !first_name || !last_name, !numberPhone) {
    return res.status(422).json({'message': 'Invalid fields'})
  }

  if(password !== password_confirm) return res.status(422).json({'message': 'Passwords do not match'})

  const userExists = await User.exists({username}).exec()
  const emailExists = await User.exists({email}).exec()
  if(userExists || emailExists) return res.sendStatus(409)

  try {
    let adminRole = await Role.findOne({name: leader})
    if (!adminRole) {
      adminRole = await Role.create({ name: leader })
    }
    let editAllPermission = await Permission.findOne({ name: 'all' })
    if (!editAllPermission) {
      editAllPermission = await Permission.create({ name: 'all' })
    }
    let rolePermissionUser = await RolePermission.findOne({role_id: adminRole.id})
    if (!rolePermissionUser) {
      rolePermissionUser = await RolePermission.create({
        role_id: adminRole._id,
        permission_id: editAllPermission._id,
      });
    }
    hashedPassword = await bcrypt.hash(password, 10)

    let user = await User.create({email, username, password: hashedPassword, first_name, last_name, rolePermission_id: rolePermissionUser.id,
      numberPhone, userRole:adminRole.name, permission: editAllPermission.name
    })
    // await UserRole.create({
    //   role_id: adminRole._id,
    //   user_id: user._id,
    // });
    if (!user) {
      console.log("error create lead")
    }
    return res.status(200).json(user)
  } catch (error) {
    console.error('registration error:', error);
    return res.status(500).json({message: "Could not register"})
  }
}


async function login(req, res){
  const {username, password } = req.body
  // if (req.user) {
  //   return  res.status(409).json({message: "You are logged in "})
  // }

  if(!username || !password) return res.status(422).json({'message': 'Invalid fields'})
  
  const user = await User.findOne({username}).exec()

  if(!user) return res.status(401).json({message: "Username or password is incorrect"})

  const match = await bcrypt.compare(password, user.password)

  if(!match) return res.status(401).json({message: "Username or password is incorrect"})

  const accessToken = jwt.sign(
    {
      id: user.id
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: '1800s'
    }
  )

  const refreshToken = jwt.sign(
    {
      id: user.id
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: '1d'
    }
  )

  user.refresh_token = refreshToken
  await user.save()

  res.cookie('refresh_token', refreshToken, {httpOnly: true, sameSite: 'None', secure: true, maxAge: 24*60*60*1000})
  res.json({access_token: accessToken})
}

async function logout(req, res){
  const cookies = req.cookies

  if(!cookies.refresh_token) return res.sendStatus(204)

  const refreshToken = cookies.refresh_token
  const user = await User.findOne({refresh_token: refreshToken}).exec()

  if(!user){
    res.clearCookie('refresh_token', {httpOnly: true, sameSite: 'None', secure: true})
  }

  user.refresh_token = ""
  await user.save()

  try{
    
    res.clearCookie('refresh_token', {httpOnly: true, sameSite: 'None', secure: true})
    res.status(204).json({ message: 'Logout success' });
    
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
 
  
}

async function refresh(req, res){
  const cookies = req.cookies
  if(!cookies.refresh_token) return res.sendStatus(401)

  const refreshToken = cookies.refresh_token
  const user = await User.findOne({refresh_token: refreshToken}).exec()

  if(!user) return res.sendStatus(403)
  const refreshUser = user.refresh_token
  
  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    (err, decoded) => {
      if(err || user.id !== decoded.id) {
        console.log(err)

        return res.sendStatus(403)
        
      }

      const accessToken = jwt.sign(
        { id: decoded.id },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '1800s' }
      )

      res.json({access_token: accessToken})
    }
  )
}


async function user(req, res){
  
  const user = req.user
  return res.status(200).json(user)
}


module.exports = {registerAdmin, login, logout, refresh, user}