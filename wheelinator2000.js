class Wheelinator2000 {
  constructor() {
    this.spinButton = document.querySelector("#spin-button");
    this.layers = [
      document.querySelector("#wheel-layer-0"),
      document.querySelector("#wheel-layer-1"),
      document.querySelector("#wheel-layer-2"),
    ];
    this.dummySpins = [3, 3, 3];
    this.savedSpinValues = [0, 0, 0];
  }

  initLayer = (layer) => {
    const currLayerChildren = this.layers[layer].children[0].children;
    for (let i = 0; i < currLayerChildren.length; i++) {
      const element = currLayerChildren[i];
      element.style.transform = `rotate(${
        (360 / currLayerChildren.length) * i
      }deg)`;
      element.style.width = `${(100 / currLayerChildren.length) * 3}%`;
      element.style.zIndex = i;
    }
    this.layers[layer].style.transform = "rotate(0deg)";
  };

  initWheel = (layers) => {
    for (let i = 0; i < layers; i++) {
      this.initLayer(i);
    }
    this.spinButton.addEventListener("click", () => {
      this.start(9, 0);
    });
  };

  setAnimationKeyframe = (winner, layer) => {
    const currLayerChildren = this.layers[layer].children[0].children;
    const spinValue =
      360 * this.dummySpins[layer] -
      ((winner - 1) * 360) / currLayerChildren.length -
      (this.savedSpinValues[layer] % 360);
    document.head.insertAdjacentHTML(
      "beforeend",
      `<style>@keyframes spinning-${layer} {
        from {
          transform: rotate(${this.savedSpinValues[layer]}deg);
        }
        to {
          transform: rotate(${this.savedSpinValues[layer] + spinValue}deg);
        }
      }</style>`
    );
    console.log(this.savedSpinValues[layer], spinValue);
    this.savedSpinValues[layer] += spinValue;
    this.layers[
      layer
    ].style.transform = `rotate(${this.savedSpinValues[layer]}deg)`;
  };

  //
  spin = (winner, layer) => {
    this.setAnimationKeyframe(winner, layer);

    console.log(this.layers[layer]);
    this.layers[layer].classList.remove("active");
    setTimeout(() => {
      this.layers[layer].classList.add("active");
    }, 1);
  };

  start = (winner, layer) => {
    this.spin(9, 0);
    // this.spin(6, 1);
    // this.spin(2, 2);
  };
}
