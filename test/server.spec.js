// Imports the server.js file to be tested.
const server = require("../src/server");
// Assertion (Test Driven Development) and Should,  Expect(Behaviour driven 
// development) library
const chai = require("chai");
// Chai HTTP provides an interface for live integration testing of the API's.
const chaiHttp = require("chai-http");
chai.should();
chai.use(chaiHttp);
const { assert, expect } = chai;

describe("Server!", () => {
    // Sample test case given to test / endpoint.
    it("Opens the main page when you open the website", (done) => {
      chai
        .request(server)
        .get("/")
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });

    it("Opens the searches page when it is clicked on", (done) => {
      chai
        .request(server)
        .get("/searches")
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });

});