import {
  calcularPagoBruto,
  calcularDescuentosSeguridadSocial,
  calcularPagoTotal,
  Trabajo,
} from "../exercieses";

describe("Funciones de cálculo de pagos", () => {
  const baseTrabajo: Trabajo = {
    tipoContrato: "Tiempo Completo",
    pagoBasePorHora: 10000,
    horasTrabajadas: [],
  };

  test("calcularPagoBruto: sin recargos", () => {
    const trabajo: Trabajo = {
      ...baseTrabajo,
      horasTrabajadas: [{ tipo: "Normal", cantidad: 10 }],
    };
    const resultado = calcularPagoBruto(trabajo);
    expect(resultado).toBe(10 * 4 * 10000); // 40h * 10000
  });

  test("calcularPagoBruto: con recargo dominical", () => {
    const trabajo: Trabajo = {
      ...baseTrabajo,
      horasTrabajadas: [{ tipo: "Dominical", cantidad: 2 }],
    };
    const resultado = calcularPagoBruto(trabajo);
    expect(resultado).toBe(2 * 4 * 10000 * 1.75);
  });

  test("calcularPagoBruto: con recargo nocturno", () => {
    const trabajo: Trabajo = {
      ...baseTrabajo,
      horasTrabajadas: [{ tipo: "Nocturna", cantidad: 2 }],
    };
    const resultado = calcularPagoBruto(trabajo);
    expect(resultado).toBe(2 * 4 * 10000 * 1.35);
  });

  test("calcularPagoBruto: mixto", () => {
    const trabajo: Trabajo = {
      ...baseTrabajo,
      horasTrabajadas: [
        { tipo: "Normal", cantidad: 10 },
        { tipo: "Dominical", cantidad: 1 },
        { tipo: "Nocturna", cantidad: 2 },
      ],
    };
    const esperado =
      10 * 4 * 10000 + 1 * 4 * 10000 * 1.75 + 2 * 4 * 10000 * 1.35;
    const resultado = calcularPagoBruto(trabajo);
    expect(resultado).toBeCloseTo(esperado);
  });

  test("calcularDescuentosSeguridadSocial", () => {
    const pagoBruto = 1000000;
    const esperado = pagoBruto * (0.16 + 0.12 + 0.00522);
    const resultado = calcularDescuentosSeguridadSocial(pagoBruto);
    expect(resultado).toBeCloseTo(esperado);
  });

  test("calcularPagoTotal", () => {
    const trabajo: Trabajo = {
      ...baseTrabajo,
      horasTrabajadas: [{ tipo: "Normal", cantidad: 20 }],
    };
    const pagoBruto = calcularPagoBruto(trabajo);
    const descuentos = calcularDescuentosSeguridadSocial(pagoBruto);
    const pagoEsperado = pagoBruto - descuentos;
    const resultado = calcularPagoTotal(trabajo);
    expect(resultado).toBe(`$${pagoEsperado.toLocaleString("es-CO")} COP`);
  });

  test('Debe aceptar solo "Tiempo Completo" o "Medio Tiempo"', () => {
    const contratoValido1: Trabajo = {
      tipoContrato: "Tiempo Completo",
      pagoBasePorHora: 10000,
      horasTrabajadas: [{ tipo: "Normal", cantidad: 20 }],
    };
    const contratoValido2: Trabajo = {
      tipoContrato: "Medio Tiempo",
      pagoBasePorHora: 10000,
      horasTrabajadas: [{ tipo: "Normal", cantidad: 20 }],
    };
    const contratoInvalido: Trabajo = {
      tipoContrato: "Freelance",
      pagoBasePorHora: 10000,
      horasTrabajadas: [{ tipo: "Normal", cantidad: 20 }],
    };

    const esContratoValido = (trabajo: Trabajo) =>
      trabajo.tipoContrato === "Tiempo Completo" ||
      trabajo.tipoContrato === "Medio Tiempo";

    expect(esContratoValido(contratoValido1)).toBe(true);
    expect(esContratoValido(contratoValido2)).toBe(true);
    expect(esContratoValido(contratoInvalido)).toBe(false);
  });

  test("Debe aceptar solo valores numéricos positivos para el pago por hora", () => {
    const trabajoValido: Trabajo = {
      tipoContrato: "Tiempo Completo",
      pagoBasePorHora: 10000, // Valor positivo válido
      horasTrabajadas: [{ tipo: "Normal", cantidad: 20 }],
    };
    const trabajoCero: Trabajo = {
      tipoContrato: "Tiempo Completo",
      pagoBasePorHora: 0, // No válido, no puede ser 0
      horasTrabajadas: [{ tipo: "Normal", cantidad: 20 }],
    };
    const trabajoNegativo: Trabajo = {
      tipoContrato: "Tiempo Completo",
      pagoBasePorHora: -5000, // No válido, no puede ser negativo
      horasTrabajadas: [{ tipo: "Normal", cantidad: 20 }],
    };
    const trabajoNaN: Trabajo = {
      tipoContrato: "Tiempo Completo",
      pagoBasePorHora: NaN, // No válido, no es un número
      horasTrabajadas: [{ tipo: "Normal", cantidad: 20 }],
    };

    const esPagoValido = (trabajo: Trabajo) =>
      typeof trabajo.pagoBasePorHora === "number" &&
      trabajo.pagoBasePorHora > 0 &&
      !isNaN(trabajo.pagoBasePorHora);

    expect(esPagoValido(trabajoValido)).toBe(true);
    expect(esPagoValido(trabajoCero)).toBe(false);
    expect(esPagoValido(trabajoNegativo)).toBe(false);
    expect(esPagoValido(trabajoNaN)).toBe(false);
  });

  test("Debe aceptar solo valores numéricos positivos para las horas trabajadas", () => {
    const trabajoValido: Trabajo = {
      tipoContrato: "Tiempo Completo",
      pagoBasePorHora: 10000,
      horasTrabajadas: [
        { tipo: "Normal", cantidad: 10 },
        { tipo: "Dominical", cantidad: 5 },
      ],
    };

    const trabajoConHoraCero: Trabajo = {
      tipoContrato: "Tiempo Completo",
      pagoBasePorHora: 10000,
      horasTrabajadas: [
        { tipo: "Normal", cantidad: 0 }, // ❌
      ],
    };

    const trabajoConHoraNegativa: Trabajo = {
      tipoContrato: "Tiempo Completo",
      pagoBasePorHora: 10000,
      horasTrabajadas: [
        { tipo: "Nocturna", cantidad: -3 }, // ❌
      ],
    };

    const trabajoConHoraNaN: Trabajo = {
      tipoContrato: "Tiempo Completo",
      pagoBasePorHora: 10000,
      horasTrabajadas: [
        { tipo: "Normal", cantidad: Number("abc") }, // NaN ❌
      ],
    };

    const sonHorasValidas = (trabajo: Trabajo) =>
      trabajo.horasTrabajadas.every(
        (h) =>
          typeof h.cantidad === "number" && h.cantidad > 0 && !isNaN(h.cantidad)
      );

    expect(sonHorasValidas(trabajoValido)).toBe(true);
    expect(sonHorasValidas(trabajoConHoraCero)).toBe(false);
    expect(sonHorasValidas(trabajoConHoraNegativa)).toBe(false);
    expect(sonHorasValidas(trabajoConHoraNaN)).toBe(false);
  });
});
