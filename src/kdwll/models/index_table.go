package models

import (
	"time"

	"github.com/astaxie/beego"
	"github.com/astaxie/beego/orm"
)

type IndexTable struct {
	IndexId		int64            `orm:"pk;column(index_id)"json:"index_id"`
	Key 		string           `orm:"column(key)"json:"key"`
	Table 	    string           `orm:"column(table)"json:"table"`
	Remark 		string           `orm:"column(remark)"json:"remark"`
	Source 		string           `orm:"column(source)"json:"source"`
	CreateTime 	time.Time        `orm:"column(create_time)"json:"create_time"`
}


/*
 * init - init db model
 *
 * PARAMS: none
 *
 * RETURNS: none
 */
func init() {
	orm.DefaultTimeLoc = time.Local
	orm.RegisterModel(new(IndexTable))
}

/*
 * GetAllNameTables - get all has name tables
 *
 * PARAMS: none
 *
 * RETURNS:
 *   - []*NameTable: table list
 *   - error: if read fail
 */
func GetRelatedTables(keyWordType string) ([]*IndexTable, error) {
	o := orm.NewOrm()

	tables := []*IndexTable{}
	_, err := o.QueryTable("index_table").Filter("key", keyWordType).Limit(-1).All(&tables)
	if err != nil {
		beego.Error("get related tables from db error ---> ", err)
		return tables, err
	}
	return tables, nil
}

/*
 * GetTableValues - get values from table
 *
 * PARAMS:
 *   - keyWord: query key
 *   - keyWordType: query key type
 *   - table: table name
 *
 * RETURNS:
 *   - []orm.Params: result in []map
 *   - error: if read fail
 */
func GetTableValues(table, keyWord, keyWordType string) ([]orm.Params, error) {
	o := orm.NewOrm()

	var maps []orm.Params
	_, err := o.Raw("SELECT * FROM " + table + " WHERE " + keyWordType + " = ?", keyWord).Values(&maps)
	return maps, err
}

/*
 * GetTableComments - get table's field comments
 *
 * PARAMS:
 *   - table: table name
 *
 * RETURNS:
 *   - []orm.Params: result in []map
 *   - error: if read fail
 */
func GetTableComments(table string) (*map[string]string, error) {
	o := orm.NewOrm()

	var maps []orm.Params
	_, err := o.Raw("SELECT field, comments FROM field_table WHERE table_name = ?", table).Values(&maps)

	fieldCommentsPair := map[string]string{}
	if len(maps) != 0 {
		for _, v := range maps{
			field := v["field"].(string)
			comments := v["comments"].(string)
			fieldCommentsPair[field] = comments
		}
	}
	return &fieldCommentsPair, err
}

func GetStatisticsInfo() (*map[string]int64, error) {
	o := orm.NewOrm()

	tableCnt, _ := o.QueryTable("index_table").Limit(-1).Distinct().Count()
	return &map[string]int64{
		"table_count": tableCnt,
		"data_item_count": 32127,
	}, nil
}

