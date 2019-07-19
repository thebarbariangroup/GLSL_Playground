uniform sampler2D uImage;

varying vec2 vTexCoord;

void main() {
  vec4 sample = texture2D(uImage, vTexCoord);
  float grey = 0.21 * sample.r + 0.71 * sample.g + 0.07 * sample.b;
  gl_FragColor = vec4(grey, grey, grey, 1.0);
}