<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE html>
<html lang="en">
  <head>
    <title>人员管理</title>
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
	<link href="css/dataTables.bootstrap.css" rel='stylesheet'>
    <link href='css/animate.min.css' rel='stylesheet'>
    <link href='css/colorPicker.css' rel='stylesheet'>
	<link href='css/style.css' rel="stylesheet">
    <style type="text/css">
 
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
            <a class="navbar-brand" href="#"> <img alt="Charisma Logo" src="img/logo20.png" class="hidden-xs"/>
                <span>商铺管理系统</span></a>

            <!-- user dropdown starts -->
            <div class="btn-group pull-right theme-container animated tada">
                <button class="btn btn-default dropdown-toggle" data-toggle="dropdown">
                    <i class="glyphicon glyphicon-user"></i><span class="hidden-sm hidden-xs">  ${sessionScope.admin.username}</span>
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
				<a href="#">人员管理</a>
			</li>
			</ul>
		</div>	
          <div class="sidebar-nav">
            <div class="nav-canvas">
              <div class="nav-sm nav nav-stacked">
              </div>
              <ul id = "leftMenu" class="nav nav-pills nav-stacked main-menu">
                <li>
                  <a href="ad_home.jsp"><i class="glyphicon glyphicon-home"></i><span>  商铺管理</span></a>                
                </li>
				<li>
					<a href="ad_apply.jsp"><i class="glyphicon glyphicon-comment"></i><span>  消息管理</span></a>
				</li>
				<li class="active">
					<a href="ad_proxy.jsp"><i class="glyphicon glyphicon-th"></i><span>  用户管理</span></a>
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
		
        <div id="content" class="col-lg-10 col-sm-10">
          <!-- content starts -->	  
		  <div class="row">
		  	<div>
			  <ul id="myTab" class="nav nav-tabs">
						<li class="active"><a href="#proxys" data-toggle="tab">
								专员信息 </a></li>
						<li><a href="#users" data-toggle="tab">用户信息</a></li>
						<li><a href="#addp" data-toggle="tab" >添加专员</a></li>
				</ul>
			</div>
			 <div id="myTabContent" class="tab-content">
                        <div class="tab-pane fade in active" id="proxys">
				<div class="box col-md-12">
				<div class="box-inner">
					<div class="box-header well">
                                  <h2><i class="glyphicon glyphicon-list"></i> 专员信息列表</h2>
                                  <div class="box-icon">
				                    <a href="#" class="btn btn-minimize btn-round btn-default"><i class="glyphicon glyphicon-chevron-up"></i></a>
				                    <a href="#" class="btn btn-close btn-round btn-default"><i class="glyphicon glyphicon-remove"></i></a>
				                </div>
                      </div>	
					<div class="box-content">
								 <table class="table table-striped table-bordered bootstrap-datatable datatable responsive" id="proxyTable">
								<thead>
								<tr>
									<th class="center">删除</th>
									<th>登录帐号</th>
									<th>登录密码</th>
									<th>专员姓名</th>
									<th>填充颜色</th>
									<th>所属楼层</th>
									<th>最后登录时间</th>
									<th>操作</th>
								</tr>
								</thead>
								<tbody>  
							   
								</tbody>
								</table>

						</div>
				</div>
				</div>
				</div>
				
				<div class="tab-pane fade" id="users">
					<div class="box col-md-12">
						<div class="box-inner">
									<div class="box-header well">
                                        <h2><i class="glyphicon glyphicon-info-sign"></i> 用户信息列表</h2>
                                        <div class="box-icon">
                                         <a href="#" class="btn btn-minimize btn-round btn-default"><i class="glyphicon glyphicon-chevron-up"></i></a>
                                            <a href="#" class="btn btn-round btn-default downloadExcel">
                                            <i class="glyphicon glyphicon-download-alt downloadExcel"></i></a>
                                        </div>
                                   </div>	
							<div class="box-content">
							<table class="table table-striped table-bordered bootstrap-datatable datatable responsive" id="usersTable">
								<thead>
								<tr>
									<th class="center">删除</th>
									<th>帐号</th>
									<th>密码</th>
									<th>联系人</th>
									<th>联系方式</th>
									<th>邮箱</th>
									<th>最后登录时间</th>
								</tr>
								</thead>
								<tbody>  
							   
								</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
				<div class="tab-pane fade" id="addp">
						<div class="box col-md-12">
								<div class="box-inner">
									<div class="box-header well">
			                                  <h2><i class="glyphicon glyphicon-edit"></i> 请填写表单</h2>
			                                  <div class="box-icon">
							                    <a href="#" class="btn btn-minimize btn-round btn-default"><i class="glyphicon glyphicon-chevron-up"></i></a>
							                    <a href="#" class="btn btn-close btn-round btn-default"><i class="glyphicon glyphicon-remove"></i></a>
							                </div>
			                      </div>	
									<div class="box-content">
										     	<form id="add_form" class="form-horizontal" role="form">
														<div class="form-group ">
															<label class="col-sm-2 control-label">专员帐号</label>
															<div class="col-sm-8"><input type="text" id="add_proxy_id" class="form-control" required></div>
														</div>
														<div class="form-group  ">
															<label class="col-sm-2 control-label">登录密码</label>
															<div class="col-sm-8"><input type="text" id="add_password" class="form-control" required></div>
														</div>
														<div class="form-group  ">
															<label class="col-sm-2 control-label">所属楼层</label>
															<div class="col-sm-8"><select class="form-control" id="add_floor">
															</select></div>
														</div>
														<div class="form-group  ">
															<label class="col-sm-2 control-label">专员姓名</label>
															<div class="col-sm-8"><input type="text" id="add_con_per" class="form-control"></div>
														</div>
														<div class="form-group  ">
															<label class="col-sm-2 control-label">联系方式</label>
															<div class="col-sm-8"><input type="text" id="add_contact" class="form-control"></div>
														</div>
														<div class="form-group  ">
															<label class="col-sm-2 control-label">填充颜色</label>
															<div class="col-sm-8"><input type="text" id="add_proxy_color"  class="form-control"></div>
														</div>
														<div class="form-group  ">
															<label class="col-sm-2 control-label">电子邮箱</label>
															<div class="col-sm-8"><input type="email" id="add_email"  class="form-control"></div>
														</div>
														<div class="form-group  ">
															<label class="col-sm-2 control-label">备注信息</label>
															<div class="col-sm-8"><input type="text" id="add_other_info" class="form-control"></div>
														</div>
														<div class="form-group ">
															<div class="col-sm-offset-2 col-sm-8">
																	<button  id="submitP" class="btn btn-primary"><i class="glyphicon glyphicon-plus"></i> 添加</button>												
															</div>
														</div>
												</form> 
									</div>
								</div>
							</div>
				</div>
			</div>
    <!--/span-->

			</div><!--/row-->
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
	
	<div class="modal fade" id="showProxy" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal">×</button>
						<h3>专员详细信息</h3>
					</div>
					<div class="modal-body" >
					 <form class="form-horizontal" role="form">
							<div class="form-group form-group-sm has-success">
								<label class="col-sm-3 control-label">登录帐号</label>
								<div class="col-sm-8"><input type="text" class="form-control" id="show_id"></div>
							</div>
	
							<div class="form-group form-group-sm has-success">
								<label class="col-sm-3 control-label">登录密码</label>
								<div class="col-sm-8"><input type="text" class="form-control" id="show_password"></div>
							</div>
						<div class="form-group form-group-sm has-success">
								<label class="col-sm-3 control-label">所属楼层</label>
								<div class="col-sm-8"><input type="text" class="form-control" id="show_floor"></div>
							</div>
							<div class="form-group form-group-sm has-success">
								<label class="col-sm-3 control-label">专员姓名</label>
								<div class="col-sm-8"><input type="text" class="form-control" id="show_con_per"></div>
							</div>
							<div class="form-group form-group-sm has-success">
								<label class="col-sm-3 control-label">联系方式</label>
								<div class="col-sm-8"><input type="text" class="form-control" id="show_contact"></div>
							</div>
							<div class="form-group form-group-sm has-success">
								<label class="col-sm-3 control-label">电子邮箱</label>
								<div class="col-sm-8"><input type="text" class="form-control" id="show_email"></div>
							</div>
							<div class="form-group form-group-sm has-success">
								<label class="col-sm-3 control-label">填充颜色</label>
								<div class="col-sm-8"><input type="text" class="form-control" id="show_color"></div>
							</div>
							<div class="form-group form-group-sm has-success">
								<label class="col-sm-3 control-label">备注信息</label>
								<div class="col-sm-8"><input type="text" class="form-control" id="show_info"></div>
							</div>
							<div class="form-group  form-group-sm has-success">
								<label class="col-sm-3 control-label">最后登陆时间</label>
								<div class="col-sm-8"><input type="text" id="show_time" class="form-control"></div>
							</div>
					</form>
					</div>
					<div class="modal-footer">
					<a id="closeD" href="#" class="btn btn-default" data-dismiss="modal">关闭</a>
					</div>
				</div>
			</div>
	</div>
		
	<div class="modal fade" id="addProxy" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal">×</button>
						<h3>修改代理方</h3>
					</div>
					<form id="info_form" class="form-horizontal" role="form">
						<div class="modal-body">	
								<div class="form-group form-group-sm has-success">
									<label class="col-sm-3 control-label">登录帐号</label>
									<div class="col-sm-8"><input type="text" class="form-control" id="proxy_id" required disabled></div>
								</div>
								<div class="form-group form-group-sm has-success">
									<label class="col-sm-3 control-label">登录密码</label>
									<div class="col-sm-8"><input type="text" class="form-control" id="password" required></div>
								</div>
								<div class="form-group form-group-sm has-success">
									<label class="col-sm-3 control-label">所属楼层</label>
									<div class="col-sm-8"><select  class="form-control" id="floor"></select></div>
								</div>
								<div class="form-group form-group-sm has-success">
									<label class="col-sm-3 control-label">专员姓名</label>
									<div class="col-sm-8"><input type="text" class="form-control" id="con_per"></div>
								</div>
								<div class="form-group form-group-sm has-success">
									<label class="col-sm-3 control-label">联系电话</label>
									<div class="col-sm-8"><input type="text" class="form-control" id="contact"></div>
								</div>
								<div class="form-group form-group-sm has-success">
									<label class="col-sm-3 control-label">填充颜色</label>
									<div class="col-sm-8"><input type="text" class="form-control" id="proxy_color"></div>
								</div>
								<div class="form-group form-group-sm has-success">
									<label class="col-sm-3 control-label">电子邮箱</label>
									<div class="col-sm-8"><input type="email" class="form-control" id="email"></div>
								</div>
								<div class="form-group form-group-sm has-success">
									<label class="col-sm-3 control-label">备注信息</label>
									<div class="col-sm-8"><input type="text" class="form-control" id="other_info"></div>
								</div>
						</div>
						<div class="modal-footer">
						<a id="closeD" href="#" class="btn btn-default" data-dismiss="modal">关闭</a>
						<button id="subP" class="btn btn-primary" type="submit">提交</button>
						</div>
					</form>  
				</div>
			</div>
	</div>
	
	<!-- jQuery -->
    <script src="js/jquery.min.js"></script>
    <!-- The HTML5 shim, for IE6-8 support of HTML5 elements -->
    <!--[if lt IE 9]>
        <script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
        <![endif]-->
    <!-- external javascript -->
    <script src="js/bootstrap.min.js"></script>
	<script src='js/jquery.dataTables.min.js'></script>
	<script  src="js/dataTables.bootstrap.js"></script>
    <!-- application script for Charisma demo -->
    <script src="js/charisma.js"></script>
    <script src="js/jquery.colorPicker.js"></script>
    <script src="js/proxy.js"></script>	
	<script>
	</script>
  </body>
</html>
