uniform sampler2D uImage;

varying vec2 vTexCoord;

void main() {
  vec4 c = texture2D(uImage, vTexCoord);
  float grey = 0.2126 * c.r + 0.7152 * c.g + 0.0722 * c.b;
  gl_FragColor = vec4(grey, grey, grey, 1.0);
}