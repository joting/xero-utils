// bunch of utility functions for manipulating lineitems

function add(item, amount) {
    item.LineAmount = (Number(item.LineAmount) + amount).toFixed(2);
}

function minus(item, amount) {
    item.LineAmount = (Number(item.LineAmount) - amount).toFixed(2);
}

module.exports.transfer = function transfer(item_db,item_cr,amount) {
    minus(item_cr, amount);
    add(item_db, amount);
}

