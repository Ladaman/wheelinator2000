class Wheelinator2000 {
  constructor(config = {}) {
    this.spinButton = config.spinButton || document.querySelector("#spin-button") || "";
    this.layerNodes = [
      document.querySelector("#wheel-layer-0"),
      document.querySelector("#wheel-layer-1"),
      document.querySelector("#wheel-layer-2"),
    ];
    this.savedSpinValues = [0, 0, 0];
    this.layers = config.layers || 1;
    this.dummySpins = config.dummySpins || [3, 2, 2];
    this.animationTiming = config.animationTiming || [5, 4, 3];
  }

  initLayer = (layer) => {
    // console.log(this.config);
    const currLayerChildren = this.layerNodes[layer].children[0].children;
    for (let i = 0; i < currLayerChildren.length; i++) {
      const element = currLayerChildren[i];
      element.style.transform = `rotate(${(360 / currLayerChildren.length) * i}deg)`;
      element.style.width = `${(100 / currLayerChildren.length) * 3.1}%`;
      element.style.zIndex = i;
    }
    this.layerNodes[layer].style.transform = "rotate(0deg)";
    this.layerNodes[layer].style.animationDuration = this.animationTiming[layer] + "s";
  };

  initWheel = () => {
    for (let i = 0; i < this.layers; i++) {
      this.initLayer(i);
    }
  };

  setAnimationKeyframe = (winner, layer) => {
    const currLayerChildren = this.layerNodes[layer].children[0].children;
    const spinValue =
      360 * this.dummySpins[layer] -
      ((winner - 1) * 360) / currLayerChildren.length -
      (this.savedSpinValues[layer] % 360);
    document.head.insertAdjacentHTML(
      "beforeend",
      `<style id=keyframe-level-${layer}>
        @keyframes spinning-${layer} {
          from {
            transform: rotate(${this.savedSpinValues[layer]}deg);
          }
          to {
            transform: rotate(${this.savedSpinValues[layer] + spinValue}deg);
          }
        }
      </style>`
    );
    this.savedSpinValues[layer] += spinValue;
    setTimeout(() => {
      this.layerNodes[layer].style.transform = `rotate(${this.savedSpinValues[layer]}deg)`;
    }, 500);
  };

  //
  spin = (winner, layer) => {
    if (
      winner <= 0 ||
      typeof winner !== "number" ||
      winner > this.layerNodes[layer].children[0].children.length
    ) {
      return;
    }
    winner = Math.floor(winner);
    this.setAnimationKeyframe(winner, layer);

    this.layerNodes[layer].classList.remove("active");
    setTimeout(() => {
      this.layerNodes[layer].classList.add("active");
    }, 10);
  };

  // start = (winner, layer) => {
  //   this.spinButton.classList.add("inactive");
  //   switch (layer) {
  //     case 0:
  //       this.spin(9, 0);
  //       break;
  //     case 1:
  //       this.spin(1, 0);
  //       setTimeout(() => {
  //         this.spin(winner, layer);
  //       }, [this.animationTiming[layer - 1] + 1] * 1000);
  //       break;
  //     case 2:
  //       this.spin(1, 0);
  //       setTimeout(() => {
  //         this.spin(1, 1);
  //         setTimeout(() => {
  //           this.spin(winner, layer);
  //         }, [this.animationTiming[layer - 1] + 1] * 1000);
  //       }, [this.animationTiming[layer - 2] + 1] * 1000);
  //       break;

  //     default:
  //       console.log("something went wrong");
  //       break;
  //   }
  // };
  start = (winner, layer) => {
    this.spinButton.classList.add("inactive");
    for (let i = 0; i < this.layers; i++) {
      let delay = 0;
      // console.log(`level is ${i}`);
      for (let j = i; j >= 0; j--) {
        if (j === 0) {
          continue;
        }
        delay += this.animationTiming[j];
        // console.log(`delay inside j = ${delay},${this.animationTiming[j]}`);
        // console.log(`this is wheel level ${i} and delay is ${delay}`);
      }
      console.log(delay);
      setTimeout(() => {
        this.spin(winner, i);
      }, delay * 1000);
      // console.log(this.animationTiming[i]);
    }
    // switch (layer) {
    //   case 0:
    //     this.spin(9, 0);
    //     break;
    //   case 1:
    //     this.spin(1, 0);
    //     setTimeout(() => {
    //       this.spin(winner, layer);
    //     }, [this.animationTiming[layer - 1] + 1] * 1000);
    //     break;
    //   case 2:
    //     this.spin(1, 0);
    //     setTimeout(() => {
    //       this.spin(1, 1);
    //       setTimeout(() => {
    //         this.spin(winner, layer);
    //       }, [this.animationTiming[layer - 1] + 1] * 1000);
    //     }, [this.animationTiming[layer - 2] + 1] * 1000);
    //     break;

    //   default:
    //     console.log("something went wrong");
    //     break;
    // }
  };
}
