uniform sampler2D uImage;
uniform vec3 uResolution;
uniform float uTime;

varying vec2 vTexCoord;

void main () {
  vec2 p = vec2(vTexCoord.x * uResolution.x, vTexCoord.y * uResolution.y);
  vec4 color = vec4(0.);


  color.a = length(p = p/uResolution.y - .5);
  // gl_FragColor = texture3D(uImage, vec2(atan(p.y,p.x), .2/color.a) + uTime ) * color.a;
  // gl_FragColor = vec4(color.a, 0., 0., 1.0);

  // gl_FragColor = texture2D(uImage, vec2(atan(vTexCoord.y, vTexCoord.x), .2/color.a) + (sin(uTime / 1000.) + 1.) / 2. );

  // gl_FragColor = vec4((sin(uTest / 1000.) + 1.) / 2., 0., 0., 1.);

  gl_FragColor = texture2D(uImage, vTexCoord * 2.);
}
