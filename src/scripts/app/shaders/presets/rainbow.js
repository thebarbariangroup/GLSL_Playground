import FrameBufferFactory from '../../FrameBufferFactory';
import vs from '../vertex/default.vert';
import fs from '../fragment/_index';

export default function ({ webcam, renderer }) {
  const renderFactory = new FrameBufferFactory({
    renderer: renderer,
    source: webcam,
    shaders: {
      vs: vs,
      fs: fs.base,
    },
  });

  const frameBuffers = renderFactory.create([
    {
      shaders: {
        fs: fs.rainbow
      },
    },
    {
      shaders: {
        fs: fs.greyscale
      },
    },
  ]);

  return frameBuffers;
}