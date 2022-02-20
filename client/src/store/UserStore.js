import { makeAutoObservable } from 'mobx'

export default class UserStore {
	constructor() {
		this._isAuth = false
		this._user = {}
		this._basketId = null
		this._devices = []
		makeAutoObservable(this)
	}
	setIsAuth(bool) {
		this._isAuth = bool
	}
	setUser(user) {
		this._user = user
	}

	setBasketId(basketId) {
		this._basketId = basketId
	}

	setDevices(devices) {
		this._devices = devices
	}

	get isAuth() {
		return this._isAuth
	}

	get user() {
		return this._user
	}

	get basketId() {
		return this._basketId
	}

	get devices() {
		return this._devices
	}
}
