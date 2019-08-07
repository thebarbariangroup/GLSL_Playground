export default class FrameBuffer {

  constructor (opts) {
    this.id = opts.id;
    this.renderer = opts.renderer;
    this.finalFrameBuffer = opts.finalFrameBuffer; // If true, render to the THREE.js renderer instead of a framebuffer
    this.source = opts.source;
    this.shaders = opts.shaders || {};
    this.customUniforms = opts.uniforms || {};
    this.output = opts.output || null;
    
    this.texture = null;
    
    this.timeStarted = Date.now() / 1000;

    this._setup();
  }

  _setup () {
    [this.renderTarget, this.scene, this.camera] = this._createScene();
    this.plane = this._createPlane();

    this.scene.add(this.plane);
  }

  _createScene () {
    const width = this.renderer.getWidth();
    const height = this.renderer.getHeight();

    const renderTarget = this.output || new THREE.WebGLRenderTarget(width, height);
    const scene = new THREE.Scene();

    const camera = new THREE.OrthographicCamera(
      width/-2, width/2, 
      height/2, height/-2, 
      1,        1000
    );
    camera.position.set(0, 0, 90);
    camera.rotation.x = Math.PI / 180;

    return [renderTarget, scene, camera];
  }

  _createPlane () {
    this.texture = this._createTexture();

    const uniforms = {
      uImage0: { value: this.texture },
      uResolution: {
        value: [this.renderer.getWidth(), this.renderer.getHeight(), 0],
        resolution: new THREE.Uniform(new THREE.Vector3())
      },
      uTime: { value: this.timeStarted },
    };
    Object.assign(uniforms, this.customUniforms);

    const geometry = this._createGeometry();
    const material = new THREE.ShaderMaterial({
      uniforms: uniforms,
      vertexShader: this.shaders.vs,
      fragmentShader: this.shaders.fs,
    });

    return new THREE.Mesh(geometry, material);
  }

  _createTexture () {
    const sourceType = this.source.constructor.name;

    switch (sourceType) {
      case 'Webcam':
        const texture = new THREE.VideoTexture(this.source.getOutput());
        texture.minFilter = THREE.LinearFilter;
        texture.magFilter = THREE.LinearFilter;
        texture.format = THREE.RGBFormat;
        return texture;
      case 'FrameBuffer':
        return this.source.getOutput();
    }
  }

  _createGeometry () {
    const d = {
      renderer: {
        width: this.renderer.getWidth(),
        height: this.renderer.getHeight(),
        wh: this.renderer.getWidth()/this.renderer.getHeight(),
        hw: this.renderer.getHeight()/this.renderer.getWidth()
      },
      source: {
        width: this.source.getWidth(),
        height: this.source.getHeight(),
        wh: this.source.getWidth()/this.source.getHeight(),
        hw: this.source.getHeight()/this.source.getWidth()
      }
    };

    let width, height;

    if (d.renderer.wh > 1) {
      height = d.renderer.height;
      width = d.renderer.height * d.source.wh
    } else {
      width = d.renderer.width;
      height = d.renderer.width * d.source.hw
    }

    return new THREE.PlaneGeometry(width, height);
  }

  getRenderTarget () {
    return this.renderTarget;
  }

  getOutput () {
    return this.renderTarget.texture;
  }

  getWidth () {
    return this.source.getWidth();
  }

  getHeight () {
    return this.source.getHeight();
  }

  get () {
    return this.plane;
  }

  update () {
    if (!this.finalFrameBuffer) {
      this.renderer.renderer.setRenderTarget(this.renderTarget);
    }
    this.renderer.renderer.render(this.scene, this.camera);
    this.renderer.renderer.setRenderTarget(null);

    this.get().material.uniforms.uTime.value = Date.now() / 1000 - this.timeStarted;
  }

}