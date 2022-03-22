const { Schema, model } = require('mongoose')

const schema = new Schema(
	{
		name: String,
		email: { type: String, required: true, unique: true },
		password: String,
		image: String,
		role: String
	},
	{
		timestamps: { createdAt: 'created_at' }
	}
)

module.exports = model('User', schema)
