import {Webhook} from 'svix';
import userModel from '../models/userModel.js'
import  connectDB from '../configs/mongodb.js';

//API Controller function to manage clerk user with database
// http://localhost:4000/api/user/webhooks
const clerkWebhooks = async (req,res)=>{

    try{
        await connectDB();
        
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET)
        

        await whook.verify(JSON.stringify(req.body),{
            "svix-id":req.headers["svix-id"],
            "svix-timestamp":req.headers["svix-timestamp"],
            "svix-signature":req.headers["svix-signature"]
        })
          
       
        const {data, type}=req.body

        switch (type) {
            case "user.created":{

                const userData={
                    clerkId:data.id,
                    email: data.email_addresses[0].email_address,
                    firstName:data.first_name,
                    lastName:data.last_name,
                    photo: data.image_url,
                }

                await userModel.create(userData)
                
               
                break;
            }

            case "user.updated":{

                const updatedData={
                    email: data.email_addresses[0].email_address,
                    firstName:data.first_name,
                    lastName:data.last_name,
                    photo: data.image_url,
                };

                await userModel.findOneAndUpdate({clerkId:data.id},updatedData)
                

                break;
            }

            case "user.deleted":{

                await userModel.findOneAndDelete({clerkId:data.id})
                break;
            }
                
            default:
                console.log("Unhandled event type:", type);
               
        }

        res.status(200).json({ success: true, message: "Webhook received" });


    }catch(error){
        console.log(error.message)
        res.json({success:false,message:error.message})
        
    }

}


//API Controller function to get user avialable credits data

const userCredits= async(req,res)=>{
    try {

        const {clerkId}=req.body   //a middleware with verify a token and from token we will get clerkId

        const userData =await userModel.findOne({clerkId}) //stroing userData of user that we find using the above clerkId

        res.json({success:true, credits:userData.creditBalance})

        
    } catch (error) {
        console.log(error.message);
        res.json({success:false,message:error.message})
    }
}

export {clerkWebhooks, userCredits}