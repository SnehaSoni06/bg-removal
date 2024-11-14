import jwt from 'jsonwebtoken'

//Middleware Function to decode jwt token to get clerkId

const authUser = async(req,res,next)=>{
    try {
        //Logic to convert token to clerkId

        const {token} = req.headers  //look for token in header

        if(!token){
            return res.json({success:false, message:"Not Authorized Login Again"})
        }

        const token_decode=jwt.decode(token) //if token is in header then decode token
        req.body.clerkId=token_decode.clerkId  //we get clerkId from token_decode and add in request body
        next()


        
    } catch (error) {
        console.log(error.message);
        res.json({success:false,message:error.message})


        
    }
}

export default authUser;