uniform sampler2D uImage0;
uniform vec3 uResolution;
uniform float uTime;

varying vec2 vTexCoord;

vec2 params = vec2(1., 7.);

float wave(vec2 pos, float t, float freq, float numWaves, vec2 center) {
  float d = length(pos - center);
  d = log(1.0 + exp(d));
  return 1.0/(1.0+20.0*d*d) *
       sin(2.0*3.1415*(-numWaves*d + t*freq));
}

float height(vec2 pos, float t) {
  float w;
  w =  wave(pos, t, params.x, params.y, vec2(0.5, -0.5));
  return w;
}

vec2 normal(vec2 pos, float t) {
  return  vec2(height(pos - vec2(0.01, 0), t) - height(pos, t), 
         height(pos - vec2(0, 0.01), t) - height(pos, t));
}

void main() {
    vec2 uv = vTexCoord;
    vec2 uvn = 3.0*uv - vec2(1.0);  
    uv += normal(uvn, uTime);
    gl_FragColor = texture2D(uImage0, uv);
}