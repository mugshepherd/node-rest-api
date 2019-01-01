module.exports = function(app) {
    var customers = require('../controllers/customer.controller.js');

    // CREATE NEW CUSTOMER
    app.post('/api/customers', customers.create);

    // RETRIEVE ALL CUSTOMERS
    app.get('/api/customers', customers.findAll);

    // RETRIEVE A SINGLE CUSTOMER BY ID
    app.get('/api/customers/:id', customers.findOne);

    // UPDATE A CUSTOMER WITH ID
    app.put('/api/customers/:id', customers.update);

    // DELETE A CUSTOMER WITH ID
    app.delete('/api/customers/:id', customers.delete);

}