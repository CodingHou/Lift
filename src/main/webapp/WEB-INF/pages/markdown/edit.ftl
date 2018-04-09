<!DOCTYPE html>
<html lang="zh">
<head>
    <meta charset="utf-8"/>
    <title>Simple example - Editor.md examples</title>
    <link rel="stylesheet" href="${base}/app/editormd/css/style.css"/>
    <link rel="stylesheet" href="${base}/app/editormd/css/editormd.css"/>
    <link rel="shortcut icon" href="https://pandao.github.io/editor.md/favicon.ico" type="image/x-icon"/>
</head>
<body>
<form action="${base}/markdown/insert.action" id="inputForm">
    <div id="layout">
        <header>
            <h1>Simple example</h1>
        </header>
        <div id="test-editormd">
                <textarea name="content" id="content" >${note.content}
       </textarea>
        </div>
        <input type="button" id="submit" value="submit">
    </div>
</form>
    <script src="${base}/script/jquery-3.2.1.js"></script>
    <script src="${base}/app/editormd/editormd.min.js"></script>
    <script type="text/javascript">
        var testEditor;

        $(function () {
            $("#submit").on("click", function () {
//                $("#inputForm").submit();
                $.ajax({
                    url:"../markdown/insert.action",    //请求的url地址
                    dataType:"json",   //返回格式为json
                    async:false,//请求是否异步，默认为异步，这也是ajax重要特性
                    data:{"content":$("#content").val()},    //参数值
                    type:"POST",   //请求方式
                    success:function(data){
                        if (data.status){
                          alert("保存成功")
                        }else {
                            alert("保存失败")
                        }

                    },
                    error:function(){
                        //请求出错处理
                        alert("服务器错误");
                        return;
                    }
                });
            });

            testEditor = editormd("test-editormd", {
                width: "90%",
                height: 640,
                syncScrolling: "single",
                path: "${base}/app/editormd/lib/"
            });

            /*
            // or
            testEditor = editormd({
                id      : "test-editormd",
                width   : "90%",
                height  : 640,
                path    : "../lib/"
            });
            */
        });
    </script>
</body>
</html>