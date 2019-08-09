#define radius 10.

uniform sampler2D uImage0;
uniform vec3 uResolution;
uniform float uTime;
uniform vec4 data[1];

varying vec2 vTexCoord;

void main() {

  // gl_FragColor = texture2D(uImage0, vTexCoord);
  // for (int i = 0; i < 1; i++) {
  //   for (int j = 0; j < 1; j++) {
  //     vec2 point = 
  //   }
  // }

  // float v = 0.;

  vec2 coords = vTexCoord * uResolution.xy;

  float d = 0.;
  for (int i = 0; i < 1; i++) {
    vec4 circle = data[i];
    circle.xy = circle.xy * uResolution.xy;
    // float dx = circle.x - vTexCoord.x;
    // float dy = circle.y - vTexCoord.y;

    // v += radius * radius / (dx * dx + dy * dy);

    // step(1., v) {

    // }

    d = max(0., distance(vTexCoord, circle.xy));
  }

  d = 1. - step(radius, d);

  gl_FragColor = vec4(vec3(d), 1.);
}