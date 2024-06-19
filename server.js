const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/categories/Laptop/products', (req, res) => {
  try {
    const { n = 10, page = 1, sort = 'rating', order = 'desc', minPrice, maxPrice } = req.query;

    const products = [
      {
        "productName": "Laptop 1",
        "price": 2236,
        "rating": 4.7,
        "discount": 63,
        "availability": "yes"
      },
      {
        "productName": "Laptop 13",
        "price": 1244,
        "rating": 4.5,
        "discount": 45,
        "availability": "out-of-stock"
      },
      {
        "productName": "Laptop 3",
        "price": 9102,
        "rating": 4.44,
        "discount": 98,
        "availability": "out-of-stock"
      },
      {
        "productName": "Laptop 11",
        "price": 2652,
        "rating": 4.12,
        "discount": 70,
        "availability": "yes"
      },
      {
        "productName": "Laptop 4",
        "price": 1258,
        "rating": 3.8,
        "discount": 33,
        "availability": "yes"
      },
      {
        "productName": "Laptop 13",
        "price": 8686,
        "rating": 3.22,
        "discount": 24,
        "availability": "out-of-stock"
      },
      {
        "productName": "Laptop 14",
        "price": 9254,
        "rating": 3,
        "discount": 56,
        "availability": "yes"
      },
      {
        "productName": "Laptop 10",
        "price": 7145,
        "rating": 2.74,
        "discount": 15,
        "availability": "yes"
      },
      {
        "productName": "Laptop 10",
        "price": 4101,
        "rating": 2.67,
        "discount": 37,
        "availability": "out-of-stock"
      }
    ];

    products.sort((a, b) => {
      if (order === 'asc') {
        return a[sort] - b[sort];
      } else {
        return b[sort] - a[sort];
      }
    });

    const startIndex = (page - 1) * n;
    const paginatedProducts = products.slice(startIndex, startIndex + parseInt(n));

    const response = {
      products: paginatedProducts,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(products.length / n),
        totalProducts: products.length
      }
    };

    res.json(response);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
