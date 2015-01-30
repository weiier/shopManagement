$(function(){
    
    var $img = $("#row2 img");
    var $content = $("#row2 p");
    
    var fixImg = "./images/fix.png";
    var fixContent = "招商信息......";
    
    $(".thumbnail").mousemove(function(){
    
        /*alert($(this).attr("name"));*/
        /*$(this).stop(true,true);*/
        if(!$(this).is("animated")){
            var floor = $(this).attr("name");
            var src = "./images/f"+floor+".png";
            var con = "关于"+floor+"层的信息";
            $img.attr('src',src);
            $content.html(con);
        }
        else{
            $(this).stop();
        }
        
    });
    
    $(".thumbnail").mouseout(function(){
        
        /*$(this).stop(true,true);*/
        if(!$(this).is("animated")){
            $img.attr('src',fixImg);
            $content.html(fixContent);
        }
        else{
            $(this).stop();
        }
        
    });
});