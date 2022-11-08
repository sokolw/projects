import { slidesData } from "./js/slidesData.js";
import { main } from './templates.js';
import { initMagneticCircles } from './packages/magnetic-circles/index.js';

document.body.innerHTML = main(slidesData[1]);
initMagneticCircles();
console.log(slidesData);