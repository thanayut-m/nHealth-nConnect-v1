const express = require("express");
const { checkFile } = require("./services/checkFile");
const TimeHelper = require("./utils/TimeHelper");
const { GeneratePubSub } = require("./services/GeneratePubSub");
const { CheckOrder } = require("./services/request/CheckOrder");
require("dotenv").config();

const app = express();
const port = process.env.PORT;

const runCheckFile = async () => {
  await checkFile();

  const newYear = TimeHelper.getYear();
  const newMonth = TimeHelper.getMonth();
  const newDay = TimeHelper.getDay();
  const newHH = TimeHelper.getHH();
  const newmm = TimeHelper.getmm();
  const newss = TimeHelper.getss();

  console.log(
    `[${newYear}:${newMonth}:${newDay}_${newHH}:${newmm}:${newss}] : File check completed.`
  );
};

const delaySeconds = 9;

const countdown = (seconds) => {
  return new Promise((resolve) => {
    let counter = seconds;

    const interval = setInterval(() => {
      console.log(`V.68.08.01 : ${counter} second(s)...`);
      counter--;

      if (counter < 0) {
        clearInterval(interval);
        resolve();
      }
    }, 1000);
  });
};

const main = async () => {
  await CheckOrder();
  await GeneratePubSub();
  await runCheckFile();
};

const runRepeatedly = async () => {
  await main();
  await countdown(delaySeconds);
  runRepeatedly();
};

runRepeatedly();

app.listen(port, () => console.log(`Server is running on port: ${port}`));
