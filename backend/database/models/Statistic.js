const mongoose = require('mongoose');

const ObjectID = mongoose.Schema.Types.ObjectId;

// Statistic Schema
const StatisticSchema = new mongoose.Schema(
	{
		user_id: {
			type: ObjectID,
			required: true,
		},
		totalIncome: {
			type: Number,
			required: true,
		},
		totalExpenses: {
			type: Number,
			required: true,
		},
		totalExpensesWithSavings: {
			type: Number,
			required: true,
		},
		netIncome: {
			type: Number,
			required: true,
		},
		spendPerTransaction: {
			type: Number,
			required: true,
		},
		savingsRatio: {
			type: Number,
			required: true,
		},
		year: {
			type: Number,
			required: true,
		},
		month: {
			type: String,
			required: true,
		},
	},
	{ collection: 'statistics' }
);

const Statistic = mongoose.model('statistic', StatisticSchema);

module.exports = Statistic;
