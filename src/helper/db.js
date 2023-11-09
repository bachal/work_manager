import { users } from '@/models/user';
import mongoose from 'mongoose';

export const connectDB=async()=>{
    try{
        console.log('en',process.env.MONGO_DB_URL)
        const {connection}=await mongoose.connect(process.env.MONGO_DB_URL,{
            dbName:"work_manager"
        });
        console.log('db connected....')
        // const newUser=new users({name:"test1",email:"test@gmail.com"});
        // await newUser.save()

    }
    catch(error){
        console.log('db not connected....')

    }

}