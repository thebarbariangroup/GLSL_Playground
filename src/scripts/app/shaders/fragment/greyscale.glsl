uniform sampler2D image;

varying vec2 vUv;

void main() {
  vec4 sample = texture2D(image, vUv);
  float grey = 0.21 * sample.r + 0.71 * sample.g + 0.07 * sample.b;
  gl_FragColor = vec4(grey, grey, grey, 1.0);
}