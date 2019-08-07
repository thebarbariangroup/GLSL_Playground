uniform sampler2D uImage0;

varying vec2 vTexCoord;

void main() {
  vec4 c = texture2D(uImage0, vTexCoord);
  float grey = 0.2126 * c.r + 0.7152 * c.g + 0.0722 * c.b;
  gl_FragColor = vec4(vec3(grey), 1.0);
}