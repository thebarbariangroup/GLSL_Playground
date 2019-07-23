import '../styles/main.scss';
import * as THREE from 'three';
window.THREE = THREE;

import Renderer from './app/Renderer';
import Webcam from './app/Webcam';
import CanvasSource from './app/CanvasSource';
import Screen from './app/Screen';

const renderer = new Renderer();
const webcam = new Webcam();

webcam.initializeCamera()
.then(() => {
  return webcam.beginStream();
})
.then(() => {
  const source = new CanvasSource({
    webcam: webcam,
  });

  const screen = new Screen({
    renderer: renderer,
    source: source,
  });

  renderer.add(screen);
  renderer.animate();
});



