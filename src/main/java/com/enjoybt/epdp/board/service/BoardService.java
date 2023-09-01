package com.enjoybt.epdp.board.service;

import java.util.List;
import java.util.Map;

//import com.enjoybt.epdp.dto.PageCriteria;

public interface BoardService {
	public void insertData(double humidity, double temperature, double waterlevel, double velocity, String wlobscd,String thobscd,String frobscd) throws Exception;
	public void insertTh(double humidity, double temperature, String thobscd) throws Exception;
	public void insertFr(double velocity, String frobscd) throws Exception;
	public void insertWl(double waterlevel, String wlobscd) throws Exception;

	public double selectData() throws Exception;
}
