module.exports = class Cliente {
  constructor(estado, plataEnElBolsillo) {
    this.estado = estado;
    this.plataEnElBolsillo = plataEnElBolsillo;
  }
  getPlataEnElBolsillo() {
    return this.plataEnElBolsillo;
  }
  calcularPropina(importe) {
    return this.estado.calcularPropina(importe);
  }
};
