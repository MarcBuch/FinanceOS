const express = require('express');
const { query, validationResult } = require('express-validator');
const Statistic = require('../lib/statistic');
const { verifyToken } = require('../lib/authorization');

// Models
const StatisticModel = require('../database/models/Statistic');
const TransactionModel = require('../database/models/Transaction');

const router = express.Router();

const validMonths = [
	'January',
	'january',
	'February',
	'february',
	'March',
	'march',
	'April',
	'april',
	'May',
	'may',
	'June',
	'june',
	'July',
	'july',
	'August',
	'august',
	'September',
	'september',
	'October',
	'october',
	'November',
	'november',
	'December',
	'december',
];

/**
 * @route  /api/statistics
 * @method GET
 * @desc   Get statistics by year and month
 * @access private
 */
router.get('', verifyToken, async (req, res) => {
	const searchObj = {
		year: req.query.year,
		user_id: req.body.userID,
	};

	if (req.query.month) {
		if (!validMonths.includes(req.query.month)) {
			return res.status(400).json({
				errors: [{ msg: 'Invalid month', param: req.query.month }],
			});
		}
		searchObj.month = req.query.month.toLowerCase();
	}

	try {
		const statistics = await StatisticModel.find(searchObj);
		if (statistics.length > 0) {
			return res.json(statistics);
		}
		if (req.query.month && req.query.year) {
			return res.status(404).json({
				errors: [
					{
						msg: 'There are no statistics for this year and month',
						params: { month: req.query.month, year: req.query.year },
					},
				],
			});
		}
		if (req.query.month && !req.query.year) {
			return res.status(404).json({
				errors: [
					{
						msg: 'There are no statistics for this month',
						params: { month: req.query.month },
					},
				],
			});
		}
		if (!req.query.month && req.query.year) {
			return res.status(404).json({
				errors: [
					{
						msg: 'There are no statistics for this year',
						params: { month: req.query.month },
					},
				],
			});
		}
	} catch (err) {
		return res.status(500).json({ errors: [{ msg: 'Server Error' }] });
	}
});

/**
 * @method POST
 * @route  /api/statistics
 * @desc   Calculate and saves a new statistic
 * @access private
 */
router.post(
	'',
	verifyToken,
	[
		query('year', 'Year is required').not().isEmpty(),
		query('year', 'Year is required as number').isNumeric(),
		query('month', 'Month is required').not().isEmpty(),
		query('month', 'Month isnt valid').isIn(validMonths),
	],
	async (req, res) => {
		// Check express validation
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		// Calculate statistics based on transactions
		try {
			// Check if there are transactions for this year and month
			const transactions = await TransactionModel.find({
				year: req.query.year,
				month: req.query.month.toLowerCase(),
				user_id: req.body.userID,
			});

			if (!transactions || transactions.length === 0) {
				return res.status(400).json({
					errors: [
						{
							msg: 'There are no transactions for this year and month',
							params: { year: req.query.year, month: req.query.month },
						},
					],
				});
			}
			// Check if there already is a statistic
			const statistic = await StatisticModel.findOne({
				year: req.query.year,
				month: req.query.month.toLowerCase(),
			});

			if (statistic) {
				return res.status(400).json({
					errors: [
						{
							msg: 'There already is a statistic for this year and month',
						},
					],
				});
			}

			// Calculate the new statistic
			const newStatistic = new Statistic(transactions);
			const newStatisticModel = new StatisticModel();

			newStatisticModel.user_id = req.body.userID;
			newStatisticModel.totalIncome = newStatistic.totalIncome;
			newStatisticModel.totalExpenses = newStatistic.totalExpenses;
			newStatisticModel.totalExpensesWithSavings = newStatistic.totalExpensesWithSavings;
			newStatisticModel.netIncome = newStatistic.netIncome;
			newStatisticModel.spendPerTransaction = newStatistic.spendPerTransaction;
			newStatisticModel.savingsRatio = newStatistic.savingsRatio;
			newStatisticModel.year = req.query.year;
			newStatisticModel.month = req.query.month.toLowerCase();

			const result = await newStatisticModel.save();

			return res.json(result);
		} catch (err) {
			return res.status(500).json({ errors: [{ msg: 'Server Error' }] });
		}
	}
);

/**
 * @method PUT
 * @route  /api/statistics
 * @desc   Update a statistic
 * @access private
 */
router.put(
	'',
	verifyToken,
	[
		query('year', 'Year is required').not().isEmpty(),
		query('year', 'Year is required as number').isNumeric(),
		query('month', 'Month is required').not().isEmpty(),
		query('month', 'Month is not valid').isIn(validMonths),
	],
	async (req, res) => {
		// Check express validation
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		// Update statistics based on transactions
		try {
			const statistic = await StatisticModel.findOne({
				year: req.query.year,
				month: req.query.month,
				user_id: req.body.userID,
			});

			if (!statistic || statistic.length === 0) {
				return res.status(400).json({
					errors: [
						{
							msg: 'There is no statistic for this year and month',
							params: { year: req.query.year, month: req.query.month },
						},
					],
				});
			}

			const transactions = await TransactionModel.find({
				year: req.query.year,
				month: req.query.month,
				user_id: req.body.userID,
			});

			if (!transactions || transactions.length === 0) {
				await StatisticModel.findOneAndDelete({
					year: req.query.year,
					month: req.query.month,
					user_id: req.body.userID,
				});

				return res.status(200).json({
					success: true,
					message: `Deleted the statistic for ${req.query.month} ${req.query.year}`,
				});
			}

			const newStatistic = new Statistic(transactions);

			statistic.user_id = req.body.userID;
			statistic.totalIncome = newStatistic.totalIncome;
			statistic.totalExpenses = newStatistic.totalExpenses;
			statistic.totalExpensesWithSavings = newStatistic.totalExpensesWithSavings;
			statistic.netIncome = newStatistic.netIncome;
			statistic.spendPerTransaction = newStatistic.spendPerTransaction;
			statistic.savingsRatio = newStatistic.savingsRatio;
			statistic.year = req.query.year;
			statistic.month = req.query.month.toLowerCase();

			const updatedStatistic = await statistic.save();

			return res.json(updatedStatistic);
		} catch (err) {
			return res.status(500).json({ errors: [{ msg: 'Server Error' }] });
		}
	}
);

/**
 * @route  DELETE /api/statistics
 * @desc   Delete a statistic
 * @access private
 */
router.delete(
	'',
	verifyToken,
	[
		query('year', 'Year is required').not().isEmpty(),
		query('year', 'Year is required as number').isNumeric(),
		query('month', 'Month is required').not().isEmpty(),
		query('month', 'Month isnt valid').isIn(validMonths),
	],
	async (req, res) => {
		// Check express-validation
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		try {
			const statistics = await StatisticModel.findOneAndDelete({
				year: req.query.year,
			});
			if (!statistics || statistics.length === 0) {
				return res.status(400).json({
					errors: [
						{
							msg: 'There is no statistic for this year and month',
							params: { year: req.query.year, month: req.query.month },
						},
					],
				});
			}

			return res.json(statistics);
		} catch (err) {
			return res.status(500).json({ errors: [{ msg: 'Server Error' }] });
		}
	}
);

module.exports = router;
