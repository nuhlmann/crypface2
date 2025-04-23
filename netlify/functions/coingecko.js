const fetch = require("node-fetch");

exports.handler = async function(event, context) {
  return new Promise(async (resolve) => {
    try {
      const [market, trending] = await Promise.all([
        fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=volume_desc&per_page=50&page=1&sparkline=false&price_change_percentage=1h,24h,7d").then(r => r.json()),
        fetch("https://api.coingecko.com/api/v3/search/trending").then(r => r.json()),
      ]);

      resolve({
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "Content-Type",
        },
        body: JSON.stringify({ market, trending }),
      });
    } catch (error) {
      resolve({
        statusCode: 500,
        body: JSON.stringify({ error: "Failed to fetch CoinGecko data" }),
      });
    }
  });
};
