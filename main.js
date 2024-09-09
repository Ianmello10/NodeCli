#!/usr/bin/env node
import { select } from "@inquirer/prompts";
import chalk from "chalk";
import { getCoinPrice, spinner } from "./getCoinprice.js";
import executeBanner from "./executeBanner.js";
import asciichart from 'asciichart';



const main = async () => {

  await executeBanner()

  const answer = await select({
    message: "Select your Coin",
    choices: [
      {
        name: "BTC",
        value: "bitcoin",
        description: "Bitcoin price",
      },

      {
        name: "ETH",
        value: "ethereum",
        description: "Ethereum price",
      },
    ],
  });

  const prices = await getCoinPrice(answer);

  const chart = asciichart.plot(prices, {
    height: 20,
    colors: [asciichart.green],
  });


  if (prices !== null) {
    spinner.success({
      text: `${answer.toUpperCase()} current price is: ${chalk.green.bold(`$${prices[prices.length - 1]}`)}`,
    });
  }

  console.log(chart);
};

main();


