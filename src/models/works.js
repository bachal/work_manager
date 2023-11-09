import mongoose, { Schema } from "mongoose";
const enumArray = ['pending', 'completed', 'cancelled','inprogress']
const worksSchema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    created: { type: Date, default: Date.now, required: true },
    completed: { type: Date,default:""},
    userId:{type:mongoose.ObjectId,required:true},
    status: {
        type: String, enum: enumArray, default: 'pending', required: true
    }
})
export const works = mongoose.models.works || mongoose.model('works', worksSchema)