/* router setup */
const express = require("express");
const router = express.Router();

/* TODO - finish routes */

/* shop data object with all the info we need */
var shopData = {
    shopName: "No-e in Market",
    productCategories: [
  "Matcha Latte",
  "Iced Matcha Latte",
  "Matcha Lemonade",
  "Matcha Frappé / Smoothie",
  "Matcha Americano",
  "Matcha Espresso Fusion",
  "Matcha Milk Tea",
  "Matcha Coconut Latte",
  "Matcha Honey Latte",
  "Matcha Mojito"
],
    /* shop locations - added manager name and address */
    shops: [
        { name: "Pied Piper Central", manager: "Alice Smith", address: "27 Maple Grove, Bristol BS7 8RN" },
        { name: "Pied Piper West", manager: "Bob Jones", address: "14 High Street, York YO1 8RD" },
        { name: "Pied Piper East", manager: "Carla Gomez", address: "82 Kings Road, Reading RG1 3BJ" }
    ]
};

/* game items for the no e game - some have e some dont */
shopData.gameItems = [
    "Milk",
    "Chips",
    "Candy",
    "Soda",
    "Pasta",
    "Ham",
    "Yogurt",
    "Sugar",
    "Bread",
    "Apple",
    "Coke",
    "Juice",
    "Beer",
    "Cheese"
];

/* make product categories show the game items instead */
shopData.productCategories = shopData.gameItems;


/* main routes - home page */
router.get("/", (req, res) => {
    res.render("index.ejs", shopData )
}); 

/* about page route */
router.get("/about", (req, res) => {
    res.render("about.ejs", shopData )
});

/* search page */
router.get("/search", (req, res) => {
        res.render("search.ejs", shopData)
});

/* show survey form */
router.get('/survey', (req, res) => {
    /* need to pass shopData so survey can show categories */
    res.render('survey.ejs', shopData);
});

/* handle survey submission */
router.post('/survey_submit', (req, res) => {
    /* get all the form data */
    const submission = {
        first: req.body.first || '',
        last: req.body.last || '',
        email: req.body.email || '',
        age: req.body.age || '',
        category: req.body.category || '',
        isStudent: req.body.isStudent === 'on' ? true : false  /* checkbox value */
    };

    /* show results page */
    res.render('survey_result.ejs', { shopName: shopData.shopName, submission: submission });
});

    /* no e game - show game page */
    router.get('/no-e-game', (req, res) => {
        /* pass game items to the view */
        res.render('no_e_game.ejs', { shopName: shopData.shopName, gameItems: shopData.gameItems });
    });

    /* process game submission */
    router.post('/no-e-game', (req, res) => {
        /* user selections from checkboxes */
        let selected = req.body.selected || [];
        if (!Array.isArray(selected)) selected = [selected];  /* make sure its an array */

        const items = shopData.gameItems;
        const correctItems = items.filter(i => !i.toLowerCase().includes('e'));  /* items without e */

        /* check which ones user got right */
        const correctSelected = selected.filter(s => correctItems.includes(s));
        /* wrong picks */
        const incorrectSelected = selected.filter(s => !correctItems.includes(s));
        /* ones they missed */
        const missing = correctItems.filter(c => !selected.includes(c));

        /* did they get everything right? */
        const allCorrect = (missing.length === 0 && incorrectSelected.length === 0 && correctSelected.length === correctItems.length);

        /* show results */
        res.render('no_e_game_result.ejs', {
            shopName: shopData.shopName,
            items: items,
            selected: selected,
            correctItems: correctItems,
            correctSelected: correctSelected,
            incorrectSelected: incorrectSelected,
            missing: missing,
            allCorrect: allCorrect
        });
    });

/* search result handler */
router.get('/search_result', function (req, res) {
    /* TODO: need to search database later */
    res.send(("You searched for " + req.query.Name + " in " + req.query.Category));
 });

 /* show register form */
 router.get("/register", (req,res) => {
    res.render("register.ejs",  shopData); 
}); 
 
/* handle registration */
router.post("/registered", (req,res) => { 
    /* get form fields */
    const first = req.body.first || '';
    const last = req.body.last || '';
    const email = req.body.email || '';
    /* render confirmation page */
    res.render('registered.ejs', { shopName: shopData.shopName, first: first, last: last, email: email });
}); 

/* export router */
module.exports = router;