const {
  Product,
  Shipment,
  UserAddress,
  TransactionShipment,
  CollectionShipment,
  Route,
  shipmentStatus,
  transactionStatus,
  collectionStatus
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
const distanceCalculator = require("../utils/distanceCalculator")
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
    return req.status(403).json({error_code:1, message: "Permission not found" });
  }
  const permission = await Permission.findOne({ name: req.user.permission });
  if (!permission) {
    return res.status(403).json({error_code:1, message: "Permission not found" });
  }
  
  const startTransactionPoint = await TransactionPoint.findById(
    permission.transactionPoint_id
  );
  try {
    const address = await UserAddress.create({
      sender_username,
      sender_address,
      sender_phone,
      receiver_username,
      receiver_phone,
      receiver_address,
    });
    if (!address) {
      return res.status(500).json({error_code:1, message: "Could not create address" });
    }
    // find road for shipment
    const transactionPoints = [];
    const allTransactionPoint = await TransactionPoint.find()
    allTransactionPoint.forEach(async (transaction) => {
      transactionPoints.push(transaction.address)
    })
    console.log(transactionPoints.length)
    const nearPoint = await distanceCalculator.calculateMinDistance(receiver_address, transactionPoints)
    const endTransactionPoint = await TransactionPoint.findOne({address: nearPoint})
    

    // caculator fee
    const distance = await distanceCalculator.calculateDistance(sender_address, receiver_address)
    const numbericWeight = parseFloat(product_weight.replace(/[^\d.]/g, ''))
    const fee = calculateShippingFee(distance, numbericWeight).toString()

    const shipment = await Shipment.create({
      goods_type: product_type,
      goods_name: product_name,
      goods_weight: product_weight,
      user_address_id: address.id,
      fee: fee,
      now_address: startTransactionPoint.name
    });
    const route = await Route.create({
      shipment_id: shipment._id,
      transactionPoint1: startTransactionPoint._id,
      collectionPoint1: startTransactionPoint.collectionPoint_id,
      collectionPoint2: endTransactionPoint.collectionPoint_id,
      transactionPoint2: endTransactionPoint._id
    })

    await TransactionShipment.create({
      shipment_id: shipment.id,
      transactionPoint_id: permission.transactionPoint_id,
    });
    startTransactionPoint.receive_shipment += 1;
    startTransactionPoint.total_shipment += 1;
    await startTransactionPoint.save();

    return res.status(201).json({error_code: 0, data: { shipment, address, route: {
      transactionPoint1: startTransactionPoint.name,
      collectionPoint1: (await CollectionPoint.findById(startTransactionPoint.collectionPoint_id)).name,
      collectionPoint2: (await CollectionPoint.findById(endTransactionPoint.collectionPoint_id)).name,
      transactionPoint2: endTransactionPoint.name,
    }}});
  } catch (error) {
    await Product.findOneAndDelete({
      type: product_type,
      name: product_name,
      weight: product_weight,})
    await UserAddress.findOneAndDelete({
      sender_username,
      sender_address,
      sender_phone,
      receiver_username,
      receiver_phone,
      receiver_address,
    })
    console.error("create shipment error:", error);
    return res.status(500).json({error_code: 1, message: "Could not create shipment" });
  }
}

function calculateShippingFee(distance, weight) {
  // Giả sử các giá trị cơ bản và hệ số cân nặng
  const baseRatePerKm = 1000; // Giá cước cơ bản cho mỗi kilômét
  const weightRate = 100; // Hệ số cân nặng

  // Tính giá cước
  const distanceFee = baseRatePerKm * distance;
  const weightFee = weightRate * weight;
  const totalFee = distanceFee + weightFee;

  return totalFee;
}

async function confirmPaided(req, res) {
  const shipmentId = req.body.shipmentId
  try {
    const shipment = await Shipment.findOneAndUpdate({_id: shipmentId, paided: "N"}, {$set: {paided: "Y"}}, { new: true } )
    if (!shipment) {
      return res.status(404).json({error_code:1, message: 'Shipment not found' });
    }
    return res.status(200).json({error_code:1, data: {shipment}})
  } catch (error) {
    console.error("Confirm paided money error:", error);
    return res
      .status(500)
      .json({error_code:1, message: "Could not confirm paided money " });
  
  }
}

