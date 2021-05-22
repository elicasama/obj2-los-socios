var assert = require("assert");
var Cliente = require("../src/Cliente");
var EstadoFeliz = require("../src/EstadoFeliz");
var EstadoEnojado = require("../src/EstadoEnojado");
var EstadoIndiferente = require("../src/EstadoIndiferente");
var EstadoResfriado = require("../src/EstadoResfriado");

describe("Cliente", () => {
  describe("Estados de ánimo", () => {
    it("Un cliente feliz deja un 25% del importe de compra", () => {
      const cliente = new Cliente(new EstadoFeliz(), 200);
      assert.equal(250, cliente.calcularPropina(1000));
    });
    it("Un cliente enojado deja 0 de propina", () => {
      const cliente = new Cliente(new EstadoEnojado(), 200);
      assert.equal(0, cliente.calcularPropina(1000));
    });

    it("Un cliente indiferente deja lo que tenga en el bolsillo", () => {
      const cliente = new Cliente(new EstadoIndiferente(), 200);
      assert.equal(200, cliente.getPlataEnElBolsillo());
    });

    it("Un cliente resfriado deja el 100% del importe de compra", () => {
      const cliente = new Cliente(new EstadoResfriado(), 200);
      assert.equal(1000, cliente.calcularPropina(1000));
    });
  });

  it("Obtener dinero en el bolsillo", () => {
    const cliente = new Cliente(new EstadoFeliz(), 300);
    assert.equal(300, cliente.getPlataEnElBolsillo());
  });
});
