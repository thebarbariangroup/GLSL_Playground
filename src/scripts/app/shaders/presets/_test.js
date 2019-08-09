import FrameBufferFactory from '../../FrameBufferFactory';
import vs from '../vertex/default.vert';
import fs from '../fragment/_index';

export default function ({ webcam, renderer }) {
  const circles = [
    new THREE.Vector4( 0.5,  0.5,  0.0,  0.0 ),
  ];

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
  });

  const frameBuffers = renderFactory.create([
    {
      shaders: {
        fs: fs.test,
      },
      uniforms: {
        data: {
          _type: "object",
          type: "v4v",
          value: circles,
        },
      },
    },
  ]);

  return frameBuffers;
}