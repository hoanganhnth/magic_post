const {UserRole, leader, User, Role} = require('../models/User')


function auth(req, res, next){
    if(req.user?.id) return next()
  
    return res.sendStatus(401)
}

const isAdmin = async (req, res, next) => {
    try {
        if (req.user?.id) {
            const id = req.user.id
            
            try {
               
                const userRole = await UserRole.findOne({user_id: id}).exec();
                if (!userRole) {
                  return res.status(403).json({ message: 'User does not have a role' });
                }

                const adminRole =  await Role.findById(userRole.role_id);
                if (!adminRole) {
                    return res.status(403).json({ message: 'Do not find role' });
                }
                if (adminRole.name === leader) {
                    return next() // Cho phép tiếp tục nếu là admin
                  } else {
                    return res.sendStatus(403) // Từ chối quyền nếu không phải admin
                  }
            } catch (error) {
                console.error(error);
                return res.status(500).json({ message: 'Internal Server Error' });
            }
        }
        return res.sendStatus(401)
    } catch (error) {
        console.error(error)
        return res.sendStatus(500)
    }
}
  
module.exports = {
    auth,
    isAdmin
}