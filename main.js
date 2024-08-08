#!/usr/bin/env node
import chalkAnimation from "chalk-animation";
import { input } from "@inquirer/prompts";
import { select } from "@inquirer/prompts";
import chalk from "chalk";
import { createSpinner } from "nanospinner";
import figlet from "figlet";

const api_key = process.env.API_KEY;
const spinner = createSpinner();
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

    if (!res.ok) {
      throw new Error("Failed to fetch data", res.status);
    }

    const data = await res.json();

    return data.price;
  } catch (error) {
    console.error(chalk.red(`Error fetching data ${error.message}`));
    return null;
  }
};
const main = async () => {
  await figlet("BTC and ETH Price !!", function (err, data) {
    if (err) {
      console.log("Something went wrong...");
      console.dir(err);
      return;
    }
    console.log(data);
  });

  const answer = await select({
    message: "Select your Coin",
    choices: [
      {
        name: "BTC",
        value: "BTC",
        description: "Bitcoin price",
      },

      {
        name: "ETH",
        value: "ETH",
        description: "Ethereum price",
      },
    ],
  });

  const price = await getCoinPrice(answer);

  if (price !== null) {
    spinner.success({
      text: `${answer.toUpperCase()} current price is: ${chalk.green.bold(`$${price}`)}`,
    });
  }
};

main();
