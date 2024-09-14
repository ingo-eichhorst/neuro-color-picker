const cytoscape = window.cytoscape;

const layers = [
  { size: 3, name: 'Input', nodes: ['Red', 'Green', 'Blue']},
  { size: 3, name: 'Hidden', nodes: ['1', '2', '3']},
  { size: 1, name: 'Output', nodes: ['Black/White'] }
];

export function initializeCytoscape() {
  const elements = createCytoscapeElements();

  return cytoscape({
    container: document.getElementById('cy'),
    elements: elements,
    style: getCytoscapeStyle(),
    layout: getCytoscapeLayout()
  });
}

function createCytoscapeElements() {
  const elements = [];

  layers.forEach((layer, layerIndex) => {
    for (let i = 0; i < layer.size; i++) {
      elements.push({
        data: { 
          id: `${layerIndex}-${i}`,
          label: `${layer.name} ${layer.nodes[i] || i+1}`,
          layer: layerIndex,
          bias: 0
        }
      });
    }
  });

  for (let i = 0; i < layers[0].size; i++) {
    for (let j = 0; j < layers[1].size; j++) {
      elements.push({
        data: {
          id: `0-${i}_1-${j}`,
          source: `0-${i}`,
          target: `1-${j}`,
          weight: 0
        }
      });
    }
  }

  for (let i = 0; i < layers[1].size; i++) {
    for (let j = 0; j < layers[2].size; j++) {
      elements.push({
        data: {
          id: `1-${i}_2-${j}`,
          source: `1-${i}`,
          target: `2-${j}`,
          weight: 0
        }
      });
    }
  }

  return elements;
}

function getCytoscapeStyle() {
  return [
    {
      selector: 'node',
      style: {
        'background-color': '#666',
        'label': 'data(label)',
        'color': '#000',
        'text-valign': 'bottom',
        'text-halign': 'center',
        'text-margin-y': '10px',
        'text-wrap': 'wrap',
        'text-max-width': '100px',
        'font-size': '10px'
      }
    },
    {
      selector: 'edge',
      style: {
        'width': 3,
        'line-color': 'mapData(weight, -1, 1, #ff0000, #00ff00)',
        'target-arrow-color': 'mapData(weight, -1, 1, #ff0000, #00ff00)',
        'target-arrow-shape': 'triangle',
        'curve-style': 'bezier',
        'label': function(ele) {
          return ele.data('weight').toFixed(3);
        },
        'font-size': '10px',
        'text-rotation': 'autorotate',
        'text-margin-y': '-10px',
        'text-background-color': '#FFFFFF',
        'text-background-opacity': 0.7,
        'text-background-padding': '2px'
      }
    }
  ];
}

function getCytoscapeLayout() {
  return {
    name: 'preset',
    positions: function(node) {
      const layer = node.data('layer');
      const totalLayers = layers.length;
      const layerSize = layers[layer].size;
      const index = parseInt(node.id().split('-')[1]);
      
      return {
        x: (layer / (totalLayers - 1)) * 500,
        y: ((index + 1) / (layerSize + 1)) * 500
      };
    }
  };
}
