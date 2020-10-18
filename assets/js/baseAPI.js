// 每次调用 $.get() 或 $.post() 或 $.ajax() 时，先调用 ajaxPrefilter 函数，在这个函数中，可以拿到我们给Ajax提供的配置对象
$.ajaxPrefilter(function(options) {
    // 发起 ajxa 请求之前，同意拼接字符串
    options.url = 'http://ajax.frontend.itheima.net' + options.url
})