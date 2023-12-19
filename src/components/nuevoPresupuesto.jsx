import { useState } from "react";
import { Alertas } from "./alertas";

/* eslint-disable react/prop-types */
export const NuevoPresupuesto = ({
  presupuesto,
  setPresupuesto,
  setIsValPresupuesto,
}) => {
  const [alerta, setAlerta] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!Number(presupuesto) || Number(presupuesto) < 0) {
      setAlerta("presupuesto no valido");
      return;
    }
    setAlerta("");
    setIsValPresupuesto(true);
  };

  return (
    <div
      className="contenedor-presupuesto contenedor sombra"
      onSubmit={handleSubmit}
    >
      <form className="formulario">
        <div className="campo">
          <label>Presupuesto</label>
          <input
            className="nuevo-presupuesto"
            type="text"
            placeholder="Agrega tu presupuesto"
            value={presupuesto}
            onChange={(e) => {
              const { value } = e.target;
              setPresupuesto(value);
            }}
          />
          <input type="submit" value="AÑADIR" />
          {alerta && <Alertas tipo="error">{alerta}</Alertas>}
        </div>
      </form>
    </div>
  );
};
