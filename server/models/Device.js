const { Schema, model } = require('mongoose')

const schema = new Schema(
	{
		name: {
			type: String,
			required: true
		},
		price: {
			type: Number,
			required: true
		},
		rating: {
			type: Number,
			required: true
		},
		image: {
			type: String,
			required: false
		},
		typeId: {
			type: Schema.Types.ObjectId,
			ref: 'Type'
		},
		brandId: {
			type: Schema.Types.ObjectId,
			ref: 'Brand'
		}
	},
	{
		timestamps: true
	}
)

module.exports = model('Device', schema)
