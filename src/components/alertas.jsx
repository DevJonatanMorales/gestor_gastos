/*eslint-disable*/
export const Alertas = ({children, tipo}) => {
  return (
    <div className={`alerta ${tipo }`}>{children}</div>
  )
}
