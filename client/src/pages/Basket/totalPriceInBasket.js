import React, { useState, useEffect } from 'react'
import { Button, Card, Col, Row } from 'react-bootstrap'

const TotalPriceInBasket = (devices) => {
	const [totalPrice, setTotalPrice] = useState(0)
	useEffect(() => {
		const arr = Object.values(devices)[0]
		if (arr.length !== 0) {
			let price = 0
			price = arr.map((i) => (price += i.totalPrice)).reverse()[0]
			setTotalPrice(price)
		}
	}, [devices])
	return (
		<Row>
			<Col className='col col-6'></Col>
			<Col className='col col-6'>
				<Card className='card mt-2 d-flex shadow-sm p-2 basket-card'>
					<h3>Цена товара(-ов)</h3>
					<h3>Итого: {totalPrice} рублей</h3>
					<Button className='btn btn-primary'>Оформить заказ</Button>
				</Card>
			</Col>
		</Row>
	)
}

export default TotalPriceInBasket
