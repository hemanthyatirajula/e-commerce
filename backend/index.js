const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const cors = require("cors");





app.use(express.json());
app.use(cors());

// ✅ Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// ✅ Base route
app.get("/", (req, res) => {
  res.send("Express App is Running");
});

// ✅ Setup Multer for file uploads
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const upload = multer({
  storage: multer.memoryStorage(),
});

app.post("/upload", upload.single("product"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: 0,
        message: "No file uploaded",
      });
    }

    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "e-commerce",
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );

      stream.end(req.file.buffer);
    });

    res.json({
      success: 1,
      image_url: result.secure_url,
    });

  } catch (error) {
    console.error("Cloudinary upload error:", error);

    res.status(500).json({
      success: 0,
      message: "Image upload failed",
    });
  }
});

// Add a product to MongoDB
app.post('/addproduct', async (req, res) => {
    let products = await Product.find({});
    let id;
    if(products.length>0)
    {
        let last_product_array=products.slice(-1);
        let last_product=last_product_array[0];
        id =Number(last_product.id)+1;
    }
    else{
        id=1;
    }
    const product = new Product({
      id: id,
      name: req.body.name,
      image: req.body.image,
      category: req.body.category,
      new_price: req.body.new_price,
      old_price: req.body.old_price,
    });

    console.log( product);
    await product.save();
    console.log("Product saved.");

    res.json({
      success: true,
      name: req.body.name,
    });
});
//Creating API for deleting products
app.post('/removeproduct',async(req,res)=>{
    await Product.findOneAndDelete({id:req.body.id});
    console.log("Removed");
    res.json({
        success:true,
        name:req.body.name
    })
})


//Creating API for getting all products
app.get('/allproducts',async(req,res)=>{
    let products=await Product.find({});
    console.log("All Products Fetched");
    res.send(products);
})


//Creating endpoint for new collection data
app.get('/newcollections',async(req,res)=>{
  let products = await Product.find({});
     let newcollection = products.slice(1).slice(-8);
    console.log("NewCollection Fetched");
    res.send(newcollection);
  
})
//Schema for Creating for User Model
const Users=mongoose.model('Users',{
  name:{
    type:String,
  },
  email:{
    type:String,
    unique:true,
  },
  password:{
    type:String,
  },
   cartData:{
     type:Object,
  },
  date:{
     type:Date,
     default:Date.now,
  }
 
})

//Creating Endpoint for Regestering User
app.post('/signup',async(req,res)=>{

  let check = await Users.findOne({email:req.body.email});
  if(check){
    return res.status(400).json({success:false,errors:"exixting user found with same email "})
  }
  let cart = {};
  for(let i = 0; i<300;i++){
    cart[i]=0;
    }
   const user = new Users({
    name:req.body.username,
    email:req.body.email,
    password:req.body.password,
    cartData:cart,
   })
   await user.save();
   const data = {
    user:{
      id:user.id
    }
   }

   const token = jwt.sign(data, process.env.JWT_SECRET);
   res.json({success:true,token})
})

//Crreating Endpoint for User Login
app.post('/login',async (req,res)=>{
  let user = await Users.findOne({email:req.body.email});
  if(user){
    const passCompare = req.body.password === user.password;
    if(passCompare){
      const data = {
        user:{
          id:user.id
        }
      }
      const token = jwt.sign(data, process.env.JWT_SECRET);
      res.json({success:true,token});
    }
    else{
      res.json({success:false,errors:"Wrong Password"});
    }
 }
 else{
  res.json({success:false,errors:"Wrong E-mail ID"})
 }
})



const OrderSchema = new mongoose.Schema({
  user: {
    name: String,
    email: String,
    phone: String,
  },
  items: [
    {
      id: Number,
      name: String,
      price: Number,
      quantity: Number
    }
  ],
  totalAmount: Number,
  paymentMethod: String,
  paymentId: String,
  status: { type: String, default: "Pending" },
  orderTime: String,
  deliveryDate: String,
  isDelivered: { type: Boolean, default: false },
  deliveryTime: String,
});

  const OrderModel = mongoose.model('orders', OrderSchema);

// ✅ Updated /placeorder endpoint
// app.post('/placeorder', async (req, res) => {
//   try {
//     const {
//       user, items, totalAmount, shippingCharge,
//       discountAmount, paymentMethod, couponCode, paymentId
//     } = req.body;

//     if (!user || !items || !totalAmount || !paymentId) {
//       return res.status(400).json({ success: false, message: "Missing fields" });
//     }

//     const newOrder = new OrderModel({
//       user,
//       items,
//       totalAmount,
//       shippingCharge,
//       discountAmount,
//       paymentMethod,
//       couponCode,
//       paymentId,
//       status: "Success",
//       orderTime: new Date().toLocaleString(),
//       deliveryDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString(), // 5 days from now
//       isDelivered: false,
//       deliveryTime: ""
//     });

//     await newOrder.save();
//     console.log("✅ Order Saved:", newOrder);
//     res.json({ success: true, message: "Order placed successfully" });

//   } catch (err) {
//     console.error("❌ Order Save Error:", err);
//     res.status(500).json({ success: false, message: "Server error while placing order" });
//   }
// });

app.post('/placeorder', async (req, res) => {

  console.log("========== PLACE ORDER ==========");
  console.log(req.body);

  try {
    const { user, items, totalAmount, paymentMethod, paymentId } = req.body;

    if (!user || !items || !totalAmount || !paymentId) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    const newOrder = new OrderModel({
      user,
      items,
      totalAmount,
      paymentMethod,
      paymentId,
      status: "Success",
      orderTime: new Date().toLocaleString(),
      deliveryDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString(),
      isDelivered: false,
      deliveryTime: ""
    });

    await newOrder.save();
    res.json({ success: true, message: "Order placed successfully" });
  } catch (err) {
    console.error("❌ Order Save Error:", err);
    res.status(500).json({ success: false, message: "Server error while placing order" });
  }
});



//Get all orders
// Get all orders
app.get('/allorders', async (req, res) => {
  const orders = await OrderModel.find({});
  res.json(orders);
});


//Schema for creating products

const Product=mongoose.model("Product",{
id:{
    type:Number,
    required:true,
},
name:{
    type:String,
    required:true,
},
image:{
    type:String,
    required:true,
},
category:{
    type:String,
    required:true,
},
new_price:{
    type:Number,
    required:true,
},
old_price:{
    type:Number,
    required:true,
},
date:{
     type:Date,
     default:Date.now,
},
available:{
    type:Boolean,
    default:true,
},
});






// ✅ Start server
app.listen(port, (error) => {
  if (!error) {
    console.log("🚀 Server Running on Port " + port);
  } else {
    console.log("❌ Error: " + error);
  }
});
