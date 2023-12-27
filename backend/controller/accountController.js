const {
  Role,
  Permission,
  RolePermission,
  User,
  leader,
  collection_staff,
  transaction_staff,
  collection_head,
  transaction_head,
} = require("../models/User");
const randomstring = require("randomstring");
const bcrypt = require("bcrypt");
const {  user } = require("./authController");

async function registerStaff(req, res) {
  const { email, first_name, last_name, role_id, permission_id, numberPhone } = req.body;
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
        res.status(404).json({error_code: 1, message: 'Permission not found' });
      }
      switch (req.user.userRole) {
        case leader:
          if (role_id && permission_id) {
         
            let role = await Role.findById(role_id)
            if (!role) {
              res.status(404).json({error_code: 1, message: 'Role not found' });
            }
            let permissionHead = await Permission.findById(permission_id)
            if (!permissionHead) {
              res.status(404).json({error_code: 1, message: 'permission Head not found' });
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
              userRole: role.name,
              permission: permissionHead.name,
              numberPhone,
              rolePermission_id: rolePermissionUser.id
            });
            return res.status(201).json({error_code: 0, data: {
              username: user.username,
              password: password,
              id: user.id
            }});
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
            userRole: transactionStaff.name,
            permission: permission.name,
            numberPhone,
            rolePermission_id: rolePermissionTracUser.id
          });
          return res.status(201).json({error_code: 0, data: {
            username: userTran.username, password: password, id: userTran.id
          }});

        case collection_head:
          let collectionStaff = await Role.findOne({name: collection_staff})
          if (!collectionStaff) {
            collectionStaff = await Role.create({ name: collection_staff })
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
            userRole: collectionStaff.name,
            permission: permission.name,
            numberPhone,
            rolePermission_id: rolePermissionUser.id
          });
          return res.status(201).json({error_code: 0, data: {
            username: user.username, password: password, id: user.id
          }});
        default:  
          return res.status(403).json({error_code: 1, message: "User does not have a role" });
      }
    }
    
  } catch (error) {
    console.error("registration error:", error);
    return res.status(500).json({error_code: 1, message: "Could not register" });
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
    

    // find transaction staff
    const headTranPermission = await RolePermission.find({ role_id: headTranRole._id }).select(
      "_id"
    );
    const headTranIds = headTranPermission.map((per) => per._id);
    const transactionHead = await User.find({
      rolePermission_id: headTranIds, 
    });

    // find collection staff
    const headColPermission = await RolePermission.find({ role_id: headColRole._id }).select(
      "_id"
    );
    const headColIds = headColPermission.map((per) => per._id);
    const collectionHead = await User.find({
      rolePermission_id: headColIds, 
    });
    
    

    return res.status(200).json({error_code: 0, data: {
      transactionHead,collectionHead
    }});
  } catch (error) {
    console.error("get head error:", error);
    return res.status(500).json({error_code: 1, message: "Could not get head" });
  }
}

async function getAllStaff(req, res) {
  try {
    if (!req.user.userRole) {
      return res.status(403).json({error_code: 1, message: "User does not have a role" });
    }
    let staffTranRole, staffColRole ;
    const permissionRoleHead = await RolePermission.findById(req.user.rolePermission_id);
    if (!permissionRoleHead) {
      return res.status(404).json({error_code: 1, message: "Rolepermission head not found" });
    }

    switch(req.user.userRole) {
      case transaction_head:
        staffTranRole = await Role.findOne({ name: transaction_staff });
        if (!staffTranRole ) {
          console.error(`Role ${transaction_staff} not found.`);
        }
        const permissionRoleTranStaff = await RolePermission.findOne({role_id: staffTranRole._id, permission_id: permissionRoleHead.permission_id})
        if (!permissionRoleTranStaff) {
          return res.status(404).json({error_code: 1, message: "Rolepermission staff not found" });
        }
        const transactionStaff = await User.find({
          rolePermission_id: permissionRoleTranStaff
        })
        return res.status(200).json({error_code: 0,data: {transactionStaff}}); 

      case collection_head:
        staffColRole = await Role.findOne({ name: collection_staff });
        if (!staffColRole ) {
          console.error(`Role ${collection_staff} not found.`);
        }
        const permissionRoleColStaff = await RolePermission.findOne({role_id: staffColRole._id, permission_id: permissionRoleHead.permission_id})
        if (!permissionRoleColStaff) {
          return res.status(404).json({error_code: 1, message: "Rolepermission staff not found" });
        }
        const collectionStaff = await User.find({
          rolePermission_id: permissionRoleColStaff
        })
        
        return res.status(200).json({error_code: 0,data: {collectionStaff}});

      default:
        console.log("User not permission")
        return res.sendStatus(403);        
    }  
  } catch (error) {
    console.error("get head error:", error);
    return res.status(500).json({error_code: 1, message: "Could not get head" });
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
    const transactionPermission = permission.filter(
      per => per.transactionPoint_id
    );
    const collectionPermission = permission.filter(
      per => per.collectionPoint_id
    );
    return res.json({error_code: 0, data: {
      collectionPermission,
      transactionPermission,
    } });
  } catch (error) {
    console.error("get permission error:", error);
    return res.status(500).json({error_code: 1, message: "Could not get permission" });
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
    const staffIdToDelete = req.query.userId;
    if (!staffIdToDelete) {
      return res.status(400).json({error_code: 1, message: "Missing userId parameter" });
    }
    console.log(req.user.userRole)
    // Kiểm tra xem userId có tồn tại không
    const userToDelete = await User.findById(staffIdToDelete);
    if (!userToDelete) {
      return res.status(404).json({error_code: 1, message: "User not found" });
    }
    if (req.user.userRole === transaction_head) {
      if (userToDelete.userRole === transaction_staff) {
        await userToDelete.deleteOne();
      }
    } else if (req.user.userRole === collection_head) {
      if (userToDelete.userRole === collection_staff) {
        await userToDelete.deleteOne();
      }
    } else if (req.user.userRole === leader) {
      await userToDelete.deleteOne();
    } else {
      return res.status(403).json({error_code: 1, message: "Permission not found"})
    }

    // Thực hiện xóa người dùng
   
    return res.json({error_code: 0, message: "Delete success"})
  } catch (err) {
    console.error("delete user error:", err);
    return res.status(500).json({ message: "Could not delete user" });
  }
}

