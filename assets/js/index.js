$(function() {
    //调用getUserInfo获取用户基本信息
    getUserInfo()
    var layer = layui.layer
    $('#btnLogout').on('click', function() {
        //提示用户是否确认退出
        layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function(index) {
            //1. 清除本地存储的token
            localStorage.removeItem('token')
                //2. 重新跳转到登录页面
            location.href = '/login.html'
                // 关闭confirm询问框
            layer.close(index);
        });
    })
})

//获取用户的基本信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        //headers就是请求头配置对象
        // 以/api开头的请求路径，不需要访问权限
        // 以/my开头的请求路径，需要在请求头中携带Authorization身份认证字段，才能正常访问成功
        headers: {
            Auththorization: localStorage.getItem('token') || ''
        },
        success: function(res) {
                if (res.status !== 0) {
                    return layui.layer.msg('获取用户信息失败！')
                }
                //调用renderAvatar渲染用户的头像
                renderAvatar(res.data)
            }
            //无论成功还是失败，最终都会调用complete回调函数
            // complete: function(res) {
            //     // console.log('执行complete回调');
            //     // console.log(res);
            //     // 在complete回调函数中，可以使用res.responseJSON 拿到服务器响应回来的数据
            //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            //         //1.强制清空token
            //         localStorage.removeItem('token')
            //             //2.强制跳转到登录页面
            //         location.href = '/login.html'
            //     }
            // }
    })
}
//渲染用户的头像
function renderAvatar(user) {
    //1. 获取用户的名称
    var name = user.nickname || user.username
        //2. 设置欢迎的文本
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
        //3.按需渲染用户的头像
    if (user.user_pic !== null) {
        //3.1 渲染图片头像
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        //3.2 渲染文本头像
        // toUpperCase()此方法用于将字符串转换为大写
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }
}