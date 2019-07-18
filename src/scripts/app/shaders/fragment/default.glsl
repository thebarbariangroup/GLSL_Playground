uniform sampler2D image;

varying vec2 vTexCoord;

void main() {
  gl_FragColor = texture2D(image, vTexCoord);
}