import { useState } from "react";
import SearhBar from "../components/SearchBar";
import CoinList from "../components/CoinList";
import Layout from "../components/Layout";


export default function Home({ filterCoins }) {
  // console.log(filterCoins);
  const [search, setSearch] = useState("");
  const allCoins = filterCoins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );
  const handleChange = (e) => {
    e.preventDefault();

    setSearch(e.target.value.toLowerCase());
  };
  return (
    <>
      <Layout>
        <div className="coin_app">
          <SearhBar type="text" placeholder="Search" onChange={handleChange} />
          <CoinList filterCoins={allCoins} />
        </div>
      </Layout>
    </>
  );
}

export const getServerSideProps = async () => {
  const res = await fetch(
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false&locale=en"
  );
  const filterCoins = await res.json();
  // console.log(filterCoins);
  return {
    props: {
      filterCoins,
    },
  };
};
