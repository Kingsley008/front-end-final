
//发送请求参数 第一页  20个数据  产品设计

//得到 一个有 80个 内容 4页  当前第一页  每页显示 20个
var classtemplate = '           <li class="m-content items">\n' +

    '                </li>'

var pagetemp = '         <ul class="m-pages">\n' +
    '         </ul>'


//tab页 实现 ajax 绑定
var product = util.$('productdesign');
var coding = util.$('coding');
var pageContainer = util.$('g-pages');
var contentContainer = util.$('contentContainer');
var asideContainer = util.$('rank');
var getclass  = {
    url: "class.json",
    type: "GET",
    data: {
        pageNo: 1,
        psize: 20,
        type: 10, //默认产品设计
    }
}

var pageContent;
//初始化 载入页面
util.ajax(getclass,function (json) {

    var pagediv = new PageDiv({totalPage:json.totalPage,pagecontainer:pageContainer,contentcontainer:contentContainer, });
    var tempAside = new TempAside({totalPage:json.totalPage,asideContainer:asideContainer,list:json.list},tempAside);
    tempAside.show();
    setInterval(tempAside.change.bind(tempAside),10000);
    //根据回调的函数 显示分页
    pagediv.showPage(json);
    pagediv.addClick(pagediv);

    //tab 1
    Compatible.addEvent(product,"click",function (event) {
        event.preventDefault();
        util.delclass(coding,"sec");
        util.addclass(product,"sec");
        getclass.data.type = 10;
        var target = event.target || event.srcElement;
        var url = target.href;
        util.ajax(getclass,function (json) {
            pageContent = json;
            pagediv.totalPage = json.totalPage;
            pagediv.showPage(json);
            pagediv.addClick(pagediv);
        })
    })
    //tab 2
    Compatible.addEvent(coding,"click",function (event) {
        event.preventDefault();
        util.delclass(product,"sec");
        util.addclass(coding,"sec");
        getclass.data.type = 20;
        var target = event.target || event.srcElement;
        var url = target.href;
        util.ajax(getclass,function (json) {
            pageContent = json;
            pagediv.totalPage = json.totalPage;
            pagediv.showPage(json);
            pagediv.addClick(pagediv);
        })
    })
})



//根据 totalpage 动态更新 分页器

function PageDiv(options) {
    this.pagewrap = this._pagedivlayout.cloneNode(true);
    this.totalPage = options.totalPage;
    this.pagecontainer  = options.pagecontainer;
    this.conentcontainer = options.contentcontainer;

}
PageDiv.prototype = (function () {

    return {
        _pagedivlayout: node2html(pagetemp),
        showPage: function (json) {
            this.updateClass(json.list);
            this.cleanPage();
            var prev = document.createElement('li');
            prev.innerHTML = '<a data-num="prev" class="m-pages  prev " href="">&lt;</a>';
            this.pagewrap.appendChild(prev);
            for (var i = 1; i <= this.totalPage; i++) {
                var li = document.createElement('li');
                var sec = ""
                if ( i == 1){
                    var sec = "sec";
                }

                li.innerHTML = '<a data-num=' + i + ' class="m-pages '+ sec +' " href="">' + i + '</a>'
                this.pagewrap.appendChild(li);
            }
            var next = document.createElement('li');
            next.innerHTML = '<a data-num="next"class="m-pages next " href="">&gt;</a>';
            this.pagewrap.appendChild(next);
            this.pagecontainer.appendChild(this.pagewrap);
        },
        cleanPage: function () {
            console.log(this);
            for (var i = 1; i < this.pagewrap.childNodes.length-1; i++) {
                util.delclass(this.pagewrap.childNodes[i].children[0], "sec");
            }

            if (this.pagewrap.childNodes.length > 1) {

                for (var i = this.pagewrap.childNodes.length - 1; i >= 0; i--) {

                    this.pagewrap.removeChild(this.pagewrap.childNodes[i]);
                }
            }
        },
        addClick: function (pagediv) {
            Compatible.addEvent(this.pagewrap, "click", function (event) {
                event.preventDefault();
                console.log(this);
                for (var i = 1; i < this.pagewrap.childNodes.length-1; i++) {
                    util.delclass(this.pagewrap.childNodes[i].children[0], "sec");
                }

                var target = event.target || event.srcElement;
                var pageNo = Compatible.dataset(target).num;
                //前一页
                if (getclass.data.pageNo > 1 && pageNo == "prev"){
                    getclass.data.pageNo -= 1;
                    util.addclass(this.findsec(getclass.data.pageNo),"sec");
                    //后一页
                }else if (getclass.data.pageNo < this.totalPage && pageNo == "next"){
                    getclass.data.pageNo += 1;
                    util.addclass(this.findsec(getclass.data.pageNo), "sec");
                }else if (!isNaN(parseInt(pageNo))){
                    getclass.data.pageNo = pageNo;
                    util.addclass(target, "sec");
                }

                console.log( getclass.data.pageNo );

                util.ajax(getclass, function (json) {
                   //更新课程页面
                    console.log( getclass.data.pageNo );
                    this.updateClass(json.list);
                    console.log(pagediv);
                }.bind(pagediv))
            }.bind(pagediv));
        },
        findsec: function(num) {
        for (var i = 1; i < this.pagewrap.childNodes.length-1; i++) {
            re = Compatible.dataset(this.pagewrap.childNodes[i].children[0]).num == getclass.data.pageNo;
            if (re){
                return this.pagewrap.childNodes[i].children[0];
            }
        }
       },
        updateClass:function (list) {
            this.conentcontainer.innerHTML = "";
            for (var i = 0; i < list.length; i++){
                var li =   document.createElement('li');
                li.className = 'm-content items';
                var price = list[i].price;
                if (price == 0) price = "免费";
                li.innerHTML = '  <img class="m-content imgs" src="'+ list[i].middlePhotoUrl + '" width="223px" height="123px">\n' +
                    '                    <div class="m-content padding">\n' +
                    '                        <a class="m-content  f-toe">'+list[i].name +'</a>\n' +
                    '                        <span class="m-content author">'+list[i].provider+'</span>\n' +
                    '                        <span class="m-content pnum">'+list[i].learnerCount+'</span>\n' +
                    '                        <span class="m-content price">￥'+price +'</span>\n' +
                    '                    </div>\n' +
                    '                    <div class="m-content hover">\n' +
                    '                        <div class="m-hover f-c">\n' +
                    '                            <img class="m-content imgs " src="'+ list[i].middlePhotoUrl + '" width="223px" height="123px">\n' +
                    '                            <div class="m-hover left">\n' +
                    '                                <h2>'+list[i].name +'</h2>\n' +
                    '                                <span class="m-hover pnum">'+list[i].learnerCount+'人在学</span>\n' +
                    '                                <span>发布者：'+list[i].provider+'</span>\n' +
                    '                                <span>分类：'+list[i].categoryName+'</span>\n' +
                    '                            </div>\n' +
                    '                        </div>\n' +
                    '                        <div class="m-hover bottom">\n' +
                    '                            <p>'+ list[i].description+'</p>\n' +
                    '                        </div>\n' +
                    '                    </div>'
                this.conentcontainer.appendChild(li);
            }

        }


    }
})()


