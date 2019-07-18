import vs from './shaders/vertex/default.glsl';
import fs from './shaders/fragment/edgeDetection.glsl';

export default class Screen {

  constructor (opts) {
    this.video = opts.video;

    this._setup();
  }

  _setup () {
    const texture = new THREE.VideoTexture(this.video);
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.format = THREE.RGBFormat;

    var uniforms = {
      uImage: {value: texture},
      uResolution: {
        value: [1280, 720, 0],
        resolution: new THREE.Uniform(new THREE.Vector3())
      },
      uTime: {value: Date.now()},
    };

    const geometry = new THREE.PlaneGeometry(1280, 720);
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
}