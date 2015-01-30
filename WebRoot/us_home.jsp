<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE html>
<html lang="en">
  <head>
  
    <title>在线选铺</title>
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
    <link href="css/dataTables.bootstrap.css" rel='stylesheet'>
	<link href='css/style.css' rel="stylesheet">
    <style type="text/css">
      @font-face{
      font-family: vmap;
	  src: url('VMapPublic.ttf');
      }
	  .label{
		color:#fff;
	  }
	  #searchTable_wrapper .form-inline,#searchTable_wrapper .form-control {
			display: inline-block;
			width: 65%;
			vertical-align: middle;
			padding: 0px;
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
            <a class="navbar-brand" href="#"> <span>在线选铺系统</span></a>

            <!-- user dropdown starts -->
            <div class="btn-group pull-right theme-container animated tada">
                <button class="btn btn-default dropdown-toggle" data-toggle="dropdown">
                    <i class="glyphicon glyphicon-user"></i>
                    <span class="hidden-sm hidden-xs" id="login_proxy" uid="${sessionScope.user.company_id}"> ${sessionScope.user.show_name}</span>
                    <span class="caret"></span>
                </button>
                <ul class="dropdown-menu">
                    <li><a href="#" id="profile">个人资料</a></li>
                    <li class="divider"></li>
                    <li><a href="loginOut" >注销</a>
                    </li>
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
					<a href="#">在线选铺</a>
				</li>
				</ul>
		  </div>
		  <div class="sidebar-nav">
            <div class="nav-canvas">
              <div class="nav-sm nav nav-stacked">
              </div>
              <ul id = "leftMenu" class="nav nav-pills nav-stacked main-menu">
                <li id = "view" class="accordion active">
                  <a href="#"><i class="glyphicon glyphicon-home"></i><span>  在线选铺</span></a>
					<ul id="viewList" class="nav nav-pills nav-stacked">						
					</ul>
                </li>
				<li>
					<a href="us_message.jsp"><i class="glyphicon glyphicon-comment"></i><span>  消息通知</span></a>
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
        <div id="content" class="col-lg-7 col-sm-7" style="height:700px;padding:0;">
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
					
					  <!--  
					<div class="btn-group" id="editMenuList">
					
					  <button  id="assA" class="btn btn-info">
					  分配</button>  
					  <button id="saleA" class="btn btn-info">
					  出售</button>
					  <button id="mergerA" class="btn btn-info">
					  合并</button>
					  <button id="splitA" class="btn btn-info">
					  拆分</button>
					  <button id="fillA" class="btn btn-info">
					  涂色</button>
					
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
					-->
					<div class="btn-group">
					  <button id="downloadPDF" type="button" class="btn btn-primary">
					  PDF</button>
					  <!--  
					  <button id="downloadExc" type="button" class="btn btn-primary">
					  Excel</button>
					  -->
					</div>
					<div class="btn-group" id="state_box">
					  <button  class="btn btn-defaul" style="background-color:#e6eece" disabled="disabled">未租</button>
					    <!--  <button  class="btn btn-info" disabled="disabled">签约</button>-->
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
       <div class="box col-lg-3 col-sm-3" style="margin-top: 0px;padding-right:0px">
							<div class="box-inner">
								<div class="box-content" style="padding-bottom: 0px;">
        						<form  class="form-horizontal" role="form" id="searchForm">	
							        <div class="form-group form-group-sm">
														<label class="col-sm-4 control-label">商铺类型</label>
														<div class="col-sm-8" id="searchType">
															<label class="checkbox-inline">
															  <input type="checkbox"  name="type" value="商铺" > 商铺
															</label>
															<label class="checkbox-inline">
															  <input type="checkbox"  name="type" value="干仓"> 干仓
															</label>
															<label class="checkbox-inline">
															  <input type="checkbox" name="type" value="冷库"> 冷库
															</label>
														</div>
													</div>
						<div class="form-group form-group-sm">
							<label class="col-sm-4 control-label">面积(吨位)</label>
							<div class="form-inline col-sm-8">
								<input type="text" class="form-control "  id="search_low" style="width:25%"/> -
							 	<input type="text" class="form-control " id="search_high" style="width:25%"/> 平米(吨)
							 </div>
						</div>	
						
						 <div class="form-group form-group-sm">
						 	<div  class="col-sm-offset-1 col-sm-10">
							  <a id="searchButton" href="#" class="btn btn-primary btn-block">搜索</a>
							  </div>
						  </div>
					   </form> 
        							
        							
							<div class="panel panel-primary" id="panel_search">
							  <div class="panel-heading" >
							    <h3 class="panel-title">结果列表</h3>
							  </div>	   
							</div>
        					</div>
        				</div>
        </div>
        
    </div><!--/fluid-row-->
    </div>

 <footer>
		<div class="jumbotron" style="margin-top:25px">
		        <div class="container">		
					<div class="row">
						<div class="col-xs-12">
							<div class="submit">
								<p class="text-center"> <a>在线选铺系统</a></p>
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
	  
      
    <div class="modal fade" id="messageModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal">×</button>
						<h3>咨询信息</h3>
					</div>					
			   <form class="form-horizontal" role="form" id="message_form" onsubmit="return false">	
						<div class="modal-body">	
								<div class="form-group form-group-sm">
									<label class="col-sm-3 control-label">商铺编号</label>
									<div class="col-sm-8"><input type="text" class="form-control" id="message_num" disabled></div>
								</div>
								<div class="form-group form-group-sm">
									<label class="col-sm-3 control-label">专员帐号</label>
									<div class="col-sm-8"><input type="text" class="form-control" id="message_proxy_id" disabled></div>
								</div>
								<div class="form-group form-group-sm">
									<label class="col-sm-3 control-label">主题</label>
									<div class="col-sm-8"><input type="text" class="form-control" id="message_title" required></div>
								</div>
								<div class="form-group">
									<label class="col-sm-3 control-label">内容</label>
									<div class="col-sm-8"><textarea class="form-control" rows="8" id="message_content" required></textarea></div>
								</div>
						</div>
						<div class="modal-footer">
						  <a  href="#" class="btn btn-default" data-dismiss="modal">关闭</a>
						  <button id="subM" type="submit" class="btn btn-primary">提交</button>	
						</div>	
				  </form>
				</div>
			</div>
	</div>
      
   <div class="modal fade" id="applyModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal">×</button>
						<h3>申请铺位</h3>
					</div>					
						<div class="modal-body">	
             <form  class="form-horizontal" role="form">	
					<div class="form-group form-group-sm">
						<label class="col-sm-3 control-label">商铺编号</label>
						<div class="col-sm-8"><input type="text" class="form-control" id="apply_num" disabled></div>
					</div>
                    <div class="form-group form-group-sm">
						<label class="col-sm-3 control-label">长度</label>
						<div class="col-sm-8"><input type="text" class="form-control" id="apply_length" disabled></div>
					</div>
					<div class="form-group form-group-sm">
						<label class="col-sm-3 control-label">宽度</label>
						<div class="col-sm-8"><input type="text" class="form-control" id="apply_width" disabled></div>
					</div>
					<div class="form-group form-group-sm">
						<label class="col-sm-3 control-label">面积</label>
						<div class="col-sm-8"><input type="text" class="form-control" id="apply_area" disabled></div>
					</div>
					
                    <div class="form-group form-group-sm">
						<label class="col-sm-3 control-label">单位租金</label>
						<div class="col-sm-8 input-group input-group-sm" style="padding-left: 15px;padding-right: 15px;">
                            <input type="text" class="form-control" id="apply_price" disabled>
                            <span class="input-group-addon">元/平方米</span>
                        </div>
					</div>
                    <div class="form-group form-group-sm">
						<label class="col-sm-3 control-label">折扣率</label>
						<div class="col-sm-8"><input type="text" class="form-control" id="apply_discount" disabled></div>
					</div>
                    <div class="form-group form-group-sm">
						<label class="col-sm-3 control-label">租金</label>
						<div class="col-sm-8 input-group input-group-sm" style="padding-left: 15px;padding-right: 15px;">
                            <input type="text" class="form-control" id="apply_tPrice" disabled>
                            <span class="input-group-addon">元</span>
                        </div>
					</div>
                    <div class="form-group form-group-sm">
						<label class="col-sm-3 control-label">吨位</label>
						<div class="col-sm-8"><input type="text" class="form-control" id="apply_tonnage" disabled></div>
					</div>
                   
					<div class="form-group form-group-sm">
                        <label class="col-sm-3 control-label">租期</label>
                        <div class="col-sm-8 input-group input-group-sm" style="padding-left: 15px;padding-right: 15px;">
                            <input type="number" class="form-control" id="apply_rent" required>
                            <span class="input-group-addon">月</span>
                        </div>
                    </div> 
				</form>
						</div>
						<div class="modal-footer">
						  <a href="#" class="btn btn-default" data-dismiss="modal">关闭</a>
                          <button id="subL" type="submit" class="btn btn-primary">提交</button>	
						</div>	
				</div>
			</div>
	</div>
      
      
      <div class="modal fade" id="showProxy" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal">×</button>
						<h3>个人资料</h3>
					</div>
					<div class="modal-body" >
					 <form class="form-horizontal" role="form">
							
							<div class="form-group form-group-sm has-success">
								<label class="col-sm-3 control-label">帐号</label>
								<div class="col-sm-8"><input type="text" class="form-control" id="show_showname"></div>
							</div>
							<div class="form-group form-group-sm has-success">
								<label class="col-sm-3 control-label">登录密码</label>
								<div class="col-sm-8"><input type="text" class="form-control" id="show_contact"></div>
							</div>
							<div class="form-group form-group-sm has-success">
								<label class="col-sm-3 control-label">联系人</label>
								<div class="col-sm-8"><input type="text" class="form-control" id="show_con_per"></div>
							</div>
							<div class="form-group form-group-sm has-success">
								<label class="col-sm-3 control-label">联系方式</label>
								<div class="col-sm-8"><input type="text" class="form-control" id="show_phone"></div>
							</div>
							<div class="form-group form-group-sm has-success">
								<label class="col-sm-3 control-label">电子邮箱</label>
								<div class="col-sm-8"><input type="text" class="form-control" id="show_email"></div>
							</div>
					</form>
					</div>
					<div class="modal-footer">
					<a  href="#" class="btn btn-default" data-dismiss="modal">关闭</a>
					</div>
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
	<script src="js/us_Vmap.js"></script>
    <script src="js/us_home.js"></script>
	<script src="js/jquery.colorPicker.js"></script>
	<script type="text/javascript" src="js/jspdf.js"></script>
	<script type="text/javascript" src="js/adler32cs.js"></script>
	<script type="text/javascript" src="js/FileSaver.js"></script>
	<script type="text/javascript" src="js/BlobBuilder.js"></script>
	<script type="text/javascript" src="js/jspdf.plugin.addimage.js"></script>
	<script src='js/jquery.dataTables.min.js'></script>
	<script  src="js/dataTables.bootstrap.js"></script>
	<script>
	</script>
</html>
