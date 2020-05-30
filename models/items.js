const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	
	price: {
		type: Number,
		required: true
	}
}, { timestamps: true });

module.exports = mongoose.model('Items', ItemSchema);