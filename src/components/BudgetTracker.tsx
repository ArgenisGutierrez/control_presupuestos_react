import { AmountDisplay } from "./AmountDisplay";

export function BudgetTracker() {

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <div className="flex justify-center">
        <img src="public/grafico.jpg" alt="Grafica de gastos" />
      </div>

      <div className="flex flex-col justify-center items-center gap-8">
        <button
          type="button"
          className="bg-sky-500 w-full p-2 text-white uppercase font-bold rounded-lg">
          Reiniciar Presupuesto
        </button>
        <AmountDisplay
          label={"Presupuesto"}
          amount={300}
        />
        <AmountDisplay
          label={"Dispobible"}
          amount={200}
        />
        <AmountDisplay
          label={"Gastado"}
          amount={100}
        />
      </div>
    </div>
  )

}
