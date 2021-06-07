/**
 * 时间戳格式转换以及计算
 * */
export function formatTime (time = 0, format = 'YYYY-MM-DD hh:mm:ss') {

    const now = new Date().getTime()
  
    if (!time) time = now
  
    while (time.toString().length < 13) time += '0'
  
    const date = new Date(time)
  
    date.getMonth()
    /** 参数集 年-月-日 时:分:秒 */
    const arg = {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
      hours: date.getHours(),
      minutes: date.getMinutes(),
      seconds: date.getSeconds()
    }
  
    /** 判断有没有指定的时间格式 */
    switch (format) {
      case 'YYYY-MM-DD hh:mm:ss':
        return `${arg.year}-${arg.month}-${arg.day} ${arg.hours}:${arg.minutes}:${arg.seconds}`
      case 'YYYY-MM-DD':
        return `${arg.year}-${arg.month}-${arg.day}`
      case 'MM-DD':
        return `${arg.month}-${arg.day}`
      case 'hh:mm:ss':
        return `${arg.hours}:${arg.minutes}:${arg.seconds}`
      case 'hh:mm':
        return `${arg.hours}:${arg.minutes}`
      case 'computed':			//判断是不是需要进行计算
        if (now > time) {
          const dt = Math.abs(time - now),    //时间已过去多少毫秒
            S = dt / 1000,    //秒
            M = S / 60,  //分
            H = M / 60,  //小时
            D = H / 24,   //天
            W = D / 7    //周
  
         /**
              ~~ ==>表示取整数部分 类似与 parseInt
          */
          if (~~W > 0 && W < 3) {
            return ~~W + '周前'
          } else if (D < 7 && ~~D > 0) {
            return ~~D + '天前'
          } else if (~~H > 0 && H < 24) {
            return ~~H + '小时前'
          } else if (~~M > 0 && M < 60) {
            return ~~M + '分钟前'
          } else if (~~S > 0 && S < 60) {
            return ~~S + '秒前'
          }
        } else {
          console.log('未来的时间')
        }
        return `${arg.year}-${arg.month}-${arg.day} ${arg.hours}:${arg.minutes}:${arg.seconds}`
    }
  }
  