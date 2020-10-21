$(function() {
    // 调用获取用户信息的函数
    getUserInfo()

    // 点击注销按钮，实现退出功能
    $('#btnLogout').on('click', function() {
        // 询问用户是否退出
        layer.confirm('确定退出登录?', {icon: 3, title:'提示'}, function(index){
            //do something
            // 清除本地存储中的 token
            localStorage.removeItem('token')
            // 跳转到 login 页面
            location.href = '/login.html'

            layer.close(index);
          });
    })
})

// 获取用户的基本信息
function getUserInfo() {
    $.ajax({
        method: "GET",
        url: "/my/userinfo",
        // 请求头
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function (res) {
            if (res.status !== 0) return layui.layer.msg('获取用户信息失败！')
            // 调用 renderAvatar() 渲染用户头像
            renderAvatar(res.data)
        },
        // // 不论成功或是失败，都会调用 complete 
        // complete: function(res) {
        //     // 可以使用 res.responseJSON 拿到服务器响应回来的数据
        //     // console.log(res)
        //     if (res.responseJSON.status == 1 && res.responseJSON.message == '身份认证失败！') {
        //         // 1.清空 token
        //         localStorage.removeItem('token')
        //         // 2.跳转回 login
        //         location.href = '/login.html'
        //     }
        // }
    })
}

// 渲染用户头像
function renderAvatar(user) {
    // 1. 获取用户名称
    var name = user.nickname || user.username
    // 2.更改欢迎文本
    $('#welcome').html('欢迎&nbsp&nbsp' + name)
    // 3.按需显示用户头像
    if (user.user_pic !== null) {
        // 3.1 渲染图片头像
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        // 3.2 显然文字头像
        $('.layui-nav-img').hide()
        $('.text-avatar').html(name[0].toUpperCase()).show()
    }
}