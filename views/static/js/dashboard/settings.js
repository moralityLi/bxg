define(["jquery","template","nprogress","ckeditor","datepicker","datepicker-zh","region"],function($,template,NProgress,CKEDITOR){
    $.ajax({
        url:"/api/teacher/profile",
        success:function(data){
            if(data.code==200){
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
                //富文本编辑器插件的使用
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
                })

            }
        }
    })
})