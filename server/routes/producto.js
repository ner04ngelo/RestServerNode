const express = require('express');

const { verificaToken } = require('../middlewares/autenticacion');

let app = express();

let Producto = require('../models/producto');


//==============================
// Obtener todos los productos
//==============================

app.get('/productos', verificaToken, (req, res) => {




    let desde = req.query.desde || 0;
    desde = Number(desde);



    Producto.find({ disponible: true })
        .skip(desde)
        .limit(5)
        .populate('usuario categoria ', 'nombre email descripcion')
        .exec((err, productos) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                productos
            });
        });
});


//=================================
// Obtener un producto por ID
//=================================

app.get('/productos/:id', verificaToken, (req, res) => {
    let id = req.params.id;

    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limit || 5;
    limite = Number(limite);


    Producto.findById(id, { disponible: true })
        .skip(desde)
        .limit(limite)
        .populate('categoria usuario', 'descripcion nombre email')
        .exec((err, productoDB) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            if (!productoDB) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: 'El Id no existe'
                    }
                });
            }

            res.json({
                ok: true,
                producto: productoDB
            });
        });
});

//=================================
// Buscar productos
//=================================

app.get('/productos/buscar/:termino', verificaToken, (req, res) => {

    let termino = req.params.termino;

    let regex = new RegExp(termino, 'i'); ///Crea una expresion regular, para hacer la busqueda mas flexible

    Producto.find({ nombre: regex })
        .populate('categoria ', 'descripcion')
        .exec((err, productos) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                productos
            });
        });



});


//=================================
// Agregar un nuevo producto
//=================================

app.post('/productos', verificaToken, (req, res) => {


    let body = req.body;
    let producto = new Producto({
        nombre: body.nombre,
        precioUni: body.precio,
        descripcion: body.descripcion,
        categoria: body.categoria,
        usuario: req.usuario._id

    });

    producto.save((err, productoDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!productoDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'No se pudo guardar'
                }
            });
        }

        res.json({
            ok: true,
            producto: productoDB
        })

    });


});

//=================================
// Actualizar el producto
//=================================

app.put('/productos/:id', verificaToken, (req, res) => {

    let id = req.params.id;
    let body = req.body;


    Producto.findById(id, (err, productoDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!productoDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'No se pudo guardar'
                }
            });
        }


        productoDB.nombre = body.nombre;
        productoDB.precioUni = body.precio;
        productoDB.descripcion = body.descripcion;
        productoDB.categoria = body.categoria;
        productoDB.disponible = body.disponible;

        productoDB.save((err, productoGuardado) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                producto: productoGuardado
            })
        })



    })

});

//=================================
// Eliminar un producto
//=================================

app.delete('/productos/:id', verificaToken, (req, res) => {

    let id = req.params.id;



    Producto.findById(id, disponibilidad, { new: true }, (err, productoDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }


        if (!productoDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El id no existe'
                }
            });
        }

        productoDB.disponible = false;
        productoDB.save((err, productoBorrado) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                producto: productoBorrado,
                message: 'Producto borrado'
            });
        });


    });
});



module.exports = app;