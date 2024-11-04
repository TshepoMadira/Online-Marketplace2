const express = require('express');
const bodyParser = require('body-parser');
const admin = require('firebase-admin');
const cors = require('cors');
const customerRoutes = require('./src/routes/customerRoutes');
const errorHandler = require('./src/middlewares/errorHandler');
require('dotenv').config();


const serviceAccount = require('./config/online-marketplace-2b6af-firebase-adminsdk-4z5u4@online-marketplace-2b6a.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: `https://${process.env.FIREBASE_PROJECT_ID}.firebaseio.com`
});

const app = express();
app.use(cors());
app.use(bodyParser.json());


app.use('/api/customers', customerRoutes);


app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
