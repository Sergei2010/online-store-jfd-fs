const express = require('express')
const Basket = require('../models/Basket')
const router = express.Router({ mergeParams: true })

router.get('/', async (req, res) => {
	try {
		const list = await Basket.find()
		res.status(200).send(list)
	} catch (e) {
		res.status(500).json({
			message: 'На сервере произошла ошибка. Попробуйте позже'
		})
	}
})

module.exports = router
