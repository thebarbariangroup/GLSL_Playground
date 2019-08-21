uniform sampler2D uImage0;
uniform sampler2D uImage1;
uniform sampler2D uImage2;
uniform vec3 uResolution;
uniform float uTime;

varying vec2 vTexCoord;

float sigmoid(float a, float f) {
  return 1.0/(1.0+exp(-f*a));
}

void main() {
  vec4 color;
  vec4 c = texture2D(uImage0, vTexCoord);
  float grey = 0.21 * c.r + 0.71 * c.g + 0.07 * c.b;
  // float vstep = step(grey, (1. - (sin(uTime) + 1.) / 2.) / 4.);
  float vstep = step(grey, (1. - (sin(uTime) + 1.) / 2.) / 10.);


  if (vstep == 1.) {
    // color = vec4(vec3(grey), 1.);
    
    // vec4 c = texture2D(uImage0, vTexCoord);
    // float grey = 0.2126 * c.r + 0.7152 * c.g + 0.0722 * c.b;
    // gl_FragColor = vec4(1. - vec3(grey), 1.0);
    color = vec4(0., 1. - (sin(uTime + vTexCoord.x) + 1.) / 2., 1. - (sin(uTime + vTexCoord.y) + 1.) / 2., 1.);

  } else {
    color = c;
    // color = vec4((sin(uTime + vTexCoord.x) + 1.) / 2., (sin(uTime + vTexCoord.y) + 1.) / 2., 0., 1.);
  }
  // gl_FragColor = vec4(vec3(vstep), 1.);
  gl_FragColor = color;
}