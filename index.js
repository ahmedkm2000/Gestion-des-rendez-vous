const http = require('http');
const express = require('express');
const app = express();
const server = http.createServer(app);
const mongoose = require('mongoose');
require('dotenv').config();
const port = process.env.PORT || 5001;
const mongodb_url = process.env.MONGO_URI;
const {auth} = require('./midllewares/auth')
const roleRoute = require('./routes/role');
const organizationRoute = require('./routes/organization');
const userRoute = require('./routes/user');
mongoose.connect(mongodb_url, { useNewUrlParser: true , useUnifiedTopology: true })
  .then(() => console.log('Connection to MongoDB successful !'))
  .catch((err) => console.log('Connection to MongoDB failed !' + err));

app.use(express.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});
app.use('/api/v1/role',roleRoute);
app.use('/api/v1/organization',organizationRoute);
app.use('/api/v1/user',userRoute);
const {sendEmail} = require('./services/emailVerification')
app.post('/email',sendEmail)



server.listen(port,()=>{
    console.log("server is running on port " + port + " ....");
})