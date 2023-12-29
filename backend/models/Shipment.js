const mongoose = require("mongoose");
const moment = require('moment');
const productSchema = new mongoose.Schema({
    type: { type: String, required: true },
    name: { type: String, required: true },
    weight: { type: String, required: true },
  });
  productSchema.set("timestamps", {
    createdAt: "created_at",
    updatedAt: "updated_at",
  });
  
  productSchema.set("toObject", { virtuals: true });
  productSchema.set("toJSON", { 
    virtuals: true,
    transform: function (doc, ret) {
      ret.created_at = moment(ret.created_at).format("HH:mm:ss, DD-MM-YYYY");
      ret.updated_at = moment(ret.updated_at).format("HH:mm:ss, DD-MM-YYYY");
      delete ret._id;
      delete ret.__v;
    }
  });

  const userAddressSchema = new mongoose.Schema({
    sender_username: { type: String, required: true },
    sender_phone: { type: String, required: true },
    sender_address: { type: String, required: true },
    receiver_username: { type: String, required: true },
    receiver_phone: { type: String, required: true },
    receiver_address: { type: String, required: true },
  });

  userAddressSchema.set("timestamps", {
    createdAt: "created_at",
    updatedAt: "updated_at",
  });
  
  userAddressSchema.set("toObject", { virtuals: true });
  userAddressSchema.set("toJSON", { 
    virtuals: true,
    transform: function (doc, ret) {
      ret.created_at = moment(ret.created_at).format("HH:mm:ss, DD-MM-YYYY");
      ret.updated_at = moment(ret.updated_at).format("HH:mm:ss, DD-MM-YYYY");
      delete ret._id;
      delete ret.__v;
    }
  });
  const shipmentStatus = {
    Preparing: 'Preparing',
    ShippedFromCollectionPoint: 'Shipped from CollectionPoint',
    ShippedFromTransactionPoint: 'Shipped from TransactionPoint',
    ArrivedDestinationToC: 'Arrived Destination To CollectionPoint',
    ArrivedDestinationToT: 'Arrived Destination To TransactionPoint',
    ArrivedDestinationToU: 'Arrived Destination To User',
    Delivering: 'Delivering',
    Successed: 'Successed',
    Canceled: 'Canceled'
  };
  
  const shipmentSchema = new mongoose.Schema({
    status: { type: String, enum: Object.values(shipmentStatus), default: shipmentStatus.Preparing },
    now_address: { type: String },
    user_address_id: { type: mongoose.Schema.Types.ObjectId, ref: 'UserAddress', required: true, },
    fee: { type: String, required: true },
    tax: { type: String },
    paided: { type: String, enum: ['Y', 'N'], default: 'N' },
    goods_type: { type: String, required: true },
    goods_name: { type: String, required: true },
    goods_weight: { type: String, required: true },
  });

  const transactionStatus = {
    Transfer: 'Transfer',
    Receive: 'Receive',
    Waiting: 'Waiting',
    Cancel: 'Cancel',
    Return: 'Return'
  };
  
  const transactionShipmentSchema = new mongoose.Schema({
    transactionPoint_id: {type: mongoose.Schema.Types.ObjectId, ref: 'TransactionPoint', required: true,  },
    shipment_id:  {type: mongoose.Schema.Types.ObjectId, ref: 'Shipment', required: true  },
    status:  { type: String, enum: Object.values(transactionStatus), default: transactionStatus.Receive },
  });
  const collectionStatus = {
    Transfer: 'Transfer',
    Receive: 'Receive',
    Waiting: 'Waiting'
  };
  const collectionShipmentSchema = new mongoose.Schema({
    collectionPoint_id: {type: mongoose.Schema.Types.ObjectId, ref: 'CollectionPoint', required: true  },
    shipment_id:  {type: mongoose.Schema.Types.ObjectId, ref: 'Shipment', required: true  },
    status:  { type: String, enum: Object.values(collectionStatus), default: collectionStatus.Receive  },
  });

  const routeSchema = new mongoose.Schema({
    shipment_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shipment",
      required: true
    },
    transactionPoint1: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TransactionPoint",
      required: true
    },
    collectionPoint1: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CollectionPoint",
      required: true
    },
    collectionPoint2: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CollectionPoint",
      required: true
    },
    transactionPoint2: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TransactionPoint",
      required: true
    },
  });
  routeSchema.set("timestamps", {
    createdAt: "created_at",
    updatedAt: "updated_at",
  });
  
  routeSchema.set("toObject", { virtuals: true });
  routeSchema.set("toJSON", { 
    virtuals: true,
    transform: function (doc, ret) {
      ret.created_at = moment(ret.created_at).format("HH:mm:ss, DD-MM-YYYY");
      ret.updated_at = moment(ret.updated_at).format("HH:mm:ss, DD-MM-YYYY");
      delete ret._id;
      delete ret.__v;
    }
  });


  shipmentSchema.set("timestamps", {
    createdAt: "created_at",
    updatedAt: "updated_at",
  });
  
  shipmentSchema.set("toObject", { virtuals: true });
  shipmentSchema.set("toJSON", { 
    virtuals: true,
    transform: function (doc, ret) {
      ret.created_at = moment(ret.created_at).format("HH:mm:ss, DD-MM-YYYY");
      ret.updated_at = moment(ret.updated_at).format("HH:mm:ss, DD-MM-YYYY");
      delete ret._id;
      delete ret.__v;
    }
  });
  transactionShipmentSchema.set("timestamps", {
    createdAt: "created_at",
    updatedAt: "updated_at",
  });
  
  transactionShipmentSchema.set("toObject", { virtuals: true });
  transactionShipmentSchema.set("toJSON", { 
    virtuals: true,
    transform: function (doc, ret) {
      ret.created_at = moment(ret.created_at).format("HH:mm:ss, DD-MM-YYYY");
      ret.updated_at = moment(ret.updated_at).format("HH:mm:ss, DD-MM-YYYY");
      delete ret._id;
      delete ret.__v;
    }
  });
  collectionShipmentSchema.set("timestamps", {
    createdAt: "created_at",
    updatedAt: "updated_at",
  });
  
  collectionShipmentSchema.set("toObject", { virtuals: true });
  collectionShipmentSchema.set("toJSON", { 
    virtuals: true,
    transform: function (doc, ret) {
      ret.created_at = moment(ret.created_at).format("HH:mm:ss, DD-MM-YYYY");
      ret.updated_at = moment(ret.updated_at).format("HH:mm:ss, DD-MM-YYYY");
      delete ret._id;
      delete ret.__v;
    }
  });
  
  const Product = mongoose.model('Product', productSchema);
  const UserAddress = mongoose.model('UserAddress', userAddressSchema);
  const Shipment = mongoose.model('Shipment', shipmentSchema);
  const CollectionShipment = mongoose.model('CollectionShipment', collectionShipmentSchema);
  const TransactionShipment = mongoose.model('TransactionShipment', transactionShipmentSchema);
  const Route = mongoose.model('Route', routeSchema);

  module.exports = {
    Product,
    UserAddress,
    Shipment,
    CollectionShipment,
    TransactionShipment,
    Route,
    shipmentStatus,
    transactionStatus,
    collectionStatus
  };