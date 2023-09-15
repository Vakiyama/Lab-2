import { expect, test, spyOn } from "bun:test";
import { 
    getDayOfTheWeek,
    makeCalendar,
    getDaysOfMonth,
    getFitCount,
    getRemainder
} from "./lab-two";

test("dayOfWeek Aug 16 1989", () => {
    expect(getDayOfTheWeek(1989, "August", 16)).toBe("Wednesday");
});

test("dayOfWeek Mar 20 1950", () => {
    expect(getDayOfTheWeek(1950, "March", 20)).toBe("Monday");
});

test("getRemainder", () => {
    expect(getRemainder(5, 2)).toBe(1);
    expect(getRemainder(5, 3)).toBe(2);
    expect(getRemainder(5, 4)).toBe(1);
});

test("getFitCount", () => {
    expect(getFitCount(5, 2)).toBe(2);
    expect(getFitCount(5, 3)).toBe(1);
    expect(getFitCount(5, 4)).toBe(1);
});

test("getDayOfTheWeek 1989", () => {
    const year = 1989;
    for (let month = 0; month < 12; month++) {
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
            
            const dayOfTheWeek = getDayOfTheWeek(year, monthStrings[month], day + 1);
            const date = new Date(year, month, day + 1);
            const dayOfTheWeekFromJS = date.toLocaleDateString("en-US", { weekday: "long" });

            expect(dayOfTheWeek).toBe(dayOfTheWeekFromJS);
        }
    }
});

test("getDayOfTheWeek with Leap years", () => {
    // test each day of each year from 1600 to 2100
    for (let year = 1600; year <= 2100; year++) {
        for (let month = 0; month < 12; month++) {
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
                
                const dayOfTheWeek = getDayOfTheWeek(year, monthStrings[month], day + 1);
                const date = new Date(year, month, day + 1);
                const dayOfTheWeekFromJS = date.toLocaleDateString("en-US", { weekday: "long" });

                expect(dayOfTheWeek).toBe(dayOfTheWeekFromJS);
            }
        }
    }
});

test("makeCalendar calls 365 times", () => {
    const logSpy = spyOn(console, "log");

    makeCalendar(1950);
    expect(logSpy).toHaveBeenCalledTimes(365);

    logSpy.mockRestore();
});

test("makeCalendar calls 366 for leap year", () => {
    const logSpy = spyOn(console, "log");

    makeCalendar(2000);
    expect(logSpy).toHaveBeenCalledTimes(366);

    logSpy.mockRestore();
});
