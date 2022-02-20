const { Schema, model } = require('mongoose')

const schema = new Schema(
	{
		deviceId: {
			type: Schema.Types.ObjectId,
			ref: 'Device',
			required: true
		},
		basketId: {
			type: Schema.Types.ObjectId,
			ref: 'Basket',
			required: true
		}
	},
	{
		timestamps: true
	}
)

module.exports = model('BasketDevice', schema)
