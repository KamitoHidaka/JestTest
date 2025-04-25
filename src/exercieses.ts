export interface Trabajo {
  tipoContrato: string;
  horasTrabajadas: {
      tipo: string;
      cantidad: number;
  }[];
  pagoBasePorHora: number;
}

const PORCENTAJE_PENSION = 0.16;
const PORCENTAJE_SALUD = 0.12;
const PORCENTAJE_ARL = 0.00522;
const RECARGO_DOMINICAL = 1.75;
const RECARGO_NOCTURNO = 1.35;
const SEMANAS_POR_MES = 4;
const HORAS_MINIMAS = 20;
const HORAS_MAXIMAS = 48;

export function calcularPagoBruto(trabajo: Trabajo): number {
  return trabajo.horasTrabajadas.reduce((total, hora) => {
      let pagoPorHora = trabajo.pagoBasePorHora;
      if (hora.tipo === "Dominical") pagoPorHora *= RECARGO_DOMINICAL;
      else if (hora.tipo === "Nocturna") pagoPorHora *= RECARGO_NOCTURNO;

      return total + (hora.cantidad * SEMANAS_POR_MES * pagoPorHora);
  }, 0);
}

export function calcularDescuentosSeguridadSocial(pagoBruto: number): number {
  return pagoBruto * (PORCENTAJE_PENSION + PORCENTAJE_SALUD + PORCENTAJE_ARL);
}

export function calcularPagoTotal(trabajo: Trabajo): string {
  const pagoBruto = calcularPagoBruto(trabajo);
  const descuentoSeguridad = calcularDescuentosSeguridadSocial(pagoBruto);
  const pagoTotal = pagoBruto - descuentoSeguridad;
  return `$${pagoTotal.toLocaleString("es-CO")} COP`;
}

const ejemploTrabajo: Trabajo = {
  tipoContrato: "Tiempo Completo",
  pagoBasePorHora: 10000, // en COP
  horasTrabajadas: [
    { tipo: "Normal", cantidad: 30 },
    { tipo: "Dominical", cantidad: 5 },
    { tipo: "Nocturna", cantidad: 5 }
  ]
};

const pagoBruto = calcularPagoBruto(ejemploTrabajo);
const descuentos = calcularDescuentosSeguridadSocial(pagoBruto);
const pagoNeto = calcularPagoTotal(ejemploTrabajo);

console.log("Pago bruto:", `$${pagoBruto.toLocaleString("es-CO")} COP`);
console.log("Descuentos seguridad social:", `$${descuentos.toLocaleString("es-CO")} COP`);
console.log("Pago total neto:", pagoNeto);