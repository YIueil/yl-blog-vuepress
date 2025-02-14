---
  date: 2024/9/9 17:38
  pageClass: blue-archive
  tags:
    - 布局
    - CSS
  categories:
    - 未归档
---

# Flex布局

| 属性              | 解释                        | 可选值                                                                                                                                                                            |
| --------------- | ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| flex-direction  | 定义了Flex项的排列方向             | row（默认值）：水平方向，从左到右。 <br/>row-reverse：水平方向，从右到左。 <br/>column：垂直方向，从上到下。 <br/>column-reverse：垂直方向，从下到上                                                                           |
| flex-wrap       | 定义Flex项的换行规则              | nowrap（默认值）：不换行。<br/>wrap：换行。<br/>wrap-reverse：换行，但是交叉轴的方向相反。                                                                                                                  |
| flex-flow       | 复合属性，同时定义direction 和 warp | row  nowrap（默认值）：水平方向，从左到右，不进行换行。                                                                                                                                              |
| justify-content | 定义了Flex项在主轴上的对齐方式         | flex-start（默认值）：起点对齐。 <br/>flex-end：终点对齐。<br/>center：居中对齐。 <br/>space-between：两端对齐，项目之间的间隔都相等。 <br/>space-around：起始项和结束项的间隔为其他项目的一半，其他项目两侧的间隔相等。<br/>space-evenly：每个项目两侧的间隔相等。 |
| align-items     | 定义了Flex项在交叉轴上如何对齐         | stretch（默认值）：拉伸到填满容器。 <br/>flex-start：交叉轴的起点对齐。 <br/>flex-end：交叉轴的终点对齐。 <br/>center：交叉轴的中点对齐。 <br/>baseline: 项目的第一行文字的基线对齐。                                                    |
| align-content   | 定义了多行之间的对齐方式              | flex-start（默认值）：起点对齐。  <br/>flex-end：终点对齐。 <br/>center：居中对齐。  <br/>space-between：两端对齐，项目之间的间隔都相等。  <br/>space-around：每个项目两侧的间隔相等。                                              |

主轴：flex-direction定义的方向为主轴。

交叉轴：flex-direction定义的垂直方向为交叉轴。
