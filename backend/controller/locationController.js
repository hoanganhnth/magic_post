const {
  CollectionPoint,
  TransactionPoint
  } = require("../models/Location");

  async function createCollectionPoint(req, res) {
    const {name, address} = req.body
    try {
        const existingPoint = await CollectionPoint.findOne({ name });
        if (existingPoint) {
            return res.status(409).json({ message: "CollectionPoint already exists" });
          }
          const newPoint = await CollectionPoint.create({ name: name, address: address });
      
          return res.json(newPoint);
    } catch (error) {
        console.error("create CollectionPoint error:", error);
        return res.status(400).json({ message: "Could not create CollectionPoint" });
    }
  }

  async function createTransactionPoint(req, res) {
    const {name, address, collectionPoint_id} = req.body
    try {
        const existingPoint = await TransactionPoint.findOne({ name });
        if (existingPoint) {
            return res.status(409).json({ message: "TransactionPoint already exists" });
          }
          const newPoint = await TransactionPoint.create({ name: name, address: address, collectionPoint_id: collectionPoint_id});
      
          return res.json(newPoint);
    } catch (error) {
        console.error("create TransactionPoint error:", error);
        return res.status(400).json({ message: "Could not create TransactionPoint" });
    }
  }

  async function deleteTransactionPoint(req, res) {
    const id = req.body.transaction_id
    if (!id) {
        return res.status(400).json({ message: "Missing id parameter" });
      }
    try {
      const transactionPointToDelete = await TransactionPoint.findById(id);
      if (!transactionPointToDelete) {
        return res.status(404).json({ message: "transactionPoint does not found" });
      }

      await transactionPointToDelete.deleteOne();
    
      return res.json({
        message: "transactionPoint records deleted successfully",
      });
    } catch (err) {
      console.error("Delete transactionPoint error:", err);
      return res.status(400).json({ message: "Could not delete transactionPoint" });
    }
  }

  async function deleteCollectionPoint(req, res) {
    const id = req.body.collectionPoint_id
    if (!id) {
        return res.status(400).json({ message: "Missing id parameter" });
    }
    try {
      const collectionPointToDelete = await CollectionPoint.findById(id);
      if (!collectionPointToDelete) {
        return res.status(404).json({ message: "CollectionPoint does not found" });
      }

      await collectionPointToDelete.deleteOne();
    
      try {
        await TransactionPoint.deleteMany({ collectionPoint_id: id });
        return res.json({
            message: "CollectionPoint and related transactionPoint records deleted successfully",
          });
      } catch (error) {
        console.error("Delete transactionPoint records error:", error);
        return res.status(500).json({ message: "Internal Server Error" });
      }
     
    } catch (err) {
      console.error("Delete CollectionPoint error:", err);
      return res.status(400).json({ message: "Could not delete CollectionPoint" });
    }
  }

  async function getAllTransactionPoint(req, res) {
    try {
        const transactionPoint = await TransactionPoint.find();
        return res.json(transactionPoint);
      } catch (error) {
        console.error("get transactionPoint error:", error);
        return res.status(400).json({ message: "Could not get transactionPoint" });
      }
  }

  async function getAllCollectionPoint(req, res) {
    try {
        const collectionPoint = await CollectionPoint.find();
        return res.json(collectionPoint);
      } catch (error) {
        console.error("get collectionPoint error:", error);
        return res.status(400).json({ message: "Could not get collectionPoint" });
      }
  }

  module.exports = {
    createCollectionPoint,
    createTransactionPoint,
    deleteTransactionPoint,
    deleteCollectionPoint,
    getAllTransactionPoint,
    getAllCollectionPoint
  };