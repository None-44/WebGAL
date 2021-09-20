# WebGAL

### 一次编写，处处运行，无需网页开发基础，3分钟即可学会所有的语法，只要你有灵感，就可以立刻开始开始创作你自己的Galgame！

Demo: http://msfasr.com/WebGAL_Demo_Page/

## 如何在本地运行WebGAL？

WebGAL理论上可以在任何浏览器上运行，但是由于浏览器的**限制跨域访问**机制，本地js可能无法在浏览器上运行，因此，你需要在本地建立一个http服务器。你可以选择任何你喜爱的的http服务器，并通过本地http服务器访问index.html来开始游戏。如果你没有本地http服务器，你可以使用Node.js简单地搭建一个。

我在**WebGAL发行版**的根目录放置了一个app.js作为 Node.js 服务器脚本，在你安装了 Node.js 后，只需要通过以下命令：

```shell
npm install express
node app.js
```

即可搭建一个本地运行的服务器。

## 快速上手教程：

你的所有游戏剧本、图片、立绘都应该在放/game文件夹，目录说明如下：

| 文件夹     | 说明             |
| ---------- | ---------------- |
| background | 用于存放背景图片 |
| figure     | 用于存放人物立绘 |
| scene      | 用于存放用户剧本 |

### 用户剧本的编写语法：

首先，程序会从**初始脚本**`start.txt`开始运行，在后续的脚本编写中，我会告诉你如何跳转章节或设置分支选项。

**编写剧本的方式非常简单，且与自然语言几乎无异。**

人物对话：

```
人物:对话;
```

示例：

```
雪之下雪乃:请用茶;
由比滨:啊，谢谢;
小町:谢谢雪乃姐！;
一色:谢谢学姐。;
```

在每条对话/剧本后，使用分号作为结束。

**注意，每条对话的冒号、分号应当为英文字符！**

改变背景/人物立绘：

```
changeBG:testBG01.jpg;//改变背景
changeP:testFigure01.png;//改变人物立绘
changeBG:none;//关闭背景
changeP:none;//关闭人物立绘
```

**注意：你的背景图片应该被放在background文件夹内，而立绘图片则应该放在figure文件夹中。**

在你每一次改变背景或人物立绘后，背景图片和人物立绘会被立刻替换，每条改变背景或立绘的脚本会与人物对话以相同形方式运行，也就是说在你改变背景图片或立绘后，对话不会立刻改变。如果你想要在改变背景/立绘后立刻跳转到下一条语句，请使用以下语句：

```
changeBG_next:testBG01.jpg;
changeP_next:testFigure01.png;//改变人物立绘
一色:谢谢学姐！;
```

如果你这样做，那么在背景图片/立绘替换后，程序会立刻执行下一条语句。

### （开发中）跳转场景与分支选择：

在Galgame中，跳转章节、场景与分支选择是不可或缺的，因此，本游戏模组也支持场景跳转与分支选择。

场景跳转：

```
changeScene:Chapter-2.t;
```

通过执行这条命令，你将切换游戏场景，并使接下来的剧情发展按照新的场景剧本运行。新的剧本会在下一次鼠标点击后运行。

分支选择：

```
choose:{叫住她:Chapter-2.txt,回家:Chapter-3.txt};
```

你可以通过提供分支选择的方式来将剧情向不同的方向发展，只需要简单地在分支后面加上你想要跳转的剧本就可以了。

