// 每次调用 $.get() 或 $.post() 或 $.ajax() 时，先调用 ajaxPrefilter 函数，在这个函数中，可以拿到我们给Ajax提供的配置对象
$.ajaxPrefilter(function (options) {
    // 发起 ajxa 请求之前，同意拼接字符串
    options.url = 'http://ajax.frontend.itheima.net' + options.url
    // 统一为需要权限的接口设置 headers 
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }
    // 全局统一挂载 complete 回调函数
    options.complete = function (res) {
        // 可以使用 res.responseJSON 拿到服务器响应回来的数据
        // console.log(res)
        if (res.responseJSON.status == 1 && res.responseJSON.message == '身份认证失败！') {
            // 1.清空 token
            localStorage.removeItem('token')
            // 2.跳转回 login
            location.href = '/login.html'
        }
    }
})