define(["jquery","template","nprogress","ckeditor","datepicker","datepicker-zh","region","uploadify","form"],function($,template,NProgress,CKEDITOR){
    $.ajax({
        url:"/api/teacher/profile",
        success:function(data){
            if(data.code==200){
                console.log(data);
                var html=template("setting-tpl",data.result);
                $(".settings").html(html);

                //<插件的使用>
                //日期插件的使用
				$("input[name=tc_birthday]").datepicker({
					format: "yyyy-mm-dd",
					language: "zh-CN"
				});
				$("input[name=tc_join_date]").datepicker({
					format: "yyyy-mm-dd",
					language: "zh-CN"
				});
                // 富文本编辑器插件的使用
                CKEDITOR.replace("introduce",{
                    toolbarGroups: [
				        { name: 'clipboard',   groups: [ 'clipboard', 'undo' ] },
				        { name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
				        { name: 'paragraph',   groups: [ 'list', 'indent', 'blocks', 'align', 'bidi' ] },
				        { name: 'styles' },
				        { name: 'colors' },
				        { name: 'about' }
			    	]
                });
                //地区三级联动插件
                $("#region").region({
                    url:"/views/assets/jquery-region/region.json"
                });

                //上传图片插件的使用
                $("#upfile").uploadify({
                    swf:"/views/assets/uploadify/uploadify.swf",
                    uploader:"/api/uploader/avatar",
                    fileObjName:"tc_avatar",
                    width:120,
                    height:120,
                    buttonText:"",
                    itemTemplate:"<p></p>",
                    onUploadStart:function(){
                        NProgress.start();
                    },
                    onUploadSuccess:function(file,data,response){
                        //拿到的数据json格式的是一个字符串,要把它转成对象才能使用
                        data=JSON.parse(data);
                        if(data.code==200){
                            //将服务器存储的图片地址,显示给头像图片框
                            $(".preview>img").attr("src",data.result.path)
                        }
                    },
                    onUploadComplete:function(){
                        NProgress.done();
                    }
                })


            }
        }
    });


    //使用form提交数据,后台会自动去form表单中拿数据,然后提交
    $(".settings").on("submit","form",function(){
        $(this).ajaxSubmit({
            url:"/api/teacher/modify",
            type:"post",
            success:function(data){
                if(data.code==200){
                    alert("修改成功!");
                }
            }
        })
        //阻止默认提交行为
        return false;
    })
})