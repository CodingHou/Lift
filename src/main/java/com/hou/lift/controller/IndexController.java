package com.hou.lift.controller;

import com.hou.lift.cons.Constants;
import com.hou.lift.model.User;
import com.hou.lift.service.IUserService;
import com.hou.lift.util.BaseResult;
import com.hou.lift.util.JsonUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.HashMap;


@Controller
@RequestMapping("/index")
public class IndexController {

    @Autowired
    private IUserService userService;

    @RequestMapping("/sign")
    public String index() {
        return "/sign";
    }

    //注册
    @ResponseBody
    @RequestMapping("/signUp")
    public String signUp(User user,HttpServletRequest request) {
        int c = userService.addUser(user);
        BaseResult baseResult = new BaseResult();
        if (c == 1) {
            baseResult.setStatus(true);
            baseResult.setData(user.getUserId());
            HttpSession session = request.getSession();
            session.setAttribute("userId", user.getUserId());
            session.setMaxInactiveInterval(-1);
            baseResult.setMsg("保存成功!");
        } else {
            baseResult.setStatus(false);
            baseResult.setMsg("保存失败");
        }
        return JsonUtils.toJson(baseResult);
    }

    //登录
    @ResponseBody
    @RequestMapping("signIn")
    public HashMap<String, Object> signIn(User user, String password, HttpServletRequest request) {
        BaseResult baseResult = new BaseResult();
        user = userService.getUserByName(user.getUserName());
        request.setAttribute("userId", user.getUserId());
        if (user != null) {
            if (password.equals(user.getPassword())) {
                baseResult.setStatus(true);
                baseResult.setMsg("登录成功!");
                HttpSession session = request.getSession();
                session.setAttribute("userId", user.getUserId());
                session.setMaxInactiveInterval(-1);
            } else {
                baseResult.setStatus(false);
                baseResult.setMsg("密码不正确！");
            }
        } else {
            baseResult.setStatus(false);
            baseResult.setMsg("用户不存在！");
        }
        return JsonUtils.toHashMap(baseResult);
    }

    //登录和注册判断用户名是否存在的方法，
    //根据不同的页面返回不同的提示信息
    @ResponseBody
    @RequestMapping("/checkUser")
    public HashMap<String, Object> checkUser(String userName, Integer checkType) {
        BaseResult baseResult = new BaseResult();
        User user = userService.getUserByName(userName);
        //如果是登录页面，检查用户是否存在
        if (checkType == Constants.CHECK_EXIST) {
            if (user != null) {
                baseResult.setMsg("用户存在");
                baseResult.setStatus(true);
            }else {
                baseResult.setMsg("该用户不存在");
                baseResult.setStatus(false);
            }
        //如果是注册页面，检查用户名是否重复
        } else if (checkType == Constants.CHECK_REPEAT) {
            if (user != null) {
                baseResult.setMsg("用户名已经存在");
                baseResult.setStatus(true);
            }else {
                baseResult.setMsg("用户名未注册");
                baseResult.setStatus(false);
            }
        }
        return JsonUtils.toHashMap(baseResult);
    }



}
