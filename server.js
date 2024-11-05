const express = require('express');
const bodyParser = require('body-parser');
const admin = require('firebase-admin');
const cors = require('cors');
const productRoutes = require('./src/routes/productsRoutes');
const errorHandler = require('./src/middlewares/errorHandler');
require('dotenv').config();


const serviceAccount = require('./config/online-marketplace-2b6af-firebase-adminsdk-4z5u4-c1b69585f8.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: `https://online-marketplace-2b6af.firebaseio.com`
});

const app = express();
app.use(cors());
app.use(bodyParser.json());


app.get("/", (req, res) => {
    res.send("Welcome to the Online MarketPlace!");
  });

app.use('/api/products', productRoutes);


app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
