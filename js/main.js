/**
 * Vector Playground - Main Application
 * 
 * This file handles the 3D scene setup, rendering, and user interactions
 * for the Vector Playground application.
 */

// Initialize the vector operations utility
const vectorOps = new VectorOperations();

// Scene variables
let scene, camera, renderer, controls;
let grid, axes;
let is3DView = true;

// Vector objects
let vectorA, vectorB, resultVector;
let vectorALine, vectorBLine, resultVectorLine;
let currentOperation = 'none';

// DOM elements
const canvas = document.getElementById('renderCanvas');
const scaleFactorInput = document.getElementById('scaleFactor');
const scaleValueDisplay = document.getElementById('scaleValue');
const scaleVectorSelect = document.getElementById('scaleVectorSelect');
const resultDisplay = document.getElementById('result-display');
const operationNameDisplay = document.getElementById('operation-name');
const resultValueDisplay = document.getElementById('result-value');

// Initialize the application
init();
animate();

/**
 * Initialize the application
 */
function init() {
    // Setup Three.js scene
    setupScene();
    
    // Setup controls
    setupControls();
    
    // Initialize vectors
    updateVectorsFromInputs();
    
    // Handle window resize
    window.addEventListener('resize', onWindowResize);
}

/**
 * Set up the Three.js scene
 */
function setupScene() {
    // Create scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf8f9fa);
    
    // Create camera
    const aspect = canvas.clientWidth / canvas.clientHeight;
    camera = new THREE.PerspectiveCamera(60, aspect, 0.1, 1000);
    camera.position.set(5, 5, 5);
    camera.lookAt(0, 0, 0);
    
    // Create renderer
    renderer = new THREE.WebGLRenderer({ 
        canvas: canvas,
        antialias: true 
    });
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    
    // Add grid
    grid = new THREE.GridHelper(10, 10, 0x888888, 0xcccccc);
    scene.add(grid);
    
    // Add axes
    axes = new THREE.AxesHelper(5);
    scene.add(axes);
    
    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    
    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(5, 10, 7);
    scene.add(directionalLight);
    
    // Add orbit controls
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
}

/**
 * Set up event listeners for controls
 */
function setupControls() {
    // Add event listeners for vector input fields
    document.querySelectorAll('.vector-input input').forEach(input => {
        input.addEventListener('input', updateVectorsFromInputs);
    });
    
    // Add event listeners for operation buttons
    document.getElementById('addVectors').addEventListener('click', () => performOperation('add'));
    document.getElementById('subtractVectors').addEventListener('click', () => performOperation('subtract'));
    document.getElementById('scaleVector').addEventListener('click', () => performOperation('scale'));
    document.getElementById('dotProduct').addEventListener('click', () => performOperation('dot'));
    document.getElementById('crossProduct').addEventListener('click', () => performOperation('cross'));
    document.getElementById('resetVectors').addEventListener('click', resetVectors);
    
    // Add event listener for scale factor
    scaleFactorInput.addEventListener('input', updateScaleFactor);
    
    // Add event listener for view toggle
    document.getElementById('view3d').addEventListener('click', () => setView('3d'));
    document.getElementById('view2d').addEventListener('click', () => setView('2d'));
}

/**
 * Create or update a vector arrow in the scene
 * @param {THREE.Vector3} vector - Vector to represent
 * @param {number} color - Hex color value
 * @param {THREE.ArrowHelper} existing - Existing arrow to update (optional)
 * @returns {THREE.ArrowHelper} - The arrow helper object
 */
function createVectorArrow(vector, color, existing = null) {
    const origin = new THREE.Vector3(0, 0, 0);
    const length = vector.length();
    const dir = vector.clone().normalize();
    
    if (existing) {
        existing.setDirection(dir);
        existing.setLength(length, length * 0.2, length * 0.1);
        return existing;
    } else {
        const arrowHelper = new THREE.ArrowHelper(
            dir,
            origin,
            length,
            color,
            length * 0.2,
            length * 0.1
        );
        scene.add(arrowHelper);
        return arrowHelper;
    }
}

/**
 * Update the vectors based on input values
 */
function updateVectorsFromInputs() {
    // Get vector A values
    const ax = document.getElementById('vectorAx').value;
    const ay = document.getElementById('vectorAy').value;
    const az = document.getElementById('vectorAz').value;
    
    // Get vector B values
    const bx = document.getElementById('vectorBx').value;
    const by = document.getElementById('vectorBy').value;
    const bz = document.getElementById('vectorBz').value;
    
    // Create vectors
    vectorA = vectorOps.createVector(ax, ay, az);
    vectorB = vectorOps.createVector(bx, by, bz);
    
    // Update vector arrows
    updateVectorArrows();
    
    // Re-perform current operation if any
    if (currentOperation !== 'none') {
        performOperation(currentOperation);
    }
}

/**
 * Update the vector arrows in the scene
 */
function updateVectorArrows() {
    // Update or create Vector A arrow
    vectorALine = createVectorArrow(vectorA, vectorOps.colors.vectorA, vectorALine);
    
    // Update or create Vector B arrow
    vectorBLine = createVectorArrow(vectorB, vectorOps.colors.vectorB, vectorBLine);
    
    // Remove result vector if it exists
    if (resultVectorLine) {
        scene.remove(resultVectorLine);
        resultVectorLine = null;
    }
}

