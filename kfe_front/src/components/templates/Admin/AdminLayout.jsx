import React, { useMemo } from "react";
import TableProducts from "../../organisms/Admin/TableProducts";
import TableUsers from "../../organisms/Admin/TableUsers";
import TableToolbar from "../../organisms/Admin/TableToolbar";

function AdminLayout({
  active,
  onChangeActive,
  onTabChange,
  search,
  onSearchChange,
  products = [],
  users = [],
  onNew,
  onEdit,
  onDelete,
}) {
  const filteredData = useMemo(() => {
    const text = (search ?? "").trim().toLowerCase();

    if (!text) return active === "productos" ? products : users;

    if (active === "productos") {
      return products.filter((p) => {
        const title = (p.titleCard ?? "").toLowerCase();
        const desc = (p.descriptionCard ?? "").toLowerCase();
        const category = (p.nameTD ?? "").toLowerCase();
        return title.includes(text) || desc.includes(text) || category.includes(text);
      });
    }

    return users.filter((u) => {
      const name = (u.name ?? "").toLowerCase();
      const role = (u.role ?? "").toLowerCase();
      const email = (u.email ?? "").toLowerCase();
      return name.includes(text) || role.includes(text) || email.includes(text);
    });
  }, [active, search, products, users]);

  return (
    <>
      <TableToolbar
        active={active}
        onChangeActive={(next) => {
          onChangeActive(next);
          onTabChange?.(next);
        }}
        search={search}
        onSearchChange={onSearchChange}
        onNew={onNew}
      />

      {active === "productos" ? (
        <TableProducts items={filteredData} onEdit={onEdit} onDelete={onDelete} />
      ) : (
        <TableUsers items={filteredData} onEdit={onEdit} onDelete={onDelete} />
      )}
    </>
  );
}

export default AdminLayout;
