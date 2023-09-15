import { makeCalendar, getDayOfTheWeek } from "./lab-two";
import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
const rl = readline.createInterface({ input, output });

makeCalendar(2022);

async function getDayOfTheWeekForUserDate() {
    const year = await rl.question("Please input a year (e. g. 1999): ");
    const month = await rl.question("Please input a month (e. g. August): ");
    const day = await rl.question("Please input a day (e. g. 23): ");
    const dayOfTheWeek = getDayOfTheWeek(parseInt(year), month, parseInt(day));

    console.log(`Your day of the week is: ${dayOfTheWeek}`);

    rl.close();
}

getDayOfTheWeekForUserDate();
