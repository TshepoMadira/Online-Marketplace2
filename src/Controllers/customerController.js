const admin = require('firebase-admin');


exports.registerUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userRecord = await admin.auth().createUser({ email, password });
    res.status(201).json({ uid: userRecord.uid });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userRecord = await admin.auth().getUserByEmail(email);
    const token = await admin.auth().createCustomToken(userRecord.uid);
    res.json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


exports.addProduct = async (req, res) => {
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
  const { name, price, description } = req.body;
  try {
    await admin.firestore().collection('products').doc(id).update({ name, price, description });
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
