uniform vec3 uResolution;
uniform float uTime;

varying vec2 vTexCoord;

const float det=.003;
const float maxdist=30.;
float l=0.;
mat2 rotm;
vec3 basecol=vec3(.5,.5,1.);

mat3 lookat(vec3 dir, vec3 up){
  dir=normalize(dir);vec3 rt=normalize(cross(dir,normalize(up)));
  return mat3(rt,cross(rt,dir),dir);
}

mat2 rot2D(float a) {
  a=radians(a);
  float s=sin(a);
  float c=cos(a);
  return mat2(c,s,-s,c);
}


float de(vec3 p) {
  p=abs(5.-mod(p+5.,10.));
  float md=100.;
  float s=1.25;
  float sc=1.;
  vec3 pc;
  vec3 mp=vec3(100.);
  float rot=sin(uTime*.1)*20.;
  for (int i=0; i<8; i++) {
    p.xy=abs(p.xy); 
    p=p*s-1./sc;
    sc*=s;
    p.xz*=rotm;
    p.yz*=rot2D(30.+rot);
    float d=length(p.xz+sin(p.y)*.5)-.2/sc;
    mp=min(mp,abs(p));
    if (d<md) {
      md=d;
      pc=p;
    }
  }
  l=mod(pc.y*.05-uTime*.1,.5)*2.;
  return md/sc;
}

vec3 march(vec3 from, vec3 dir) {
  vec3 p, col=vec3(0.);
  float totdist=0., d;
  for (int i=0; i<100; i++) {
    p=from+totdist*dir;
    d=de(p);
    totdist+=max(det,d);
    if (totdist>maxdist||length(col)>.3) break;
    col+=max(0.,det-d)*l;
  }
  col=.96-col*2.5*vec3(3.,2.,1.);
  return col;
}


void main ()
{
    vec2 uv=vTexCoord;
    // uv.x*=uResolution.x/uResolution.y;
    rotm=rot2D(-90.);
    vec3 dir=normalize(vec3(uv,.7));
    vec3 from=vec3(1.,2.,-5.);
    // from.xz*=rot2D(uTime*3.);
    // from.yz*=rot2D(uTime);
    // dir=lookat(-from,vec3(.5,1.,0.))*dir;
  vec3 col=march(from, dir);   
  // col=mix(vec3(1.),col,min(1.,uTime*.2));
    // col=min(col,1.-smoothstep(.85,1.,abs(1.-mod(uv.y*60.,2.)))*.4);
    gl_FragColor = vec4(col,1.0);
}