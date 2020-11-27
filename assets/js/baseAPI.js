//注意：每次调用$.get()或者$.post()或$.ajax的时候，会先调用ajaxPrefilter这个函数，在这个函数中，可以拿到我们给Ajax提供的配置对象
$.ajaxPrefilter(function(options) {
    console.log(options.url);
    // 再发起真正的Ajax请求之前，统一拼接请求的根路径
    options.url = 'http://ajax.frontend.itheima.net' + options.url

    // 统一为有权限的接口，设置 headers 请求头
    // 以/api开头的请求路径，不需要访问权限
    // 以/my开头的请求路径，是需要访问权限的，需要在请求头中携带Authorization身份认证字段，才能正常访问成功
    //检索字符串中没有，返回-1
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }
    //全局统一挂载complete回调函数
    options.complete = function(res) {
        // console.log('执行complete回调');
        // console.log(res);
        // 在complete回调函数中，可以使用res.responseJSON 拿到服务器响应回来的数据
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            //1.强制清空token
            localStorage.removeItem('token')
                //2.强制跳转到登录页面
            location.href = '/login.html'
        }
    }
})