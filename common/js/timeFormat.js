export function format(timestamp) {
	var time = new Date(timestamp * 1000);
	var year = time.getFullYear();
	var month = time.getMonth() + 1;
	var date = time.getDate();
	// return year+'-'+add0(month)+'-'+add0(date)+' '+add0(hours)+':'+add0(minutes)+':'+add0(seconds);
	return year + '.' + add0(month) + '.' + add0(date);
}
export function format2(timestamp) {
	var time = new Date(timestamp * 1000);
	var year = time.getFullYear();
	var month = time.getMonth() + 1;
	var date = time.getDate();
	var hours = time.getHours();
	var minutes = time.getMinutes();
	var seconds = time.getSeconds();
	// return year+'-'+add0(month)+'-'+add0(date)+' '+add0(hours)+':'+add0(minutes)+':'+add0(seconds);
	return year + '.' + add0(month) + '.' + add0(date);
}
export function format4(timestamp) {
	timestamp = timestamp.replace(new RegExp(/-/gm), "/");
	var time = new Date(timestamp);
	var year = time.getFullYear();
	var month = time.getMonth() + 1;
	var date = time.getDate();
	var hours = time.getHours();
	var minutes = time.getMinutes();
	var seconds = time.getSeconds();
	// return year+'-'+add0(month)+'-'+add0(date)+' '+add0(hours)+':'+add0(minutes)+':'+add0(seconds);
	return year + '-' + add0(month) + '-' + add0(date);
}
export function format5(timestamp) {
	if (!timestamp) {
		return false;
	}
	timestamp = timestamp.replace(new RegExp(/-/gm), "/");
	var time = new Date(timestamp);
	var year = time.getFullYear();
	var month = time.getMonth() + 1;
	var date = time.getDate();
	var hours = time.getHours();
	var minutes = time.getMinutes();
	var seconds = time.getSeconds();
	// return year+'-'+add0(month)+'-'+add0(date)+' '+add0(hours)+':'+add0(minutes)+':'+add0(seconds);
	return add0(month) + '-' + add0(date) + ' ' + add0(hours) + ':' + add0(minutes);
}
export function format6(timestamp) {
	if (!timestamp) {
		return false;
	}
	timestamp = timestamp.replace(new RegExp(/-/gm), "/");
	var time = new Date(timestamp);
	var year = time.getFullYear();
	var month = time.getMonth() + 1;
	var date = time.getDate();
	var hours = time.getHours();
	var minutes = time.getMinutes();
	var seconds = time.getSeconds();
	// return year+'-'+add0(month)+'-'+add0(date)+' '+add0(hours)+':'+add0(minutes)+':'+add0(seconds);
	return add0(hours) + ':' + add0(minutes);
}

export function format1(timestamp) {
	// var time = new Date(timestamp*1000);
	var time = new Date(timestamp);
	var year = time.getFullYear();
	var month = time.getMonth() + 1;
	var date = time.getDate();
	var hours = time.getHours();
	var minutes = time.getMinutes();
	var seconds = time.getSeconds();
	return year + '-' + add0(month) + '-' + add0(date) + ' ' + add0(hours) + ':' + add0(minutes) + ':' + add0(seconds);
	//return year+'-'+add0(month)+'-'+add0(date);
}

function add0(m) {
	return m < 10 ? '0' + m : m
}
export function format3(time) {
	var time = new Date(time);
	var year = time.getFullYear();
	var month = time.getMonth() + 1;
	var date = time.getDate();
	var hours = time.getHours();
	var minutes = time.getMinutes();
	var seconds = time.getSeconds();
	return year + '.' + add0(month) + '.' + add0(date) + ' ' + add0(hours) + ':' + add0(minutes)
	// return year + '-' + add0(month) + '-' + add0(date) + ' ' + add0(hours) + ':' + add0(minutes) + ':' + add0(seconds);
	//return year+'-'+add0(month)+'-'+add0(date);
}

var weekday = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
export function formatCourseTime(startTime, endTime) {
	var time = new Date(startTime * 1000);
	var year = time.getFullYear();
	var month = time.getMonth() + 1;
	var date = time.getDate();
	var hours = time.getHours();
	var minutes = time.getMinutes();
	var d = time.getDay();
	// return year+'-'+add0(month)+'-'+add0(date)+' '+add0(hours)+':'+add0(minutes)+':'+add0(seconds);
	var endTime = new Date(endTime * 1000);
	var endHours = endTime.getHours();
	var endMinutes = endTime.getMinutes();
	return year + '.' + add0(month) + '.' + add0(date) + ' ' + weekday[d] + ' ' + add0(hours) + ':' + add0(minutes) + '-' +
		add0(endHours) + ':' + add0(endMinutes);
}
