import FrameBufferFactory from '../../FrameBufferFactory';
import vs from '../vertex/default.vert';
import fs from '../fragment/_index';

export default function ({ webcam, renderer }) {
  const outputFactory = new FrameBufferFactory({
    renderer: renderer,
    shaders: {
      vs: vs,
      fs: fs.base,
    }
  });

  const outputBuffers = outputFactory.create([
    {
      id: 'o0',
    },
  ]);

  const outputBuffer = outputBuffers[0];


  const renderFactory = new FrameBufferFactory({
    renderer: renderer,
    source: webcam,
    shaders: {
      vs: vs,
      fs: fs.base,
    },
    outputs: outputBuffers,
  });

  const frameBuffers = renderFactory.create([
    {
      id: 'edge0',
      shaders: {
        fs: fs.edgeDetection
      },
    },
    {
      source: outputBuffer,
    },
    {
      shaders: {
        fs: fs.bleed,
      },
      uniforms: {
        uImage1: 'edge0',
      },
      output: outputBuffer,
    },
    {}
  ]);

  return frameBuffers;
}