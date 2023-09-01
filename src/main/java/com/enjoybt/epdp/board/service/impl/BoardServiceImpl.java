package com.enjoybt.epdp.board.service.impl;

import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.inject.Inject;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Service;

import com.enjoybt.epdp.board.service.BoardService;
//import com.enjoybt.epdp.dto.PageCriteria;

@Service
public class BoardServiceImpl implements BoardService {
	private static final String NAMESPACE = "board";
	
	@Inject
	private SqlSession sqlSession;

	@Override
	public void insertData(double humidity, double temperature, double waterlevel, double velocity, String wlobscd,String thobscd,String frobscd) throws Exception {
		// TODO Auto-generated method stub
		Map<String, Object> tmp_wl = new HashMap<String, Object>();
		Map<String, Object> tmp_fr = new HashMap<String, Object>();
		Map<String, Object> tmp_th = new HashMap<String, Object>();

		SimpleDateFormat formatter= new SimpleDateFormat("yyyyMMddHH");
		Date date = new Date(System.currentTimeMillis());
		String ymdhm = formatter.format(date);

		System.out.println(System.currentTimeMillis());
		System.out.println(ymdhm);

		tmp_wl.put("ymdhm",ymdhm);
		tmp_th.put("ymdhm",ymdhm);
		tmp_fr.put("ymdhm",ymdhm);
		tmp_wl.put("wlobscd",wlobscd);
		tmp_th.put("thobscd",thobscd);
		tmp_fr.put("frobscd",frobscd);

		System.out.println(wlobscd);
		System.out.println(thobscd);
		System.out.println(frobscd);

		tmp_th.put("hm", humidity);
		tmp_th.put("tp", temperature);

		tmp_wl.put("wl", waterlevel);

		tmp_fr.put("fr", velocity);
		
		sqlSession.insert(NAMESPACE+".insertWlData", tmp_wl);
		sqlSession.insert(NAMESPACE+".insertThData", tmp_th);
		sqlSession.insert(NAMESPACE+".insertFrData", tmp_fr);
	}

	@Override
	public void insertTh(double humidity, double temperature, String thobscd) throws Exception {
		Map<String, Object> tmp_th = new HashMap<String, Object>();

		SimpleDateFormat formatter= new SimpleDateFormat("yyyyMMddHH");
		Date date = new Date(System.currentTimeMillis());
		String ymdhm = formatter.format(date);

		System.out.println(System.currentTimeMillis());
		System.out.println(ymdhm);

		tmp_th.put("ymdhm",ymdhm);
		tmp_th.put("thobscd",thobscd);

		System.out.println(thobscd);

		tmp_th.put("hm", humidity);
		tmp_th.put("tp", temperature);

		sqlSession.insert(NAMESPACE+".insertThData", tmp_th);
	}

	@Override
	public void insertFr(double velocity, String frobscd) throws Exception {
		Map<String, Object> tmp_fr = new HashMap<String, Object>();

		SimpleDateFormat formatter= new SimpleDateFormat("yyyyMMddHH");
		Date date = new Date(System.currentTimeMillis());
		String ymdhm = formatter.format(date);

		System.out.println(System.currentTimeMillis());
		System.out.println(ymdhm);

		tmp_fr.put("ymdhm",ymdhm);
		tmp_fr.put("frobscd",frobscd);

		System.out.println(frobscd);

		tmp_fr.put("fr", velocity);

		sqlSession.insert(NAMESPACE+".insertFrData", tmp_fr);
	}

	@Override
	public void insertWl(double waterlevel, String wlobscd) throws Exception {
		Map<String, Object> tmp_wl = new HashMap<String, Object>();

		SimpleDateFormat formatter= new SimpleDateFormat("yyyyMMddHH");
		Date date = new Date(System.currentTimeMillis());
		String ymdhm = formatter.format(date);

		System.out.println(System.currentTimeMillis());
		System.out.println(ymdhm);

		tmp_wl.put("ymdhm",ymdhm);
		tmp_wl.put("wlobscd",wlobscd);

		System.out.println(wlobscd);

		tmp_wl.put("wl", waterlevel);

		sqlSession.insert(NAMESPACE+".insertWlData", tmp_wl);
	}

	@Override
	public double selectData() throws Exception {

		return sqlSession.selectOne(NAMESPACE+".selectData");
	}


}
