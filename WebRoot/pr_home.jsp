<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE html>
<html lang="en">
  <head>
  
  <title>商铺管理</title>
  	 <meta name="viewport" content="user-scalable=no, width=device-width, initial-scale=1, maximum-scale=1">
  	 <meta http-equiv="pragma" content="no-cache">
    <meta http-equiv="cache-control" content="no-cache">
    <meta http-equiv="cache-control" content="no-store">
    <meta http-equiv="expires" content="0">
        <%
	        response.setHeader("Pragma","No-cache");          
	        response.setHeader("Cache-Control","no-cache");   
	        response.setHeader("Cache-Control", "no-store");   
	        response.setDateHeader("Expires",0);  
 		%>
    <link id="bs-css" href="css/bootstrap-cerulean.min.css" rel="stylesheet">
    <link href="css/charisma-app.css" rel="stylesheet">
    <link href='css/noty_theme_default.css' rel='stylesheet'>
    <link href='css/animate.min.css' rel='stylesheet'>
    <link href='css/colorPicker.css' rel='stylesheet'>
	<link href='css/style.css' rel="stylesheet">
    <style type="text/css">
      @font-face{
      font-family: vmap;
	  src: url('VMapPublic.ttf');
      }
	  .label{
		color:#fff;
	  }
    </style>
    <!-- The fav icon -->
    <link rel="shortcut icon" href="img/favicon.ico">
  </head>
  <body>
  
<div class="navbar navbar-default" role="navigation">

        <div class="navbar-inner">
            <button type="button" class="navbar-toggle pull-left animated flip">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <img alt="Charisma Logo" src="img/logo20.png" class="hidden-xs" style="float:left;margin-left: 10px;"/>
            <a class="navbar-brand" href="#"> <span>商铺管理系统</span></a>

            <!-- user dropdown starts -->
            <div class="btn-group pull-right theme-container animated tada">
                <button class="btn btn-default dropdown-toggle" data-toggle="dropdown">
                    <i class="glyphicon glyphicon-user"></i>
                    <span class="hidden-sm hidden-xs" id="login_proxy" uid="${sessionScope.proxy.proxy_id}" 
					fid="${sessionScope.proxy.floor_id}" state="${sessionScope.proxy.state}"> ${sessionScope.proxy.con_per}</span>
                    <span class="caret"></span>
                </button>
                <ul class="dropdown-menu">
                    <li><a href="#">个人资料</a></li>
                    <li class="divider"></li>
                    <li><a href="indexOut">注销</a></li>
                </ul>
            </div>
     </div>
