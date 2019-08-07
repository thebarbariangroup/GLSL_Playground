import _base from './_base.frag';

import addFrameBuffers from './addFrameBuffers.frag';
import bilateral from './bilateral.frag';
import blockThreshold from './blockThreshold.frag';
import edgeDetection from './edgeDetection.frag';
import fastBlur from './fastBlur.frag';
import fractal from './fractal.frag';
import gaussian from './gaussian.frag';
import greyscale from './greyscale.frag';
import polarRadar from './polarRadar.frag';
import test from './test.frag';
import twister from './twister.frag';
import smoke from './smoke.frag';
import spaghetti from './spaghetti.frag';
import spirals from './spirals.frag';

export default {
  base: _base,
  addFrameBuffers,
  bilateral,
  blockThreshold,
  edgeDetection,
  fastBlur,
  fractal,
  gaussian,
  greyscale,
  polarRadar,
  test,
  twister,
  smoke,
  spaghetti,
  spirals,
}