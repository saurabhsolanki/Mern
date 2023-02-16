const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authenticate = require("../middleware/authenticate");

require("../db/conn");

const User = require("../model/userSchema");

router.get("/", (req, res) => {
  res.send("hello world");
});

router.post("/register", async (req, res) => {
  const { name, email, phone, work, password, cpassword } = req.body;

  if (!name || !email || !phone || !work || !password || !cpassword) {
    return res.status(422).json({ error: "please fill the form" });
  }

  try {
    const userExist = await User.findOne({ email: email });

    if (userExist) {
      return res.status(422).json({ error: "Email already exist" });
    } else if (password != cpassword) {
      return res.status(422).json({ error: "password is not same" });
    } else {
      // create the user
      const user = new User({ name, email, phone, work, password, cpassword });

      const userRegister = await user.save();

      res.status(201).json({ message: "user created successfully" });
    }
  } catch (error) {
    console.log(err);
    res.send(err.message);
  }
});

// login route-----

router.post("/signin", async (req, res) => {
  try {
    let token;
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "please fill the field data" });
    }

    const UserLogin = await User.findOne({ email: email });

    if (UserLogin) {
      const isMatch = await bcrypt.compare(password, UserLogin.password);
      
      if (!isMatch) {
        return res.status(400).json({ error: "user error, invalid credientials password" });
      } else {
        // storing the token in cookie after the password match 
        token = await UserLogin.generateAuthToken();
        console.log(token)

        res.cookie("jwtoken", token, {
          expires: new Date(Date.now() + 25892000000),
          httpOnly: true
        });
        res.json({ message: "user signin successfully" });
      }
    } else {
      return res.status(400).json({ error: "user error, invalid credientials" });
    }
  } catch (error) {
    console.log(err.message);
  }
});

// about us ka page
router.get("/about", authenticate, (req, res) => {
  console.log("this is about");
  res.send(req.rootUser);
});

// get user data for  contact us
router.get("/getdata", authenticate, (req, res) => {
  console.log("hello my contact");
  res.send(req.rootUser);
});


// contact us page
router.post("/contact",authenticate,async(req,res)=>{
  try {
   const {name,email,phone,message}= req.body

   if(!name || !email || !phone || !message){
    console.log("error in contact form")
    return res.json({error:"plzz fill the message form in contact"})
   }

   const userContact=await User.findOne({_id:req.userID})

   if(userContact){
    const userMessage =await userContact.addMessage(name,email,phone,message)
    await userContact.save()
    res.status(201).json({message:'user contact successfully '})
   }
  } catch (error) {
    console.log(error)
  }

})

// Logout
router.get("/logout",  (req, res) => {
  console.log("user logout page");
  res.clearCookie("jwtoken",{path:"/"})
  res.status(200).send("user Logout");
});

module.exports = router;
