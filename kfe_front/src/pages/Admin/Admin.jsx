import { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./admin.css";
import AdminLayout from "../../components/templates/Admin/AdminLayout";
import TopBar from "../../components/organisms/Shoppie/TopBar/TopBar";
import FromProducts from "../../components/organisms/Admin/FromProducts";
import FormUsers from "../../components/organisms/Admin/FormUsers";

function Admin() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const [active, setActive] = useState("productos");
  const [search, setSearch] = useState("");

  const [products, setProducts] = useState([
    {
      id: 1,
      src: "https://images.pexels.com/photos/18238543/pexels-photo-18238543.jpeg",
      titleCard: "Café de la Esquina",
      descriptionCard: "Café recién preparado.",
      nameTD: "Bebidas",
      namePriceTable: "$2.50",
      price: 2.5,
    },
  ]);

  const [users, setUsers] = useState([
    { id: 1, name: "Nancy Jiménez", role: "Administrador", email: "nancy@cafeteria.com" },
  ]);

  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const [showUserForm, setShowUserForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    if (showProductForm || showUserForm) {
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    }
  }, [showProductForm, showUserForm]);

  const productInitialValues = useMemo(() => {
    if (!editingProduct) {
      return { titleCard: "", price: "", nameTD: "", descriptionCard: "", src: "" };
    }
    return editingProduct;
  }, [editingProduct]);

  const userInitialValues = useMemo(() => {
    if (!editingUser) return { name: "", role: "", email: "" };
    return editingUser;
  }, [editingUser]);

  const handleNew = () => {
    if (active === "productos") {
      setEditingProduct(null);
      setShowProductForm(true);
      setShowUserForm(false);
      return;
    }

    setEditingUser(null);
    setShowUserForm(true);
    setShowProductForm(false);
  };

  const handleEdit = (id) => {
    if (active === "productos") {
      const found = products.find((p) => p.id === id);
      if (!found) return;
      setEditingProduct(found);
      setShowProductForm(true);
      return;
    }

    const found = users.find((u) => u.id === id);
    if (!found) return;
    setEditingUser(found);
    setShowUserForm(true);
  };

  const handleDelete = (id) => {
    if (!window.confirm("¿Seguro que deseas eliminar este registro?")) return;

    if (active === "productos") {
      setProducts((prev) => prev.filter((p) => p.id !== id));
      return;
    }

    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  const submitProduct = (values, helpers) => {
    const priceNum = Number(values.price);

    if (editingProduct) {
      setProducts((prev) =>
        prev.map((p) =>
          p.id === editingProduct.id
            ? { ...p, ...values, price: priceNum, namePriceTable: `$${priceNum.toFixed(2)}` }
            : p
        )
      );
    } else {
      setProducts((prev) => [
        {
          id: Date.now(),
          ...values,
          price: priceNum,
          namePriceTable: `$${priceNum.toFixed(2)}`,
        },
        ...prev,
      ]);
    }

    helpers.setSubmitting(false);
    setShowProductForm(false);
    setEditingProduct(null);
  };

  const submitUser = (values, helpers) => {
    if (editingUser) {
      setUsers((prev) =>
        prev.map((u) => (u.id === editingUser.id ? { ...u, ...values } : u))
      );
    } else {
      setUsers((prev) => [{ id: Date.now(), ...values }, ...prev]);
    }

    helpers.setSubmitting(false);
    setShowUserForm(false);
    setEditingUser(null);
  };

  return (
    <>
      <TopBar
        nameCoffeShop="Cafeteria KFE"
        roleUser="administrador"
        handleLogout={handleLogout}
      />

      <div className="container__admin">
        <AdminLayout
          active={active}
          onChangeActive={setActive}
          onTabChange={() => {
            setSearch("");
            setShowProductForm(false);
            setEditingProduct(null);
            setShowUserForm(false);
            setEditingUser(null);
          }}
          search={search}
          onSearchChange={setSearch}
          products={products}
          users={users}
          onNew={handleNew}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        {active === "productos" && showProductForm && (
          <div className="section__form">
            <FromProducts
              initialValues={productInitialValues}
              isEdit={!!editingProduct}
              onCancel={() => setShowProductForm(false)}
              onSubmit={submitProduct}
            />
          </div>
        )}

        {active === "usuarios" && showUserForm && (
          <div className="section__form">
            <FormUsers
              initialValues={userInitialValues}
              isEdit={!!editingUser}
              onCancel={() => setShowUserForm(false)}
              onSubmit={submitUser}
            />
          </div>
        )}
      </div>
    </>
  );
}

export default Admin;
