//global variable
var publicElement = (function () {
	this.ip = "10.103.240.91";
	this.port = "8888";
    return this;
})();

//get list of proxy
function getProxyList() {
	var  url = "http://"+publicElement.ip+":"+publicElement.port+"/vmapAPI/proxy!all?jsoncallback=?";
    $.getJSON(
        url,
        function( result ) {
            if ( !result.success ) {
				$("#proxyTable").dataTable();
                return;
            }
			var $tbody = $("#proxyTable tbody");
            for ( var i = 0; i < result.total; i++ ) {
				var $tr = $("<tr><td><a class='btn btn-primary btn-xs'><i class='glyphicon glyphicon-trash icon-white'></i> 删除</a></td><td>"+result.proxy[i].proxy_id
        +"</td><td>"+result.proxy[i].password+"</td><td>"+result.proxy[i].con_per
        +"</td><td><span class='label' style='background-color:#"+result.proxy[i].proxy_color+"'>"
        +result.proxy[i].proxy_color+"</span></td><td>"+result.proxy[i].floor_id+"</td><td>"+result.proxy[i].last_time
+"</td><td class='center'> <a class='btn btn-success btn-xs'> <i class='glyphicon glyphicon-zoom-in icon-white'></i> 查看</a> <a class='btn btn-info btn-xs'>"+
" <i class='glyphicon glyphicon-edit icon-white'></i> 编辑</a></td></tr>");
				
				$tr.attr("proxy_id",result.proxy[i].proxy_id);
				$tr.on("click",function(e){
					var $target = $(e.target); 
					if($target.hasClass("btn-info")||$target.parent().hasClass("btn-info")){
						editProxy($target.parents("tr").attr("proxy_id"));
					}else if($target.hasClass("btn-success")||$target.parent().hasClass("btn-success")){
						showProxy($target.parents("tr").attr("proxy_id"));
					}else if($target.hasClass("btn-primary")||$target.parent().hasClass("btn-primary")){
						deleteProxy($target.parents("tr").attr("proxy_id"));
					}
				});
				$tbody.append($tr);
            }	
			$("#proxyTable").dataTable();
        }
    );
	
}

//get list of users
function getUserList() {
	var  url = "http://"+publicElement.ip+":"+publicElement.port+"/vmapAPI/company!all?jsoncallback=?";
    $.getJSON(
        url,
        function( result ) {
            if ( !result.success ) {
				$("#usersTable").dataTable();
                return;
            }
			var $tbody = $("#usersTable tbody");
            for ( var i = 0; i < result.total; i++ ) {
				var $tr = $("<tr><td><a class='btn btn-primary btn-xs'><i class='glyphicon glyphicon-trash icon-white'></i> 删除</a></td><td>"
						+result.company[i].account+"</td><td>"+result.company[i].password+"</td><td>"+result.company[i].con_per
						+"</td><td>"+result.company[i].phone+"</td><td>"+result.company[i].email+"</td><td>"+result.company[i].last_time+"</td></tr>");
				
				$tr.attr("user_id",result.company[i].user_id);
				$tr.on("click",function(e){
					var $target = $(e.target); 
					if($target.hasClass("btn-primary")||$target.parent().hasClass("btn-primary")){
						deleteUser($target.parents("tr").attr("user_id"));
					}
				});
				$tbody.append($tr);
            }	
			$("#usersTable").dataTable();
        }
    );
	
}

function clearProxy(){
	$("#proxy_id").val("");
	$("#password").val("");
	$("#email").val("");
	$("#proxy_color").val("");
	$("#other_info").val("");
	$("#con_per").val("");
	$("#contact").val("");
    $(".colorPicker-picker").removeAttr("style");
    $(".colorPicker-picker").val("");
}

//show proxy
function showProxy(proxy){
	var  url = "http://"+publicElement.ip+":"+publicElement.port+"/vmapAPI/proxy!select?proxy_id="+proxy+"&jsoncallback=?";
    $.getJSON(
        url,
        function( result ) {
            if ( !result.success ) {
                return;
            }
			$("#showProxy").modal("show");
			var data = result.proxy[0];
			$("#show_id").val(data.proxy_id);
			$("#show_password").val(data.password);
			$("#show_contact").val(data.contact);
			$("#show_con_per").val(data.con_per);
			$("#show_email").val(data.email);
			$("#show_color").val(data.proxy_color);
			$("#show_color").attr("style","background-color:#"+data.proxy_color);
			$("#show_info").val(data.other_info);
			$("#show_time").val(data.last_time);
			$("#show_floor").val(data.floor_id);
	    }
    );
}

//delete proxy
function deleteProxy(proxy){
	var  url = "http://"+publicElement.ip+":"+publicElement.port+"/vmapAPI/proxy!delete?proxy_id="+proxy+"&jsoncallback=?";
    $.getJSON(
        url,
        function( result ) {
            if ( !result.success ) {
                return;
            }
			alert("删除成功!");
			location.reload();
		}
    );
}

