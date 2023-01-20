import * as Checkbox from "@radix-ui/react-checkbox";
import { Check } from "phosphor-react";
import { useEffect, useState } from "react";
import { api } from "../lib/axios";

interface HabitsListProps {
  date: Date;
}

interface HabitsListItems {
  possibleHabits: {
    id: string;
    title: string;
    createdAt: string;
  }[];
  completedHabits: string[];
}

export function HabitsList({ date }: HabitsListProps) {
  const [habits, setHabits] = useState<HabitsListItems>();
  useEffect(() => {
    api
      .get("day", {
        params: {
          date: date.toISOString(),
        },
      })
      .then((response) => setHabits(response.data));
  }, []);

  return (
    <div className="mt-6 flex flex-col gap-3">
      {habits?.possibleHabits.map((habit) => {
        return (
          <Checkbox.Root
            checked={habits.completedHabits.includes(habit.id)}
            key={habit.id}
            className="flex items-center group  gap-3"
          >
            <div className="h-8 w-8 rounded-lg flex items-center transition-all group-data-[state=checked]:border-green-500 group-data-[state=checked]:bg-green-500 justify-center bg-zinc-900 border-2 border-zinc-800">
              <Checkbox.Indicator>
                <Check className="text-white" size={20} />
              </Checkbox.Indicator>
            </div>

            <span className="font-semibold text-xl transition-all group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-400 text-white leading-tight">
              {habit.title}
            </span>
          </Checkbox.Root>
        );
      })}
    </div>
  );
}
