import express from "express";
import { productModel, userModel } from "../dbRepo/Models.mjs";
const router = express.Router();
router.post('/product', (req, res) => {

    const body = req.body;

    if ( // validation
        !body.name
        && !body.price
        && !body.description
    ) {
        res.status(400).send({
            message: "required parameters missing",
        });
        return;
    }
    productModel.create(
        {
            name: body.name,
            price: body.price,
            description: body.description,
        },
        (err, saved) => {
            if (!err) {
                console.log(saved);

                res.send({
                    message: "product added successfully",
                    // data: data,
                });
            } else {
                res.status(500).send({
                    message: "server error"
                })
            }
        })

})

router.get('/products', (req, res) => {
    productModel.find({}, (err, data) => {
        if (!err) {
            res.send({
                message: "got all products successfully",
                data: data
            })
        } else {
            res.status(500).send({
                message: "server error"
            })
        }
    });
})

// router.get('/product/:id', (req, res) => {

//     const id = req.params.id;

//     productModel.findOne({ _id: id }, (err, data) => {
//         if (!err) {

//             if (data) {
//                 res.send({
//                     message: `get product by id: ${data._id} success`,
//                     data: data
//                 });
//             } else {
//                 res.status(404).send({
//                     message: "product not found",
//                 })
//             }

//         } else {
//             res.status(500).send({
//                 message: "server error"
//             })
//         }
//     });

// })
//
router.get('/product/:name', (req, res) => {
    // console.log(req.params.name);
    const queryName = req.params.name;

    productModel.find({ name: { $regex: `${queryName}` } }
        , (err, data) => {
            if (!err) {
                if (data) {
                    res.send({
                        message: 'get product success',
                        data: data,
                    });
                } else {
                    res.status(404).send({
                        message: "product not found",
                    });
                }
            } else {
                res.status(500).send({
                    message: "server error",
                });
            }
        });
});

router.delete('/product/:id', (req, res) => {
    const id = req.params.id;

    productModel.deleteOne({ _id: id }, (err, deletedData) => {
        console.log("deleted: ", deletedData);
        if (!err) {

            if (deletedData.deletedCount !== 0) {
                res.send({
                    message: "Product has been deleted successfully",
                })
            } else {
                res.status(404);
                res.send({
                    message: "No Product found with this id: " + id,
                })
            }


        } else {
            res.status(500).send({
                message: "server error"
            })
        }
    });
})

router.put('/product/:id', async (req, res) => {

    const body = req.body;
    const id = req.params.id;

    if (
        !body.name ||
        !body.price ||
        !body.description
    ) {
        res.status(400).send(` required parameter missing. example request body:
        {
            "name": "value",
            "price": "value",
            "category": "value",
            "description": "value"
        }`)
        return;
    }
    try {
        let data = await productModel.findByIdAndUpdate(id,
            {
                name: body.name,
                price: body.price,
                description: body.description
            },
            { new: true }
        ).exec();
        console.log('updated: ', data);
        res.send({
            message: "product modified successfully",
            data: data
        });
    }
    catch (error) {
        console.log("error: ", error)
        res.status(500).send({
            message: "server error"
        })
    }
})

export default router