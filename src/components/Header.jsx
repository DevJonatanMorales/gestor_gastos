import { ControlPresupuesto } from "./ControlPresupuesto";
import { NuevoPresupuesto } from "./nuevoPresupuesto";

/* eslint-disable react/prop-types */
export const Header = ({
  gastos,
  setGastos,
  presupuesto,
  setPresupuesto,
  isValPresupuesto,
  setIsValPresupuesto,
}) => {
  return (
    <header>
      <h1>PLANIFICADOR DE GASTOS</h1>
      {isValPresupuesto ? (
        <ControlPresupuesto
          gastos={gastos}
          setGastos={setGastos}
          presupuesto={presupuesto}
          setPresupuesto={setPresupuesto}
          setIsValPresupuesto={setIsValPresupuesto}
        />
      ) : (
        <NuevoPresupuesto
          presupuesto={presupuesto}
          setPresupuesto={setPresupuesto}
          isValPresupuesto={isValPresupuesto}
          setIsValPresupuesto={setIsValPresupuesto}
        />
      )}
    </header>
  );
};
