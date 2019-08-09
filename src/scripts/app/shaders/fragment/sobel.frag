uniform sampler2D uImage0;
uniform vec3 uResolution;
uniform float uTime;

varying vec2 vTexCoord;

float strength = 6.0;

void main() {
  vec2 uv = vTexCoord;
  
  /*** Sobel kernels ***/
  // Note: GLSL's mat3 is COLUMN-major ->  mat3[col][row]
  mat3 sobelX = mat3(-1.0, -2.0, -1.0,
                      0.0,  0.0,  0.0,
                      1.0,  2.0,  1.0);
  mat3 sobelY = mat3(-1.0,  0.0,  1.0,
                     -2.0,  0.0,  2.0,
                     -1.0,  0.0,  1.0); 
  sobelX *= strength; 
  sobelY *= strength;
  
  float sumX = 0.0; // x-axis change
  float sumY = 0.0; // y-axis change
  
  for(int i = -1; i <= 1; i++) {
    for(int j = -1; j <= 1; j++) {
      float x = vTexCoord.x + float(i)/uResolution.x; 
      float y =  vTexCoord.y + float(j)/uResolution.y;
        
        // Convolve kernels with image
        sumX += length(texture2D( uImage0, vec2(x, y) ).xyz) * float(sobelX[1+i][1+j]);
        sumY += length(texture2D( uImage0, vec2(x, y) ).xyz) * float(sobelY[1+i][1+j]);
    }
  }
  
  float g = abs(sumX) + abs(sumY);
  
  gl_FragColor = vec4(step(1.0, g));
}