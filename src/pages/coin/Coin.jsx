import React, { useContext, useEffect, useState } from "react";
import "./Coin.css";
import { useParams } from "react-router-dom";
import { CoinContext } from "../../context/CoinContext";
import LineChart from "../../components/linechart/LineChart";

const Coin = () => {
  const { coinId } = useParams();
  const [coinData, setCoinData] = useState();
  const [historicalData, setHistoricalData] = useState();
  const { currency } = useContext(CoinContext);

  // Fetching data for specific coins using this method
  const fetchCoinData = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": "CG-AcpPvqp6ekVkaTm6fKmmWWYs",
      },
    };

    fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`, options)
      .then((res) => res.json())
      .then((res) => setCoinData(res))
      .catch((err) => console.error(err));
  };

  const fetchHistoricalData = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": "CG-AcpPvqp6ekVkaTm6fKmmWWYs",
      },
    };

    fetch(
      `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency.name}&days=10&interval=daily`,
      options
    )
      .then((res) => res.json())
      .then((res) => setHistoricalData(res))
      .catch((err) => console.error(err));
  };

  //useEffect to fetch it once upon every render and when currency changes
  useEffect(() => {
    fetchCoinData();
    fetchHistoricalData();
  }, [currency]);
  if (coinData && historicalData) {
    return (
      <div className="coin">
        <div className="coin-name">
          <img src={coinData.image.large} alt="" />
          <p>
            <strong>
              {coinData.name} ({coinData.symbol.toUpperCase()})
            </strong>
          </p>
        </div>
        <div className="coin-chart">
          <LineChart historicalData={historicalData} />
        </div>
        <div className="coin-info">
          <ul>
            <li>Crypto Market Rank</li>
            <li>{coinData.market_cap_rank}</li>
          </ul>
          <ul>
            <li>Current Price</li>
            <li>
              {currency.symbol}
              {coinData.market_data.current_price[
                currency.name
              ].toLocaleString()}
            </li>
          </ul>
          <ul>
            <li>Market Cap</li>
            <li>
              {currency.symbol}
              {coinData.market_data.market_cap[currency.name].toLocaleString()}
            </li>
          </ul>
          <ul>
            <li>24 Hour High</li>
            <li>
              {currency.symbol}
              {coinData.market_data.high_24h[currency.name].toLocaleString()}
            </li>
          </ul>
          <ul>
            <li>24 Hour Low</li>
            <li>
              {currency.symbol}
              {coinData.market_data.low_24h[currency.name].toLocaleString()}
            </li>
          </ul>
          <ul>
            <li>Price Change</li>
            <li>
              <p
                className={
                  coinData.market_data.price_change_percentage_24h_in_currency[
                    currency.name
                  ] > 0
                    ? "green"
                    : "red"
                }
              >
                {
                  coinData.market_data.price_change_percentage_24h_in_currency[
                    currency.name
                  ]
                }
                %
              </p>
            </li>
          </ul>
          <ul>
            <li>Trade Here</li>
            {coinData.tickers.slice(0, 1).map((ticker) => (
              <a href={ticker.trade_url} target="_blank">
                {ticker.trade_url}
              </a>
            ))}
          </ul>
        </div>
      </div>
    );
  } else {
    return (
      <div className="spinner">
        <div className="spin"></div>
      </div>
    );
  }
};

export default Coin;
