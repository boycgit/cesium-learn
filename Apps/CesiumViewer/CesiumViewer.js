// 设置 Cesium 的基础 URL
// eslint-disable-next-line no-undef
window.CESIUM_BASE_URL = window.CESIUM_BASE_URL
  ? window.CESIUM_BASE_URL
  : "../../Build/CesiumUnminified/";

// 导入所需的 Cesium 模块
import {
  Ion,
  Cartesian3,
  defined,
  formatError,
  Math as CesiumMath,
  objectToQuery,
  queryToObject,
  CzmlDataSource,
  GeoJsonDataSource,
  ImageryLayer,
  KmlDataSource,
  GpxDataSource,
  Terrain,
  TileMapServiceImageryProvider,
  Viewer,
  viewerCesiumInspectorMixin,
  viewerDragDropMixin,
} from "../../Build/CesiumUnminified/index.js";

// 设置 Cesium ion 的默认访问令牌
Ion.defaultAccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJmMDU0NTkzZS03ZGM1LTQ5YjgtYTMxMy1kYzYxYzg1ODRkN2UiLCJpZCI6MTg4ODMxLCJpYXQiOjE3MDQ4NTE3MTB9.HrtaIbMMeu1Rj5Ef30FV63xX6wVmQncxlc0PPJYM1Wc";

