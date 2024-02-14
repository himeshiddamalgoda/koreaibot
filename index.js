const express = require('express');
const cors = require("cors");
const sheduleRoutes = require('./src/routes/shedule.routes');
const quoteRoutes = require('./src/routes/quote.routes');
const contactSalesRoutes = require('./src/routes/contactSales.routes');
const subscribeNewsRoutes = require('./src/routes/subscribeNews.routes');
const whitepapersRoutes = require('./src/routes/whitepaper.routes');

const app = express();
const port = 8080;

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

const db = require("./src/models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api/shedules', sheduleRoutes);
app.use('/api/quotes', quoteRoutes);
app.use('/api/contactSales', contactSalesRoutes);
app.use('/api/subscribeNews', subscribeNewsRoutes);
app.use('/api/whitepaper', whitepapersRoutes);

app.listen(port, () => {
  console.log(` app listening at http://localhost:${port}`);
});