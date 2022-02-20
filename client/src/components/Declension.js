import React from 'react'
const Declension = ({ val }) => {
	const words = ['товар', 'товара', 'товаров']
	function num_word(val, words) {
		val = Math.abs(val) % 100
		var num = val % 10
		if (val > 10 && val < 20) return words[2]
		if (num > 1 && num < 5) return words[1]
		if (num === 1) return words[0]
		return words[2]
	}
	return (
		<>
			У вас {val} {num_word(val, words)}
		</>
	)
}

export default Declension
