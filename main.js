// let wheel = new Wheelinator2000();
let wheel = new Wheelinator2000({
  layers: 3,
  dummySpins: [5, 5, 5],
  animationTiming: [5, 6, 7],
  //   spinButton: document.querySelector("#traki-button"),
});

wheel.initWheel();

document.querySelector("#spin-button").addEventListener("click", function () {
  wheel.spinButton = this;
  wheel.start(5, 2);
});
