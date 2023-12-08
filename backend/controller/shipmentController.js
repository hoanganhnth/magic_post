const {
  Product,
  Shipment,
  UserAddress,
  TransactionShipment,
  CollectionShipment,
} = require("../models/Shipment");
const {
  leader,
  collection_staff,
  transaction_staff,
  collection_head,
  transaction_head,
  RolePermission,
  Permission,
} = require("../models/User");
const { TransactionPoint } = require("../models/Location");
async function createNewShipment(req, res) {
  const {
    product_type,
    product_name,
    product_weight,
    sender_username,
    sender_phone,
    sender_address,
    receiver_username,
    receiver_phone,
    receiver_address,
  } = req.body;
  if (!req.user.permission) {
    return req.status(403).json({ message: "Permission not found" });
  }
  const permission = await Permission.findOne({ name: req.user.permission });
  if (!permission) {
    return res.status(403).json({ message: "Permission not found" });
  }
  try {
    const product = await Product.create({
      type: product_type,
      name: product_name,
      weight: product_weight,
    });
    if (!product) {
      return res.status(500).json({ message: "Could not create product" });
    }
    const address = await UserAddress.create({
      sender_username,
      sender_address,
      sender_phone,
      receiver_username,
      receiver_phone,
      receiver_address,
    });
    if (!address) {
      return res.status(500).json({ message: "Could not create address" });
    }
    const shipment = await Shipment.create({
      product_id: product._id,
      user_address_id: address.id,
    });

    await TransactionShipment.create({
      shipment_id: shipment.id,
      transactionPoint_id: permission.transactionPoint_id,
    });
    return res.status(201).json({ shipment, product, address });
  } catch (error) {
    console.error("create shipment error:", error);
    return res.status(500).json({ message: "Could not create shipment" });
  }
}
async function createShipmentToCollectionPoint(req, res) {
  const idShipment = req.body.idShipment;
  if (!idShipment) {
    return res.status(400).json({ message: "Missing idShipment" });
  }
  try {
    const permission = await Permission.findOne({ name: req.user.permission });
    if (!permission) {
      return res.status(404).json({ message: "Permission not found" });
    }
    const transactionPoint = TransactionPoint.findById(
      permission.transactionPoint_id
    );
    if (!transactionPoint) {
      return res.status(404).json({ message: "transactionPoint not found" });
    }
    const updatedShipment = await Shipment.findOneAndUpdate(
        { _id: idShipment, status: "Preparing" },
        { $set: { status: "Shipped" } },
        { new: true }
      );
    if (!updatedShipment) {
    return res.status(500).json({ message: "Shipment have been shipped" });
    }

    const collectionShipment = await CollectionShipment.create({
      state: "Waiting",
      shipment_id: idShipment,
      collectionPoint_id: transactionPoint.collectionPoint_id,
    });
    return res.json({ updatedShipment, collectionShipment });
    // update status
  } catch (error) {
    console.error("create shipment to collection point error:", error);
    return res
      .status(500)
      .json({ message: "Could not create shipment to collection point" });
  }
}

async function getAllShipmentTran(req, res) {
  try {
    const rolePermission = await RolePermission.findById(
      req.user.rolePermission_id
    );
    if (!rolePermission) {
      return res.status(404).json({ message: "RolePermission not found" });
    }
    const permission = await Permission.findById(rolePermission.permission_id);
    if (!permission) {
      return res.status(404).json({ message: "Permission not found" });
    }
    const transactionShipment = await TransactionShipment.find({
      transactionPoint_id: permission.transactionPoint_id,
    });
    const transactionShipmentIds = transactionShipment.map(
      (transaction) => transaction.shipment_id
    );

    // Tìm các shipment có _id giống với shipment_id trong danh sách đã lấy
    const relatedShipments = await Shipment.find({
      _id: { $in: transactionShipmentIds },
    });
    return res.status(201).json({ relatedShipments });
  } catch (error) {
    console.error("get shipment transaction point error:", error);
    return res
      .status(500)
      .json({ message: "Could not get shipment transaction point" });
  }
}
async function deleteNewShipment(req, res) {
  const idShipment = req.body.idShipment;
  try {
    const shipment = await Shipment.findById(idShipment);
    if (!shipment) {
      return res.status(404).json({ message: "Shipment not found" });
    }
    const product = await Product.findById(shipment.product_id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    const address = await UserAddress.findById(shipment.user_address_id);
    if (!address) {
      return res.status(404).json({ message: "address not found" });
    }
    const tranShipment = await TransactionShipment.findOneAndDelete({
      shipment_id: shipment._id,
    });
    const colShipment = await CollectionShipment.findOneAndDelete({
      shipment_id: shipment._id,
    });

    await product.deleteOne();
    await address.deleteOne();
    await shipment.deleteOne();
    return res.json({
      message: "Shipment and relative records deleted successfully",
    });
  } catch (error) {
    console.error("delete shipment error:", error);
    return res.status(500).json({ message: "Can not delete shipment" });
  }
}

// const addressNow = function() {
//     if ()
// }
module.exports = {
  createNewShipment,
  deleteNewShipment,
  createShipmentToCollectionPoint,
  getAllShipmentTran,
};
