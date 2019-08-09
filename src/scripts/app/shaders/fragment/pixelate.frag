#define PIXEL_SIZE 10.0

uniform sampler2D uImage0;
uniform vec3 uResolution;
uniform float uTime;

varying vec2 vTexCoord;

void main() {
  vec4 c = vec4(0);

  vec2 uv = vTexCoord;
  float dx = 1.0 / uResolution.x;
  float dy = 1.0 / uResolution.y;
  uv.x = (dx * PIXEL_SIZE) * floor(uv.x / (dx * PIXEL_SIZE));
  uv.y = (dy * PIXEL_SIZE) * floor(uv.y / (dy * PIXEL_SIZE));

  for (int i = 0; i < int(PIXEL_SIZE); i++)
      for (int j = 0; j < int(PIXEL_SIZE); j++)
          c += texture2D(uImage0, vec2(uv.x + dx * float(i), uv.y + dy * float(j)));

  c /= pow(PIXEL_SIZE, 2.0);

  gl_FragColor = c;
}
