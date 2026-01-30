# Obsidian 音乐名词查询

在 Obsidian 侧边栏快速查询音乐名词的中外文对照。

数据来源：**国家教育研究院**（台湾）

---

## 功能特性

- **快速搜索**：输入任何音乐名词（中文或外文）即时搜索
- **双语对照**：显示音乐名词的中文和外文对照
- **海量词库**：收录数万条音乐专业术语
- **侧边栏显示**：不占用主编辑区域
- **智能匹配**：支持模糊搜索，忽略变音符号

---

## 安装

### 手动安装

1. 下载最新 Release 中的 `main.js`、`manifest.json`、`styles.css`
2. 在 Obsidian vault 中创建目录：`.obsidian/plugins/music-terms/`
3. 将下载的文件复制到该目录
4. 重启 Obsidian
5. 在设置 → 第三方插件中启用「音乐名词查询」

### 从源码构建

```bash
# 克隆仓库
git clone https://github.com/chaye7417/obsidian-music-terms.git
cd obsidian-music-terms

# 安装依赖
npm install

# 构建
npm run build

# 将 main.js, manifest.json, styles.css 复制到插件目录
```

---

## 使用方法

### 方式一：侧边栏图标
点击左侧功能区的「语言」图标打开查询面板

### 方式二：命令面板
1. 按 `Cmd/Ctrl + P` 打开命令面板
2. 搜索「音乐名词」
3. 选择「打开音乐名词查询」

### 搜索示例

| 输入 | 可找到 |
|------|--------|
| sonata | 奏鸣曲 |
| 奏鸣曲 | sonata |
| allegro | 快板 |
| 赋格 | fugue |

---

## 数据来源

本插件的音乐名词数据来源于 [国家教育研究院](https://terms.naer.edu.tw/) 的「乐词典」资料库。

原始数据整理项目：[wiwikuan/terms](https://github.com/wiwikuan/terms)

---

## 截图

![音乐名词查询界面](https://github.com/chaye7417/obsidian-music-terms/raw/master/screenshot.png)

---

## 许可证

MIT License

---

## 致谢

- [国家教育研究院](https://terms.naer.edu.tw/) - 数据来源
- [NiceChord 好和弦](https://nicechord.com/) - 原始数据整理
- [wiwikuan/terms](https://github.com/wiwikuan/terms) - 数据项目
