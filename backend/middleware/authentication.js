const jwt = require('jsonwebtoken')
const {User, UserRole, Role } = require('../models/User')
function authentication(req, res, next) {
  
  const authHeader = req.headers.authorization || req.headers.Authorization
  if(authHeader?.startsWith('Bearer')) {
    const token = authHeader.split(' ')[1]

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
      if(err){
        req.user = {}
        return next()
      }
      try {
        const user = await User.findById(decoded.id).select({ password: 0, refresh_token: 0 }).exec()
        if(user){
          req.user = user.toObject({ getters: true })
          const userRole = await UserRole.findOne({ user_id: user.id }).exec();
          if (!userRole) {
            return res.status(403).json({ message: "User does not have a role" });
          }
          const role = await Role.findById(userRole.role_id);
          if (!role) {
            return res.status(403).json({ message: "Role not found" });
          }
          req.user.userRole = role.name
        }else{
          req.user = {}
        }
  
        return next()
      } catch (error) {
        console.error('authentication error:', error);
        return res.status(400).json({message: "Could not authentication"})
      }

    })

  }else{
    req.user = {}
    return next()
  }
}

module.exports = authentication