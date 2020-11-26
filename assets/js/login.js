$(function() {
    //点击去“注册账号”的链接
    $('#link_reg').on('click', function() {
        $('.login-box').hide()
        $('.reg-box').show()
    })

    //点击“去登录的链接”
    $('#link_login').on('click', function() {
        $('.reg-box').hide()
        $('.login-box').show()
    })
})