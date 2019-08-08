uniform sampler2D uImage0;
uniform sampler2D uImage1;
uniform vec3 uResolution;
uniform float uTime;

varying vec2 vTexCoord;

void main() {
  vec4 c0 = texture2D(uImage0, vTexCoord - vec2(-1.5/uResolution.y, 0.));
  vec4 c1 = texture2D(uImage1, vTexCoord);

  vec4 f = c0 * .99 + c1;

  gl_FragColor = f;
}