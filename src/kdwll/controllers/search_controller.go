package controllers

import (
	"fmt"

	"github.com/astaxie/beego"

	"kdwll/utils"
	"kdwll/services"
	"kdwll/models"
)

type SearchController struct {
	beego.Controller
}

func (c *SearchController) Get() {
	var resp utils.Response
	key := c.GetString(":key")

	s := &services.SearchEngine{
		KeyWord: key,
	}
	values, err := s.FindHitValues()
	if err != nil {
		resp.Code = utils.STATUS_DATABASE_ERROR
		resp.Message = fmt.Sprint("get table values from db error ---> ", err)
	} else {
		result := map[string]interface{}{
			"total_count": len(values),
			"elapsed_millsec": 567,
			"result": values,
		}
		resp.Code = utils.STATUS_OK
		resp.Message = utils.MSG_OK
		resp.Data = result
	}
	c.Data["json"] = resp
	c.ServeJSON()
}

func (c *SearchController) Debug() {
	var resp utils.Response
	key := c.GetString(":key")

	values, err := models.GetTableComments(key)
	if err != nil {
		resp.Code = utils.STATUS_DATABASE_ERROR
		resp.Message = fmt.Sprint("get table comments from db error ---> ", err)
	} else {
		resp.Code = utils.STATUS_OK
		resp.Message = utils.MSG_OK
		resp.Data = values
	}
	c.Data["json"] = resp
	c.ServeJSON()
}


