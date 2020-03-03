const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    usuario: String,
    email: String,
    senha: String,
    ativo:Boolean,
    
});

module.exports = mongoose.model('User', UserSchema);