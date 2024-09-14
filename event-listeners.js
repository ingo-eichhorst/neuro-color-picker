import { updatePreview, updateCytoscapeWeights } from './ui.js';
import { trainNetwork } from './network.js';
import { hexToRgb } from './utils.js';

export function setupEventListeners(network, trainer, cy) {
  const colorPicker = document.getElementById('colorPicker');
  const modeToggle = document.getElementById('modeToggle');
  const trainButton = document.getElementById('trainButton');
  const textColorSelect = document.getElementById('textColorSelect');

  let isTrainingMode = false;
  let trainingSet = [];

  colorPicker.addEventListener('input', () => updatePreview(network, isTrainingMode));
  textColorSelect.addEventListener('change', () => updatePreview(network, isTrainingMode));

  modeToggle.addEventListener('click', () => {
    isTrainingMode = !isTrainingMode;
    modeToggle.textContent = isTrainingMode ? 'Switch to Live Mode' : 'Switch to Training Mode';
    trainButton.style.display = isTrainingMode ? 'inline-block' : 'none';
    textColorSelect.style.display = isTrainingMode ? 'inline-block' : 'none';
    updatePreview(network, isTrainingMode);
  });

  trainButton.addEventListener('click', () => {
    const bgColor = colorPicker.value;
    const rgb = hexToRgb(bgColor);
    const normalizedRgb = rgb.map(val => val / 255);
    const desiredOutput = textColorSelect.value === 'white' ? [0] : [1];

    trainingSet.push({
      input: normalizedRgb,
      output: desiredOutput
    });

    const start = Date.now();
    trainNetwork(trainer, trainingSet);
    const end = Date.now();

    console.log(`Training took: ${end - start}ms`);
    console.log("Network after training:", JSON.parse(JSON.stringify(network.toJSON())));

    updatePreview(network, isTrainingMode);
    updateCytoscapeWeights(network, cy);
  });
}
