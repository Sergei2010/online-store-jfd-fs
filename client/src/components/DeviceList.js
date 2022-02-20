import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { Context } from '../index'
import { Row } from 'react-bootstrap'
import DeviceItem from './DeviceItem'
// import { toJS } from 'mobx'
// import _ from 'lodash'

const DeviceList = observer(() => {
	const { device } = useContext(Context)

	// console.log('device.devices: ', toJS(device.devices))
	// console.log('device.sort: ', toJS(device.sort))

	// const sortDevices = _.orderBy(device.devices, ['price'], ['desc']) // 'asc'
	return (
		<Row className='d-flex'>
			{device.devices.map((device) => (
				<DeviceItem key={device.id} device={device} />
			))}
		</Row>
	)
})

export default DeviceList
