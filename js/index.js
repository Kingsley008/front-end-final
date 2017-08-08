
    window.onload = function () {
        /* 功能点1 设置提示栏*/
        var noticBtn = util.$('noticeClick');
        var notice = util.$('notice');
        //检查cookie中是否有notice 这个key
        checkCookie(notice,"noticeClicked");
        Compatible.addEvent(noticBtn,"click",function (event) {

            util.setCookie("noticeClicked",1,new Date(2018,1,1),"/");
            notice.className  = notice.className + " f-h";
            console.log(notice.className);
        })

        /* 功能点2 关注以及登录 */
        var guanzhuBtn = util.$('guanzhu');
        var guanzhued = util.$('guanzhued');
        //如果设置了 说明已经登录 隐藏关注按钮 显示 已关注
        checkCookie(guanzhuBtn,"loginSuc",function () {
            guanzhued.className = guanzhued.className.replace("f-h","");
            console.log(guanzhued.className);
        });
        var login = new LoginModal();
        //为关注按钮添加点击事件
        Compatible.addEvent(guanzhuBtn,'click',function () {
            //显示登录窗口控件
            login.show(document.body);
            var form = document.forms.loginform;
            var btn = form['login'];
            var closebtn = login.closeBtn;
            Compatible.addEvent(closebtn,'click',function () {
                login.close(document.body);
            });

            Compatible.addEvent(form,'submit',function (event) {
                event  =  event || window.event;
                if (event.preventDefault){
                    event.preventDefault();
                }
                else{
                    event.returnValue=false;
                }

                var target = event.srcElement ? event.srcElement : event.target;
                var value =target.value;
                var url = form.action; // 服务器地址
                var userName = form['username'];
                var password = md5(form['password']);
                util.ajax({
                    //测试地址
                    url:"login.json",
                    type:"GET",
                    data:{
                        userName:userName,
                        password:password,
                    }
                },function (json) {
                    console.log(json);
                    if(json == 1){
                        util.setCookie("loginSuc",1,new Date(2018,1,1));
                        util.setCookie("followSuc",1,new Date(2018,1,1));
                        login.close(document.body);
                        guanzhuBtn.className = guanzhuBtn.className + " f-h";
                        guanzhued.className =  guanzhued.className.replace("f-h","");
                        console.log(guanzhuBtn.className, guanzhued.className);
                    }
                })
            })
        })

        //video modal
        var videoBtn = util.$('videoBtn');
        var video =  new Video();

        Compatible.addEvent(videoBtn,"click",function () {
            video.show(document.body);
        });
        console.log(video.closeBtn.className);
        Compatible.addEvent(video.closeBtn,"click",function () {
            video.close(document.body);
        });
    }

    function checkCookie(node, keyname,callback) {
        var userCookies = util.getCookie();
        for(var key in userCookies){
            if ( key == keyname){
                node.className  = node.className + " f-h";
                callback&&callback();
            }
        }
    }


// slider 控件使用
    var btns = util.$('btnnum');
    var slider = new Slider({
        url:["http://open.163.com/","http://study.163.com/","http://www.icourse163.org/"],
        pics:["imgs/banner1.jpg","imgs/banner2.jpg","imgs/banner3.jpg"],
        width:"1650px",
        height:"460px",
        btns:btns,
    });
    slider.show(util.$('overflow'));

    Compatible.addEvent(btns,'click',function (event) {
        event  =  event || window.event;
        var target = event.srcElement ? event.srcElement : event.target;
        var num = Compatible.dataset(target).num - 2;
        slider.nav(parseInt( num ));

    })

    var handler =  setInterval( slider._next.bind(slider),5000);

    function clearbtn(btns) {

        for(var i = 0; i < btns.children.length; i++){
            if (btns.children[i].className.indexOf("focus") > -1){
                btns.children[i].className = btns.children[i].className.replace("focus","");
            }
        }
    }

    Compatible.addEvent(slider.wrap,"mouseenter",function () {
        clearInterval(handler);
    })

    Compatible.addEvent(slider.wrap,"mouseleave",function () {
        handler =  setInterval( slider._next.bind(slider),5000);
    })



