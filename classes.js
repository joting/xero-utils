class JournalEntry {

    constructor(date) {
        this.Date = date
        this.LineItems = [];
    }

    // Gets the total of the journal entry as a number.
    get line_total() {
        let total = 0;
        this.LineItems.forEach(line => {
            total += Number(line.LineAmount);
        })
        return total;
    }

    add_line(line) {
        this.LineItems.push(line);
    }
}

exports.ManualJournal = class extends JournalEntry {
    constructor(date, narration, cash_basis) {
        super(date);
        this.JournalLines = this.LineItems;
        this.Date = date;
        this.Narration = narration;
        this.LineAmountTypes = 'Inclusive';
        this.ShowOnCashBasisReports = cash_basis;
    }

    static get response_type() {
        return "ManualJournals";
    }
}

exports.BankTransaction = class extends JournalEntry {
    constructor(date, type, contact, bank_account, ref) {
        super(date);
        this.Type = type;
        this.Contact = contact;
        this.BankAccount = bank_account;
        this.Reference = ref;
    }

    static get response_type() {
        return "BankTransactions";
    }

    get line_total() {
        let abs_total = super.line_total;
        return this.Type === "SPEND"
            ? -abs_total
            : abs_total;
    }
}