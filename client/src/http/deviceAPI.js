import { $authHost, $host } from './index'

// types
export const createType = async (type) => {
	const { data } = await $authHost.post('api/type', type)
	return data
}

export const fetchTypes = async () => {
	const { data } = await $host.get('api/type')
	return data
}

// brands
export const createBrand = async (brand) => {
	const { data } = await $authHost.post('api/brand', brand)
	return data
}

export const fetchBrands = async () => {
	const { data } = await $host.get('api/brand')
	return data
}

// devices
export const createDevice = async (device) => {
	const { data } = await $authHost.post('api/device', device)
	return data
}

export const fetchDevices = async (typeId, brandId, page, limit, sort) => {
	// limit=5
	const { data } = await $host.get('api/device', { params: { typeId, brandId, page, limit, sort } })
	return data
}
// one device
export const fetchOneDevice = async (id) => {
	const { data } = await $host.get('api/device/' + id)
	return data
}
