const {
  Role,
  Permission,
  RolePermission,
  User,
  UserRole,
  leader,
  collection_staff,
  transaction_staff,
  collection_head,
  transaction_head,
} = require("../models/User");
const randomstring = require("randomstring");
const bcrypt = require("bcrypt");
async function registerStaff(req, res) {
  const { email, first_name, last_name, role_id, permission_id } = req.body;
  if (!email || !first_name || !last_name) {
    return res.status(422).json({ message: "Invalid fields" });
  }
  const username = generateUsername(first_name, last_name, email);
  const password = generatePassword();
  const userExists = await User.exists({ username }).exec();
  const emailExists = await User.exists({ email }).exec();

  if (userExists || emailExists) return res.sendStatus(409);
  try {
    hashedPassword = await bcrypt.hash(password, 10);
    if (req.user.userRole && req.user.permission) {
      let permission = await Permission.findOne({name: req.user.permission})
      if (!permission) {
        res.status(404).json({ message: 'Permission not found' });
      }
      switch (req.user.userRole) {
        case leader:
          if (role_id && permission_id) {
         
            let role = await Role.findById(role_id)
            if (!role) {
              res.status(404).json({ message: 'Role not found' });
            }
            let permissionHead = await Permission.findById(permission_id)
            if (!permissionHead) {
              res.status(404).json({ message: 'permission Head not found' });
            }
            let rolePermissionUser = await RolePermission.findOne({role_id: role.id, permission_id: permission_id})
            if (!rolePermissionUser) {
              rolePermissionUser = await RolePermission.create({
                role_id: role.id,
                permission_id: permission.id,
              });
            }
            let user = await User.create({
              email,
              username,
              password: hashedPassword,
              first_name,
              last_name,
              rolePermission_id: rolePermissionUser.id
            });
            return res.status(201).json({username: user.username, password: password, id: user.id});
          }
          break;
        case transaction_head:
          let transactionStaff = await Role.findOne({name: transaction_staff})
          if (!transactionStaff) {
            transactionStaff = await Role.create({ name: transaction_staff })
          }
          let rolePermissionTracUser = await RolePermission.findOne({role_id: transactionStaff.id, permission_id: permission._id})
          if (!rolePermissionTracUser) {
            rolePermissionTracUser = await RolePermission.create({
              role_id: transactionStaff.id,
              permission_id: permission.id,
            });
          }
          let userTran = await User.create({
            email,
            username,
            password: hashedPassword,
            first_name,
            last_name,
            rolePermission_id: rolePermissionTracUser.id
          });
          return res.status(201).json({username: userTran.username, password: password, id: userTran.id});

        case collection_head:
          let collectionStaff = await Role.findOne({name: collectionStaff})
          if (!collectionStaff) {
            collectionStaff = await Role.create({ name: collectionStaff })
          }
          let rolePermissionUser = await RolePermission.findOne({role_id: collectionStaff.id, permission_id: permission._id})
          if (!rolePermissionUser) {
            rolePermissionUser = await RolePermission.create({
              role_id: collectionStaff.id,
              permission_id: permission.id,
            });
          }
          let user = await User.create({
            email,
            username,
            password: hashedPassword,
            first_name,
            last_name,
            rolePermission_id: rolePermissionUser.id
          });
          return res.status(201).json({username: user.username, password: password, id: user.id});
        default:  
          return res.status(403).json({ message: "User does not have a role" });
      }
    }
    
  } catch (error) {
    console.error("registration error:", error);
    return res.status(500).json({ message: "Could not register" });
  }
}
function generateUsername(firstName, lastName, email) {
  const randomPart = randomstring.generate({
    length: 6, // Độ dài của chuỗi ngẫu nhiên
    charset: "alphabetic",
  });

  const username = `${firstName.toLowerCase()}${lastName.toLowerCase()}${randomPart}`;

  return username;
}

