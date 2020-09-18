const express = require('express');
const router = express.Router();

const productModel = require('../models/product_model');

router.get('/index', (req, res)=>{
    var link = req.originalUrl;
    var tachchuoi = link.split('/');

    var main = 'products/main';

    // thông tin bảng sản phẩm
    productModel.
    find().
    exec(function(err, data){
        if(err) throw err;

        res.render('index', { main : main, link : tachchuoi[1], data:data, url:'' } );
    });
});

router.get('/add', (req, res)=>{
    var link = req.originalUrl;
    var tachchuoi = link.split('/');

    var main = 'products/add';
    res.render('index', { main : main, link : tachchuoi[1], url:'add' } );
});

router.post('/process_add', (req, res)=>{

    var arr = {
        'name' : req.body.name,
        'content' : req.body.content
    }

    productModel.create(arr, function(err, data){
        if(err) res.json({kq: 0, errMsg: "Dữ liệu đã bị trùng"});

        res.json({kq: 1});
    });

});

router.get('/edit/:id', (req, res)=>{
    var link = req.originalUrl;
    var tachchuoi = link.split('/');

    var main = 'products/edit';

    productModel.
    findById(req.params.id).
    exec(function(err, data){
        if(err) throw err;

        res.render('index', { main : main, link : tachchuoi[1], data:data, url:'edit/'+req.params.id} );
    });
});

router.post('/process_edit/:id', (req, res)=>{

    var arr = {
        'name' : req.body.name,
        'content' : req.body.content
    };

    productModel.updateMany({_id: req.params.id}, arr, function(err, data){
        if(err) res.json({kq: 0, errMsg: "Dữ liệu đã bị trùng"});

        res.json({kq: 2});
    });

});

router.post('/delete', (req, res)=>{

    productModel.findByIdAndDelete(req.body.id, function(err, data){
        if(err) res.json({kq: 0});

        res.json({kq: 1});
    })

});

module.exports = router;