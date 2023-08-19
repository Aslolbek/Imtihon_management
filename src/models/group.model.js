import { Schema, model } from "mongoose";


const groupSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    student :{type:Schema.Types.ObjectId, ref:"student"}
}, 
{
    timestamps: true
})

export const Group = model('Group', groupSchema);