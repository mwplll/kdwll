/* Copyright 2018. All Rights Reserved. */
/* main.go - the main structure of kdwll.  */
/*
modification history
--------------------
*/
/*
DESCRIPTION
*/
package main

import (
	"os"
	"fmt"
	"net/http"
	"text/template"

	"github.com/astaxie/beego"
	"github.com/astaxie/beego/orm"
	_ "github.com/go-sql-driver/mysql"

	"kdwll/utils"
	"kdwll/controllers"
)

/*
* setConfig - setup the config path
*
* PARAMS: none
*
* RETURNS:none
*
 */
func setConfig() {
	beego.Debug("set config path:", beego.AppPath + "/conf/app.conf")
	beego.LoadAppConfig("ini", beego.AppPath + "/conf/app.conf")
}

/*
* setDb - setup the db config
*
* PARAMS: none
*
* RETURNS: none
*
 */
func setDb() {
	//register database driver
	orm.RegisterDriver("mysql", orm.DRMySQL)
	//register database instance
	orm.RegisterDataBase("default", "mysql",
		fmt.Sprintf("%v:%v@tcp(%v:%v)/%v?charset=utf8&parseTime=true",
			beego.AppConfig.String("db_user"), beego.AppConfig.String("db_password"),
			beego.AppConfig.String("db_host"), beego.AppConfig.String("db_port"),
			beego.AppConfig.String("db_name")), 30)
	if beego.BConfig.RunMode == "dev" {
		orm.Debug = true
	}
}

/*
* setLog - setup the log config
*
* PARAMS: none
*
* RETURNS: none
*
 */
func setLog() {
	log_file := beego.AppConfig.String("log_file")
	if !utils.IsFileExist(log_file) {
		os.Create(log_file)
	}
	beego.SetLogger("file", `{"filename":"` + beego.AppConfig.String("log_file") + `"}`)
	// print file name and line number
	beego.SetLogFuncCall(true)
	if beego.BConfig.RunMode != "dev" {
		beego.BeeLogger.DelLogger("console")
	}
}

/*
* pageNotFound - setup the 404 page info
*
* PARAMS: none
*
* RETURNS: none
*
 */
func pageNotFound(rw http.ResponseWriter, r *http.Request) {
	m := `{status:"fail","description":"api not supported"}`
	t, _ := template.New("beegoerrortemp").Parse(m)
	t.Execute(rw, nil)
}

/*
* recover - recover when system restart
*
* PARAMS: none
*
* RETURNS: none
*
 */
//func setRecover() {
//	services.DeploymentsAutoRecover()
//}

/*
* setRoute - setup the system api routes
*
* PARAMS: none
*
* RETURNS: none
*
 */
func setRoute() {
	beego.ErrorHandler("404", pageNotFound)
	// api
	beego.Router(`/api/v1/search/:key`, &controllers.SearchController{}, "get:Get")
	beego.Router(`/api/v1/statistics`, &controllers.StatisticsController{}, "get:Get")
	beego.Router(`/api/v1/debug/:key`, &controllers.SearchController{}, "get:Debug")
	// view
	beego.Router(`/`, &controllers.ViewController{}, "get:Index")
	beego.Router(`/search`, &controllers.ViewController{}, "get:Search")
}

/*
* main - the main function of the system
*
* PARAMS: none
*
* RETURNS: none
*
 */
func main() {
	setConfig()
	setDb()
	setLog()
	setRoute()

	beego.Run()
}
