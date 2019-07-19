import '../styles/main.scss';
import * as THREE from 'three';
window.THREE = THREE;

import Renderer from './app/Renderer';
import Webcam from './app/Webcam';
import Screen from './app/Screen';

const renderer = new Renderer();
const webcam = new Webcam();

webcam.initializeCamera()
.then(() => {
  return webcam.beginStream();
})
.then(() => {
  const screen = new Screen({
    renderer: renderer,
    webcam: webcam,
  });

  renderer.add(screen.get());
  renderer.animate();
});



