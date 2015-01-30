//global variable
var publicElement = (function () {
	this.ip = "10.103.240.91";
	this.port = "8888";
    this.unitList = null;
    this.unitId = null;
    this.version = null;
    this.floorId = null;
    this.map = null;
    this.$infoDiv = null;
    this.edit = false;
    this.getHistoryListCallback = null;
    this.editState = null;
    this.changePoints = null;
    this.editUnitId = null;
    this.menuList = null;
    this.idList = [];
    this.mergeridList = null;
    this.boothData = null;
    this.boothObj = null;
    this.boothJson = null;
    this.login_id = null;
    return this;
})();

//get list of unit of menubar
function getUnitList() {
    var  url = "http://"+publicElement.ip+":"+publicElement.port+"/vmapAPI/unit!search?client=824&vkey=FFE58998-B203-B44E-A95B-8CA2D6CBCD65&jsoncallback=?";
    $.getJSON(
        url,
        function( result ) {
            if ( !result.success ) {
                return;
            }
            $("#viewList").empty();
            publicElement.unitList = result.rows;
            for ( var i = 0; i < result.total; i++ ) {
                var $element = $("<li><a href='#'><span>"+result.rows[i].name+"</span></a></li>");
                $element.attr("unitId",result.rows[i].unit_id);
                $element.addClass("accordion");
                $("#viewList").append($element);
            }
        }
    );
}

//get version list of an unit
function getVersionList(unitId) {
    var url = "http://"+publicElement.ip+":"+publicElement.port+"/vmapAPI/unit!version?client=824&vkey=FFE58998-B203-B44E-A95B-8CA2D6CBCD65&unit="+unitId+"&jsoncallback=?"; 
    var $versionTable = $("#versionList");
    var $versionTri = $("#versionTri");
    var $versionButton = $("#versionButton");
    var $versionTitle = $("#versionTitle");
    var idFlag = -1;
    $versionTable.empty();
    $.getJSON(
        url,
        function(result) {
            if ( !result.success || result.total === 0 ) {
                $versionTri.addClass("disabled");
                $versionTitle.html("无可用版本");
                return false;
            }
            $versionButton.show();
            $versionTri.removeClass("disabled");
            for ( var i = 0; i < result.total; i++ ) {
            	  if( result.rows[i].isAvailable == 1) {
            		 idFlag = i;
	                var $li = $('<li><a href="#">'+result.rows[i].version+'</a></li>');
	                $li.addClass("active");          
	                $li.attr("version",result.rows[i].version);
	                $li.attr("vid",result.rows[i].id);
	                $li.attr("available",result.rows[i].isAvailable);
	                $versionTable.append($li);
	                
	                    $li = $('<li><a href="#">销售进度图</a></li>');
	                    $li.attr("version",result.rows[i].version);
	                    $li.attr("vid",result.rows[i].id);
	                    $li.attr("available",2);
	                    $versionTable.append($li);
            	  }  
            }
            $("#editMenuList").hide();
            $("#add_box").hide();
            $("#state_box").hide();
            if(result.rows[0].isAvailable == 1){
                $("#editMenuList").show();
                $("#add_box").show();
            }
            if(idFlag != -1){
            	$versionTitle.html(result.rows[idFlag].version);
            	publicElement.version = result.rows[idFlag].id;
            }
            if ( getHistoryListCallback ) {
                getHistoryListCallback();
            }
        }
    );
}

//fill floor selector
function fillFloorSelector(unitId) {
    var url = "http://"+publicElement.ip+":"+publicElement.port+"/vmapAPI/floor!search?client=824&vkey=FFE58998-B203-B44E-A95B-8CA2D6CBCD65&place="+unitId+"&jsoncallback=?";
    var $floorSelectorList = $("#floorSelectorList");
    $floorSelectorList.empty();
    $.getJSON(
        url,
        function(result) {
            if ( !result.success ) {
                return false;
            }
            for ( var i = 0; i < result.total; i++ ) {
                var d = result.rows[i];
                var $li = $('<a href="#" class="list-group-item" id="'+d.floor_id+'">'+d.floor_chn+'</a>');
                if ( i == 0 ) {
                    $li.addClass("active");
                }
                $floorSelectorList.append($li);
            }
            publicElement.floorId = result.rows[0].floor_id;
            $("#toolbar").show();
            $("#scale_box").show();
            publicElement.map.showMap = null;
            refreshMap();
        }
    );
}