async function updateUser(req, res) {
  try {
    const userUpdate = await User.find();
    userUpdate.forEach(async (user) => {
      // Cập nhật trường userRole cho mỗi người dùng

      const permissionRole = await RolePermission.findById(user.rolePermission_id);
      let permission;
      if (permissionRole.permission_id) {
        permission = await Permission.findById(permissionRole.permission_id)
      }
     

      await User.updateOne({ _id: user._id }, { $set: { permission: permission.name } });
    });
    const newUser = await User.find();
    return res.status(201).json(newUser)
  } catch(error) {
    console.error("update user error:", err);
    return res.status(500).json({ message: "Could not update user" });
  }
}

async function updateHead(req, res) {
  try {
    const {userId, first_name, last_name, email, permission_id, numberPhone, role_id} = req.body;
    if (!userId) {
      return res.status(422).json({error_code: 1, message: "Invalid fields"});
    }
    const user = await User.findById(userId)
    let permission = await Permission.findById(permission_id)
    if (!permission || !permission_id) {
      permission = await Permission.findOne({name: user.permission})
    }
    const rolePer = await RolePermission.findOne({role_id: role_id, permission_id: permission._id})
    const newUser = await User.findByIdAndUpdate(userId, 
      {
        first_name: first_name,
        last_name: last_name,
        email: email,
        permission: permission.name,
        numberPhone: numberPhone,
        rolePermission_id:rolePer.id
      },
      { new: true }
    )
    return res.status(201).json({error_code:0, data:{newUser}})
  } catch(error) {
    console.error("update user error:", error);
    return res.status(500).json({error_code: 1, message: "Could not update user" });
  }
}

async function updateHead(req, res) {
  try {
    const {userId, first_name, last_name, email, permission_id, numberPhone, role_id} = req.body;
    if (!userId) {
      return res.status(422).json({error_code: 1, message: "Invalid fields"});
    }
    const user = await User.findById(userId)
    let permission = await Permission.findById(permission_id)
    if (!permission || !permission_id) {
      permission = await Permission.findOne({name: user.permission})
    }
    const rolePer = await RolePermission.findOne({role_id: role_id, permission_id: permission._id})
    const newUser = await User.findByIdAndUpdate(userId, 
      {
        first_name: first_name,
        last_name: last_name,
        email: email,
        permission: permission.name,
        numberPhone: numberPhone,
        rolePermission_id:rolePer.id
      },
      { new: true }
    )
    return res.status(201).json({error_code:0, data:{newUser}})
  } catch(error) {
    console.error("update user error:", error);
    return res.status(500).json({error_code: 1, message: "Could not update user" });
  }
}
async function updateStaff(req, res) {
  try {
    const {id, first_name, last_name, email, numberPhone} = req.body;
    if (!id) {
      return res.status(422).json({error_code: 1, message: "Invalid fields"});
    }
    const user = await User.findById(id)
    if (req.user.userRole === transaction_head) {
      if (user.userRole !== transaction_staff) {
        return res.status(403).json({error_code: 1, message: "Permission not found"})
      }
    } else if (req.user.userRole === collection_head) {
      if (user.userRole !== collection_staff) {
        return res.status(403).json({error_code: 1, message: "Permission not found"})
      }
    } else {
      return res.status(403).json({error_code: 1, message: "Permission not found"})
    }  
    const newUser = await User.findByIdAndUpdate(id, 
      {
        first_name: first_name,
        last_name: last_name,
        email: email,
        numberPhone: numberPhone,
      },
      { new: true }
    )
    return res.status(201).json({error_code:0, data:{newUser}})
  } catch(error) {
    console.error("update user error:", error);
    return res.status(500).json({error_code: 1, message: "Could not update user" });
  }
}
module.exports = {
  getAllHead,
  getAllStaff,
  deleteStaff,
  showAllRole,
  createRole,
  registerStaff,
  getAllPermission,
  updateUser,
  updateHead,
  updateStaff,
};
