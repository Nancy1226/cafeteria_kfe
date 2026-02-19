import React, { useMemo } from "react";
import TableProducts from "../organisms/Inventario/TableProducts";
import TableToolbar from "../organisms/Inventario/TableToolbar";

function InventarioLayout({
  search,
  onSearchChange,
  products = [],
  onNew,
  onEdit,
  onDelete,
}) {
  const filteredData = useMemo(() => {
    const text = (search ?? "").trim().toLowerCase();

    if (!text) return products;

    return products.filter((p) => {
      const title = (p.titleCard ?? "").toLowerCase();
      const desc = (p.descriptionCard ?? "").toLowerCase();
      const category = (p.nameTD ?? "").toLowerCase();

      return (
        title.includes(text) ||
        desc.includes(text) ||
        category.includes(text)
      );
    });
  }, [search, products]);

  return (
    <>
      <TableToolbar
        search={search}
        onSearchChange={onSearchChange}
        onNew={onNew}
      />

      <TableProducts
        items={filteredData}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    </>
  );
}

export default InventarioLayout;
