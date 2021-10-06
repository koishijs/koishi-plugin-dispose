# koishi-plugin-dispose

Koishi 退群插件

管理员使用 `dispose` 命令即可退群。

## 安装

### npm

```bash
npm install koishi-plugin-dispose
```

### 直接安装

在 https://cdn02.moecube.com:444/nanahira/koishi-plugin/dispose/index.js 下载，并配置 `koishi.config.js` 。

```js
module.exports = {
    plugins: { 
        "/path/to/dispose/index.js": {}
    }
}
```

## 配置

* `commmandName` 退群命令名称。
