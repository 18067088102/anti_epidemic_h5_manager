// 生产
let HOST_SERVER = 'http://220.180.36.31:30000/p/adm/api';
// let HOST_SERVER = BASE_URL + '/auth';
// let HOST_SERVER2 = BASE_URL + '/archives';
// let HOST_SERVER3 = BASE_URL + '/notification';
// let HOST_SERVER4 = BASE_URL + '/estate';

// 本地测试
// let HOST_SERVER = 'http://192.168.8.169:8080/api';

let api = { //共个接口
    getInfoRecordListUrl: HOST_SERVER + "/biz/person/page",  //查询人员分页列表接口
	addInfoRecordUrl: HOST_SERVER + "/biz/person/save",
	updateInfoRecordUrl: HOST_SERVER + "/biz/person/update",
	getInfoRecordDetailUrl: HOST_SERVER + "/biz/person/info",
	getReportListUrl: HOST_SERVER + "/biz/report/page",
	getReportDetailUrl: HOST_SERVER + "/biz/report/info",
	getProvinceListUrl: HOST_SERVER + "/biz/area/list",
    getRiskLevelUrl: HOST_SERVER + "/biz/riskArea/list", 
	loginUrl: HOST_SERVER + "/login/passwd", //登录接口
	getMessageListUrl: HOST_SERVER + "/biz/preventNotice/page",
	uploadImageUrl: HOST_SERVER + '/upload', //上传图片
	viewImgaeUrl: HOST_SERVER + '/view', //拼接图片完整地址
}

module.exports = api;
