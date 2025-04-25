/**
 * Vector Operations Class
 * Handles vector math operations including addition, subtraction, scaling, dot product, and cross product
 */
class VectorOperations {
    constructor() {
        // Define vector colors
        this.colors = {
            vectorA: 0xff5252, // Red
            vectorB: 0x2196f3, // Blue
            result: 0x4caf50, // Green
            xAxis: 0xff0000, // Red
            yAxis: 0x00ff00, // Green
            zAxis: 0x0000ff  // Blue
        };
    }

    /**
     * Add two vectors
     * @param {THREE.Vector3} vectorA - First vector
     * @param {THREE.Vector3} vectorB - Second vector
     * @returns {Object} - Result vector and description
     */
    addVectors(vectorA, vectorB) {
        const result = new THREE.Vector3().addVectors(vectorA, vectorB);
        return {
            vector: result,
            description: `A + B = (${this.formatVector(result)})`
        };
    }

    /**
     * Subtract one vector from another
     * @param {THREE.Vector3} vectorA - First vector
     * @param {THREE.Vector3} vectorB - Second vector
     * @returns {Object} - Result vector and description
     */
    subtractVectors(vectorA, vectorB) {
        const result = new THREE.Vector3().subVectors(vectorA, vectorB);
        return {
            vector: result,
            description: `A - B = (${this.formatVector(result)})`
        };
    }

    /**
     * Scale a vector by a factor
     * @param {THREE.Vector3} vector - Vector to scale
     * @param {number} scaleFactor - Scaling factor
     * @returns {Object} - Result vector and description
     */
    scaleVector(vector, scaleFactor) {
        const result = new THREE.Vector3().copy(vector).multiplyScalar(scaleFactor);
        return {
            vector: result,
            description: `${scaleFactor} × Vector = (${this.formatVector(result)})`
        };
    }

    /**
     * Calculate dot product of two vectors
     * @param {THREE.Vector3} vectorA - First vector
     * @param {THREE.Vector3} vectorB - Second vector
     * @returns {Object} - Scalar result and description
     */
    dotProduct(vectorA, vectorB) {
        const result = vectorA.dot(vectorB);
        return {
            scalar: result,
            description: `A · B = ${result.toFixed(2)}`,
            additionalInfo: `Magnitude of A: ${vectorA.length().toFixed(2)}, Magnitude of B: ${vectorB.length().toFixed(2)}`
        };
    }

    /**
     * Calculate cross product of two vectors
     * @param {THREE.Vector3} vectorA - First vector
     * @param {THREE.Vector3} vectorB - Second vector
     * @returns {Object} - Result vector and description
     */
    crossProduct(vectorA, vectorB) {
        const result = new THREE.Vector3().crossVectors(vectorA, vectorB);
        return {
            vector: result,
            description: `A × B = (${this.formatVector(result)})`,
            additionalInfo: `Magnitude: ${result.length().toFixed(2)}`
        };
    }

    /**
     * Format vector components for display
     * @param {THREE.Vector3} vector - Vector to format
     * @returns {string} - Formatted vector string
     */
    formatVector(vector) {
        return `${vector.x.toFixed(2)}, ${vector.y.toFixed(2)}, ${vector.z.toFixed(2)}`;
    }

    /**
     * Create a vector from input values
     * @param {number} x - X component
     * @param {number} y - Y component
     * @param {number} z - Z component
     * @returns {THREE.Vector3} - New THREE.Vector3 instance
     */
    createVector(x, y, z) {
        return new THREE.Vector3(
            parseFloat(x) || 0, 
            parseFloat(y) || 0, 
            parseFloat(z) || 0
        );
    }
}
