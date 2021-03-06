import {Vector3} from 'three';
import DPR from '../dpr';

export function viewScaleFactor(sceneSetup, origin, SIZE_PX, SIZE_MODEL) {
  let container = sceneSetup.container;
  let viewHeight = container.clientHeight;
  let camera = sceneSetup.camera;

  if (camera.isOrthographicCamera) {
    return viewHeight / (camera.top - camera.bottom)  / camera.zoom * 2 * DPR * SIZE_PX / SIZE_MODEL;
  } else {
    let p = new Vector3().copy(origin);
    let cp = new Vector3().copy(camera.position);
    let z = p.sub(cp).length();
    let tanHFov = Math.atan((camera.fov / 2) / 180 * Math.PI);
    let fitUnits = tanHFov * z * 2;

    let modelTakingPart = SIZE_MODEL / fitUnits;
    let modelActualSizePx = viewHeight * modelTakingPart;
    return SIZE_PX / modelActualSizePx;
  }
}