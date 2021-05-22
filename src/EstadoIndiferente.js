module.exports = class EstadoIndiferente {
  calcularPropina(importe, cliente) {
    return cliente.getPlataEnElBolsillo();
  }
};
