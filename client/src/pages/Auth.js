import React, { useState, useContext } from 'react'
import { Container, Form, Card, Button } from 'react-bootstrap'
import { NavLink, useLocation, useHistory } from 'react-router-dom'
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from '../utils/consts'
import { login, registration } from '../http/userAPI'
import { fetchOneBasket } from '../http/basketAPI'
import { observer } from 'mobx-react-lite'
import { Context } from '../index'

const Auth = observer(() => {
	const { user } = useContext(Context)
	const location = useLocation()
	const history = useHistory()
	const isLogin = location.pathname === LOGIN_ROUTE
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	// по клику выполняется или Login или Registration
	const click = async () => {
		try {
			let data
			if (isLogin) {
				data = await login(email, password)
				// console.log('data--after--login: ', data)
			} else {
				data = await registration(email, password)
				// console.log('data--after--registration: ', data)
			}
			user.setUser(data) // почему "user"? ставлю "data"
			user.setIsAuth(true)
			// const userId = toJS(user.user.id)
			// console.log('userId: ', userId)

			const basket = await fetchOneBasket(data.id)
			user.setBasketId(basket[0])
			user.setDevices(basket[1])
			// console.log('basketId--after--login: ', basket[0])
			// console.log('devices--after--login: ', basket[1])

			history.push(SHOP_ROUTE)
		} catch (e) {
			alert(e.message)
		}
	}

	return (
		<Container
			className='d-flex justify-content-center align-items-center'
			style={{
				height: window.innerHeight - 54
			}}>
			<Card style={{ width: 600 }} className='p-5'>
				<h2 className='m-auto'>{isLogin ? 'Авторизация' : 'Регистрация'}</h2>
				<Form className='d-flex flex-column'>
					<Form.Control
						placeholder='Введите ваш email ...'
						className='mt-3'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<Form.Control
						placeholder='Введите пароль ...'
						className='mt-3'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						type='password'
					/>
					<div className='d-flex mt-3 justify-content-between'>
						{isLogin ? (
							<div className='col-8 d-flex align-items-center'>
								<span className='p-2'>Нет аккаунта?</span>
								<NavLink to={REGISTRATION_ROUTE}> Зарегистрируйся</NavLink>
							</div>
						) : (
							<div className='col-8 d-flex align-items-center'>
								<span className='p-2'>Есть аккаунт?</span>
								<NavLink to={LOGIN_ROUTE}>Войдите</NavLink>
							</div>
						)}
						<Button className='col-4' variant={'outline-success'} onClick={click}>
							{isLogin ? 'Войти' : 'Регистрация'}
						</Button>
					</div>
				</Form>
			</Card>
		</Container>
	)
})

export default Auth
