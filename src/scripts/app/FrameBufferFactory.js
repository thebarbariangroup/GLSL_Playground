import FrameBuffer from './FrameBuffer';

export default class FrameBufferFactory {

  constructor (opts) {
    this.renderer = opts.renderer;
    this.source = opts.source;
    this.shaders = opts.shaders;

    this.previousFrameBuffer = null;
  }

  create (fragmentShaders) {
    return fragmentShaders.map((fs, i) => {
      this.shaders.fs = fs;

      this.previousFrameBuffer = new FrameBuffer({
        renderer: this.renderer,
        source: this.previousFrameBuffer || this.source,
        shaders: this.shaders,
        finalFrameBuffer: i === fragmentShaders.length - 1,
      });

      return this.previousFrameBuffer
    });
  }

}