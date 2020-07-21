const formatTime = date => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()

    return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
    n = n.toString()
    return n[1] ? n : '0' + n
}

//时间格式转换
const audioTimeStep = (currentTime) => {
    if (currentTime < 60) { //说明是个位数
        if (currentTime < 10) {
            currentTime = '00:0' + currentTime;
        } else {
            currentTime = '00:' + currentTime;
        }

    } else if (currentTime >= 60) {
        let fen = parseInt(currentTime / 60);
        (fen < 10) && (fen = '0' + fen);
        let miao = currentTime % 60;
        (miao < 10) && (miao = '0' + miao);
        currentTime = fen + ':' + miao
    }
    return currentTime;
};

const requestTime = () => {
    var myDate = new Date();
    var year = myDate.getFullYear();
    var month = parseInt(myDate.getMonth() + 1) > 9 ? parseInt(myDate.getMonth() + 1) : "0" + parseInt(myDate.getMonth() + 1);
    var day = parseInt(myDate.getDate()) > 9 ? parseInt(myDate.getDate()) : "0" + parseInt(myDate.getDate());

    var hour = parseInt(myDate.getHours()) > 9 ? parseInt(myDate.getHours()) : "0" + parseInt(myDate.getHours());
    var minute = parseInt(myDate.getMinutes()) > 9 ? parseInt(myDate.getMinutes()) : "0" + parseInt(myDate.getMinutes());
    var second = ((parseInt(myDate.getSeconds()) > 9 ? "" + parseInt(myDate.getSeconds()) : "0" + parseInt(myDate.getSeconds()))) + "0";

    var rand = "";
    for (var i = 0; i < 5; i++) {
        var r = Math.floor(Math.random() * 10);
        rand += r;
    }
    return "" + year + "" + month + "" + day + "" + hour + "" + minute + "" + second + "" + rand;
}

