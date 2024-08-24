#!/usr/bin/env node
import { select } from "@inquirer/prompts";
import chalk from "chalk";
import {getCoinPrice,spinner} from "./getCoinprice.js";
import executeBanner from "./executeBanner.js";

const api_key = process.env.API_KEY;
const url = process.env.URL;


const main = async () => {
   
 await executeBanner()

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
