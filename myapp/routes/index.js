const express = require('express');
const path = require('path');
const fetch = require("node-fetch");
const router = express.Router();

const DIST_DIR = path.join(__dirname, '../public');
const HTML_FILE = path.join(DIST_DIR, 'index.hbs');

/* GET home page. */
router.get(['/', '/items', '/items/:id'], function(req, res, next) {
  res.render(HTML_FILE);
});

router.get('/api/items', async (req, res) => {
  const response = await fetch(`https://api.mercadolibre.com/sites/MLA/search?q=${req.query.q}&limit=4`);

  const data = await response.json();

  const items = (result) => {
    return ({
      id: result.id,
      title: result.title,
      price: {
        currency: result.currency_id,
        amount: result.price,
        decimals: ""
      },
      picture: result.thumbnail,
      condition: result.condition,
      free_shipping: result.shipping.free_shipping
    })
  };

  const itemsResponse = {
    author: {
      name: "",
      lastname: ""
    },
    categories: [],
    items: data.results.map(result => items(result))
  };

  res.send(itemsResponse);
});

router.get('/api/items/:id', async (req, res) => {

  const params = encodeURI(req.params.id.trim());
  const paramsDescription = encodeURI(req.params.id.trim() + "/description");

  const url = `https://api.mercadolibre.com/items/${params}`;
  const urlDescription = `https://api.mercadolibre.com/items/${paramsDescription}`;

  const itemResponse = await fetch(url);
  const descriptionResponse = await fetch(urlDescription);

  const itemData = await itemResponse.json();
  const descriptionData = await descriptionResponse.json();

  const detailResponse = {
    author: {
      name: "",
      lastname: ""
    },
    item: {
      id: itemData.id,
      title: itemData.title,
      price: {
        currency: itemData.currency_id,
        amount: itemData.price,
        decimals: "",
      }
    },
    picture: itemData.pictures[0].url,
    condition: itemData.condition,
    free_shipping: itemData.shipping.free_shipping,
    sold_quantity: itemData.sold_quantity,
    description: descriptionData.plain_text
  };

  res.send(detailResponse);

});

module.exports = router;
