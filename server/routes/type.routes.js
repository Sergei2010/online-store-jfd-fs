const express = require('express')
const Type = require('../models/Type')
const router = express.Router({ mergeParams: true })

// получение списка Type
router.get('/', async (req, res) => {
	try {
		const list = await Type.find()
		res.status(200).send(list)
	} catch (e) {
		res.status(500).json({
			message: 'На сервере произошла ошибка. Попробуйте позже'
		})
	}
})

// добавление нового типа в список

module.exports = router
