uniform sampler2D uImage0;
uniform vec3 uResolution;
uniform float uTime;

varying vec2 vTexCoord;

// Created by inigo quilez - iq/2013
// License Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License.

void main()
{
    vec2 fragCoords = vec2(vTexCoord.x * uResolution.x, vTexCoord.y * uResolution.y);
    vec2 p = (-uResolution.xy + 2.0*fragCoords)/uResolution.y;

    p *= 0.75;
    
    float a = atan( p.y, p.x );
    float r = sqrt( dot(p,p) );
    
    a += sin(0.5*r-0.5*uTime );
  
  float h = 0.5 + 0.5*cos(9.0*a);

  float s = smoothstep(0.4,0.5,h);

    vec2 uv;
    uv.x = uTime + 1.0/(r + .1*s);
    uv.y = 3.0*a/3.1416;

    vec3 col = texture2D( uImage0, uv ).xyz;

    float ao = smoothstep(0.0,0.3,h)-smoothstep(0.5,1.0,h);
    col *= 1.0 - 0.6*ao*r;
  col *= r;

    gl_FragColor = vec4( col, 1.0 );
}