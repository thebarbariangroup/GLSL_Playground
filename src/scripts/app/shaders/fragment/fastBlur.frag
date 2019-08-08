uniform sampler2D uImage0;
uniform vec3 uResolution;
uniform float uTime;

varying vec2 vTexCoord;

vec4 blur9(sampler2D image, vec2 uv, vec2 resolution, vec2 direction) {
  vec4 color = vec4(0.0);
  vec2 off1 = vec2(1.3846153846) * direction;
  vec2 off2 = vec2(3.2307692308) * direction;
  color += texture2D(image, uv) * 0.2270270270;
  color += texture2D(image, uv + (off1 / resolution)) * 0.3162162162;
  color += texture2D(image, uv - (off1 / resolution)) * 0.3162162162;
  color += texture2D(image, uv + (off2 / resolution)) * 0.0702702703;
  color += texture2D(image, uv - (off2 / resolution)) * 0.0702702703;
  return color;
}

void main() {
  vec2 uv = vTexCoord;

  // if (flip) {
  //   uv.y = 1.0 - uv.y;
  // }

  gl_FragColor = blur9(uImage0, uv, uResolution.xy, vec2(sin(uTime) * 0., cos(uTime) * 0.));
}