function generatePassword() {
  const password = randomstring.generate({
    length: 10, // Độ dài của mật khẩu
    charset: "alphanumeric",
  });

  return password;
}
async function getAllHead(req, res) {
  try {
    const headTranRole = await Role.findOne({ name: transaction_head });
    const headColRole = await Role.findOne({ name: collection_head });
    if (!headTranRole ) {
      console.error(`Role ${transaction_head} not found.`);
    }
    if (!headColRole ) {
      console.error(`Role ${collection_head} not found.`);
      return [];
    }
    const roleHead = [headColRole._id, headTranRole._id];

    // Tìm tất cả permsion có vai trò "head"
    const headPermission = await RolePermission.find({ role_id: {$in: roleHead} }).select(
      "_id"
    );


    // Lấy mảng các ID permission có vai trò "head"
    const headPerIds = headPermission.map((per) => per._id);

    // console.log(adminUsers)
    // Tìm tất cả người có vai trò "head"
    const usersheadRole = await User.find({
      rolePermission_id: headPerIds, 
    });
    return res.status(200).json(usersheadRole);
  } catch (error) {
    console.error("get head error:", error);
    return res.status(500).json({ message: "Could not get head" });
  }
}

async function getAllStaff(req, res) {
  try {
    if (!req.user.userRole) {
      return res.status(403).json({ message: "User does not have a role" });
    }
    let staffRole;
    switch(req.user.userRole) {
      case transaction_head:
        staffRole = await Role.findOne({ name: transaction_staff });
        if (!staffRole ) {
          console.error(`Role ${transaction_staff} not found.`);
        }
        break;
        
      case collection_head:
        staffRole = await Role.findOne({ name: collection_staff });
        if (!staffRole ) {
          console.error(`Role ${collection_staff} not found.`);
        }
        break;
      default:
        console.log("User not permission")
        return res.sendStatus(403);        
    }
    const permissionRoleHead = await RolePermission.findById(req.user.rolePermission_id);
    if (!permissionRoleHead) {
      return res.status(404).json({ message: "Rolepermission head not found" });
    }
    const permissionRoleStaff = await RolePermission.findOne({role_id: staffRole._id, permission_id: permissionRoleHead.permission_id})
    if (!permissionRoleStaff) {
      return res.status(404).json({ message: "Rolepermission staff not found" });
    }
    const userStaff = await User.find({
      rolePermission_id: permissionRoleStaff
    })
    return res.status(200).json(userStaff);
  } catch (error) {
    console.error("get head error:", error);
    return res.status(500).json({ message: "Could not get head" });
  }
}

async function showAllRole(req, res) {
  try {
    const roles = await Role.find();
    return res.json(roles);
  } catch (error) {
    console.error("get role error:", error);
    return res.status(500).json({ message: "Could not get role" });
  }
}


async function getAllPermission(req, res) {
  try {
    const permission = await Permission.find();
    return res.json(permission);
  } catch (error) {
    console.error("get permission error:", error);
    return res.status(500).json({ message: "Could not get permission" });
  }
}

async function createRole(req, res) {
  try {
    const { name } = req.body;
    if (!name || name.trim() === "") {
      return res.status(400).json({ message: "Name cannot be empty" });
    }
    // Kiểm tra xem role đã tồn tại chưa
    const existingRole = await Role.findOne({ name });

    if (existingRole) {
      return res.status(409).json({ message: "Role already exists" });
    }

    // Nếu role chưa tồn tại, tạo mới
    const newRole = await Role.create({ name });

    return res.json(newRole);
  } catch (error) {
    console.error("create role error:", error);
    return res.status(500).json({ message: "Could not create role" });
  }
}

async function deleteStaff(req, res) {
  try {
    const staffIdToDelete = req.body.userId;
    if (!staffIdToDelete) {
      return res.status(400).json({ message: "Missing userId parameter" });
    }

    // Kiểm tra xem userId có tồn tại không
    const userToDelete = await User.findById(staffIdToDelete);
    if (!userToDelete) {
      return res.status(404).json({ message: "User not found" });
    }
    // Thực hiện xóa người dùng
    await userToDelete.deleteOne();
    return req.json({message: "Delete success"})
  } catch (err) {
    console.error("delete user error:", err);
    return res.status(500).json({ message: "Could not delete user" });
  }
}


async function getPassword(req, res) {
  const idUser = req.body.idUser
  
}

module.exports = {
  getAllHead,
  getAllStaff,
  deleteStaff,
  showAllRole,
  createRole,
  registerStaff,
  getAllPermission,
};
