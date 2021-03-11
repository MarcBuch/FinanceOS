const express = require('express');
const { query, body, validationResult } = require('express-validator');
const { verifyToken } = require('../lib/authorization');

// Models
const TransactionModel = require('../database/models/Transaction');

const router = express.Router();

const validTypes = ['income', 'expense', 'all'];
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
 * @method GET
 * @route  /api/transactions
 * @desc   Get transactions by id, year, month, type, category, subcategory, amount
 * @access private
 */
router.get('', verifyToken, async (req, res) => {
	if (Object.keys(req.query).length === 0) {
		return res.status(400).json({
			errors: [
				{
					msg: 'You must provide a query',
				},
			],
		});
	}
	try {
		const searchObj = {
			user_id: req.body.userID,
		};

		if (req.query.id) {
			const transaction = await TransactionModel.findById(req.query.id);
			return res.json(transaction);
		}

		if (req.query.year) {
			searchObj.year = req.query.year;
		}

		if (req.query.month) {
			if (!validMonths.includes(req.query.month)) {
				return res.status(400).json({
					errors: [{ msg: 'Invalid month', params: { month: req.query.month } }],
				});
			}
			searchObj.month = req.query.month.toLowerCase();
		}

		if (req.query.type) {
			if (!validTypes.includes(req.query.type)) {
				return res
					.status(400)
					.json({ errors: [{ msg: 'Invalid type', params: { type: req.query.type } }] });
			}
			searchObj.type = req.query.type.toLowerCase();
		}

		if (req.query.category) {
			searchObj.category = req.query.category.toLowerCase();
		}

		if (req.query.amount) {
			searchObj.amount = req.query.amount;
		}

		if (req.query.subcategory) {
			searchObj.subcategory = req.query.subcategory.toLowerCase();
		}

		const transactions = await TransactionModel.find(searchObj);
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

		return res.json(transactions);
	} catch (err) {
		return res.status(500).json({ errors: [{ msg: 'Server Error' }] });
	}
});

/**
 * @method POST
 * @route  /api/transactions
 * @desc   Post a new transaction
 * @access private
 */
router.post(
	'',
	verifyToken,
	[
		body('year', 'Year is required').not().isEmpty(),
		body('year', 'Year is required as number').isNumeric(),
		body('month', 'Month is required').not().isEmpty(),
		body('month', 'Month isnt valid').isIn(validMonths),
		body('amount', 'Amount is required').not().isEmpty(),
		body('amount', 'Amount is required as number').isNumeric(),
		body('category', 'Category is required').not().isEmpty(),
		body('type', 'Type is required').not().isEmpty(),
		body('type', 'Type isnt valid').isIn(validTypes),
	],
	async (req, res) => {
		// Check express-validation
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		try {
			req.body.month = req.body.month.toLowerCase();
			req.body.category = req.body.category.toLowerCase();
			req.body.type = req.body.type.toLowerCase();

			if (req.body.subcategory) {
				req.body.subcategory = req.body.subcategory.toLowerCase();

				const newTransaction = new TransactionModel({
					user_id: req.body.userID,
					year: req.body.year,
					month: req.body.month,
					type: req.body.type,
					amount: req.body.amount,
					category: req.body.category,
					subcategory: req.body.subcategory,
				});

				const transaction = await newTransaction.save();

				return res.json(transaction);
			}

			const newTransaction = new TransactionModel({
				user_id: req.body.userID,
				year: req.body.year,
				month: req.body.month,
				type: req.body.type,
				amount: req.body.amount,
				category: req.body.category,
				subcategory: '',
			});

			const transaction = await newTransaction.save();

			return res.json(transaction);
		} catch (err) {
			return res.status(500).json({ errors: [{ msg: 'Server Error' }] });
		}
	}
);

/**
 * @method PUT
 * @route  /api/transactions
 * @desc   Update a transaction
 * @todo:  @access private
 */
router.put(
	'',
	verifyToken,
	[
		body('id', 'ID is required').not().isEmpty(),
		body('year', 'Year is required').not().isEmpty(),
		body('year', 'Year is required as number').isNumeric(),
		body('month', 'Month is required').not().isEmpty(),
		body('month', 'Month isnt valid').isIn(validMonths),
		body('amount', 'Amount is required').not().isEmpty(),
		body('amount', 'Amount is required as number').isNumeric(),
		body('category', 'Category is required').not().isEmpty(),
		body('type', 'Type is required').not().isEmpty(),
		body('type', 'Type isnt valid').isIn(validTypes),
	],
	async (req, res) => {
		// Check express-validation
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		try {
			const transaction = await TransactionModel.findById(req.body.id);

			if (!transaction || transaction.length === 0) {
				return res.status(400).json({
					errors: [
						{
							msg: 'There is no transaction for this id',
							params: { id: req.body.id },
						},
					],
				});
			}

			transaction.year = req.body.year;
			transaction.month = req.body.month.toLowerCase();
			transaction.type = req.body.type.toLowerCase();
			transaction.category = req.body.category.toLowerCase();
			transaction.amount = req.body.amount;

			if (req.body.subcategory) {
				transaction.subcategory = req.body.subcategory.toLowerCase();
			}

			const newTransaction = await transaction.save();
			return res.json(newTransaction);
		} catch (err) {
			return res.status(500).json({ errors: [{ msg: 'Server Error' }] });
		}
	}
);

/**
 * @method DELETE
 * @route  /api/transactions
 * @desc   Delete a transaction
 * @todo:  @access private
 */
router.delete(
	'',
	verifyToken,
	[query('id', 'ID is required').not().isEmpty()],
	async (req, res) => {
		// Check express-validation
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		try {
			const transaction = await TransactionModel.findByIdAndDelete(req.query.id);

			if (!transaction || transaction.length === 0) {
				return res.status(400).json({
					errors: [
						{
							msg: 'There is no transaction for this id',
							params: { id: req.body.id },
						},
					],
				});
			}

			return res.json({ msg: 'success' });
		} catch (err) {
			return res.status(500).json({ errors: [{ msg: 'Server Error' }] });
		}
	}
);

module.exports = router;
