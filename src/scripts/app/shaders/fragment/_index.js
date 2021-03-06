import _base from './_base.frag';

import addFrameBuffers from './addFrameBuffers.frag';
import bilateral from './bilateral.frag';
import bleed from './bleed.frag';
import blockThreshold from './blockThreshold.frag';
import checks from './checks.frag';
import colorWave from './colorWave.frag';
import dither from './dither.frag';
import ditherAngled from './ditherAngled.frag';
import edgeDetection from './edgeDetection.frag';
import fastBlur from './fastBlur.frag';
import fractal from './fractal.frag';
import gaussian from './gaussian.frag';
import greyscale from './greyscale.frag';
import invert from './invert.frag';
import pixelate from './pixelate.frag';
import polarRadar from './polarRadar.frag';
import test from './test.frag';
import twister from './twister.frag';
import rainbow from './rainbow.frag';
import ripple from './ripple.frag';
import slices from './slices.frag';
import smoke from './smoke.frag';
import sobel from './sobel.frag';
import spaghetti from './spaghetti.frag';
import spirals from './spirals.frag';

export default {
  base: _base,
  addFrameBuffers,
  bleed,
  bilateral,
  blockThreshold,
  checks,
  colorWave,
  dither,
  ditherAngled,
  edgeDetection,
  fastBlur,
  fractal,
  gaussian,
  greyscale,
  invert,
  pixelate,
  polarRadar,
  test,
  twister,
  rainbow,
  ripple,
  slices,
  smoke,
  sobel,
  spaghetti,
  spirals,
}