//bind event of buttons and menu
function bindEvent() {

    //bind map event
    var map = publicElement.map;
    
    $("#floorSwitch").on("click",function(){
        $("#floorModal").modal("show");
    });
    $("#showFacilities").click(map.toggleFacilities);
	$("#zoomIn").click(map.zoomIn);
	$("#zoomOut").click(map.zoomOut);
    
    $("#downloadPDF").click(publicElement.map.downloadPDF);
    
    $("#profile").click( function(){
        showProxy(publicElement.login_id);
    })
    $("#downloadExc").click(function(){   
  
        var url = "http://"+publicElement.ip+":"+publicElement.port+"/vmapAPI/download!targetfile?jsonstr="
        var data = {
            unit_id : publicElement.unitId,
            floor_id : publicElement.floorId,
            version : publicElement.version,
            proxy_id : publicElement.login_id
        }
        data = JSON.stringify(data);
        url += data+"&jsoncallback=?"; 
        $.getJSON(
            url,function(data){
                if( !data.success ){
                    alert(data.success);
                    return;
                }
                location.href = "http://"+publicElement.ip+":"+publicElement.port+"/vmapAPI/"+publicElement.login_id+".xls";
            }
        );
    });
    //bind event of viewlist
    $("#viewList").on("click","li",function(e){
        var $target = $(e.target);
        if ( $target.prop("tagName") === "UL" ) {
        } else {
            while( $target.prop("tagName") !== "LI" ) {
                $target = $target.parent();
            }
            $("#viewList > .active").removeClass("active");
            $target.addClass("active");
            publicElement.unitId = $target.attr("unitId");
            publicElement.getHistoryListCallback = function() {
                fillFloorSelector($target.attr("unitId"));
            }
            getVersionList($target.attr("unitId"));
        }
        return;
    });
    
    //bind event of floorSelectorList selector
    $("#floorSelectorList").on("click","a",function(e){
        var $target = $(e.target);
        if ( $target.prop("tagName") === "UL" ) {
        } else {
            while( $target.prop("tagName") !== "A" ) {
                $target = $target.parent();
            }
            $("#floorSelectorList > .active").removeClass("active");
            $target.addClass("active");
            publicElement.floorId = $target.attr("id");
            publicElement.map.showMap = null;
            refreshMap();
            $("#floorModal").modal("hide");
        }
    });
    
    //bind event of version selector
    $("body").on("click","#versionList",function(e){
        resetState();
        var $target = $(e.target);
        if ( $target.prop("tagName") === "UL" ) {
        } else {
            while( $target.prop("tagName") !== "LI" ) {
                $target = $target.parent();
            }
            $("#versionList > .active").removeClass("active");
            $target.addClass("active");
            publicElement.version = $target.attr("vid");
            var $versionTitle = $("#versionTitle");
            $versionTitle.html($target.text());
            $("#editMenuList").hide();
            $("#add_box").hide();
            $("#state_box").hide();
            if($target.attr("available") == 1){
               $("#editMenuList").show();
                $("#add_box").show();
            }
            publicElement.map.showMap = null;
            if( $target.attr("available") == 2){
                $("#state_box").show();
                publicElement.map.madeMap(publicElement.unitId,publicElement.floorId,publicElement.version);
            }else{
                refreshMap();
            }
        }
    });
    
    //bind event for add_box
    $("#add_box").on("click","button",function(e){
        if( $(e.target).attr("id") == "done" ){
            if(publicElement.editState === "add"){
                map.saveAdd();
                addSubmit();
            }
            if(publicElement.editState === "merger"){
                publicElement.map.mergerBooths();
                mergerSubmit();  
            }
            if(publicElement.editState === "ass"){
                getProxy();
            }
        }
        
    });
      
    //reset state when click view menu
    $("#view").on("click",function(e){
        resetState();
        if(publicElement.editState === "ass"){
                refreshMap();
        }
        publicElement.map.removeLayer();
       // return false;
    });
  
    //bind event of search button
    $("#searchButton").on("click",function(e){
        var url = "http://"+publicElement.ip+":"+publicElement.port+"/vmapAPI/unit!query?client=824&vkey=FFE58998-B203-B44E-A95B-8CA2D6CBCD65&key=";
        var keyStr = "";
        $("#searchType input[name='type']:checked").each(function(){
        	keyStr += $(this).val()+";";
        });
        url+= keyStr+"&version="+publicElement.version+"&unit="+publicElement.unitId+"&floor="+publicElement.floorId+"&low="+ $("#search_low").val()+"&high="+ $("#search_high").val()+"&jsoncallback=?";
        console.log(url);
        $.getJSON(
            url,
            function(result) {
	        	  if($("#searchTable").length != 0){
	              	$("#searchTable_wrapper").remove();
	              }
                if ( !result.success ) {
                    return false;
                }
                $table = $('<table class="table table-striped table-bordered table-condensed" id="searchTable"><thead><tr><th>编号</th><th>面积</th><th>吨位</th></tr></thead><tbody id="searchTableTbody"></tbody></table>');
                $("#panel_search").append($table);
                var $searchTable = $("#searchTableTbody");
                $searchTable.empty();
                var i = 0;
                var $tr;
                for ( i in result.rows ) {
                	$tr = $("<tr><td><a>"+result.rows[i].booth_num+"</a></td><td>"+result.rows[i].block_area+"</td><td>"+result.rows[i].block_tonnage+"</td></tr>");
                	$tr.attr("unitId",result.rows[i].unit_id);
                	$searchTable.append($tr);
                }
                $('#searchTable').dataTable();
            }
        );
    });
    
    //bind event of search result
    $("#panel_search").on("click","a",function(e) {
        var $target = $(e.target).parents("tr");
        var uId = $target.attr("unitId");

            var obj = publicElement.map.search(uId);
            if ( null === obj ) {
                return;
            }
            var $dom = $(map.mapDiv);
            if ( publicElement.$infoDiv ) {
                publicElement.$infoDiv.remove();
                publicElement.$infoDiv = null;
            }
            if(obj.block_state == '1'){
                 var $infoDiv = $('<div><span>×</span><h5 class="title">'+obj.block_show_name+'</h5>'+
            		'<p class="text-left">联系方式：'+obj.phone+'</p><p class="text-left">联系人：'+obj.con_per+'</p><div class="info_arrow"></div></div>');
                 $infoDiv.css({'left':obj.x - 90,
                     'top':obj.y-70
                    });
            }else{
                 var $infoDiv = $('<div><span>×</span><h5 class="title">'+obj.booth_num+'</h5>'+
            		'<p class="text-left">招商电话：131xxxxxxxx</p><p class="text-left">招商专员：李某某</p>'
                    +'<p class="text-left">商铺面积：'+obj.block_area+'</p>'+
                    '<p class="text-left">商铺吨位：'+obj.block_tonnage+'</p>'+
                    '<p class="text-left">商铺租金：'+obj.block_price+'</p>'+
                             '<h5><button id="apply" class="btn btn-success btn-xs">我要申请</button>&nbsp;&nbsp;'
                    +' <button id="message" class="btn btn-success btn-xs" style="margin-left: 2px;">我要咨询</button></h5><div class="info_arrow"></div></div>');
                 $infoDiv.css({'left':obj.x - 90,
                     'top':obj.y-160
                    });
            }
           
            $infoDiv.attr("id","infoDiv");
            $dom.append($infoDiv);
            publicElement.map.move(400-obj.x, 300-obj.y);
            publicElement.$infoDiv = $infoDiv;
            $infoDiv.find('#apply').on("click",function() {
                showApply(obj.unitId);
                publicElement.$infoDiv = null;
                $infoDiv.remove();
            });
            
            $infoDiv.find('#message').on("click",function() {
                showMessage(obj.unitId);
                publicElement.$infoDiv = null;
                $infoDiv.remove();
            });
            
            $infoDiv.children('span').on("click",function() {
            	publicElement.$infoDiv = null;
                $infoDiv.remove();
            });
    });

    $("#subL").on("click", function(){
        addApplySubmit();
    })
    
    $("#subM").on("click", function(){
    	if($("#message_form").get(0).checkValidity()){
    		addMessageSubmit();
    		return false;
    	}
    })
}

