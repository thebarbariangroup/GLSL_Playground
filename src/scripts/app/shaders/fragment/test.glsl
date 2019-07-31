uniform sampler2D uImage;
uniform float uTime;

varying vec2 vTexCoord;

void main()
{   
    for (int i=-kSize; i <= kSize; ++i) {
      for (int j=-kSize; j <= kSize; ++j) {
        c = texture2D(uImage, (vTexCoord.xy + vec2(float(i)/uResolution.x,float(j)/uResolution.y))).rgb;
        factor = normpdf3(cc-c, BSIGMA)*bZ*kernel[kSize+j]*kernel[kSize+i];
        Z += factor;
        final_colour += factor*cc;
      }
    }

    gl_FragColor = vec4(1., 0., 0., 1.);
}