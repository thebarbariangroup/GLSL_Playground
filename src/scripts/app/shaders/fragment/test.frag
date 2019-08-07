uniform sampler2D uImage0;
uniform sampler2D uImage1;
uniform vec3 uResolution;
uniform float uTime;

varying vec2 vTexCoord;

// const float PI = 3.1415926535897932384626433832795;


void main() {
  // // vec4 color = texture2D(uImage0, vTexCoord);
  // vec2 c = vTexCoord - vec2(0.5,0.5);

  // float d = (0.3 - distance(vec2(0.), vec2(c.x, c.y * c.y)));
  vec4 c0 = texture2D(uImage0, vTexCoord);
  vec4 c1 = texture2D(uImage0, vTexCoord);

  gl_FragColor = c1 + c0;
}