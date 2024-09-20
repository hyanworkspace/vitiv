# Prompts

/ai-video-app
│
├── /public
│   └── index.html
│
├── /src
│   ├── /components
│   │   └── VideoRecorder.js
│   ├── /api
│   │   └── aiService.js
│   ├── App.js
│   └── index.js
│
├── package.json
└── README.md

我需要开发一个能够与 AI 交流的 web app，界面设计风格应该是极简的，并且它需要实现以下功能：用户首先会来到一个开始页面，只有一个开始按钮，按下后，app会打开摄像头，用户可以持续按下拍摄键，并且拍摄一段视频，松开按钮后视频拍摄结束。拍完之后，用户可以在 app 上查看这个拍摄的视频，并且选择一个时间点，截取这个时间点对应的视频画面，再加上text prompt，作为输入数据，通过 api 传递给某个能够识别图像内容的 AI，然后返回结果。请你写出一整个项目，要求代码结构清晰优雅，并且每一行都带有注释，解释代码在做什么

## 提示词相关：


下是构建提示词的关键组成部分：

**提示词 = (镜头语言 +景别角度+ 光影) + 主体 (主体描述) + 主体运动 +场景 (场景描述) + (氛围)**

* 镜头语言:通过镜头的各种应用以及镜头之间的衔接和切换来传达故事或信息，并创造出特定的视觉效果和情感氛围。如镜头平移，推近、拉远、升降拍摄、摇摄、跟随拍摄、手持拍摄、无人机航拍等;
* 景别角度：控制相机与被摄对象之间距离和角度，实现不同的视觉效果和情感表达。如大全景、中景、近景 、鸟瞰视角 、跟随视角、鱼眼效果等;
* 光影:光影是赋予摄影作品灵魂的关键元素，光影的运用可以使照片更具深度，更具情感，我们可以通过光影创造出富有层次感和情感表达力的作品。如自然光、丁达尔效应、柔和散射、硬光直射 、逆光剪影、三点布光等;
* 主体:主体是视频中的主要表现对象。如儿童、狮子、向日葵，汽车、城堡等;
* 主体描述:对主体外貌细节和肢体姿态等的描述，如人物的服饰、动物的毛色、植物的颜色、物体的状态和建筑的风格;
* 主体运动:对主体运动状态的描述，包括静止和运动等，运动状态不宜过于复杂，符合6s视频内可以展现的画面即可，
* 场景: 场景是主体所处的环境，包括前景、背景等;
* 场景描述:对主体所处环境的细节描述。如都市环境、乡村风光、工业区等;
* 氛围:对预期视频画面的氛围描述。如喧嚣繁忙、悬疑惊悚、宁静舒适等;



### 其他技巧

* 关键词重复：在提示的不同部分重复或强化关键词有助于提高输出的一致性。如摄像机以**超高速**镜头**快速**飞过森林。
* 聚焦内容：提示词应集中在视频中应有的内容上。如：冷清的街道，而不是“没有人的街道”。
* 使用智能体：使用** **[提示词智能体](https://chatglm.cn/main/gdetail/669911fe0bef38883947d3c6) 帮助你生成专业提示词。



# TODOs:

1. 能不能把页面重新布局一下？在现在页面的基础上，拍摄视频的部分不要变化，录制好视频后，展示的视频放在它的正下方，与摄像头实时的画面保持一个大小。再将其他的放在录制的视频的正下方。另外，将开始拍摄换成一个小红点的图标按钮，停止拍摄则换成⏸️的图标按钮。
2. glm-4-flash加入问答
3. 完成 loop