//submit apply
function addApplySubmit(){
    var addurl = "http://"+publicElement.ip+":"+publicElement.port+"/vmapAPI/insert!insert_lease?jsonstr=";
            var data = {
                company_id : publicElement.login_id,
                unit_id : $("#apply_num").attr("unitid"),
                version : publicElement.version,
                rent : $("#apply_rent").val(),
                floor_id:publicElement.floorId
            }
            data = JSON.stringify(data);
            addurl += data+"&jsoncallback=?";
            console.log(addurl);
            $.post(addurl,function(data){
                console.log(data);
            },"json");

    $("#applyModal").modal("hide");
}

function addMessageSubmit(){
    var url = 'http://'+publicElement.ip+":"+publicElement.port+'/vmapAPI/insert!insert_apply?jsonstr=';
    var data = {
            title : $("#message_title").val(),
            content: $("#message_content").val(),
            reply: "",
            sign: "0",
            state: "0",
            send_id: $("#message_num").attr("unitid")+";",
            create_id: publicElement.login_id,
            floor_id: publicElement.floorId,
            version_id : publicElement.version
        };
            data = JSON.stringify(data);
            url += data+"&jsoncallback=?";
            console.log(url);
            $.post(url,function(data){
                console.log(data);
            },"json");

    $("#messageModal").modal("hide");
}

