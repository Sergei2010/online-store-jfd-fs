const express = require('express')
const User = require('../models/User')
const auth = require('../middleware/auth.middleware')
const router = express.Router({ mergeParams: true })

// поличить обновлённого пользователя
router.patch('/:userId', auth, async (req, res) => {
	try {
		const { userId } = req.params
		// userId === current user id ?
		// флаг 'new' для получения с сервера уже обновлённых данных
		if (userId === req.user._id) {
			const updatedUser = await User.findByIdAndUpdate(userId, req.body, { new: true })
			res.send(updatedUser)
		} else {
			res.status(401).json({ message: 'Unauthorized' })
		}
	} catch (e) {
		res.status(500).json({
			message: 'На сервере произошла ошибка. Попробуйте позже!!'
		})
	}
})

// получить весь список
router.get('/', auth, async (req, res) => {
	try {
		const list = await User.find()
		// если статус 200, то можно не указывать
		res.status(200).send(list)
	} catch (e) {
		res.status(500).json({
			message: 'На сервере произошла ошибка. Попробуйте позже!!'
		})
	}
})

module.exports = router
