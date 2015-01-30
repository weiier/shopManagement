package com.Exhibition.service;

import javax.annotation.Resource;
import org.springframework.stereotype.Component;

import com.Exhibition.dao.CompanyDao;
import com.Exhibition.model.Company;
@Component
public class CompanyManager {
	private CompanyDao companyDao;

	public Company CheckCompany(String username,String password){
		return this.companyDao.CheckUser(username, password);
	}
	
	public CompanyDao getCompanyDao() {
		return companyDao;
	}
	@Resource
	public void setCompanyDao(CompanyDao companyDao) {
		this.companyDao = companyDao;
	}
	
	
}
