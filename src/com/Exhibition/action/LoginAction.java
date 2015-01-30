package com.Exhibition.action;
import java.util.Map;
import javax.annotation.Resource;
import org.apache.struts2.interceptor.SessionAware;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.Exhibition.model.Company;
import com.Exhibition.service.CompanyManager;
import com.opensymphony.xwork2.ActionSupport;
@Component
@Scope("prototype")
public class LoginAction extends ActionSupport implements SessionAware{
	private String username;
	private String password;
	private CompanyManager cm;
	private Map<String,Object> session;
	
	public String execute(){
		try {
			Company loginer = cm.CheckCompany(username, password);
			if(loginer != null){
					session.clear();
					session.put("user",loginer);
					return "success";
			}else {
				System.out.println("null~~~~");
				return "fail";
			} 
		} catch (Exception e) {
			return "fail";
		}
	}
	

	public CompanyManager getCm() {
		return cm;
	}

	@Resource
	public void setCm(CompanyManager cm) {
		this.cm = cm;
	}


	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}

	public Map<String, Object> getSession() {
		return session;
	}

	public void setSession(Map<String, Object> session) {
		this.session = session;
	}
	
}
