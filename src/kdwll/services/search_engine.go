package services

import (
	"errors"

	"github.com/astaxie/beego"
	"github.com/astaxie/beego/orm"

	"kdwll/utils"
	"kdwll/models"
	"kdwll/utils/validator"
)

type SearchEngine struct {
	KeyWord     string
	KeyWordType []string
}

type TableInfo struct {
	Table     *models.IndexTable	`json:"table"`
	HitValues []orm.Params			`json:"hit_values"`
}

func (s *SearchEngine)verifyWordType() {
	word := s.KeyWord
	if validator.IsCnMobile(word) {
		s.KeyWordType = append(s.KeyWordType, utils.TYPE_PHONE)
	}
	if validator.IsEmail(word) {
		s.KeyWordType = append(s.KeyWordType, utils.TYPE_EMAIL)
	}
	if validator.IsID(word) {
		s.KeyWordType = append(s.KeyWordType, utils.TYPE_ID)
	}
	if validator.IsQq(word) {
		s.KeyWordType = append(s.KeyWordType, utils.TYPE_QQ)
	}
	if validator.IsPlateNumber(word) {
		s.KeyWordType = append(s.KeyWordType, utils.TYPE_PLATE_NUMBER)
	}
	if validator.IsName(word) {
		s.KeyWordType = append(s.KeyWordType, utils.TYPE_NAME)
	}
}

func (s *SearchEngine)FindHitValues() ([]*TableInfo, error) {
	s.verifyWordType()

	tis := []*TableInfo{}
	if len(s.KeyWordType) == 0 {
		beego.Warn("cannot recognize the key word type!")
		return tis, errors.New("cannot recognize the key word type!")
	}
	beego.Info("key word:" + s.KeyWord + " match data type:")
	beego.Info(s.KeyWordType)
	for _, v := range s.KeyWordType {
		switch v {
		case utils.TYPE_NAME:
			tisInType, err := s.FindHitValuesInType(utils.TYPE_NAME)
			if err != nil {
				return tis, err
			}
			tis = append(tis, tisInType...)
		case utils.TYPE_PHONE:
			tisInType, err := s.FindHitValuesInType(utils.TYPE_NAME)
			if err != nil {
				return tis, err
			}
			tis = append(tis, tisInType...)
		case utils.TYPE_EMAIL:
			tisInType, err := s.FindHitValuesInType(utils.TYPE_EMAIL)
			if err != nil {
				return tis, err
			}
			tis = append(tis, tisInType...)
		case utils.TYPE_ID:
			tisInType, err := s.FindHitValuesInType(utils.TYPE_ID)
			if err != nil {
				return tis, err
			}
			tis = append(tis, tisInType...)
		case utils.TYPE_QQ:
			tisInType, err := s.FindHitValuesInType(utils.TYPE_QQ)
			if err != nil {
				return tis, err
			}
			tis = append(tis, tisInType...)
		case utils.TYPE_PLATE_NUMBER:
			tisInType, err := s.FindHitValuesInType(utils.TYPE_PLATE_NUMBER)
			if err != nil {
				return tis, err
			}
			tis = append(tis, tisInType...)
		default:
			beego.Warn("the key word type not in range of search!")
			return tis, errors.New("the key word type not in range of search!")
		}
	}
	return tis, nil
}


func (s *SearchEngine)FindHitValuesInType(keyWordType string) ([]*TableInfo, error) {
	tis := []*TableInfo{}
	tables, err := models.GetRelatedTables(keyWordType);
	if err != nil {
		return tis, err
	}

	if len(tables) == 0 {
		beego.Warn("tables for searching is null!")
		return tis, errors.New("tables for searching is null!")
	}

	for _, t := range tables {
		hitValues, err := models.GetTableValues(t.Table, s.KeyWord, keyWordType)
		if err != nil || hitValues == nil {
			continue
		}
		ti := &TableInfo{
			Table: t,
			HitValues: hitValues,
		}
		tis = append(tis, ti)
	}
	return tis, nil
}