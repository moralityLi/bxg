define(["jquery", "template","nprogress", "cookie"], function ($, template,NProgress) {
	//使用进度条插件
	NProgress.start();
	NProgress.done();
	//ajaxStart()和ajaxStop()是两个全局事件,所有的ajax请求都会触发这两个事件
	$(document).ajaxStart(function(){
		NProgress.start();
	});
	$(document).ajaxStop(function(){
		NProgress.done();
	});
	//1.首页中侧边栏的头像和描述信息的实现
	$(function () {
		//只有登录页才有登录信息,判断一个页面是否在本页的方法,就是使用location地址
		if ("/dashboard/login" != location.pathname) {
			//完善登录功能,当用户处于未登录的状态时,让用户直接跳转到登录页面
			if (!$.cookie("PHPSESSID")) {
				location.href = "/dashboard/login";
			} else {
				//从cookie中获取登录成功后存储的用户信息。
				var userInfo = JSON.parse($.cookie("userinfo"));
				//模板引擎
				var html = template("profile-tpl", userInfo);
				$("#userinfo").html(html);
			}
		}

	});


	//2.侧边栏中下面的列表的样式的一些实现
	//给每一个li绑定点击事件,切换a的样式
	$(".navs>ul>li").click(function () {
		$(this).children("a").addClass("active");
		$(this).siblings().children("a").removeClass("active");
		// $("#loading").css("display","block");

	})



	//二级菜单显示事件
	$(".navs>ul>li>ul").parent().click(function () {
		var $ul=$(this).children("ul");
		$ul.slideToggle();
		//这个判断是为了解决,当点击二级菜单时,一级菜单和二级菜单中的a同时拥有active类,避免两者都有背景色
		if($ul.find("a.active").length > 0){
			//this指的是二级菜单ul的父元素li
			$(this).children("a").removeClass("active");
		} 
	})

	//跳转页面也要让当前被点击的a拥有active类,颜色变暗
	//注意each函数的参数位置代表的含义
	$(".navs a").each(function ( index,value) {
		//判断a的href属性和当前地址栏是否相等,如果相等则让当前的a添加上active样式
		if ($(value).attr("href") == location.pathname) {
			$(value).addClass("active");
			$(value).parent().parent().slideDown();
		}
	})





	//3.退出登录的功能
	$("#loginout").click(function () {
		$.ajax({
			url: "/api/logout",
			type: "post",
			success: function (data) {
				if (data.code == 200) {
					location.href = "/dashboard/login";
				}
			}
		})
	})

})