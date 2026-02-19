import jsPDF from "jspdf";

// helper interno
const round2 = (n) =>
  Math.round((Number(n) + Number.EPSILON) * 100) / 100;

function generarTicketPDF({
  folio,
  fecha,
  items,
  subtotal,
  iva,
  total,
  pagado,
  cambio,
}) {
  const doc = new jsPDF({
    unit: "mm",
    format: [80, 200], // 👈 formato tipo ticket (80mm ancho)
  });

  let y = 8;

  doc.setFontSize(12);
  doc.text("KFE CAFETERÍA", 40, y, { align: "center" });
  y += 5;

  doc.setFontSize(9);
  doc.text(`Folio: ${folio}`, 5, y);
  y += 4;
  doc.text(`Fecha: ${fecha}`, 5, y);
  y += 6;

  doc.line(5, y, 75, y);
  y += 4;

  items.forEach((it) => {
    doc.setFontSize(9);
    doc.text(`${it.nombre}`, 5, y);
    y += 4;

    doc.setFontSize(8);
    doc.text(
      `${it.cantidad} x $${round2(it.precio_unitario).toFixed(2)}`,
      5,
      y
    );

    doc.text(
      `$${round2(it.subtotal).toFixed(2)}`,
      75,
      y,
      { align: "right" }
    );

    y += 5;
  });

  doc.line(5, y, 75, y);
  y += 5;

  doc.setFontSize(9);
  doc.text("Subtotal:", 5, y);
  doc.text(`$${round2(subtotal).toFixed(2)}`, 75, y, { align: "right" });
  y += 5;

  doc.text("IVA (16%):", 5, y);
  doc.text(`$${round2(iva).toFixed(2)}`, 75, y, { align: "right" });
  y += 6;

  doc.setFontSize(11);
  doc.text("TOTAL:", 5, y);
  doc.text(`$${round2(total).toFixed(2)}`, 75, y, { align: "right" });
  y += 8;

  doc.setFontSize(9);
  doc.text("Pagó:", 5, y);
  doc.text(`$${round2(pagado).toFixed(2)}`, 75, y, { align: "right" });
  y += 5;

  doc.text("Cambio:", 5, y);
  doc.text(`$${round2(cambio).toFixed(2)}`, 75, y, { align: "right" });
  y += 8;

  doc.setFontSize(9);
  doc.text("Gracias por su compra ✨", 40, y, { align: "center" });

    const newTab = window.open("", "_blank");
    const blob = doc.output("blob");
    const url = URL.createObjectURL(blob);
    newTab.location.href = url;
    setTimeout(() => URL.revokeObjectURL(url), 60_000);

}

export default generarTicketPDF;
