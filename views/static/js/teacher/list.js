define(["jquery"], function($) {
    $.ajax({
      url:"/api/teacher",
      type:"get",
      success:function(data){
          console.log(data);
      }
    })
    
});