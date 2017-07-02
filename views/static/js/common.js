define(["jquery","template","cookie"],function($,template){
	//1.首页中侧边栏的头像和描述信息的实现
	$(function(){
		//只有登录页才有登录信息,判断一个页面是否在本页的方法,就是使用location地址
		if("/dashboard/login" !=location.pathname){
			 //从cookie中获取登录成功后存储的用户信息。
			var userInfo = JSON.parse($.cookie("userinfo"));
			//模板引擎
			var html = template("profile-tpl",userInfo);
			$("#userinfo").html(html);
		}
   });


   //2.侧边栏中下面的列表的样式的一些实现
   //给每一个li绑定点击事件,切换a的样式
     $(".navs>ul>li").click(function(){
		$(this).children("a").addClass("active");
		$(this).siblings().children("a").removeClass("active");
		// $("#loading").css("display","block");
	 })

	 //二级菜单显示事件
	 $(".navs>ul>li>ul").parent().click(function(){
		 $(this).children("ul").slideToggle();
	 })

	



	//3.退出登录的功能
	$("#loginout").click(function(){
		$.ajax({
			url:"/api/logout",
			type:"post",
			success:function(data){
				if(data.code==200){
						location.href="/dashboard/login";
				}
			}
		})
	})

})