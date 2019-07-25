uniform sampler2D uImage;
uniform float uTime;

varying vec2 vTexCoord;

void main() {
  gl_FragColor = texture2D(uImage, vTexCoord);
}