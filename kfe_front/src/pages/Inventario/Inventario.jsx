import { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./inventario.css";
import InventarioLayout from "../../components/templates/InventarioLayout";
import TopBar from "../../components/organisms/Shoppie/TopBar/TopBar";
import FromProducts from "../../components/organisms/Inventario/FromProducts";
import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getAllCategories,
} from "../../api/routes.js";

const formatPrice = (n) => {
  const num = Number(n);
  if (!Number.isFinite(num)) return "$0.00";
  return `$${num.toFixed(2)}`;
};


function mapApiToUI(p) {
  const priceNum = Number(p.precio);
  const qtyNum = Number(p.stock ?? 0);

  return {
    id: p.id,
    src: p.imagen_url ?? "",
    titleCard: p.nombre ?? "",
    descriptionCard: p.descripcion ?? "",
    nameTD: p.categoria ?? "", // nombre visible
    categoria_id: p.categoria_id ?? "", // id real para editar/guardar
    price: Number.isFinite(priceNum) ? priceNum : "",
    namePriceTable: formatPrice(priceNum),
    quantity: Number.isFinite(qtyNum) ? qtyNum : 0,
    activo: Boolean(p.activo),
  };
}


function mapUIToApi(values, fallbackCategoriaId = null) {
  const categoriaId =
    values.categoria_id !== undefined &&
    values.categoria_id !== null &&
    values.categoria_id !== ""
      ? Number(values.categoria_id)
      : fallbackCategoriaId;

  return {
    nombre: (values.titleCard ?? "").trim(),
    descripcion: (values.descriptionCard ?? "").trim() || null,
    precio: Number(values.price),
    stock: Number(values.quantity || 0),
    imagen_url: (values.src ?? "").trim() || null,
    categoria_id: Number.isFinite(categoriaId) ? categoriaId : null,
  };
}

function Inventario() {
  const navigate = useNavigate();

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


  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);

  const [categories, setCategories] = useState([]); // [{id, nombre}]

  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const loadProducts = async () => {
    try {
      const res = await getAllProducts();
      const data = Array.isArray(res.data) ? res.data : (res.data?.data ?? []);
      setProducts((Array.isArray(data) ? data : []).map(mapApiToUI));
    } catch (e) {
      Swal.fire(
        "Error",
        e?.response?.data?.message ?? "No se pudieron cargar productos",
        "error",
      );
    }
  };

  const loadCategories = async () => {
    try {
      const res = await getAllCategories();
      const data = Array.isArray(res.data) ? res.data : (res.data?.data ?? []);
      const normalized = (Array.isArray(data) ? data : []).map((c) => ({
        id: c.id,
        nombre: c.nombre ?? c.name ?? c.categoria ?? "",
      }));
      setCategories(normalized);
    } catch (e) {
      Swal.fire(
        "Aviso",
        e?.response?.data?.message ?? "No se pudieron cargar categorías",
        "warning",
      );
    }
  };

  useEffect(() => {
    loadProducts();
    loadCategories();
  }, []);

  useEffect(() => {
    if (showProductForm) {
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    }
  }, [showProductForm]);

  const filteredProducts = useMemo(() => {
    const text = (search ?? "").trim().toLowerCase();
    if (!text) return products;

    return products.filter((p) => {
      const nombre = (p.titleCard ?? "").toLowerCase();
      const desc = (p.descriptionCard ?? "").toLowerCase();
      const catName = (p.nameTD ?? "").toLowerCase();
      return (
        nombre.includes(text) || desc.includes(text) || catName.includes(text)
      );
    });
  }, [search, products]);

  const productInitialValues = useMemo(() => {
    if (!editingProduct) {
      return {
        titleCard: "",
        price: "",
        quantity: "",
        descriptionCard: "",
        src: "",
        categoria_id: "", 
      };
    }

    return {
      titleCard: editingProduct.titleCard ?? "",
      price: editingProduct.price ?? "",
      quantity: editingProduct.quantity ?? 0,
      descriptionCard: editingProduct.descriptionCard ?? "",
      src: editingProduct.src ?? "",
      categoria_id: editingProduct.categoria_id ?? "",
    };
  }, [editingProduct]);

  const handleNew = () => {
    setEditingProduct(null);
    setShowProductForm(true);
  };

  const handleEdit = (id) => {
    const found = products.find((p) => p.id === id);
    if (!found) return;
    setEditingProduct(found);
    setShowProductForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Seguro que deseas eliminar este producto?")) return;

    try {
      await deleteProduct(id);
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (e) {
      Swal.fire(
        "Error",
        e?.response?.data?.message ?? "No se pudo eliminar",
        "error",
      );
    }
  };

  const submitProduct = async (values, helpers) => {
    try {
      const payload = mapUIToApi(values, editingProduct?.categoria_id ?? null);

      if (!payload.nombre) throw new Error("Nombre requerido");
      if (!Number.isFinite(payload.precio)) throw new Error("Precio inválido");
      if (!Number.isFinite(payload.stock)) payload.stock = 0;

      if (editingProduct) {
        await updateProduct(editingProduct.id, payload);
      } else {
        await createProduct(payload);
      }

      await loadProducts();

      setShowProductForm(false);
      setEditingProduct(null);

      Swal.fire({
        icon: "success",
        title: editingProduct ? "Producto actualizado" : "Producto creado",
        timer: 1200,
        showConfirmButton: false,
      });
    } catch (e) {
      Swal.fire(
        "Error",
        e?.response?.data?.message ?? e.message ?? "No se pudo guardar",
        "error",
      );
    } finally {
      helpers.setSubmitting(false);
    }
  };

  return (
    <>
      <TopBar
        nameCoffeShop="Cafeteria KFE"
        goToVentas={() => navigate("/ventas")}
        goToInventario={() => navigate("/inventario")}
        goToGrapics={() => navigate("/reportes")}
        onLogout={handleLogout}
      />

      <div className="container__admin">
        <InventarioLayout
          search={search}
          onSearchChange={setSearch}
          products={filteredProducts}
          onNew={handleNew}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        {showProductForm && (
          <div className="section__form">
            <FromProducts
              initialValues={productInitialValues}
              isEdit={!!editingProduct}
              onCancel={() => setShowProductForm(false)}
              onSubmit={submitProduct}
              categories={categories}
            />
          </div>
        )}
      </div>
    </>
  );
}

export default Inventario;
