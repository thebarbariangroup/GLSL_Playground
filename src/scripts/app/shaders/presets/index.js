import FrameBufferFactory from '../../FrameBufferFactory';
import vs from '../vertex/default.vert';
import fs from '../fragment/index';


export default function ({ webcam, renderer }) {
  const outputFactory = new FrameBufferFactory({
    renderer: renderer,
    shaders: {
      vs: vs,
      fs: fs.base,
    }
  });
  const outputBuffers = outputFactory.create([]);

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
      shaders: {
        fs: fs.slices
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