const LO_DEF = [640, 360];
const MD_DEF = [1280, 720];
const HI_DEF = [2560, 1440];
const SH_DEF = [5120, 2880];
const SQUARE = [512, 512];

export default class Renderer {

  constructor () {
    this.dimensions = null;
    this.resolution = {
      width: 0,
      height: 0
    };

    this._setup();
    this.renderObjects = [];
  }

  _setup () {
    this._setResolution();

    this.scene = new THREE.Scene();
    const d = this._getDimensions(true);

    this.camera = new THREE.OrthographicCamera(
      d.width/-2,  
      d.width/2, 
      d.height/2, 
      d.height/-2, 
      1, 
      1000
    );
    this.camera.position.set(0, 0, 90);
    this.camera.rotation.x = Math.PI / 180;

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(d.width, d.height);
    this.renderer.domElement.id = 'renderer';
    document.getElementById('rendererContainer').appendChild(this.renderer.domElement);
  }

  _setResolution () {
    const resolution = this._getResolutionFromQuery();
    [this.resolution.width, this.resolution.height] = resolution;
  }

  _getResolutionFromQuery () {
    const resolutionMap = {
      low: LO_DEF,
      mid: MD_DEF,
      high: HI_DEF,
      super: SH_DEF,
      square: SQUARE,
    };

    const queryString = location.search.replace('?', '');
    const queryStringMap = {};

    queryString.split('&').forEach((qsPair) => {
      const splitPair = qsPair.split('=');
      queryStringMap[splitPair[0]] = splitPair[1];
    });

    const requestedResolution = queryStringMap.res;
    
    const resolution = resolutionMap[requestedResolution];

    return resolution ? resolution : LO_DEF;
  }

  _getDimensions (force) {
    if (force) {
      const width = this.resolution.width;
      const height = this.resolution.height;

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
      this.animate();

      this.renderObjects.forEach((object) => {
        object.update();
      });
    });
  }

  add (object) {
    this.renderObjects.push(object);
    this.scene.add(object.get());
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