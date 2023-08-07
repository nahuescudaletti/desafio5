import { model, Schema } from "mongoose";

let collection ='products'
let schema = new Schema({
    name:{type:String,required:true},
    description:{type:String,required:true},
    stock:{type:Number,required:true},
    price:{type:Number,required:true},
})
const Product = model(collection, schema)
export default Product