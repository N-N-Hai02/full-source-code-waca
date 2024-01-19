import mongoose from 'mongoose';

const categoryProductShema = mongoose.Schema({
    name:{
        type: String,
        require: true
    },
    description:{
        type: String,
        require: true,
    }
},
{
    timestamps: true
})

const CategoryProduct = mongoose.model("CategoryProduct", categoryProductShema);

export default CategoryProduct;