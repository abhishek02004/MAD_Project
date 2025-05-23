const express = require("express")
const cors = require("cors")
const morgan = require("morgan")
const connectDB = require("./config/db")

// Connect to database
connectDB()

const app = express()

// Middleware
app.use(express.json())
app.use(cors())
app.use(morgan("dev"))

// Routes
app.use("/api/users", require("./routes/userRoutes"))
app.use("/api/meals", require("./routes/mealRoutes"))

// Error handling middleware
app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode
  res.status(statusCode)
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  })
})

const PORT = 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

