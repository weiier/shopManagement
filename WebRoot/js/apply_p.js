//global variable
var publicElement = (function () {
	this.ip = "10.103.240.91";
	this.port = "8888";
	this.showFlag = false;
	this.login_id = null;
	this.floor_id = null;
	this.proxy_state = null;
    return this;
})();

//get list of apply without proxy_id
function getApplyNewList() {
	var  url = "http://"+publicElement.ip+":"+publicElement.port+"/vmapAPI/apply!allSelectNew?floor_id="+publicElement.floor_id+"&jsoncallback=?";
    $.getJSON(
        url,
        function( result ) {
            if ( !result.success ) {
				$("#proxyTable").dataTable();
                return;
            }
			var $tbody = $("#proxyTable tbody");
            for ( var i = 0; i < result.total; i++ ) {
                var $tr = null;
                    var temp = result.apply[i].title;
                    if(result.apply[i].title.length>20)
                        temp = result.apply[i].title.substr(0,20) + "...";
                    $tr = $("<tr><td>"+result.apply[i].apply_id+"</td><td><b>"+ temp
                        +"</b></td><td>"+result.apply[i].last_modify_time+"</td><td>"+result.apply[i].show_name+"</td><td>"+result.apply[i].phone+"</td>"
                        + "<td class='center'> <a class='btn btn-success btn-xs'> <i class='glyphicon glyphicon-zoom-in icon-white'></i> 查看</a> <a class='btn btn-info btn-xs'>"+
                        " <i class='glyphicon glyphicon-edit icon-white'></i> 回复</a></td></tr>");
			    $tr.attr("apply_id",result.apply[i].apply_id);
				$tr.on("click",function(e){
					var $target = $(e.target); 
					if($target.hasClass("btn-success")||$target.parent().hasClass("btn-success")){
						showApply($target.parents("tr").attr("apply_id"));
					}else if($target.hasClass("btn-info")||$target.parent().hasClass("btn-info")) {
                        editapply($target.parents("tr").attr("apply_id"),1);
                    }
				});
				$tbody.append($tr);
            }	
			$("#proxyTable").dataTable(
                {
                    "order": [ 2, 'desc' ]
                }
            );
        }
    );
	
}

function getApplyOldList() {
    var  url = "http://"+publicElement.ip+":"+publicElement.port+"/vmapAPI/apply!allSelectOld?floor_id="+publicElement.floor_id+"&jsoncallback=?";
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
                if(result.apply[i].title.length>20)
                    temp = result.apply[i].title.substr(0,20) + "...";
                if(result.apply[i].sign == "0");
                {
                    state = "已发送";
                    $tr = $("<tr><td>"+result.apply[i].apply_id+"</td><td><b>"+temp
                        +"</font></b></td><td>"+result.apply[i].show_name+"</td><td>"+result.apply[i].phone+"</td>" +
                        "<td>"+result.apply[i].last_modify_time+"</td><td><b><font color='green'>"+state+"</font></b></td>"+"<td class='center'> <a class='btn btn-success btn-xs'> <i class='glyphicon glyphicon-zoom-in icon-white'></i> 查看</a> <a class='btn btn-info btn-xs'>"+
                        " <i class='glyphicon glyphicon-edit icon-white'></i> 修改</a></td></tr>");
                }
                if(result.apply[i].sign == "1")
                {
                    state = "已阅读";
                    $tr = $("<tr><td>"+result.apply[i].apply_id+"</td><td><b><font color='green'>"+temp
                        +"</font></b></td><td>"+result.apply[i].show_name+"</td><td>"+result.apply[i].phone+"</td><td>"
                        +result.apply[i].last_modify_time+"</td><td><b><font color='red'>"+state+"</font></b></td>"+
                        "<td class='center'> <a class='btn btn-success btn-xs'> <i class='glyphicon glyphicon-zoom-in icon-white'></i> 查看</a> <a class='btn btn-info btn-xs'>"+
                        " <i class='glyphicon glyphicon-edit icon-white'></i> 修改</a></td></tr>");
                }
                $tr.attr("apply_id",result.apply[i].apply_id);
                $tr.on("click",function(e){
                    var $target = $(e.target);
                    if($target.hasClass("btn-success")||$target.parent().hasClass("btn-success")){
                    	showselfApply($target.parents("tr").attr("apply_id"));
                    }
                    else if($target.hasClass("btn-info")||$target.parent().hasClass("btn-info")) {
                        editapply($target.parents("tr").attr("apply_id"),2);
                    }
                });
                $tbody.append($tr);
            }
            $("#selfTable").dataTable(
                {
                    "order": [ 2, 'desc' ]
                }
            );
        }
    );
}

