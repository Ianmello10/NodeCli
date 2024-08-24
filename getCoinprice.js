import chalk from "chalk";
import { createSpinner } from "nanospinner";
const spinner = createSpinner();


const api_key = process.env.API_KEY;
const url = process.env.URL;

 const getCoinPrice = async (coin) => {
    try {
      spinner.start();
      const res = await fetch(`${url}${coin}USDT`, {
        headers: {
          "x-rapidapi-key": api_key,
          "x-rapidapi-host": "crypto-price-by-api-ninjas.p.rapidapi.com",
        },
      });
  
      // if response fail 
      if (!res.ok) {
        throw new Error("Failed to fetch data", res.status);
      }
  
      const data = await res.json();
     spinner.stop()
      return data.price;
    } catch (error) {
      console.error(chalk.red(`Error fetching data ${error.message}`));
      return null;
    }
  };

  export {getCoinPrice,spinner}