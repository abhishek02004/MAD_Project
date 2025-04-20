const Meal = require("../models/mealModel")

// @desc    Create a new meal
// @route   POST /api/meals
// @access  Private
const createMeal = async (req, res) => {
  const { name, category, calories, protein, carbs, fat, date } = req.body

  try {
    const meal = new Meal({
      user: req.user._id,
      name,
      category,
      calories,
      protein,
      carbs,
      fat,
      date: date || Date.now(),
    })

    const createdMeal = await meal.save()
    res.status(201).json(createdMeal)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
}

// @desc    Get all meals for a user
// @route   GET /api/meals
// @access  Private
const getMeals = async (req, res) => {
  try {
    const meals = await Meal.find({ user: req.user._id }).sort({ date: -1 })
    res.json(meals)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
}

// @desc    Get meals by date
// @route   GET /api/meals/date/:date
// @access  Private
const getMealsByDate = async (req, res) => {
  try {
    const date = new Date(req.params.date)
    const nextDay = new Date(date)
    nextDay.setDate(date.getDate() + 1)

    const meals = await Meal.find({
      user: req.user._id,
      date: {
        $gte: date,
        $lt: nextDay,
      },
    }).sort({ date: 1 })

    res.json(meals)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
}

// @desc    Delete a meal
// @route   DELETE /api/meals/:id
// @access  Private
const deleteMeal = async (req, res) => {
  try {
    const meal = await Meal.findById(req.params.id)

    if (!meal) {
      return res.status(404).json({ message: "Meal not found" })
    }

    // Check if the meal belongs to the user
    if (meal.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" })
    }

    await meal.remove()
    res.json({ message: "Meal removed" })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
}

module.exports = {
  createMeal,
  getMeals,
  getMealsByDate,
  deleteMeal,
}

