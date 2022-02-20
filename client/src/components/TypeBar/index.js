import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { Context } from '../../index'
import ListGroup from 'react-bootstrap/ListGroup'
import './style.css'

const TypeBar = observer(() => {
	const { device } = useContext(Context)
	return (
		<div className='type'>
			<ListGroup className='shadow-sm p-2 mt-2 rounded'>
				{device.types.map((type) => (
					<ListGroup.Item
						className='border-0 rounded'
						active={type.id === device.selectedType.id}
						key={type.id}
						onClick={() => device.setSelectedType(type)}>
						{type.name}
					</ListGroup.Item>
				))}
			</ListGroup>
		</div>
	)
})

export default TypeBar
