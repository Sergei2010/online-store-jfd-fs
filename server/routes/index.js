const express = require('express')
const router = express.Router({ mergeParams: true })

router.use('/auth', require('./auth.routes'))
router.use('/user', require('./user.routes'))
router.use('/brand', require('./brand.routes'))
router.use('/type', require('./type.routes'))
router.use('/basket', require('./basket.routes'))
router.use('/device', require('./device.routes'))


module.exports = router
