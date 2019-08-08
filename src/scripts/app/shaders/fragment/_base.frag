uniform sampler2D uImage0;
uniform vec3 uResolution;
uniform float uTime;

varying vec2 vTexCoord;

void main() {
  gl_FragColor = texture2D(uImage0, vTexCoord);
}