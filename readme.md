#ezgotranslate
以下接口如无特殊说明 均使用post

##登录模块

###login
登录接口

请求地址：/user/login
请求参数

    username:用户名
    password：密码
    
返回值 
errcode 
0 为登录成功 
1 为登录失败

    {
        "errcode":"0"
    }
    
###regiser
注册接口

请求地址：/user/regiser
请求参数

    username:用户名
    password：密码
    email:邮箱
    
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
    
    