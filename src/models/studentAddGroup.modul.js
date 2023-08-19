import { Schema, model } from "mongoose";

const studentAddGroupSchema = new Schema({
    groupId:{type:Schema.Types.ObjectId, ref:"Group"},
    studentId:{type:Schema.Types.ObjectId, ref:"student"}
},
{
    timestamps:true
})

export const studentAddGroup = model("studentAddGroup", studentAddGroupSchema)