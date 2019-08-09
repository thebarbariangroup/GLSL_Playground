import '../styles/main.scss';
import * as THREE from 'three';
window.THREE = THREE;

import p from './app/shaders/presets/_index';

import Renderer from './app/Renderer';
import Webcam from './app/Webcam';

const webcam = new Webcam();

const presets = [
  p.slices,
  p.colorWave,
  p.edges,
  p.rainbow,
  p.dither,
  p.invert,
  p.ditherAngled,
  p.blockThreshold,
  p.pixelate,
];

webcam.initializeCamera()
.then(() => {
  return webcam.beginStream();
})
.then(() => {
  for (let i = 0; i < 9; i ++) {
    const preset = presets[i];
    const renderer = new Renderer();
    const frameBuffers = preset({
      webcam,
      renderer,
    });
    
    frameBuffers.forEach((frameBuffer) => {
      renderer.addFrameBuffer(frameBuffer);
    });
    
    renderer.animate();
  }
});



