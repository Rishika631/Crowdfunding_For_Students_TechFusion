const connectdb = require("./db");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors")
connectdb();
const app = express();
const port = process.env.PORT || 5000;

app.use(cors())
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json())

// Available Routes 
// app.use('/api/auth', require("./routes/auth"))
app.use('/api/students', require("./routes/students"))


app.listen(port, () => {
  console.log(`Application running on PORT: ${port}`);
});
