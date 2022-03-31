import React from "react";
import PropTypes from "prop-types";

const Declension = ({ val }) => {
	const words = ["товар", "товара", "товаров"];
	function numWord(val, words) {
		val = Math.abs(val) % 100;
		const num = val % 10;
		if (val > 10 && val < 20) return words[2];
		if (num > 1 && num < 5) return words[1];
		if (num === 1) return words[0];
		return words[2];
	}
	return (
		<>
			У вас { val } { numWord(val, words) }
		</>
	);
};

Declension.propTypes = {
	val: PropTypes.number
};

export default Declension;
