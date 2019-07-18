#extension GL_OES_standard_derivatives : enable

uniform sampler2D image;

varying vec2 vTexCoord;

float sigmoid(float a, float f) {
  return 1.0/(1.0+exp(-f*a));
}

void main() {
  vec2 dir = vec2(1., 1.);

  //this will be our RGBA sum
  vec4 sum = vec4(0.0);
    
  //our original texcoord for this fragment
  vec2 tc = vTexCoord;

  //the amount to blur, i.e. how far off center to sample from 
  //1.0 -> blur by one pixel
  //2.0 -> blur by two pixels, etc.
  float blur = 0.0009; 

  //the direction of our blur
  //(1.0, 0.0) -> x-axis blur
  //(0.0, 1.0) -> y-axis blur
  float hstep = dir.x;
  float vstep = dir.y;

  //apply blurring, using a 9-tap filter with predefined gaussian weights
      
  sum += texture2D(image, vec2(tc.x - 4.0*blur*hstep, tc.y - 4.0*blur*vstep)) * 0.0162162162;
  sum += texture2D(image, vec2(tc.x - 3.0*blur*hstep, tc.y - 3.0*blur*vstep)) * 0.0540540541;
  sum += texture2D(image, vec2(tc.x - 2.0*blur*hstep, tc.y - 2.0*blur*vstep)) * 0.1216216216;
  sum += texture2D(image, vec2(tc.x - 1.0*blur*hstep, tc.y - 1.0*blur*vstep)) * 0.1945945946;
  
  sum += texture2D(image, vec2(tc.x, tc.y)) * 0.2270270270;
  
  sum += texture2D(image, vec2(tc.x + 1.0*blur*hstep, tc.y + 1.0*blur*vstep)) * 0.1945945946;
  sum += texture2D(image, vec2(tc.x + 2.0*blur*hstep, tc.y + 2.0*blur*vstep)) * 0.1216216216;
  sum += texture2D(image, vec2(tc.x + 3.0*blur*hstep, tc.y + 3.0*blur*vstep)) * 0.0540540541;
  sum += texture2D(image, vec2(tc.x + 4.0*blur*hstep, tc.y + 4.0*blur*vstep)) * 0.0162162162;

  vec4 color = texture2D(image, vTexCoord) * vec4(sum.rgb, 1.0);

  // vec4 sample = texture2D(image, vTexCoord);
  float grey = 0.21 * color.r + 0.71 * color.g + 0.07 * color.b;

  // http://blog.ruofeidu.com/simplest-fatest-glsl-edge-detection-using-fwidth/
  float edgeStrength = length(fwidth(vec4(vec3(grey), 1.)));
  edgeStrength = sigmoid(edgeStrength - 0.1, 25.0); 
  gl_FragColor = vec4(edgeStrength, edgeStrength - 0.03, 0.0, 1.0); 
}