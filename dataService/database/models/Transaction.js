const mongoose = require('mongoose');

const ObjectID = mongoose.Schema.Types.ObjectId;

// Transaction Schema
const TransactionSchema = new mongoose.Schema(
	{
		user_id: {
			type: ObjectID,
			required: true,
		},
		amount: {
			type: Number,
			required: true,
		},
		category: {
			type: String,
			required: true,
		},
		subcategory: {
			type: String,
		},
		month: {
			type: String,
			required: true,
		},
		year: {
			type: Number,
			required: true,
		},
		type: {
			type: String,
			required: true,
		},
	},
	{ collection: 'transactions' }
);

const Transaction = mongoose.model('transaction', TransactionSchema);

module.exports = Transaction;
