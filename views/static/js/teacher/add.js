define(["jquery","util","template","form","datepicker","datepicker-zh","validate"],function($,util,template){
    //思路:根据当前跳转的页面的url中有没有携带?id=**,来判断当前页面是添加页面还是编辑页面
    var str=util.getQueryObj();
    //如果有这个讲师的id,证明是编辑页面
    if(str.id){
        //去后台接口去拿这个id对应的讲师信息,渲染到页面
        $.ajax({
            url:"/api/teacher/edit",
            data:{
                tc_id: str.id
            },
            success:function(data){
                //编辑和添加的文字后台没给,所以可以自己给返回的数据绑定一个属性,
                data.result.title="编辑";
                data.result.btnText="保存";
                data.result.type="edit";
                var html=template("teacher-tpl",data.result);
                $(".teacher").html(html);
                //使用日期插件来对日期选项进行处理
                $("input[name=tc_join_date]").datepicker({
                    format:"yyyy-mm-dd",
                    language:"zh-CN"
                });

                 //使用表单验证插件,对表单进行验证
        $("#teacherform").validate({
             description:{
                 "tcname":{
                     required:"请输入用户名"
                 },
                 "tcpass":{
                     required:"请输入密码"
                 },
                "tcjoindate": {
					required: "请输入入职时间"
				},
             },
             onBlur:true,
             onKeyup:true,
             //阻止表单默认提交
             sendForm:false,
             eachInvalidField:function(){
                //this代表当前表单元素input
                 this.parent().parent().addClass("has-error").removeClass("has-success");
                 this.parent().next().removeClass("hide");
             },
             eachValidField:function(){
                 this.parent().parent().addClass("has-success").removeClass("has-error");
             },
             valid:function(){
                 var type=$("#btnSave").data("type");
                 var url="";
                 if(type=="edit"){
                    url="/api/teacher/update";
                 }else{
                     url="/api/teacher/add";
                 }
                 //使用jquery-form插件将表单进行异步提交
                 $("#teacherform").ajaxSubmit({
                     url:url,
                     type:"post",
                     success:function(data){
                        if(data.code==200){
                            location.href="/teacher/list";
                        }
                     }
                 })
             }
        })
            }
        })
    }else{
        var html=template("teacher-tpl",{
            title:"添加",
            btnText:"添加",
            type:"add"
        });
        $(".teacher").html(html);
        //使用日期插件来对日期选项进行处理
        $("input[name=tc_join_date]").datepicker({
            format:"yyyy-mm-dd",
            language:"zh-CN"
        });
        //使用表单验证插件,对表单进行验证
        $("#teacherform").validate({
             description:{
                 "tcname":{
                     required:"请输入用户名"
                 },
                 "tcpass":{
                     required:"请输入密码"
                 },
                "tcjoindate": {
					required: "请输入入职时间"
				},
             },
             onBlur:true,
             onKeyup:true,
             //阻止表单默认提交
             sendForm:false,
             eachInvalidField:function(){
                //this代表当前表单元素input
                 this.parent().parent().addClass("has-error").removeClass("has-success");
                 this.parent().next().removeClass("hide");
             },
             eachValidField:function(){
                 this.parent().parent().addClass("has-success").removeClass("has-error");
             },
             valid:function(){
                 var type=$("#btnSave").data("type");
                 var url="";
                 if(type=="edit"){
                    url="/api/teacher/update";
                 }else{
                     url="/api/teacher/add";
                 }
                 //使用jquery-form插件将表单进行异步提交
                 $("#teacherform").ajaxSubmit({
                     url:url,
                     type:"post",
                     success:function(data){
                        if(data.code==200){
                            location.href="/teacher/list";
                        }
                     }
                 })
             }
        })
    }
    
    
    
    
    
    
    // $("#addBtn").submit(function(){
    //     //向后台发送ajax请求,把数据保存下来,添加到list页面
    //     $.ajaxSubmit({
    //         url:"/api/teacher/add",
    //         type:"post",
    //         success:function(data){
    //             console.log(data);
    //         }
    //     });
    //     return false;
    // })
});