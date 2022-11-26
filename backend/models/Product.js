import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: {
        type: 'string',
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        trim: true
    },
    image: {
        url: String,
        public_id: String,
    },
    stock: {
        type: Number,
        required: true,
        trim: true
    }
})

export default mongoose.model('Product', productSchema);