import '../styles/main.scss';
import * as THREE from 'three';
window.THREE = THREE;

import p from './app/shaders/presets/_index';

import Renderer from './app/Renderer';
import Webcam from './app/Webcam';

const webcam = new Webcam();

webcam.initializeCamera()
.then(() => {
  return webcam.beginStream();
})
.then(() => {
  const renderer = new Renderer();
  const frameBuffers = p.test({
    webcam,
    renderer,
  });
  
  frameBuffers.forEach((frameBuffer) => {
    renderer.addFrameBuffer(frameBuffer);
  });
  
  renderer.animate();
});



