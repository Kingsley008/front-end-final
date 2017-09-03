var templateslider = '<div class="m-slider wrap">\n' +
    '                <div class="m-slider sliders" style="z-index: 10">\n' +
    '                    \n' +
    '                </div>\n' +
    '                <div class="m-slider sliders">\n' +
    '                   \n' +
    '                </div>\n' +
    '                <div class="m-slider sliders">\n' +
    '                    \n' +
    '                </div>\n' +
    '            </div> '


function Slider(options) {
    this.options = options || {};
    this.sliders = Compatible.getElementsByClassName(this._layout, "sliders");
    this.wrap = this._layout;
    //定义计算偏移的常量
    this.offsetindex = 0;
    //当前 显示的slider
    this.sliderindex = 0;
    this.picnum = 3;

}

Slider.prototype = (function () {

    return {
        _layout: node2html(templateslider).cloneNode(true),
        show: function (container) {
            this.setpics();
            container.appendChild(this._layout);
        },
        setpics: function () {
            for (var i = 0; i < this.sliders.length; i++) {
                var a = document.createElement('a');
                a.href = this.options.url[i];
                a.target = "_blank";
                this.sliders[i].appendChild(a);
                var img = document.createElement('img');
                img.src = this.options.pics[i];
                img.width = this.options.width;
                img.height = this.options.height;
                if (i == 0) {
                    img.className = "first";
                }
                a.appendChild(img);
            }

        },
        _next: function () {
            this._setp(1);
        },
        _prev: function () {
            this._setp(-1);
        },
        _setp: function (offset) {
            this.sliderindex = this.sliderindex + offset;
            this.wrap.style.transitionProperty = 'left';
            this.wrap.style.transitionDuration = '.5s';
            this._calc();
        },
        _calc: function () {
            this.sliders = Compatible.getElementsByClassName(this._layout, "sliders"); // IE bug 暂时解决方法
            var slideindex = this.sliderindex = this.format(this.sliderindex, this.picnum);
            var preslideindex = this.format((slideindex - 1), 3);
            var nextslideindex = this.format((slideindex + 1), 3);
            this.sliders[preslideindex].style.right = ( preslideindex * 1650) + "px";
            this.sliders[slideindex].style.right = (slideindex * 1650) + "px";
            this.sliders[nextslideindex].style.right = (nextslideindex * 1650) + "px";
            //容器反向平移
            this.wrap.style.left = (slideindex * 1650) + "px";
            for (var i = 0; i < this.sliders.length; i++) {
                if (this.sliders[i].className.indexOf(' focus') > -1) {
                    this.sliders[i].className = this.sliders[i].className.replace(" focus", "");
                }
            }
            this.sliders[slideindex].className = this.sliders[slideindex].className + " focus";
            var arr = this.options.btns.children;
            clearbtn(this.options.btns);
            for (var i = 0; i < arr.length; i++) {
                if ((arr[i].dataset.num - 1) == this.sliderindex) {
                    arr[i].className += " focus"
                }
            }

        },
        format: function (sliderindex, picnum) {
            return ((sliderindex + picnum) % 3)
        },
        nav: function (btnnum) {
            this.sliderindex = btnnum + 1;
            this.wrap.style.transitionDuration = '0s';
            this._calc();
        }

    }
})()





