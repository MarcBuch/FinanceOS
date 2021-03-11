const mongoose = require('mongoose');
const config = require('config');

const db = config.get('mongoURI');

const connectDB = async () => {
    try {
        const connection = await mongoose.connect(db, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });

        mongoose.set('useFindAndModify', false);

        return connection;

    } catch (err) {
        throw new Error(err);
    }
};

module.exports = connectDB;