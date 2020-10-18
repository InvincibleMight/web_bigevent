$(function() {
    // 点击“去注册”的按钮，实现跳转
    $('#link_reg').on('click', function() {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    // 点击“去登陆”的按钮，实现跳转
    $('#link_login').on('click', function() {
        $('.login-box').show()
        $('.reg-box').hide()
    })
    
    // 从 layui 中获取 form 对象,获取 layer 对象
    var form = layui.form
    var layer = layui.layer

    // 通过 form.verify() 函数定自定义校验规则
    form.verify({
        // 自定义的密码校验规则
        pwd: [
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
        ],
        // 自定义密码是否一致的校验规则
        repwd: function(value) {
            var pwd = $('.reg-box [name=password]').val()
            if (pwd !== value) return ('两次输入的密码不一致！')
        }
    })
    
    // 监听注册表单的提交事件
    $('#form_reg').on('submit', function(e) {
        e.preventDefault()
        var data = { username: $('#form_reg [name=username]').val(), password: $('#form_reg [name=password]').val() }
        $.post('/api/reguser', data, function(res) {
            if (res.status !== 0) return layer.msg(res.message);
            layer.msg('注册成功,请登录！')
            // 模拟点击，注册成功后前往登陆界面
            $('#link_login').click()
        })
    })

    // 监听登陆表单的提交事件
    $('#form_login').on('submit', function(e) {
        // 阻止默认提交行为
        e.preventDefault()
        $.ajax({
            method: "POST",
            url: "/api/login",
            // 快速获取表单中的数据
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) return layer.msg('登陆失败！')
                layer.msg('登陆成功！')
                // 将登陆成功得到的 tokon 字符串，保存到 localStorage 中
                localStorage.setItem('token', res.token)
                // 跳转到后台主页
                location.href = '/index.html'
            }
        });
    })
})