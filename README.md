# CesiumJS

[![构建状态](https://github.com/CesiumGS/cesium/actions/workflows/dev.yml/badge.svg)](https://github.com/CesiumGS/cesium/actions/workflows/dev.yml)
[![npm](https://img.shields.io/npm/v/cesium)](https://www.npmjs.com/package/cesium)
[![文档](https://img.shields.io/badge/docs-online-orange.svg)](https://cesium.com/learn/)

![Cesium](https://github.com/CesiumGS/cesium/wiki/logos/Cesium_Logo_Color.jpg)

CesiumJS 是一个 JavaScript 库，用于在网络浏览器中创建 3D 地球和 2D 地图，无需插件。它使用 WebGL 进行硬件加速图形处理，跨平台、跨浏览器，并针对动态数据可视化进行了优化。

CesiumJS 基于开放格式构建，旨在实现强大的互操作性，并可扩展以处理海量数据集。

---

[**示例**](https://sandcastle.cesium.com/) :earth_asia: [**文档**](https://cesium.com/learn/cesiumjs-learn/) :earth_americas: [**网站**](https://cesium.com/cesiumjs) :earth_africa: [**论坛**](https://community.cesium.com/) :earth_asia: [**用户故事**](https://cesium.com/user-stories/)

---

## :rocket: 开始使用

访问[下载页面](https://cesium.com/downloads/)下载预构建的 CesiumJS 副本。

### npm & yarn

如果您正在使用模块打包工具（如 Webpack、Parcel 或 Rollup）构建应用程序，可以通过 [`cesium` npm 包](https://www.npmjs.com/package/cesium)安装 CesiumJS：

```sh
npm install cesium --save
```

然后，在您的应用代码中导入 CesiumJS。导入单个模块以通过大多数构建工具受益于 tree shaking优化：

```js
import { Viewer } from "cesium";
import "cesium/Build/Cesium/Widgets/widgets.css";

const viewer = new Viewer("cesiumContainer");
```

除了 `cesium` 包外，CesiumJS 还[以作用域 npm 包的形式分发，以实现更好的依赖管理](https://cesium.com/blog/2022/12/07/modular-structure-in-cesiumjs/)：

- [`@cesium/engine`](./packages/engine/README.md) - CesiumJS 的核心、渲染和数据 API
- [`@cesium/widgets`](./packages/widgets/README.md) - 用于 CesiumJS 的小部件库

### 接下来做什么？

查看我们的[快速入门指南](https://cesium.com/learn/cesiumjs-learn/cesiumjs-quickstart/)，了解有关启动和运行 CesiumJS 应用程序的更多信息。

有关服务本地数据的说明，请参阅 CesiumJS 的[离线指南](./Documentation/OfflineGuide/README.md)。

有兴趣贡献吗？请参阅 [CONTRIBUTING.md](CONTRIBUTING.md)。:heart:

## :green_book: 许可证

[Apache 2.0](http://www.apache.org/licenses/LICENSE-2.0.html)。CesiumJS 可免费用于商业和非商业用途。

## :earth_americas: 全球 3D 内容来自哪里？

Cesium 平台遵循[开放核心商业模式](https://cesium.com/why-cesium/open-ecosystem/cesium-business-model/)，提供开源运行时引擎（如 CesiumJS）和可选的商业订阅 Cesium ion。

CesiumJS 可以从商业 Cesium ion 平台流式传输[3D 内容，如地形、影像和 3D Tiles](https://cesium.com/platform/cesium-ion/content/)，同时支持来自其他离线或在线服务的开放标准。我们提供 Cesium ion 作为所有用户快速启动和运行的最佳选择，但您可以自由使用任何您喜欢的内容源组合与 CesiumJS。

将您自己的数据带到 Cesium ion 进行切片、托管和流式传输。[使用 Cesium ion](https://cesium.com/ion/signup/) 有助于支持 CesiumJS 的开发。

## :white_check_mark: 功能

- 从 Cesium ion 或其他来源流式传输 3D Tiles 和其他标准格式
- 在高精度 WGS84 地球上进行可视化和分析
- 与桌面或移动设备用户共享

在 [CesiumJS 功能清单](https://github.com/CesiumGS/cesium/wiki/CesiumJS-Features-Checklist)中查看更多功能。
