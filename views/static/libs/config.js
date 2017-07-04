require.config({
    baseUrl:"/views",
    paths:{
        "jquery":"assets/jquery/jquery.min",
        "form":  "assets/jquery-form/jquery.form",
        "cookie":"assets/jquery-cookie/jquery.cookie",
        "template":"assets/artTemplate/template",
        "bootstrap":"assets/bootstrap/js/bootstrap.min",
        "util":"static/js/util",
        "datepicker":"assets/bootstrap-datepicker/js/bootstrap-datepicker.min",
        "datepicker-zh":"assets/bootstrap-datepicker/locales/bootstrap-datepicker.zh-CN.min", 
        "validate":"assets/jquery-validate/jquery-validate.min",
        "nprogress":"assets/nprogress/nprogress",
        "ckeditor":"assets/ckeditor/ckeditor",
         "region": "assets/jquery-region/jquery.region"
    },
    shim:{
        "datepicker-zh":{
            deps:["datepicker"]
        },
        "bootstrap":{
            deps:["jquery"]
        },
        "validate":{
            deps:["jquery"]
        },
        "ckeditor":{
            exports:["CKEDITOR"]
        }
    }
})

