import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Coin from './Coin';

const App = () => {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    axios
      .get('https://api.coingecko.com/api/v3/coins/markets', {
        params: {
          vs_currency: 'usd',
          order: 'market_cap_desc',
          per_page: 100,
          page: 1,
          sparkline: false,
        },
      })
      .then((response) => {
        setCoins(response.data);
      })
      .catch((error) => {
        console.error('Error fetching the data:', error);
      });
  }, []);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className='app'>
      <div className='coin-search'>
        <h1 className='coin-text'>Search a Cryptocurrency</h1>
        <form>
          <input
            type='text'
            placeholder='Search'
            className='coin-input'
            onChange={handleSearch}
          />
        </form>
      </div>
      {filteredCoins.map((coin) => (
        <Coin
          key={coin.id}
          name={coin.name}
          image={coin.image}
          symbol={coin.symbol}
          price={coin.current_price}
          volume={coin.total_volume}
          priceChange={coin.price_change_percentage_24h}
          marketcap={coin.market_cap} // Added marketcap property
        />
      ))}
    </div>
  );
};

export default App;
