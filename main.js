import { setupNetwork } from './network.js';
import { setupEventListeners } from './event-listeners.js';
import { updatePreview, updateCytoscapeWeights } from './ui.js';
import { initializeCytoscape } from './cytoscape-setup.js';

// Initialize the network
let { network, trainer } = setupNetwork();

// Initialize Cytoscape
const cy = initializeCytoscape();

// Set up event listeners
setupEventListeners(network, trainer, cy);

// Initial UI update
updatePreview(network, false);
updateCytoscapeWeights(network, cy);