//get list of apply with proxy_id
function getApplyNew() {
	var  url = "http://"+publicElement.ip+":"+publicElement.port+"/vmapAPI/apply!proxySelectNew?floor_id="
	+publicElement.floor_id+"&proxy_id="+publicElement.login_id+"&jsoncallback=?";
    $.getJSON(
        url,
        function( result ) {
            if ( !result.success ) {
				$("#proxyTable").dataTable();
                return;
            }
			var $tbody = $("#proxyTable tbody");
            for ( var i = 0; i < result.total; i++ ) {
                var $tr = null;
                    var temp = result.apply[i].title;
                    if(result.apply[i].title.length>20)
                        temp = result.apply[i].title.substr(0,20) + "...";
                    $tr = $("<tr><td>"+result.apply[i].apply_id+"</td><td><b>"+ temp
                        +"</b></td><td>"+result.apply[i].last_modify_time+"</td><td>"+result.apply[i].show_name+"</td><td>"+result.apply[i].phone+"</td>"
                        + "<td class='center'> <a class='btn btn-success btn-xs'> <i class='glyphicon glyphicon-zoom-in icon-white'></i> 查看</a> <a class='btn btn-info btn-xs'>"+
                        " <i class='glyphicon glyphicon-edit icon-white'></i> 回复</a></td></tr>");
			    $tr.attr("apply_id",result.apply[i].apply_id);
				$tr.on("click",function(e){
					var $target = $(e.target); 
					if($target.hasClass("btn-success")||$target.parent().hasClass("btn-success")){
						showApply($target.parents("tr").attr("apply_id"));
					}else if($target.hasClass("btn-info")||$target.parent().hasClass("btn-info")) {
                        editapply($target.parents("tr").attr("apply_id"),1);
                    }
				});
				$tbody.append($tr);
            }	
			$("#proxyTable").dataTable(
                {
                    "order": [ 2, 'desc' ]
                }
            );
        }
    );
	
}

function getApplyOld() {
    var  url = "http://"+publicElement.ip+":"+publicElement.port+"/vmapAPI/apply!proxySelectOld?floor_id="
    +publicElement.floor_id+"&proxy_id="+publicElement.login_id+"&jsoncallback=?";
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
                if(result.apply[i].title.length>20)
                    temp = result.apply[i].title.substr(0,20) + "...";
                if(result.apply[i].sign == "0");
                {
                    state = "已发送";
                    $tr = $("<tr><td>"+result.apply[i].apply_id+"</td><td><b>"+temp
                        +"</font></b></td><td>"+result.apply[i].show_name+"</td><td>"+result.apply[i].phone+"</td>" +
                        "<td>"+result.apply[i].last_modify_time+"</td><td><b><font color='green'>"+state+"</font></b></td>"+"<td class='center'> <a class='btn btn-success btn-xs'> <i class='glyphicon glyphicon-zoom-in icon-white'></i> 查看</a> <a class='btn btn-info btn-xs'>"+
                        " <i class='glyphicon glyphicon-edit icon-white'></i> 修改</a></td></tr>");
                }
                if(result.apply[i].sign == "1")
                {
                    state = "已阅读";
                    $tr = $("<tr><td>"+result.apply[i].apply_id+"</td><td><b><font color='green'>"+temp
                        +"</font></b></td><td>"+result.apply[i].show_name+"</td><td>"+result.apply[i].phone+"</td><td>"
                        +result.apply[i].last_modify_time+"</td><td><b><font color='red'>"+state+"</font></b></td>"+
                        "<td class='center'> <a class='btn btn-success btn-xs'> <i class='glyphicon glyphicon-zoom-in icon-white'></i> 查看</a> <a class='btn btn-info btn-xs'>"+
                        " <i class='glyphicon glyphicon-edit icon-white'></i> 修改</a></td></tr>");
                }
                $tr.attr("apply_id",result.apply[i].apply_id);
                $tr.on("click",function(e){
                    var $target = $(e.target);
                    if($target.hasClass("btn-success")||$target.parent().hasClass("btn-success")){
                    	showselfApply($target.parents("tr").attr("apply_id"));
                    }
                    else if($target.hasClass("btn-info")||$target.parent().hasClass("btn-info")) {
                        editapply($target.parents("tr").attr("apply_id"),2);
                    }
                });
                $tbody.append($tr);
            }
            $("#selfTable").dataTable(
                {
                    "order": [ 2, 'desc' ]
                }
            );
        }
    );
}

