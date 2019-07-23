import '../styles/main.scss';
import * as THREE from 'three';
window.THREE = THREE;

import Renderer from './app/Renderer';
import Webcam from './app/Webcam';
import Screen from './app/Screen';

const webcam = new Webcam();

webcam.initializeCamera()
.then(() => {
  return webcam.beginStream();
})
.then(() => {
  const renderer = new Renderer();
  
  const screen = new Screen({
    renderer: renderer,
    source: webcam,
  });

  renderer.add(screen);
  renderer.animate();
});