function resetState() {
    if(publicElement.editState != null){
        $("#" +publicElement.editState+ "A").removeClass("active");
        if(publicElement.editState === "ass"){
                publicElement.idList = [];
                publicElement.map.bindClick("detail");
        }
    }
    publicElement.editState = null;
}

function refreshMap() {  
    if ( publicElement.$infoDiv ) {
                publicElement.$infoDiv.remove();
                publicElement.$infoDiv = null;
    }
    
    if ( !publicElement.map ) {
        mapInit();
    }
    publicElement.map.changefloor(publicElement.unitId,publicElement.floorId,publicElement.version);
}

function mapInit() {
    publicElement.login_id = $("#login_proxy").attr("uid");
    publicElement.map = new Vmap("map_frame");	
    var map = publicElement.map;
    
    map.bindClick("detail");
    if ( publicElement.login_id != "visitor" ){
    	$('#block_color').colorPicker();
        $('#font_color').colorPicker();
    }
    
    //sava unitid
    map.saveUUID = function (obj) {
        if( publicElement.idList.length == 0){
            publicElement.idList.push(obj.unitId);
        } else {
            if (publicElement.idList.indexOf(obj.unitId) < 0){
                publicElement.idList.push(obj.unitId);
            }
        }
        console.log(publicElement.idList);
    }
    
    //get merger units
    map.mergerClicks = function (obj) {
        publicElement.mergeridList = obj.idlist;
        publicElement.changePoints = obj.data;
    }
    
    //click the map when in show model
    map.showBooth = function (obj) {
        var $dom = $(map.mapDiv);
        if ( publicElement.$infoDiv ) {
            publicElement.$infoDiv.remove();
            publicElement.$infoDiv = null;
        }
        if(obj.block_state == '1'){
             var $infoDiv = $('<div><span>×</span><h5 class="title">'+obj.block_show_name+'</h5>'+
        		'<p class="text-left">联系方式：'+obj.phone+'</p><p class="text-left">联系人：'+obj.con_per+'</p><div class="info_arrow"></div></div>');
             $infoDiv.css({'left':obj.x - 90,
                 'top':obj.y-70
                });
        }else{
             var $infoDiv = $('<div><span>×</span><h5 class="title">'+obj.booth_num+'</h5>'+
        		'<p class="text-left">招商电话：131xxxxxxxx</p><p class="text-left">招商专员：李某某</p>'
                +'<p class="text-left">商铺面积：'+obj.block_area+'</p>'+
                '<p class="text-left">商铺吨位：'+obj.block_tonnage+'</p>'+
                '<p class="text-left">商铺租金：'+obj.block_price+'</p>'+
                         '<h5><button id="apply" class="btn btn-success btn-xs">我要申请</button>&nbsp;&nbsp;'
                +' <button id="message" class="btn btn-success btn-xs" style="margin-left: 2px;">我要咨询</button></h5><div class="info_arrow"></div></div>');
             $infoDiv.css({'left':obj.x - 90,
                 'top':obj.y-160
                });
        }
       
        $infoDiv.attr("id","infoDiv");
        
        $dom.append($infoDiv);
        publicElement.$infoDiv = $infoDiv;
        $infoDiv.find('#apply').on("click",function() {
            showApply(obj.unitId);
            publicElement.$infoDiv = null;
            $infoDiv.remove();
        });
        
        $infoDiv.find('#message').on("click",function() {
            showMessage(obj.unitId);
            publicElement.$infoDiv = null;
            $infoDiv.remove();
        });
        
        $infoDiv.children('span').on("click",function() {
        	publicElement.$infoDiv = null;
            $infoDiv.remove();
        });
         
    }
    
    map.showFacility = function(obj) {
        alert(obj.facilityName);
    }
    
    map.saveBooth = function(points) {
        publicElement.changePoints = points;
    };
    
    map.zoom = function() {
        if ( publicElement.$infoDiv ) {
            publicElement.$infoDiv.remove();
            publicElement.$infoDiv = null;
        }
    }

}

