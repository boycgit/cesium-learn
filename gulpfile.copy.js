import gulp from 'gulp';

// 定义要复制的文件列表
const filesToCopy = [
  '.gitignore',
  'gulpfile.copy.js',
  '.cursorrules',

  'README.md',
  'index.html',

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
];

// 定义目标目录
const DEST_DIR = '../cesium-1.124';

// 创建复制任务
export function copyFiles() {
  return gulp.src(filesToCopy, { base: '.' })
    .pipe(gulp.dest(DEST_DIR));
}

// 默认任务
export default copyFiles; 