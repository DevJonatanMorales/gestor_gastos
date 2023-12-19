import { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { Modal } from "./components/Modal";
import { getIdRound } from "./helper/App";
import IconNuevogasto from "./img/nuevo-gasto.svg";
import { ListadoGastos } from "./components/ListadoGastos";
import { Filtro } from "./components/Filtro";

function App() {
  const [presupuesto, setPresupuesto] = useState(
    Number(localStorage.getItem("presupuesto")) ?? 0
  );
  const [gastos, setGastos] = useState(
    JSON.parse(localStorage.getItem("gastos")) ?? []
  );
  const [filtro, setFiltro] = useState("");
  const [gastosFiltrados, setGastosFiltrados] = useState([]);
  const [isValPresupuesto, setIsValPresupuesto] = useState(false);
  const [OpenModal, setOpenModal] = useState(false);
  const [animateModal, setAnimateModal] = useState(false);
  const [gastoEditar, setGastoEditar] = useState({});

  const handelNuevogasto = () => {
    if (OpenModal) {
      setAnimateModal(!animateModal);
      setTimeout(() => {
        setOpenModal(!OpenModal);
      }, 500);
      return;
    }
    setOpenModal(!OpenModal);
    setTimeout(() => {
      setGastoEditar({});
      setAnimateModal(!animateModal);
    }, 500);
  };

  const guardarGastos = (gasto) => {
    if (gasto.id) {
      const gastosActualizados = gastos.map((gastoState) =>
        gastoState.id === gasto.id ? gasto : gastoState
      );

      setGastos(gastosActualizados);
      setGastoEditar({});
    } else {
      gasto.id = getIdRound();
      gasto.fecha = Date.now();
      setGastos([...gastos, gasto]);
    }
    handelNuevogasto();
  };

  const eliminarGasto = (id) => {
    const gastosActualizados = gastos.filter((gasto) => gasto.id !== id);
    setGastos(gastosActualizados);
  };

  useEffect(() => {
    if (Object.keys(gastoEditar).length) {
      handelNuevogasto();
    }
  }, [gastoEditar]);

  useEffect(() => {
    localStorage.setItem("presupuesto", presupuesto ?? 0);
  }, [presupuesto]);

  useEffect(() => {
    localStorage.setItem("gastos", JSON.stringify(gastos));
  }, [gastos]);

  useEffect(() => {
    if (filtro) {
      const gastosFiltrados = gastos.filter(
        (gasto) => gasto.categoria === filtro
      );
      setGastosFiltrados(gastosFiltrados);
    }
  }, [filtro]);

  useEffect(() => {
    const presupuestoLS = Number(localStorage.getItem("presupuesto")) ?? 0;
    if (presupuestoLS > 0) {
      setIsValPresupuesto(true);
    }
  }, []);
  return (
    <div className={OpenModal ? "fijar" : ""}>
      <Header
        gastos={gastos}
        setGastos={setGastos}
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        isValPresupuesto={isValPresupuesto}
        setIsValPresupuesto={setIsValPresupuesto}
      />

      {isValPresupuesto && (
        <>
          <main>
            <Filtro filtro={filtro} setFiltro={setFiltro} />
            <ListadoGastos
              gastos={gastos}
              setGastoEditar={setGastoEditar}
              eliminarGasto={eliminarGasto}
              filtro={filtro}
              gastosFiltrados={gastosFiltrados}
            />
          </main>
          <div className="nuevo-gasto">
            <img
              src={IconNuevogasto}
              alt="icono de nuevo gasto"
              onClick={handelNuevogasto}
            />
          </div>
        </>
      )}

      {OpenModal && (
        <Modal
          toggleModal={handelNuevogasto}
          animateModal={animateModal}
          guardarGastos={guardarGastos}
          gastoEditar={gastoEditar}
        />
      )}
    </div>
  );
}

export default App;
