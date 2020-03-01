const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const ItemSchema = new Schema({
	_id: ObjectId,
	
	name: {
		type: String,
		required: true
	},
	
	price: {
		type: Number,
		required: true
	},

	createdOn: {
		type: Date,
		required: true
	},

	updatedOn: {
		type: Date,
		required: true,
		default: Date.now
	}

});

module.exports = mongoose.model('Items', ItemSchema);