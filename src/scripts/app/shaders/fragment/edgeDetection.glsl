#extension GL_OES_standard_derivatives : enable // To allow fwidth to be used.

uniform sampler2D uImage;
uniform vec3 uResolution;

varying vec2 vTexCoord;

float sigmoid(float a, float f) {
  return 1./(1.0+exp(-f*a));
}

void main() {
//   vec2 dir = vec2(1., 1.);

//   //this will be our RGBA sum
//   vec4 sum = vec4(0.0);
    
//   //our original texcoord for this fragment
//   vec2 tc = vTexCoord;

//   //the amount to blur, i.e. how far off center to sample from 
//   //1.0 -> blur by one pixel
//   //2.0 -> blur by two pixels, etc.
//   float blur = 0.0009; 

//   //the direction of our blur
//   //(1.0, 0.0) -> x-axis blur
//   //(0.0, 1.0) -> y-axis blur
//   float hstep = dir.x;
//   float vstep = dir.y;

//   //apply blurring, using a 9-tap filter with predefined gaussian weights
      
//   sum += texture2D(uImage, vec2(tc.x - 4.0*blur*hstep, tc.y - 4.0*blur*vstep)) * 0.0162162162;
//   sum += texture2D(uImage, vec2(tc.x - 3.0*blur*hstep, tc.y - 3.0*blur*vstep)) * 0.0540540541;
//   sum += texture2D(uImage, vec2(tc.x - 2.0*blur*hstep, tc.y - 2.0*blur*vstep)) * 0.1216216216;
//   sum += texture2D(uImage, vec2(tc.x - 1.0*blur*hstep, tc.y - 1.0*blur*vstep)) * 0.1945945946;
  
//   sum += texture2D(uImage, vec2(tc.x, tc.y)) * 0.2270270270;
  
//   sum += texture2D(uImage, vec2(tc.x + 1.0*blur*hstep, tc.y + 1.0*blur*vstep)) * 0.1945945946;
//   sum += texture2D(uImage, vec2(tc.x + 2.0*blur*hstep, tc.y + 2.0*blur*vstep)) * 0.1216216216;
//   sum += texture2D(uImage, vec2(tc.x + 3.0*blur*hstep, tc.y + 3.0*blur*vstep)) * 0.0540540541;
//   sum += texture2D(uImage, vec2(tc.x + 4.0*blur*hstep, tc.y + 4.0*blur*vstep)) * 0.0162162162;

  // vec4 color = texture2D(uImage, vTexCoord) * vec4(sum.rgb, 1.0);
  vec4 color = texture2D(uImage, vTexCoord.xy);

  float grey = 0.21 * color.r + 0.71 * color.g + 0.07 * color.b;

  // http://blog.ruofeidu.com/simplest-fatest-glsl-edge-detection-using-fwidth/
  float edgeStrength = length(fwidth(vec4(vec3(grey), 1.)));
  edgeStrength = sigmoid(edgeStrength - 0.15, 20.); 
  gl_FragColor = vec4(edgeStrength, edgeStrength - 0.04, 0.0, 1.0); 
  // gl_FragColor = fwidth(vec4(vec3(grey), 1.));

}


// #define SIGMA 10.0
// #define BSIGMA 0.1
// #define MSIZE 15

// uniform sampler2D uImage;
// uniform vec3 uResolution;

// varying vec2 vTexCoord;

// float normpdf(in float x, in float sigma)
// {
//   return 0.39894*exp(-0.5*x*x/(sigma*sigma))/sigma;
// }

// float normpdf3(in vec3 v, in float sigma)
// {
//   return 0.39894*exp(-0.5*dot(v,v)/(sigma*sigma))/sigma;
// }


// void main() {
//   vec3 c = texture2D(uImage, vTexCoord).rgb;

//   // declare stuff
//   const int kSize = (MSIZE-1)/2;
//   float kernel[MSIZE];
//   vec3 final_colour = vec3(0.0);
  
//   //create the 1-D kernel
//   float Z = 0.0;
//   for (int j = 0; j <= kSize; ++j) {
//     kernel[kSize+j] = kernel[kSize-j] = normpdf(float(j), SIGMA);
//   }
  
  
//   vec3 cc;
//   float factor;
//   float bZ = 1.0/normpdf(0.0, BSIGMA);
//   //read out the texels
//   for (int i=-kSize; i <= kSize; ++i) {
//     for (int j=-kSize; j <= kSize; ++j) {
//       cc = texture2D(uImage, (vTexCoord.xy + vec2(float(i)/uResolution.x,float(j)/uResolution.y))).rgb;
//       factor = normpdf3(cc-c, BSIGMA)*bZ*kernel[kSize+j]*kernel[kSize+i];
//       Z += factor;
//       final_colour += factor*cc;
//     }
//   }

//   gl_FragColor = vec4(final_colour/Z, 1.0);
// }