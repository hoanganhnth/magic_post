const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roleSchema = new mongoose.Schema({
  name: String,
});

const permissionSchema = new mongoose.Schema({
  name: String,
});

const rolePermissionSchema = new mongoose.Schema({
  role_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Role' },
  permission_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Permission' },
});

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
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
      message: 'Invalid email format',
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
  refresh_token: String,
});
const userRoleSchema = new mongoose.Schema({
  role_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Role' },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

userSchema.set('toObject', { virtuals: true });
userSchema.set('toJSON', { virtuals: true });
userSchema.set('timestamps', { createdAt: 'created_at', updatedAt: 'updated_at' });

// Models
const Role = mongoose.model('Role', roleSchema);
const Permission = mongoose.model('Permission', permissionSchema);
const RolePermission = mongoose.model('RolePermission', rolePermissionSchema);
const User = mongoose.model('User', userSchema);
const UserRole = mongoose.model('UserRole', userRoleSchema);
const leader = 'leader'

module.exports = {
  Role,
  Permission,
  RolePermission,
  User,
  UserRole,
  leader
};