//delete user
function deleteUser(user){
	var  url = "http://"+publicElement.ip+":"+publicElement.port+"/vmapAPI/company!delete?company_id="+user+"&jsoncallback=?";
    $.getJSON(
        url,
        function( result ) {
            if ( !result.success ) {
                return;
            }
			alert("删除成功!");
			location.reload();
		}
    );
}

//edit proxy
function editProxy(proxy){
	var  url = "http://"+publicElement.ip+":"+publicElement.port+"/vmapAPI/proxy!select?proxy_id="+proxy+"&jsoncallback=?";
    $.getJSON(
        url,
        function( result ) {
            if ( !result.success ) {
                return;
            }
			var data = result.proxy[0];
			$("#proxy_id").val(data.proxy_id);
			$("#password").val(data.password);
			$("#contact").val(data.contact);
			$("#con_per").val(data.con_per);
			$("#email").val(data.email);
			$("#proxy_color").val(data.proxy_color);
            $(".colorPicker-picker").val(data.proxy_color);
			$(".colorPicker-picker").attr("style","background-color:#"+data.proxy_color);
			$("#other_info").val(data.other_info);
			fillFloorSelector("1F7DEB46-1506-4BC5-9A64-EE2556ACA7B2","floor");
			$("#addProxy").modal("show");
	    }
    );
}

// submit proxy changes
function submitProxy() {
    var url = 'http://'+publicElement.ip+":"+publicElement.port+'/vmapAPI/edit!edit_proxy?jsonstr=';
    var data = {
		proxy_id:$("#proxy_id").val(),
        proxy_name: "",
		show_name: "",
        password: $("#password").val(),
        address: "",
        phone:"",
        email: $("#email").val(),
		con_per: $("#con_per").val(),
		contact: $("#contact").val(),
        proxy_color:$("#proxy_color").val(),
        other_info:$("#other_info").val(),
        floor_id:$("#floor").val()
    };
    data = JSON.stringify(data);
    url += data+"&jsoncallback=?";
	console.log(url);
    $.post(url,function(data){
        $("#addProxy").modal("hide");
		location.reload();
    },"json");
   // return false;
}

$("#addProxy").on('hidden.bs.modal',function(){
		clearProxy();
});

// add proxy 
function addProxy() {
    var url = 'http://'+publicElement.ip+":"+publicElement.port+'/vmapAPI/insert!insert_proxy?jsonstr=';
    var color = $("#add_proxy_color").val();
    if(color.indexOf("#") >= 0){
    	color = color.slice(1);
    }
    var data = {
        proxy_id : $("#add_proxy_id").val(),
        proxy_name: "",
		show_name: "",
        password: $("#add_password").val(),
        address:"",
        phone: "",
        email: $("#add_email").val(),
		con_per: $("#add_con_per").val(),
		contact: $("#add_contact").val(),
        proxy_color:color,
        other_info:$("#add_other_info").val(),
        floor_id:$("#add_floor").val()
    };
    data = JSON.stringify(data);
    url += data+"&jsoncallback=?";
	console.log(url);
	 $.getJSON(
        url,
        function( result ) {
            if ( !result.success ) {
                alert(result.message);
                $("#add_proxy_id")[0].focus();
            }
			else{
				location.reload();
			}	
	    }
    );
	 return false;
}

//fill floor selector
function fillFloorSelector(unitId,id) {
    var url = "http://"+publicElement.ip+":"+publicElement.port+"/vmapAPI/floor!search?client=824&vkey=FFE58998-B203-B44E-A95B-8CA2D6CBCD65&place="+unitId+"&jsoncallback=?";
    var $floorSelectorList = $("#"+id);
    $.getJSON(
        url,
        function(result) {
            if ( !result.success ) {
                return false;
            }
            for ( var i = 0; i < result.total; i++ ) {
                var d = result.rows[i];
                var $option = $('<option  value="'+d.floor_id+'">'+d.floor_chn+'</option>');
                if ( i == 0 ) {
                	$option.addClass("selected");
                }
                $floorSelectorList.append($option);
            }
        }
    );
}

//proxy submit button submit 
    $("#subP").on("click",function(event) {
		if($("#info_form").get(0).checkValidity()){
				submitProxy();
                return false;
         }
    });
	
    $("#submitP").on("click",function(event) {
		if($("#add_form").get(0).checkValidity()){
				addProxy();
                return false;
         }
    });
    
 //download excel
    $(".downloadExcel").click(function(event){   
        var url = "http://"+publicElement.ip+":"+publicElement.port+"/vmapAPI/download!getUserData?jsoncallback=?";
        $.getJSON(
            url,function(data){
                if( !data.success ){
                    alert(data.success);
                    return;
                }
                location.href = "http://"+publicElement.ip+":"+publicElement.port+"/vmapAPI/userData.xls";
            }
        );
        event.stopPropagation();
    });
    
//main entrance
$(document).ready(function(){
    getProxyList();
    getUserList();
    fillFloorSelector("1F7DEB46-1506-4BC5-9A64-EE2556ACA7B2","add_floor");
    $('#proxy_color').colorPicker();
    $('#add_proxy_color').colorPicker();
});