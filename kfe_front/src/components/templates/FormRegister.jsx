import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from '../../api/routes.js';
import Swal from "sweetalert2";
import axios from "axios";
import "./forms.css";


function FormRegister() {
  const navigate = useNavigate();

  const validate = (values) => {
    const errors = {};
    const name = (values.name ?? "").trim();
    const email = (values.email ?? "").trim();
    const password = values.password ?? "";
    const rol = values.rol ?? "";

    if (!name) errors.name = "Ingresa tu nombre";
    else if (name.length < 3) errors.name = "Mínimo 3 caracteres";

    if (!email) errors.email = "Ingresa tu correo";
    else if (!/^\S+@\S+\.\S+$/.test(email)) errors.email = "Correo inválido";

    if (!password) errors.password = "Ingresa una contraseña";
    else if (password.length < 6) errors.password = "Mínimo 6 caracteres";

    if (!rol) errors.rol = "Selecciona un rol";
    else if (!["admin", "cajero"].includes(rol))
      errors.rol = "Rol inválido";

    return errors;
  };


  const onSubmit = async (values, actions) => {
    try {
      actions.setSubmitting(true);

      const payload = {
        nombre: values.name.trim(),
        email: values.email.trim(),
        password: values.password,
        rol: values.rol
      };

      const res = await registerUser(payload);
      
      Swal.fire({
        icon: "success",
        title: "Cuenta creada",
        text: res.data?.message ?? "Ya puedes iniciar sesión",
        timer: 1500,
        showConfirmButton: false,
      });

      navigate("/");
    } catch (error) {
      const msg =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        "No se pudo registrar";

      Swal.fire({ icon: "error", title: "Error en registro", text: msg });
    } finally {
      actions.setSubmitting(false);
    }
  };

  return (
    <div className="auth__container">
      <div className="auth__card">
        <h2 className="auth__title">Cafetería KFE</h2>
        <p className="auth__subtitle">Crea tu cuenta</p>

        <Formik
          initialValues={{ name: "", email: "", password: "", rol: "cajero" }}
          validate={validate}
          onSubmit={onSubmit}
          validateOnBlur
          validateOnChange={false}
        >
          {({ isSubmitting }) => (
            <Form className="auth__form">
              <div className="auth__field">
                <label className="auth__label">Nombre</label>
                <Field name="name" className="auth__input" placeholder="Tu nombre" />
                <ErrorMessage name="name" component="small" className="auth__error" />
              </div>

              <div className="auth__field">
                <label className="auth__label">Correo</label>
                <Field name="email" type="email" className="auth__input" placeholder="correo@..." />
                <ErrorMessage name="email" component="small" className="auth__error" />
              </div>

              <div className="auth__field">
                <label className="auth__label">Contraseña</label>
                <Field name="password" type="password" className="auth__input" placeholder="********" />
                <ErrorMessage name="password" component="small" className="auth__error" />
              </div>

              <div className="auth__field">
                <label className="auth__label">Rol</label>
                <Field as="select" name="rol" className="auth__input">
                  <option value="">Selecciona un rol</option>
                  <option value="admin">Administrador</option>
                  <option value="cajero">Cajero</option>
                </Field>
                <ErrorMessage name="rol" component="small" className="auth__error" />
              </div>


              <button type="submit" className="auth__btn" disabled={isSubmitting}>
                {isSubmitting ? "Creando..." : "Registrarme"}
              </button>

              <p className="auth__footer">
                ¿Ya tienes cuenta?{" "}
                <Link className="auth__link" to="/">
                  Inicia sesión
                </Link>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default FormRegister;
