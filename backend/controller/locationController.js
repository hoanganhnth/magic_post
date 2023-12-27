const { CollectionPoint, TransactionPoint } = require("../models/Location");
const {
  Permission,
  leader,
  Role,
  collection_staff,
  transaction_staff,
  collection_head,
  transaction_head,
  RolePermission,
  User,
} = require("../models/User");

async function createCollectionPoint(req, res) {
  const { name, address } = req.body;
  try {
    const existPoint = await CollectionPoint.findOne({name})
    if (existPoint) {
      return res.status(409).json({error_code: 1, message: "Point already exists" });
    }
    const newPoint = await CollectionPoint.create({
      name: name,
      address: address,
    });
    let namePer = `Manage ${newPoint.name}`;
    try {
      const permissionPoint = await Permission.create({
        name: namePer,
        collectionPoint_id: newPoint.id,
      });
      try {
        let roleStaff = await Role.findOne({ name: collection_staff });
        let roleHead = await Role.findOne({ name: collection_head });

        if (!roleStaff) {
          roleStaff = await Role.create({
            name: collection_staff,
          });
          console.log("ok")
        }
        if (!roleHead) {
          roleHead = await Role.create({
            name: collection_head,
          });
        }

        // Nếu role chưa tồn tại, tạo mới
        
        const rolePermissionHead = await RolePermission.create({
          role_id: roleHead.id,
          permission_id: permissionPoint.id
        })
        
        const rolePermissionStaff = await RolePermission.create({
          role_id: roleStaff.id,
          permission_id: permissionPoint.id
        })
     
        return res.json({error_code: 0, data: { newPoint, permissionPoint }});
      } catch (error) {
        console.error("create role head and staff error:", error);
        return res
          .status(500)
          .json({error_code: 1, message: "Could not create role head and staff" });
      }
    } catch (err) {
      console.error("create permission CollectionPoint error:", err);
      return res
        .status(500)
        .json({error_code: 1, message: "Could not create permission CollectionPoint" });
    }
  } catch (error) {
    console.error("create CollectionPoint error:", error);
    return res
      .status(500)
      .json({error_code: 1, message: "Could not create CollectionPoint" });
  }
}

async function createTransactionPoint(req, res) {
  const { name, address, collectionPoint_id } = req.body;
  try {
    const existPoint = await TransactionPoint.findOne({name})
    if (existPoint) {
      return res.status(409).json({error_code: 1, message: "Point already exists" });
    }
    const newPoint = await TransactionPoint.create({
      name: name,
      address: address,
      collectionPoint_id: collectionPoint_id,
    });
    let namePer = `Manage ${newPoint.name}`;
    try {
      const permissionPoint = await Permission.create({
        name: namePer,
        transactionPoint_id: newPoint.id,
      });
      try {
        let existingRoleStaff = await Role.findOne({ name: transaction_staff });
        let existingRoleHead = await Role.findOne({ name: transaction_head });

        if (!existingRoleStaff) {
          existingRoleStaff = await Role.create({
            name: transaction_staff,
          });
        }
        const rolePermissionStaff = await RolePermission.create({
          role_id: existingRoleStaff.id,
          permission_id: permissionPoint.id
        })
        if (!existingRoleHead) {
          existingRoleHead = await Role.create({
            name: transaction_head,
          });
          
        }
        const rolePermissionHead = await RolePermission.create({
          role_id: existingRoleHead.id,
          permission_id: permissionPoint.id
        })
        // Nếu role chưa tồn tại, tạo mới
        return res.json({error_code: 0, data: { newPoint, permissionPoint }});
      } catch (error) {
        console.error("create rolePermission head and staff error:", error);
        return res
          .status(500)
          .json({error_code: 1, message: "Could not create rolePermission head and staff" });
      }
    } catch (err) {
      console.error("create permission TransactionPoint error:", err);
      return res
        .status(500)
        .json({error_code: 1, message: "Could not create permission TransactionPoint" });
    }
  } catch (error) {
    console.error("create TransactionPoint error:", error);
    return res
      .status(500)
      .json({error_code:1, message: "Could not create TransactionPoint" });
  }
}

