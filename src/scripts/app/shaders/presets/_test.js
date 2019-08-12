import FrameBufferFactory from '../../FrameBufferFactory';
import vs from '../vertex/default.vert';
import fs from '../fragment/_index';

export default function ({ webcam, renderer }) {
  const circles = [];
  const radius = 0.005;

  for (var i = 100; i >= 0; i--) {
    const circle = new THREE.Vector4( 
      Math.random(), 
      Math.random(), 
      (Math.random() - 0.5) * 0.005, 
      (Math.random() - 0.5) * 0.005
    );
    circles.push(circle);
  }

  const outputFactory = new FrameBufferFactory({
    renderer: renderer,
    shaders: {
      vs: vs,
      fs: fs.base,
    }
  });

  const outputBuffers = outputFactory.create([
    {},
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
      id: 'circles0',
      shaders: {
        fs: fs.test,
      },
      uniforms: {
        data: {
          _type: "object",
          type: "v4v",
          value: circles,
        },
        radius: {
          _type: "object",
          value: radius,
        }
      },
      customUpdate: () => {
        const dampening = 1.0;
        const maxSpeed = 0.005;
        const cof = 1.0;

        // const randomIndexToAccelerate = Math.floor(Math.random() * circles.length);
        // const circleToAccelerate = circles[randomIndexToAccelerate];
        // circleToAccelerate.z *= Math.random() * 0.2 + 1;
        // circleToAccelerate.w *= Math.random() * 0.2 + 1;

        // circleToAccelerate.z = Math.min(Math.max(circleToAccelerate.z, -maxSpeed), maxSpeed);
        // circleToAccelerate.w = Math.min(Math.max(circleToAccelerate.w, -maxSpeed), maxSpeed);

        for (var i = circles.length - 1; i >= 0; i--) {
          const circle = circles[i];
          circle.x += circle.z * cof;
          circle.y += circle.w * cof;

          if (circle.x - radius <= 0 || circle.x + radius >= 1) {
            circle.z *= -1;
          }

          if (circle.y - radius <= 0 || circle.y + radius >= 1) {
            circle.w *= -1;
          }
        }

        for (var i = circles.length - 1; i >= 0; i--) {
          const circle = circles[i];
          for (var j = i - 1; j >= 0; j--) {
            const localCircle = circles[j];
            const distance =  Math.hypot(localCircle.x - circle.x, localCircle.y - circle.y); 

            if (distance <= radius * 2) {
              // Formula is (Xv1 * (mass1 - mass2) + (2 * mass2 * Xv2)) / (mass1 + mass2);
              // Since we are sharing the same mass, we can cut out part of the formula for optimization
              const circleZ = ((2 * radius * localCircle.z)) / (radius + radius) * dampening;
              const circleW = ((2 * radius * localCircle.w)) / (radius + radius) * dampening;
              const localCircleZ = ((2 * radius * circle.z)) / (radius + radius) * dampening;
              const localCircleW = ((2 * radius * circle.w)) / (radius + radius) * dampening;
              
              circle.z = circleZ;
              circle.w = circleW;
              localCircle.z = localCircleZ;
              localCircle.w = localCircleW;

              circle.x += circle.z;
              circle.y += circle.w;
              localCircle.x += localCircle.z;
              localCircle.y += localCircle.w;
            }
          }
        }

      }
    },
    {
      source: outputBuffer,
    },
    {
      shaders: {
        fs: fs.addFrameBuffers,
      },
      uniforms: {
        uImage1: 'circles0',
      },
      output: outputBuffer,
    },
    {}
  ]);

  return frameBuffers;
}