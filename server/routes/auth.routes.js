const express = require('express')
const bcrypt = require('bcryptjs')
const { check, validationResult } = require('express-validator')
const User = require('../models/User')
const router = express.Router({ mergeParams: true })
const { generateUserData } = require('../utils/helpers')
const tokenService = require('../services/token.service')
const Token = require('../models/Token')

// /api/auth/signUp
// 1. get data from req (email, password, ...)
// 2. check if user already ixists
// 3. hash password
// 4. create user
// 5. generate tokens

router.post('/signUp', [
	// проверки валидации
	check('email', 'Некорректный email').isEmail(),
	check('password', 'Минимальная длина пароля 8 символов').isLength({ min: 8 }),
	async (req, res) => {
		try {
			const errors = validationResult(req)
			if (!errors.isEmpty()) {
				return res
					.status(400)
					.json({
						error: {
							message: 'INVALID_DATA', code: 400,
							errors: errors.array()
						}
					})
			}
			const { email, password } = req.body  // 1.

			const existingUser = await User.findOne({ email })  // 2.
			if (existingUser) {
				return res.status(400).json({
					error: {
						message: 'EMAIL_EXISTS',
						code: 400
					}
				})
			}

			// npm i bcrypt jsonwebtoken express-validator
			const hashedPassword = await bcrypt.hash(password, 12)  // 3.

			const newUser = await User.create({
				...generateUserData(),
				...req.body,
				password: hashedPassword
			})

			const tokens = tokenService.generate({ _id: newUser._id })
			await tokenService.save(newUser._id, tokens.refreshToken)

			res.status(201).send({ ...tokens, userId: newUser._id })
		} catch (e) {
			res.status(500).json({
				message: 'На сервере произошла ошибка. Попробуйте позже'
			})
		}
	}
])

// 1.validate
// 2. get data from req (email, password, ...)
// 3. find user
// 4. compare hashed password
// 5. generate token
// 6. return data
router.post('/signInWithPassword', [
	check('email', 'Email некорректный').normalizeEmail().isEmail(),
	check('password', 'Пароль не может быть пустым').exists(),
	async (req, res) => {
		try {
			const errors = validationResult(req)  // 1.
			if (!errors.isEmpty()) {
				return res.status(400).json({
					error: {
						message: 'INVALID_DATA',
						code: 400
					}
				})
			}

			const { email, password } = req.body  // 2.
			const existingUser = await User.findOne({ email })  // 3.
			if (!existingUser) {
				return res.status(400).send({ error: { message: 'EMAIL_NOT_FOUND', code: 400 } })
			}

			const isPasswordEqual = await bcrypt.compare(password, existingUser.password)  // 4.
			if (!isPasswordEqual) {
				return res.status(400).send({ error: { message: 'INVALID_PASSWORD', code: 400 } })
			}

			const tokens = tokenService.generate({ _id: existingUser._id })  // 5.
			await tokenService.save(existingUser._id, tokens.refreshToken)

			res.status(200).send({ ...tokens, userId: existingUser._id })  // 6.
		} catch (e) {
			res.status(500).json({
				message: 'На сервере произошла ошибка. Попробуйте позже!!'
			})
		}
	}
])

// 1. валидация refreshToken
// 2. обновить token и refreshToken
// 3. return data
function isTokenInvalid(data, dbToken) {
	return !dbToken || !dbToken || data._id !== dbToken?.user?.toString()
}
router.post('/token', async (req, res) => {
	try {
		const { refresh_token: refreshToken } = req.body
		const data = tokenService.validateRefresh(refreshToken)
		// получаю token из БД
		const dbToken = await tokenService.findToken(refreshToken)

		if (isTokenInvalid(data, dbToken)) {
			return res.status(401).json({ message: 'Unauthorized' })
		}
		// обновляем все токены
		const tokens = await tokenService.generate({
			_id: data._id
		})
		await tokenService.save(data._id, tokens.refreshToken)

		res.status(200).send({ ...tokens, userId: data._id })
	} catch (e) {
		res.status(500).json({
			message: 'На сервере произошла ошибка. Попробуйте позже'
		})
	}
})

module.exports = router
