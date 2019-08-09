uniform sampler2D uImage0;
uniform vec3 uResolution;
uniform float uTime;

varying vec2 vTexCoord;

const int lookupSize = 32;
const float errorCarry = 1.0;

float getGrayscale(vec2 coords){
  vec2 uv = coords / uResolution.xy;
  vec3 sourcePixel = texture2D(uImage0, uv).rgb;
  return length(sourcePixel*vec3(0.2126,0.7152,0.0722));
}

void main() {

  vec2 fragCoord = vTexCoord * uResolution.xy;
  
  int topGapY = int(uResolution.y - fragCoord.y);
  
  int cornerGapX = int((fragCoord.x < 10.0) ? fragCoord.x : uResolution.x - fragCoord.x);
  int cornerGapY = int((fragCoord.y < 10.0) ? fragCoord.y : uResolution.y - fragCoord.y);
  int cornerThreshhold = ((cornerGapX == 0) || (topGapY == 0)) ? 5 : 4;

  vec4 c = vec4(0., 0., 0., 1.);
  
  if (cornerGapX+cornerGapY < cornerThreshhold) {
        
    c = vec4(0,0,0,1);
    
  } else if (topGapY < 20) {
      
      if (topGapY == 19) {
        
        c = vec4(0,0,0,1);
        
      } else {
    
        c = vec4(1,1,1,1);
        
      }
    
  } else {
    
    float xError = 0.0;
    for(int xLook=0; xLook<lookupSize; xLook++){
      float grayscale = getGrayscale(fragCoord.xy + vec2(-lookupSize+xLook,0));
      grayscale += xError;
      float bit = grayscale >= 0.5 ? 1.0 : 0.0;
      xError = (grayscale - bit)*errorCarry;
    }
    
    float yError = 0.0;
    for(int yLook=0; yLook<lookupSize; yLook++){
      float grayscale = getGrayscale(fragCoord.xy + vec2(0,-lookupSize+yLook));
      grayscale += yError;
      float bit = grayscale >= 0.5 ? 1.0 : 0.0;
      yError = (grayscale - bit)*errorCarry;
    }
    
    float finalGrayscale = getGrayscale(fragCoord.xy);
    finalGrayscale += xError*0.5 + yError*0.5;
    float finalBit = finalGrayscale >= 0.5 ? 1.0 : 0.0;
    
    c = vec4(finalBit,finalBit,finalBit,1);
      
  }

  gl_FragColor = c;
  
}