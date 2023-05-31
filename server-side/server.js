// const axios = require('axios');
// const fetch = require('node-fetch');


// const app = express();
// const port = 3000;

// app.use(express.json());

// app.get('/cta', (req, res) => {
//   const url = `https://lapi.transitchicago.com${req.url}`;
//   fetch(url)
//     .then((response) => response.json())
//     .then((data) => res.json(data))
//     .catch((error) => {
//       console.error('Error fetching CTA data:', error);
//       res.status(500).json({ error: 'An error occurred while fetching CTA data' });
//     });
// });

// app.listen(port, () => {
//   console.log(`Proxy server is running on http://localhost:${port}`);
// });
