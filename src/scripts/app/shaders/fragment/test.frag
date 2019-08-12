// #define radius 7.
#define numCircles 100

uniform sampler2D uImage0;
uniform vec3 uResolution;
uniform float uTime;
uniform vec4 data[numCircles];
uniform float radius;

varying vec2 vTexCoord;

void main() {
  float r = radius * uResolution.x;
  vec2 coords = vTexCoord * uResolution.xy;

  float d = 0.;
  for (int i = 0; i < numCircles; i++) {
    vec4 circle = data[i];
    circle.xy = circle.xy * uResolution.xy;

    d = max(d, 1. - step(r, distance(coords, circle.xy)));
  }


  gl_FragColor = vec4(d, d * 0.8, 0., 1.);
}