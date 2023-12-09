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
const { TransactionPoint, CollectionPoint } = require("../models/Location");

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
async function createShipmentFromTPToCP(req, res) {
  const idShipment = req.body.idShipment;
  if (!idShipment) {
    return res.status(400).json({ message: "Missing idShipment" });
  }
  try {
    const permission = await Permission.findOne({ name: req.user.permission });
    
    if (!permission) {
      return res.status(404).json({ message: "Permission not found" });
    }
    console.log(permission.name)
    const transactionPoint = await TransactionPoint.findById(
      permission.transactionPoint_id
    );
    console.log(transactionPoint.name)
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
    let collectionShipment = await CollectionShipment.findOne({
      shipment_id: idShipment,
      collectionPoint_id: transactionPoint.collectionPoint_id
    })
    if (!collectionShipment) {
      collectionShipment = await CollectionShipment.create({
        state: "Waiting",
        shipment_id: idShipment,
        collectionPoint_id: transactionPoint.collectionPoint_id,
      });
    }
    console.log(transactionPoint.collectionPoint_id)
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

async function deleteShipment(req, res) {
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

    await CollectionShipment.findOneAndDelete({shipment_id: shipment._id})
    await TransactionShipment.findOneAndDelete({shipment_id: shipment._id})
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

async function confirmShipmentFromTPToCP(req, res) {
  const shipmentId = req.body.shipmentId
  if (!shipmentId) {
    res.status(500).json({ message: "Missing id parameter" })
  }
  try {
      const permission = await Permission.findOne({ name: req.user.permission })
      if (!permission) {
        return res.status(404).json({ message: "Permission not found" })
      }
      // const collectionPoint = await CollectionPoint.findById(
      //   permission.collectionPoint_id)
        
      const updatedShipment = await Shipment.findOneAndUpdate(
        { _id: shipmentId, status: "Shipped" },
        { $set: { status: "ArrivedDestination" } },
        { new: true }
      )
      if (!updatedShipment) {
        return res.status(500).json({ message: "Shipment have not been arrived destination" });
      }
      await CollectionShipment.findOneAndUpdate(
        {shipment_id: updatedShipment._id, state: "Waiting"},
        { $set: {state: "Recieve"}},
        { new: true }
      )
      await TransactionShipment.findOneAndDelete({shipment_id: shipmentId, state: "Tranfer"})
      return res.json({message: "Confirm shipment to collectionPoint success and delete shipment of transaction"})

  } catch(error) {
    console.error("Confirm shipment collection point error:", error);
    return res.status(500).json({message: "Can not confirm shipment collection point"})
    }
}

async function confirmShipmentFromCPToCP(req, res) {
  const shipmentId = req.body.shipmentId
  if (!shipmentId) {
    res.status(500).json({ message: "Missing id parameter" })
  }
  try {    
    const updatedShipment = await Shipment.findOneAndUpdate(
      { _id: shipmentId, status: "Shipped" },
      { $set: { status: "ArrivedDestination" } },
      { new: true }
    )
    if (!updatedShipment) {
      return res.status(500).json({ message: "Shipment have not been arrived destination" });
    }
    await CollectionShipment.findOneAndUpdate(
      {shipment_id: updatedShipment._id, state: "Waiting"},
      { $set: {state: "Recieve"}},
      { new: true } 
    )
    await CollectionShipment.findOneAndDelete({shipment_id: shipmentId, state: "Tranfer"})
    return res.json({message: "Confirm shipment to collectionPoint success and delete shipment of transaction"})

  } catch(error) {
    console.error("Confirm shipment collection point error:", error);
    return res.status(500).json({message: "Can not confirm shipment collection point"})
    }
}


async function confirmShipmentFromCPToTP(req, res) {
  const shipmentId = req.body.shipmentId
  if (!shipmentId) {
    res.status(500).json({ message: "Missing id parameter" })
  }
  try {    
    const updatedShipment = await Shipment.findOneAndUpdate(
      { _id: shipmentId, status: "Shipped" },
      { $set: { status: "ArrivedDestination" } },
      { new: true }
    )
    if (!updatedShipment) {
      return res.status(500).json({ message: "Shipment have not been arrived destination" });
    }
    await TransactionShipment.findOneAndUpdate(
      {shipment_id: updatedShipment._id, state: "Waiting"},
      { $set: {state: "Recieve"}},
      { new: true }
    )
    await CollectionShipment.findOneAndDelete({shipment_id: shipmentId, state: "Tranfer"})
    return res.json({message: "Confirm shipment to transaction point and delete shipment of collection success"})

  } catch(error) {
    console.error("Confirm shipment collection point error:", error);
    return res.status(500).json({message: "Can not confirm shipment from collection point"})
    }
}

async function confirmShipmentSuOrCa(req, res) {
  const {shipmentId, Success} = req.body
  if (!shipmentId) {
    res.status(500).json({ message: "Missing id parameter" })
  }
  try {    
    if (Success) {
      const updatedShipment = await Shipment.findOneAndUpdate(
        { _id: shipmentId, status: "Delivering" },
        { $set: { status: "Successed" } },
        { new: true }
      )
      if (!updatedShipment) {
        return res.status(500).json({ message: "State is updated" });
      }
      await TransactionShipment.findOneAndDelete({shipment_id: shipmentId, state: "Tranfer"})
    return res.json({message: "Confirm shipment to user success"})
    } else {
      const updatedShipment = await Shipment.findOneAndUpdate(
        { _id: shipmentId, status: "Delivering" },
        { $set: { status: "Canceled" } },
        { new: true }
      )
      if (!updatedShipment) {
        return res.status(500).json({ message: "State is updated" });
      }
      // trả hàng
    }
  } catch(error) {
    console.error("Confirm shipment collection point error:", error);
    return res.status(500).json({message: "Can not confirm shipment to user success"})
    }
}

async function createShipmentFromCPToCP(req, res) {
  const {idShipment, idNewCollectionPoint} = req.body;
  if (!idShipment) {
    return res.status(400).json({ message: "Missing idShipment" });
  }
  try {
    const updatedShipment = await Shipment.findOneAndUpdate(
        { _id: idShipment, status: "ArrivedDestination" },
        { $set: { status: "Shipped" } },
        { new: true }
      );
    if (!updatedShipment) {
      return res.status(500).json({ message: "Shipment have been shipped" })
    }

    const oldCollectionShipment = await CollectionShipment.findOneAndUpdate(
      {state: "Recieve", shipment_id: idShipment},
      {$set: {state: "Tranfer"}},
      {new: true}
    )
    let newCollectionShipment = await CollectionShipment.findOne({
      shipment_id: idShipment,
      collectionPoint_id: idNewCollectionPoint,
    })
    if (!newCollectionShipment) {
      newCollectionShipment = await CollectionShipment.create({
        state: "Waiting",
        shipment_id: idShipment,
        collectionPoint_id: idNewCollectionPoint,
      });
    }
    
    return res.json({ updatedShipment, oldCollectionShipment, newCollectionShipment });
    // update status
  } catch (error) {
    console.error("create shipment to collection point error:", error);
    return res
      .status(500)
      .json({ message: "Could not create shipment to collection point" });
  }
}
async function createShipmentFromCPToTP(req, res) {
  const {idShipment, idNewTransactionPoint} = req.body;
  if (!idShipment) {
    return res.status(400).json({ message: "Missing idShipment" });
  }
  try {
    const updatedShipment = await Shipment.findOneAndUpdate(
        { _id: idShipment, status: "ArrivedDestination" },
        { $set: { status: "Shipped" } },
        { new: true }
      );
    if (!updatedShipment) {
      return res.status(500).json({ message: "Shipment have been shipped" })
    }

    const oldCollectionShipment = await CollectionShipment.findOneAndUpdate(
      {state: "Recieve", shipment_id: idShipment},
      {$set: {state: "Tranfer"}},
      {new: true}
    )
    let newTransactionShipment = await TransactionShipment.findOne({
      shipment_id: idShipment,
      transactionPoint_id: idNewTransactionPoint,
    })
    if (!newTransactionShipment) {
      newTransactionShipment = await TransactionShipment.create({
        state: "Waiting",
        shipment_id: idShipment,
        transactionPoint_id: idNewTransactionPoint,
      });
    }
   
    return res.json({ updatedShipment, oldCollectionShipment, newTransactionShipment });
    // update status
  } catch (error) {
    console.error("create shipment to transaction point error:", error);
    return res
      .status(500)
      .json({ message: "Could not create shipment to transaction point" });
  }
}

async function createShipmentToUser(req, res) {
  const {idShipment} = req.body;
  if (!idShipment) {
    return res.status(400).json({ message: "Missing idShipment" });
  }
  try {
    const updatedShipment = await Shipment.findOneAndUpdate(
        { _id: idShipment, status: "ArrivedDestination" },
        { $set: { status: "Delivering" } },
        { new: true }
      );
    if (!updatedShipment) {
      return res.status(500).json({ message: "Shipment have been delivering" })
    }

    const oldTransactionShipment = await TransactionShipment.findOneAndUpdate(
      {state: "Recieve", shipment_id: idShipment},
      {$set: {state: "Tranfer"}},
      {new: true}
    )
    return res.json({ updatedShipment, oldTransactionShipment});
    // update status
  } catch (error) {
    console.error("create shipment to transaction point error:", error);
    return res
      .status(500)
      .json({ message: "Could not create shipment to transaction point" });
  }
}

module.exports = {
  createNewShipment,
  deleteNewShipment,
  createShipmentFromTPToCP,
  getAllShipmentTran,
  confirmShipmentFromTPToCP,
  createShipmentFromCPToCP,
  confirmShipmentFromCPToCP,
  createShipmentFromCPToTP,
  confirmShipmentFromCPToTP,
  createShipmentToUser,
  confirmShipmentSuOrCa,
  deleteShipment
};

