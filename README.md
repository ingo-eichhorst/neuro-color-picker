# Neural Network Color Predictor

## Live Demo

A hosted version of this project is available at: https://neuro-color.ingo-eichhorst.de/

## Overview

This project is a visual tool designed to help users gain a better intuition about the training process of neural networks. It uses a color picker as an interactive example, demonstrating how a simple neural network learns to predict whether black or white text would be more readable on a given background color.

## Why Neural Networks for Color Prediction?

Determining the best text color (black or white) for a given background color is a surprisingly complex problem when approached algorithmically. While it might seem simple at first glance, there are several factors that make this a challenging task:

1. **Non-linearity**: The relationship between RGB values and perceived brightness is non-linear, which makes it difficult to use simple thresholds or linear equations.

2. **Perceptual Complexity**: Human color perception is complex and can be influenced by factors like contrast sensitivity and color context.

3. **Subjectivity**: What one person finds readable might not be the same for another, introducing a level of subjectivity.

Neural networks excel at handling these types of problems because:

- They can capture non-linear relationships between inputs (RGB values) and outputs (text color).
- They can learn from examples, potentially capturing the nuances of human perception better than hard-coded rules.
- They can generalize to new inputs, potentially handling edge cases better than rule-based systems.

## How It Works

1. **Input**: The user selects a color using the color picker.
2. **Network Architecture**: A simple neural network with 3 input neurons (for R, G, B values), a hidden layer, and 1 output neuron is used.
3. **Prediction**: The network predicts whether black (output close to 1) or white (output close to 0) text would be more readable.
4. **Visualization**: The Cytoscape.js library is used to visualize the network, with node colors representing biases and edge colors representing weights.
5. **Training**: Users can switch to training mode, select their preferred text color, and train the network on their choices.

## Network Visualization

As you train the network:

- The thickness and color of the edges (connections) between nodes will change, representing the changing weights.
- The color of the nodes will change, representing the changing biases.
- With more training, you'll notice the network becoming more confident in its predictions, as shown by the percentage displayed with the sample text.

These visual changes provide insight into how the network is learning and adapting its internal representation based on the training data.

## Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, or Edge)
- A local web server (e.g., Python's `http.server`, Node.js `http-server`, or any web server of your choice)

### Hosted

- Hosted version at: https://neuro-color.ingo-eichhorst.de/

### Running Locally

1. Clone this repository:
   ```
   git clone https://github.com/yourusername/neural-network-color-predictor.git
   ```

2. Navigate to the project directory:
   ```
   cd neural-network-color-predictor
   ```

3. Start a local web server. For example, with Python:
   ```
   python -m http.server
   ```
   Or with Node.js (after installing `http-server`):
   ```
   npx http-server
   ```

4. Open your web browser and navigate to `http://localhost:8000` (or whatever port your web server is using).

## Contributing

Contributions are welcome! Here's how you can contribute:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Reporting Issues

If you encounter a bug or have a feature request:

1. Go to the [Issues](https://github.com/yourusername/neural-network-color-predictor/issues) page of the repository.
2. Click on "New Issue"
3. Choose "Bug report" or "Feature request"
4. Fill out the template with as much detail as possible

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Acknowledgments

- [Synaptic.js](http://caza.la/synaptic) for the neural network implementation
- [Cytoscape.js](https://js.cytoscape.org/) for the network visualization

## Future Improvements

- Add more complex network architectures
- Implement different activation functions
- Allow users to adjust learning rate and other hyperparameters
- Add a feature to export and import trained networks

We hope this tool helps you gain insights into neural network training and inspires further exploration in the field of machine learning!