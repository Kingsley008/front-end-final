var tempAside ='<ul class="m-aside rank ">\n' +
    '                    <li class="m-aside items f-c">\n' +
    '                        <img src="imgs/smalldemo.png" width="50px" height="50px">\n' +
    '                        <div>\n' +
    '                            <a class="m-content f-toe " style="display: block">舞曲揭秘音乐揭秘xxxx</a>\n' +
    '                            <span class="m-content pnum ">21567</span>\n' +
    '                        </div>\n' +
    '                    </li>' +
    '</ul>'

function createli() {
    var li = document.createElement('li');
    li.className = "m-aside items f-c";
    return li;
}

function TempAside(options,obj) {
    this.obj = obj;
    this.options = options || {};
    this.rank = this._rank;

}
// 参数 list  totalPage
TempAside.prototype = (function () {
        return {
            _rank : node2html(tempAside).cloneNode(true),
            _setp: -70,
            _num:10,
            _offset:0,
            show:function () {
                for(var i = 0; i < 20; i++){
                    var li = document.createElement('li');
                    li.innerHTML =
                        '                    <li class="m-aside items f-c">\n' +
                        '                        <img src="'+this.options.list[i].smallPhotoUrl+'" width="50px" height="50px">\n' +
                        '                        <div>\n' +
                        '                            <a class="m-content f-toe " style="display: block">'+this.options.list[i].name+'</a>\n' +
                        '                            <span class="m-content pnum ">'+this.options.list[i].learnerCount+'</span>\n' +
                        '                        </div>\n' +
                        '                    </li>'
                        this.rank.appendChild(li);
                }
                this.options.asideContainer.appendChild(this.rank);
            },
            change:function () {
                this.next();
            },
            next:function () {
                this._offset +=1
                this.cacl(this._offset);
            },
            cacl:function (offset) {
                for(var i = 0; i < this.rank.childNodes.length;i++){
                    if(this.rank.childNodes[i].nodeType == 1){
                        this.rank.childNodes[i].style.top =  this._setp * offset + "px";
                    }
                }
                this._offset = this._offset % this._num;
            }

        }
})()


