import { Plus } from "phosphor-react";
import Logo from "../assets/Logo.svg";

export function Header() {
  return (
    <div className="w-full max-w-3xl mx-auto flex items-center justify-between">
      <img src={Logo} alt="Habits" />
      <button
        className="border border-violet-500 font-semibold rounded-lg px-6 py-4 flex items-center justify-center gap-3 transition-colors hover:border-violet-300"
        type="button"
      >
        <Plus size={20} className={"text-violet-500"} />
        Novo hábito
      </button>
    </div>
  );
}
