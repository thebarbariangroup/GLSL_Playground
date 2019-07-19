uniform sampler2D image;

varying vec2 vTexCoord;

mat2 rot(float a) {
  return mat2(cos(a),sin(a),-sin(a),cos(a));  
}

vec4 formula(vec4 p) {
    p.xz = abs(p.xz+1.)-abs(p.xz-1.)-p.xz;
    p.y-=.25;
    p.xy*=rot(radians(35.));
    p=p*2./clamp(dot(p.xyz,p.xyz),.2,1.);
  return p;
}

void main() {
  vec4 fractal = formula(texture2D(image, vTexCoord));
  gl_FragColor = fractal;
}