const getUUID = () => {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx_xxxx_4xxx_yxxx_xxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
}
const getImgPadding = () => {
    let padding = 32; //750设计图下尺寸
    let windowwidth = wx.getSystemInfoSync().windowWidth;
    padding = windowwidth * padding / 375;
    return padding;
}
const againGroup = (data, num) => { //数组分类
    let result = [];
    for (let i = 0, len = data.length; i < len; i += num) {
        result.push(data.slice(i, i + num));
    }
    return result;

}
const seckillTime = (timeStamp, that) => {
    let interval = null,
        totalSecond = timeStamp - Date.parse(new Date()) / 1000;
    interval = setInterval(function() {
        // 秒数  
        let second = totalSecond;
        // 小时位  
        let hr = Math.floor(second / 3600);
        let hrStr = hr.toString();
        if (hrStr.length == 1) hrStr = '0' + hrStr;
        // 分钟位  
        let min = Math.floor((second - hr * 3600) / 60);
        let minStr = min.toString();
        if (minStr.length == 1) minStr = '0' + minStr;
        // 秒位  
        let sec = second - hr * 3600 - min * 60;
        let secStr = sec.toString();
        if (secStr.length == 1) secStr = '0' + secStr;
        that.setData({
            countDownHour: hrStr,
            countDownMinute: minStr,
            countDownSecond: secStr,
        });
        totalSecond--;
        if (totalSecond <= 0) {
            clearInterval(interval);
            wx.showToast({
                title: '活动已结束',
                icon: 'none',
                duration: 1000,
                mask: true,
            })
            that.setData({
                countDownHour: '00',
                countDownMinute: '00',
                countDownSecond: '00',
                timeEnd: true,
            });
        }
    }.bind(that), 1000);
    that.setData({
        interval: interval
    });
}
const getUrlParams = (param, k, p) => {
    if (typeof param != 'string') return {};
    k = k ? k : '&'; //整体参数分隔符
    p = p ? p : '='; //单个参数分隔符
    var value = {};
    if (param.indexOf(k) !== -1) {
        param = param.split(k);
        for (var val in param) {
            if (param[val].indexOf(p) !== -1) {
                var item = param[val].split(p);
                value[item[0]] = item[1];
            }
        }
    } else {
        var item = param.split(p);
        value[item[0]] = item[1];
    }
    return value;
}
//绘图
const drawImg = (info, logo, headIcon, code, that) => {
    // console.log(headIcon)
    // console.log(code)

    let title = info.store_name; //商品名
    let price = '￥' + info.price; //价格

    let w = 0;
    wx.getSystemInfo({
        success: function(res) {
            w = res.screenWidth;
        },
    })

    let ctx = wx.createCanvasContext('shareFrends');
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, w / 750 * 600 * 2, w / 750 * 840 * 2);

    if (title.length > 17) {
        title = title.slice(0, 15) + '...';
    }

    //绘制logo
    // ctx.drawImage('../../public/images/1.jpg', 0, 0, w/750*670*2, w/750*380*2)
    // ctx.drawImage(logo, w / 750 * 180 * 2, 0, w / 750 * 294 * 2, w / 750 * 160 * 2, 0, 0)
    ctx.drawImage(headIcon, w / 750 * 80 * 2, w / 750 * 20 * 2, w / 750 * 430 * 2, w / 750 * 360 * 2, 0, 0)

    //绘制标题
    ctx.setFontSize(w / 750 * 28 * 2)
    ctx.setFillStyle('#333333') //文字颜色
    ctx.fillText(title, w / 750 * 80 * 2, w / 750 * 420 * 2, 500)
    ctx.font = "30px Verdana";
    ctx.restore() //恢复之前保存的绘图上下文

    ctx.setFontSize(w / 750 * 30 * 2)
    ctx.setFillStyle('#f52528');
    //绘制文本
    ctx.fillText(price, w / 750 * 80 * 2, w / 750 * 460 * 2)

    //绘制线条
    ctx.moveTo(w / 750 * 80 * 2, w / 750 * 480 * 2);
    ctx.lineTo(w / 750 * 526 * 2, w / 750 * 480 * 2);
    ctx.setLineWidth = 1;
    ctx.setStrokeStyle('#eeeeee')
    ctx.stroke();

    //绘制二维码
    ctx.drawImage(code, w / 750 * 80 * 2, w / 750 * 504 * 2, w / 750 * 200 * 2, w / 750 * 180 * 2);
    ctx.setFontSize(w / 750 * 22 * 2)
    ctx.setFillStyle('#1a1a1a');
    //绘制文本
    ctx.fillText('长按识别小程序二维码', w / 750 * 320 * 2, w / 750 * 585 * 2)
    ctx.setFontSize(w / 750 * 20 * 2)
    ctx.setFillStyle('#666666');
    //绘制文本
    ctx.fillText('立即抢购', w / 750 * 390 * 2, w / 750 * 620 * 2)

    ctx.draw(false, () => {
        //调用接口将画布转换为图片
        wx.canvasToTempFilePath({
            x: 0,
            y: 0,
            fileType: 'jpg',
            quality: 1,
            width: w / 750 * 600 * 2,
            height: w / 750 * 840 * 2,
            destWidth: w / 750 * 600 * 2,
            destHeight: w / 750 * 840 * 2,
            canvasId: 'shareFrends',
            success: res => {

                wx.hideToast();

                that.setData({
                    sharePicUrl: res.tempFilePath //生成的图片路径
                }, () => {

                    //渲染完后再显示分享海报
                    that.setData({
                        share: false,
                        showSharePic: true,
                        actionSheetHidden: !that.data.actionSheetHidden
                    })

                })
            },
            fail(err) {
                wx.showToast({
                    title: '图片生成失败，请稍候再试！',
                    icon: 'none',
                    mask: true
                })
            }
        })
    });

}
module.exports = {
    formatTime: formatTime,
    audioTimeStep: audioTimeStep,
    requestTime: requestTime,
    getUUID: getUUID,
    getImgPadding: getImgPadding,
    againGroup: againGroup,
    seckillTime: seckillTime,
    getUrlParams: getUrlParams,
    drawImg: drawImg
}