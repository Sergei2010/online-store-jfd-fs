import React, { useContext, useEffect } from 'react'
import { Container } from 'react-bootstrap'
import { Row, Col } from 'react-bootstrap'
import TypeBar from '../../components/TypeBar'
import BrandBar from '../../components/BrandBar'
import DeviceList from '../../components/DeviceList'
import { observer } from 'mobx-react-lite'
import { Context } from '../../index'
import { fetchBrands, fetchDevices, fetchTypes } from '../../http/deviceAPI'
import Pages from '../../components/Pages'
import { toJS } from 'mobx'
import './style.css'

const Shop = observer(() => {
	const { user } = useContext(Context)
	let userName = toJS(user.user.email) // приветствие посетителя
	if (!userName) {
		userName = 'посетитель ...'
	} else {
		const index = userName.indexOf('@', 0)
		userName = userName.slice(0, index)
	}

	const { device } = useContext(Context)

	useEffect(() => {
		fetchTypes().then((data) => device.setTypes(data))
		fetchBrands().then((data) => device.setBrands(data))
		fetchDevices(null, null, 1, device.limit, device.sort).then((data) => {
			// console.log('data--after--fetch: ', toJS(data))
			device.setDevices(data.rows)
			device.setTotalCount(data.count) // сколько товаров получили, поле "count" от сервера
		})
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	useEffect(() => {
		if (!device.searchValue) {
			fetchDevices(
				device.selectedType.id,
				device.selectedBrand.id,
				device.page,
				device.limit,
				device.sort
			).then((data) => {
				device.setDevices(data.rows)
				device.setTotalCount(data.count)
			})
		} else {
			// поиск по названию товара
			fetchDevices(null, null, 1, device.totalCount, device.sort)
				.then((data) => {
					return (data = Object.values(data.rows))
				})
				.then((data) => {
					data = data.filter((i) => {
						return i.name.includes(device.searchValue)
					})
					return data
				})
				.then((data) => {
					// console.log('data: ', data)
					device.setDevices(data)
					device.setTotalCount(data.length)
				})
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [device.page, device.selectedType, device.selectedBrand, device.searchValue, device.sort])
	return (
		<Container>
			<div className='mt-4 mb-4'>
				<h2 className='title'>Привет, {userName}</h2>
			</div>
			<Row className='mt-2'>
				<Col md={3}>
					<TypeBar />
				</Col>
				<Col md={9}>
					<BrandBar />
					<DeviceList />
					<Pages />
				</Col>
			</Row>
		</Container>
	)
})

export default Shop
