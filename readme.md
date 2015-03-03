#ezgotranslate
以下接口如无特殊说明 均使用post

##登录模块

###login
登录接口

请求地址：/user/login
请求参数

    username:用户名  a
    password：密码 123456
    
返回值 
errcode 
0 为登录成功 
1 为登录失败

    {
        errcode: "0"
        email: "a@ezgotranslate.com"
        translate: "中文"
        sex: "男"
        location: "重庆"
        nickname: "啊"
    }
    
###register
注册接口

请求地址：/user/register
请求参数

    username:用户名
    password：密码
    email:邮箱
    sex:性别
    location:地区
    nickname：昵称
    translate:翻译偏好
    about：关于我
    
返回值 
errcode 
0 为注册成功 
1 为注册失败

    {
        "errcode":"0"
    }
    
###logout
登出接口

请求地址：/user/logout
请求参数：

    无
    
返回值 
errcode 
0 为登出成功 
1 为登出失败

    {
        "errcode":"0"
    }
###hasuser
测试该用户名是否被注册  
请求地址:/user/hasuser
请求参数：

username：用户名

返回值

    {
        errcode:0（0为未注册,1为以注册）
    }  
##信息模块
###getinfo
获取翻译接口
(为了开发方便目前会返回所有的信息)

请求地址:/info/getinfo
请求参数:

    无

返回值

    [
        {
        info_id: "14104441145411ab52054d23.99321960"
        info_content: "hello"
        info_language: "en"
        updated_at: null
        created_at: null
        }
        {
        info_id: "141044610615411b31aab1fd"
        info_content: "hi"
        info_language: "en"
        updated_at: "2014-09-11 14:35:06"
        created_at: "2014-09-11 14:35:06"
        }
    ]
###insertinfo
插入翻译信息接口

请求地址:/info/insertinfo

    可选参数：
        content:翻译信息
        lanuage:翻译语言

返回值:

    {
        errcode: 0
    }
###updateinfo
   修改翻译信息
请求地址：/info/updateinfo
请求参数:
    
    必选参数：
        infoid:信息id
    可选参数：
        content:翻译信息
        lanuage:翻译语言

返回值:

    {
        errcode: 0
    }

###delteinfo
删除翻译信息
请求地址：/info/deleteinfo
请求参数:
    
    必选参数：
        infoid:信息id
    可选参数

返回值:

    {
        errcode: 0
    }
##翻译模块
###gettranslate
获取翻译接口
(为了开发方便目前会返回所有的信息)

请求地址:/translate/gettranslate
请求参数:

    无

返回值

    [
        {
        translate_id: "1413287394543d0de2f14222.06357417"
        info_id: "141068563354155ac1a9da31.91101597"
        translate_language: "cns"
        translate_result: "嗨"
        updated_at: "2014-10-14 11:49:54"
        created_at: "2014-10-14 11:49:54"
        deleted_at: null
        }
    ]
###inserttranslate
插入翻译信息接口

请求地址:/translate/inserttranslate

    可选参数：
        result:翻译结果
        lanuage:翻译语言
        infoid:需要翻译得信息id

返回值:

    {
        errcode: 0
    }
###updatetranslate
   修改翻译信息
请求地址：/translate/updatetranslate
请求参数:
    
    必选参数：
        translateid:翻译id
    可选参数：
        result:翻译结果
        lanuage:翻译语言

返回值:

    {
        errcode: 0
    }

###deltetranslate
删除翻译信息
请求地址：/translate/deltetranslate
请求参数:
    
    必选参数：
        translateid:翻译id
    可选参数

返回值:

    {
        errcode: 0
    }
    
###searchtranslate
   根据翻译id查询翻译信息
请求地址：/translate/searchtranslate
请求参数：

    必选参数：
	    translateid：翻译id
		
返回值：

成功则返回：

    {
		"translate_id":"1413287394543d0de2f14222.06357417",
		"info_id":"141068563354155ac1a9da31.91101597",
		"translate_language":"cns",
		"translate_result":"\u55e8",
		"updated_at":"2014-10-14 11:49:54",
		"created_at":"2014-10-14 11:49:54",
		"deleted_at":null
	}

错误则返回：

	{
		"errcode":1,
		"errmsg":"not found"
	}
