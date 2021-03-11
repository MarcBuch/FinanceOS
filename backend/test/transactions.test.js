/* eslint-disable no-undef */
/* eslint-disable func-names */

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');

const should = chai.should();

chai.use(chaiHttp);

/**
 * Test the transaction service
 */
describe('Transaction service', function () {
  describe('Check GET methods #cold-test', function () {
    it('Scenario - No query provided. Excpectation - Return an error message.', function () {
      chai
        .request(server)
        .get('/api/transactions')
        .end((err, res) => {
          res.should.have.status(400);
          res.body.errors.should.be.a('array');
          res.body.errors[0].msg.should.equal('You must provide a query');
        });
    });
  });
  describe('Check get methods #api', function () {
    it('Scenario - Transactions for the year 2020 dont exist. Excpectation - Return an error message', function () {
      chai
        .request(server)
        .get('/api/transactions')
        .query({ year: 2020 })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.errors.should.be.a('array');
          res.body.errors[0].msg.should.equal('There are no transactions for this year and month');
        });
    });
  });
});
