import { useEffect, useMemo, useState } from "react";
import TopBar from "../components/organisms/Shoppie/TopBar/TopBar.jsx";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { getVentasPorFechas, getTopProductos, getGraficaVentas } from "../api/routes.js";
import "./ventasReporte.css";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function VentasReporte() {
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [ventasPeriodo, setVentasPeriodo] = useState([]);
  const [topProductos, setTopProductos] = useState([]);
  const [graficaData, setGraficaData] = useState([]);
  const [loadingPeriodo, setLoadingPeriodo] = useState(false);
  const [errorPeriodo, setErrorPeriodo] = useState("");

  const navigate = useNavigate();

  const formatFecha = (value) => {
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return String(value ?? "");
    return d.toLocaleString("es-MX", {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const fetchVentasPorFechas = async () => {
    setErrorPeriodo("");
    if (!fechaInicio || !fechaFin) return setErrorPeriodo("Selecciona fecha inicio y fin.");
    if (fechaFin <= fechaInicio) return setErrorPeriodo("La fecha fin no puede ser menor que la inicio.");

    try {
      setLoadingPeriodo(true);
      const res = await getVentasPorFechas(fechaInicio, fechaFin);
      setVentasPeriodo(res.data);
    } catch (e) {
      console.error(e);
      setErrorPeriodo("No se pudieron cargar las ventas del periodo.");
    } finally {
      setLoadingPeriodo(false);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const [top, graf] = await Promise.all([getTopProductos(), getGraficaVentas()]);
        setTopProductos(top.data);
        setGraficaData(graf.data);
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  const chartData = useMemo(() => {
    const labels = graficaData.map((i) => i.nombre);
    const values = graficaData.map((i) => Number(i.total ?? 0));
    return {
      labels,
      datasets: [{ label: "Ventas por Producto", data: values, backgroundColor: "#8B4513" }],
    };
  }, [graficaData]);

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Cerrar sesión",
      text: "¿Seguro que quieres salir?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, salir",
      cancelButtonText: "Cancelar",
    });
    if (!result.isConfirmed) return;
    localStorage.removeItem("token");
    localStorage.removeItem("loggedUser");
    navigate("/", { replace: true });
  };

  const getTodayLocal = () => {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
    };

    const [today] = useState(getTodayLocal());


  return (
    <>
      <TopBar
        nameCoffeShop="Cafeteria KFE"
        goToVentas={() => navigate("/ventas")}
        goToInventario={() => navigate("/inventario")}
        goToGrapics={() => navigate("/reportes")}
        onLogout={handleLogout}
      />

      <main className="rs__wrap">
        <header className="rs__header">
          <div>
            <h2 className="rs__title">Reportes de ventas</h2>
            <p className="rs__sub">Filtra por fechas y revisa productos más vendidos.</p>
          </div>
        </header>

        {/* Filtro */}
        <section className="rs__panel">
        <div className="rs__filters">
        <div className="rs__field">
            <label>Desde</label>
            <input
            type="date"
            value={fechaInicio}
            max={today} 
            onChange={(e) => {
                const v = e.target.value;
                setFechaInicio(v);


                if (fechaFin && fechaFin < v) setFechaFin(v);
            }}
            />
        </div>

        <div className="rs__field">
            <label>Hasta</label>
            <input
            type="date"
            value={fechaFin}
            min={fechaInicio || ""} 
            max={today}             
            onChange={(e) => setFechaFin(e.target.value)}
            />
        </div>

        <button
            className="rs__btn"
            onClick={fetchVentasPorFechas}
            disabled={loadingPeriodo}
        >
            {loadingPeriodo ? "Cargando..." : "Buscar"}
        </button>
        </div>


          {errorPeriodo && <p className="rs__error">{errorPeriodo}</p>}
        </section>

        {/* Tabla */}
        <section className="rs__panel">
          <div className="rs__panelHead">
            <h3>Ventas en el periodo</h3>
            <span className="rs__muted">{ventasPeriodo.length} registro(s)</span>
          </div>

          {ventasPeriodo.length === 0 ? (
            <p className="rs__muted">No hay ventas para el rango seleccionado.</p>
          ) : (
            <div className="rs__tableWrap">
              <table className="rs__table">
                <thead>
                  <tr>
                    <th>Venta</th>
                    <th>Fecha</th>
                    <th>Producto</th>
                    <th>Cant.</th>
                    <th>Precio</th>
                    <th>Cajero</th>
                  </tr>
                </thead>
                <tbody>
                  {ventasPeriodo.map((v, idx) => (
                    <tr key={`${v.venta_id}-${v.producto}-${idx}`}>
                      <td>#{v.venta_id}</td>
                      <td className="rs__mono">{formatFecha(v.fecha)}</td>
                      <td className="rs__strong">{v.producto}</td>
                      <td>{v.cantidad}</td>
                      <td className="rs__mono">${Number(v.precio_unitario).toFixed(2)}</td>
                      <td>{v.cajero}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>


        <section className="rs__grid">
          <div className="rs__panel">
            <div className="rs__panelHead">
              <h3>Top 3 productos</h3>
              <span className="rs__muted">más vendidos</span>
            </div>

            {topProductos.length === 0 ? (
              <p className="rs__muted">No hay datos.</p>
            ) : (
              <ul className="rs__list">
                {topProductos.map((p, i) => (
                  <li key={p.producto_id ?? p.id ?? i} className="rs__listItem">
                    <span className="rs__rank">{i + 1}</span>
                    <div className="rs__listMain">
                      <p className="rs__strong">{p.nombre}</p>
                      <p className="rs__muted">{Number(p.cantidad_vendida ?? 0)} vendidos</p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="rs__panel">
            <div className="rs__panelHead">
              <h3>Gráfica</h3>
              <span className="rs__muted">ventas por producto</span>
            </div>
            <div className="rs__chart">
              <Bar data={chartData} />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default VentasReporte;
