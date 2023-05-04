// let wheel = new Wheelinator2000();
let wheel = new Wheelinator2000({
  layers: 1,
  dummySpins: [5, 5, 5],
  animationTiming: [5, 6, 7],
  // spinButton: document.querySelector("#traki-button"),
});

console.log(wheel);
wheel.initWheel();

document
  .querySelector(".custom-spin-button")
  .addEventListener("click", function () {
    wheel.spinButton = this;
    wheel.spin(5, 0);
    console.log(this);
  });
