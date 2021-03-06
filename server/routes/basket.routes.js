const express = require('express')
const Basket = require('../models/Basket')
const router = express.Router({ mergeParams: true })

// получить список корзин
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

// создаю Basket

// удаляю device из Basket

// ищу Basket по ключу id

module.exports = router
