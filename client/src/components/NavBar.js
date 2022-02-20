import React, { useContext, useState, useEffect } from 'react'
import { Context } from '../index'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { NavLink } from 'react-router-dom'
import { ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE, BASKET_ROUTE } from '../utils/consts'
import { Button, FormControl, Image } from 'react-bootstrap'
import { observer } from 'mobx-react-lite'
import Container from 'react-bootstrap/Container'
import { useHistory } from 'react-router-dom'
import cart_white from '../assets/cart_white.png'
import cart_black from '../assets/cart_black.png'
import caret_up from '../assets/caret_up.png'
import caret_down from '../assets/caret_down.png'
import { toJS } from 'mobx'
import Declension from './Declension'
import { fetchDevices } from '../http/deviceAPI'

const NavBar = observer(() => {
	const { user } = useContext(Context)
	const { device } = useContext(Context)
	const [value, setValue] = useState('')
	const [count, setCount] = useState(null)

	useEffect(() => {
		const deviceCount = toJS(user.devices).filter(function (id) {
			return id !== null // исключаю нулевые значения id
		}).length
		setCount(deviceCount)
	}, [user.devices])

	const [cartSrc, setCartSrc] = useState(cart_white)

	const history = useHistory()
	const logOut = () => {
		user.setUser({})
		user.setIsAuth(false)
		user.setDevices([])
	}
	const handleSearch = (e) => {
		device.setSearchValue(value)
		history.push(SHOP_ROUTE)
		setValue('')
	}
	const handleBasket = () => {
		toJS(user.isAuth) ? history.push(BASKET_ROUTE) : history.push(SHOP_ROUTE)
	}
	// меняю значение сортировки в Store
	const onSort = () => {
		device.sort === 'DESC' ? device.setSort('ASC') : device.setSort('DESC')
	}

	return (
		<Navbar bg='dark' variant='dark' className='d-flex justify-content-around'>
			<Container>
				<NavLink
					style={{ color: 'white', role: 'button' }}
					to={SHOP_ROUTE}
					className='d-flex justify-content-center p-2 col-2'
					onClick={() => {
						setValue('')
						fetchDevices(null, null, 1, device.limit).then((data) => {
							device.setDevices(data.rows)
							device.setTotalCount(data.count) // сколько товаров получили, поле "count" от сервера
						})
						device.setSelectedType({}) // обнуляю фильтр
						device.setSelectedBrand({}) // - " -
					}}>
					Купидевайс
					<span onClick={() => onSort()} style={{ textDecoration: 'no', textIndent: '30px' }}>
						<Image
							src={device.sort === 'DESC' ? caret_down : caret_up}
							width={26}
							height={26}
							className='align-self-center'
						/>
					</span>
				</NavLink>
				<Nav style={{ color: 'white' }} className='p-2 col-4'>
					<FormControl
						className='border border-light me-2'
						style={{ background: 'black', color: 'white' }}
						placeholder='Введите наименование товара'
						value={value}
						onChange={(e) => {
							setValue(e.target.value)
						}}
					/>
					<Button variant={'outline-light'} className='me-2' onClick={() => handleSearch()}>
						Найти
					</Button>
				</Nav>
				<Nav style={{ color: 'white' }} className='d-flex justify-content-center p-2 col-3'>
					<Button
						variant={'outline-light'}
						onClick={() => handleBasket()}
						onMouseOver={() => setCartSrc(cart_black)}
						onMouseOut={() => setCartSrc(cart_white)}>
						<div className='d-flex align-itens-center justify-content-between'>
							<Image src={cartSrc} width={20} height={20} className='align-self-center me-2' />
							<div>{!count ? 'Корзина пуста' : <Declension val={count} />}</div>
						</div>
					</Button>
				</Nav>
				{user.isAuth ? (
					<Nav style={{ color: 'white' }} className='d-flex justify-content-center p-2 col-3'>
						<Button
							variant={'outline-light'}
							className='me-2'
							onClick={() => history.push(ADMIN_ROUTE)}>
							Админ панель
						</Button>
						<Button variant={'outline-light'} className='me-2' onClick={() => logOut()}>
							Выйти
						</Button>
					</Nav>
				) : (
					<Nav style={{ color: 'white' }} className='d-flex justify-content-center p-2 col-3'>
						<Button
							variant={'outline-light'}
							className='me-2'
							onClick={() => history.push(LOGIN_ROUTE)}>
							Авторизация
						</Button>
					</Nav>
				)}
			</Container>
		</Navbar>
	)
})

export default NavBar
