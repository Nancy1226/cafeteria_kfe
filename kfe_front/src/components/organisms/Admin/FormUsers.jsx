import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import "./formUsers.css";

function FormUsers({ initialValues, onSubmit, onCancel, isEdit }) {
  const validate = (values) => {
    const errors = {};

    if (!values.name?.trim()) {
      errors.name = "Nombre requerido";
    }

    if (!values.email?.trim()) {
      errors.email = "Correo requerido";
    } else if (!/^\S+@\S+\.\S+$/.test(values.email)) {
      errors.email = "Correo inválido";
    }

    if (!values.role?.trim()) {
      errors.role = "Rol requerido";
    }

    return errors;
  };

  return (
    <Formik
      initialValues={initialValues}
      validate={validate}
      onSubmit={onSubmit}
      enableReinitialize
    >
      {({ isSubmitting }) => (
        <Form className="form__container">
          <div className="form__header">
            <h3 className="form__title">
              {isEdit ? "Editar Usuario" : "Nuevo Usuario"}
            </h3>
          </div>

          <div className="form__grid form__grid__users">
            <div className="field">
              <label>Nombre *</label>
              <Field
                name="name"
                placeholder="Ej: Nancy Jiménez"
                className="input"
              />
              <ErrorMessage
                name="name"
                component="small"
                className="error"
              />
            </div>

            <div className="field">
              <label>Rol *</label>
              <Field as="select" name="role" className="input">
                <option value="">Seleccionar</option>
                <option value="Administrador">Administrador</option>
                <option value="Gerente">Gerente</option>
                <option value="Cajera">Cajera</option>
              </Field>
              <ErrorMessage
                name="role"
                component="small"
                className="error"
              />
            </div>

            <div className="field field__full">
              <label>Correo *</label>
              <Field
                name="email"
                placeholder="correo@cafeteria.com"
                className="input"
              />
              <ErrorMessage
                name="email"
                component="small"
                className="error"
              />
            </div>
          </div>

          <div className="form__actions">
            <button
              type="button"
              className="btn btn__ghost"
              onClick={onCancel}
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="btn btn__primary"
              disabled={isSubmitting}
            >
              {isEdit ? "Guardar" : "Crear"}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default FormUsers;
