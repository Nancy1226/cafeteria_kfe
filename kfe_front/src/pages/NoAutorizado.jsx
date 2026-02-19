import { useNavigate } from "react-router-dom";

function NoAutorizado() {
  const navigate = useNavigate();

  const styles = {
    container: {
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#f7f5f0",
      fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    },
    card: {
      backgroundColor: "#ffffff",
      padding: "40px",
      borderRadius: "16px",
      boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
      textAlign: "center",
      maxWidth: "400px",
      width: "100%",
    },
    title: {
      fontSize: "64px",
      margin: "0",
      color: "#c0392b",
    },
    subtitle: {
      margin: "10px 0",
      fontSize: "22px",
      color: "#1f1f1f",
    },
    text: {
      fontSize: "14px",
      color: "#6e6e6e",
      marginBottom: "24px",
    },
    buttons: {
      display: "flex",
      gap: "12px",
      justifyContent: "center",
    },
    primaryButton: {
      backgroundColor: "#2c3e50",
      color: "#ffffff",
      border: "none",
      padding: "10px 18px",
      borderRadius: "8px",
      cursor: "pointer",
    },
    secondaryButton: {
      backgroundColor: "#e0e0e0",
      border: "none",
      padding: "10px 18px",
      borderRadius: "8px",
      cursor: "pointer",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>403</h1>
        <h2 style={styles.subtitle}>Acceso no autorizado</h2>

        <p style={styles.text}>
          No tienes permisos para acceder a esta sección.
          Si crees que esto es un error, contacta al administrador.
        </p>

        <div style={styles.buttons}>
          <button
            style={styles.secondaryButton}
            onClick={() => navigate(-1)}
          >
            Volver
          </button>
        </div>
      </div>
    </div>
  );
}

export default NoAutorizado;
