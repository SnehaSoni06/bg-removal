import {Webhook} from 'svix';
import userModel from '../models/userModel.js'
import  connectDB from '../configs/mongodb.js';
// import { base64 } from '@stablelib/base64';
// let base64;
// const loadBase64 = async () => {
//   const module = await import('@stablelib/base64');
//   base64 = module.base64;
// };



//API Controller function to manage clerk user with database
// http://localhost:4000/api/user/webhooks
const clerkWebhooks = async (req,res)=>{

    try{
        await connectDB();
        
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET)
        // if (!base64) await loadBase64();

        await whook.verify(JSON.stringify(req.body),{
            "svix-id":req.headers["svix-id"],
            "svix-timestamp":req.headers["svix-timestamp"],
            "svix-signature":req.headers["svix-signature"]
        })
          
        res.status(200).json({ success: true, message: "Webhook received" });

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

    }catch(error){
        console.log(error.message)
        res.json({success:false,message:error.message})
        
    }

}
export {clerkWebhooks}