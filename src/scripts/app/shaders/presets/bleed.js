import FrameBufferFactory from '../../FrameBufferFactory';
import vs from '../vertex/default.vert';
import fs from '../fragment/_index';

export default function ({ webcam, renderer }) {

  const renderFactory = new FrameBufferFactory({
    renderer: renderer,
    shaders: {
      vs: vs,
      fs: fs.base,
    },
  });

  const frameBuffers = renderFactory.create([
    // saved buffers
    {
      id: 'o0',
    },
    // end saved buffers
    {
      id: 'o1',
      source: 'o0',
    },
    {
      id: 'w0',
      source: webcam,
      shaders: {
        fs: fs.sobel
      },
    },
    {
      id: 'b0',
      source: 'o1',
      shaders: {
        fs: fs.bleed
      },
      uniforms: {
        uImage1: 'w0',
      },
      output: 'o0',
    },
    {
      source: 'o0',
    },
  ]);

  return frameBuffers;
}