</div>

   <div class="ch-container">
    <div class="row">
        <!-- left menu starts -->
        <div class="col-sm-2 col-lg-2">
          <div>
			  <ul class="breadcrumb">
				<li>
					<a href="#">主页</a>
				</li>
				<li>
					<a href="#">商铺管理</a>
				</li>
				</ul>
		  </div>
		  <div class="sidebar-nav">
            <div class="nav-canvas">
              <div class="nav-sm nav nav-stacked">
              </div>
              <ul id = "leftMenu" class="nav nav-pills nav-stacked main-menu">
                <li id = "view" class="accordion active">
                  <a href="#"><i class="glyphicon glyphicon-home"></i><span>  商铺管理</span></a>
					<ul id="viewList" class="nav nav-pills nav-stacked">						
					</ul>
                </li>
				<li>
					<a href="pr_apply.jsp"><i class="glyphicon glyphicon-comment"></i><span>  消息管理</span></a>
				</li>
              </ul>

            </div>
          </div>
        </div>
        <!--/span-->
        <!-- left menu ends -->

        <noscript>
          <div class="alert alert-block col-md-12">
            <h4 class="alert-heading">警告!</h4>
            <p>You need to have <a href="http://en.wikipedia.org/wiki/JavaScript" target="_blank">JavaScript</a>
              enabled to use this site.</p>
          </div>
        </noscript>
		
        <div id="content" class="col-lg-10 col-sm-10" style="height:700px;padding:0;">
          <!-- content starts -->
			
			<!-- map tool bar -->
				<div id="toolbar" class="btn-toolbar" role="toolbar">
					<div id="versionButton" class="btn-group">
					  <button id="versionTitle" type="button" class="btn btn-success">版本选择</button>
					  <button id="versionTri" type="button" class="btn btn-success dropdown-toggle" data-toggle="dropdown">
						<span class="caret"></span>
						<span class="sr-only"></span>
					  </button>
					  <ul id="versionList" class="dropdown-menu" role="menu">
					  </ul>
					</div>
					
					
					<div class="btn-group" id="editMenuList">
					  <!-- 
					  <button  id="assA" class="btn btn-info">
					  分配</button> 
					
					  <button id="saleA" class="btn btn-info">
					  出租</button> -->
					  <button id="mergerA" class="btn btn-info">
					  合并</button>
					  <button id="splitA" class="btn btn-info">
					  拆分</button>
					  <!--  
					  <button id="fillA" class="btn btn-info">
					  涂色</button> -->
					
					  <button id="addA" class="btn btn-info">
					  添加</button>
					  <button id="deleteA" class="btn btn-info">
					  删除</button>
					  <button id="modifyA" class="btn btn-info">
						修改</button>
					</div>
					
					
					<div class="btn-group" id="add_box">
					  <button id="done" type="button" class="btn btn-info">
					  完成</button>
					</div>
					
					<div class="btn-group">
					  <button id="downloadPDF" type="button" class="btn btn-primary">
					  PDF</button>
					  <button id="downloadExc" type="button" class="btn btn-primary">
					  Excel</button>
					</div>
					<div class="btn-group" id="state_box">
					  <button  class="btn btn-defaul" style="background-color:#e6eece" disabled="disabled">未租</button>
					  <!--<button  class="btn btn-info" disabled="disabled">签约</button>-->
					  <button  class="btn btn-primary" disabled="disabled">已租</button>
					</div>	
				</div>
		<!-- put your map here -->
		  <div id="map_frame">
		  </div>
	      
		  <div id="cantainer" style="display:none"><img id="image"/></div>
		  
		  <div id="scale_box">
			<div class="btn-group-vertical">
              <a id="floorSwitch" class="btn btn-default" title="楼层选择">
				<i class="glyphicon glyphicon-sort"></i>
			  </a>
			  <a class="btn btn-default" id="zoomIn" href="#" title="放大">
				<i class="glyphicon glyphicon-zoom-in"></i>
			  </a>
			  <a class="btn btn-default" id="zoomOut" href="#" title="缩小">
				<i class="glyphicon glyphicon-zoom-out"></i>
			  </a>
			  <a class="btn btn-default" id="showFacilities" href="#" title="公共设施">
				<i class="glyphicon glyphicon-info-sign"></i>
			  </a>
			 
			</div>
		  </div>

        </div><!--/#content.col-md-0-->
    </div><!--/fluid-row-->
    </div>

 <footer>
		<div class="jumbotron" style="margin-top:25px">
		        <div class="container">		
					<div class="row">
						<div class="col-xs-12">
							<div class="submit">
								<p class="text-center"> <a>商铺管理系统</a></p>
								<p class="text-center">Copyright&copy; 2014</p>
							</div>
						</div>
					</div>				
				</div>
		</div>
