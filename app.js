const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const newsRoutes = require('./routes/newsRoutes');
const ejsLayouts = require('express-ejs-layouts');


dotenv.config();

const app = express();
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('layout', 'layout'); // Default layout file
app.use('/', newsRoutes);
app.use(ejsLayouts);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
