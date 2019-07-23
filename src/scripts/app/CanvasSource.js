export default class CanvasSource {

  constructor (opts) {
    this.webcam = opts.webcam;
    this.output = null;

    this.state = {
      streaming: false,
    }

    this._setup();
  }

  _setup () {
    this.getOutput();

    this.output.width  = this.webcam.getWidth();
    this.output.height = this.webcam.getHeight();

    this.context = this.output.getContext('2d');
    
    this.streamToOutput();
  }

  getWidth () {
    return this.webcam.getWidth();
  }

  getHeight () {
    return this.webcam.getHeight();
  }

  getOutput () {
    if (!this.output) {
      this.output = document.createElement('canvas');
      this.output.style.display = 'none';
      document.body.appendChild(this.output);
    }
    return this.output;
  }

  streamToOutput (time) {
    this.context.drawImage(this.webcam.getOutput(), 0, 0, this.webcam.getWidth(), this.webcam.getHeight());

    requestAnimationFrame((t) => {
      this.streamToOutput(t);
    });
  }

}