</footer>
	
	<!--modals-->
	  <div class="modal fade" id="floorModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal">×</button>
	    	  <h3 class="modal-title" id="myModalLabel">楼层选择</h3>
            </div>
            <div class="modal-body">
              <div id="floorSelectorList" class="list-group text-center">
	            
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
            </div>
          </div>
        </div>
      </div>
	  
	  
	  <div class="modal fade" id="applyModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content"> 
            <div class="modal-body">
				<ul class="nav nav-pills" id="myTab">
					<li class="active"><a href="#applyDetail" data-toggle="pill">详细信息</a></li>
					<li><a href="#applyCompanys" data-toggle="pill">已有申请</a></li>
				</ul>
				<!-- Tab panes -->
			<div class="tab-content">
				 <div class="tab-pane fade in active" id="applyDetail">
				<span>&nbsp;</span>
				<form  class="form-horizontal" role="form">	
					<div class="form-group form-group-sm">
						<label class="col-sm-3 control-label">商铺编号</label>
						<div class="col-sm-8"><input type="text" class="form-control" id="apply_num"></div>
					</div>
					<div class="form-group form-group-sm">
						<label class="col-sm-3 control-label">商铺类型</label>
						<div class="col-sm-8"><input type="text" class="form-control" id="apply_type"></div>
					</div>
                    <div class="form-group form-group-sm">
						<label class="col-sm-3 control-label">长度</label>
						<div class="col-sm-8"><input type="text" class="form-control" id="apply_length"></div>
					</div>
					<div class="form-group form-group-sm">
						<label class="col-sm-3 control-label">宽度</label>
						<div class="col-sm-8"><input type="text" class="form-control" id="apply_width"></div>
					</div>
					<div class="form-group form-group-sm">
						<label class="col-sm-3 control-label">面积</label>
						<div class="col-sm-8"><input type="text" class="form-control" id="apply_area"></div>
					</div>
					
                    <div class="form-group form-group-sm">
						<label class="col-sm-3 control-label">单位租金</label>
						<div class="col-sm-8 input-group input-group-sm" style="padding-left: 15px;padding-right: 15px;">
                            <input type="text" class="form-control" id="apply_rent">
                            <span class="input-group-addon">元/平方米</span>
                        </div>
					</div>
                    <div class="form-group form-group-sm">
						<label class="col-sm-3 control-label">折扣率</label>
						<div class="col-sm-8"><input type="text" class="form-control" id="apply_discount"></div>
					</div>
                    <div class="form-group form-group-sm">
						<label class="col-sm-3 control-label">租金</label>
						<div class="col-sm-8 input-group input-group-sm" style="padding-left: 15px;padding-right: 15px;">
                            <input type="text" class="form-control" id="apply_rents">
                            <span class="input-group-addon">元</span>
                        </div>
					</div>
                    <div class="form-group form-group-sm">
						<label class="col-sm-3 control-label">吨位</label>
						<div class="col-sm-8"><input type="text" class="form-control" id="apply_tonnage"></div>
					</div>
                   
					<div class="form-group form-group-sm">
						<label class="col-sm-3 control-label">开放时间</label>
						<div class="col-sm-8"><input type="text" class="form-control" id="apply_time"></div>
					</div>
					<div class="form-group form-group-sm">
						<label class="col-sm-3 control-label">专员帐号</label>
						<div class="col-sm-8"><input type="text" class="form-control" id="apply_proxy_id"></div>
					</div>

				</form>
				
			  </div>
					<div class="tab-pane fade" id="applyCompanys">
						<table class="table table-striped table-bordered table-condensed" id="applyTable" align="center">
						   <thead>
							<tr>
								<th>申请帐号</th>
								<th>联系方式</th>
								<th>状态</th>
								<th>修改状态</th>
								<th>操作</th>
							</tr>
							</thead>
							<tbody id="applyTableBody">  
							</tbody>
						</table>
					</div>
			 </div>
            </div>
            <div class="modal-footer">
              <a href="#" class="btn btn-default" data-dismiss="modal">关闭</a>
            </div>
          </div>
        </div>
      </div>
	  
	  
	   <div class="modal fade" id="generalModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content"> 
          	<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal">×</button>
						<h3>商铺信息</h3>
			</div>
            <div class="modal-body">
				<form  class="form-horizontal" role="form">	
					<div class="form-group form-group-sm">
						<label class="col-sm-3 control-label">商铺编号</label>
						<div class="col-sm-8"><input type="text" class="form-control" id="general_num"></div>
					</div>
					<div class="form-group form-group-sm">
						<label class="col-sm-3 control-label">商铺类型</label>
						<div class="col-sm-8"><input type="text" class="form-control" id="general_type"></div>
					</div>
                    <div class="form-group form-group-sm">
						<label class="col-sm-3 control-label">长度</label>
						<div class="col-sm-8"><input type="text" class="form-control" id="general_length"></div>
					</div>
					<div class="form-group form-group-sm">
						<label class="col-sm-3 control-label">宽度</label>
						<div class="col-sm-8"><input type="text" class="form-control" id="general_width"></div>
					</div>
					<div class="form-group form-group-sm">
						<label class="col-sm-3 control-label">面积</label>
						<div class="col-sm-8"><input type="text" class="form-control" id="general_area"></div>
					</div>
					
                    <div class="form-group form-group-sm">
						<label class="col-sm-3 control-label">单位租金</label>
						<div class="col-sm-8 input-group input-group-sm" style="padding-left: 15px;padding-right: 15px;">
                            <input type="text" class="form-control" id="general_rent">
                            <span class="input-group-addon">元/平方米</span>
                        </div>
					</div>
                    <div class="form-group form-group-sm">
						<label class="col-sm-3 control-label">折扣率</label>
						<div class="col-sm-8"><input type="text" class="form-control" id="general_discount"></div>
					</div>
                    <div class="form-group form-group-sm">
						<label class="col-sm-3 control-label">租金</label>
						<div class="col-sm-8 input-group input-group-sm" style="padding-left: 15px;padding-right: 15px;">
                            <input type="text" class="form-control" id="general_rents">
                            <span class="input-group-addon">元</span>
                        </div>
					</div>
                    <div class="form-group form-group-sm">
						<label class="col-sm-3 control-label">吨位</label>
						<div class="col-sm-8"><input type="text" class="form-control" id="general_tonnage"></div>
					</div>
                   
					<div class="form-group form-group-sm">
						<label class="col-sm-3 control-label">开放时间</label>
						<div class="col-sm-8"><input type="text" class="form-control" id="general_time"></div>
					</div>
					<div class="form-group form-group-sm">
						<label class="col-sm-3 control-label">专员帐号</label>
						<div class="col-sm-8"><input type="text" class="form-control" id="general_proxy_id"></div>
					</div>

				</form>
				
			  </div>
			
            <div class="modal-footer">
              <a href="#" class="btn btn-default" data-dismiss="modal">关闭</a>
            </div>
          </div>
        </div>
      </div>
	  
	 <div class="modal fade" id="proxyModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
              <h4 class="modal-title" id="myModalLabel">分配代理</h4>
            </div>
            <div class="modal-body">			
				<div class="panel panel-success">
				  <div class="panel-heading">已选择的展位编号</div>
				  <div class="panel-body">112</div>
				</div>
			
				<div class="panel panel-info">
				  <div class="panel-heading">可选择的代理方</div>
					<div id="proxyModalBody" class="list-group">
					</div>  
				</div>         
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
            </div>
          </div>
       </div>
     </div>
	 
	 <div class="modal fade" id="colorModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal">×</button>
						<h3>展位涂色</h3>
					</div>
					
						<div class="modal-body">					
							<form  class="form-horizontal" role="form">	
								<div class="form-group form-group-sm">
									<label class="col-sm-3 control-label">填充颜色</label>
									<div class="col-sm-8"><input type="text" class="form-control" id="block_color"></div>
								</div>
								
								<div class="form-group form-group-sm">
									<label class="col-sm-3 control-label">字体颜色</label>
									<div class="col-sm-8"><input type="text" class="form-control" id="font_color"></div>
								</div>
								
								<div class="form-group form-group-sm">
									<label class="col-sm-3 control-label">文字方向</label>
									<div class="col-sm-8" id="rotate">
										<label class="radio-inline">
										  <input type="radio" name="radio" value="1" checked> 横向
										</label>
										<label class="radio-inline">
										  <input type="radio" name="radio" value="0"> 纵向
										</label>
									</div>
								</div>
							</form>  
						</div>
						<div class="modal-footer">
							<button id="subC" class="btn btn-primary">涂色</button>
						</div>					
				</div>
			</div>
	</div>
	
	<div class="modal fade" id="detailModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal">×</button>
						<h3></h3>
					</div>					
					<form  id="block_form" class="form-horizontal" role="form">	
						<div class="modal-body">	
								<div class="form-group form-group-sm">
									<label class="col-sm-3 control-label"><span class="formStar"> * </span>商铺编号</label>
									<div class="col-sm-8"><input type="text" class="form-control" id="block_num" required></div>
								</div>			
								<div class="form-group form-group-sm">
									<label class="col-sm-3 control-label"><span class="formStar"> * </span>商铺类型</label>
									<div class="col-sm-8"><input type="text" class="form-control" id="block_type" required></div>
								</div>			
								<div class="form-group form-group-sm">
									<label class="col-sm-3 control-label">起点位置</label>
									<div class="col-sm-8" id="startP">
										<label class="radio-inline">
										  <input type="radio" name="start" value="left" checked> 左上角
										</label>
										<label class="radio-inline">
										  <input type="radio" name="start" value="right"> 右下角
										</label>
									</div>
								</div>		
								<div class="form-group form-group-sm">
									<label class="col-sm-3 control-label"><span class="formStar"> * </span>长度</label>
									<div class="col-sm-3"><input type="number" min="1" class="form-control" id="block_length" required></div>
									
									<label class="col-sm-2 control-label"><span class="formStar"> * </span>宽度</label>
									<div class="col-sm-3"><input type="number" min="1" class="form-control" id="block_width" required></div>
								</div>

								<div class="form-group form-group-sm">
									<label class="col-sm-3 control-label"><span class="formStar"> * </span>面积</label>
									<div class="col-sm-3"><input type="number" min="0" max="1000" class="form-control" id="block_area" required></div>
									
									<label class="col-sm-2 control-label">参考面积</label>
									<div class="col-sm-3"><input type="number" class="form-control" id="block_refArea" disabled></div>
								</div>
                            
                                <div class="form-group form-group-sm">
									<label class="col-sm-3 control-label"><span class="formStar"> * </span>租金</label>
									<div class="col-sm-3"><input type="number" min="1" class="form-control" id="block_rent" required></div>
									
									<label class="col-sm-2 control-label"><span class="formStar"> * </span>折扣率</label>
									<div class="col-sm-3"><input  class="form-control" id="block_discount" required></div>
								</div>
							
                                <div class="form-group form-group-sm">
									<label class="col-sm-3 control-label"><span class="formStar"> * </span>吨位</label>
									<div class="col-sm-8"><input type="number" min="0" class="form-control" id="block_tonnage"></div>
								</div>
                            
								<div class="form-group form-group-sm">
									<label class="col-sm-3 control-label">开放时间</label>
									<div class="col-sm-8"><input type="text" class="form-control" id="block_time"></div>
								</div>
								
								<div class="form-group form-group-sm">
									<label class="col-sm-3 control-label">专员帐号</label>
									<div class="col-sm-8"><input type="text" class="form-control" id="block_proxy_id"></div>
								</div>
								
								<div class="alert alert-success" role="alert" id="operation_info">请点击添加按钮并在地图上点击合适的位置</div>
						</div>
						<div class="modal-footer">
						  <a  href="#" class="btn btn-default" data-dismiss="modal">关闭</a>
						  <button id="subA" type="submit" class="btn btn-primary"></button>	
						</div>	
					</form> 
				</div>
			</div>
	</div>
</body>

	<!-- jQuery -->
    <script src="js/jquery.min.js"></script>

    <!-- The HTML5 shim, for IE6-8 support of HTML5 elements -->
    <!--[if lt IE 9]>
        <script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
        <![endif]-->
    <!-- external javascript -->

    <script src="js/bootstrap.min.js"></script>
    <!-- application script for Charisma demo -->
    <script src="js/charisma.js"></script>
	<script src="js/H.js"></script>
	<script src="js/Vmap.js"></script>
    <script src="js/home_p.js"></script>
	<script src="js/jquery.colorPicker.js"></script>
	<script type="text/javascript" src="js/jspdf.js"></script>
	<script type="text/javascript" src="js/adler32cs.js"></script>
	<script type="text/javascript" src="js/FileSaver.js"></script>
	<script type="text/javascript" src="js/BlobBuilder.js"></script>
	<script type="text/javascript" src="js/jspdf.plugin.addimage.js"></script>
	<script>
	</script>
</html>
