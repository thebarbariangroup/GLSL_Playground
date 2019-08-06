uniform sampler2D uImage;
uniform vec3 uResolution;
uniform float uTime;

varying vec2 vTexCoord;

const float PI = 3.1415926535897932384626433832795;

mat4 rotateZ( in float angle ) {
  return mat4(  
    cos(angle), -sin(angle),  0,  0,
    sin(angle),  cos(angle),  0,  0,
    0,                    0,  1,  0,
    0,                    0,  0,  1
  );
}

void main() {
  vec4 color = texture2D(uImage, vTexCoord);
  vec4 x = vec4(vTexCoord - vec2(0.5,0.5), 0., 1.);
  float rotationRadians = fract(uTime/5.) * -2. * PI;

  mat4 rotationZ = rotateZ(rotationRadians);
  x *= rotationZ;
  float radius = length(x);
  float angle = atan(x.y, x.x) * 0.5;


  gl_FragColor = color * angle;
}