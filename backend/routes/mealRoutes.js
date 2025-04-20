const express = require("express")
const router = express.Router()
const { createMeal, getMeals, getMealsByDate, deleteMeal } = require("../controllers/mealController")
const { protect } = require("../middleware/authMiddleware")

router.route("/meals").post(protect, createMeal).get(protect, getMeals)

router.get("/date/:date", protect, getMealsByDate)
router.delete("/:id", protect, deleteMeal)

module.exports = router

