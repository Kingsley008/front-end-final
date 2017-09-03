/*兼容element.children 获得该节点的子节点*/
var Compatible = Compatible || {};
Compatible.getElementChild = function (element) {
    if (element.children) {
        return element.children;
    } else {
        var elementArr = [];//声明一个数组用以存放之后获取的子节点
        var nodeList = element.childNodes;//接收所有子节点集合
        for (var i = 0; i < elementArr.length; i++) {
            if (nodeList[i] == 1) { //1为元素节点
                elementArr.push(nodeList[i]);//加入元素数组
            }
        }
    }
    return elementArr;
};

/*兼容elements.getElementsByClass()*/
Compatible.getElementsByClassName = function getElementsByClassName(element, className) {
    if (element.getElementsByClassName) { //特性侦测
        return element.getElementsByClassName(className);
    } else {
        var elements = element.getElementsByTagName('*');
        var result = [];
        var element,
            classNameStr,
            flag;
        className = className.split(' ');
        for (var i = 0; element = elements[i]; i++) {
            classNameStr = ' ' + element.className + ' ';
            flag = true;
            for (var j = 0, name; name = className[j]; j++) {
                if (classNameStr.indexOf(' ' + name + '') == -1) {
                    flag = false;
                    break;
                }
            }
            if (flag) {
                result.push(element)
            }
        }
        return result;
    }
};
/*兼容火狐的innerText*/

Compatible.getInnerText = function getInnerText(element) {
    return (typeof element.textContent == "string") ? element.textContent : element.innerText;
}

Compatible.setInnerText = function setInnerText(element, text) {
    if (typeof element.textContent == "string") {
        element.textContent = text;
    } else {
        element.innerText = text;
    }
}

/*兼容ele.dataset*/
Compatible.dataset = function dataset(element) {
    if (element.dataset) {//如果支持element.dataset
        return element.dataset;//则使用W3C推荐标准
    } else {//否则使用以下代码模拟实现
        var attributes = element.attributes;//获取节点的所有属性,数组形式
        var name = [], value = [];//定义两个数组保存属性名和属性值
        var obj = {};//定义一个空对象
        for (var i = 0; i < attributes.length; i++) {//遍历节点的所有属性
            if (attributes[i].nodeName.slice(0, 5) == "data-") {//如果属性名的前面5个字符符合"data-"
                // 取出属性名的"data-"的后面的字符串放入name数组中
                name.push(attributes[i].nodeName.slice(5));
                //取出对应的属性值放入value数组中
                value.push(attributes[i].nodeValue);
            }
        }
        for (var j = 0; j < name.length; j++) {//遍历name和value数组
            obj[name[j]] = value[j];//将属性名和属性值保存到obj中
        }
        return obj;//返回对象
    }
}
/*兼容window.getComputedStyle*/
//获取当前样式
Compatible.getStyle = function getStyle(element) {
    //特性侦测
    if (window.getComputedStyle) {
        //优先使用W3C规范
        return window.getComputedStyle(element);
    } else {
        //针对IE9以下兼容
        return element.currentStyle;
    }
}
/*兼容IE 添加 删除 监听事件*/
Compatible.addEvent = document.addEventListener ?
    function (elem, type, listener, useCapture) {
        elem.addEventListener(type, listener, useCapture);
    } :
    function (elem, type, listener, userCapture) {
        elem.attachEvent('on' + type, listener);
    }

Compatible.delEvent = document.removeEventListener ?
    function (elem, type, listener, useCapture) {
        elem.removeEventListener(type, listener, useCapture)
    } :
    function (elem, type, listener, useCapture) {
        elem.detachEvent('on' + type, listener);
    };


