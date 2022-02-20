import React, { useEffect, useState, useContext } from 'react'
import { Button, Card, Col, Container, Image, Row } from 'react-bootstrap'
import bigStar from '../assets/bigStar.png'
import { useParams, useHistory } from 'react-router-dom'
import { fetchOneDevice, fetchDevices } from '../http/deviceAPI'
import { addDeviceToBasket } from '../http/basketAPI'
import { observer } from 'mobx-react-lite'
import { Context } from '../index'
import { SHOP_ROUTE } from '../utils/consts'
import { toJS } from 'mobx'

const DevicePage = observer(() => {
	const { user } = useContext(Context)
	const { device } = useContext(Context)
	if (!user) {
		console.error('Нет данных пользователя ...')
	}
	const [deviceData, setDeviceData] = useState({ info: [] })
	const history = useHistory()
	const { id } = useParams()
	const userId = toJS(user.user.id) // id пользователя
	const basketId = toJS(user.basketId) // id корзины
	let basketDevices = toJS(user.devices) // что есть уже в корзине
	// console.log('basketId: ', basketId, 'userId: ', userId, 'basketDevises: ', basketDevices)
	useEffect(() => {
		fetchOneDevice(id).then((data) => {
			return setDeviceData(data) // ищу по id Device и обновляю state
		})
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])
	const addToBasket = async () => {
		try {
			const formData = new FormData()
			formData.append('userId', userId)
			formData.append('basketId', basketId)
			formData.append('deviceId', id)
			await addDeviceToBasket(formData) // отправляю device на сервер
			// console.log('deviceToBasket--after--addToBasket: ', deviceToBasket)
			basketDevices.push(Number(id))
			user.setDevices(basketDevices)
			// console.log('basketDevices--after--addToBasket: ', toJS(user.devices))
			fetchDevices(null, null, 1, device.limit).then((data) => {
				device.setDevices(data.rows)
				device.setTotalCount(data.count) // сколько товаров получили, поле "count" от сервера
			})
			history.push(SHOP_ROUTE)
		} catch (e) {
			alert(e.message)
		}
	}

	return (
		<Container className='mt-4'>
			<Row>
				<Col md={4}>
					{deviceData.img && (
						<Image width={300} height={300} src={process.env.REACT_APP_API_URL + deviceData.img} />
					)}
				</Col>
				<Col md={4}>
					<div className='d-flex flex-column align-items-center'>
						<h2>{deviceData.name}</h2>
						<div
							className='d-flex align-items-center justify-content-center'
							style={{
								background: `url(${bigStar}) no-repeat center center`,
								width: 240,
								height: 240,
								backgroundSize: 'cover',
								fontSize: 64
							}}>
							{deviceData.rating}
						</div>
					</div>
				</Col>
				<Col md={4}>
					<Card
						className='d-flex flex-column align-items-center justify-content-around'
						style={{ width: 300, height: 300, fontSize: 52, border: '5px solid lightgrey' }}>
						<h3>От: {deviceData.price} руб.</h3>
						<Button variant={'outline-dark'} onClick={() => addToBasket()}>
							Добавить в корзину
						</Button>
					</Card>
				</Col>
			</Row>
			<Row className='d-flex flex-column m-3'>
				<h1>Характеристики</h1>
				{deviceData.info.map((info, index) => (
					<Row
						key={info.id}
						style={{ background: index % 2 === 0 ? 'lightgrey' : 'transparent', padding: 10 }}>
						{info.title}: {info.description}
					</Row>
				))}
			</Row>
		</Container>
	)
})

export default DevicePage
