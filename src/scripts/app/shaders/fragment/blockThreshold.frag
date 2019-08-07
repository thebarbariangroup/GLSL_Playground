#extension GL_OES_standard_derivatives : enable

uniform sampler2D uImage0;
uniform vec3 uResolution;

varying vec2 vTexCoord;

float sigmoid(float a, float f) {
  return 1.0/(1.0+exp(-f*a));
}

void main() {
  vec4 color = texture2D(uImage0, vTexCoord);

  float grey = 0.21 * color.r + 0.71 * color.g + 0.07 * color.b;

  float vstep = step(grey, 0.6);
  gl_FragColor = vec4(vec3(vstep), 1.);
}