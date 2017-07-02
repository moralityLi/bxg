require.config({
    baseUrl:"/views",
    paths:{
        "jquery":"assets/jquery/jquery.min",
        "form":  "assets/jquery-form/jquery.form",
        "cookie":"assets/jquery-cookie/jquery.cookie",
        "template":"assets/artTemplate/template",
        "datepicker":"assets/bootstrap-datepicker/js/bootstrap-datepicker.min",
        "datepicker-zh":"assets/bootstrap-datepicker/locales/bootstrap-datepicker.zh-CN.min" 
    },
    shim:{
        "datepicker-zh":{
            deps:["datepicker"]
        }
    }
})

