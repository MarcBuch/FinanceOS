const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');
const UserCredentialsModel = require('../database/models/UserCredentials');
const UserModel = require('../database/models/User');

const pathToKey = path.join(__dirname, '../config/id_rsa_priv.pem');
const PRIV_KEY = fs.readFileSync(pathToKey, 'utf8');

module.exports.issueJWT = (user) => {
    // Issues a new JWT token
    const _id = user._id;
    const expiresIn = '1d';
    const payload = {
        sub: _id,
        iat: Date.now()
    };

    const signedToken = jsonwebtoken.sign(payload, PRIV_KEY, { expiresIn: expiresIn, algorithm: 'RS256' });

    return {
        token: 'Bearer ' + signedToken,
        expires: expiresIn
    };
};

module.exports.registerUser = async ({ username, password, password2, firstName, lastName, email }) => {
    // Check if password match
    if (password !== password2) {
        return ({ success: false, error: { msg: 'Password is invalid' } });
    }

    // Check if username already exists
    const dbUserCredentialsByUsername = await UserCredentialsModel.findOne({ username });
    const dbUserByEmail = await UserModel.findOne({ email });

    if (dbUserCredentialsByUsername || dbUserByEmail) {
        return ({ success: false, error: { msg: 'Username is already registered' } });
    } else {

        // Create a new user
        const newUser = new UserModel({
            firstName,
            lastName,
            email
        });

        const newUserCredentials = new UserCredentialsModel({
            username,
            password,
            user_id: newUser._id
        });

        // Set a reference to the user credentials
        newUser['userCredentials_id'] = newUserCredentials._id;
        await newUser.save();

        // Hash the password
        bcrypt.genSalt(10, async (err, salt) => {
            if (err) throw new Error(err);
            else {
                bcrypt.hash(newUserCredentials.password, salt, async (err, hash) => {
                    if (err) throw new Error(err);

                    newUserCredentials.password = hash;

                    await newUserCredentials.save();
                });
            }
        });

        return ({ success: true });
    }
}