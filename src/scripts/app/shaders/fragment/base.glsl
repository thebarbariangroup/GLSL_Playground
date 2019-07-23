uniform sampler2D uImage0;

varying vec2 vTexCoord;

void main() {
  gl_FragColor = texture2D(uImage0, vTexCoord);
}