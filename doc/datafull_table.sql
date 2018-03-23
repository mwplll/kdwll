-- 命名为datafull数据库
USE `datafull`;

-- --------------------------------------------------------
-- 索引表 从关键key到表名的关系表
CREATE TABLE IF NOT EXISTS `index_table` (
  `index_id` int(16) NOT NULL AUTO_INCREMENT COMMENT 'index_id',
  `key` char(128) DEFAULT '' NOT NULL COMMENT '关键词',
  `table` char(64) DEFAULT '' NOT NULL COMMENT '表名',
  `remark` varchar(256) DEFAULT '' COMMENT '备注',
  `source` varchar(256) DEFAULT '' COMMENT '来源',
  `create_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`index_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='index_table' AUTO_INCREMENT=1;


-- --------------------------------------------------------
-- 字段表 从字段到注释的映射表
CREATE TABLE IF NOT EXISTS `field_table` (
  `field_id` int(16) NOT NULL AUTO_INCREMENT COMMENT '字段表全局id',
  `table_name` char(64) DEFAULT '' NOT NULL COMMENT '表名',
  `field` varchar(128) DEFAULT '' COMMENT '字段名称',
  `comments` varchar(256) DEFAULT '' COMMENT '字段注释',
  PRIMARY KEY (`field_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='field_table' AUTO_INCREMENT=1;


-- 表的结构 `bank table`
-- name 和 phone_number 非空
CREATE TABLE IF NOT EXISTS `30446_bank` (
  `bank_id` int(16) NOT NULL AUTO_INCREMENT COMMENT 'bank_id',
  `bankcard_num` char(128) DEFAULT '' COMMENT '银行卡号',
  `card_type` char(16) DEFAULT '' COMMENT '银行卡类别',
  `deposit_type` char(16) DEFAULT '' COMMENT '存款类型',
  `balance` float(18,2) unsigned DEFAULT 0.00 COMMENT '余额（元）',
  `saving_type` char(16) DEFAULT '' COMMENT '储蓄类型',
  `term` char(6) DEFAULT '' COMMENT '期限 X年',
  `settlement` float(18,2) unsigned DEFAULT 0.00 COMMENT '结息（元）',
  `state` char(4) DEFAULT '' COMMENT '状态，正常，冻结',
  `onlinepayment` char(6) DEFAULT '' COMMENT '网上支付，开通，未开通',
  `name` char(32) DEFAULT '' NOT NULL COMMENT '姓名',
  `idcardno` char(32) DEFAULT '' COMMENT '身份证号码',
  `phone_number` char(32) DEFAULT '' NOT NULL COMMENT '电话',
  `address` varchar(128) DEFAULT '' COMMENT '地址',
  `time` datetime DEFAULT '1000-01-01 00:00:00' COMMENT '日期',
  `remark` varchar(256) DEFAULT '' COMMENT '备注',
  `openingbank` char(40) DEFAULT '' COMMENT '开户行',
  `id_type` char(32) DEFAULT '' COMMENT '证件类型',
  PRIMARY KEY (`bank_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='bank table' AUTO_INCREMENT=1;


-- 表的结构 `car table`
-- name 和 phone_number 非空

CREATE TABLE IF NOT EXISTS `31211_car` (
  `car_id` int(16) NOT NULL AUTO_INCREMENT COMMENT 'car_id',
  `moto_type` char(40) DEFAULT '' COMMENT '车型',
  `plate_number` char(32) DEFAULT '' COMMENT '车牌号',
  `brand` char(40) DEFAULT '' COMMENT '品牌',
  `brandE` char(40) DEFAULT '' COMMENT '品牌英文',
  `VIN` char(32) DEFAULT '' COMMENT '车架号',
  `name` char(32) DEFAULT '' NOT NULL COMMENT '姓名',
  `phone_number` char(32) DEFAULT '' NOT NULL COMMENT '电话',
  `address` varchar(128) DEFAULT '' COMMENT '地址',
  `time` datetime DEFAULT '1000-01-01 00:00:00' COMMENT '日期',
  PRIMARY KEY (`car_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='car table' AUTO_INCREMENT=1;

-- 表的结构 `personalinf_comp table`
-- name 和 phone_number 非空

CREATE TABLE IF NOT EXISTS `31211_personalinf_comp` (
  `personalinf_comp_id` int(16) NOT NULL AUTO_INCREMENT COMMENT 'personalinf_comp_id',
  `company` varchar(128) DEFAULT '' COMMENT '单位',
  `name` char(32) DEFAULT '' NOT NULL COMMENT '姓名',
  `phone_number` char(32) DEFAULT '' NOT NULL COMMENT '电话',
  PRIMARY KEY (`personalinf_comp_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='personalinf_comp table' AUTO_INCREMENT=1;

-- 表的结构 `personalinf_room table`
-- name 和 idcardno 和 phone_number 非空

CREATE TABLE IF NOT EXISTS `51055_personalinf_room` (
  `personalinf_room_id` int(16) NOT NULL AUTO_INCREMENT COMMENT 'personalinf_room_id',
  `room_number` char(32) DEFAULT '' COMMENT '房号 紫金花园',
  `name` char(32) DEFAULT '' NOT NULL COMMENT '姓名',
  `idcardno` char(32) DEFAULT '' NOT NULL COMMENT '身份证号码',
  `address` varchar(128) DEFAULT '' COMMENT '地址',
  `phone_number` char(32) DEFAULT '' NOT NULL COMMENT '电话',
  PRIMARY KEY (`personalinf_room_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='personalinf_room table' AUTO_INCREMENT=1;

-- 表的结构 `email table`
-- 使用 email 索引查找

CREATE TABLE IF NOT EXISTS `70466_email` (
  `email_id` int(16) NOT NULL AUTO_INCREMENT COMMENT 'email_id',
  `email` char(40) DEFAULT '' NOT NULL COMMENT 'email邮箱',
  `password` char(40) DEFAULT '' COMMENT 'password',
  `tie_on_card` char(8) DEFAULT '' COMMENT '有无绑卡，有绑卡c，无绑卡',
  `name` char(32) DEFAULT '' COMMENT '姓名',
  `address` varchar(128) DEFAULT '' COMMENT '地址',
  `city` char(40) DEFAULT '' COMMENT '城市',
  `cityE` char(40) DEFAULT '' COMMENT '城市英文',
  `zip_code` char(32) DEFAULT '' COMMENT '邮编',
  `phone_number` char(32) DEFAULT '' COMMENT '电话',
  `nickname` char(40) DEFAULT '' COMMENT '用户名',
  PRIMARY KEY (`email_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='email table' AUTO_INCREMENT=1;

-- 表的结构 `order table`
-- 使用 consignee_name 和 phone_number 索引查找

CREATE TABLE IF NOT EXISTS `40007_order` (
  `order_id` int(16) NOT NULL AUTO_INCREMENT COMMENT 'order_id',
  `order_number` char(32) DEFAULT '' COMMENT '订单编号',
  `buyer_member_id` char(40) DEFAULT '' COMMENT '买家会员名',
  `buyer_alipay_no` char(40) DEFAULT '' COMMENT '买家支付宝账号',
  `due` float(18,2) unsigned DEFAULT 0.00 COMMENT '买家应付货款',
  `postage` float(18,2) unsigned DEFAULT 0.00 COMMENT '买家应付邮费',
  `integral_for_pay` int unsigned DEFAULT 0 COMMENT '买家支付积分',
  `total_amount` float(18,2) unsigned DEFAULT 0.00 COMMENT '总金额',
  `rebate` int unsigned DEFAULT 0 COMMENT '返点积分',
  `act_pay` float(18,2) unsigned DEFAULT 0.00 COMMENT '买家实际支付金额',
  `act_pay_integral` int unsigned DEFAULT 0 COMMENT '买家实际支付积分',
  `order_state` char(32) DEFAULT '' COMMENT '订单状态',
  `message` varchar(256) DEFAULT '' COMMENT '买家留言',
  `name` char(32) DEFAULT '' NOT NULL COMMENT '收货人姓名',
  `address` varchar(128) DEFAULT '' COMMENT '地址',
  `tran_mode` char(32) DEFAULT '' COMMENT '运送方式',
  `telephone` char(32) DEFAULT '' COMMENT '固定电话',
  `phone_number` char(32) DEFAULT '' NOT NULL COMMENT '手机',
  `order_create_time` datetime DEFAULT '1000-01-01 00:00:00' COMMENT '订单创建时间',
  `order_pay_time` datetime DEFAULT '1000-01-01 00:00:00' COMMENT '订单付款时间',
  `title` varchar(128) DEFAULT '' COMMENT '宝贝标题',
  `type` smallint unsigned DEFAULT 0 COMMENT '宝贝种类',
  `logistic_number` char(32) DEFAULT '' COMMENT '物流单号',
  `logistic_company` char(32) DEFAULT '' COMMENT '物流公司',
  `remark` varchar(128) DEFAULT '' COMMENT '订单备注',
  `total_number` smallint unsigned DEFAULT 0 COMMENT '宝贝总数量',
  `shop_id` char(32) DEFAULT '' COMMENT '店铺id',
  `shop_name` char(40) DEFAULT '' COMMENT '店铺名称',
  `closure_cause` char(40) DEFAULT '' COMMENT '订单关闭原因',
  `phone_order` char(8) DEFAULT '' NOT NULL COMMENT '是否手机订单',
  `upload_contract_photo` char(2) DEFAULT '' COMMENT '是否上传合同照片，是，否',
  `upload_ticket` char(2) DEFAULT '' COMMENT '是否上传小票，是，否',
  `another_pay` char(2) DEFAULT '' COMMENT '是否代付，是，否',
  `modified_sku` varchar(128) DEFAULT '' COMMENT '修改后的sku',
  `modified_add` varchar(128) DEFAULT '' COMMENT '修改后的收货地址',
  `collection_deduction` int unsigned DEFAULT 0 COMMENT '集分宝抵扣',
  `refund_amount` float(18,2) unsigned DEFAULT 0.00 COMMENT '退款金额',
  PRIMARY KEY (`order_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='order table' AUTO_INCREMENT=1;

-- 表的结构 `house_contract table`
-- 使用 idcardno phone_number name 索引查找

CREATE TABLE IF NOT EXISTS `10117_house_contract` (
  `house_contract_id` int(16) NOT NULL AUTO_INCREMENT COMMENT 'house_contract_id',
  `adm_number` char(32) DEFAULT '' COMMENT '受理编号',
  `contract_number` char(32) DEFAULT '' COMMENT '合同编号',
  `purpose` char(40) DEFAULT '' COMMENT '用途',
  `total_area` float(18,2) unsigned DEFAULT 0.00 COMMENT '合计面积',
  `price` float(18,2) unsigned DEFAULT 0.00 COMMENT '合计金额',
  `sign_time` datetime DEFAULT '1000-01-01 00:00:00' COMMENT'新建时间/合同签订时间',
  `record_time` datetime DEFAULT '1000-01-01 00:00:00' COMMENT '备案时间',
  `revo_time` datetime DEFAULT '1000-01-01 00:00:00' COMMENT '撤销时间',
  `chg_time` datetime DEFAULT '1000-01-01 00:00:00' COMMENT '变更时间',
  `contract_version` char(32) DEFAULT '' COMMENT '合同版本',
  `name` char(32) DEFAULT '' NOT NULL COMMENT '购房人姓名',
  `id_type` char(32) DEFAULT '' COMMENT '证件类型',
  `idcardno` char(32) DEFAULT '' NOT NULL COMMENT '身份证号',
  `address` varchar(128) DEFAULT '' COMMENT '买受人联系地址',
  `phone_number` char(32) DEFAULT '' NOT NULL COMMENT '电话',
  `zone` char(40) DEFAULT '' COMMENT '区属',
  `position` char(40) DEFAULT '' COMMENT '位置',
  `project` varchar(128) DEFAULT '' COMMENT '项目名称',
  `sale_number` char(32) DEFAULT '' COMMENT '预（销）售证号',
  `dev_company` varchar(128) DEFAULT '' COMMENT '开发公司名称',
  PRIMARY KEY (`house_contract_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='house_contract table' AUTO_INCREMENT=1;

-- 表的结构 `qq table`
-- 使用 qq 索引查找

CREATE TABLE IF NOT EXISTS `10489_qq` (
  `qq_id` int(16) NOT NULL AUTO_INCREMENT COMMENT 'qq_id',
  `qq` char(32) DEFAULT '' NOT NULL COMMENT 'qq号码',
  `password` char(40) DEFAULT '' COMMENT 'password',
  `id_type` char(32) DEFAULT '' COMMENT '证件类型',
  `idcardno` char(32) DEFAULT '' COMMENT '证件号码',
  `name` char(32) DEFAULT '' COMMENT '姓名',
  `historical_pass1` char(32) DEFAULT '' COMMENT '历史密码1',
  `historical_pass2` char(32) DEFAULT '' COMMENT '历史密码2',
  `historical_pass3` char(32) DEFAULT '' COMMENT '历史密码3',
  `phone_number` char(32) DEFAULT '' COMMENT '电话',
  `email` char(40) DEFAULT '' COMMENT 'email邮箱',
  `email_password` char(40) DEFAULT '' COMMENT 'email password',
  `prot_que_1` varchar(80) DEFAULT '' COMMENT '保护问题1',
  `prot_anw_1` varchar(80) DEFAULT '' COMMENT '保护回答1',
  `prot_que_2` varchar(80) DEFAULT '' COMMENT '保护问题2',
  `prot_anw_2` varchar(80) DEFAULT '' COMMENT '保护回答2',
  `prot_que_3` varchar(80) DEFAULT '' COMMENT '保护问题3',
  `prot_anw_3` varchar(80) DEFAULT '' COMMENT '保护回答3',
  `another_qq` char(32) DEFAULT '' COMMENT '另一个qq号码',
  `password2` char(32) DEFAULT '' COMMENT 'password2',
  `fill_time` datetime DEFAULT '1000-01-01 00:00:00' COMMENT '填写时间',
  PRIMARY KEY (`qq_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='qq table' AUTO_INCREMENT=1;
