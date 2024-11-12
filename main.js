import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import {Pane} from 'tweakpane';
import {Star} from './star.js';

window.onload = function () {
    
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setAnimationLoop(animate);
    document.body.appendChild(renderer.domElement);

    const colorLight = 0xffffff;
    const intensity = 2;
    const light = new THREE.AmbientLight(colorLight, intensity);
    scene.add(light);

    const sphereParticleGeometry = new THREE.SphereGeometry(.5, 32, 32);
    const sphereParticleMaterial = new THREE.PointsMaterial();
    sphereParticleMaterial.size = 0.007;
    sphereParticleMaterial.sizeAttenuation = true;
    const sphere = new THREE.Points(sphereParticleGeometry, sphereParticleMaterial);
    

    const particleMesh = Star.generateStarGalaxy(5000, 0xffffff);
    scene.add(sphere, particleMesh);

    camera.position.z = 3.5;
    

    let rotateX = 0.01;
    let rotateY = 0.01;
    function animate () {

        sphere.rotation.x += 0.01;
        sphere.rotation.y += 0.01;

        if (!flip) {
            particleMesh.rotation.x -= rotateX;
            particleMesh.rotation.y -= rotateY;
        }

        renderer.render(scene, camera);
    }

    // Set up tweakpane
    let flip = false;
    const PARAMS = {
        color: 0xffffff,
        ParticleXΔ: 0.001,
        ParticleYΔ: 0.001,
        PAUSE: false
    };
    const pane = new Pane();
    const colorChange = pane.addBinding(PARAMS, 'color', {
        view: 'color'
    });
    colorChange.on('change', function(ev) {
        particleMesh.material.color = new THREE.Color(ev.value);
        particleMesh.needsUpdate = true;
    });
    const particleRotateX = pane.addBinding(PARAMS, 'ParticleXΔ');
    const particleRotateY = pane.addBinding(PARAMS, 'ParticleYΔ');
    const PAUSE = pane.addBinding(PARAMS, 'PAUSE');
    particleRotateX.on('change', function(ev) {
        rotateX = ev.value;
    });
    particleRotateY.on('change', function(ev) {
        rotateY = ev.value;
    })
    PAUSE.on('change', function(ev) {
        flip = !flip;
    })
    // const points = generateGalaxy();
    
}


