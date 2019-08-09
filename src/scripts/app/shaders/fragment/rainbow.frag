uniform sampler2D uImage0;
uniform vec3 uResolution;
uniform float uTime;

varying vec2 vTexCoord;

void main() {
  vec2 uv = vTexCoord;
  vec4 c = vec4(0.0);
  for(float i = 0.; i < 50.; i++){
    vec3 color = sin(i/40. + 6.28 * (vec3(0.,.33,.66) + texture2D(uImage0,vec2(uv.x,uv.y-(i/uResolution.y))).rgb)) * .5 + .5;
    c.rgb = max(c.rgb, color);   
  }
  c.rgb = sin(( vec3(0.,.33,.66)+c.rgb+uv.y)*6.28)*.5+.5;
  c.a = 1.0;
  gl_FragColor = c;
}