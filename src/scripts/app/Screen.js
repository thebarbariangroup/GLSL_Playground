import vs from './shaders/vertex/default.glsl';
import fragments from './shaders/fragment/index';

const fs = fragments.greyscale;

export default class Screen {

  constructor (opts) {
    this.renderer = opts.renderer;
    this.source = opts.source;

    this.frame = 0;

    this._setup();
  }

  _setup () {
    this.texture = new THREE.VideoTexture(this.source.getOutput());
    this.texture.minFilter = THREE.NearestFilter;
    this.texture.magFilter = THREE.NearestFilter;
    this.texture.format = THREE.RGBFormat;

    var uniforms = {
      uImage0: {value: this.texture},
      uImage1: {value: this.texture},
      uResolution: {
        value: [this.source.getWidth(), this.source.getHeight(), 0],
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

  update () {
    // NOOP
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


    return new THREE.PlaneGeometry(1280, 720);
  }
}