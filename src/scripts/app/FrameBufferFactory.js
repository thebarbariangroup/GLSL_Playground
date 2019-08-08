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
    
    const frameBuffer = this._getFrameBuffer(customSource);
    return frameBuffer || defaultSource;
  }

  _setShaders (customShaders) {
    return Object.assign({}, this.shaders, customShaders || {})
  }

  _setUniforms (customUniforms) {
    for (let key in customUniforms) {
      const value = customUniforms[key];
      // Assuming for now that all custom Uniforms are IDs of framebuffers that we need to get the texture of.
      const frameBuffer = this._getFrameBuffer(value);
      customUniforms[key] = { value: frameBuffer.getOutput() }
    }

    return customUniforms;
  }

  _setOutput (customOutput) {
    if (!customOutput) { return null; }

    const frameBuffer = this._getFrameBuffer(customOutput);
    return frameBuffer.getRenderTarget();
  }

  _getFrameBuffer (idOrBuffer) {
    const type = typeof idOrBuffer;

    switch (type) {
      case 'string':
        return this._getFrameBufferById(idOrBuffer);

      case 'object':
        return idOrBuffer;
    }
  }

}