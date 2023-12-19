import React, { useState, useEffect } from "react";
import btnCerrar from "../img/cerrar.svg";
import { Alertas } from "./alertas";

export const Modal = ({
  toggleModal,
  animateModal,
  guardarGastos,
  gastoEditar,
}) => {
  const [mensaje, setMensaje] = useState("");

  const [nombre, setNombre] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [categoria, setCategoria] = useState("");
  const [fecha, setFecha] = useState("");
  const [id, setId] = useState("");

  const [titulo, setTitulo] = useState("Nuevo Gasto");
  const [btnTitulo, setBtnTitulo] = useState("Añadir Gasto");

  const handleSubmit = (e) => {
    e.preventDefault();
    if ([nombre, cantidad, categoria].includes("")) {
      setMensaje("Todos los campos son obligatorios");
      setTimeout(() => {
        setMensaje("");
      }, 3000);
      return;
    }

    guardarGastos({
      id,
      nombre,
      cantidad,
      categoria,
      fecha,
    });
  };

  useEffect(() => {
    if (Object.keys(gastoEditar).length) {
      const { id, nombre, cantidad, categoria, fecha } = gastoEditar;
      setId(id);
      setNombre(nombre);
      setCantidad(cantidad);
      setCategoria(categoria);
      setFecha(fecha);
      setTitulo("Editar Gasto");
      setBtnTitulo("Guardar Cambios");
    }
  }, []);
  return (
    <div className="modal">
      <div className="cerrar-modal">
        <img
          src={btnCerrar}
          alt="buton para cerrar el modal"
          onClick={toggleModal}
        />
      </div>

      <form
        className={`formulario ${animateModal ? "animar" : "cerrar"}`}
        onSubmit={handleSubmit}
      >
        <legend>{titulo}</legend>
        <div className="campo">
          <label htmlFor="nombre">Nombre Gasto</label>
          <input
            id="nombre"
            type="text"
            value={nombre}
            onChange={(e) => {
              const { value } = e.target;
              setNombre(value);
            }}
            placeholder="Añade el nombre del gasto"
          />
        </div>
        <div className="campo">
          <label htmlFor="cantidad">Cantidad</label>
          <input
            id="cantidad"
            type="number"
            value={cantidad}
            onChange={(e) => {
              const { value } = e.target;
              setCantidad(Number(value));
            }}
            placeholder="Añade la cantidad"
          />
        </div>
        <div className="campo">
          <label htmlFor="categoria">Categoria</label>
          <select
            id="categoria"
            value={categoria}
            onChange={(e) => {
              const { value } = e.target;
              setCategoria(value);
            }}
          >
            <option value="">-- Seleccione --</option>
            <option value="ahorro">Ahorro</option>
            <option value="comida">Comida</option>
            <option value="casa">Casa</option>
            <option value="gastos">Gastos Varios</option>
            <option value="ocio">Ocio</option>
            <option value="salud">Salud</option>
            <option value="suscripciones">Suscripciones</option>
          </select>
        </div>

        <input type="submit" value={btnTitulo} />
      </form>
    </div>
  );
};
