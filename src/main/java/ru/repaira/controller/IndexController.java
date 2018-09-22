package ru.repaira.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import javax.servlet.http.HttpServletRequest;

@Controller
public class IndexController {

    @GetMapping("/")
    public String getDefault() {
        return getHome();
    }

    @GetMapping("/index")
    public String getHome() {
        return "/index";
    }
}
