var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var app = express();

mongoose.connect('mongodb://localhost/barcode-app');

var BarcodeSchema = new mongoose.Schema({
    barcodeId: String,
    barcodes: [String]
});

var Barcode = mongoose.model('Barcode', BarcodeSchema);

app.use(bodyParser.json());

app.route('/barcode').post((req, res) => {
    var barcode = new Barcode(req.body);
    console.log(req.body);
    barcode.save((err, barcode) => {
        if (err) {
            res.status(500).send('Something went wrong!');
            console.error(err);
        } else {
            res.jsonp(barcode);
        }
    });
});

app.route('/barcode/:barcodeId').get((req, res) => {
    var barcodeId = req.params.barcodeId;
    Barcode.findOne({barcodeId: barcodeId})
        .exec((err, barcode) => {
            if (err) {
                res.status(500).send('Something went wrong!');
                console.error(err);
            } else if (barcode) {
                res.jsonp(barcode);
            } else {
                res.status(404).send('The requested post does not exist.');
            }
        });
});

app.listen(4000);
