const utilitiesController = require ("../controller/utilities-controller")
const express = require("express")
const router = express.Router()

router.get("/:uid",utilitiesController.getUtilities)
router.post("/saveOptions/:uid",utilitiesController.saveUtilities)
router.post("/deleteOptions/:uid",utilitiesController.deleteUtilities)
router.post("/saveTheme/:uid",utilitiesController.saveTheme)

module.exports = router
