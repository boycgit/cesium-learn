/**
 * Compute the atmosphere color, applying Rayleigh and Mie scattering. This
 * builtin uses automatic uniforms so the atmophere settings are synced with the
 * state of the Scene, even in other contexts like Model.
 *
 * @name czm_computeAtmosphereColor
 * @glslFunction
 *
 * @param {vec3} positionWC Position of the fragment in world coords (low precision)
 * @param {vec3} lightDirection Light direction from the sun or other light source.
 * @param {vec3} rayleighColor The Rayleigh scattering color computed by a scattering function
 * @param {vec3} mieColor The Mie scattering color computed by a scattering function
 * @param {float} opacity The opacity computed by a scattering function.
 */
vec4 czm_computeAtmosphereColor(
    vec3 positionWC,
    vec3 lightDirection,
    vec3 rayleighColor,
    vec3 mieColor,
    float opacity
) {
    // Setup the primary ray: from the camera position to the vertex position.
    vec3 cameraToPositionWC = positionWC - czm_viewerPositionWC;
    vec3 cameraToPositionWCDirection = normalize(cameraToPositionWC);

    float cosAngle = dot(cameraToPositionWCDirection, lightDirection);
    float cosAngleSq = cosAngle * cosAngle;

    float G = czm_atmosphereMieAnisotropy;
    float GSq = G * G;

    // The Rayleigh phase function.
    float rayleighPhase = 3.0 / (50.2654824574) * (1.0 + cosAngleSq);
    // The Mie phase function.
    float miePhase = 3.0 / (25.1327412287) * ((1.0 - GSq) * (cosAngleSq + 1.0)) / (pow(1.0 + GSq - 2.0 * cosAngle * G, 1.5) * (2.0 + GSq));

    // The final color is generated by combining the effects of the Rayleigh and Mie scattering.
    vec3 rayleigh = rayleighPhase * rayleighColor;
    vec3 mie = miePhase * mieColor;

    vec3 color = (rayleigh + mie) * czm_atmosphereLightIntensity;

    return vec4(color, opacity);
}

/**
 * Compute the atmosphere color, applying Rayleigh and Mie scattering. This
 * builtin uses automatic uniforms so the atmophere settings are synced with the
 * state of the Scene, even in other contexts like Model.
 *
 * @name czm_computeAtmosphereColor
 * @glslFunction
 *
 * @param {czm_ray} primaryRay Ray from the origin to sky fragment to in world coords (low precision)
 * @param {vec3} lightDirection Light direction from the sun or other light source.
 * @param {vec3} rayleighColor The Rayleigh scattering color computed by a scattering function
 * @param {vec3} mieColor The Mie scattering color computed by a scattering function
 * @param {float} opacity The opacity computed by a scattering function.
 */
vec4 czm_computeAtmosphereColor(
    czm_ray primaryRay,
    vec3 lightDirection,
    vec3 rayleighColor,
    vec3 mieColor,
    float opacity
) {
    vec3 direction = normalize(primaryRay.direction);

    float cosAngle = dot(direction, lightDirection);
    float cosAngleSq = cosAngle * cosAngle;

    float G = czm_atmosphereMieAnisotropy;
    float GSq = G * G;

    // The Rayleigh phase function.
    float rayleighPhase = 3.0 / (50.2654824574) * (1.0 + cosAngleSq);
    // The Mie phase function.
    float miePhase = 3.0 / (25.1327412287) * ((1.0 - GSq) * (cosAngleSq + 1.0)) / (pow(1.0 + GSq - 2.0 * cosAngle * G, 1.5) * (2.0 + GSq));

    // The final color is generated by combining the effects of the Rayleigh and Mie scattering.
    vec3 rayleigh = rayleighPhase * rayleighColor;
    vec3 mie = miePhase * mieColor;

    vec3 color = (rayleigh + mie) * czm_atmosphereLightIntensity;

    return vec4(color, opacity);
}

