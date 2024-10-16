const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    username: {
        type: String, required:true, unique:true,
    },
    email:{
        type: String, required:true, unique:true,
    },
    password:{
        type: String, required:true,
    },
    cart: [{
        productId: {
            type :mongoose.Schema.Types.ObjectId,
            ref:'Product',
        },
        quantity: {
            type: Number, required: true, default: 1,
        },
    }],
    role: {
        type: String,
        default: 'User',
    },
}, {timestamps: true})

userSchema.pre('save', async function(next){
    if (!this.isModified('password')){
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

userSchema.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
}
module.exports = mongoose.model('User', userSchema)