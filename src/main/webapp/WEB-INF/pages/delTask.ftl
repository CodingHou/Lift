<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title></title>
    <link rel="stylesheet" type="text/css" href="${base}/style/del.css" />
    <link rel="stylesheet" type="text/css" href="${base}/style/nav.css" />
    <script src="${base}/script/jquery-3.2.1.js" charset="utf-8"></script>
    <script src="${base}/script/del.js" charset="utf-8"></script>
</head>

<body>
    <!--侧导航-->
    [#include "nav.ftl"]
    <!--上导航-->
    <div id="nav-top">
        <!--搜索-->
        <div id="search">
            <input type="text" name="" id="search-text" value="" placeholder="任务名/内容/标签" />
            <button id="search-button"><img src="${base}/icon/search.png" /></button>
        </div>
        <!--个人中心-->
        <div id="personal">
            <a href="">
            <img src="${base}/icon/personal.png"/>
            <img src="${base}/icon/open.png" id="open"/>
        </a>
        </div>
        <!--提醒-->
        <div id="remind">
            <img src="${base}/icon/remind.png" />
            <span></span>
        </div>
    </div>
    <input type="hidden" id="userId" value="">
    <!--主体部分-->
    <div id="content">
        <!--标签-->
        <form action="" id="labelForm">
            <div id="contentTag">
                <div id="tag-box">
                    <span class="tag select">家</span>
                    <input type="hidden" value="">
                    <span class="tag select">公司</span>
                    <input type="hidden" value="">
                </div>
            </div>
        </form>
        <!--列表-->
        <form action="/${base}/task/list.action" id="taskForm">
            <div id="list-box">
                [#list taskList as item]
                <div class="task " id="${item.taskId}">
                    <input type="hidden" id="" class="taskId" value="${item.taskId}">
                    <!--附加信息-->
                    <div class="stateBar">
                        <div class="grade grade${item.gradeId}" [#if !item.gradeId]hidden[/#if]>
                            <input type="hidden" value="${item.gradeId}">
                        </div>
                        <div class="gradeBox" [#if item.gradeId]hidden[/#if]>
                            <div class="grade grade1">
                                <input type="hidden" name="grade1" value="1">
                            </div>
                            <div class="grade grade2">
                                <input type="hidden" name="grade2" value="2">
                            </div>
                            <div class="grade grade3">
                                <input type="hidden" name="grade3" value="3">
                            </div>
                        </div>
                        <!--标签-->
                        <input type="hidden" class="labelId" value="${item.labelId}">
                        <span class="tag theTag1 labelChoose">${item.labelName}</span>
                    </div>
                    <!--标题-->
                    <div class="title">
                        <span class="listSpan">${item.taskName}</span>
                    </div>
                    <!--日期-->
                    <div class="day">
                        <span class="listSpan">${item.beginDate?string('yyyy-MM-dd')}</span>
                    </div>
                    <!--进度条-->
                    <div class="rate">
                        <div class="ratio" style="left: calc(-325px + ${item.completedDetail}/${item.totalDetail} *325px)">
                        </div>
                    </div>
                    <span class="rateVal">${item.completedDetail}/${item.totalDetail}</span>
                    <!--恢复-->
                    <img src="${base}/icon/del.png" alt="删除" class="delExt">
                    <img src="${base}/icon/restore.png" alt="回复" class="del">
                </div>
                [/#list]
            </div>
        </form>
        <!--内容-->
        [#--[#if taskList]--] [#include "details.ftl"] [#--[/#if]--]
        <img src="${base}/icon/emptyBG.png" alt="点加号" id="emptyBG" hidden>
    </div>
</body>

</html>