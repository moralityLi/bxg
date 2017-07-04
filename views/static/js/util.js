//因为使用了模块化,所以自己封装的方法也要用define定义一个模块
define(function () {
   //在一个对象中想使用这个对象的另一个方法,就要使用this关键字
    return {
        // 从地址栏截取所需的信息
        getQueryObj: function(){
            //拿到地址栏url中?后面的内容
            var queryString = window.location.search;
            //把?截掉,变成key=value&key=value的形式
            queryString = queryString.slice(1);
            var obj = {};
            //key=value&key=value变成key=value的数组
            var kvPairs = queryString.split("&");
            for (var i = 0; i < kvPairs.length; i++) {
                //kvPair是每一个key=value
                var kvPair = kvPairs[i];
                //kvArr是数组,[key,value]的形式
                var kvArr = kvPair.split("=");
                //把数组的第一项作为对象的键,第二项作为对象的值,存到数组中.
                //decodeURL(encodedURI)方法是将编码过的url解码
                //encodedURI(decodeURL)方法是将url编码
                obj[kvArr[0]] = decodeURI(kvArr[1]);
            }
            return obj;
        },
        //传入一个key键可以获取value值
        getQuery:function(key){
            //this.getQueryObj()代表这个方法返回的obj对象
            return this.getQueryObj()[key];
        }
    }
});