async function createShipmentFromTPToCP(req, res) {
  const shipmentId = req.body.shipmentId;
  if (!shipmentId) {
    return res.status(400).json({error_code: 1, message: "Missing shipmentId" });
  }
  try {
    const route = await Route.findOne({shipment_id: shipmentId})
    const updatedShipment = await Shipment.findOneAndUpdate(
        { _id: shipmentId, status: shipmentStatus.Preparing},
        { $set: { status: shipmentStatus.ShippedFromTransactionPoint }},
        { new: true }
      );
    if (!updatedShipment) {
    return res.status(500).json({error_code: 1, message: "Shipment have been shipped" });
    }
    let collectionShipment = await CollectionShipment.findOne({
      shipment_id: shipmentId,
      collectionPoint_id: route.collectionPoint1
    })
    if (!collectionShipment) {
      collectionShipment = await CollectionShipment.create({
        status: collectionStatus.Waiting,
        shipment_id: shipmentId,
        collectionPoint_id: route.collectionPoint1,
      });
    }
    await TransactionShipment.findOneAndUpdate(
      {shipment_id: shipmentId, status: transactionStatus.Receive},
      { $set: { status: transactionStatus.Transfer } },
      { new: true }
    )
    const transactionPoint = await TransactionPoint.findById(route.transactionPoint1)
    transactionPoint.transfer_shipment += 1;
    await transactionPoint.save();
    return res.json({error_code: 0, data: {updatedShipment, collectionShipment }});
    // update status
  } catch (error) {
    console.error("create shipment to collection point error:", error);
    return res
      .status(500)
      .json({error_code: 1, message: "Could not create shipment to collection point" });
  }
}

