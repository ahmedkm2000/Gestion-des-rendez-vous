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
app.use('/api/v1/role',auth,roleRoute);
app.use('/api/v1/organization',auth,organizationRoute);
app.use('/api/v1/user',auth,userRoute);



server.listen(port,()=>{
    console.log("server is running on port " + port + " ....");
})