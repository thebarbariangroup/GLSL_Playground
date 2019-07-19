import vs from './shaders/vertex/default.glsl';
import fs from './shaders/fragment/edgeDetection.glsl';

export default class Screen {

  constructor (opts) {
    this.renderer = opts.renderer;
    this.webcam = opts.webcam;

    this._setup();
  }

  _setup () {
    const texture = new THREE.VideoTexture(this.webcam.getOutput());
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.format = THREE.RGBFormat;

    var uniforms = {
      uImage: {value: texture},
      uResolution: {
        value: [this.webcam.getWidth(), this.webcam.getHeight(), 0],
        resolution: new THREE.Uniform(new THREE.Vector3())
      },
      uTime: {value: Date.now()},
    };

    const geometry = this._createGeometry();
    const material = new THREE.ShaderMaterial({
      uniforms: uniforms,
      vertexShader: vs,
      fragmentShader: fs,
    });
    this.plane = new THREE.Mesh(geometry, material);
  }

  get () {
    return this.plane;
  }

  _createGeometry () {
    const d = {
      renderer: {
        width: this.renderer.getWidth(),
        height: this.renderer.getHeight(),
        wh: this.renderer.getWidth()/this.renderer.getHeight(),
        hw: this.renderer.getHeight()/this.renderer.getWidth()
      },
      webcam: {
        width: this.webcam.getWidth(),
        height: this.webcam.getHeight(),
        wh: this.webcam.getWidth()/this.webcam.getHeight(),
        hw: this.webcam.getHeight()/this.webcam.getWidth()
      }
    };

    let width, height;

    if (d.renderer.wh > 1) {
      width = d.renderer.width;
      height = d.renderer.width * d.webcam.hw
    } else {
      height = d.renderer.height;
      width = d.renderer.height * d.webcam.wh
    }


    return new THREE.PlaneGeometry(width, height);
  }
}