var assert = require("assert");
var Cliente = require("../src/Cliente");
var EstadoFeliz = require("../src/EstadoFeliz");
var EstadoEnojado = require("../src/EstadoEnojado");
var EstadoIndiferente = require("../src/EstadoIndiferente");
var EstadoResfriado = require("../src/EstadoResfriado");
var PlusPorBarrioLasRosas = require("../src/PlusPorBarrioLasRosas");
var PlusPorBarrioLasLauchas = require("../src/PlusPorBarrioLasLauchas");
var PlusPorBarrioVerde = require("../src/PlusPorBarrioVerde");
var PlusPorBarrioLastorres = require("../src/PlusPorBarrioLastorres");

describe("Calculo de propinas", () => {
  describe("Propinas según el estado de  de ánimo", () => {
    it("Un cliente feliz deja un 25% del importe de compra", () => {
      const cliente = new Cliente(
        new EstadoFeliz(),
        200,
        new PlusPorBarrioLastorres()
      );
      assert.equal(250, cliente.calcularPropina(1000));
    });
    it("Un cliente enojado deja 0 de propina", () => {
      const cliente = new Cliente(
        new EstadoEnojado(),
        200,
        new PlusPorBarrioLastorres()
      );
      assert.equal(0, cliente.calcularPropina(1000));
    });

    it("Un cliente indiferente deja lo que tenga en el bolsillo", () => {
      const cliente = new Cliente(
        new EstadoIndiferente(),
        200,
        new PlusPorBarrioLastorres()
      );
      assert.equal(200, cliente.calcularPropina(1000));
    });

    it("Un cliente resfriado deja el 100% del importe de compra", () => {
      const cliente = new Cliente(
        new EstadoResfriado(),
        200,
        new PlusPorBarrioLastorres()
      );
      assert.equal(1000, cliente.calcularPropina(1000));
    });
  });

  describe("Para un cliente Feliz (25% de la compra) con el plus dependiendo del barrio ", () => {
    it("Si es del Barrio las Rosas a la propina original le suma 50", () => {
      const cliente = new Cliente(
        new EstadoFeliz(),
        200,
        new PlusPorBarrioLasRosas()
      );
      assert.equal(300, cliente.calcularPropina(1000));
    });
    it("Si es del Barrio Las Lauchas deja el la mitad de la propina", () => {
      const cliente = new Cliente(
        new EstadoFeliz(),
        200,
        new PlusPorBarrioLasLauchas()
      );
      assert.equal(125, cliente.calcularPropina(1000));
    });
    it("Si es del Barrio Verde deja 200 si la propina original es menor", () => {
      const cliente = new Cliente(
        new EstadoFeliz(),
        200,
        new PlusPorBarrioVerde()
      );
      assert.equal(200, cliente.calcularPropina(100));
    });
    it("Si es del Barrio Verde deja la propina original si es mayor a 200", () => {
      const cliente = new Cliente(
        new EstadoFeliz(),
        200,
        new PlusPorBarrioVerde()
      );
      assert.equal(250, cliente.calcularPropina(1000));
    });
    it("Si es del Barrio Las Torres deja la propina original (25% del importe de compra)", () => {
      const cliente = new Cliente(
        new EstadoFeliz(),
        200,
        new PlusPorBarrioLastorres()
      );
      assert.equal(250, cliente.calcularPropina(1000));
    });
  });
  describe("El cliente enojado NO deja propina en un principio", () => {
    it("Si es del Barrio Las Rosas deja solo el importe fijo de 50", () => {
      const cliente = new Cliente(
        new EstadoEnojado(),
        200,
        new PlusPorBarrioLasRosas()
      );
      assert.equal(50, cliente.calcularPropina(1000));
    });
    it("Un cliente enojado del Barrio Verde deja 200 que es más que el 0 original", () => {
      const cliente = new Cliente(
        new EstadoEnojado(),
        200,
        new PlusPorBarrioVerde()
      );
      assert.equal(200, cliente.calcularPropina(100));
    });
  });
  describe("Otros tests", () => {
    it("Obtener dinero en el bolsillo 300", () => {
      const cliente = new Cliente(
        new EstadoFeliz(),
        300,
        new PlusPorBarrioLasRosas()
      );
      assert.equal(300, cliente.getPlataEnElBolsillo());
    });
    it("Un cliente resfriado del Barrio las Rosas deja el 100% del importe de compra + 50", () => {
      const cliente = new Cliente(
        new EstadoResfriado(),
        200,
        new PlusPorBarrioLasRosas()
      );
      assert.equal(1050, cliente.calcularPropina(1000));
    });
    it("Un cliente indiferente deja 200 porque tiene menos en el bolsillo", () => {
      const cliente = new Cliente(
        new EstadoIndiferente(),
        100,
        new PlusPorBarrioVerde()
      );
      assert.equal(200, cliente.calcularPropina(1000));
    });
    it("Un cliente indiferente da lo que tiene en el bolsillo porque supera los 200", () => {
      const cliente = new Cliente(
        new EstadoIndiferente(),
        300,
        new PlusPorBarrioVerde()
      );
      assert.equal(300, cliente.calcularPropina(1000));
    });
  });
});
