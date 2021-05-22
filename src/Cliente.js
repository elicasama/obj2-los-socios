module.exports = class Cliente {
  constructor(estado, plataEnElBolsillo, barrio) {
    this.estado = estado;
    this.plataEnElBolsillo = plataEnElBolsillo;
    this.barrio = barrio;
  }
  getPlataEnElBolsillo() {
    return this.plataEnElBolsillo;
  }
  calcularPropina(importe) {
    const propinaSegunAnimo = this.estado.calcularPropina(importe, this);
    return this.barrio.aplicarPlusPorBarrio(propinaSegunAnimo);
  }
};
