const initLayer = (layer) => {
  const currLayer = document.getElementById(`wheel-layer-${layer}`).children[0]
    .children;
  const layerLength = currLayer.length;

  for (let i = 0; i < currLayer.length; i++) {
    const element = currLayer[i];
    element.style.transform = `rotate(${(360 / currLayer.length) * i}deg)`;
    element.style.width = `${(100 / currLayer.length) * 3}%`;
  }
};

initLayer(1);
initLayer(2);
initLayer(3);
