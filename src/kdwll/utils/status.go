/* Copyright 2017 Baidu Inc. All Rights Reserved. */
/* status.go - project status const define. */
/*
 * modification history
 * --------------------
 *  2017/6/30, by Mao Weipeng<maoweipeng@baidu.com>, create
 *
 * DESCRIPTION
 *  This file defines this project's util consts and structs.
*/
package utils

// define api response status
const (
	STATUS_OK = 100
	STATUS_BAD_REQUEST = 101
	STATUS_NO_AUTH = 102
	STATUS_DATABASE_ERROR = 103
	STATUS_SYSTEM_ERROR = 104
	STATUS_TIMEOUT = 105

	MSG_OK = "OK"
)

type Response struct {
	Code    int `json:"code"`
	Message string `json:"message"`
	Data    interface{} `json:"data"`
}


