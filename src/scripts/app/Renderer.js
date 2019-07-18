export default class Renderer {

  constructor () {
    this._setup();
    this.renderObjects = [];
  }

  _setup () {
    this.scene = new THREE.Scene();
    const width = window.innerWidth;
    const height = window.innerHeight;
    this.camera = new THREE.OrthographicCamera(width/-2,  width/2, height/2, height/-2, 1, 1000);
    this.camera.position.set(0, 0, 10);
    this.camera.rotation.x = Math.PI / 180;


    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( this.renderer.domElement );
  }

  animate () {
    requestAnimationFrame(() => {
      this.renderer.render( this.scene, this.camera );
      this.animate ()

      this.renderObjects.forEach((object) => {
        object.material.uniforms.uTime.value = Date.now();
        // console.log(((Math.sin(Date.now()/1000.0) + 1.0) * 0.5) * 10);
      });
    });
  }

  add (object) {
    this.renderObjects.push(object);
    this.scene.add(object);
  }

}