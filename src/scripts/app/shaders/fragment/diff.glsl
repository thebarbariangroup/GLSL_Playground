uniform sampler2D uImage0;
uniform sampler2D uImage1;

varying vec2 vTexCoord;

void main() {
  vec4 color0 = texture2D(uImage0, vTexCoord);
  float grey0 = 0.21 * color0.r + 0.71 * color0.g + 0.07 * color0.b;

  vec4 color1 = texture2D(uImage1, vec2((vTexCoord.x*2.), vTexCoord.y));
  float grey1 = 0.21 * color1.r + 0.71 * color1.g + 0.07 * color1.b;

  float absoluteDifference = abs(grey0 - grey1);

  // absoluteDifference = step(0.1, absoluteDifference);

  // gl_FragColor = vec4(vec3(absoluteDifference), 1.);
  gl_FragColor = color0;
}