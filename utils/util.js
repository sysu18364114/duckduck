const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('-')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}

module.exports = {
  formatTime
}


 // 去前后空格  
 function trim(str) {  
  return str.replace(/(^\s*)|(\s*$)/g, "");  
}  
  
// 提示错误信息  
function isError(msg, that) {  
  that.setData({  
    showTopTips: true,  
    errorMsg: msg  
  })  
}  
  
// 清空错误信息  
function clearError(that) {  
  that.setData({  
    showTopTips: false,  
    errorMsg: ""  
  })  
}  

function getDateDiff(dateTimeStamp){
	var minute = 1000 * 60;
	var hour = minute * 60;
	var day = hour * 24;
	var halfamonth = day * 15;
	var month = day * 30;
	var now = new Date().getTime();
	var diffValue = dateTimeStamp - now;
	if(diffValue < 0){return;}
	var monthC =diffValue/month;
	var weekC =diffValue/(7*day);
	var dayC =diffValue/day;
	var hourC =diffValue/hour;
	var minC =diffValue/minute;
  var result = '';
	if(monthC>=1){
		result="" + parseInt(monthC) + "月后";
	}
	else if(weekC>=1){
		result="" + parseInt(weekC) + "周后";
	}
	else if(dayC>=1){
		result=""+ parseInt(dayC) +"天后";
	}
	else if(hourC>=1){
		result=""+ parseInt(hourC) +"小时后";
	}
	else if(minC>=1){
		result=""+ parseInt(minC) +"分钟后";
	}else
	result="刚刚";
	return result;
}

function getDateBiff(dateTimeStamp){
	var minute = 1000 * 60;
	var hour = minute * 60;
	var day = hour * 24;
	var halfamonth = day * 15;
	var month = day * 30;
	var now = new Date().getTime();
	var diffValue = now - dateTimeStamp;
	if(diffValue < 0){return;}
	var monthC =diffValue/month;
	var weekC =diffValue/(7*day);
	var dayC =diffValue/day;
	var hourC =diffValue/hour;
  var minC = diffValue / minute;
  var result = '';
	if(monthC>=1){
		result="" + parseInt(monthC) + "月前";
	}
	else if(weekC>=1){
		result="" + parseInt(weekC) + "周前";
	}
	else if(dayC>=1){
		result=""+ parseInt(dayC) +"天前";
	}
	else if(hourC>=1){
		result=""+ parseInt(hourC) +"小时前";
	}
	else if(minC>=1){
		result=""+ parseInt(minC) +"分钟前";
	}else
	result="刚刚";
	return result;
}

function escape2Html(str) { 
 var arrEntities={'lt':'<','gt':'>','nbsp':' ','amp':'&','quot':'"'}; 
 return str.replace(/&(lt|gt|nbsp|amp|quot);/ig,function(all,t){return arrEntities[t];}); 
} 


module.exports = {
  formatTime: formatTime,
  trim: trim,
  isError: isError,
  clearError: clearError,
  getDateDiff: getDateDiff,
  escape2Html: escape2Html,
  getDateBiff: getDateBiff
}
