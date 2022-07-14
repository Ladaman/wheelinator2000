const initLayer = (layer) => {
  const currLayer = document.getElementById(`wheel-layer-${layer}`).children[0]
    .children;
  for (let i = 0; i < currLayer.length; i++) {
    const element = currLayer[i];
    element.style.transform = `rotate(${(360 / currLayer.length) * i}deg)`;
    element.style.width = `${(100 / currLayer.length) * 3}%`;
    element.style.zIndex = i;
  }
};

const initWheel = (layers) => {
  for (let i = 1; i <= layers; i++) {
    initLayer(i);
  }
};

initWheel(3);
