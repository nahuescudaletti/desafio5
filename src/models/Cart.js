import { model, Schema } from "mongoose";

const cartSchema = new Schema({
    products: [
        {
            type: Schema.Types.ObjectId,
            ref: 'products',
            required: true,
        },
    ],
});

const Cart = model('Cart', cartSchema);

export default Cart;