async function deleteTransactionPoint(req, res) {
  const id = req.body.transaction_id;
  if (!id) {
    return res.status(500).json({ message: "Missing id parameter" });
  }
  try {
    const transactionPointToDelete = await TransactionPoint.findById(id);
    if (!transactionPointToDelete) {
      return res
        .status(404)
        .json({ message: "transactionPoint does not found" });
    }
    await transactionPointToDelete.deleteOne();
    try {
      const permission = await Permission.findOne({transactionPoint_id: id})
      await permission.deleteOne()
      await RolePermission.deleteMany({permission_id: permission.id})
     
      return res.json({
        message:
          "TransactionPoint and related transactionPoint records deleted successfully",
      });
    } catch (error) {
      console.error("Delete transactionPoint records error:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  } catch (err) {
    console.error("Delete transactionPoint error:", err);
    return res
      .status(500)
      .json({ message: "Could not delete transactionPoint" });
  }
}

async function deleteCollectionPoint(req, res) {
  const id = req.body.collectionPoint_id;
  if (!id) {
    return res.status(500).json({ message: "Missing id parameter" });
  }
  try {
    const collectionPointToDelete = await CollectionPoint.findById(id);
    if (!collectionPointToDelete) {
      return res
        .status(404)
        .json({ message: "CollectionPoint does not found" });
    }
    try {
      // delete permission and rolepermission relative transaction 
      const transactionPoints = await TransactionPoint.find({collectionPoint_id: id})
      for (const tp of transactionPoints) {
        await TransactionPoint.deleteOne({ _id: tp._id });
        const permission = await Permission.findOne({transactionPoint_id: tp.id})
        await permission.deleteOne()
        await RolePermission.deleteMany({permission_id: permission.id})
      }
      // delete permission and rolepermission collection 
      const permission = await Permission.findOne({collectionPoint_id: collectionPointToDelete.id})
      permission.deleteOne()
      await RolePermission.deleteMany({permission_id: permission.id})
      await collectionPointToDelete.deleteOne();
      return res.json({
        message:
          "CollectionPoint and related transactionPoint records deleted successfully",
      });
    } catch (error) {
      console.error("Delete transactionPoint records error:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  } catch (err) {
    console.error("Delete CollectionPoint error:", err);
    return res
      .status(500)
      .json({ message: "Could not delete CollectionPoint" });
  }
}

async function getAllTransactionPoint(req, res) {
  try {
    const transactionPoint = await TransactionPoint.find();
    const transactionPointsWithCollectionPoint = transactionPoint.map(async (tp) => {
      const permission = await Permission.findOne({transactionPoint_id: tp._id})
      const user = await User.findOne({permission: permission.name})
      const collectionPoint = await CollectionPoint.findById(tp.collectionPoint_id);
      if (!user) {
        return { ...tp.toObject(), collectionPoint: collectionPoint?.name, manageAccount: "", orders:0 };
      }
      return { ...tp.toObject(), collectionPoint: collectionPoint?.name, manageAccount: user.email };
    });
    
    // Wait for all promises to resolve
    const transactionPoints = await Promise.all(transactionPointsWithCollectionPoint);
    
    return res.json({error_code: 0,data: {transactionPoints}});
  } catch (error) {
    console.error("get transactionPoint error:", error);
    return res.status(500).json({error_code: 1, message: "Could not get transactionPoint" });
  }
}

async function getAllCollectionPoint(req, res) {
  try {
    const collectionPoint = await CollectionPoint.find();
    const collectionPointsWithCollectionPoint = collectionPoint.map(async (tp) => {
      const permission = await Permission.findOne({collectionPoint_id: tp._id})
      const user = await User.findOne({permission: permission.name})
      if (!user) {
        return { ...tp.toObject(), manageAccount: "" };
      }
      return { ...tp.toObject(), manageAccount: user.email, orders: 0 };
    });
    
    // Wait for all promises to resolve
    const collectionPoints = await Promise.all(collectionPointsWithCollectionPoint);
    return res.json({error_code: 0, data: {collectionPoints}});
  } catch (error) {
    console.error("get collectionPoint error:", error);
    return res.status(500).json({error_code: 1, message: "Could not get collectionPoint" });
  }
}
async function getAllPoint(req, res) {
  try {
    const collectionPoint = await CollectionPoint.find();
    const collectionPointWithTransactionPoint = collectionPoint.map(async (po) => {
      const transactionPoint = await TransactionPoint.find({collectionPoint_id: po._id})
      return { ...po.toObject(), transactionPoints: transactionPoint}
    })
    const collectionPoints = await Promise.all(collectionPointWithTransactionPoint);
    return res.json({error_code: 0, data: {collectionPoints}});
  } catch (error) {
    console.error("get point error:", error);
    return res.status(500).json({error_code: 1, message: "Could not get point" });
  }
}

module.exports = {
  createCollectionPoint,
  createTransactionPoint,
  deleteTransactionPoint,
  deleteCollectionPoint,
  getAllTransactionPoint,
  getAllCollectionPoint,
  getAllPoint
};