//proxy get list of leases_new with proxy_id
function getLeaseNew() {
	var  newurl = "http://"+publicElement.ip+":"+publicElement.port+"/vmapAPI/lease!proxySelectNew?proxy_id="+publicElement.login_id
	+"&floor_id="+publicElement.floor_id+"&jsoncallback=?";
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
                    $tr = $("<tr><td>"+result.leases[i].lease_id+"</td><td><b>"+ result.leases[i].company_show_name
                        +"</b></td><td>"+result.leases[i].phone+"</td><td>"+result.leases[i].booth_num+"</td><td>"+result.leases[i].rent+"</td><td>未审核</td>"
                        + "<td class='center'> <a class='btn btn-success btn-xs'> <i class='glyphicon glyphicon-zoom-in icon-white'></i> 查看</a> <a class='btn btn-info btn-xs'>"+
                        " <i class='glyphicon glyphicon-edit icon-white'></i> 审核</a></td></tr>");
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

//get lists for leases_old with proxy_id
function getLeaseOld() {
    var  oldurl = "http://"+publicElement.ip+":"+publicElement.port+"/vmapAPI/lease!proxySelectOld?proxy_id="+publicElement.login_id
	+"&floor_id="+publicElement.floor_id+"&jsoncallback=?";
    $.getJSON(
        oldurl,
        function( result ) {
            if ( !result.success ) {
                $("#auditingTable").dataTable();
                return;
            }
            var $tbody = $("#auditingTable tbody");
            for ( var i = 0; i < result.total; i++ ) {
                var $tr = null;
                var state = result.leases[i].state == "1" ? "已批准":"未批准";
  
                $tr = $("<tr><td>"+result.leases[i].lease_id+"</td><td><b>"+ result.leases[i].company_show_name
                        +"</b></td><td>"+result.leases[i].phone+"</td><td>"+result.leases[i].booth_num+"</td><td>"+result.leases[i].rent+"</td><td>"+state+"</td>"
                        + "<td class='center'> <a class='btn btn-success btn-xs'> <i class='glyphicon glyphicon-zoom-in icon-white'></i> 查看</a> <a class='btn btn-info btn-xs'>"+
                        " <i class='glyphicon glyphicon-edit icon-white'></i> 修改</a></td></tr>");
                
                $tr.attr("lease_id",result.leases[i].lease_id);
                $tr.on("click",function(e){
                    var $target = $(e.target);
                    if($target.hasClass("btn-success")||$target.parent().hasClass("btn-success")){
                        showLease($target.parents("tr").attr("lease_id"));
                    }
                    else if($target.hasClass("btn-info")||$target.parent().hasClass("btn-info")) {
                        editLease($target.parents("tr").attr("lease_id"));
                    }
                });
                $tbody.append($tr);
            }
            $("#auditingTable").dataTable(
                {
                    "order": [ 4, 'desc' ]
                }

            );
        }
    );
}

//proxy get list of leases_new without proxy_id
function getLeaseNewList() {
	var  newurl = "http://"+publicElement.ip+":"+publicElement.port+"/vmapAPI/lease!allSelectNew?floor_id="+publicElement.floor_id+"&jsoncallback=?";
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
                    $tr = $("<tr><td>"+result.leases[i].lease_id+"</td><td><b>"+ result.leases[i].company_show_name
                        +"</b></td><td>"+result.leases[i].phone+"</td><td>"+result.leases[i].booth_num+"</td><td>"+result.leases[i].rent+"</td><td>未审核</td>"
                        + "<td class='center'> <a class='btn btn-success btn-xs'> <i class='glyphicon glyphicon-zoom-in icon-white'></i> 查看</a> <a class='btn btn-info btn-xs'>"+
                        " <i class='glyphicon glyphicon-edit icon-white'></i> 审核</a></td></tr>");
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

//get lists for leases_old with proxy_id
function getLeaseOldList() {
    var  oldurl = "http://"+publicElement.ip+":"+publicElement.port+"/vmapAPI/lease!allSelectOld?floor_id="+publicElement.floor_id+"&jsoncallback=?";
    $.getJSON(
        oldurl,
        function( result ) {
            if ( !result.success ) {
                $("#auditingTable").dataTable();
                return;
            }
            var $tbody = $("#auditingTable tbody");
            for ( var i = 0; i < result.total; i++ ) {
                var $tr = null;
                var state = result.leases[i].state == "1" ? "已批准":"未批准";
  
                $tr = $("<tr><td>"+result.leases[i].lease_id+"</td><td><b>"+ result.leases[i].company_show_name
                        +"</b></td><td>"+result.leases[i].phone+"</td><td>"+result.leases[i].booth_num+"</td><td>"+result.leases[i].rent+"</td><td>"+state+"</td>"
                        + "<td class='center'> <a class='btn btn-success btn-xs'> <i class='glyphicon glyphicon-zoom-in icon-white'></i> 查看</a> <a class='btn btn-info btn-xs'>"+
                        " <i class='glyphicon glyphicon-edit icon-white'></i> 修改</a></td></tr>");
                
                $tr.attr("lease_id",result.leases[i].lease_id);
                $tr.on("click",function(e){
                    var $target = $(e.target);
                    if($target.hasClass("btn-success")||$target.parent().hasClass("btn-success")){
                        showLease($target.parents("tr").attr("lease_id"));
                    }
                    else if($target.hasClass("btn-info")||$target.parent().hasClass("btn-info")) {
                        editLease($target.parents("tr").attr("lease_id"));
                    }
                });
                $tbody.append($tr);
            }
            $("#auditingTable").dataTable(
                {
                    "order": [ 4, 'desc' ]
                }

            );
        }
    );
}

function showApply(proxy){
    var  url = "http://"+publicElement.ip+":"+publicElement.port+"/vmapAPI/apply!find?apply_id="+proxy+"&jsoncallback=?";
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
			$("#show_content").val(data.content);


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
			$("#lease_con_per").val(data.con_per);
			$("#lease_phone").val(data.phone);
			$("#lease_rent").val(data.rent);
            $("#lease_price").val(data.block_rent);
            $("#lease_tPrice").val(data.block_rent * data.block_area * data.block_discount);
            $("#lease_tonnage").val(data.block_tonnage);
            $("#lease_discount").val(data.block_discount);
			$("#lease_time").val(data.last_modify_time);
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
			
			$("#lease_edit_num").val(data.booth_num);
			$("#lease_edit_num").attr("lease_id",lease);
			$("#lease_edit_num").attr("unit_id",data.unit_id);
			$("#lease_edit_num").attr("version_id",data.version_id);
            $("#lease_edit_length").val(data.block_length);
            $("#lease_edit_width").val(data.block_width);
            $("#lease_edit_area").val(data.block_area);
			$("#lease_edit_con_per").val(data.con_per);
			$("#lease_edit_phone").val(data.phone);
			$("#lease_edit_rent").val(data.rent);
            $("#lease_edit_price").val(data.block_rent);
            $("#lease_edit_tPrice").val(data.block_rent * data.block_area * data.block_discount);
            $("#lease_edit_tonnage").val(data.block_tonnage);
            $("#lease_edit_discount").val(data.block_discount);
			$("#lease_edit_time").val(data.last_modify_time);
			$("#editLeaseModal").modal("show");
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

        }
    );
}

