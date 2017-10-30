﻿/**
 * Created by 白 on 2017/10/17.
 */


$(function () {
    // 点击编辑标签
    $("body").on("click", ".tagChange", function () {
        // 他自己隐藏
        $(this).hide();
        // 全显示
        $(this).siblings().fadeIn();
    })

    // 添加新标签的Ajax
    function addTag(newTag, del, tagId) {
        var userId = $("#userId").val();
        $.ajax({
            url: "",    //请求的url地址
            dataType: "json",   //返回格式为json
            async: false,//请求是否异步，默认为异步，这也是ajax重要特性
            data: {
                "newTag": newTag,
                "del": del,
                "tagId": tagId,
                "userId": userId
            },    //参数值
            type: "POST",   //请求方式
            success: function (data) {
                if (data.status) {

                } else {
                    alert("保存失败");
                }
            },
            error: function () {
                //请求出错处理
                // alert("服务器错误");
                // return;
            }
        });
    }

    // 点击减号
    $("body").on("click", ".tagDel", function () {
        // 他前边的span删除
        $(this).prev().remove();
        // 他自己也删除
        $(this).remove();
        var newTag = $(this).prev().html();
        var tagId = $(this).next().attr("id");
        addTag(newTag, "yes", tagId);
    })

    // 点击标签的对勾
    $("body").on("click", ".tagOk", function () {
        var par = $(this).parent();
        // 新标签隐藏
        par.find(".addTag").hide();
        // 减号隐藏
        par.find(".tagDel").hide();
        // 对勾隐藏
        par.find(".tagOk").hide();
        // 编辑显示
        par.find(".tagChange").fadeIn();
        // 隐藏输入框
        if ($(".inputTag").val() == "") {
            $(".inputTag").hide();
        }
    })

    // 点击添加新标签。添加输入框
    $("body").on("click", ".addTag", function () {
        $(this).before("<div class=\"newTag\"><input class=\"inputTag\" type=\"text\" placeholder=\"新标签\" ><span class=\"tag select\"></span><span class=\"tagDel\">-</span><input type=\"hidden\" value=\"\"></div>");
    })

    // 鼠标离开新标签输入框。显示新标签。隐藏他自己
    $("body").on("blur", ".inputTag", function () {
        var newTag = $(this).val();
        if (newTag != "") {
            $(this).next().html(newTag);
            $(this).next().show();
            $(this).next().next().show();
            $(this).hide();
        }
        var tagId = $(this).next().next().attr("id");
        addTag(newTag, "no", tagId);
    })

    // 给页面的第一个小列表加上选中效果
    // $(document).ready(function () {
    //     var div = $("#list-box").find("div:first");
    //     div[0].classList.add("choose");
    //     // console.log(div[0].classList);
    // })
    var div = $("#list-box").find("div:first");
    div[0].classList.add("choose");

    // 被选中的小列表加上效果
    $('body').on('click', '.task', function () {
        // $(".task").click(function () {
        $(this).addClass("choose");
        $(this).siblings().removeClass("choose");
    })


    // 小列表的Ajax
    function updateTask(del) {
        var choose = $(".choose");
        var grade = choose.find(".grade:visible").find("input").val();
        var tag = choose.find(".theTag1").html();
        var title = choose.find(".title span").html();
        var day = choose.find(".day span").html();
        var taskId = choose.find(".taskId").attr("value");
        var userId = $("#userId").val();
        $.ajax({
            url: "/task/updateTask.action",    //请求的url地址
            dataType: "json",   //返回格式为json
            async: false,//请求是否异步，默认为异步，这也是ajax重要特性
            data: {
                "grade": grade,
                "label": tag,
                "name": title,
                "createTime": day,
                "del": del,
                "id": taskId,
                "userId": userId
            },    //参数值
            type: "POST",   //请求方式
            success: function (data) {
                if (data.status) {
                    // alert("保存成功");
                } else {
                    alert("保存失败");
                }
            },
            error: function () {
                //请求出错处理
                alert("服务器错误");
                // return;
            }
        });
    }

    //在载入页面的时候将重要程度设为不透明
    $(".stateBar").find(":first-child").animate({'opacity': '1'});
    $('body').on('click', '.stateBar div:first', function () {
        // 如果三个圈是隐藏的。显示三个圈。隐藏他自己。获取他自己的class。找到三个圈里class和他一样的那个改变透明度。把三个圈里的同级改为透明。
        $(this).next().show();
        $(this).hide();
        /* 在取多个class的时候，不能有空格而且需要用"."或者","来分隔，
         不过我们将动画效果移入到下面的function中，就不需要取这个class了*/
        // var gradeClass=$(this).attr("class");
        // gradeClass="."+gradeClass.replace(" ",".");
    })

    $('body').on('click', '.gradeBox>div', function () {
        // 如果点的是三个圈。显示单个的。隐藏gradeBox
        $(this).parent().prev().show();
        $(this).parent().hide();
        // 获取被选中的class和val，赋值给单个的grade，透明度改为1
        var gradeClass = $(this).attr("class");
        var gradeVal = $(this).find("input").val();
        $(this).parent().prev().attr("class", gradeClass);
        $(this).parent().prev().find("input").attr("value", gradeVal);
        $(this).parent().prev().animate({'opacity': '1'});
        //获取选中的grade。将他的透明度设为1.其他的设为0.1
        $(this).siblings().animate({'opacity': '0.1'});
        $(this).animate({'opacity': '1'});
        // 返回val到后台进行更新
        updateTask("no");
        $(".item").find(".grade").attr("class", gradeClass).animate({'opacity': '1'});

    })


    // 修改标题。点击切换input
    // $(".listSpan").valueOf();
    $('body').on('click', '.listSpan', function () {
        // $(".listSpan").click(function () {
        $(this).hide();
        $(this).siblings().show();
    })

    // 光标离开标题、日期的input。切换回span
    $('body').on('blur', '.listInput', function () {
        // $(".listInput").blur(function () {
        $(this).hide();
        $(this).siblings().show();
        // 获取输入的值
        var input = $(this).val();
        // 把input的值赋给span
        if (input != "") {
            $(this).parent().find("span").html(input);
        }

        updateTask("no");
    })

    // 取标题赋给输入框
    var chooseTitle = $(".choose").find(".title span").html();
    $(".choose").find(".title input").val(chooseTitle);

    // 输入的同时详细列表标题改变信息
    $('body').on('keyup', '.listInput', function () {
        // $(".listInput").keyup(function () {
        var par = $(this).parent().attr("class");
        if (titInput != "" && par == "title") {
            // 获取标题
            var titInput = $(this).val();
            // 把标题赋给h2
            $("#item").find("h2").html(titInput);
        }

    })

    // 标签悬浮窗的显示和隐藏
    $('body').on('click', '.stateBar span', function () {
        // $(".stateBar span").click(function () {
        // 获取他的悬浮标签
        var tag = $(this).parent().next("div");
        if (tag.is(":hidden")) {
            tag.fadeIn();
        } else {
            tag.fadeOut();
        }
    })

    // 点击悬浮窗内的标签。替换悬浮窗外的
    // 当它被点击
    $('body').on('click', '.allTag span', function () {
        // $(".allTag span").click(function () {
        // 获取悬浮窗内被点击的html
        var newTag = $(this).html();
        // 获取要替换的那个tag
        var theTag1 = $(this).parent().parent().children().find(".theTag1");
        // 替换悬浮窗外的小标签
        theTag1.html(newTag);
        // 替换掉大列表里的标签
        $(".item").find(".tag").html(newTag);
        // 隐藏悬浮窗
        $(this).parent().fadeOut();
        // 颜色替换
        $(this).removeClass("NoChoose");
        $(this).siblings().addClass("NoChoose");
        updateTask("no");
    })

    // 小垃圾桶删除小列表的效果
    $("body").on("click", ".del", function () {
        $(this).parent().remove();
        updateTask("yes");
    })

    //新增小列表Div的方法
    function addElementDiv(obj) {
        var parent = document.getElementById(obj);
        //添加 div
        var div = document.createElement("div");
        //设置 div 属性，如 id
        div.setAttribute("class", "task");
        div.innerHTML = "<input type=\"hidden\" id=\"\" class=\"taskId\"><div class=\"stateBar\"><div class=\"grade grade1\"></div><div class=\"grade grade2\" ></div><div class=\"grade grade3\" ></div><span class=\"tag theTag1\">家</span></div><div class=\"allTag\"><span class=\"tag NoChoose\">1</span><span class=\"tag NoChoose\">2</span><span class=\"tag NoChoose\">3</span></div><div class=\"title\"><input type=\"text\" class=\"listInput\" placeholder=\"标题\"><span class=\"listSpan\">标题</span></div><div class=\"day\"><input type=\"date\" class=\"listInput\"><span class=\"listSpan\">2017</span></div><div class=\"rate\"><div class=\"ratio\"></div></div><span class=\"rateVal\">0/0</span><img src=\"icon/del.png\" alt=\"\" class=\"del\">";
        //在之前加
        parent.prepend(div);
        $(".newDiv").slideDown();
    }

    // 新增小列表
    function addNewList() {
        var userId = $("#userId").val();
        $.ajax({
            url: "/task/insertTask.action",    //请求的url地址
            dataType: "json",   //返回格式为json
            async: false,//请求是否异步，默认为异步，这也是ajax重要特性
            data: {
                "userId": userId
            },    //参数值
            type: "POST",   //请求方式
            success: function (data) {
                if (data.status) {

                } else {
                    alert("保存失败");
                }
            },
            error: function () {
                //请求出错处理
                // alert("服务器错误");
                // return;
            }
        });
    }

    // 添加新任务
    $('body').on('click', '#add', function () {
        // $("#add").click(function () {
        addElementDiv('list-box');
        addNewList();
    })

    //新增新项目Div的方法
    function addItemDiv(obj) {
        var parent = document.getElementById(obj);
        //添加 div
        var div = document.createElement("div");
        //设置 div 属性，如 id
        div.setAttribute("class", "newDiv");
        div.innerHTML = "<input type=\"hidden\" id=\"\" class=\"detailId\"><div class=\"items\"><input type=\"checkbox\"/><div class=\"checkBox\"></div><span></span></div><div class=\"itemInput\"><div class=\"checkBox\"></div><input class=\"changeInput\" type=\"text\" ><img class=\"changeDel\" src=\"/icon/del.png\" alt=\"\"></div>";
        // 在之后加
        parent.append(div);
        $(".newDiv").slideDown();

    }

    // 获取进度条效果
    function ratioAnimation() {
        // 进度条效果
        // 获取小项目的个数
        var len = document.getElementsByClassName("items").length;
        // 获取小项目被选中的个数
        var checkLen = $("#toDoList").find("input[type='checkbox']:checked").length;
        // 获取进度条的条
        var ratio = $(".choose").find(".ratio");
        // 进度条效果
        var leftNum = (-325) + checkLen / len * 325;
        ratio.animate({left: leftNum + "px"});
        // 获取进度条下的分数
        var rateVal = $(".choose").find(".rateVal");
        // 进度条下分数效果
        rateVal.html(checkLen + "/" + len);
    }

    ratioAnimation();
    // 添加新项目
    $('body').on('click', '#newItem', function () {
        // $("#newItem").click(function () {
        addItemDiv('toDoList');
        // ratioAnimation();
        // 显示输入框
        $(".newDiv:last").find(".items").slideUp();
        $(".newDiv:last").find(".itemInput").slideDown();
        $(".changeDel").hide();
    })

    // 添加新的小项目Ajax
    function insert(inputData) {
        var taskId = $("#taskId").val();
        var userId = $("#userId").val();
        $.ajax({
            url: "/taskDetail/insertTaskDetail.action",    //请求的url地址
            dataType: "json",   //返回格式为json
            async: false,//请求是否异步，默认为异步，这也是ajax重要特性
            data: {
                "name": inputData,
                "taskId": taskId,
                "userId": userId
            },    //参数值
            type: "POST",   //请求方式
            success: function (data) {
                if (data.status) {
                    ratioAnimation();
                    // alert("保存成功");
                    // window.location.reload();
                    $(".detailId").attr("value", data.data);
                } else {
                    alert("保存失败");
                    //保存失败的话就删除最后添加的
                    var temp = $(".changeInput").is(":visible");
                    if (temp) {
                        // $(".changeInput:last").parent().remove();
                        $(".newDiv:last").remove();
                    }
                    return false;
                }
            },
            error: function () {
                //请求出错处理
                alert("服务器错误");
                //保存失败的话就删除最后添加的
                var temp = $(".changeInput").is(":visible");
                if (temp) {
                    // $(".changeInput:last").parent().remove();
                    $(".newDiv:last").remove();
                }
                return false;
                // return;
            }
        });
    }


    /*detail修改输入框鼠标离开时将数据赋给原来的span
        并进行新增或更新操作*/
    $("body").on("blur", ".changeInput", function () {
        // 他自己的值
        var changeInput = $(this).val();
        // 如果是编辑状态
        if ($("#changeOk").is(":visible")) {
            $(this).parent().prev().find("span").html(changeInput);
            // 往后台传id和内容
            // 他的hidden的id
            var inputId = $(this).parent().prev().prev().val();
            var check = $(this).parent().prev().find("input").is(":checked");
            update(changeInput, inputId, "update", check, null,null);
        } else {
            // 新增item
            $(".itemInput").slideUp();
            $(".items").slideDown();
            $(this).parent().prev().find("span").html(changeInput);
            if (changeInput == "") {
                // $(this).parent().prev().prev().remove();
                // $(this).parent().prev().remove();
                $(this).parent().parent().remove();
                return;
            }
            insert(changeInput);
        }
    })

    // 划掉项目
    $('body').on('click', '.items', function () {
        // $(".items").click(function () {
        var items = $(this).find("input[type=checkbox]");
        if (items.is(":checked")) {
            items.attr("checked", false);
            $(this).find("span").removeClass("spanChecked");
            $(this).find(".checkBox").removeClass("c");
            // 给后边的input也加上对勾
            $(this).next().find(".checkBox").removeClass("c");
        } else {
            items.attr("checked", true);
            $(this).find("span").addClass("spanChecked");
            $(this).find(".checkBox").addClass("c");
            $(this).next().find(".checkBox").addClass("c");
        }

        // // 进度条效果
        // 获取小项目的个数
        var totalNo = document.getElementsByClassName("items").length;
        // 获取小项目被选中的个数
        var checkedNo = $("#toDoList").find("input[type='checkbox']:checked").length;
        // // 获取进度条的条
        // var ratio = $(".choose").find(".ratio");
        // // 进度条效果
        // var leftNum = (-325) + checkLen / len * 325;
        // ratio.animate({left: leftNum + "px"});
        // // 获取进度条下的分数
        // var rateVal = $(".choose").find(".rateVal");
        // // 进度条下分数效果
        // rateVal.html(checkLen + "/" + len);
        ratioAnimation();
        // 返回数据
        var name = $(this).find("span").text();
        // var detailId = $(this).find(".detailId").val();
        var detailId = $(this).prev().val();
        // var check = $(".items").find("input").is(":checked");
        var check = $(this).find("input[type='checkbox']").is(":checked");
        update(name, detailId, 'update', check, checkedNo, totalNo);
    })


    // 编辑按钮效果
    $(".change").click(function () {
        // 原span隐藏。输入框出现
        $(".items").slideUp();
        $(".itemInput").slideDown();
        // 加号隐藏。对勾出现
        $(".add").slideUp();
        $(".changeOk").slideDown();
        $(".changeDel").show();
    })

    // 修改状态下的详细列表的Ajax
    function update(name, detailId, actionType, check, checkedNo, totalNo) {
        var taskId = $("#taskId").val();
        var userId = $("#userId").val();
        $.ajax({
            url: "/taskDetail/updateTaskDetail.action",    //请求的url地址
            dataType: "json",   //返回格式为json
            async: false,//请求是否异步，默认为异步，这也是ajax重要特性
            data: {
                "name": name,
                "id": detailId,
                "actionType": actionType,
                "isChecked": check,
                "taskId": taskId,
                "userId": userId,
                "checkedNo": checkedNo,
                "totalNo": totalNo
            },    //参数值
            type: "POST",   //请求方式
            success: function (data) {
                if (data.status) {
                    // $("#item-box").location="/task/list.action";
                    // $("#item-box").load("/taskDetail/list.action?userId="+userId+"&taskId="+taskId);
                    // window.location.reload();
                } else {
                    alert("保存失败");
                    // $("#item-box").location="/taskDetail/list.action";
                }
            },
            error: function () {
                //请求出错处理
                // alert("服务器错误");
                // return;
            }
        });
    }


    // 点垃圾桶删除这个小项目
    $("body").on("click", ".changeDel", function () {

        // 获取他的值
        var changeInput = $(this).parent().find(".changeInput").val();
        // 获取他的id
        var inputId = $(this).parent().prev().prev().val();
        var check = $(this).parent().prev().find("input").is(":checked");

        $(this).parent().prev().remove();
        $(this).parent().remove();
        // // 进度条效果
        // // 获取小项目的个数
        // var len = document.getElementsByClassName("items").length;
        // // 获取小项目被选中的个数
        // var checkLen = $("#toDoList").find("input[type='checkbox']:checked").length;
        // // 获取进度条的条
        // var ratio = $(".choose").find(".ratio");
        // // 进度条效果
        // var leftNum = (-325) + checkLen / len * 325;
        // ratio.animate({left: leftNum + "px"});
        // // 获取进度条下的分数
        // var rateVal = $(".choose").find(".rateVal");
        // // 进度条下分数效果
        // rateVal.html(checkLen + "/" + len);
        ratioAnimation();

        update(changeInput, inputId, "del", check, null,null);
    })

    // // 编辑状态下的添加小项目
    // $("body").on("click",".changeAdd",function () {
    //     $(this).parent().after("<div class=\"items\"><input type=\"checkbox\"/><div class=\"checkBox\"></div><span></span></div><div class=\"itemInput\"><input type=\"hidden\" id=\"\" class=\"detailId\"><div class=\"checkBox\"></div><input class=\"changeInput\" type=\"text\" ><img class=\"changeDel\" src=\"icon/del.png\" alt=\"\"></div>");
    //     $(this).parent().next().slideUp();
    //     $(this).parent().next().next().slideDown();
    // })


    // 点对勾恢复原样
    $("body").on("click", ".changeOk", function () {
        $(".itemInput").slideUp();
        $(".items").slideDown();
        $(".changeOk").slideUp();
        $(".add").slideDown();
    })


    // 点击标签筛选
    $("body").on("click", ".select", function () {

        // 获取选取标签的id
        var selectId = $(this).next().next().val();
        // $(window).attr('location','/task/list.action?label='+selectId);

        // 他自己是蓝的。别的全是灰的
        $(this).removeClass("NoChoose");
        $(this).siblings(".tag").addClass("NoChoose");

    })


})
