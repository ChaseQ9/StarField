import * as THREE from 'three';

export class Star {
    constructor() {
        // Should probably add something here 
    }
    // Generate the particle field
    static generateStarGalaxy(particlesCount, color=0xffffff) {
        // Creating the buffer geometry for the particles positions 
        const particleGeometry = new THREE.BufferGeometry();

        const particles = new Float32Array(particlesCount * 3);
        // Multiply particlesCount by 3, this allows us to access every [1,2,3] index of particles
        // because the particles are positioned in an [xyz] manner inside of particles

        // AKA - For every 3 values in particles array, one particle is created / represented
        for (let i = 0; i < particlesCount * 3; i++) {
            particles[i] = (Math.random() - 0.5) * 5;
        }
        console.log(particles);
        // Set the position atttribute, tell it we are using particles array and every 3 values in array
        particleGeometry.setAttribute('position', new THREE.BufferAttribute(particles, 3));
        // Set the particle material, ***SIZE IS UPDATED HERE IF NEEDED***
        const particleMaterial = new THREE.PointsMaterial({color: color, size: 0.0005});
        // Create the mesh, and return it
        const particleMesh = new THREE.Points(particleGeometry, particleMaterial);
        return particleMesh;
    }
}