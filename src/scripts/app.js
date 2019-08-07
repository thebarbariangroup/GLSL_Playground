import '../styles/main.scss';
import * as THREE from 'three';
window.THREE = THREE;

import vs from './app/shaders/vertex/default.vert';
import fs from './app/shaders/fragment/index';

import Renderer from './app/Renderer';
import FrameBufferFactory from './app/FrameBufferFactory';
import Webcam from './app/Webcam';

const webcam = new Webcam();
const renderer = new Renderer();

const outputFactory = new FrameBufferFactory({
  renderer: renderer,
  source: webcam,
  shaders: {
    vs: vs,
    fs: fs.base,
  }
});

const renderFactory = new FrameBufferFactory({
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
  const outputBuffers = outputFactory.create([
    {
      id: 'test0',
    },
  ]);
  const outputBuffer = outputBuffers[0];

  const frameBuffers = renderFactory.create([
    {
      id: 'edge0',
      shaders: {
        fs: fs.edgeDetection
      },
    },
    {
      id: 'result1',
      source: outputBuffer,
    },
    {
      id: 'test1',
      source: 'edge0',
      shaders: {
        fs: fs.test,
      },
      uniforms: {
        uImage1: 'edge0',
      },
      output: outputBuffer,
    },
    {
      id: 'result2',
      source: outputBuffer
    },
  ]);
  
  frameBuffers.forEach((frameBuffer) => {
    renderer.addFrameBuffer(frameBuffer);
  });
  
  renderer.animate();
});



