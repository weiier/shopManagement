//global variable
var publicElement = (function () {
	this.ip = "10.103.240.91";
	this.port = "8888";
	this.login_id = null;
    return this;
})();

function getSelfList() {
    var  url = "http://"+publicElement.ip+":"+publicElement.port+"/vmapAPI/apply!proxySelectSelf?login_id="+publicElement.login_id+"&jsoncallback=?";
    $.getJSON(
        url,
        function( result ) {
            if ( !result.success ) {
                $("#selfTable").dataTable();
                return;
            }
            var $tbody = $("#selfTable tbody");
            for ( var i = 0; i < result.total; i++ ) {

                var $tr = null;

                var temp = result.apply[i].title;
                var state = "已发送";
                if(result.apply[i].title.length>20)
                    temp = result.apply[i].title.substr(0,20) + "...";
                if(result.apply[i].state == "0")
                {
                    $tr = $("<tr><td>"+result.apply[i].apply_id+"</td><td><b>"+temp
                        +"</b></td><td>"+result.apply[i].last_modify_time+"</td><td>"+state+"</td>"+
                        "<td class='center'> <a class='btn btn-success btn-xs'> <i class='glyphicon glyphicon-zoom-in icon-white'></i> 查看</a> <a class='btn btn-info btn-xs'>"+
                        " <i class='glyphicon glyphicon-edit icon-white'></i> 修改</a></td></tr>");
                }
                if(result.apply[i].state == "1")
                {
                    state = "已回复";
                    $tr = $("<tr><td>"+result.apply[i].apply_id+"</td><td><b><font color='green'>"+temp
                        +"</font></b></td><td>"+result.apply[i].last_modify_time+"</td><td><b><font color='green'>"+state+"</font></b></td>"+"<td class='center'> <a class='btn btn-success btn-xs'> <i class='glyphicon glyphicon-zoom-in icon-white'></i> 查看</a> </td></tr>");

                }
                if(result.apply[i].state == "2")
                {
                    state = "状态二";
                    $tr = $("<tr><td>"+result.apply[i].apply_id+"</td><td><b><font color='red'>"+temp
                        +"</font></b></td><td>"+result.apply[i].last_modify_time+"</td><td><b><font color='red'>"+state+"</font></b></td>"+
                        "<td class='center'> <a class='btn btn-success btn-xs'> <i class='glyphicon glyphicon-zoom-in icon-white'></i> 查看</a> </td></tr>");

                }
                $tr.attr("apply_id",result.apply[i].apply_id);
                $tr.on("click",function(e){
                    var $target = $(e.target);
                    if($target.hasClass("btn-success")||$target.parent().hasClass("btn-success")){
                        showselfApply($target.parents("tr").attr("apply_id"));
                    }else if($target.hasClass("btn-info")||$target.parent().hasClass("btn-info")) {
                        editapply($target.parents("tr").attr("apply_id"));
                    }
                });
                $tbody.append($tr);
            }
            $("#selfTable").dataTable
            (
                {

                    "order": [ 2, 'desc' ]
                }

            );
        }
    );

}

//get list of leases_new
function getLeaseList() {
	var  newurl = "http://"+publicElement.ip+":"+publicElement.port+"/vmapAPI/lease!select_lease?company_id="+publicElement.login_id+"&jsoncallback=?";
    $.getJSON(
        newurl,
        function( result ) {
            if ( !result.success ) {
				$("#leaseTable").dataTable();
                return;
            }
			var $tbody = $("#leaseTable tbody");
            for ( var i = 0; i < result.total; i++ ) {

                var $tr = null;
                
                if(result.leases[i].state == "0"){
                	$tr = $("<tr><td>"+result.leases[i].lease_id+"</td><td><b>"+ result.leases[i].booth_num
                            +"</b></td><td>"+result.leases[i].rent+"</td><td>"+result.leases[i].last_modify_time+"</td><td>未审核</td>"
                            + "<td class='center'> <a class='btn btn-success btn-xs'> <i class='glyphicon glyphicon-zoom-in icon-white'></i> 查看</a> <a class='btn btn-info btn-xs'>"+
                            " <i class='glyphicon glyphicon-edit icon-white'></i> 修改</a></td></tr>");
                }
                if(result.leases[i].state == "1"){
                	$tr = $("<tr><td>"+result.leases[i].lease_id+"</td><td><b>"+ result.leases[i].booth_num
                            +"</b></td><td>"+result.leases[i].rent+"</td><td>"+result.leases[i].last_modify_time+"</td><td>通过</td>"
                            + "<td class='center'> <a class='btn btn-success btn-xs'> <i class='glyphicon glyphicon-zoom-in icon-white'></i> 查看</a></td></tr>");
                }
				 if(result.leases[i].state == "2"){
					 $tr = $("<tr><td>"+result.leases[i].lease_id+"</td><td><b>"+ result.leases[i].booth_num
	                            +"</b></td><td>"+result.leases[i].rent+"</td><td>"+result.leases[i].last_modify_time+"</td><td>未通过</td>"
	                            + "<td class='center'> <a class='btn btn-success btn-xs'> <i class='glyphicon glyphicon-zoom-in icon-white'></i> 查看</a></td></tr>");
				 }
                    
                 $tr.attr("lease_id",result.leases[i].lease_id);
				
			    $tr.on("click",function(e){
					var $target = $(e.target); 
					if($target.hasClass("btn-success")||$target.parent().hasClass("btn-success")){
						showLease($target.parents("tr").attr("lease_id"));
					}else if($target.hasClass("btn-info")||$target.parent().hasClass("btn-info")) {
                        editLease($target.parents("tr").attr("lease_id"));
                    }
				});
				$tbody.append($tr);
            }	
			$("#leaseTable").dataTable(
                {
                    "order": [ 4, 'desc' ]
                }
            );
        }
    );
}

