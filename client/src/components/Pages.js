import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { Context } from '../index'
import { Pagination } from 'react-bootstrap'
import './DeviceItem/style.css'

const Pages = observer(() => {
	const { device } = useContext(Context)
	const pageCount = Math.ceil(device.totalCount / device.limit) // общее количество
	const pages = []
	for (let i = 0; i < pageCount; i++) {
		pages.push(i + 1) // определяем номер страницы
	}
	return (
		<Pagination className='mt-2'>
			{pages.map((page) => (
				<Pagination.Item
					className='shadow-sm rounded me-1 bg-transporent device'
					key={page}
					active={device.page === page}
					onClick={() => device.setPage(page)}>
					{page}
				</Pagination.Item>
			))}
		</Pagination>
	)
})

export default Pages
