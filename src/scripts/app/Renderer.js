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
    this.renderer.domElement.id = 'renderer';
    document.getElementById('rendererContainer').appendChild(this.renderer.domElement);

    this.bufferScene = new THREE.Scene();
    this.bufferTexture = new THREE.WebGLRenderTarget( 
      window.innerWidth, 
      window.innerHeight, { 
        minFilter: THREE.LinearFilter, 
        magFilter: THREE.NearestFilter
      }
    );

    this.bufferTexture.autoClear = false;

    const geometry = new THREE.PlaneGeometry(window.innerWidth, window.innerHeight);
    const material = new THREE.MeshBasicMaterial({ 
      map: this.bufferTexture, 
      side: THREE.DoubleSide,
    });
    const plane = new THREE.Mesh(geometry, material);

    this.scene.add(plane);
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
    setInterval(() => {
      this.renderer.setRenderTarget(this.bufferTexture);
      this.renderer.render(this.bufferScene, this.camera);
      this.renderer.setRenderTarget(null);

      this.renderer.render(this.scene, this.camera);
      this.renderObjects.forEach((object) => {
        object.update();
      });
    }, 1000/30);
  }

  add (object) {
    this.renderObjects.push(object);
    this.bufferScene.add(object.get());
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