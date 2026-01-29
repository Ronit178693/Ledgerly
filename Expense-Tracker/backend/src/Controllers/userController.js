import User from "../Models/Users.js";


export const getUserData = async (req, res) => {
    const {userId} = req.body;
    try{
        const userData = await User.findById(userId);
        if(!userData){
            return res.status(404).json({ success: false, message: "User not found"});
        }
        else{
            res.json({success: true, userData});   
        }
    }
    catch(error){
        console.log(error);
        res.status(500).json({success: false, message: error.message});
    }
}