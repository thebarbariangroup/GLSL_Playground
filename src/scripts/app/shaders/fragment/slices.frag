#define SLICES 25.0
#define STRENGTH 0.01

uniform sampler2D uImage0;
uniform vec3 uResolution;
uniform float uTime;

varying vec2 vTexCoord;

void main() {
  float sliceY = floor(vTexCoord.y * SLICES) - SLICES/2.;
  // float sliceX = floor(vTexCoord.x * SLICES) - SLICES/2.;
  float x = sin(uTime + sliceY) * STRENGTH + vTexCoord.x;
  // float y = cos(uTime + sliceX) * STRENGTH + vTexCoord.y;
  gl_FragColor = texture2D(uImage0, vec2(x, vTexCoord.y));
}