function editapply(proxy,state) {
    if(state == 2)
    {
        $("#editselfApply h3").text("修改回复");
    }
    if(state == 1)
    {
        $("#editselfApply h3").text("回复咨询");
    }
    var  url = "http://"+publicElement.ip+":"+publicElement.port+"/vmapAPI/apply!find?apply_id="+proxy+"&jsoncallback=?";
    $.getJSON(
        url,
        function (result) {
            if (!result.success) {
                return;
            }
            $("#editselfApply").modal("show");
            var data = result.apply[0];
            $("#edit_self_create").val(data.create_id);
            $("#edit_self_time").val(data.last_modify_time);
            $("#edit_self_title").val(data.title);
            $("#edit_self_reply").val(data.reply);
            $("#edit_self_content").val(data.content);

        }
    );

    $("#submit").on("click",function(e) {
       subapply(proxy);
    });
}

function subapply(proxy){

    var url = 'http://'+publicElement.ip+":"+publicElement.port+'/vmapAPI/edit!edit_apply?jsonstr=';
    var data = {
        title : $("#edit_self_title").val(),
        content: $("#edit_self_content").val(),
        reply: $("#edit_self_reply").val(),
        sign: "0",
        state: "1",
        create_id: $("#edit_self_create").val(),
        apply_id : proxy,
    };
    data = JSON.stringify(data);
    url += data+"&jsoncallback=?";
    console.log(url);
    $.post(url,function(data){
        //$("#closeD").trigger("click");
        location.reload();

    },"json");

}

