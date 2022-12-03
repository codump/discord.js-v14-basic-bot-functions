const mongoose = require('mongoose');

const schema = new mongoose.Schema({
	user: {
		type: String,
		required: true
	},
	count: {
		type: Number,
		required: true
	},
	reasons: [{
		type: String,
		required: true
	}],
});

module.exports = mongoose.model('warning', schema);
