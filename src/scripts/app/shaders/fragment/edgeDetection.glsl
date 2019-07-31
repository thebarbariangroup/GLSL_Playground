#extension GL_OES_standard_derivatives : enable // To allow fwidth to be used.

uniform sampler2D uImage;
uniform vec3 uResolution;
uniform float uTime;

varying vec2 vTexCoord;

float sigmoid(float a, float f) {
  return 1./(1.0+exp(-f*a));
}

void main() {
  vec4 color = texture2D(uImage, vTexCoord.xy);

  // http://blog.ruofeidu.com/simplest-fatest-glsl-edge-detection-using-fwidth/
  float edgeStrength = length(fwidth(vec4(color.xyz, 1.)));
  edgeStrength = sigmoid(edgeStrength - 0.15, 20.); 
  float distanceFromCenter = 1. - (distance(uResolution.xy/2., vec2(uResolution.x * vTexCoord.x, uResolution.y * vTexCoord.y)) / uResolution.y);
  // edgeStrength *= step(.1, distanceFromCenter * (-12. * log(sin(uTime/2.) + 1. * 5.) + 21.));
  // edgeStrength *= min(1., distanceFromCenter * (sin(uTime/2.) + 1. / 2.));  
  gl_FragColor = vec4(edgeStrength, edgeStrength - 0.04, 0.0, 1.0);
}