async function main() {
  /*
     解析查询字符串中的选项:
       source=url          启动时加载的 CZML/GeoJSON/KML 数据源的 URL。
                           自动数据类型检测使用文件扩展名。
       sourceType=czml/geojson/kml
                           覆盖源的数据类型检测。
       flyTo=false         不自动飞行到加载的源。
       tmsImageryUrl=url   自动使用 TMS 影像提供程序。
       lookAt=id           启动时跟踪的实体的 ID。
       stats=true          启用 FPS 性能显示。
       inspector=true      启用检查器小部件。
       debug=true          以显著的性能成本进行完整的 WebGL 错误报告。
       theme=lighter       使用深色文本在浅色背景上的主题。
       scene3DOnly=true    启用仅 3D 模式。
       view=longitude,latitude,[height,heading,pitch,roll]
                           自动设置相机视图。值以度和米为单位。
                           [height,heading,pitch,roll] 默认是直视下方，[300,0,-90,0]
       saveCamera=false    当相机视图改变时不自动更新 URL 中的相机视图。
     */
  // 从 URL 查询字符串中解析用户选项
  const endUserOptions = queryToObject(window.location.search.substring(1));

  let baseLayer;
  // 如果指定了 TMS 影像 URL，创建基础图层
  if (defined(endUserOptions.tmsImageryUrl)) {
    baseLayer = ImageryLayer.fromProviderAsync(
      TileMapServiceImageryProvider.fromUrl(endUserOptions.tmsImageryUrl)
    );
  }

  // 获取加载指示器元素
  const loadingIndicator = document.getElementById("loadingIndicator");
  const hasBaseLayerPicker = !defined(baseLayer);

  // 创建地形提供程序
  const terrain = Terrain.fromWorldTerrain({
    requestWaterMask: true,
    requestVertexNormals: true,
  });

  let viewer;
  try {
    // 创建 Cesium Viewer 实例
    viewer = new Viewer("cesiumContainer", {
      baseLayer: baseLayer,
      baseLayerPicker: hasBaseLayerPicker,
      scene3DOnly: endUserOptions.scene3DOnly,
      requestRenderMode: true,
      terrain: terrain,
    });

    // 如果有基础图层选择器，设置默认地形
    if (hasBaseLayerPicker) {
      const viewModel = viewer.baseLayerPicker.viewModel;
      viewModel.selectedTerrain = viewModel.terrainProviderViewModels[1];
    }
  } catch (exception) {
    // 处理 Viewer 创建过程中的错误
    loadingIndicator.style.display = "none";
    const message = formatError(exception);
    console.error(message);
    if (!document.querySelector(".cesium-widget-errorPanel")) {
      //eslint-disable-next-line no-alert
      window.alert(message);
    }
    return;
  }

  // 扩展 viewer 功能
  viewer.extend(viewerDragDropMixin);
  if (endUserOptions.inspector) {
    viewer.extend(viewerCesiumInspectorMixin);
  }

  // 定义显示加载错误的函数
  const showLoadError = function (name, error) {
    const title = `An error occurred while loading the file: ${name}`;
    const message =
      "An error occurred while loading the file, which may indicate that it is invalid.  A detailed error report is below:";
    viewer.cesiumWidget.showErrorPanel(title, message, error);
  };

  // 添加拖放错误事件监听器
  viewer.dropError.addEventListener(function (viewerArg, name, error) {
    showLoadError(name, error);
  });

  const scene = viewer.scene;
  const context = scene.context;
  // 如果启用了调试模式，设置相关选项
  if (endUserOptions.debug) {
    context.validateShaderProgram = true;
    context.validateFramebuffer = true;
    context.logShaderCompilation = true;
    context.throwOnWebGLError = true;
  }

  const view = endUserOptions.view;
  const source = endUserOptions.source;
  if (defined(source)) {
    let sourceType = endUserOptions.sourceType;
    if (!defined(sourceType)) {
      // 如果未指定源类型，根据文件扩展名自动检测
      if (/\.czml$/i.test(source)) {
        sourceType = "czml";
      } else if (
        /\.geojson$/i.test(source) ||
        /\.json$/i.test(source) ||
        /\.topojson$/i.test(source)
      ) {
        sourceType = "geojson";
      } else if (/\.kml$/i.test(source) || /\.kmz$/i.test(source)) {
        sourceType = "kml";
      } else if (/\.gpx$/i.test(source) || /\.gpx$/i.test(source)) {
        sourceType = "gpx";
      }
    }

    let loadPromise;
    // 根据源类型加载相应的数据
    if (sourceType === "czml") {
      loadPromise = CzmlDataSource.load(source);
    } else if (sourceType === "geojson") {
      loadPromise = GeoJsonDataSource.load(source);
    } else if (sourceType === "kml") {
      loadPromise = KmlDataSource.load(source, {
        camera: scene.camera,
        canvas: scene.canvas,
        screenOverlayContainer: viewer.container,
      });
    } else if (sourceType === "gpx") {
      loadPromise = GpxDataSource.load(source);
    } else {
      showLoadError(source, "Unknown format.");
    }

    if (defined(loadPromise)) {
      try {
        // 将加载的数据源添加到 viewer
        const dataSource = await viewer.dataSources.add(loadPromise);
        const lookAt = endUserOptions.lookAt;
        if (defined(lookAt)) {
          // 如果指定了 lookAt，尝试跟踪相应的实体
          const entity = dataSource.entities.getById(lookAt);
          if (defined(entity)) {
            viewer.trackedEntity = entity;
          } else {
            const error = `No entity with id "${lookAt}" exists in the provided data source.`;
            showLoadError(source, error);
          }
        } else if (!defined(view) && endUserOptions.flyTo !== "false") {
          // 如果没有指定 view 且 flyTo 不为 false，飞行到数据源
          viewer.flyTo(dataSource);
        }
      } catch (error) {
        showLoadError(source, error);
      }
    }
  }

  // 如果启用了统计信息，显示 FPS
  if (endUserOptions.stats) {
    scene.debugShowFramesPerSecond = true;
  }

  // 处理主题设置
  const theme = endUserOptions.theme;
  if (defined(theme)) {
    if (endUserOptions.theme === "lighter") {
      document.body.classList.add("cesium-lighter");
      viewer.animation.applyThemeChanges();
    } else {
      const error = `Unknown theme: ${theme}`;
      viewer.cesiumWidget.showErrorPanel(error, "");
    }
  }

  // 如果指定了 view，设置相机视图
  if (defined(view)) {
    const splitQuery = view.split(/[ ,]+/);
    if (splitQuery.length > 1) {
      const longitude = !isNaN(+splitQuery[0]) ? +splitQuery[0] : 0.0;
      const latitude = !isNaN(+splitQuery[1]) ? +splitQuery[1] : 0.0;
      const height =
        splitQuery.length > 2 && !isNaN(+splitQuery[2])
          ? +splitQuery[2]
          : 300.0;
      const heading =
        splitQuery.length > 3 && !isNaN(+splitQuery[3])
          ? CesiumMath.toRadians(+splitQuery[3])
          : undefined;
      const pitch =
        splitQuery.length > 4 && !isNaN(+splitQuery[4])
          ? CesiumMath.toRadians(+splitQuery[4])
          : undefined;
      const roll =
        splitQuery.length > 5 && !isNaN(+splitQuery[5])
          ? CesiumMath.toRadians(+splitQuery[5])
          : undefined;

      viewer.camera.setView({
        destination: Cartesian3.fromDegrees(longitude, latitude, height),
        orientation: {
          heading: heading,
          pitch: pitch,
          roll: roll,
        },
      });
    }
  }

  const camera = viewer.camera;
  // 定义保存相机状态的函数
  function saveCamera() {
    const position = camera.positionCartographic;
    let hpr = "";
    if (defined(camera.heading)) {
      hpr = `,${CesiumMath.toDegrees(camera.heading)},${CesiumMath.toDegrees(
        camera.pitch
      )},${CesiumMath.toDegrees(camera.roll)}`;
    }
    endUserOptions.view = `${CesiumMath.toDegrees(
      position.longitude
    )},${CesiumMath.toDegrees(position.latitude)},${position.height}${hpr}`;
    history.replaceState(undefined, "", `?${objectToQuery(endUserOptions)}`);
  }

  let timeout;
  // 如果允许保存相机状态，添加相机变化事件监听器
  if (endUserOptions.saveCamera !== "false") {
    camera.changed.addEventListener(function () {
      window.clearTimeout(timeout);
      timeout = window.setTimeout(saveCamera, 1000);
    });
  }

  // 隐藏加载指示器
  loadingIndicator.style.display = "none";
}

// 执行主函数
main();