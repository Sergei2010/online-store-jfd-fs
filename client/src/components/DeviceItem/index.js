import React from 'react'
import { useHistory } from 'react-router-dom'
import { Col, Card } from 'react-bootstrap'
import Image from 'react-bootstrap/Image'
import star from '../../assets/star.png'
import { DEVICE_ROUTE } from '../../utils/consts'
import './style.css'

const DeviceItem = ({ device }) => {
	const history = useHistory()
	return (
		<Col md={3} className='mt-5' onClick={() => history.push(DEVICE_ROUTE + '/' + device.id)}>
			<Card className='shadow p-3 mb-5 rounded device'>
				<div className='d-flex justify-content-center align-items-center p-1'>
					<Image width={150} height={150} src={process.env.REACT_APP_API_URL + device.img} />
				</div>
				<div className='mt-1 d-flex justify-content-around align-items-center p-1'>
					<div>
						<div>{device.name}</div>
						<div>{device.price} руб.</div>
					</div>
					<div className='d-flex align-itens-center'>
						<div>{device.rating}</div>
						<Image width={18} height={18} src={star} className='align-self-center' />
					</div>
				</div>
			</Card>
		</Col>
	)
}

export default DeviceItem
