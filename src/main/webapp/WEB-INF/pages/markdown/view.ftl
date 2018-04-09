<!DOCTYPE html>
<html lang="zh">
<head>
    <meta charset="utf-8" />
    <title>HTML Preview(markdown to html) - Editor.md examples</title>
    <link rel="stylesheet" href="${base}/app/editormd/css/style.css" />
    <link rel="stylesheet" href="${base}/app/editormd/css/editormd.preview.css" />
    <link rel="shortcut icon" href="https://pandao.github.io/editor.md/favicon.ico" type="image/x-icon" />
    <style>
        .editormd-html-preview {
            width: 90%;
            margin: 0 auto;
        }
    </style>
</head>
<body>
<form action="/markdown/edit.action" method="post" id="viewForm">
<div id="layout">
    <header>
        <h1>Markdown转HTML的显示处理</h1>
        <p>即：非编辑情况下的HTML预览</p>
        <p>HTML Preview(markdown to html)</p>
    </header>
    <#--<div id="test-editormd-view">-->
        <#--<textarea style="display:none;" name="test-editormd-markdown-doc"></textarea>-->
    <#--</div>-->
    <input type="hidden" name="noteId" id="noteId" value="${note.noteId}">
    <div id="test-editormd-view2">
                <textarea id="append-test" style="display:none;"> ${note.content}</textarea>
    </div>
    <input type="button" name="editNote" id="editNote" value="编辑">
</div>
</form>
<!-- <script src="js/zepto.min.js"></script>
<script>
    var jQuery = Zepto;  // 为了避免修改flowChart.js和sequence-diagram.js的源码，所以使用Zepto.js时想支持flowChart/sequenceDiagram就得加上这一句
</script> -->
<script src="${base}/script/jquery-3.2.1.js" charset="utf-8"></script>
<script src="${base}/app/editormd/lib/marked.min.js"></script>
<script src="${base}/app/editormd/lib/prettify.min.js"></script>

<script src="${base}/app/editormd/lib/raphael.min.js"></script>
<script src="${base}/app/editormd/lib/underscore.min.js"></script>
<script src="${base}/app/editormd/lib/sequence-diagram.min.js"></script>
<script src="${base}/app/editormd/lib/flowchart.min.js"></script>
<script src="${base}/app/editormd/lib/jquery.flowchart.min.js"></script>

<script src="${base}/app/editormd/editormd.js"></script>
<script type="text/javascript">
    $("#editNote").on("click",function(){
        $("#viewForm").submit();
    })

    $(function() {
        var testEditormdView, testEditormdView2;

        $.get("test.md", function(markdown) {

            testEditormdView = editormd.markdownToHTML("test-editormd-view", {
                markdown        : markdown ,//+ "\r\n" + $("#append-test").text(),
                //htmlDecode      : true,       // 开启 HTML 标签解析，为了安全性，默认不开启
                htmlDecode      : "style,script,iframe",  // you can filter tags decode
                //toc             : false,
                tocm            : true,    // Using [TOCM]
                //tocContainer    : "#custom-toc-container", // 自定义 ToC 容器层
                //gfm             : false,
                //tocDropdown     : true,
                // markdownSourceCode : true, // 是否保留 Markdown 源码，即是否删除保存源码的 Textarea 标签
                emoji           : true,
                taskList        : true,
                tex             : true,  // 默认不解析
                flowChart       : true,  // 默认不解析
                sequenceDiagram : true,  // 默认不解析
            });

            //console.log("返回一个 jQuery 实例 =>", testEditormdView);

            // 获取Markdown源码
            //console.log(testEditormdView.getMarkdown());

            //alert(testEditormdView.getMarkdown());
        });

        testEditormdView2 = editormd.markdownToHTML("test-editormd-view2", {
            htmlDecode      : "style,script,iframe",  // you can filter tags decode
            emoji           : true,
            taskList        : true,
            tex             : true,  // 默认不解析
            flowChart       : true,  // 默认不解析
            sequenceDiagram : true,  // 默认不解析
        });
    });
</script>
</body>
</html>