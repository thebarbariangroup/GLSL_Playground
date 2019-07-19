export default class Renderer {

  constructor () {
    this.dimensions = null;

    this._setup();
    this.renderObjects = [];
  }

  _setup () {
    this.scene = new THREE.Scene();
    const dimensions = this._getDimensions(true);

    this.camera = new THREE.OrthographicCamera(
      dimensions.width/-2,  
      dimensions.width/2, 
      dimensions.height/2, 
      dimensions.height/-2, 
      1, 
      1000
    );
    this.camera.position.set(0, 0, 10);
    this.camera.rotation.x = Math.PI / 180;


    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('rendererContainer').appendChild( this.renderer.domElement );
  }

  _getDimensions (force) {
    if (force) {
      const width = window.innerWidth;
      const height = window.innerHeight;

      this.dimensions = {
        width,
        height
      };
    }

    return this.dimensions;
  }

  animate () {
    requestAnimationFrame(() => {
      this.renderer.render( this.scene, this.camera );
      this.animate ()

      this.renderObjects.forEach((object) => {
        object.material.uniforms.uTime.value = Date.now();
      });
    });
  }

  add (object) {
    this.renderObjects.push(object);
    this.scene.add(object);
  }

  getHeight() {
    const d = this._getDimensions();
    return d.height;
  }

  getWidth() {
    const d = this._getDimensions();
    return d.width;
  }
}