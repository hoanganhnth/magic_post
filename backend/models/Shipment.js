const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    type: { type: String, required: true },
    name: { type: String, required: true },
    weight: { type: String, required: true },
  });

  const userAddressSchema = new mongoose.Schema({
    sender_username: { type: String, required: true },
    sender_phone: { type: String, required: true },
    sender_address: { type: String, required: true },
    receiver_username: { type: String, required: true },
    receiver_phone: { type: String, required: true },
    receiver_address: { type: String, required: true },
  });

  const shipmentSchema = new mongoose.Schema({
    status: { type: String, enum: ['Preparing', 'Shipped', 'ArrivedDestination', 'Delivering', 'Successed', 'Canceled'], default: 'Preparing' },
    product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    now_address: { type: String },
    user_address_id: { type: mongoose.Schema.Types.ObjectId, ref: 'UserAddress' },
    fee: { type: String },
    tax: { type: String },
    paided: { type: String, enum: ['Y', 'N'], default: 'N' },
  });

  
  const transactionShipmentSchema = new mongoose.Schema({
    transactionPoint_id: {type: mongoose.Schema.Types.ObjectId, ref: 'TransactionPoint'  },
    shipment_id:  {type: mongoose.Schema.Types.ObjectId, ref: 'Shipment'  },
    state:  { type: String, enum: ['Tranfer', 'Recieve', 'Waiting'], default: 'Tranfer' },
  });
  const collectionShipmentSchema = new mongoose.Schema({
    transactionPoint_id: {type: mongoose.Schema.Types.ObjectId, ref: 'CollectionPoint'  },
    shipment_id:  {type: mongoose.Schema.Types.ObjectId, ref: 'Shipment'  },
    state:  { type: String, enum: ['Tranfer', 'Recieve', 'Waiting'], default: 'Tranfer' },
  });


  shipmentSchema.set("toObject", { virtuals: true });
  shipmentSchema.set("toJSON", { virtuals: true });
  shipmentSchema.set("timestamps", {
    createdAt: "created_at",
    updatedAt: "updated_at",
    });
  transactionShipmentSchema.set("toObject", { virtuals: true });
  transactionShipmentSchema.set("toJSON", { virtuals: true });
  transactionShipmentSchema.set("timestamps", {
  createdAt: "created_at",
  updatedAt: "updated_at",
  });
  collectionShipmentSchema.set("toObject", { virtuals: true });
  collectionShipmentSchema.set("toJSON", { virtuals: true });
  collectionShipmentSchema.set("timestamps", {
  createdAt: "created_at",
  updatedAt: "updated_at",
  });


  const Product = mongoose.model('Product', productSchema);
  const UserAddress = mongoose.model('UserAddress', userAddressSchema);
  const Shipment = mongoose.model('Shipment', shipmentSchema);
  const CollectionShipment = mongoose.model('CollectionShipment', collectionShipmentSchema);
  const TransactionShipment = mongoose.model('TransactionShipment', transactionShipmentSchema);

  module.exports = {
    Product,
    UserAddress,
    Shipment,
    CollectionShipment,
    TransactionShipment
  };