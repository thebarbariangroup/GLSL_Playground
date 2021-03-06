const LO_DEF = [640, 360];
const MD_DEF = [1280, 720];
const HI_DEF = [2560, 1440];
const SH_DEF = [5120, 2880];
const SQUARE = [800, 600];

export default class Renderer {

  constructor () {
    this.dimensions = null;
    this.resolution = {
      width: 0,
      height: 0
    };

    this._setup();
    this.renderObjects = [];
    this.frameBuffers = [];
  }

  _setup () {
    this._setResolution();
    const d = this._getDimensions(true);

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(d.width, d.height);
    this.renderer.domElement.classList.add('renderer');
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
      this.frameBuffers.forEach((frameBuffer) => {
        frameBuffer.update();
      });

      this.animate();
    });
  }

  addFrameBuffer (frameBuffer) {
    this.frameBuffers.push(frameBuffer);
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