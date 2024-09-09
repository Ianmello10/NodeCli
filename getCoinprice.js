import chalk from "chalk";
import { createSpinner } from "nanospinner";
const spinner = createSpinner();

const api_key = process.env.API_KEY;
const url = process.env.URL;



const getCoinPrice = async (coin) => {
  try {
    spinner.start();
    const res = await fetch(`${url}${coin}/market_chart?vs_currency=usd&days=5&precision=5`, {
      headers:{
        accept: 'application/json',
        'x-cg-demo-api-key': api_key,
      },
    });
    // if response fail 
    if (!res.ok) {
      throw new Error("Failed to fetch data", res.status);
    }

    const data = await res.json();
    spinner.stop()

    return data.prices.map(price => price[1]); 
  } catch (error) {
    console.error(chalk.red(`Error fetching data ${error.message}`));
    return null;
  }
};

export { getCoinPrice, spinner } 