<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE html>
<html lang="en">
<head>
    <title>在线选铺系统</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
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
       
     <link rel="stylesheet" href="http://cdn.bootcss.com/bootstrap/3.3.0/css/bootstrap.min.css">
     <link rel="stylesheet" href="css/main.css">
	<link rel="stylesheet" href="./css/validation.css">
       <!-- The fav icon -->
    <link rel="shortcut icon" href="img/favicon.ico">
    </head>
    <body>
      <div id="background">
          <img src="images/back.jpg" />
      </div>
      <div class="container">
          <div class="row" id="row1">
              <div class="col-md-1">
                  <img src="images/logo.png" id="logo"/>
              </div>
              <div class="col-md-8 myhead">
                  <div class="row"><h1>在线选铺系统</h1></div>
                  <div class="row"><p>ONLINE SHOP MANAGEMENT SYSTEM</p></div>
              </div>
              <span id="login"><a data-toggle="modal" href="#signInModal" onClick="createCode();">登录</a>  |
			  <a data-toggle="modal" href="#signUpModal">注册</a></span>
			  
          </div>
          <div class="row" id="row2">
              <div class="col-md-5">
                  <img class="changeImg img-responsive img-rounded" src="./images/fix.png" >
              </div>
              <div class="col-md-6">
                  <p class="changeContent">招商信息......</p>
			</div>
		</div>
      </div>
      <div class="container mycarousel">
          <div class='row'>
              <div class='col-md-12'>
                  <div class="carousel slide media-carousel" id="media">
                      <div class="carousel-inner">
                          <div class="item  active">
                              <div class="row">
                                  <div class="col-md-3">
                                      <a class="thumbnail" name="0" href="#signInModal" data-toggle="modal" onClick="createCode();"><img alt="" src="./images/0.png"></a>
                                      <div class="carousel-caption">
                                          <h3>1B<small>国际海鲜城</small></h3>
                                      </div>
                                  </div>          
                                  <div class="col-md-3">
                                      <a class="thumbnail" name="1"  href="#signInModal" data-toggle="modal" onClick="createCode();"><img alt="" src="./images/1.png"></a>
                                      <div class="carousel-caption">
                                          <h3>1F<small>国际冷鲜城</small></h3>
                                      </div>
                                  </div>
                                  <div class="col-md-3">
                                      <a class="thumbnail" name="2"  href="#signInModal" data-toggle="modal" onClick="createCode();"><img alt="" src="./images/2.png"></a>
                                      <div class="carousel-caption">
                                          <h3>2F<small>国际名优城</small></h3>
                                      </div>
                                  </div>  
                                  <div class="col-md-3">
                                      <a class="thumbnail" name="3"  href="#signInModal" data-toggle="modal" onClick="createCode();"><img alt="" src="./images/3.png"></a>
                                      <div class="carousel-caption">
                                          <h3>3F<small>国际名酒城</small></h3>
                                      </div>
                                  </div>         
                              </div>
                          </div>
                          <div class="item">
                              <div class="row">
                                  <div class="col-md-3">
                                      <a class="thumbnail" name="4"  href="#signInModal" data-toggle="modal" onClick="createCode();"><img alt="" src="./images/4.png"></a>
                                      <div class="carousel-caption">
                                          <h3>4F<small>国际名茶城</small></h3>
                                      </div>
                                  </div>          
                                  <div class="col-md-3">
                                      <a class="thumbnail" name="5"  href="#signInModal" data-toggle="modal" onClick="createCode();"><img alt="" src="./images/5.png"></a>
                                      <div class="carousel-caption">
                                          <h3>5F<small>酒店用品城</small></h3>
                                      </div>
                                  </div>
                                  <div class="col-md-3">
                                      <a class="thumbnail" name="6"  href="#signInModal" data-toggle="modal" onClick="createCode();"><img alt="" src="./images/6.png"></a>
                                      <div class="carousel-caption">
                                          <h3>6F<small>和生干仓</small></h3>
                                      </div>
                                  </div>
                                  <div class="col-md-3">
                                      <a class="thumbnail" name="7"  href="#signInModal" data-toggle="modal" onClick="createCode();"><img alt="" src="./images/7.png"></a>
                                      <div class="carousel-caption">
                                          <h3>7F<small>和生冷库</small></h3>
                                      </div>
                                  </div>       
                              </div>
                          </div>
                      </div>
                      <a data-slide="prev" href="#media" class="left carousel-control">‹</a>
                      <a data-slide="next" href="#media" class="right carousel-control">›</a>
                  </div>                          
              </div>
          </div>
      </div>
      <footer>
          <span>copyright@2014 All Rights Reserved.</span>
      </footer>
      
      
      <!--弹出框start-->
		      <div id="signInModal" class="modal fade in" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                  <div class="modal-dialog">
                      <div class="modal-content" style="margin-top: 150px;">
                          <div class="modal-header">
                              <a class="btn btn-default" data-dismiss="modal"><span class="glyphicon glyphicon-remove"></span></a>
                              <div class="modal-title" id="myModalLabel">
                                  <div class="container">
                                      <div class="row">
                                          <div class="col-md-1" style="margin-top: 10px;">
                                              <img src="images/logo.png" id="logo"/>
                                          </div>
                                          <div class="col-md-4 myhead">
                                              <div class="row"><h4>在线选铺系统</h4></div>
                                              <div class="row"><h6>ONLINE SHOP MANAGEMENT SYSTEM</h6></div>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          </div>
                          <div class="modal-body">
                              <div class="container">
                                  <div class="row">
                                      <div class="col-md-7 leftPart">
                                          <img src="images/logo3.jpg" class="img-responsive img-circle"/>
                                      </div>
                                      <div class="col-md-5 rightPart">
                                          <form id="loginForm" role="form" action="login" method="post" onSubmit="return validate()">
                                              <div class="form-group">
                                                  <label for="username">帐号:</label>
                                                  <input type="text" class="form-control" id="signIn_username" placeholder="帐号" name="username">
                                              </div>
                                              <div class="form-group">
                                                  <label for="userpassword">密码:</label>
                                                  <input type="password" class="form-control" id="signIn_password" placeholder="密码" name="password">
                                              </div>
                                              <div class="form-group myIdentifyPart">
                                                  <label for="identify">验证码:</label><br>
												 <div class="form-inline">
												  <input type="text" class="form-control"  id="signIn_identify" placeholder="验证码"/>
                                                  <input type="button" id="checkCode" class="code form-control"  onClick="createCode()" /> 
                                                  <a href="#" onClick="createCode()">看不清,换一张</a>
                                                  </div>
                                              </div>
                                              <button id="Button1" type="submit" class="btn btn-block btn-success">提&nbsp;&nbsp;交</button>
                                          </form>
                                      </div>
                                      
                                  </div>
                              </div>
                          </div>
                          <hr/>
                          <div class="modal-footer">
                              <footer>copyright@2014  All Rights Reserved.</footer>
                          </div>
                      </div>
                  </div>
              </div>
      <!--弹出框end--> 

	  
	  <!--弹出框start-->
		      <div id="signUpModal" class="modal fade in" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                  <div class="modal-dialog">
                      <div class="modal-content">
                          <div class="modal-header">
                              <a class="btn btn-default" data-dismiss="modal"><span class="glyphicon glyphicon-remove"></span></a>
                              <div class="modal-title" id="myModalLabel">
                                  <div class="container">
                                      <div class="row">
                                          <div class="col-md-1" style="margin-top: 10px;">
                                              <img src="images/logo.png" id="logo"/>
                                          </div>
                                          <div class="col-md-4 myhead">
                                              <div class="row"><h4>在线选铺系统</h4></div>
                                              <div class="row"><h6>ONLINE SHOP MANAGEMENT SYSTEM</h6></div>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          </div>
                          <div class="modal-body">
                              
                                  <div class="row">
                                      <div class="col-md-7 leftPart">
                                          <img src="images/logo4.jpg" class="img-responsive img-rounded"/>
                                      </div>
                                      <div class="col-md-5 rightPart">
                                          
										  <form id="form-signup_v1"
											  name="form-signup_v1"
											  method="POST"
											  class="validation-form-container">

											<div class="field">
												<label for="signup_v1-username">帐号</label>
												<div class="ui left labeled input" id="usernameDiv">
													<input id="username"
														   name="signup_v1[username]"
														   type="text"
														   data-validation="[NOTEMPTY]"
														   data-validation-message="请填写帐号"
														   data-validation-regex="/admin/i"
														   data-validation-regex-message="该帐号已被注册" >

													<div class="ui corner label">
														<i class="asterisk icon">*</i>
													</div>
												</div>
											</div>
											<div class="field">
												<label for="signup_v1-password">密码</label>
												<div class="ui left labeled input">

													<input id="password"
														   name="signup_v1[password]"
														   type="password" data-validation="[L>=3]"
														   data-validation-message="长度至少3个字符">

													<div class="ui corner label">
														<i class="asterisk icon">*</i>
													</div>
												</div>
											</div>
											<div class="field">
												<label for="signup_v1-password-confirm">确认密码</label>
												<div class="ui left labeled input">

													<input id="password-confirm"
														   name="signup_v1[password-confirm]"
														   type="password"
														   data-validation="[V==signup_v1[password]]"
														   data-validation-message="两次输入密码不一致">

													<div class="ui corner label">
														<i class="asterisk icon">*</i>
													</div>
												</div>
											</div>
											
											<div class="field">
												<label for="signup_v1-person">联系人</label>
												<div class="ui left labeled input">

													<input id="person"
														   name="signup_v1[person]"
														   type="text"
														   data-validation="[NOTEMPTY]"
														   data-validation-message="请填写联系人姓名">

													<div class="ui corner label">
														<i class="asterisk icon">*</i>
													</div>
												</div>
											</div>
											
											<div class="field">
												<label for="signup_v1-phone">手机号码</label>
												<div class="ui left labeled input" id="phoneDiv">

													<input id="phone"
														   name="signup_v1[phone]"
														   type="text"
														   data-validation="[PHONE]"
														   data-validation-message="手机号码格式不正确">

													<div class="ui corner label">
														<i class="asterisk icon">*</i>
													</div>
												</div>
											</div>
											
											<div class="field">
												<label for="signup_v1-email">邮箱</label>
												<div class="ui left labeled input" id="emailDiv">

													<input id="email"
														   name="signup_v1[email]"
														   type="text"
														   data-validation="[EMAIL]"
														   data-validation-message="邮箱格式不正确">
													<div class="ui corner label">
														<i class="asterisk icon">*</i>
													</div>
												</div>
											</div>

											<input type="submit" class="btn btn-block btn-info" value="注册">
										</form>							  
										  
                                      </div>
                                      
                               
                          </div>
                          <hr/>
                          <div class="modal-footer">
                              <footer>copyright@2014  All Rights Reserved.</footer>
                          </div>
                      </div>
                  </div>
              </div>
      <!--弹出框end--> 
       
        <script src="http://cdn.bootcss.com/jquery/1.11.1/jquery.min.js"></script>
       <script src="./js/showSwitch.js"></script>
        <script src="http://cdn.bootcss.com/bootstrap/3.3.0/js/bootstrap.min.js"></script>
        <script src="./js/identifyCode.js"></script>
		<script src="./js/validation.js"></script>
		<script>
			var publicElement = (function () {
				this.ip = "10.103.240.91";
				this.port = "8888";
				return this;
			})();
			
			$('#form-signup_v1').validate({
				submit: {
					settings: {
						inputContainer: '.field'
					},
					callback: {
						onBeforeSubmit: function (node) {
							
							myBeforeSubmitFunction();

						},
						onSubmit: function (node) {

							console.log('#' + node.id + ' has a submit override.');

						}
					}
				},
				debug: true
			});

			function myBeforeSubmitFunction() {
				
				$("#username").on("focus",function(){
						if($("#usernameDiv .error-list").length > 0){
						console.log($("#usernameDiv .error-list").length);
							$("#username").removeClass("error");
							$("#usernameDiv").parent().removeClass("error");
							$("#usernameDiv .error-list").remove();
							
						}		
				})
				
				$("#phone").on("focus",function(){
							if($("#phoneDiv .error-list").length > 0){
								$("#phone").removeClass("error");
								$("#phoneDiv").parent().removeClass("error");
								$("#phoneDiv .error-list").remove();
								
							}		
				})
					
				$("#email").on("focus",function(){
							if($("#emailDiv .error-list").length > 0){
								$("#email").removeClass("error");
								$("#emailDiv").parent().removeClass("error");
								$("#emailDiv .error-list").remove();
								
							}		
				})
				
				var  nameurl = "http://"+publicElement.ip+":"+publicElement.port+"/vmapAPI/company!checkName?name="+$("#username").val()+"&jsoncallback=?";
				var $nameError = $('<div class="error-list" data-error-list=""><ul><li>该帐号已被注册</li></ul></div>');
				$.getJSON(nameurl,function(result){
						if(result.success){
								$("#username").addClass("error");
								$("#usernameDiv").parent().addClass("error");
								$("#usernameDiv").append($nameError );
							return false;
						}
						else{
							
							var  phoneurl = "http://"+publicElement.ip+":"+publicElement.port+"/vmapAPI/company!checkPhone?phone="+$("#phone").val()+"&jsoncallback=?";
							var $phoneError = $('<div class="error-list" data-error-list=""><ul><li>该手机号已被注册</li></ul></div>');
							$.getJSON(phoneurl,function(result){
									if(result.success){
											$("#phone").addClass("error");
											$("#phoneDiv").parent().addClass("error");
											$("#phoneDiv").append($phoneError );
										return false;
									}
									else{
										
										var  emailurl = "http://"+publicElement.ip+":"+publicElement.port+"/vmapAPI/company!checkEmail?email="+$("#email").val()+"&jsoncallback=?";
										var $emailError = $('<div class="error-list" data-error-list=""><ul><li>该邮箱已被注册</li></ul></div>');
										$.getJSON(emailurl,function(result){
												if(result.success){
														$("#email").addClass("error");
														$("#emailDiv").parent().addClass("error");
														$("#emailDiv").append($emailError );
													return false;
												}
												else{
													addCompany();
													return true;
												}
											}
										)
									}
								}
							)
							
						}
					}
				)			
			}
			
			
			
			function addCompany() {
				var url = 'http://'+publicElement.ip+":"+publicElement.port+'/vmapAPI/insert!insert_company?jsonstr=';
				var data = {
					company_name_ch: "",
					company_name_en: "",
					show_name: $("#username").val(),
					phone: $("#phone").val(),
					con_per: $("#person").val(),
					contact: $("#password").val(),
					email: $("#email").val(),
					company_color: "",
					address_ch: "",
					address_en: "",
					other_info: "",
					alt_con: ""
				}
				
				data = JSON.stringify(data);
				url += data+"&jsoncallback=?";
				$.post(url,function(data){
					if( data.success ){
					
						$("#signUpModal").modal("hide");
						alert("注册成功，请登录");
						$("#form-signup_v1").find('input').val("");
					}
					
				},"json");
				return false;
			}
			
		</script>
    </body>
</html>

