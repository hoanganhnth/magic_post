const {
  UserRole,
  leader,
  User,
  Role,
  collection_staff,
  transaction_staff,
  collection_head,
  transaction_head,
} = require("../models/User");

function auth(req, res, next) {
  if (req.user?.id) return next();

  return res.sendStatus(401);
}
const checkUserRole = (allowedRole) => async (req, res, next) => {
   
  try {
    if (req.user?.id) {
        
      const id = req.user.id;
      try {
        const userRole = await UserRole.findOne({ user_id: id }).exec();
        if (!userRole) {
          return res.status(403).json({ message: "User does not have a role" });
        }

        const role = await Role.findById(userRole.role_id);
        if (!role) {
          return res.status(403).json({ message: "Role not found" });
        }
        if (role.name === allowedRole) {
          return next(); // Cho phép tiếp tục nếu có quyền
        } else {
          return res.sendStatus(403); // Từ chối quyền nếu không có quyền
        }
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
      }
    }
    return res.sendStatus(401);
  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
};

const isAdmin = checkUserRole(leader);
const isCollectionStaff = checkUserRole(collection_staff);
const isTransactionStaff = checkUserRole(transaction_staff);
const isCollectionHead = checkUserRole(collection_head);
const isTransactionHead = checkUserRole(transaction_head);

// Sử dụng middleware cho nhân viên
module.exports = {
  auth,
  isAdmin,
  isCollectionStaff,
  isTransactionStaff,
  isCollectionHead,
  isTransactionHead,
};
