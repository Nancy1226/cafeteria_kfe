import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import "./formProducts.css";

function FromProducts({ initialValues, onSubmit, onCancel, isEdit }) {
  const validate = (values) => {
    const errors = {};

    // Nombre
    const title = (values.titleCard ?? "").trim();
    if (!title) errors.titleCard = "Nombre requerido";
    else if (title.length < 3) errors.titleCard = "Mínimo 3 caracteres";

    // Precio
    const rawPrice = values.price;
    const priceNum = Number(rawPrice);
    if (rawPrice === "" || rawPrice === null || rawPrice === undefined) {
      errors.price = "Precio requerido";
    } else if (Number.isNaN(priceNum)) {
      errors.price = "Precio inválido";
    } else if (priceNum <= 0) {
      errors.price = "Debe ser mayor a 0";
    }

    // Categoría
    const cat = (values.nameTD ?? "").trim();
    if (!cat) errors.nameTD = "Categoría requerida";

    // Descripción (opcional)
    const desc = (values.descriptionCard ?? "").trim();
    if (desc && desc.length < 10) {
      errors.descriptionCard = "Si agregas descripción, mínimo 10 caracteres";
    }

    // Imagen
    const src = (values.src ?? "").trim();
    if (!src) {
      errors.src = "URL o ruta de imagen requerida";
    } else {
      const isHttpUrl = /^https?:\/\/.+/i.test(src);
      const isLocalPath = /^\/.+/i.test(src); // /images/x.jpg
      if (!isHttpUrl && !isLocalPath) {
        errors.src = "Usa http(s)://... o una ruta tipo /images/...";
      }
    }

    return errors;
  };

  return (
    <Formik
      initialValues={initialValues}
      validate={validate}
      onSubmit={onSubmit}
      enableReinitialize
      validateOnBlur={true}
      validateOnChange={false}
    >
      {({ isSubmitting }) => (
        <Form className="form__container">
          <div className="form__header">
            <h3 className="form__title">{isEdit ? "Editar Producto" : "Nuevo Producto"}</h3>
          </div>

          <div className="form__grid">
            <div className="field">
              <label>Nombre *</label>
              <Field name="titleCard" className="input" placeholder="Ej: Cappuccino" />
              <ErrorMessage name="titleCard" component="small" className="error" />
            </div>

            <div className="field">
              <label>Precio *</label>
              <Field name="price" type="number" step="0.01" className="input" placeholder="0.00" />
              <ErrorMessage name="price" component="small" className="error" />
            </div>

            <div className="field">
              <label>Categoría *</label>
              <Field as="select" name="nameTD" className="input">
                <option value="">Seleccionar</option>
                <option value="Bebidas">Bebidas</option>
                <option value="Postres">Postres</option>
                <option value="Panadería">Panadería</option>
              </Field>
              <ErrorMessage name="nameTD" component="small" className="error" />
            </div>

            <div className="field field__full">
              <label>Descripción</label>
              <Field
                as="textarea"
                name="descriptionCard"
                className="textarea"
                placeholder="Breve descripción (opcional)"
              />
              <ErrorMessage name="descriptionCard" component="small" className="error" />
            </div>

            <div className="field field__full">
              <label>URL / Ruta Imagen *</label>
              <Field name="src" className="input" placeholder="https://... o /images/..." />
              <ErrorMessage name="src" component="small" className="error" />
            </div>
          </div>

          <div className="form__actions">
            <button type="button" className="btn btn__ghost" onClick={onCancel}>
              Cancelar
            </button>
            <button type="submit" className="btn btn__primary" disabled={isSubmitting}>
              {isEdit ? "Guardar" : "Crear"}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default FromProducts;
