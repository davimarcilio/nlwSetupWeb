import { Check } from "phosphor-react";
import * as Checkbox from "@radix-ui/react-checkbox";
import { FormEvent, useState } from "react";
import { api } from "../lib/axios";

const avaliableWeekDays = [
  "Domingo",
  "Segunda-Feira",
  "Terça-Feira",
  "Quarta-Feira",
  "Quinta-Feira",
  "Sexta-Feira",
  "Sábado",
];

export function NewHabitForm() {
  const [title, setTitle] = useState("");
  const [weekDays, setWeekDays] = useState<number[]>([]);

  async function createNewHabit(e: FormEvent) {
    e.preventDefault();
    if (!title || weekDays.length === 0) {
      return;
    }
    await api.post("habits", {
      title,
      weekDays,
    });
    setTitle("");
    setWeekDays([]);
    alert("Hábito criado com sucesso!");
  }

  function handleToggleWeekDay(weekDay: number) {
    if (weekDays.includes(weekDay)) {
      return setWeekDays((state) => state.filter((WK) => WK !== weekDay));
    }
    return setWeekDays((state) => [...state, weekDay]);
  }

  return (
    <form onSubmit={createNewHabit} className="w-full flex flex-col mt-6">
      <label htmlFor="title" className="font-semibold leading-tight">
        Qual seu comprometimento
      </label>
      <input
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className="p-4 rounded-lg mt-3 bg-zinc-800 text-white placeholder:text-zinc-400"
        type="text"
        id="title"
        placeholder="ex.: Exercícios, Dormir bem, etc..."
        autoFocus
      />
      <label className="font-semibold leading-tight mt-4" htmlFor="">
        Qual a recorrência?
      </label>
      <div className="flex flex-col gap-2 mt-3">
        {avaliableWeekDays.map((weekDay, index) => (
          <Checkbox.Root
            checked={weekDays.includes(index)}
            key={weekDay}
            className="flex items-center group  gap-3"
            onCheckedChange={() => handleToggleWeekDay(index)}
          >
            <div className="h-8 w-8 rounded-lg flex items-center transition-all group-data-[state=checked]:border-green-500 group-data-[state=checked]:bg-green-500 justify-center bg-zinc-900 border-2 border-zinc-800">
              <Checkbox.Indicator>
                <Check className="text-white" size={20} />
              </Checkbox.Indicator>
            </div>

            <span className=" text-white leading-tight">{weekDay}</span>
          </Checkbox.Root>
        ))}
      </div>
      <button
        className="mt-6 rounded-lg p-4 flex items-center justify-center gap-3 font-semibold bg-green-600 hover:bg-green-500 transition-colors"
        type="submit"
      >
        <Check size={20} weight={"bold"} />
        Confirmar
      </button>
    </form>
  );
}
