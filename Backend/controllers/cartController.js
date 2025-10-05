import userModel from "../models/userModel.js";

//add to cart
const addToCart = async (req, res) => {
  try {
    let userData = await userModel.findOne({ _id: req.body.userId });
    let cartData = await userData.cartData;

    if (!cartData[req.body.itemId]) {
      cartData[req.body.itemId] = 1;
    } else {
      cartData[req.body.itemId] += 1;
    }
    await userModel.findByIdAndUpdate(req.body.userId, { cartData });
    res.send({ success: true, message: "Added to Cart" });
  } catch (error) {
    console.log(error);
    res.send({ success: false, message: "Added to Cart" });
  }
};

//remove from cart
const removeFromCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId);
    let cartData = await userData.cartData;

    if (cartData[req.body.itemId] > 0) {
      cartData[req.body.itemId] -= 1;
    }

    await userModel.findByIdAndUpdate(req.body.userId, { cartData });
    res.send({ success: true, message: "Removed From Cart" });
  } catch (error) {
    console.log(error);
    req.send({success:false,message:"Error"})
  }     
};     

//get cart
const getCart = async (req, res) => {
     try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
         res.send({success:true,cartData})
     } catch (error) {                        
        console.log(error) 
        res.send({success:false,message:"Error"})
     }

};

export { addToCart, removeFromCart, getCart };
