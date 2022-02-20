const { Schema, model } = require('mongoose')

const schema = new Schema(
	{
		userId: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true
		},
		deviceId: {
			type: Schema.Types.ObjectId,
			ref: 'Device',
			required: true
		}
	},
	{
		timestamps: true
	}
)

module.exports = model('Raiting', schema)
