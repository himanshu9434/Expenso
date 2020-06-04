const express = require ("express")
const expenseController = require( "../controller/expense-controller")
const dashboardController = require("../controller/dashboard-controller")
const reportsController = require ("../controller/reports-controller")

const router = express.Router()

router.get("/:uid",expenseController.getExpense)

router.post("/add/:uid",expenseController.addExpense)

router.patch("/update/:eid",expenseController.updateExpense)

router.delete("/delete/:eid",expenseController.deleteExpense)

router.post("/getExpenseByTime/:uid",expenseController.getExpenseByTime)

router.get("/charts/:uid",dashboardController.charts)
router.get("/savings/:uid",dashboardController.savings)
router.get("/lastExpenses/:uid",dashboardController.lastExpenses)
router.post("/categoryWiseMonthData/:uid", reportsController.categoryWiseMonthData)

module.exports = router