$("#editL").on("click",function(e){
	if($("input:radio[name='radio']:checked").length){
	    var url = "http://"+publicElement.ip+":"+publicElement.port+"/vmapAPI/upda!update_lease?client=824&vkey=FFE58998-B203-B44E-A95B-8CA2D6CBCD65&jsonstr=";
	    var data = {
	        lease_id : $("#lease_edit_num").attr("lease_id"),
	        unit_id : $("#lease_edit_num").attr("unit_id"),
	        version : $("#lease_edit_num").attr("version_id"),
	        mark : $("#lease_edit_state").find("input[type=radio]:checked").val()
	    }
	    data = JSON.stringify(data);
	    url += data+"&jsoncallback=?";
	    console.log(url);
	    $.post(url,function(data){
	    	console.log(data);
	    	location.reload();
	    },"json");
	    $("#editLeaseModal").modal("hide");
	}
    return false;
})

//main entrance
$(document).ready(function(){
	publicElement.login_id = $("#login_proxy").attr("uid");
    publicElement.floor_id = $("#login_proxy").attr("fid");
    publicElement.proxy_state = $("#login_proxy").attr("state");
    if(publicElement.proxy_state == "0"){
    	getApplyNewList();
    	getApplyOldList();
    	getLeaseNewList();
    	$("#auditClick").on("click",function(){
    		if(!publicElement.showFlag){
    		    getLeaseOldList();
    		    publicElement.showFlag = true;
    		}
    	});
    }
    
    if(publicElement.proxy_state == "1"){
    	getApplyNew();
    	getApplyOld();
    	getLeaseNew();
    	$("#auditClick").on("click",function(){
    		if(!publicElement.showFlag){
    		    getLeaseOld();
    		    publicElement.showFlag = true;
    		}
    	});
    }
    
});