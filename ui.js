import { hexToRgb } from './utils.js';

export function updatePreview(network, isTrainingMode) {
  const colorPicker = document.getElementById('colorPicker');
  const textPreview = document.getElementById('textPreview');
  const textColorSelect = document.getElementById('textColorSelect');
  const rgbDisplay = document.getElementById('rgbDisplay');

  const bgColor = colorPicker.value;
  const rgb = hexToRgb(bgColor);
  
  const normalizedRgb = rgb.map(val => val / 255);            
  rgbDisplay.textContent = `
      Red: ${rgb[0]}(${normalizedRgb[0].toFixed(2)}), 
      Green: ${rgb[1]}(${normalizedRgb[1].toFixed(2)}),
      Blue: ${rgb[2]}(${normalizedRgb[2].toFixed(2)})
  `;
  
  if (isTrainingMode) {
      textPreview.style.color = textColorSelect.value;
      textPreview.textContent = `Sample Text`;
  } else {                
      const output = network.activate(normalizedRgb);
      textPreview.style.color = output < 0.5 ? 'white' : 'black';
      textPreview.textContent = `Sample Text (${(output * 100).toFixed(2)}% black)`;
  }
  
  textPreview.style.backgroundColor = bgColor;
}

export function updateCytoscapeWeights(network, cy) {
  const inputLayer = network.layers.input;
  const hiddenLayer = network.layers.hidden[0];
  const outputLayer = network.layers.output;

  updateLayerBiases(inputLayer, 'Input', 0, cy);
  updateLayerBiases(hiddenLayer, 'Hidden', 1, cy);
  updateLayerBiases(outputLayer, 'Output', 2, cy);

  updateLayerWeights(inputLayer, hiddenLayer, 0, 1, cy);
  updateLayerWeights(hiddenLayer, outputLayer, 1, 2, cy);

  cy.style().update();
}

function updateLayerBiases(layer, layerName, layerIndex, cy) {
  console.log(layer)
  for (let i = 0; i < layer.size; i++) {
    const bias = layer.list[i].bias;
    const nodeId = `${layerIndex}-${i}`;
    cy.$id(nodeId).data('bias', bias);
    cy.$id(nodeId).data('label', `${layerName} ${i+1}\nBias: ${bias.toFixed(3)}`);
  }
}

function updateLayerWeights(sourceLayer, targetLayer, sourceIndex, targetIndex, cy) {
  for (let i = 0; i < sourceLayer.size; i++) {
    for (let j = 0; j < targetLayer.size; j++) {
      const weight = sourceLayer.connectedTo[0].list[i * targetLayer.size + j].weight;
      cy.$id(`${sourceIndex}-${i}_${targetIndex}-${j}`).data('weight', weight/10);
    }
  }
}