async function getShipmentTransaction(req, res) {
  // const status = req.body.status
  // if (!status) {
  //   return res.status(400).json({ message: "Missing status" });
  // }
  try {
    
    const permission = await Permission.findOne({name: req.user.permission});
    if (!permission) {
      return res.status(404).json({error_code:1, message: "Permission not found" });
    }
    const transactionShipment = await TransactionShipment.find({
      transactionPoint_id: permission.transactionPoint_id,
    });
    let  transactionPoint = await TransactionPoint.findById(permission.transactionPoint_id);
    const transactionShipmentIds = transactionShipment.map(
      (transaction) => transaction.shipment_id
    );

    // Tìm các shipment có _id giống với shipment_id trong danh sách đã lấy
    const relatedShipments = await Shipment.find({
      _id: { $in: transactionShipmentIds },
    });
    return res.status(200).json({error_code: 0, data: {
      relatedShipments,  
      transactionPoint
    }});
  } catch (error) {
    console.error("get shipment transaction point error:", error);
    return res
      .status(500)
      .json({error_code:1, message: "Could not get shipment transaction point" });
  }
}
async function deleteNewShipment(req, res) {
  const shipmentId = req.body.shipmentId;
  try {
    const shipment = await Shipment.findById(shipmentId);
    if (!shipment) {
      return res.status(404).json({error_code:1, message: "Shipment not found" });
    }
    const permission = await Permission.findOne({name: req.user.permission});
    if (!permission) {
      return res.status(404).json({error_code:1, message: "Permission not found" });
    }
    const transactionPoint = await TransactionPoint.findById(permission.transactionPoint_id);
    const product = await Product.findById(shipment.product_id);
    if (!product) {
      return res.status(404).json({error_code:1, message: "Product not found" });
    }
    const address = await UserAddress.findById(shipment.user_address_id);
    if (!address) {
      return res.status(404).json({error_code:1, message: "address not found" });
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
    transactionPoint.total_shipment -= 1;
    transactionPoint.receive_shipment -= 1;
    await transactionPoint.save();
    return res.json({error_code:0,
      message: "Shipment and relative records deleted successfully",
    });
  } catch (error) {
    console.error("delete shipment error:", error);
    return res.status(500).json({error_code:1, message: "Can not delete shipment" });
  }
}

async function deleteShipment(req, res) {
  const shipmentId = req.body.shipmentId;
  try {
    const shipment = await Shipment.findById(shipmentId);
    if (!shipment) {
      return res.status(404).json({error_code:1, message: "Shipment not found" });
    }
    const product = await Product.findById(shipment.product_id);
    if (!product) {
      return res.status(404).json({error_code:1, message: "Product not found" });
    }
    const address = await UserAddress.findById(shipment.user_address_id);
    if (!address) {
      return res.status(404).json({error_code:1, message: "address not found" });
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
    return res.json({error_code:0,
      message: "Shipment and relative records deleted successfully",
    });
  } catch (error) {
    console.error("delete shipment error:", error);
    return res.status(500).json({error_code:1, message: "Can not delete shipment" });
  }
}

async function confirmShipmentFromTPToCP(req, res) {
  const shipmentId = req.body.shipmentId
  if (!shipmentId) {
    res.status(400).json({error_code:1, message: "Missing id parameter" })
  }
  try {
    const route = await Route.findOne({shipment_id: shipmentId})
    let foundShipment = await Shipment.findOne({ _id: shipmentId });
    if (!foundShipment) {
      return res.status(404).json({error_code:1, message: "Shipment not found"})
    }
    const permission = await Permission.findOne({name: req.user.permission})
    if (!permission) {
      return res.status(404).json({error_code:1, message: "Permission not found" });
    }
    const collectionPoint = await CollectionPoint.findById(permission.collectionPoint_id)
    if (route.collectionPoint2.toString() === route.collectionPoint1.toString()) {
      if (foundShipment.status === shipmentStatus.ShippedFromTransactionPoint) {
        foundShipment.status = shipmentStatus.ArrivedDestinationToT;
        foundShipment.now_address = collectionPoint.name;
        await foundShipment.save();
        // if (!foundShipment) {
        //   return res.status(500).json({error_code:1,  message: "Shipment have not been arrived destination" });
        // }
      }
    } else {
      if (foundShipment.status === shipmentStatus.ShippedFromTransactionPoint) {
        foundShipment.status = shipmentStatus.ArrivedDestinationToC;
        foundShipment.now_address = collectionPoint.name;
        await foundShipment.save();
      }
    }
    await CollectionShipment.findOneAndUpdate(
      {shipment_id: foundShipment._id, status: collectionStatus.Waiting},
      { $set: {status: collectionStatus.Receive}},
      { new: true }
    )
    collectionPoint.receive_shipment += 1;
    await collectionPoint.save();
    // await TransactionShipment.findOneAndDelete({shipment_id: shipmentId, status: transactionStatus.Transfer"})
    return res.json({error_code:0, message: "Confirm shipment to collectionPoint success ", data: {
      shipment_update:foundShipment
    }})

  } catch(error) {
    console.error("Confirm shipment collection point error:", error);
    return res.status(500).json({error_code:1, message: "Can not confirm shipment collection point"})
    }
}

async function confirmShipmentFromCPToCP(req, res) {
  const shipmentId = req.body.shipmentId
  if (!shipmentId) {
    res.status(400).json({error_code: 1, message: "Missing id parameter" })
  }
  try {    
    let foundShipment = await Shipment.findOne({ _id: shipmentId });
    if (!foundShipment) {
      return res.status(404).json({error_code: 1, message: "Shipment not found"})
    }
    const permission = await Permission.findOne({name: req.user.permission})
    if (!permission) {
      return res.status(404).json({error_code: 1, message: "Permission not found" });
    }
    const collectionPoint = await CollectionPoint.findById(permission.collectionPoint_id)
    if (foundShipment.status === shipmentStatus.ShippedFromCollectionPoint) {
      foundShipment = await Shipment.findOneAndUpdate(
        { _id: shipmentId, status: shipmentStatus.ShippedFromCollectionPoint },
        { $set: { status: shipmentStatus.ArrivedDestinationToT, now_address: collectionPoint.name } },
        { new: true }
      )
      if (!foundShipment) {
        console.log("no")
        return res.status(500).json({error_code: 1, message: "Shipment have not been arrived destination" });
      }
    }
    await CollectionShipment.findOneAndUpdate(
      {shipment_id: foundShipment._id, status: collectionStatus.Waiting},
      { $set: {status: collectionStatus.Receive}},
      { new: true } 
    )
    collectionPoint.receive_shipment += 1;
    await collectionPoint.save();
    // await CollectionShipment.findOneAndDelete({shipment_id: shipmentId, status: transactionStatus.Transfer})
    return res.json({error_code: 0, data: {shipment_update: foundShipment}, message: "Confirm shipment to collectionPoint success "})

  } catch(error) {
    console.error("Confirm shipment collection point error:", error);
    return res.status(500).json({error_code: 1, message: "Can not confirm shipment collection point"})
    }
}


async function confirmShipmentFromCPToTP(req, res) {
  const shipmentId = req.body.shipmentId
  if (!shipmentId) {
    res.status(400).json({error_code: 1, message: "Missing id parameter" })
  }
  try {    
    let foundShipment = await Shipment.findOne({ _id: shipmentId });
    if (!foundShipment) {
      return res.status(404).json({error_code: 1,message: "Shipment not found"})
    }
    const permission = await Permission.findOne({name: req.user.permission})
    if (!permission) {
      return res.status(404).json({error_code: 1, message: "Permission not found" });
    }
    const transactionPoint = await TransactionPoint.findById(permission.transactionPoint_id)
    if (foundShipment.status === shipmentStatus.ShippedFromCollectionPoint) {
      foundShipment = await Shipment.findOneAndUpdate(
        { _id: shipmentId, status: shipmentStatus.ShippedFromCollectionPoint },
        { $set: { status: shipmentStatus.ArrivedDestinationToU, now_address: transactionPoint.name } },
        { new: true }
      )
      if (!foundShipment) {
        return res.status(500).json({error_code: 1, message: "Shipment have not been arrived destination" });
      }
      await TransactionShipment.findOneAndUpdate(
        {shipment_id: foundShipment._id, status: transactionStatus.Waiting},
        { $set: {status: transactionStatus.Receive}},
        { new: true }
      )
    } else if (foundShipment.status === shipmentStatus.Canceled) {
      await TransactionShipment.findOneAndUpdate(
        {shipment_id: foundShipment._id, status: transactionStatus.Waiting},
        { $set: {status: transactionStatus.Return}},
        { new: true }
      )
    }
    transactionPoint.receive_shipment += 1;
    transactionPoint.total_shipment += 1;
    await transactionPoint.save();
    // await CollectionShipment.findOneAndDelete({shipment_id: shipmentId, status: transactionStatus.Transfer})
    return res.json({error_code: 0,message: "Confirm shipment to transaction point ", data: {
      shipment_update: foundShipment
    }})

  } catch(error) {
    console.error("Confirm shipment collection point error:", error);
    return res.status(500).json({error_code: 1, message: "Can not confirm shipment from collection point"})
    }
}

async function confirmShipmentSuOrCa(req, res) {
  const {shipmentId, Success} = req.body
  if (!shipmentId) {
    res.status(400).json({error_code:1, message: "Missing id parameter" })
  }
  const permission = await Permission.findOne({name: req.user.permission})
  if (!permission) {
    return res.status(404).json({error_code: 1, message: "Permission not found" });
  }
  const transactionPoint = await TransactionPoint.findById(permission.transactionPoint_id)
  try {    
    if (Success) {
      const updatedShipment = await Shipment.findOneAndUpdate(
        { _id: shipmentId, status: shipmentStatus.Delivering },
        { $set: { status: shipmentStatus.Successed } },
        { new: true }
      )
      if (!updatedShipment) {
        return res.status(500).json({error_code:1, message: "Status is updated" });
      }
      // await TransactionShipment.findOneAndDelete({shipment_id: shipmentId, status: transactionStatus.Transfer})
      transactionPoint.success_shipment += 1;
      await transactionPoint.save();
    return res.json({error_code:0,message: "Confirm shipment to user success"})
    } else {
      const updatedShipment = await Shipment.findOneAndUpdate(
        { _id: shipmentId, status: shipmentStatus.Delivering },
        { $set: { status: shipmentStatus.Canceled } },
        { new: true }
      )
      transactionPoint.cancel_shipment += 1;
      await transactionPoint.save();
      if (!updatedShipment) {
        return res.status(500).json({error_code:1, message: "Status is updated" });
      } 
      // trả hàng
      return res.status(200).json({error_code:0, message: "Update shipment cancel success" });
    }
  } catch(error) {
    console.error("Confirm shipment collection point error:", error);
    return res.status(500).json({error_code:1, message: "Can not confirm shipment to user success"})
    }
}

async function createShipmentFromCPToCP(req, res) {
  const shipmentId = req.body.shipmentId;
  if (!shipmentId) {
    return res.status(400).json({error_code:1, message: "Missing shipmentId" });
  }
  try {
    console.log(1)
    const route = await Route.findOne({shipment_id: shipmentId})
    let foundShipment = await Shipment.findOne({ _id: shipmentId });
    const collectionPoint = await CollectionPoint.findById(route.collectionPoint1)
    if (!foundShipment) {
      return res.status(404).json({error_code:1,message: "Shipment not found"})
    }
    if (foundShipment.status === shipmentStatus.ArrivedDestinationToC) {
      console.log(12);
      foundShipment = await Shipment.findOneAndUpdate(
        { _id: shipmentId, status: shipmentStatus.ArrivedDestinationToC },
        { $set: { status: shipmentStatus.ShippedFromCollectionPoint } },
        { new: true }
      )
      if (!foundShipment) {
        return res.status(500).json({error_code:1, message: "Shipment have not been arrived destination" });
      } 
    } 
    // else if (foundShipment.status === shipmentStatus.ArrivedDestinationToT) {
    //   foundShipment = await Shipment.findOneAndUpdate(
    //     { _id: shipmentId, status: shipmentStatus.ArrivedDestinationToT },
    //     { $set: { status: shipmentStatus.ShippedFromCollectionPoint } },
    //     { new: true }
    //   )
    //   if (!foundShipment) {
    //     return res.status(500).json({error_code:1, message: "Shipment have not been arrived destination" });
    //   }
    // }
    const oldCollectionShipment = await CollectionShipment.findOneAndUpdate(
      {status: collectionStatus.Receive, shipment_id: shipmentId},
      {$set: {status: collectionStatus.Transfer}},
      {new: true}
    )
    // if (route.collectionPoint2 === route.collectionPoint1) {
    //   let newTransactionShipment = await TransactionShipment.findOne({
    //     shipment_id: shipmentId,
    //     transactionPoint_id: route.transactionPoint2,
    //   })
    //   if (!newTransactionShipment) {
    //     newTransactionShipment = await TransactionShipment.create({
    //       status: transactionStatus.Waiting,
    //       shipment_id: shipmentId,
    //       transactionPoint_id: route.transactionPoint2,
    //     });
    //   }
      
    //   return res.json({error_code:0, data: {foundShipment, oldCollectionShipment, newTransactionShipment }});
    // } else {
      let newCollectionShipment = await CollectionShipment.findOne({
        shipment_id: shipmentId,
        collectionPoint_id: route.collectionPoint2,
        status: collectionStatus.Waiting
      })
      if (!newCollectionShipment) {
        newCollectionShipment = await CollectionShipment.create({
          status: collectionStatus.Waiting,
          shipment_id: shipmentId,
          collectionPoint_id: route.collectionPoint2,
        });
      }
      collectionPoint.transfer_shipment += 1;
      collectionPoint.receive_shipment -= 1;
      await collectionPoint.save();
      return res.json({error_code:0, foundShipment, oldCollectionShipment, newCollectionShipment });
    // }
    
    // update status
  } catch (error) {
    console.error("create shipment to collection point error:", error);
    return res
      .status(500)
      .json({error_code:1, message: "Could not create shipment to collection point" });
  }
}
async function createShipmentFromCPToTP(req, res) {
  const shipmentId = req.body.shipmentId;
  if (!shipmentId) {
    return res.status(400).json({error_code:1, message: "Missing shipmentId" });
  }
  try {
    const route = await Route.findOne({shipment_id: shipmentId})
    const collectionPoint = await CollectionPoint.findById(route.collectionPoint2)
    let foundShipment = await Shipment.findOne({ _id: shipmentId });
    if (!foundShipment) {
      return res.status(404).json({error_code:1, message: "Shipment not found"})
    }
    if (foundShipment.status === shipmentStatus.ArrivedDestinationToT) {
      foundShipment = await Shipment.findOneAndUpdate(
        { _id: shipmentId, status: shipmentStatus.ArrivedDestinationToT },
        { $set: { status: shipmentStatus.ShippedFromCollectionPoint } },
        { new: true }
      )
      if (!foundShipment) {
        return res.status(500).json({error_code:1, message: "Shipment have not been arrived destination" });
      }
    }
    const oldCollectionShipment = await CollectionShipment.findOneAndUpdate(
      {status: collectionStatus.Receive, shipment_id: shipmentId},
      {$set: {status: collectionStatus.Transfer}},
      {new: true}
    )
    let newTransactionShipment = await TransactionShipment.findOne({
      shipment_id: shipmentId,
      transactionPoint_id: route.transactionPoint2,
    })
    if (!newTransactionShipment) {
      newTransactionShipment = await TransactionShipment.create({
        status: transactionStatus.Waiting,
        shipment_id: shipmentId,
        transactionPoint_id: route.transactionPoint2,
      });
    }
    collectionPoint.transfer_shipment += 1;
    collectionPoint.receive_shipment -= 1;
    await collectionPoint.save();
    return res.json({error_code:0, data:{ foundShipment, oldCollectionShipment, newTransactionShipment }});
    // update status
  } catch (error) {
    console.error("create shipment to transaction point error:", error);
    return res
      .status(500)
      .json({error_code:1, message: "Could not create shipment to transaction point" });
  }
}

async function createShipmentToUser(req, res) {
  const {shipmentId} = req.body;
  if (!shipmentId) {
    return res.status(400).json({error_code:1, message: "Missing shipmentId" });
  }
  
  try {
    const permission = await Permission.findOne({name: req.user.permission})
    if (!permission) {
      return res.status(404).json({error_code:1, message: "Permission not found" });
    }
    const transactionPoint = await TransactionPoint.findById(permission.transactionPoint_id)
    const updatedShipment = await Shipment.findOneAndUpdate(
        { _id: shipmentId, status: shipmentStatus.ArrivedDestinationToU },
        { $set: { status: shipmentStatus.Delivering } },
        { new: true }
      );
    if (!updatedShipment) {
      return res.status(500).json({error_code:1, message: "Shipment have been delivering" })
    }

    const oldTransactionShipment = await TransactionShipment.findOneAndUpdate(
      {status: transactionStatus.Receive, shipmentId: shipmentId},
      {$set: {status: transactionStatus.Transfer}},
      {new: true}
    )
    transactionPoint.transfer_shipment += 1;
    await transactionPoint.save();
    return res.json({error_code:0, data:{ updatedShipment, oldTransactionShipment}});
    // update status
  } catch (error) {
    console.error("create shipment to transaction point error:", error);
    return res
      .status(500)
      .json({error_code:1, message: "Could not create shipment to transaction point" });
  }
}


async function createShipmentCancel(req, res) {
  const {shipmentId} = req.body;
  if (!shipmentId) {
    return res.status(400).json({error_code:1, message: "Missing shipmentId" });
  }
 
  try {
    const shipment = await Shipment.findOne({_id: shipmentId, status: shipmentStatus.Canceled})
    if (!shipment) {
      return res.status(500).json({error_code:1, message: "Shipment is not canceled"})
    }
    const transactionShipment = await TransactionShipment.findOneAndUpdate(
      {status: transactionStatus.Transfer, shipment_id: shipmentId},
      {$set: {status: transactionStatus.Cancel}},
      {new: true}
    )
    const permission = await Permission.findOne({ name: req.user.permission });
    
    if (!permission) {
      return res.status(404).json({error_code:1, message: "Permission not found" });
    }
    const transactionPoint = await TransactionPoint.findById(
      permission.transactionPoint_id
    );
    if (!transactionPoint) {
      return res.status(404).json({error_code:1, message: "transactionPoint not found" });
    }
    let collectionShipment = await CollectionShipment.findOne({
      shipment_id: shipmentId,
      collectionPoint_id: transactionPoint.collectionPoint_id,
      status: collectionStatus.Waiting
    })
    if (!collectionShipment) {
      collectionShipment = await CollectionShipment.create({
        status: collectionStatus.Waiting,
        shipment_id: shipmentId,
        collectionPoint_id: transactionPoint.collectionPoint_id,
      });
    }
    return res.json({error_code:0, data: {transactionShipment, collectionShipment}});
    // update status
  } catch (error) {
    console.error("create shipment to transaction point error:", error);
    return res
      .status(500)
      .json({error_code:1, message: "Could not create shipment to transaction point" });
  }
}

async function getShipmentCollection(req, res) {
  // const {status} = req.body.status
  // if (!status) {
  //   return res.status(400).json({error_code: 1, message: "Missing status" });
  // }
  try {
    const permission = await Permission.findOne({name: req.user.permission})
    if (!permission) {
      return res.status(404).json({error_code: 1, message: "Permission not found" });
    }
    const collectionPoint = await CollectionPoint.findById(permission.collectionPoint_id)
    const collectionShipment = await CollectionShipment.find({
      collectionPoint_id: permission.collectionPoint_id,
      // status: status,
    });

    const shipmentIds = collectionShipment.map(
      (cs) => cs.shipment_id
    );

    // Tìm các shipment có _id giống với shipment_id trong danh sách đã lấy
    const shipments = await Shipment.find({
      _id: { $in: shipmentIds },
    });
    return res.status(200).json({error_code: 0, data: {shipments, collectionPoint}})
  } catch (error) {
    console.error("Get shipment collection point error:", error);
    return res.status(500)
      .json({error_code: 1, message: "Could not get shipment collection point" });
  }
}

async function searchShipment(req, res) {
  const shipmentId = req.query.shipmentId
  if (!shipmentId) { 
    return res.status(400).json({error_code:1, message: "Missing shipmentId" });
  }
  try {
    const shipment = await Shipment.findById(shipmentId)
    if (!shipment) {
      return res.status(404).json({error_code:1, message: "Shipment not found"})
    }
    const address = await UserAddress.findById(shipment.user_address_id);
  
    switch (shipment.status) {
      case shipmentStatus.Canceled:
        return res.status(200).json({error_code:0, data: {shipment, address}, message: `Shipment has been cancelled }` })
      case shipmentStatus.Successed:
        return res.status(200).json({error_code:0, data: {shipment, address}, message: `Shipment has been delivered successfully at ${shipment.updatedAt}` })
      case shipmentStatus.ShippedFromCollectionPoint:
      case shipmentStatus.ShippedFromTransactionPoint:
        return res.status(200).json({error_code:0, data: {shipment, address}, message: "Shipment is being shipped to next location"})
      case shipmentStatus.Preparing:
        return res.status(200).json({error_code:0, data: {shipment, address}, message: "Shipment is ready to ship"})
      case shipmentStatus.Delivering:
        return res.status(200).json({error_code:0, data: {shipment, address}, message: "Shipment is being shipped to location"})
      case shipmentStatus.ArrivedDestinationToC:
      case shipmentStatus.ArrivedDestinationToT: 
      case shipmentStatus.ArrivedDestinationToU:
        return res.status(200).json({error_code:0, data: {shipment, address}, message: `Shipment is in ${shipment.now_address}`})
      default:
        return res.status(500).json({error_code:1,   message: "Error when update status shipment" });

    } 
  } catch (error) {
    console.error("Get shipment error:", error);
    return res.status(500)
      .json({error_code:1,  message: "Could not get shipment " });
  }
  
}

async function getShipmentCollectionBystatus(req, res) {
  try {
    const status = req.query.status;
    if (!status) {
      return res.status(400).json({error_code: 1, message: "Missing status" });
    }
    const permission = await Permission.findOne({name: req.user.permission});
    if (!permission) {
      return res.status(404).json({error_code:1, message: "Permission not found" });
    }
    const collectionShipment = await CollectionShipment.find({
      collectionPoint_id: permission.collectionPoint_id,
      status: status
    });
    const collectionShipmentIds = collectionShipment.map(
      (collection) => collection.shipment_id,
    );

    // Tìm các shipment có _id giống với shipment_id trong danh sách đã lấy
    const relatedShipments = await Shipment.find({
      _id: { $in: collectionShipmentIds },

    });
    return res.status(200).json({error_code: 0, data: {relatedShipments }});
  } catch (error) {
    console.error("get shipment collection point error:", error);
    return res
      .status(500)
      .json({error_code:1, message: "Could not get shipment collection point" });
  }
}

async function getShipmentTransactionBystatus(req, res) {
  try {
    const status = req.query.status;
    if (!status) {
      return res.status(400).json({error_code: 1, message: "Missing status" });
    }
    const permission = await Permission.findOne({name: req.user.permission});
    if (!permission) {
      return res.status(404).json({error_code:1, message: "Permission not found" });
    }
    const transactionShipment = await TransactionShipment.find({
      transactionPoint_id: permission.transactionPoint_id,
      status: status
    });
    const transactionShipmentIds = transactionShipment.map(
      (transaction) => transaction.shipment_id,
    );

    // Tìm các shipment có _id giống với shipment_id trong danh sách đã lấy
    const relatedShipments = await Shipment.find({
      _id: { $in: transactionShipmentIds },

    });
    return res.status(200).json({error_code: 0, data: {relatedShipments }});
  } catch (error) {
    console.error("get shipment transaction point error:", error);
    return res
      .status(500)
      .json({error_code:1, message: "Could not get shipment transaction point" });
  }
}

async function updatePoint(req, res)  {
  try {
    let updateTransactionPoint = await TransactionPoint.find();
    for (const record of updateTransactionPoint) {
      record.transfer_shipment = 0;
      record.receive_shipment = 0;
      record.cancel_shipment = 0;
      record.success_shipment = 0;
      record.total_shipment = 0;
      await record.save();
    }
    let updateCollectionPoint = await CollectionPoint.find();
    for (const record of updateCollectionPoint) {
      record.transfer_shipment = 0;
      record.receive_shipment = 0;
      // Cập nhật các trường khác nếu cần
      await record.save();
    }
    return res.status(200).json({error_code: 0, data: {
      updateTransactionPoint,
      updateCollectionPoint
    }})
  } catch (error) {
    console.error("Update point error:", error);
    return res
      .status(500)
      .json({error_code:1, message: "Could not update point" });
  }
}


async function getShipmentByCollectionPoint(req, res) {
  try {
    const collectionPointName = req.query.collectionPointName;
    if (!collectionPointName) {
      return res.status(400).json({error_code: 1, message: "Missing collectionPoint" });
    }
    const collectionPoint = await CollectionPoint.findOne({name: collectionPointName});
    // Tìm các shipment có _id giống với shipment_id trong danh sách đã lấy
    const collectionShipments = await CollectionShipment.find({ collectionPoint_id: collectionPoint._id }, 'shipment_id');
    const shipmentIds = collectionShipments.map(item => item.shipment_id);
    const shipments = await Shipment.find({ _id: { $in: shipmentIds } });
    const relatedShipments = await Promise.all(shipments.map(async (shipment) => {
      return {
        ...shipment.toObject(),
        collectionName: collectionPointName,
      };
    }));
    return res.status(200).json({error_code: 0, data: {relatedShipments }});
  } catch (error) {
    console.error("get shipment collection point error:", error);
    return res
      .status(500)
      .json({error_code:1, message: "Could not get shipment collection point" });
  }
}

async function getShipmentByTransactionPoint(req, res) {
  try {
    const transactionPointName = req.query.transactionPointName;
    if (!transactionPointName) {
      return res.status(400).json({error_code: 1, message: "Missing transactionPointName" });
    }
    const transactionPoint = await TransactionPoint.findOne({name: transactionPointName});
    // Tìm các shipment có _id giống với shipment_id trong danh sách đã lấy
    const transactionShipments = await TransactionShipment.find({ transactionPoint_id: transactionPoint._id }, 'shipment_id');
    const shipmentIds = transactionShipments.map(item => item.shipment_id);
    const shipments = await Shipment.find({ _id: { $in: shipmentIds } });
    const relatedShipments = await Promise.all(shipments.map(async (shipment) => {
      return {
        ...shipment.toObject(),
        transactionName: transactionPointName,
      };
    }));
    return res.status(200).json({error_code: 0, data: {relatedShipments }});
  } catch (error) {
    console.error("get shipment transaction point error:", error);
    return res
      .status(500)
      .json({error_code:1, message: "Could not get shipment transaction point" });
  }
}

async function getShipmentDeliver(req, res) {
  try {
    
    const permission = await Permission.findOne({name: req.user.permission});
    if (!permission) {
      return res.status(404).json({error_code:1, message: "Permission not found" });
    }
    const transactionShipment = await TransactionShipment.find({
      transactionPoint_id: permission.transactionPoint_id,
    });
    let  transactionPoint = await TransactionPoint.findById(permission.transactionPoint_id);
    const transactionShipmentIds = transactionShipment.map(
      (transaction) => transaction.shipment_id
    );

    // Tìm các shipment có _id giống với shipment_id trong danh sách đã lấy
    const relatedShipments = await Shipment.find({
      _id: { $in: transactionShipmentIds },
      status: shipmentStatus.Delivering,
    });
    return res.status(200).json({error_code: 0, data: {
      relatedShipments,  
      transactionPoint
    }});
  } catch (error) {
    console.error("get shipment transaction point error:", error);
    return res
      .status(500)
      .json({error_code:1, message: "Could not get shipment transaction point" });
  }
}
// async function caculatorTotalShipment(req, res) {
//   try {
//     const 
//   } catch (error) {
//     console.error("caculator Total Shipment error:", error);
//     return res
//       .status(500)
//       .json({error_code:1, message: "Can not caculator Total Shipment" });
//   }
// }


module.exports = {
  createNewShipment,
  deleteNewShipment,
  createShipmentFromTPToCP,
  getShipmentTransaction,
  confirmShipmentFromTPToCP,
  createShipmentFromCPToCP,
  confirmShipmentFromCPToCP,
  createShipmentFromCPToTP,
  confirmShipmentFromCPToTP,
  createShipmentToUser,
  confirmShipmentSuOrCa,
  deleteShipment,
  createShipmentCancel,
  getShipmentCollection,
  confirmPaided,
  searchShipment,
  getShipmentTransactionBystatus, 
  updatePoint,
  getShipmentCollectionBystatus,
  getShipmentByCollectionPoint,
  getShipmentByTransactionPoint,
  getShipmentDeliver
};

