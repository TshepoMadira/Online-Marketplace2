const admin = require('firebase-admin');
const Joi = require('joi');

const productSchema = Joi.object({
  name: Joi.string().min(1).required(),
  price: Joi.number().greater(0).required(),
  description: Joi.string().optional(),
});
exports.addProduct = async (req, res) => {
  console.log("Request Body:", req.body);

  const { error } = productSchema.validate(req.body);
  if (error) {
    console.log("Validation Error:", error.details);  
    return res.status(400).json({ error: error.details[0].message });
  }

  const { name, price, description } = req.body;
  try {
    const productRef = admin.firestore().collection('products').doc();
    await productRef.set({ name, price, description });
    res.status(201).json({ id: productRef.id, name, price, description });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


exports.listProducts = async (req, res) => {
  try {
    const productsSnapshot = await admin.firestore().collection('products').get();
    const products = productsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(products);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
exports.updateProduct = async (req, res) => {
  const { id } = req.params;

 
  const { id: _, ...updateData } = req.body;

  const productUpdateSchema = Joi.object({
    name: Joi.string().min(1).optional(),
    price: Joi.number().greater(0).optional(),
    description: Joi.string().optional(),
  });

  const { error } = productUpdateSchema.validate(updateData);
  if (error) return res.status(400).json({ error: error.details[0].message });

  try {
    await admin.firestore().collection('products').doc(id).update(updateData);
    res.status(200).json({ message: 'Product updated successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


exports.deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    await admin.firestore().collection('products').doc(id).delete();
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
