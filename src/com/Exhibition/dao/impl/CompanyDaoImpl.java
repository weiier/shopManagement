package com.Exhibition.dao.impl;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.orm.hibernate3.HibernateTemplate;
import org.springframework.stereotype.Component;

import com.Exhibition.dao.CompanyDao;
import com.Exhibition.model.Company;
@Component
public class CompanyDaoImpl implements CompanyDao{
	private HibernateTemplate hibernateTemplate;
	@Override
	public Company CheckUser(String name, String password) {
		List<Company> companys = this.hibernateTemplate.find("from Company c where c.show_name='"+name+"' and c.contact='"+password+"'");
		if(companys.size() > 0 && companys != null){
			String date = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date());			
			this.hibernateTemplate.bulkUpdate("update Company set last_time='"+date+"' where show_name='"+name+"' and contact='"+password+"'");
			return companys.get(0);
		}else {
			return null;
		}
	}

	public HibernateTemplate getHibernateTemplate() {
		return hibernateTemplate;
	}
	@Resource
	public void setHibernateTemplate(HibernateTemplate hibernateTemplate) {
		this.hibernateTemplate = hibernateTemplate;
	}
	
}
