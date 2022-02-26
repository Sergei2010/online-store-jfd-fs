const express = require('express')
const Brand = require('../models/Brand')
const router = express.Router({ mergeParams: true })

// получить список Brand
router.get('/', async (req, res) => {
	try {
		const list = await Brand.find()
		res.status(200).send(list)
	} catch (e) {
		res.status(500).json({
			message: 'На сервере произошла ошибка. Попробуйте позже'
		})
	}
})

// добавить новый брэнд в список

module.exports = router
