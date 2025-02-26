const express = require('express')
const LocalityController = require('../controller/LocalityController')
const BusinessController = require('../controller/BuinessController')

const router = express.Router()

router.route('/business_details')
.get(BusinessController.getBusiness)
.post(BusinessController.CreateBusiness)
.put(BusinessController.UpdateBusiness)
.delete(BusinessController.deleteBusiness)

router.route('/locality')
.get(LocalityController.getAllLocality)
.post(LocalityController.createLocality)

router.route('/locality/:id')
.patch(LocalityController.updateLocality)
.delete(LocalityController.deleteLocality)

router.route('/street/:id')
.post(LocalityController.createLocalityStreet)
.patch(LocalityController.updateLocalityStreet)
.delete(LocalityController.deleteLocalityStreet)


module.exports = router