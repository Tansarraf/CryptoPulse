import { createContext, useEffect, useState } from "react";

export const CoinContext = createContext();

const CoinContextProvider = (props) => {
  const [allCoins, setAllCoins] = useState([]);
  const [currency, setCurrency] = useState({
    name: "usd",
    symbol: "$",
  });
  const fetchAllCoins = async () => {
    //Code from CoinGecko docs
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": "CG-AcpPvqp6ekVkaTm6fKmmWWYs",
      },
    };
    //The data is fetched according to the currency
    fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}`,
      options
    )
      .then((res) => res.json())
      .then((res) => setAllCoins(res))
      .catch((err) => console.error(err));
  };
  // with [currency] we are making sure that everytime currency changes, the fetchAllCoins is executed again... fetching data again
  useEffect(() => {
    fetchAllCoins();
  }, [currency]);
  const contextValue = {
    allCoins,
    currency,
    setCurrency,
  };
  return (
    <CoinContext.Provider value={contextValue}>
      {props.children}
    </CoinContext.Provider>
  );
};
export default CoinContextProvider;
