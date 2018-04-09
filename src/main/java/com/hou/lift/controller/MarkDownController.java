package com.hou.lift.controller;

import com.hou.lift.model.Note;
import com.hou.lift.service.NoteService;
import com.hou.lift.util.BaseResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/markdown")
public class MarkDownController {
    @Autowired
    private NoteService noteService;


    @RequestMapping("/init")
    public String inputPage() {
        return "/init";
    }

    @RequestMapping("/insert")
    public String insertMarkDown(String content, Note note,ModelMap modelMap){
        BaseResult baseResult = new BaseResult();
        note.setContent(content);
        int c = noteService.addNote(note);
        modelMap.addAttribute("note", note);
        if (c == 1) {
            baseResult.setStatus(true);
            baseResult.setData(note.getNoteId());
            baseResult.setMsg("保存成功!");

        } else {
            baseResult.setStatus(false);
            baseResult.setMsg("保存失败");
            return "/markdown/edit";
        }
        return "/markdown/view";
    }


    @RequestMapping("/edit")
    public String edit(ModelMap modelMap,Integer noteId){
        Note note = noteService.getNoteById(noteId);
        modelMap.addAttribute("note", note);
        return "/markdown/edit";
    }



    @RequestMapping("/view")
    public String view(ModelMap modelMap,Integer noteId){
        Note note = noteService.getNoteById(noteId);
        modelMap.addAttribute("note", note);
        return "/markdown/view";
    }
}
