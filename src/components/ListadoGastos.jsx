import React from "react";
import { Gasto } from "./Gasto";

export const ListadoGastos = ({
  gastos,
  setGastoEditar,
  eliminarGasto,
  filtro,
  gastosFiltrados,
}) => {
  return (
    <div className="listado-gastos contenedor">
      {filtro
        ? gastosFiltrados.map((gasto) => (
            <>
              <h2>
                {gastosFiltrados.length
                  ? "Gastos"
                  : "No hay gastos en esta categoria"}
              </h2>
              {
                <Gasto
                  key={gasto.id}
                  gasto={gasto}
                  setGastoEditar={setGastoEditar}
                  eliminarGasto={eliminarGasto}
                />
              }
            </>
          ))
        : gastos.map((gasto) => (
            <>
              <h2>{gastos.length ? "Gastos" : "No hay gastos"}</h2>
              {
                <Gasto
                  key={gasto.id}
                  gasto={gasto}
                  setGastoEditar={setGastoEditar}
                  eliminarGasto={eliminarGasto}
                />
              }
            </>
          ))}
    </div>
  );
};
