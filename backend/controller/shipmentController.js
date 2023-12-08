const {
    Product,
    Shipment,
    UserAddress, 
    TransactionShipment,
    CollectionShipment
} = require("../models/Shipment")
const {
    leader,
    collection_staff,
    transaction_staff,
    collection_head,
    transaction_head,
    RolePermission,
    Permission,
  } = require("../models/User");
async function createNewShipment(req, res) {
    const {product_type, product_name, product_weight,
        sender_username, sender_phone, sender_address,receiver_username, receiver_phone, receiver_address
    } = req.body
    if (!req.user.permission) {
        return req.status(403).json({ message: "Permission not found" });
    }
    const permission = await Permission.findOne({name: req.user.permission})
    if (!permission) {
        return res.status(403).json({ message: "Permission not found" });
    }
    try {
        
        const product = await Product.create({
            type: product_type,
            name: product_name,
            weight: product_weight
        })
        if (!product) {
            return res.status(500).json({ message: "Could not create product" });
        }
        const address = await UserAddress.create({
            sender_username,
            sender_address,
            sender_phone,
            receiver_username,
            receiver_phone,
            receiver_address
        })
        if (!address) {
            return res.status(500).json({ message: "Could not create address" });
        }
        const shipment = await Shipment.create({
            product_id:  product._id,
            user_address_id: address.id
        })
       
        await TransactionShipment.create({
            shipment_id: shipment.id,
            transaction_id: permission.transactionPoint_id
        })
        return res.status(201).json({shipment, product, address})
    } catch (error) {
        console.error("create shipment error:", error);
        return res
          .status(500)
          .json({ message: "Could not create shipment" });
    }
}

async function deleteNewShipment(req,res) {
    const idShipment = req.body.idShipment
    try {
        const shipment = await Shipment.findById(idShipment)
        if (!shipment) {
            return res.status(404).json({message: "Shipment not found"})
        }
        const product = await Product.findById(shipment.product_id)
        if (!product) {
            return res.status(404).json({message: "Product not found"})
        }
        const address = await UserAddress.findById(shipment.user_address_id)
        if (!address) {
            return res.status(404).json({message: "address not found"})
        }
        const tranShipment = await TransactionShipment.findOneAndDelete({shipment_id: shipment._id})
        const colShipment = await CollectionShipment.findOneAndDelete({shipment_id: shipment._id})

        await product.deleteOne()
        await address.deleteOne()
        await shipment.deleteOne()
        return res.json({
            message:
              "Shipment and relative records deleted successfully",
          });
    } catch(error) {
        console.error("delete shipment error:", error);
        return res.status(500).json({message: "Can not delete shipment"})
    }
    

}

// const addressNow = function() {
//     if ()
// }
module.exports = {
    createNewShipment,
    deleteNewShipment
}