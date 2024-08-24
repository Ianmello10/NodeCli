import figlet from "figlet";


const executeBanner = async () => figlet("BTC and ETH Price !!", function (err, data) {
    if (err) {
    console.log("Something went wrong...");
     console.dir(err);
     return;
  }
   console.log(data);
  });

  export default executeBanner