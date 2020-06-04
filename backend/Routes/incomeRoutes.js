const express = require ("express")
const incomeController = require("../controller/income-controller")

const router = express.Router()

router.get("/:uid",incomeController.getIncome)
router.post("/add/:uid",incomeController.addIncome)
router.patch ("/update/:iid",incomeController.updateIncome)
router.delete("/delete/:iid",incomeController.deleteincome)

router.post("/getIncomeByTime/:uid",incomeController.getIncomeByTime)

module.exports = router