// let wheel = new Wheelinator2000();
let wheel = new Wheelinator2000({
  layers: 3,
  dummySpins: [5, 5, 5],
  animationTiming: [5, 6, 7],
  //   spinButton: document.querySelector("#traki-button"),
});

console.log(wheel);
wheel.initWheel();

document.querySelector("#traki-button").addEventListener("click", function () {
  wheel.spinButton = this;
  wheel.start(5, 3);
  console.log(this);
});
