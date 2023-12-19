import { useState, useEffect } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
export const ControlPresupuesto = ({
  gastos,
  setGastos,
  presupuesto,
  setPresupuesto,
  setIsValPresupuesto,
}) => {
  const [porcentaje, setPorcentaje] = useState(0);
  const [disponible, setDisponible] = useState(0);
  const [gastado, setGastado] = useState(0);

  useEffect(() => {
    const totalGastado = gastos.reduce(
      (total, gasto) => total + gasto.cantidad,
      0
    );
    const totalDisponible = presupuesto - totalGastado;
    setGastado(totalGastado);
    setDisponible(totalDisponible);

    const nuevoPorcentaje = (
      ((presupuesto - totalDisponible) / presupuesto) *
      100
    ).toFixed(2);
    setTimeout(() => {
      setPorcentaje(nuevoPorcentaje);
    }, 1500);
  }, [gastos]);

  const formatearCantidad = (cantidad) => {
    return cantidad.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  const handleResetApp = () => {
    const confirmar = window.confirm(
      "¿Estas seguro que deseas reiniciar la app?"
    );
    if (confirmar) {
      setGastos([]);
      setPresupuesto(0);
      setIsValPresupuesto(false);
    }
  };

  return (
    <div className="contenedor-presupuesto contenedor sombra dos-columnas">
      <CircularProgressbar
        styles={buildStyles({
          pathColor: porcentaje > 100 ? "#DC2626" : "#3B82F6",
          textColor: porcentaje > 100 ? "#DC2626" : "#3B82F6",
          trailColor: "#136342",
          pathTransitionDuration: 0.9,
        })}
        value={porcentaje}
        text={`${porcentaje}% Gastado`}
      />
      <div className="contenido-presupuesto">
        <button className="reset-app" type="button" onClick={handleResetApp}>
          Resetear App
        </button>
        <p>
          <span>PRESUPUESTO:</span> {formatearCantidad(presupuesto)}
        </p>
        <p className={disponible < 0 ? "negativo" : ""}>
          <span>DISPONIBLE:</span> {formatearCantidad(disponible)}
        </p>
        <p>
          <span>GASTADO:</span> {formatearCantidad(gastado)}
        </p>
      </div>
    </div>
  );
};
