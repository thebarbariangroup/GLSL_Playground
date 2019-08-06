import '../styles/main.scss';
import * as THREE from 'three';
window.THREE = THREE;

import vs from './app/shaders/vertex/default.vert';
import fs from './app/shaders/fragment/index';

import Renderer from './app/Renderer';
import FrameBufferFactory from './app/FrameBufferFactory';
import Webcam from './app/Webcam';
import Screen from './app/Screen';

const webcam = new Webcam();
const renderer = new Renderer();
const frameBufferFactory = new FrameBufferFactory({
  renderer: renderer,
  source: webcam,
  shaders: {
    vs: vs,
    fs: fs.base,
  }
});

webcam.initializeCamera()
.then(() => {
  return webcam.beginStream();
})
.then(() => {
  const frameBuffers = frameBufferFactory.create([
    fs.edgeDetection, 
    // fs.test,
    fs.greyscale
  ]);
  
  frameBuffers.forEach((frameBuffer) => {
    renderer.addFrameBuffer(frameBuffer);
  });
  
  renderer.animate();
});



