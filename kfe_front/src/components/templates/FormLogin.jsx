import React, { useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { loginUser } from '../../api/routes.js';
import UserContext from "../../context/UserContext.jsx";
import "./forms.css";

function FormLogin() {
  const { setIsLoged, setUserName } = useContext(UserContext);
  const navigate = useNavigate();

  const validate = (values) => {
    const errors = {};
    const email = (values.email ?? "").trim();
    const password = values.password ?? "";

    if (!email) errors.email = "Ingresa tu correo";
    else if (!/^\S+@\S+\.\S+$/.test(email)) errors.email = "Correo inválido";

    if (!password) errors.password = "Ingresa tu contraseña";
    else if (password.length < 4) errors.password = "Mínimo 4 caracteres";

    return errors;
  };

  const onSubmit = async (values, actions) => {
    try {
      actions.setSubmitting(true);

      const payload = { email: values.email.trim(), password: values.password };

      const res = await loginUser(payload);
      const token = res.data?.token;
      const user = res.data?.user ?? res.data;
      
      if (token) localStorage.setItem("token", token);
      localStorage.setItem("loggedUser", JSON.stringify(user));

      setIsLoged(true);
      setUserName(user?.name ?? user?.email ?? "Usuario");

      navigate("/ventas");
    } catch (error) {
      console.log("LOGIN ERROR:", error);
  console.log("STATUS:", error?.response?.status);
  console.log("DATA:", error?.response?.data);
      const msg =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        "Correo o contraseña incorrectos";

      Swal.fire({ icon: "error", title: "No se pudo iniciar sesión", text: msg });
    } finally {
      actions.setSubmitting(false);
    }
  };

  return (
    <div className="auth__container">
      <div className="auth__card">
        <h2 className="auth__title">Cafetería KFE</h2>
        <p className="auth__subtitle">Inicia sesión para continuar</p>

        <Formik
          initialValues={{ email: "", password: "" }}
          validate={validate}
          onSubmit={onSubmit}
          validateOnBlur
          validateOnChange={false}
        >
          {({ isSubmitting }) => (
            <Form className="auth__form">
              <div className="auth__field">
                <label className="auth__label">Correo</label>
                <Field
                  name="email"
                  type="email"
                  className="auth__input"
                  placeholder="correo@cafeteria.com"
                />
                <ErrorMessage name="email" component="small" className="auth__error" />
              </div>

              <div className="auth__field">
                <label className="auth__label">Contraseña</label>
                <Field
                  name="password"
                  type="password"
                  className="auth__input"
                  placeholder="********"
                />
                <ErrorMessage name="password" component="small" className="auth__error" />
              </div>

              <button type="submit" className="auth__btn" disabled={isSubmitting}>
                {isSubmitting ? "Iniciando..." : "Iniciar sesión"}
              </button>

              <p className="auth__footer">
                ¿No tienes cuenta?{" "}
                <Link className="auth__link" to="/registro">
                  Regístrate
                </Link>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default FormLogin;
