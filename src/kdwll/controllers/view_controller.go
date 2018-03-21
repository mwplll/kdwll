package controllers

import "github.com/astaxie/beego"

type ViewController struct {
	beego.Controller
}

func (c *ViewController) Index() {
	c.TplName = "index.html"
}

func (c *ViewController) Search() {
	c.TplName = "search.html"
}
