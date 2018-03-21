package controllers

import (
	"github.com/astaxie/beego"

	"kdwll/utils"
)

type StatisticsController struct {
	beego.Controller
}

func (c *StatisticsController)Get() {
	var resp utils.Response

	resp.Code = utils.STATUS_OK
	resp.Message = utils.MSG_OK
	resp.Data = map[string]int64{
		"table_count": 10,
		"data_item_count": 32127,
	}

	c.Data["json"] = resp
	c.ServeJSON()
}
