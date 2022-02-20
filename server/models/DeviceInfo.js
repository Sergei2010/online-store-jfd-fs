const { Schema, model } = require('mongoose')

const schema = new Schema(
	{
		deviceId: {
			type: Schema.Types.ObjectId,
			ref: 'Device',
			required: true
		},
		title: {
			type: String,
			required: true
		},
		description: {
			type: String,
			required: true
		}
	},
	{
		timestamps: true
	}
)

module.exports = model('DeviceInfo', schema)
