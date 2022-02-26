const express = require('express')
const Device = require('../models/Device')
const router = express.Router({ mergeParams: true })

// получить список Device
router.get('/', async (req, res) => {
	try {
		const list = await Device.find()
		res.status(200).send(list)
	} catch (e) {
		res.status(500).json({
			message: 'На сервере произошла ошибка. Попробуйте позже'
		})
	}
})

// добавить девайс в список

// удалить девайс из списка

// получить один девайс по  deviceId

module.exports = router
