const Customer = require('../models/customer.model.js');
 
 
// POST a Customer
exports.create = (req, res) => {
    // Create a Customer
    const customer = new Customer({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        age: req.body.age
    });
 
    // Save a Customer in the MongoDB
    customer.save()
    .then(data => {
        res.json(data);
    }).catch(err => {
        res.status(500).send({
            msg: err.message
        });
    });
};
 
 
// FETCH all Customers
exports.findAll = (req, res) => {
    Customer.find()
    .then(customers => {
        res.send(customers);
    }).catch(err => {
        res.status(500).send({
            msg: err.message
        });
    });
};
 
 
// FIND a Customer
exports.findOne = (req, res) => {
    // console.log(req.params);
    Customer.findById(req.params.customerid)
    .then(customer => {
        if(!customer) {
            return res.status(404).json({
                msg: "Customer not found with id " + req.params.customerid
            });            
        }
        res.send(customer);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                msg: "Customer not found with id " + req.params.customerid
            });                
        }
        return res.status(500).send({
            msg: "Error retrieving Customer with id " + req.params.customerid
        });
    });
};
 
// UPDATE a Customer
exports.update = (req, res) => {
    // Find customer and update it
    Customer.findByIdAndUpdate(req.params.customerid, {
        firstname: req.body.firstname,
		lastname: req.body.lastname,
		age: req.body.age
    }, {new: true})
    .then(customer => {
        if(!customer) {
            return res.status(404).send({
                message: "Customer not found with id " + req.params.customerid
            });
        }
        res.send(customer);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Customer not found with id " + req.params.customerid
            });                
        }
        return res.status(500).send({
            message: "Error updating customer with id " + req.params.customerid
        });
    });
};
 
 
// DELETE a Customer
exports.delete = (req, res) => {
    Customer.findByIdAndRemove(req.params.customerid)
    .then(customer => {
        if(!customer) {
            return res.status(404).json({
                msg: "Customer not found with id " + req.params.customerid
            });
        }
        res.send({msg: "Customer deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).json({
                msg: "Customer not found with id " + req.params.customerid
            });                
        }
        return res.status(500).json({
            msg: "Could not delete customer with id " + req.params.customerid
        });
    });
};