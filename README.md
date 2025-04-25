# Vector Playground

An interactive 2D/3D vector manipulation tool to visualize vector operations with real-time graphical updates.

## Features

- **Interactive 3D Environment**: Visualize vectors in a fully navigable 3D space
- **2D/3D Toggle**: Switch between 2D and 3D views for different perspectives
- **Vector Operations**:
  - Addition
  - Subtraction
  - Scaling
  - Dot Product
  - Cross Product
- **Real-time Updates**: See changes immediately as you modify vector values
- **Modern UI**: Clean, responsive interface that works on desktop and mobile devices

## Technologies Used

- **Three.js**: For 3D rendering and visualization
- **Math.js**: For advanced mathematical operations
- **dat.GUI**: For interactive controls
- **Pure JavaScript**: No frameworks required for simplicity

## Getting Started

1. Clone or download this repository
2. Open `index.html` in a modern web browser (Chrome, Firefox, Safari, Edge recommended)
3. No build steps or dependencies to install - everything works out of the box

## How to Use

1. **Vector Input**: Modify the X, Y, and Z components of Vector A and Vector B using the input fields
2. **Operations**: Click on any operation button to see the result visualized in the 3D space
   - **Addition**: Shows the sum of Vector A and Vector B
   - **Subtraction**: Shows the difference between Vector A and Vector B
   - **Scaling**: Scales the selected vector by the factor set in the scale slider
   - **Dot Product**: Calculates the dot product and shows the scalar result
   - **Cross Product**: Shows the resulting vector perpendicular to both A and B
3. **View Toggle**: Switch between 2D (top-down) and 3D views
4. **Navigation**: In 3D mode:
   - **Rotate**: Click and drag to rotate the view
   - **Zoom**: Use mouse wheel to zoom in/out
   - **Pan**: Right-click and drag to pan the view

## Development

To extend or modify this project:

- `index.html`: Main structure and UI components
- `css/styles.css`: Styling and responsive design
- `js/vector-operations.js`: Vector math operations and utilities
- `js/main.js`: Scene setup, rendering, and user interaction handling

## License

MIT License - Feel free to use, modify, and distribute this project.

## Acknowledgments

- Three.js for the excellent 3D rendering capabilities
- The mathematics community for the foundational vector concepts