function showApply(apply){
    var  url = "http://"+publicElement.ip+":"+publicElement.port+"/vmapAPI/apply!find?apply_id="+apply+"&jsoncallback=?";
    $.getJSON(
        url,
        function( result ) {
            if ( !result.success ) {
                return;
            }
			$("#showApply").modal("show");
			var data = result.apply[0];

			$("#show_id").val(data.apply_id);
            $("#send_id").val(data.create_id);
            $("#show_time").val(data.last_modify_time);
            $("#show_title").val(data.title);
			$("#show_content").val(data.reply);
            updatesign(apply);
	    }
    );

}

function showselfApply(proxy) {
    $("#edit").text("关闭");
    var  url = "http://"+publicElement.ip+":"+publicElement.port+"/vmapAPI/apply!find?apply_id="+proxy+"&jsoncallback=?";
    $.getJSON(
        url,
        function (result) {
            if (!result.success) {
                return;
            }
            $("#showselfApply").modal("show");
            var data = result.apply[0];

            $("#show_self_time").val(data.last_modify_time);
            $("#show_self_title").val(data.title);
            $("#show_self_reply").val(data.reply);
            $("#show_self_content").val(data.content);
            updatesign(proxy);
        }
    );
}

function showLease(lease){
    var  url = "http://"+publicElement.ip+":"+publicElement.port+"/vmapAPI/lease!select?lease_id="+lease+"&jsoncallback=?";
    $.getJSON(
        url,
        function( result ) {
            if ( !result.success ) {
                return;
            }
			var data = result.leases[0];
			
			$("#lease_num").val(data.booth_num);
            $("#lease_length").val(data.block_length);
            $("#lease_width").val(data.block_width);
            $("#lease_area").val(data.block_area);
			$("#lease_rent").val(data.rent);
            $("#lease_price").val(data.block_rent);
            $("#lease_tPrice").val(data.block_rent * data.block_area * data.block_discount);
            $("#lease_tonnage").val(data.block_tonnage);
            $("#lease_discount").val(data.block_discount);
            $("#editL").hide();
			$("#leaseModal").modal("show");
	    }
    );
}

function editLease(lease){
    var  url = "http://"+publicElement.ip+":"+publicElement.port+"/vmapAPI/lease!select?lease_id="+lease+"&jsoncallback=?";
    $.getJSON(
        url,
        function( result ) {
            if ( !result.success ) {
                return;
            }
			var data = result.leases[0];
			
			$("#lease_num").val(data.booth_num);
            $("#lease_length").val(data.block_length);
            $("#lease_width").val(data.block_width);
            $("#lease_area").val(data.block_area);
			$("#lease_rent").val(data.rent);
            $("#lease_price").val(data.block_rent);
            $("#lease_tPrice").val(data.block_rent * data.block_area * data.block_discount);
            $("#lease_tonnage").val(data.block_tonnage);
            $("#lease_discount").val(data.block_discount);
            $("#editL").show();
			$("#leaseModal").modal("show");
	    }
    );
    
    $("#editL").on("click",function(e) {
        submitLease(lease);
        return false;
    });
}


function editapply(proxy) {
    var  url = "http://"+publicElement.ip+":"+publicElement.port+"/vmapAPI/apply!find?apply_id="+proxy+"&jsoncallback=?";
    $.getJSON(
        url,
        function (result) {
            if (!result.success) {
                return;
            }
            $("#editselfApply").modal("show");
            var data = result.apply[0];
            $("#edit_self_time").val(data.last_modify_time);
            $("#edit_self_title").val(data.title);
            $("#edit_self_content").val(data.content);
        }
    );
    $("#submit").on("click",function(e) {
        subapply(proxy);
    });
}

function updatesign(id){
    var  url = "http://"+publicElement.ip+":"+publicElement.port+"/vmapAPI/apply!updatesign?apply_id="+ id +"&jsoncallback=?";
    $.getJSON(
        url,
        function( result ) {

        }
    );
}

function  submitLease(lease){
	var url = 'http://'+publicElement.ip+":"+publicElement.port+'/vmapAPI/lease!edit_rent?lease_id='+lease+'&rent='+$("#lease_rent").val()+"&jsoncallback=?";
	console.log(url);
	$.post(url,
			 function(data){
		 		location.reload();
	    },"json");
}

function subapply(proxy){

    var url = 'http://'+publicElement.ip+":"+publicElement.port+'/vmapAPI/edit!edit_apply?jsonstr=';
    var data = {
        title : $("#edit_self_title").val(),
        content: $("#edit_self_content").val(),
        reply: "",
        sign: "0",
        state: "0",
        create_id: publicElement.login_id,
        apply_id : proxy
    };
    data = JSON.stringify(data);
    url += data+"&jsoncallback=?";
    console.log(url);
    $.post(url,function(data){
        $("#editselfApply").modal("hide");
        location.reload();
    },"json");
}

// add
function addapply() {
  
    var url = 'http://'+publicElement.ip+":"+publicElement.port+'/vmapAPI/insert!insert_apply?jsonstr=';
    var data = {
        title : $("#newtitle").val(),
        content: $("#newcontent").val(),
        reply: "",
        sign: "0",
        state: "0",
        send_id: "admin;",
        create_id: publicElement.login_id,
        floor_id : "",
    	version_id : ""
    };
    data = JSON.stringify(data);
    url += data+"&jsoncallback=?";
    console.log(url);
    $.post(url,function(data){
       location.reload();
    },"json");
    alert("发送成功");
    return false;
}

//main entrance
$(document).ready(function(){
	publicElement.login_id = $("#login_proxy").attr("uid");
    getSelfList();
    getLeaseList();
});