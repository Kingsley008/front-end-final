var templateLogin = '\n' +
    '    <div class="m-modal container">\n' +
    '        <div class="m-modal middle"></div><div class="m-modal wrap">\n' +
    '            <h3>登录网易云课堂</h3>\n' +
    '        <button class="f-h" id="close"></button>\n' +
    '        <label for="close"></label>\n' +
    '            <form  name="loginform" action="http://study.163.com /webDev/login.htm">\n' +
    '                <p><input name="username" placeholder="帐号"></p>\n' +
    '                <p><input name="password" type="password" placeholder="密码"></p>\n' +
    '                <p><button name="login" class="m-modal login" type="submit">登 入</button></p>\n' +
    '            </form>\n'
'        </div>\n' +
'    </div>'

function node2html(templateLogin) {
    var container = document.createElement('div');
    container.innerHTML = templateLogin;
    return container.children[0];
}

function LoginModal(options) {
    var options = options || {};
    this.closeBtn = Compatible.getElementsByClassName(this._layout, 'f-h')[0];
    this.loginBtn = Compatible.getElementsByClassName(this._layout, 'login')[0];

    /*  this.userName = Compatible.getElementsByTagName('input')[0].value;
      this.password = md5 (Compatible.getElementsByClassName('input')[1].value);*/

}

LoginModal.prototype = (function () {
    var layout = node2html(templateLogin).cloneNode(true);


    return {
        _layout: layout,
        close: function (Container, callback) {
            /*  this._layout.className = (this._layout.className) + " f-h";*/
            Container.removeChild(this._layout);
            callback && callback();
        },
        show: function (Container) {
            Container.appendChild(this._layout);
        },
        closecall: function (callback) {
            Compatible.addEvent(this.closeBtn, 'click', function () {
                this.close(callback);
            }.bind(LoginModal.prototype), false)
        }
    }
})()


var tempVideo = '   <div class="m-modal container">\n' +
    '         <div class="video container">\n' +
    '            <div class="m-modal middle"></div>\n' +
    '             <div class="m-modal video">\n' +
    '             <h3>请观看下面的视频</h3>\n' +
    '            <button class="f-h" id="closeVideo"></button>\n' +
    '            <label for="closeVideo"></label>\n' +
    '            <video class="m-modal video" controls>\n' +
    '                <source src="http://mov.bn.netease.com/open-movie/nos/mp4/2014/12/30/SADQ86F5S_shd.mp4">\n' +
    '                Your browser does not support the video tag.\n' +
    '            </video>\n' +
    '             </div>\n' +
    '         </div>\n' +
    '    </div>'

function Video() {
    this.closeBtn = Compatible.getElementsByClassName(this._layout, 'f-h')[0];
}

Video.prototype = (function () {
    return {
        _layout: node2html(tempVideo).cloneNode(true),

        show: function (container) {
            container.appendChild(this._layout);
        },
        close: function (container) {
            console.log("click");
            container.removeChild(this._layout);
        }
    }
})()

