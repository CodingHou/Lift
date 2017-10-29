package com.hou.lift.controller;


import com.hou.lift.enums.InitDetailEnum;
import com.hou.lift.model.Task;
import com.hou.lift.model.TaskDetail;
import com.hou.lift.model.User;
import com.hou.lift.service.IUserService;
import com.hou.lift.service.TaskDetailService;
import com.hou.lift.service.TaskService;
import com.hou.lift.util.BaseResult;
import com.hou.lift.util.DateUtil;
import com.hou.lift.util.JsonUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@RequestMapping("/task")
@Controller
public class TaskController {

    @Autowired
    private TaskService taskService;
    @Autowired
    private TaskDetailService taskDetailService;
    @Autowired
    private IUserService userService;

    //展示列表的方法
    @RequestMapping("/list")
    public String list(String userName,Integer userId, ModelMap modelMap, HttpServletRequest request) throws ParseException {
//        int userId = (int) request.getAttribute("userId");
        User user = userService.getUserByName(userName);
        userId = user.getId();
        List<Task> taskList = taskService.getTaskList(user.getId());
        List<TaskDetail> detailList = new ArrayList<>();
//        初始化数据
        Task task = new Task();
        if (taskList.size() == 0) {
            task = initTask(userId);
            taskList.add(task);
            detailList = initDetailList(task);
        } else {
            task = taskList.get(0);
            detailList = taskDetailService.getTaskDetailList(userId, taskList.get(0).getId());
        }
        modelMap.addAttribute("userId", userId);
        modelMap.addAttribute("task", task);
        modelMap.addAttribute("taskList", taskList);
        modelMap.addAttribute("detailList", detailList);
        return "/home";
    }

    @RequestMapping("/getTaskDetail")
    public String getTaskDetail(Integer userId,Integer taskId,ModelMap modelMap) {
        List<TaskDetail> taskDetailList = taskDetailService.getTaskDetailList(userId,taskId);
        modelMap.addAttribute("taskDetailList", taskDetailList);
        return "/home";
    }


    @ResponseBody
    @RequestMapping("/insertTask")
    public HashMap<String, Object> insertTask(Integer userId) {
        BaseResult baseResult = new BaseResult();
        Task task = new Task();
        task.setUserId(userId);
        int c =taskService.addTask(task);
        if (c == 1) {
            baseResult.setStatus(true);
            baseResult.setMsg("保存成功!");
        } else {
            baseResult.setStatus(false);
            baseResult.setMsg("保存失败");
        }
        return JsonUtils.toHashMap(baseResult);
    }

    @ResponseBody
    @RequestMapping("/updateTask")
    public HashMap<String, Object> updateTask(Task task,String del,String createDate) {
        BaseResult baseResult = new BaseResult();
        if ("yes".equals(del)) {
            task.setDataState(2);
        }
        int c =taskService.updateTask(task);
        if (c == 1) {
            baseResult.setStatus(true);
            baseResult.setMsg("保存成功!");
        } else {
            baseResult.setStatus(false);
            baseResult.setMsg("保存失败");
        }
        return JsonUtils.toHashMap(baseResult);
    }

    private Task initTask(Integer userId) throws ParseException {
        Task initTask = new Task();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-mm-dd");
        initTask.setBeginDate(sdf.parse(DateUtil.getNowDate()));
        initTask.setName("新任务");
        initTask.setLabel(1);
        initTask.setTotalDetail(5);
        initTask.setCompletedDetail(1);
        initTask.setUserId(userId);
        taskService.addTask(initTask);
        return initTask;
    }

    private List<TaskDetail> initDetailList(Task initTask) throws ParseException {
        List<TaskDetail> detailList = new ArrayList<>();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-mm-dd");
        for (int i = 0; i < 5; i++) {
            TaskDetail detail = new TaskDetail();
            detail.setName(InitDetailEnum.getName(i+1));
            detail.setDataState(1);
            if (i == 1) {
                detail.setDataState(2);
            }
            detail.setLabel(initTask.getLabel());
            detail.setTaskId(initTask.getId());
            detail.setUserId(initTask.getUserId());
            detail.setCreateTime(sdf.parse(DateUtil.getNowDate()));
            taskDetailService.addTaskDetail(detail);
            detailList.add(detail);
        }
        return detailList;
    }
    //增删改查


}
