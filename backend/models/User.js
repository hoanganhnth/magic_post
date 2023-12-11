const mongoose = require("mongoose");
const moment = require('moment');


const roleSchema = new mongoose.Schema({
  name: String,
});
roleSchema.set("timestamps", {
  createdAt: "created_at",
  updatedAt: "updated_at",
});

roleSchema.set("toObject", { virtuals: true });
roleSchema.set("toJSON", { 
  virtuals: true,
  transform: function (doc, ret) {
    ret.created_at = moment(ret.created_at).format("HH:mm:ss, DD-MM-YYYY");
    ret.updated_at = moment(ret.updated_at).format("HH:mm:ss, DD-MM-YYYY");
    delete ret._id;
    delete ret.__v;
  }
});
const permissionSchema = new mongoose.Schema({
  name: String,
  transactionPoint_id: { type: mongoose.Schema.Types.ObjectId, ref: "TransactionPoint" },
  collectionPoint_id: { type: mongoose.Schema.Types.ObjectId, ref: "CollectionPoint" },
});

permissionSchema.set("timestamps", {
  createdAt: "created_at",
  updatedAt: "updated_at",
});

permissionSchema.set("toObject", { virtuals: true });
permissionSchema.set("toJSON", { 
  virtuals: true,
  transform: function (doc, ret) {
    ret.created_at = moment(ret.created_at).format("HH:mm:ss, DD-MM-YYYY");
    ret.updated_at = moment(ret.updated_at).format("HH:mm:ss, DD-MM-YYYY");
    delete ret._id;
    delete ret.__v;
  }
});
const rolePermissionSchema = new mongoose.Schema({
  role_id: { type: mongoose.Schema.Types.ObjectId, ref: "Role" },
  permission_id: { type: mongoose.Schema.Types.ObjectId, ref: "Permission" },
});

rolePermissionSchema.set("timestamps", {
  createdAt: "created_at",
  updatedAt: "updated_at",
});

rolePermissionSchema.set("toObject", { virtuals: true });
rolePermissionSchema.set("toJSON", { 
  virtuals: true,
  transform: function (doc, ret) {
    ret.created_at = moment(ret.created_at).format("HH:mm:ss, DD-MM-YYYY");
    ret.updated_at = moment(ret.updated_at).format("HH:mm:ss, DD-MM-YYYY");
    delete ret._id;
    delete ret.__v;
  }
});

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    unique: true,
    validate: {
      validator: function (value) {
        // Your email validation logic here
        // Example: Check if the value is a valid email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value);
      },
      message: "Invalid email format",
    },
  },
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    min: 6,
  },
  rolePermission_id: { type: mongoose.Schema.Types.ObjectId, ref: "RolePermission" },
  refresh_token: String,
});
// const userRoleSchema = new mongoose.Schema({
//   role_id: { type: mongoose.Schema.Types.ObjectId, ref: "Role" },
//   user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
// });

userSchema.set("timestamps", {
  createdAt: "created_at",
  updatedAt: "updated_at",
});

userSchema.set("toObject", { virtuals: true });
userSchema.set("toJSON", { 
  virtuals: true,
  transform: function (doc, ret) {
    ret.created_at = moment(ret.created_at).format("HH:mm:ss, DD-MM-YYYY");
    ret.updated_at = moment(ret.updated_at).format("HH:mm:ss, DD-MM-YYYY");
    delete ret._id;
    delete ret.__v;
  }
});

// Models
const Role = mongoose.model("Role", roleSchema);
const Permission = mongoose.model("Permission", permissionSchema);
const RolePermission = mongoose.model("RolePermission", rolePermissionSchema);
const User = mongoose.model("User", userSchema);
// const UserRole = mongoose.model("UserRole", userRoleSchema);
const leader = "leader";
const collection_staff = "Collection staff";
const transaction_staff = "Transaction staff";
const collection_head = "Head of collection point";
const transaction_head = "Head of transaction point";

module.exports = {
  Role,
  Permission,
  RolePermission,
  User,
  // UserRole,
  leader,
  collection_staff,
  transaction_staff,
  collection_head,
  transaction_head,
};
