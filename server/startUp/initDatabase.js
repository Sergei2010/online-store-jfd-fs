// 1. у любого пользователя будет как минимум в БД devices & brands & types
// 2. они равны mock данным

// подключаем модели
const Brand = require('../models/Brand')
const Type = require('../models/Type')
const Device = require('../models/Device')

const deviceMock = require('../mock/devices.json')
const typeMock = require('../mock/types.json')
const brandMock = require('../mock/brands.json')

module.exports = async () => {
	const types = await Type.find()
	if (types.length !== typeMock.length) {
		await createInitialEntity(Type, typeMock)
	}
	const brands = await Brand.find()
	if (brands.length !== brandMock.length) {
		await createInitialEntity(Brand, brandMock)
	}
	const devices = await Device.find()
	if (devices.length !== deviceMock.length) {
		await createInitialEntity(Device, deviceMock)
	}
}

async function createInitialEntity(Model, data) {
	await Model.collection.drop()
	return Promise.all(
		data.map(async (item) => {
			try {
				delete item._id
				const newItem = new Model(item)
				await newItem.save()
				return newItem
			} catch (e) {
				return e
			}
		})
	)
}
