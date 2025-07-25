const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const { type } = require("os");



app.use(express.json());
app.use(cors());

// ✅ Connect to MongoDB
mongoose.connect("mongodb+srv://hemanthyatirajula05:Hemanth143@hemanth.w65r96m.mongodb.net/e-commerce", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// ✅ Base route
app.get("/", (req, res) => {
  res.send("Express App is Running");
});

// ✅ Setup Multer for file uploads
const storage = multer.diskStorage({
  destination: './upload/images',
  filename: (req, file, cb) => {
         return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
  }
});

const upload = multer({ storage });

// ✅ Serve static images from /images route
app.use('/images', express.static('upload/images'));

// ✅ Image upload route with error check
// image field should be named 'product'
// Upload a single image (field name must be 'product')
app.post("/upload", upload.single('product'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: 0, message: "No file uploaded" });
  }

  res.json({
    success: 1,
    image_url: `http://localhost:${port}/images/${req.file.filename}`
  });
});


// Add a product to MongoDB
app.post('/addproduct', async (req, res) => {
    let products = await Product.find({});
    let id;
    if(products.length>0)
    {
        let last_product_array=products.slice(-1);
        let last_product=last_product_array[0];
        id = Number(last_product.id)+1;
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

   const token = jwt.sign(data,'secret_ecom');
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
      const token = jwt.sign(data,'secret_ecom');
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
