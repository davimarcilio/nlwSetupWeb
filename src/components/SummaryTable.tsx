import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { api } from "../lib/axios";
import { generateDatesFromYearBeginning } from "../utils/generate-dates-from-year-beginning";
import { HabitDay } from "./HabitDay";

const weekDays = ["D", "S", "T", "Q", "Q", "S", "S"];

const summaryDates = generateDatesFromYearBeginning();

const minimumSummaryDatesSize = 14 * 7;
const amoutOfDaysToFill = minimumSummaryDatesSize - summaryDates.length;

interface Summary {
  id: string;
  date: string;
  amout: number;
  completed: number;
}
export function SummaryTable() {
  const [summary, setSummary] = useState<Summary[]>([]);

  async function getSummary() {
    const response = await api.get("/summary");
    setSummary(response.data);
  }

  useEffect(() => {
    getSummary();
  }, []);

  return (
    <div className="w-full flex">
      <div className="grid grid-rows-7 grid-flow-row gap-3">
        {weekDays.map((weekDay, index) => (
          <div
            key={`${weekDay}-${index}`}
            className="text-zinc-400 text-xl h-10 w-10 flex items-center justify-center font-bold"
          >
            {weekDay}
          </div>
        ))}
      </div>
      <div className="grid grid-rows-7 grid-flow-col gap-3">
        {summary.length > 0 &&
          summaryDates.map((date) => {
            const dayInSummary = summary.find((day) => {
              return dayjs(date).isSame(day.date, "day");
            });
            return (
              <HabitDay
                amout={dayInSummary?.amout}
                date={date}
                defaultCompleted={dayInSummary?.completed}
                key={date.toString()}
              />
            );
          })}
        {amoutOfDaysToFill > 0 &&
          Array.from({ length: amoutOfDaysToFill }).map((_, index) => (
            <div
              key={index}
              className="w-10 h-10 bg-zinc-900 border-2 border-zinc-800 rounded-lg opacity-40 cursor-not-allowed"
            />
          ))}
      </div>
    </div>
  );
}
