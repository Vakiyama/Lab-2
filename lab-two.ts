export function getDayOfTheWeek(year: number, month: string, day: number): string {
    const lastTwoYearNumbers = parseInt(year.toString().slice(-2));
    const twelveAmountsRemainder = getRemainder(lastTwoYearNumbers, 12);

    const fourAmounts = getFitCount(twelveAmountsRemainder, 4);
    const twelveAmounts = getFitCount(lastTwoYearNumbers, 12);

    let resultTotal = (twelveAmounts 
    + twelveAmountsRemainder 
    + fourAmounts
    + day
    + getMonthCode(month))

    const result = handleExceptions(resultTotal, year, month) % 7;

    const daysOfTheWeekArray = [
        "Saturday",
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday"
    ];
    

    return daysOfTheWeekArray[result];
}

function handleExceptions(result: number, year: number, month: string): number {
    let newResult = result;

    if (isLeapYear(year) && (month === "January" || month === "February")) newResult--;

    const era = Math.floor(year / 100);

    switch (era) {
        case 16:
            newResult += 6;
            break;
        case 17:
            newResult += 4;
            break;
        case 18:
            newResult += 2;
            break;
        case 20:
            newResult += 6;
            break;
        case 21:
            newResult += 4;
            break;
        default:
    }

    return newResult;
}

export function getFitCount(nominator: number, denominator: number): number {
    return Math.floor(nominator / denominator);
}

export function getRemainder(nominator: number, denominator: number): number {
    const fitCount = getFitCount(nominator, denominator);
    return (nominator - fitCount * denominator);
}

const monthCodes: Record<string, number> = {
  "January": 1,
  "February": 4,
  "March": 4,
  "April": 0,
  "May": 2,
  "June": 5,
  "July": 0,
  "August": 3,
  "September": 6,
  "October": 1,
  "November": 4,
  "December": 6
};

function getMonthCode(month: string): number {
    const code = monthCodes[month];
    if (code !== undefined) return code;

    throw new Error("Invalid Month: " + month);
}

function isLeapYear(year: number): boolean {
    const divBy4 = year % 4 === 0;
    const divBy100 = year % 100 === 0;
    const divBy400 = year % 400 === 0;

    return divBy4 && (!divBy100 || divBy400);
}


export function makeCalendar(year: number) {
    const monthsInYear = 12;
    for (let month = 0; month < monthsInYear; month++) {
        for (let day = 0; day < getDaysOfMonth(year, month); day++) {
            const monthStrings = [
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December"
            ];
            
            const dayOfTheWeek = getDayOfTheWeek(year, monthStrings[month], day);
            console.log(`${month + 1}-${day + 1}-${year} is a ${dayOfTheWeek}`);
        }
    }
}

export function getDaysOfMonth(year: number, month: number): number {
    const daysInMonth = [
        31,
        isLeapYear(year) ? 29 : 28,
        31,
        30,
        31,
        30,
        31,
        31,
        30,
        31,
        30,
        31
    ];

    return daysInMonth[month];
}

