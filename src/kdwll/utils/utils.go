/* Copyright 2017 Baidu Inc. All Rights Reserved. */
/* utils.go - project util functions define. */
/*
 * modification history
 * --------------------
 *  2017/6/30, by Mao Weipeng<maoweipeng@baidu.com>, create
 *
 * DESCRIPTION
 *  This file defines this project's util functions.
*/
package utils

import (
	"os"
)

/*
* IsFileExist - check file exist
*
* PARAMS:
*   - filename: file name
*
* RETURNS:
*   - bool: true if file exist, false if not exist
*
 */
func IsFileExist(filename string) bool {
	_, err := os.Stat(filename)
	return err == nil || os.IsExist(err)
}
