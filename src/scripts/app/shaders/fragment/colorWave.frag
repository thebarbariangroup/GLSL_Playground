uniform sampler2D uImage0;
uniform vec3 uResolution;
uniform float uTime;

varying vec2 vTexCoord;

void main() {
  vec2 uv = vTexCoord;
  vec4 c = texture2D(iChannel0,uv);
  c = sin(uv.x*10.+c*cos(c*6.28+uTime+uv.x)*sin(c+uv.y+uTime)*6.28)*.5+.5;
  c.b+=length(c.rg);
  fragColor = c;
}
