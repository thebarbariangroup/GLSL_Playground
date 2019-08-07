import FrameBuffer from './FrameBuffer';

export default class FrameBufferFactory {

  constructor (opts) {
    this.renderer = opts.renderer;
    this.source = opts.source;
    this.shaders = opts.shaders;


    this.frameBuffers = [];
    this.previousFrameBuffer = null;
  }

  create (fragmentShaders) {
    fragmentShaders.forEach((opts, i) => {
      const source = this._setSource(opts.source);
      const shaders = this._setShaders(opts.shaders);
      const uniforms = this._setUniforms(opts.uniforms);
      const output = this._setOutput(opts.output);

      const frameBuffer = new FrameBuffer({
        id: opts.id || i,
        renderer: this.renderer,
        finalFrameBuffer: i === fragmentShaders.length - 1,
        source,
        shaders,
        uniforms,
        output,
      });

      this.frameBuffers.push(frameBuffer);
      this.previousFrameBuffer = frameBuffer

      return frameBuffer;
    });

    return this.frameBuffers;
  }

  _getFrameBufferById (id) {
    return this.frameBuffers.find((frameBuffer) => {
      return frameBuffer.id === id;
    });
  }

  _setSource (customSource) {
    const defaultSource = this.previousFrameBuffer || this.source;
    if (!customSource) { return defaultSource; }

    const type = typeof customSource;
    let frameBuffer;

    switch (type) {
      case 'string':
        frameBuffer = this._getFrameBufferById(customSource);
        break;

      case 'object':
        frameBuffer = customSource;
        break;
    }
    
    
    return frameBuffer || defaultSource;
  }

  _setShaders (customShaders) {
    return Object.assign({}, this.shaders, customShaders || {})
  }

  _setUniforms (customUniforms) {
    for (let key in customUniforms) {
      const value = customUniforms[key];
      // Assuming for now that all custom Uniforms are IDs of framebuffers that we need to get the texture of.
      const frameBuffer = this._getFrameBufferById(value);
      customUniforms[key] = { value: frameBuffer.getOutput() }
    }

    return customUniforms;
  }

  _setOutput (customOutput) {
    if (!customOutput) { return null; }

    const type = typeof customOutput;
    let frameBuffer;

    switch (type) {
      case 'string':
        frameBuffer = this._getFrameBufferById(customOutput);
        break;

      case 'object':
        frameBuffer = customOutput;
        break;
    }
    
    
    return frameBuffer.getRenderTarget();
  }

}