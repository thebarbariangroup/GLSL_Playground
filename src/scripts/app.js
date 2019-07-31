import '../styles/main.scss';
import * as THREE from 'three';
window.THREE = THREE;

import Renderer from './app/Renderer';
import Webcam from './app/Webcam';
import FrameBuffer from './app/FrameBuffer';
import Screen from './app/Screen';

const webcam = new Webcam();

webcam.initializeCamera()
.then(() => {
  return webcam.beginStream();
})
.then(() => {
  const renderer = new Renderer();

  const frameBuffer0 = new FrameBuffer({
    renderer: renderer,
    source: webcam,
  });
  
  const screen = new Screen({
    renderer: renderer,
    source: frameBuffer0,
  });

  renderer.addFrameBuffer(frameBuffer0);
  renderer.add(screen);
  renderer.animate();
});



