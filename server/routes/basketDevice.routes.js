const express = require('express')
const BasketDevice = require('../models/BasketDevice')
const router = express.Router({ mergeParams: true })

// получить список BasketDevice
router.get('/', async (req, res) => {
	try {
		const list = await BasketDevice.find()
		res.status(200).send(list)
	} catch (e) {
		res.status(500).json({
			message: 'На сервере произошла ошибка. Попробуйте позже'
		})
	}
})

// создаю BasketDevice

// удаляю BasketDevice по id

// ищу BasketDevice по  id

module.exports = router