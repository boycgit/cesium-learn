/**
 * @license
 * Cesium - https://github.com/CesiumGS/cesium
 * Version 1.124
 *
 * Copyright 2011-2022 Cesium Contributors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Columbus View (Pat. Pend.)
 *
 * Portions licensed separately.
 * See https://github.com/CesiumGS/cesium/blob/main/LICENSE.md for full licensing details.
 */

import {
  CylinderGeometry_default
} from "./chunk-4HS475MU.js";
import "./chunk-PD2MCNV7.js";
import "./chunk-KRCUHV7P.js";
import "./chunk-EXDSJZ7J.js";
import "./chunk-Z7OYBX6P.js";
import "./chunk-22NU5WU5.js";
import "./chunk-PMNQULFU.js";
import "./chunk-2OD54CUD.js";
import "./chunk-BFNZUP2C.js";
import "./chunk-H4Y7ADFL.js";
import "./chunk-XQP37R5E.js";
import "./chunk-RGZWZ4PP.js";
import "./chunk-ZIWULRRD.js";
import "./chunk-2TSF7N76.js";
import "./chunk-BLTSMJIP.js";
import "./chunk-FANORJU6.js";
import {
  defined_default
} from "./chunk-S4SCKDK4.js";

// packages/engine/Source/Workers/createCylinderGeometry.js
function createCylinderGeometry(cylinderGeometry, offset) {
  if (defined_default(offset)) {
    cylinderGeometry = CylinderGeometry_default.unpack(cylinderGeometry, offset);
  }
  return CylinderGeometry_default.createGeometry(cylinderGeometry);
}
var createCylinderGeometry_default = createCylinderGeometry;
export {
  createCylinderGeometry_default as default
};
