const router = require('express').Router();

const Bid = require('../models/Bid');

router.get('/',async (req,res) => {
    try {
        const bids = await Bid.find();
        return res.status(200).json(bids);
    } catch (error) {
        return res.status(400).json(error);
    }
});

router.get('/:productId',async(req,res) => {
    try {
        const bids = await Bid.find({
            productId: req.params.productId,
        })
        return res.status(200).json(bids);
    } catch (error) {
        return res.status(400).json(error);
    }
});

router.get('/user/:id',async(req,res) => {
    try {
        const bids = await Bid.find({
            userId: req.params.id,
        })
        return res.status(200).json(bids);
    } catch (error) {
        return res.status(400).json(error);
    }
});

router.post('/',async(req,res) => {
    try {
        const userId = req.user.id;
        const data = req.body.data;
        const newBid = new Bid({
            userId: userId,
            productId: data.productId,
            offer: data.offer,
        })
        await newBid.save();
        return res.status(200).json(newBid);
    } catch (error) {
        return res.status(400).json(error);
    }
});

module.exports = router;