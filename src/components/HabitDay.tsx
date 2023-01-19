import * as Popover from "@radix-ui/react-popover";
import clsx from "clsx";
import { ProgressBar } from "./ProgressBar";
import * as Checkbox from "@radix-ui/react-checkbox";
import { Check } from "phosphor-react";

interface HabitDayProps {
  date: Date;
  amout?: number;
  completed?: number;
}

export function HabitDay({ amout = 0, completed = 0 }: HabitDayProps) {
  const completedPercentage =
    amout > 0 ? Math.round((completed / amout) * 100) : 0;

  return (
    <Popover.Root>
      <Popover.Trigger
        className={clsx("w-10 h-10  border-2  rounded-lg", {
          "bg-zinc-900 border-zinc-800": completedPercentage === 0,
          "bg-violet-900 border-violet-700":
            completedPercentage > 0 && completedPercentage < 20,
          "bg-violet-800 border-violet-600":
            completedPercentage >= 20 && completedPercentage < 40,
          "bg-violet-700 border-violet-500":
            completedPercentage >= 40 && completedPercentage < 60,
          "bg-violet-600 border-violet-500":
            completedPercentage >= 60 && completedPercentage < 80,
          "bg-violet-500 border-violet-400": completedPercentage >= 80,
        })}
      />
      <Popover.Portal>
        <Popover.Content className="min-w-[320px] p-6 rounded-2xl bg-zinc-900 flex flex-col">
          <span className="font-semibold text-zinc-400">terca-feira</span>
          <span className="mt-1 font-extrabold leading-tight text-3xl">
            17/01
          </span>

          <ProgressBar progress={completedPercentage} />
          <div className="mt-6 flex flex-col gap-3">
            <Checkbox.Root className="flex items-center group  gap-3">
              <div className="h-8 w-8 rounded-lg flex items-center transition-all group-data-[state=checked]:border-green-500 group-data-[state=checked]:bg-green-500 justify-center bg-zinc-900 border-2 border-zinc-800">
                <Checkbox.Indicator>
                  <Check className="text-white" size={20} />
                </Checkbox.Indicator>
              </div>

              <span className="font-semibold text-xl transition-all group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-400 text-white leading-tight">
                Beber 2l de água
              </span>
            </Checkbox.Root>
          </div>
          <Popover.Arrow height={8} width={16} className="fill-zinc-900" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
