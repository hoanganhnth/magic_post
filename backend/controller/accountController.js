const { Role, Permission, RolePermission,User,UserRole, leader } = require('../models/User')
const randomstring = require('randomstring');
const bcrypt = require('bcrypt')
async function registerStaff(req, res) {
    const {email, first_name, last_name, id_role} = req.body
    if(!email || !first_name || !last_name) {
      return res.status(422).json({'message': 'Invalid fields'})
    }
    const username = generateUsername(first_name, last_name, email);
    const password = generatePassword();
    const userExists = await User.exists({username}).exec()
    const emailExists = await User.exists({email}).exec()
    if(userExists || emailExists) return res.sendStatus(409)
    try {
      
      hashedPassword = await bcrypt.hash(password, 10)
  
      let user = await User.create({email, username, password: hashedPassword, first_name, last_name})
      if (!id_role) {
        await UserRole.create({
          role_id: id_role,
          user_id: user._id,
        });
      }
      return res.status(201).json(user)
    } catch (error) {
      console.error('registration error:', error);
      return res.status(400).json({message: "Could not register"})
    }
  }
  function generateUsername(firstName, lastName, email) {
    const randomPart = randomstring.generate({
      length: 5, // Độ dài của chuỗi ngẫu nhiên
      charset: 'alphabetic',
    });
  
    const username = `${firstName.toLowerCase()}${lastName.toLowerCase()}${randomPart}`;
  
    return username;
  }
  
  function generatePassword() {
    const password = randomstring.generate({
      length: 10, // Độ dài của mật khẩu
      charset: 'alphanumeric',
    });
  
    return password;
}
async function showAllStaff(req, res){
    try {
        const adminRole = await Role.findOne({ name: leader });

        if (!adminRole) {
          console.error(`Role ${leader} not found.`);
          return [];
        }
        
        // Tìm tất cả người dùng có vai trò "admin"
        const adminUsers = await UserRole.find({ role_id: adminRole._id }).select('user_id');
       
        // Lấy mảng các ID người dùng có vai trò "admin"
        const adminUserIds = adminUsers.map((userRole) => userRole.user_id);
        // console.log(adminUsers)
        // Tìm tất cả người dùng không có vai trò "admin"
        const usersWithoutLeaderRole = await User.find({
          _id: { $nin: adminUserIds }, // $nin là toán tử "not in"
        });
        return res.status(200).json(usersWithoutLeaderRole)
    } catch (error) {
        console.error('get user error:', error);
        return res.status(400).json({message: "Could not get user"})

    }
}

async function showAllRole(req, res) {
    try {
        const roles = await Role.find();
        return res.json(roles);
    } catch (error) {
        console.error('get role error:', error);
        return res.status(400).json({message: "Could not get role"})
    }
}

async function createRole(req, res) {
    try {
        const { name } = req.body;
        if (!name || name.trim() === '') {
            return res.status(400).json({ message: 'Name cannot be empty' });
          }
      // Kiểm tra xem role đã tồn tại chưa
        const existingRole = await Role.findOne({ name });

        if (existingRole) {
        return res.status(409).json({ message: 'Role already exists' });
        }

        // Nếu role chưa tồn tại, tạo mới
        const newRole = await Role.create({ name });

        return res.json(newRole);
    } catch (error) {
        console.error('create role error:', error);
        return res.status(400).json({message: "Could not create role"})
    }
}



async function deleteStaff(req, res) {
    try {
        const staffIdToDelete = req.body.userId
        if (!staffIdToDelete) {
            return res.status(400).json({ message: 'Missing userId parameter' })
          }
      
          // Kiểm tra xem userId có tồn tại không
          const userToDelete = await User.findById(staffIdToDelete);
          if (!userToDelete) {
            return res.status(404).json({ message: 'User not found' })
          }
          console.log(userToDelete)
          // Thực hiện xóa người dùng
          await userToDelete.deleteOne()
          // Thực hiện xóa trong user role
          try {
            await UserRole.deleteMany({ user_id: userToDelete._id });
            return res.json({ message: 'User and related UserRole records deleted successfully' });
          } catch (error) {
            console.error('Delete UserRole records error:', error);
            return res.status(500).json({ message: 'Internal Server Error' });
          }          
          
    } catch (err) {
        console.error('delete user error:', err);
        return res.status(400).json({message: "Could not delete user"})
    }
}

async function grantPermissions(req, res) {
    
}

module.exports = {
    allStaff: showAllStaff,
    deleteStaff,
    grantPermissions,
    showAllRole,
    createRole,
    registerStaff
    }