## Web document 说明
----

#### 命名法约定

**Js** 变量一律采用驼峰式命名法

**CSS** 一律采用下划线法

**HTML文件** 一律采用下划线法

----

#### HTML document

**index.html** 点击进入Tryneeds主页

**after_signin.html** 登陆之后的主页，右上角出现会员信息

**homepage.html** 点击会员信息（右上角的框），进入个人主页，显示真在进行的项目

**personal_inf.html** 个人信息设置界面

`TODO`**translate_object.html**  管理项目界面（这个界面有些，鸡肋，这个板块需要再商议）

**translate_page.hrml**  进入某个项目内，显示项目进度

**translating.hrml**  正在进行翻译的界面

----

#### CSS document

css 文档很杂很多的问题，这是必须要整理的。
> 公用部分公用, 其他部分可以用一个上层结构来区分
比如都是 content
一个是 .page-index-wrapper .content 一个是 .page-account-wrapper .content         ---[Villic Van]()


**headfoot.css**  head和foot的样式。每个界面都有，所以独立出来。

`TODO`**homepage.css** 为 homepage.html 工作

`TODO`**personal_inf.css** 为personal_inf.html 工作

**setting_nav.css** 个人信息主导航的样式

**signinup.css** 登陆、注册窗口的样式

`TODO`**temp.css**

`TODO`**translate_page.css** 为 translate_object 工作

`TODO`**translating.css** 为translating.html 工作

----

#### Js ducoment

> **Tips:** 这个也是需要整理的。

**signinup.js** 登陆

**translate.js** 翻译模块

**personal.js** 个人信息设置

**main.js** This file is mainly for update user's related information

**index.js** This JS file is mainly to provide login|register|logout

**function.js** This JS file is mainly to save some useful functions

