import '../styles/main.scss';
import * as THREE from 'three';
window.THREE = THREE;

import Renderer from './app/Renderer';
import Webcam from './app/Webcam';
import Screen from './app/Screen';

const renderer = new Renderer();
const webcam = new Webcam();
const screen = new Screen({
  video: webcam.getOutput(),
});

webcam.initializeCamera()
.then(() => {
  return webcam.beginStream();
})
.then(() => {
  renderer.add(screen.get());
  renderer.animate();
});