//show message
function showMessage(uId) {
    var url = "http://"+publicElement.ip+":"+publicElement.port+"/vmapAPI/change!unit?client=824&vkey=FFE58998-B203-B44E-A95B-8CA2D6CBCD65&unit="+uId+"&version="+publicElement.version+"&jsoncallback=?";
    $.getJSON(url,
              function( data ) {
                  if ( !!!data.success ) {
                      return;
                  }
                  var d = data.rows[0];
                  $("#message_num").val(d.booth_num);
                  $("#message_num").attr("unitid",uId);
                  $("#message_proxy_id").val(d.proxy_id);
                  $("#messageModal").modal("show");
              });
}

//show apply 
function showApply(uId) {
    var url = "http://"+publicElement.ip+":"+publicElement.port+"/vmapAPI/lease!select_companys?unit_id="+uId+"&version_id="+publicElement.version+"&jsoncallback=?";
	    $.getJSON(url,
	              function( data ) {
	                  if ( !!!data.success ) {
	                      return;
	                  }
	                  var d = data.rows[0];
	                  $("#apply_length").val(d.block_length);
	                  $("#apply_width").val(d.block_width)
	                  $("#apply_area").val(d.block_area);
                      
                      $("#apply_price").val(d.block_rent);
	                  $("#apply_tonnage").val(d.block_tonnage)
	                  $("#apply_discount").val(d.block_discount);
                      $("#apply_tPrice").val(d.block_rent * d.block_area * d.block_discount);
            
	                  $("#apply_num").val(d.booth_num);
	                  $("#apply_num").attr("unitid",uId);
                      $("#apply_rent").val("");
            
                      $("#applyModal").modal("show");
                });
}

//show proxy
function showProxy(proxy){
	var  url = "http://"+publicElement.ip+":"+publicElement.port+"/vmapAPI/company!select?company_id="+proxy+"&jsoncallback=?";
    $.getJSON(
        url,
        function( result ) {
            if ( !result.success ) {
                return;
            }
			$("#showProxy").modal("show");
			var data = result.company[0];
		
			$("#show_showname").val(data.show_name);
			$("#show_contact").val(data.contact);
			$("#show_con_per").val(data.con_per);
			$("#show_phone").val(data.phone);
			$("#show_email").val(data.email);

	    }
    );
}
//main entrance
$(document).ready(function(){
    mapInit();
    $("#view > a").trigger("click");
    getUnitList(); 
    bindEvent();
});