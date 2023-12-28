const mongoose = require("mongoose");
const moment = require('moment');

const transactionPointSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  collectionPoint_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CollectionPoint",
    required: true
  },
  total_shipment: {
    type: Number,
    required: true,
    default: 0, 
  },
  success_shipment: {
    type: Number,
    required: true,
    default: 0, 
  },
  cancel_shipment: {
    type: Number,
    required: true,
    default: 0, 
  },
  receive_shipment: {
    type: Number,
    required: true,
    default: 0, 
  },
  transfer_shipment: {
    type: Number,
    required: true,
    default: 0, 
  },
});

const collectionPointSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  receive_shipment: {
    type: Number,
    required: true,
    default: 0, 
  },
  transfer_shipment: {
    type: Number,
    required: true,
    default: 0, 
  },
});

transactionPointSchema.set("timestamps", {
  createdAt: "created_at",
  updatedAt: "updated_at",
});

transactionPointSchema.set("toObject", { virtuals: true });
transactionPointSchema.set("toJSON", { 
  virtuals: true,
  transform: function (doc, ret) {
    ret.created_at = moment(ret.created_at).format("HH:mm:ss, DD-MM-YYYY");
    ret.updated_at = moment(ret.updated_at).format("HH:mm:ss, DD-MM-YYYY");
    delete ret._id;
    delete ret.__v;
  }
});
collectionPointSchema.set("timestamps", {
  createdAt: "created_at",
  updatedAt: "updated_at",
});

collectionPointSchema.set("toObject", { virtuals: true });
collectionPointSchema.set("toJSON", { 
  virtuals: true,
  transform: function (doc, ret) {
    ret.created_at = moment(ret.created_at).format("HH:mm:ss, DD-MM-YYYY");
    ret.updated_at = moment(ret.updated_at).format("HH:mm:ss, DD-MM-YYYY");
    delete ret._id;
    delete ret.__v;
  }
});

const TransactionPoint = mongoose.model(
  "TransactionPoint",
  transactionPointSchema
);

const CollectionPoint = mongoose.model(
  "CollectionPoint",
  collectionPointSchema
);

module.exports = {
  TransactionPoint,
  CollectionPoint,
};
