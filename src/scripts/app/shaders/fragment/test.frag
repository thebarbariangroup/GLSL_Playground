uniform sampler2D uImage0;
uniform vec3 uResolution;
uniform float uTime;
uniform vec4 data[1];

varying vec2 vTexCoord;

void main() {
  // gl_FragColor = texture2D(uImage0, vTexCoord);
  gl_FragColor = data[0];

}