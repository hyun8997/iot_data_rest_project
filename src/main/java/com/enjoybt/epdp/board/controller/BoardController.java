package com.enjoybt.epdp.board.controller;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.servlet.http.HttpServletResponse;

import org.apache.commons.io.FilenameUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.enjoybt.epdp.board.service.BoardService;
//import com.enjoybt.epdp.dto.PageCriteria;
//import com.enjoybt.epdp.dto.PagingMaker;

@Controller
public class BoardController {
	
	private static Logger LOGGER = LoggerFactory.getLogger(BoardController.class);
	
	private static final String FILE_PATH = "C:/savedFiles/";
	
	@Autowired
	BoardService boardService;

	@RequestMapping(value="/")
	public String mainPage() throws Exception{

		return "/default";
	}

	@RequestMapping(value = "/api/iot/insert", method = RequestMethod.POST)
	@ResponseBody
	public String insertIotValues(
			@RequestParam(value = "humidity", required = false) double humidity,
			@RequestParam(value = "temperature", required = false) double temperature,
			@RequestParam(value = "waterlevel", required = false) double waterlevel,
			@RequestParam(value = "velocity", required = false) double velocity,
			@RequestParam(value = "frobscd", required = false) String frobscd,
			@RequestParam(value = "thobscd", required = false) String thobscd,
			@RequestParam(value = "wlobscd", required = false) String wlobscd
	){
		System.out.println("humidity " + humidity);
		System.out.println("temperature " + temperature);
		System.out.println("waterlevel " + waterlevel);
		System.out.println("velocity " + velocity);

		try {
			boardService.insertData(humidity, temperature, waterlevel, velocity, wlobscd, thobscd, frobscd);
			return "Success";
		}
		catch (Exception e) {
			return "Fail";
		}
	}

	@RequestMapping(value = "/api/iot/th", method = RequestMethod.POST)
	@ResponseBody
	public String insertIotTh(
			@RequestParam(value = "humidity", required = false) double humidity,
			@RequestParam(value = "temperature", required = false) double temperature,
			@RequestParam(value = "thobscd", required = false) String thobscd
	){
		System.out.println("humidity " + humidity);
		System.out.println("temperature " + temperature);

		try {
			boardService.insertTh(humidity, temperature, thobscd);
			return "Success";
		}
		catch (Exception e) {
			return "Fail";
		}
	}

	@RequestMapping(value = "/api/iot/fr", method = RequestMethod.POST)
	@ResponseBody
	public String insertIotFr(
			@RequestParam(value = "velocity", required = false) double velocity,
			@RequestParam(value = "frobscd", required = false) String frobscd
	){
		System.out.println("velocity " + velocity);

		try {
			boardService.insertFr(velocity, frobscd);
			return "Success";
		}
		catch (Exception e) {
			return "Fail";
		}
	}

	@RequestMapping(value = "/api/iot/wl", method = RequestMethod.POST)
	@ResponseBody
	public String insertIotWl(
			@RequestParam(value = "waterlevel", required = false) double waterlevel,
			@RequestParam(value = "wlobscd", required = false) String wlobscd
	){
		System.out.println("waterlevel " + waterlevel);

		try {
			boardService.insertWl(waterlevel, wlobscd);
			return "Success";
		}
		catch (Exception e) {
			return "Fail";
		}
	}

	
	// 테스트용임
	@RequestMapping(value = "/epdp/download.do", method = RequestMethod.GET)
	@ResponseBody
	public void downlod(HttpServletResponse response,
			      @RequestParam (value = "file_name") String filename) throws Exception {

		System.out.println(filename);
		System.out.println(boardService.selectData());

	}
//
//	@RequestMapping(value = "/epdp/deleteFile.do")
//	public String deleteFile(HttpServletResponse response,
//			      @RequestParam (value = "file_num") int file_num,
//			      @RequestParam (value = "board_num") int board_num) throws Exception{
//
//		System.out.println(file_num);
//
//		boardService.updateFile(file_num);
//
//        return "redirect:/epdp/board/update.do?board_num="+board_num;
//	}

	
	
	
}
