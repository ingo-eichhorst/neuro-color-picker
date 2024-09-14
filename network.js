const { Layer, Network, Trainer } = window.synaptic;

export function setupNetwork() {
  const inputLayer = new Layer(3);
  const hiddenLayer = new Layer(3);
  const outputLayer = new Layer(1);

  inputLayer.project(hiddenLayer);
  hiddenLayer.project(outputLayer);

  const network = new Network({
    input: inputLayer,
    hidden: [hiddenLayer],
    output: outputLayer
  });

  const trainer = new Trainer(network);

  return { network, trainer };
}

export function trainNetwork(trainer, trainingSet) {
  return trainer.train(trainingSet, {
    iterations: 100,
    error: 0.005,
    log: 100
  });
}
