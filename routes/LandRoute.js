const express = require('express')
const LandController = require('../controller/LandController')

const router = express.Router()
const multer  = require('multer')

const storage = multer.diskStorage({
  destination:  (req, file, cb) => {
    cb(null, 'public/uploads'); // Use /tmp as the storage location
  },
    filename: function (req, file, cb) {
      cb(null, req.body.owners_name + file.originalname)
    }
  })

const upload = multer({storage: storage})

router.route('/')
.get(LandController.getAllLand)
.post(upload.single('owners_image'),LandController.CreateLand)

router.route('/stats')
.get(LandController.getLandStats)

router.route('/:id')
.get((req,res)=>{
    res.status(200).json({
        message:"Read a single land successful"
    })
})

.patch(upload.single('owners_image'),LandController.updateLand)

.delete(LandController.deleteLand)

module.exports = router