/**
 * Perform the selected vector operation
 * @param {string} operation - Operation type: add, subtract, scale, dot, cross
 */
function performOperation(operation) {
    // Remove previous result vector
    if (resultVectorLine) {
        scene.remove(resultVectorLine);
        resultVectorLine = null;
    }
    
    // Set current operation
    currentOperation = operation;
    
    // Reset active class on all operation buttons
    document.querySelectorAll('.operation-buttons button').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Add active class to the selected button
    document.getElementById(getButtonId(operation)).classList.add('active');
    
    let result;
    
    // Perform the operation
    switch (operation) {
        case 'add':
            result = vectorOps.addVectors(vectorA, vectorB);
            resultVector = result.vector;
            resultVectorLine = createVectorArrow(resultVector, vectorOps.colors.result);
            
            operationNameDisplay.textContent = 'Current Operation: Vector Addition';
            resultValueDisplay.textContent = result.description;
            break;
            
        case 'subtract':
            result = vectorOps.subtractVectors(vectorA, vectorB);
            resultVector = result.vector;
            resultVectorLine = createVectorArrow(resultVector, vectorOps.colors.result);
            
            operationNameDisplay.textContent = 'Current Operation: Vector Subtraction';
            resultValueDisplay.textContent = result.description;
            break;
            
        case 'scale':
            const scaleFactor = parseFloat(scaleFactorInput.value);
            const vectorToScale = scaleVectorSelect.value === 'A' ? vectorA : vectorB;
            
            result = vectorOps.scaleVector(vectorToScale, scaleFactor);
            resultVector = result.vector;
            resultVectorLine = createVectorArrow(resultVector, vectorOps.colors.result);
            
            operationNameDisplay.textContent = `Current Operation: Vector Scaling (${scaleVectorSelect.value})`;
            resultValueDisplay.textContent = result.description;
            break;
            
        case 'dot':
            result = vectorOps.dotProduct(vectorA, vectorB);
            
            operationNameDisplay.textContent = 'Current Operation: Dot Product';
            resultValueDisplay.textContent = `${result.description}
                                             <br>${result.additionalInfo}`;
            break;
            
        case 'cross':
            result = vectorOps.crossProduct(vectorA, vectorB);
            resultVector = result.vector;
            resultVectorLine = createVectorArrow(resultVector, vectorOps.colors.result);
            
            operationNameDisplay.textContent = 'Current Operation: Cross Product';
            resultValueDisplay.textContent = `${result.description}
                                             <br>${result.additionalInfo}`;
            break;
            
        default:
            operationNameDisplay.textContent = 'Current Operation: None';
            resultValueDisplay.textContent = 'No result yet';
    }
}

/**
 * Get the button ID for a given operation
 * @param {string} operation - Operation type
 * @returns {string} - Button ID
 */
function getButtonId(operation) {
    switch (operation) {
        case 'add': return 'addVectors';
        case 'subtract': return 'subtractVectors';
        case 'scale': return 'scaleVector';
        case 'dot': return 'dotProduct';
        case 'cross': return 'crossProduct';
        default: return '';
    }
}

/**
 * Reset vectors to their initial state
 */
function resetVectors() {
    // Reset input fields
    document.getElementById('vectorAx').value = 1;
    document.getElementById('vectorAy').value = 0;
    document.getElementById('vectorAz').value = 0;
    
    document.getElementById('vectorBx').value = 0;
    document.getElementById('vectorBy').value = 1;
    document.getElementById('vectorBz').value = 0;
    
    // Reset scale factor
    scaleFactorInput.value = 1;
    scaleValueDisplay.textContent = '1.0';
    
    // Reset vectors
    updateVectorsFromInputs();
    
    // Remove result vector
    if (resultVectorLine) {
        scene.remove(resultVectorLine);
        resultVectorLine = null;
    }
    
    // Reset operation
    currentOperation = 'none';
    
    // Reset active class on all operation buttons
    document.querySelectorAll('.operation-buttons button').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Reset result display
    operationNameDisplay.textContent = 'Current Operation: None';
    resultValueDisplay.textContent = 'No result yet';
}

/**
 * Update the scale factor display
 */
function updateScaleFactor() {
    const value = parseFloat(scaleFactorInput.value);
    scaleValueDisplay.textContent = value.toFixed(1);
    
    // Re-perform scale operation if currently active
    if (currentOperation === 'scale') {
        performOperation('scale');
    }
}

/**
 * Set the view mode (2D or 3D)
 * @param {string} mode - View mode: 2d or 3d
 */
function setView(mode) {
    is3DView = mode === '3d';
    
    // Update camera position
    if (is3DView) {
        camera.position.set(5, 5, 5);
        document.getElementById('view3d').classList.add('active');
        document.getElementById('view2d').classList.remove('active');
    } else {
        camera.position.set(0, 10, 0);
        camera.lookAt(0, 0, 0);
        document.getElementById('view2d').classList.add('active');
        document.getElementById('view3d').classList.remove('active');
    }
    
    // Reset controls target
    controls.target.set(0, 0, 0);
    controls.update();
}

/**
 * Handle window resize
 */
function onWindowResize() {
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    
    renderer.setSize(width, height);
}

/**
 * Animation loop
 */
function animate() {
    requestAnimationFrame(animate);
    
    controls.update();
    
    renderer.render(scene, camera);
}
