precision highp float;


uniform sampler2D uImage0;
uniform vec3 uResolution;
uniform float uTime;

varying vec2 vTexCoord;

void main() {
  // float y1 = vTexCoord.y + (50./uResolution.y);
  highp vec4 c = texture2D(uImage0, vTexCoord);

  // gl_FragColor = vec4(c.r + 0.05, c.g + 0.008, c.b + 0.002, c.a);
  gl_FragColor = c + 0.002;

}