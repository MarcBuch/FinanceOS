# Authentication Service for FinanceOS

This is a simple authentication and authorization service based on nodejs.

## Authentication Strategy
- Login via username/password.
- Returns a signed bearer token.
- RSA keys are not included and must be generated via generateKeypair.js!

## HTTP Routes
- /api/auth/verify, checks if a bearer token is still valid.
- /api/auth/login, returns a bearer token based on a valid username/password combination.
- /api/auth/register, registers a new user.

## Stack
- Node.js
- JWT
- Mongodb