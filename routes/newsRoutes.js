const express = require('express');
const axios = require('axios');
require('dotenv').config();

const router = express.Router();

const categories = ['general', 'technology', 'business', 'sports', 'entertainment', 'health', 'science'];


// Homepage
router.get('/', (req, res) => {
    res.render('index', { categories });
});


// News pages
router.get('/news/:category', async (req, res) => {
    const category = req.params.category;
    const apiKey = process.env.GNEWS_API_KEY;
    const validCategories = ['general', 'business', 'entertainment', 'health', 'science', 'sports', 'technology'];

    if (!validCategories.includes(category)) {
        return res.status(404).render('error', { message: 'Invalid category!' });
    }

    try {
        // Fetch news from GNews API
        const response = await axios.get(`https://gnews.io/api/v4/top-headlines?country=in&topic=${category}&token=${apiKey}`);
        const articles = response.data.articles; // Articles array

        // Render news page
        res.render('news', {
            category: category.charAt(0).toUpperCase() + category.slice(1),
            articles,
        });
    } catch (error) {
        console.error('Error fetching news:', error.message);
        res.status(500).render('error', { message: 'Error fetching news. Please try again later.' });
    }
});

module.exports = router;
