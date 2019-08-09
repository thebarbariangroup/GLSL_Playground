#define steps 2.

uniform sampler2D uImage0;
uniform vec3 uResolution;
uniform float uTime;

varying vec2 vTexCoord;

void main()
{
  vec2 uv = vTexCoord;
    vec4 c = texture2D(uImage0,uv);
    float g = max(c.r,max(c.g,c.b))*steps;
    float fuck = sin(uTime/1000.) + 1.0 * 2000.;
    float f = mod((uv.x+uv.y+500.)*fuck,1.);
    if(mod(g,1.0)>f)
        c.r = ceil(g);
    else
        c.r = floor(g);
    c.r/=steps;
  gl_FragColor = c.rrra;
}