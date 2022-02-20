import React, { useState } from 'react'
import { Container, Button } from 'react-bootstrap'
import CreateBrand from '../components/modals/createBrand'
import CreateDevice from '../components/modals/createDevice'
import CreateType from '../components/modals/createType'

const Admin = () => {
	const [brandVisible, setBrandVisible] = useState(false)
	const [typeVisible, setTypeVisible] = useState(false)
	const [deviceVisible, setDeviceVisible] = useState(false)
	return (
		<Container className='d-flex flex-column w-50'>
			<Button variant={'outline-dark'} className='mt-4 p-2' onClick={() => setTypeVisible(true)}>
				Добавить тип
			</Button>
			<Button variant={'outline-dark'} className='mt-4 p-2' onClick={() => setBrandVisible(true)}>
				Добавить брэнд
			</Button>
			<Button variant={'outline-dark'} className='mt-4 p-2' onClick={() => setDeviceVisible(true)}>
				Добавить устройство
			</Button>
			<CreateBrand show={brandVisible} onHide={() => setBrandVisible(false)} />
			<CreateDevice show={deviceVisible} onHide={() => setDeviceVisible(false)} />
			<CreateType show={typeVisible} onHide={() => setTypeVisible(false)} />
		</Container>
	)
}

export default Admin
