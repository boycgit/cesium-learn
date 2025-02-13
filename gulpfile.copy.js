import gulp from 'gulp';

// 定义要复制的文件列表
const filesToCopy = [
  '.gitignore',
  'gulpfile.copy.js',
  '.cursorrules',

  'README.md',
  'index.html',

  // Tutorials 
  'Apps/HelloWorld.html',
  'Apps/CesiumViewer/CesiumViewer.js',
  'Apps/Sandcastle/gallery/Bathymetry.html',
  "Apps/Sandcastle/gallery/Camera Tutorial.html",
  "Apps/Sandcastle/gallery/Classification Types.html",
  "Apps/Sandcastle/gallery/Clustering.html",
  "Apps/Sandcastle/gallery/Custom DataSource.html",
  "Apps/Sandcastle/gallery/Custom Geocoder.html",
  "Apps/Sandcastle/gallery/GeoJSON and TopoJSON.html",
  "Apps/Sandcastle/gallery/HTML Overlays.html",
  "Apps/Sandcastle/gallery/HeadingPitchRoll.html",
  "Apps/Sandcastle/gallery/Imagery Color To Alpha.html",
  "Apps/Sandcastle/gallery/Imagery Cutout.html",
  "Apps/Sandcastle/gallery/Imagery Layers Split.html",
  "Apps/Sandcastle/gallery/Imagery Layers Texture Filters.html",
  "Apps/Sandcastle/gallery/Imagery Layers.html",
  "Apps/Sandcastle/gallery/LocalToFixedFrame.html",
  "Apps/Sandcastle/gallery/Particle System Tails.html",
  "Apps/Sandcastle/gallery/Particle System Weather.html",
  "Apps/Sandcastle/gallery/Scene Rendering Performance.html",
  "Apps/Sandcastle/gallery/Terrain.html",

  // 3D Tiles
  'Apps/Sandcastle/gallery/3D Tiles 1.1 CDB Yemen.html',
  'Apps/Sandcastle/gallery/3D Tiles 1.1 Photogrammetry Classification.html',
  'Apps/Sandcastle/gallery/3D Tiles 1.1 Photogrammetry.html',
  'Apps/Sandcastle/gallery/3D Tiles 1.1 S2 Globe.html',
  'Apps/Sandcastle/gallery/3D Tiles Adjust Height.html',
  'Apps/Sandcastle/gallery/3D Tiles BIM.html',
  'Apps/Sandcastle/gallery/3D Tiles Batch Table Hierarchy.html',
  'Apps/Sandcastle/gallery/3D Tiles Clipping Planes.html',
  'Apps/Sandcastle/gallery/3D Tiles Compare.html',
  'Apps/Sandcastle/gallery/3D Tiles Feature Picking.html',
  'Apps/Sandcastle/gallery/3D Tiles Feature Styling.html',
  'Apps/Sandcastle/gallery/3D Tiles Formats.html',
  'Apps/Sandcastle/gallery/3D Tiles Inspector.html',
  'Apps/Sandcastle/gallery/3D Tiles Interactivity.html',
  'Apps/Sandcastle/gallery/3D Tiles Interior.html',
  'Apps/Sandcastle/gallery/3D Tiles NGA GPM Visualization.html',
  'Apps/Sandcastle/gallery/3D Tiles Photogrammetry Classification.html',
  'Apps/Sandcastle/gallery/3D Tiles Photogrammetry.html',
  'Apps/Sandcastle/gallery/3D Tiles Point Cloud Classification.html',
  'Apps/Sandcastle/gallery/3D Tiles Point Cloud Shading.html',
  'Apps/Sandcastle/gallery/3D Tiles Point Cloud Styling.html',
  'Apps/Sandcastle/gallery/3D Tiles Point Cloud.html',
  'Apps/Sandcastle/gallery/3D Tiles Terrain Classification.html',
  'Apps/Sandcastle/gallery/AEC Architectural Design.html',
  'Apps/Sandcastle/gallery/AEC Isolate by Category.html',
  'Apps/Sandcastle/gallery/AEC Metadata Styling.html',
  'Apps/Sandcastle/gallery/Clamp Entities to Ground.html',
  'Apps/Sandcastle/gallery/Clamp Model to Ground.html',
  'Apps/Sandcastle/gallery/Custom Shaders 3D Tiles.html',
  'Apps/Sandcastle/gallery/Custom Shaders Models.html',
  'Apps/Sandcastle/gallery/Custom Shaders Property Textures.html',
  'Apps/Sandcastle/gallery/Moon.html',
  'Apps/Sandcastle/gallery/Polylines on 3D Tiles.html',
  'Apps/Sandcastle/gallery/Sample Height from 3D Tiles.html',
  'Apps/Sandcastle/gallery/Voxel Picking.html',
  'Apps/Sandcastle/gallery/Voxels.html',
  'Apps/Sandcastle/gallery/iModel Mesh Export Service.html',

  // Beginner
  'Apps/Sandcastle/gallery/3D Tiles Vertical Exaggeration.html',
  'Apps/Sandcastle/gallery/AEC Clipping.html',
  'Apps/Sandcastle/gallery/ArcGIS MapServer.html',
  'Apps/Sandcastle/gallery/ArcGIS Tiled Elevation Terrain.html',
  'Apps/Sandcastle/gallery/Atmosphere.html',
  'Apps/Sandcastle/gallery/Billboards.html',
  'Apps/Sandcastle/gallery/Bing Maps Labels Only.html',
  'Apps/Sandcastle/gallery/Callback Position Property.html',
  'Apps/Sandcastle/gallery/Callback Property.html',
  'Apps/Sandcastle/gallery/Cardboard.html',
  'Apps/Sandcastle/gallery/Cesium OSM Buildings.html',
  'Apps/Sandcastle/gallery/Cesium Widget.html',
  'Apps/Sandcastle/gallery/Clipping Regions.html',
  'Apps/Sandcastle/gallery/Clock.html',
  'Apps/Sandcastle/gallery/Entity tracking.html',
  'Apps/Sandcastle/gallery/Google Earth Enterprise.html',
  'Apps/Sandcastle/gallery/Google Photorealistic 3D Tiles with Building Insert.html',
  'Apps/Sandcastle/gallery/Google Photorealistic 3D Tiles.html',
  'Apps/Sandcastle/gallery/Japan Buildings.html',
  'Apps/Sandcastle/gallery/Labels.html',
  'Apps/Sandcastle/gallery/Map Pins.html',
  'Apps/Sandcastle/gallery/Multiple Synced Views.html',
  'Apps/Sandcastle/gallery/Particle System Fireworks.html',
  'Apps/Sandcastle/gallery/Particle System.html',
  'Apps/Sandcastle/gallery/Points.html',
  'Apps/Sandcastle/gallery/Rotatable 2D Map.html',
  'Apps/Sandcastle/gallery/Show or Hide Entities.html',
  'Apps/Sandcastle/gallery/SplitDirection.html',
  'Apps/Sandcastle/gallery/Underground Color.html',
  'Apps/Sandcastle/gallery/Web Map Service (WMS).html',
  'Apps/Sandcastle/gallery/Web Map Tile Service with Time.html',
  'Apps/Sandcastle/gallery/iTwin Feature Service.html',
  'Apps/Sandcastle/gallery/Aerometrex San Francisco.html',
  'Apps/Sandcastle/gallery/ArcticDEM.html',
  'Apps/Sandcastle/gallery/Blue Marble.html',
  'Apps/Sandcastle/gallery/Cesium World Terrain.html',
  'Apps/Sandcastle/gallery/Earth at Night.html',
  'Apps/Sandcastle/gallery/Montreal Point Cloud.html',
  'Apps/Sandcastle/gallery/Natural Earth II.html',
  'Apps/Sandcastle/gallery/PAMAP Terrain.html',
  'Apps/Sandcastle/gallery/Sentinel-2.html',
  'Apps/Sandcastle/gallery/Washington DC 2017.html',

  // Post Process
   'Apps/Sandcastle/gallery/Ambient Occlusion.html',
   'Apps/Sandcastle/gallery/Bloom.html',
   'Apps/Sandcastle/gallery/Custom Per-Feature Post Process.html',
   'Apps/Sandcastle/gallery/Custom Post Process.html',
   'Apps/Sandcastle/gallery/Depth of Field.html',
   'Apps/Sandcastle/gallery/FXAA.html',
   'Apps/Sandcastle/gallery/Fog Post Process.html',
   'Apps/Sandcastle/gallery/High Dynamic Range.html',
   'Apps/Sandcastle/gallery/LensFlare.html',


  //  Geometries
  'Apps/Sandcastle/gallery/Box.html',
  'Apps/Sandcastle/gallery/Circles and Ellipses.html',
  'Apps/Sandcastle/gallery/Corridor.html',
  'Apps/Sandcastle/gallery/Cylinders and Cones.html',
  'Apps/Sandcastle/gallery/Geometry Height Reference.html',
  'Apps/Sandcastle/gallery/Parallels and Meridians.html',
  'Apps/Sandcastle/gallery/Partial Ellipsoids.html',
  'Apps/Sandcastle/gallery/Plane.html',
  'Apps/Sandcastle/gallery/Polygon.html',
  'Apps/Sandcastle/gallery/Polyline Dash.html',
  'Apps/Sandcastle/gallery/Polyline Volume.html',
  'Apps/Sandcastle/gallery/Polyline.html',
  'Apps/Sandcastle/gallery/Rectangle.html',
  'Apps/Sandcastle/gallery/Spheres and Ellipsoids.html',
  'Apps/Sandcastle/gallery/Wall.html',
  'Apps/Sandcastle/gallery/Z-Indexing Geometry.html'


];

// 定义目标目录
const DEST_DIR = '../Cesium-1.126';

// 创建复制任务
export function copyFiles() {
  return gulp.src(filesToCopy, { base: '.' })
    .pipe(gulp.dest(DEST_DIR));
}

// 默认任务
export default copyFiles; 