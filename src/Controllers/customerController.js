const admin = require('firebase-admin');
const Joi = require('joi');



const userSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const productSchema = Joi.object({
  name: Joi.string().min(1).required(),
  price: Joi.number().greater(0).required(),
  description: Joi.string().optional(),
});

exports.registerUser = async (req, res) => {
  const { error } = userSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const { email, password } = req.body;
  try {
    const userRecord = await admin.auth().createUser({ email, password });
    res.status(201).json({ uid: userRecord.uid });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.loginUser = async (req, res) => {
  const { error } = userSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const { email } = req.body;
  try {
    const userRecord = await admin.auth().getUserByEmail(email);
    const token = await admin.auth().createCustomToken(userRecord.uid);
    res.json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.addProduct = async (req, res) => {
  const { error } = productSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

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

  
  const productUpdateSchema = Joi.object({
    name: Joi.string().min(1).optional(),
    price: Joi.number().greater(0).optional(),
    description: Joi.string().optional(),
  });

  const { error } = productUpdateSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  try {
    await admin.firestore().collection('products').doc(id).update(req.body);
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
