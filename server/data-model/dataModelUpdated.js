const mongoose=require('mongoose');

const DataSchema= new mongoose.Schema({
	username:{type: String,  require: true, lowercase: true},
	createdAt:{ type: Date, default:Date.now},
	email:{type: String,  require: true, lowercase: true},
	status:{type: String,  require: true, lowercase: true, default:''},
	contact: {type: Array , require: true, default:[]}
})

module.exports=mongoose.model('ChatUserModel', DataSchema);