<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE html>
<html lang="en">
<head>
<title>消息管理</title>
<meta name="viewport"
	content="user-scalable=no, width=device-width, initial-scale=1, maximum-scale=1">
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
<link href='css/style.css' rel="stylesheet">
<!-- The fav icon -->
<link rel="shortcut icon" href="img/favicon.ico">
<style>
		footer {
		position: fixed;
		bottom: 0;
		width: 100%;
		}
	</style>
</head>

<body>
	<div class="navbar navbar-default" role="navigation">
		<div class="navbar-inner">
			<button type="button" class="navbar-toggle pull-left animated flip">
				<span class="sr-only">Toggle navigation</span> <span
					class="icon-bar"></span> <span class="icon-bar"></span> <span
					class="icon-bar"></span>
			</button>
			<img alt="Charisma Logo" src="img/logo20.png" class="hidden-xs" style="float:left;margin-left: 10px;"/>
			<a class="navbar-brand" href="#"> <span>商铺管理系统</span></a>

			<!-- user dropdown starts -->
			<div class="btn-group pull-right theme-container animated tada">
				<button class="btn btn-default dropdown-toggle"
					data-toggle="dropdown">
					<i class="glyphicon glyphicon-user"></i><span
						class="hidden-sm hidden-xs"> ${sessionScope.admin.username}</span>
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
	<!-- topbar ends -->
	<div class="ch-container">
		<div class="row">

			<!-- left menu starts -->
			<div class="col-sm-2 col-lg-2">
				<div>
					<ul class="breadcrumb">
						<li><a href="#">主页</a></li>
						<li><a href="#">消息管理</a></li>
					</ul>
				</div>

				<div class="sidebar-nav">
					<div class="nav-canvas">
						<div class="nav-sm nav nav-stacked"></div>
						<ul id="leftMenu" class="nav nav-pills nav-stacked main-menu">
							<li><a href="ad_home.jsp">
							<i class="glyphicon glyphicon-home"></i><span> 商铺管理</span></a></li>
							<li class="active"><a href="ad_apply.jsp">
							<i class="glyphicon glyphicon-comment"></i><span> 消息管理</span></a></li>
							<li><a href="ad_proxy.jsp">
							<i class="glyphicon glyphicon-th"></i><span>  用户管理</span></a></li>
						</ul>
					</div>
				</div>
			</div>
			<!--/span-->
			<!-- left menu ends -->
			<noscript>
				<div class="alert alert-block col-md-12">
					<h4 class="alert-heading">警告!</h4>
					<p>
						You need to have <a href="http://en.wikipedia.org/wiki/JavaScript"
							target="_blank">JavaScript</a> enabled to use this site.
					</p>
				</div>
			</noscript>

			<div id="content" class="col-lg-10 col-sm-10">
				<!-- content starts -->
				<div>
					<ul id="myTab" class="nav nav-tabs">
						<li class="active"><a href="#home" data-toggle="tab">
								最新咨询 </a></li>
						<li><a href="#ios" data-toggle="tab">回复记录</a></li>
						<li><a href="#newApply" data-toggle="tab">最新申请</a></li>
						<li><a href="#auditing" data-toggle="tab" id="auditClick">审核记录</a></li>
					</ul>
				</div>
				<div id="myTabContent" class="tab-content">
					<div class="tab-pane fade in active" id="home">
						<div class="box col-md-12">
							<div class="box-inner">
									<div class="box-header well">
                                        <h2><i class="glyphicon glyphicon-list"></i> 咨询信息列表</h2>
                                        <div class="box-icon">
                                         <a href="#" class="btn btn-minimize btn-round btn-default"><i class="glyphicon glyphicon-chevron-up"></i></a>
                                            <a href="#" class="btn btn-round btn-default downloadMessageExcel">
                                            <i class="glyphicon glyphicon-download-alt downloadMessageExcel"></i></a>
                                        </div>
                                   </div>	
								<div class="box-content">
									<table class="table table-striped table-bordered table-condensed" id="proxyTable">
										<thead>
											<tr>
												<th>编号</th>
												<th>主题</th>
												<th>时间</th>
												<th>发件人</th>
												<th>联系方式</th>
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
					<div class="tab-pane fade" id="ios">
						<div class="box col-md-12">
							<div class="box-inner">
								<div class="box-header well">
                                        <h2><i class="glyphicon glyphicon-list"></i> 回复记录列表</h2>
                                        <div class="box-icon">
                                         <a href="#" class="btn btn-minimize btn-round btn-default"><i class="glyphicon glyphicon-chevron-up"></i></a>
                                            <a href="#" class="btn btn-round btn-default downloadMessageExcel">
                                            <i class="glyphicon glyphicon-download-alt downloadMessageExcel"></i></a>
                                        </div>
                                   </div>	
								<div class="box-content">
									<table class="table table-striped table-bordered table-condensed" id="selfTable">
										<thead>
											<tr>
												<th>编号</th>
												<th>主题</th>
												<th>发件人</th>
												<th>联系方式</th>
												<th>时间</th>
												<th>状态</th>
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

					<div class="tab-pane fade" id="newApply">
						<div class="box col-md-12">
							<div class="box-inner">
								<div class="box-header well">
                                        <h2><i class="glyphicon glyphicon-info-sign"></i> 申请信息列表</h2>
                                        <div class="box-icon">
                                         <a href="#" class="btn btn-minimize btn-round btn-default"><i class="glyphicon glyphicon-chevron-up"></i></a>
                                            <a href="#" class="btn btn-round btn-default downloadLeaseExcel">
                                            <i class="glyphicon glyphicon-download-alt downloadLeaseExcel"></i></a>
                                        </div>
                                   </div>	
								<div class="box-content">
									<table class="table table-striped table-bordered table-condensed" id="leaseTable">
										<thead>
											<tr>
												<th>编号</th>
												<th>申请人</th>
												<th>联系方式</th>
												<th>商铺编号</th>
												<th>租期</th>
												<th>状态</th>
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

					<div class="tab-pane fade" id="auditing">
						<div class="box col-md-12">
							<div class="box-inner">
								<div class="box-header well">
                                        <h2><i class="glyphicon glyphicon-info-sign"></i> 审核记录列表</h2>
                                        <div class="box-icon">
                                         <a href="#" class="btn btn-minimize btn-round btn-default"><i class="glyphicon glyphicon-chevron-up"></i></a>
                                            <a href="#" class="btn btn-round btn-default downloadLeaseExcel">
                                            <i class="glyphicon glyphicon-download-alt downloadLeaseExcel"></i></a>
                                        </div>
                                   </div>	
								<div class="box-content">
									<table class="table table-striped table-bordered table-condensed" id="auditingTable">
										<thead>
											<tr>
												<th>编号</th>
												<th>申请人</th>
												<th>联系方式</th>
												<th>商铺编号</th>
												<th>租期</th>
												<th>状态</th>
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
				</div>
			</div>
		</div>
	</div>
	<!--/span-->

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


	<div class="modal fade" id="showApply" tabindex="-1" role="dialog"
		aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal">×</button>
					<h3>咨询详情</h3>
				</div>
				<div class="modal-body">


					<form class="form-horizontal" role="form">

						<div class="form-group form-group-sm has-success">
							<label class="col-sm-2 control-label">发件人</label> <span
								class="field"> <textarea cols="60" rows="1" id="send_id"
									class="longinput" disabled="disabled"></textarea>
							</span>
						</div>
						<div class="form-group form-group-sm has-success">
							<label class="col-sm-2 control-label">发送时间</label> <span
								class="field"> <textarea cols="60" rows="1"
									id="show_time" class="longinput" disabled="disabled"></textarea>
							</span>
						</div>
						<div class="form-group form-group-sm has-success">
							<label class="col-sm-2 control-label">主题</label> <span
								class="field"> <textarea cols="60" rows="2"
									id="show_title" class="longinput" disabled="disabled"></textarea>
							</span>
						</div>
						<div class="form-group form-group-sm has-success">
							<label class="col-sm-2 control-label">内容</label> <span
								class="field"> <textarea cols="60" rows="10"
									id="show_content" class="longinput" disabled="disabled"></textarea>
							</span>
						</div>

					</form>

				</div>
				<div class="modal-footer">
					<a id="closeD" href="#" class="btn btn-default"
						data-dismiss="modal">关闭</a>
				</div>
			</div>
		</div>
	</div>

	<div class="modal fade" id="editselfApply" tabindex="-1" role="dialog"
		aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal">×</button>
					<h3>回复留言</h3>
				</div>
				<div class="modal-body">


					<form class="form-horizontal" role="form">

						<div class="form-group form-group-sm has-success">
							<label class="col-sm-2 control-label">主题</label> <span
								class="field"> <textarea cols="60" rows="1"
									id="edit_self_title" class="longinput" disabled="disabled"></textarea>
							</span>
						</div>
						<div class="form-group form-group-sm has-success">
							<label class="col-sm-2 control-label">发件人</label> <span
								class="field"> <textarea cols="60" rows="1"
									id="edit_self_create" class="longinput" disabled="disabled"></textarea>
							</span>
						</div>
						<div class="form-group form-group-sm has-success">
							<label class="col-sm-2 control-label">发送时间</label> <span
								class="field"> <textarea cols="60" rows="1"
									id="edit_self_time" class="longinput" disabled="disabled"></textarea>
							</span>
						</div>

						<div class="form-group form-group-sm has-success">
							<label class="col-sm-2 control-label">留言内容</label> <span
								class="field"> <textarea cols="60" rows="8"
									id="edit_self_content" class="longinput" disabled="disabled"></textarea>
							</span>
						</div>

						<div class="form-group form-group-sm has-success">
							<label class="col-sm-2 control-label">回复内容</label> <span
								class="field"> <textarea cols="60" rows="8"
									id="edit_self_reply" class="longinput"></textarea>
							</span>
						</div>
					</form>

				</div>
				<div class="modal-footer">
					<a id="closeD" href="#" class="btn btn-default"
						data-dismiss="modal">关闭</a>
					<button id="submit" class="btn btn-primary" type="submit">提交</button>
				</div>
			</div>
		</div>
	</div>

	<div class="modal fade" id="showselfApply" tabindex="-1" role="dialog"
		aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal">×</button>
					<h3>咨询详情</h3>
				</div>
				<div class="modal-body">


					<form class="form-horizontal" role="form">

						<div class="form-group form-group-sm has-success">
							<label class="col-sm-2 control-label">主题</label> <span
								class="field"> <textarea cols="60" rows="2"
									id="show_self_title" class="longinput"></textarea>
							</span>
						</div>
						<div class="form-group form-group-sm has-success">
							<label class="col-sm-2 control-label">发送时间</label> <span
								class="field"> <textarea cols="60" rows="1"
									id="show_self_time" class="longinput"></textarea>
							</span>
						</div>

						<div class="form-group form-group-sm has-success">
							<label class="col-sm-2 control-label">留言内容</label> <span
								class="field"> <textarea cols="60" rows="10"
									id="show_self_content" class="longinput"></textarea>
							</span>
						</div>
						<div class="form-group form-group-sm has-success">
							<label class="col-sm-2 control-label">回复内容</label> <span
								class="field"> <textarea cols="60" rows="10"
									id="show_self_reply" class="longinput"></textarea>
							</span>
						</div>

					</form>

				</div>
				<div class="modal-footer">
					<a id="closeD" href="#" class="btn btn-default" data-dismiss="modal">关闭</a>
				</div>
			</div>
		</div>
	</div>

	<div class="modal fade" id="leaseModal" tabindex="-1" role="dialog"
		aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal">×</button>
					<h3>申请单详情</h3>
				</div>

				<div class="modal-body">
					<form class="form-horizontal" role="form">
						<div class="form-group form-group-sm">
							<label class="col-sm-3 control-label">展位编号</label>
							<div class="col-sm-8">
								<input type="text" class="form-control" id="lease_num">
							</div>
						</div>
						<div class="form-group form-group-sm">
							<label class="col-sm-3 control-label">长度</label>
							<div class="col-sm-8">
								<input type="text" class="form-control" id="lease_length">
							</div>
						</div>
						<div class="form-group form-group-sm">
							<label class="col-sm-3 control-label">宽度</label>
							<div class="col-sm-8">
								<input type="text" class="form-control" id="lease_width">
							</div>
						</div>
						<div class="form-group form-group-sm">
							<label class="col-sm-3 control-label">面积</label>
							<div class="col-sm-8">
								<input type="text" class="form-control" id="lease_area">
							</div>
						</div>
                        
                        <div class="form-group form-group-sm">
						<label class="col-sm-3 control-label">单位租金</label>
						<div class="col-sm-8 input-group input-group-sm" style="padding-left: 15px;padding-right: 15px;">
                            <input type="text" class="form-control" id="lease_price">
                            <span class="input-group-addon">元/平方米</span>
                        </div>
					   </div>
                        <div class="form-group form-group-sm">
						<label class="col-sm-3 control-label">折扣率</label>
                        <div class="col-sm-8"><input type="text" class="form-control" id="lease_discount"></div>
					</div>
                    <div class="form-group form-group-sm">
						<label class="col-sm-3 control-label">租金</label>
						<div class="col-sm-8 input-group input-group-sm" style="padding-left: 15px;padding-right: 15px;">
                            <input type="text" class="form-control" id="lease_tPrice">
                            <span class="input-group-addon">元</span>
                        </div>
					</div>
                    <div class="form-group form-group-sm">
						<label class="col-sm-3 control-label">吨位</label>
						<div class="col-sm-8"><input type="text" class="form-control" id="lease_tonnage"></div>
					</div>
                        
					<div class="form-group form-group-sm">
							<label class="col-sm-3 control-label">申请人</label>
							<div class="col-sm-8">
								<input type="text" class="form-control" id="lease_con_per">
							</div>
						</div>
					<div class="form-group form-group-sm">
							<label class="col-sm-3 control-label">联系方式</label>
							<div class="col-sm-8">
								<input type="text" class="form-control" id="lease_phone">
							</div>
						</div>
					<div class="form-group form-group-sm">
							<label class="col-sm-3 control-label">租期</label>
							<div class="col-sm-8">
								<input type="text" class="form-control" id="lease_rent">
							</div>
						</div>
					<div class="form-group form-group-sm">
							<label class="col-sm-3 control-label">申请时间</label>
							<div class="col-sm-8">
								<input type="text" class="form-control" id="lease_time">
							</div>
						</div>
					</form>

				</div>
				<div class="modal-footer">
					<a  href="#" class="btn btn-default" data-dismiss="modal">关闭</a>
				</div>
			</div>
		</div>
	</div>
	
	<div class="modal fade" id="editLeaseModal" tabindex="-1" role="dialog"
		aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal">×</button>
					<h3>审核申请单</h3>
				</div>

				<div class="modal-body">
					<form class="form-horizontal" role="form">
						<div class="form-group form-group-sm">
							<label class="col-sm-3 control-label">展位编号</label>
							<div class="col-sm-8">
								<input type="text" class="form-control" id="lease_edit_num" disabled>
							</div>
						</div>
						<div class="form-group form-group-sm">
							<label class="col-sm-3 control-label">长度</label>
							<div class="col-sm-8">
								<input type="text" class="form-control" id="lease_edit_length" disabled>
							</div>
						</div>
						<div class="form-group form-group-sm">
							<label class="col-sm-3 control-label">宽度</label>
							<div class="col-sm-8">
								<input type="text" class="form-control" id="lease_edit_width" disabled>
							</div>
						</div>
						<div class="form-group form-group-sm">
							<label class="col-sm-3 control-label">面积</label>
							<div class="col-sm-8">
								<input type="text" class="form-control" id="lease_edit_area" disabled>
							</div>
						</div>
                        
                        <div class="form-group form-group-sm">
						<label class="col-sm-3 control-label">单位租金</label>
						<div class="col-sm-8 input-group input-group-sm" style="padding-left: 15px;padding-right: 15px;">
                            <input type="text" class="form-control" id="lease_edit_price" disabled>
                            <span class="input-group-addon">元/平方米</span>
                        </div>
					   </div>
                        <div class="form-group form-group-sm">
						<label class="col-sm-3 control-label">折扣率</label>
                        <div class="col-sm-8"><input type="text" class="form-control" id="lease_edit_discount" disabled></div>
					</div>
                    <div class="form-group form-group-sm">
						<label class="col-sm-3 control-label">租金</label>
						<div class="col-sm-8 input-group input-group-sm" style="padding-left: 15px;padding-right: 15px;">
                            <input type="text" class="form-control" id="lease_edit_tPrice" disabled>
                            <span class="input-group-addon">元</span>
                        </div>
					</div>
                    <div class="form-group form-group-sm">
						<label class="col-sm-3 control-label">吨位</label>
						<div class="col-sm-8"><input type="text" class="form-control" id="lease_edit_tonnage" disabled></div>
					</div>
                        
					<div class="form-group form-group-sm">
							<label class="col-sm-3 control-label">申请人</label>
							<div class="col-sm-8">
								<input type="text" class="form-control" id="lease_edit_con_per" disabled>
							</div>
						</div>
					<div class="form-group form-group-sm">
							<label class="col-sm-3 control-label">联系方式</label>
							<div class="col-sm-8">
								<input type="text" class="form-control" id="lease_edit_phone" disabled>
							</div>
						</div>
					<div class="form-group form-group-sm">
							<label class="col-sm-3 control-label">租期</label>
							<div class="col-sm-8">
								<input type="text" class="form-control" id="lease_edit_rent" disabled> 
							</div>
						</div>
					<div class="form-group form-group-sm">
							<label class="col-sm-3 control-label">申请时间</label>
							<div class="col-sm-8">
								<input type="text" class="form-control" id="lease_edit_time" disabled>
							</div>
						</div>
						
						<div class="form-group form-group-sm">
							<label class="col-sm-3 control-label">审核状态</label>
							<div class="col-sm-8" id="lease_edit_state">
								<label class="radio-inline">
								  <input type="radio" name="radio" value="1"> 同意申请
								</label>
		
								<label class="radio-inline">
								  <input type="radio" name="radio" value="2"> 驳回申请
								</label>
							</div>
						</div>
					</form>

				</div>
				<div class="modal-footer">
					<a  href="#" class="btn btn-default" data-dismiss="modal">关闭</a>
					<a  id="editL" href="#" class="btn btn-primary" data-dismiss="modal">提交</a>
				</div>
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
	<script src="js/dataTables.bootstrap.js"></script>

	<script src="js/charisma.js"></script>
	<script src="js/apply.js"></script>

</body>
</html>
