const mongoose=require('mongoose');

const MessageSchema= new mongoose.Schema({
	senderUserID:{type: String,  require: true, lowercase: true},
	receiverUserID:{type: String,  require: true, lowercase: true},
	createdAt:{ type: Date, default:Date.now},
	message: {type: Array , require: true, default:[]}
})

module.exports=mongoose.model('ChatMessageModel', MessageSchema);