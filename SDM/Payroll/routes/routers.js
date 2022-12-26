var mongoose = require("mongoose");
var schema = mongoose.Schema;
var express = require("express");
var router = express.Router();

var empschema = new schema({
    empid: String,
    ename: { type: String, trim: true, require: true },
    desg: String,
    joinDate: String,
    basicSalary: String,
    status:String
})

var Emp = mongoose.model("employees", empschema, "employees");

router.get("/", function (req, resp) {
    Emp.find().exec(function (err, data) {
        if (err) {
            console.log(err)
            resp.status(500).send("no data found");
        } else {
            console.log(data);
            resp.send(data);
        }
    });
});

router.get("/employees/:empid", function (req, resp) {
    Emp.find({ empid: req.params.empid }).exec(function (err, data) {
        if (err) {
            console.log(err)
            resp.status(500).send("no data found");
        } else {
            console.warn(data);
            resp.send(data);
        }
    });
});

module.exports = router;
