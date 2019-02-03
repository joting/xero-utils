const assert = require('chai').assert;
const { ManualJournal, BankTransaction } = require('../classes.js')

function test_line_5(journal) {
    test_array = [{ LineAmount: "4.00" },
    { LineAmount: "-2.00" },
    { LineAmount: "3.00" }]
    test_array.forEach(line => {
        journal.add_line(line);
    })
}

describe('Journal', function() {
    let journal;

    beforeEach(function()  {
        journal = new ManualJournal();
    })

    describe('add_line()', function() {
        it('adds line to JournalLines attribute', function() {
            test_array = [{LineAmount: "4.00"}];
            test_array.forEach(line => {
                journal.add_line(line);
            })
            assert.equal(journal.JournalLines.length, 1);
        })
    })

    describe('total()', function() {
        it('totals all line items in object', function () {
            test_line_5(journal);
            assert.equal(journal.line_total, 5);
        })
    })  
})

describe('BankTransaction', function() {

    let bank_trans;

    beforeEach(function () {
        bank_trans = new BankTransaction("2018-12-1", "RECEIVE", "Pioneer", "111");
    })

    describe('total()', function () {
        it('totals are negative if bank transaction is a spend', function () {
            bank_trans.Type = "SPEND";
            test_line_5(bank_trans);
            assert.equal(bank_trans.line_total, -5);
        }),
        it('totals are positive if bank transaction is a receive', function() {
            test_line_5(bank_trans);
            assert.equal(bank_trans.line_total, 5);
        })
    })

})