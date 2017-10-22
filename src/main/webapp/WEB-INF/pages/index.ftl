<!DOCTYPE html >
<html>
<head>
    <#--<meta charset="UTF-8">-->
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title></title>
    <link rel="stylesheet" type="text/css" href="/style/sign.css"/>
    <script src="/script/jquery-3.2.1.js" type="text/javascript"  charset="UTF-8"></script>
    <script src="/script/sign.js" type="text/javascript" charset="UTF-8"></script>
</head>
<body>
<div id="content">
    <div id="lift">
        Lift
    </div>
    <!--登录框-->
    <form id="indexForm" action="/index/signIn.action" method="post">
        <div id="main">
            <!--选项卡-->
            <ul>
                <li id="li-signIn" class="cli">登录</li>
                <div id="space">

                </div>
                <li id="li-signUp" class="no_cli">注册</li>
            </ul>
            <!--登录-->
            <div id="signIn">
                <!--用户名-->
                <div class="inputDiv" >
                    <input type="text" class="inputText" name="userName" id="userName" value="" placeholder="用户名/邮箱"/>
                    <span id="nameInfo" class="info"></span>
                </div>
                <!--密码-->
                <div class="inputDiv">
                    <input type="password" class="inputText" name="password" id="password" value="" placeholder="请输入密码"/>
                    <span id="passwordInfo" class="info"></span>
                </div>
                <!--记住密码-->
                <div id="remember">
                    <input type="checkbox" name="" id="rememberBox" value="" />
                    <label for="rememberBox">记住密码</label>
                    <!--注册/忘记-->
                    <a href="#" id="forget">忘记密码？</a>
                </div>

                <!--登录按钮-->
                <input type="button" name="" id="signInBtn" value="登录" />

                <!--关联登录-->
                <div id="other">
                    <div id="qq">
                        <a href="" title="QQ登录"></a>
                    </div>
                    <div id="pay">
                        <a href="" title="支付宝登录"></a>
                    </div>
                    <div id="weixin">
                        <a href="" title="微信登录"></a>
                    </div>
                </div>
            </div>


            <!--注册-->
            <div id="signUp">
                <!--邮箱-->
                <input type="email" name="email" id="email" value="" class="inputText" placeholder="用于注册的email"/>
                <span id="emailInfo" class="info"></span>
                <!--用户名-->
                <!--<input type="text" name="" id="" value="" class="inputText" placeholder="用户名"/>-->
                <!--密码-->
                <input type="password" name="pwd" id="pwd" class="inputText" value="" placeholder="请输入密码"/>
                <span id="pwdInfo" class="info"></span>
                <div class="info" id="strength">
                    <span id="strength1" ></span>
                    <span id="strength2" ></span>
                    <span id="strength3"></span>
                    <div id="strengthTab" ></div>
                </div>
                <!--再输入一次密码-->
                <input type="password" name="pwd2" id="pwd2" class="inputText" value="" placeholder="请再次输入密码"/>
                <span id="pwd2Info" class="info"></span>
                <!--验证码-->
                <!--<div id="verification">-->
                <!--<input type="text" name="" id="verifyCode" class="inputText" value="" placeholder="请输入验证码"/>-->
                <!--<img src="" title="点击刷新"/>-->
                <!--<span id="verifyInfo" class="info"></span>-->
                <!--</div>-->

                <!--提交-->
                <input type="button" name="" id="signUpBtn" value="立即注册" />
                <!--同意-->
                <!--<div id="agree">-->
                <!--<span id="">-->
                <!--注册即代表你同意-->
                <!--</span>-->
                <!--<a href="">注册协议</a>-->
                <!--</div>-->

            </div>

        </div>
    </form>
</div>
</body>
</html>
