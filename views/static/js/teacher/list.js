define(["jquery","template","bootstrap"], function($,template) {
  //渲染讲师列表信息
    $.ajax({
      url:"/api/teacher",
      type:"get",
      success:function(data){
          if(data.code==200){
            var html=template("teacherlist-tpl",data);
            $("#teacherlist").html(html);
          }
      }
    });

  //事件委托:事件代理,通过给父元素注册事件,利用事件冒泡的原理来达到下面的每一个子元素都获得事件的效果,即使是动态添加的元素也会获得所注册的事件.
  //        这样既可以减少对dom元素操作的次数,又可以提高性能.  
  //给查看按钮注册事件委托,将讲师信息的模态框展示出来
  $("#teacherlist").on("click",".btn-check",function(){
    // console.log($(this).parent().data("id"));
    var tcid=$(this).parent().data('id');
    $.ajax({
      url:"/api/teacher/view",
      type:"get",
      data:{
        tc_id:tcid
      },
      success:function(data){
        if(data.code==200){
          var html=template("checklist",data.result);
          $("#teacherModal").html(html);
          /**bootstrap是jQuery的一个插件,依赖于jquery
           * 模态框是其中的一个js效果,让模态框显示的方法就是modal方法
           */
          $("#teacherModal").modal("show");


          /**
           * 获取籍贯所在的td的内容,把默认的以|连接的方式,改为以空格连接.
           * 其中要用到字符串的split方法,先以|分隔,然后再用join方法,以空格连接
           * 也可以用正则表达式
           */
          //console.log($("td.hometown").text());
          var str=$("td.hometown").text();
          str=str.split("|").join(" ");
          $("td.hometown").text(str);
        }
      }
    })
  });


  //点击启用/注销按钮,注册事件
   $("#teacherlist").on("click",".btn-onoff",function(){
     var tcid=$(this).parent().data('id');
     //拿到list列表刷新时,返回的status
     var tcstatus=$(this).data("status");
     var $that=$(this);
     $.ajax({
       url:"/api/teacher/handle",
       type:"post",
       data:{
         tc_id:tcid,
         tc_status:tcstatus
       },
       success:function(data){
         if(data.code==200){
          //每次请求之后,先将服务器返回的用户状态更新到我们注销启用按钮上
          //tc_status=1是启用状态
          $that.data("tcstatus",data.result.tc_status);
          if(data.result.tc_status == 1){
            //给当前点击的a移除之前的样式,添加新的样式,并且更改里面的文字
            $that.removeClass("btn-warning");
            $that.addClass("btn-success");
            $that.text("启 用");
          }else{
            $that.removeClass("btn-success");
            $that.addClass("btn-warning");
            $that.text("注 销");
          }
        }
       }

     })
   }) 
});