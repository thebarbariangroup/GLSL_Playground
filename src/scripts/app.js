import '../styles/main.scss';
import * as THREE from 'three';
window.THREE = THREE;

import bufferFactory from './app/shaders/presets';

import Renderer from './app/Renderer';
import Webcam from './app/Webcam';

const webcam = new Webcam();
const renderer = new Renderer();

webcam.initializeCamera()
.then(() => {
  return webcam.beginStream();
})
.then(() => {
  const frameBuffers = bufferFactory({
    webcam,
    renderer,
  });
  
  frameBuffers.forEach((frameBuffer) => {
    renderer.addFrameBuffer(frameBuffer);
  });
  
  renderer.animate();
});



