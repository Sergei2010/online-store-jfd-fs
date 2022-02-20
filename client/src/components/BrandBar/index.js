import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { Context } from '../../index'
import { Card } from 'react-bootstrap'
import './style.css'

const BrandBar = observer(() => {
	const { device } = useContext(Context)
	return (
		<div className='brand'>
			<div className='d-flex flex-wrap justify-content-between mt-2 shadow-sm p-2'>
				{device.brands.map((brand) => (
					<Card
						className='p-1 brand'
						key={brand.id}
						onClick={() => device.setSelectedBrand(brand)}
						border={brand.id === device.selectedBrand.id ? 'danger' : 'light'}>
						{brand.name}
					</Card>
				))}
			</div>
		</div>
	)
})

export default BrandBar
