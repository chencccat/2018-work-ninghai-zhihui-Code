/*
	客户端连接播控的代码
*/
var socket = null;
$(function(){
	setTimeout("linkSocket()",30);
	setTimeout("linkSocket()",35000);
});

// 连接操作
function linkSocket(){
	// 1.连接服务器
	socket = io.connect('http://localhost:1800');
	// socket = io.connect('http://192.168.1.10:1800'); // server ip
	var mName = "192.168.1.199"; // local ip
	socket.emit('newUser', mName);

	// 连接成功返回提示
	socket.on('open', function(json){
		console.log(json);
	});

	// 2.监听服务器端的命令
	var serverMsgName = "serverMsg"+mName;
	socket.on(serverMsgName, function(json){
		console.log(json);
		// 根据命令做执行对应的操作
		dealData(json);
	});

	// 3.断开连接
	socket.on('DisconnectReq', function(){
		socket.emit('disconnect');
	});
}

function btnClick(msg){
	console.log(msg);
	socket.emit("message",'192.168.1.35',msg);
}

function dealData(msg){
	console.log(msg);
	switch(msg){
		case "pause":
			btnPause();
			$("._videoBox").attr("lang", "true");
      $("._btn_pause").removeClass("_btn_pause").addClass("_btn_play");
			_videoEnd();

			break;
		case "play":
			btnPlay();
			$("._videoBox").attr("lang", "false");
      $("._btn_play").removeClass("_btn_play").addClass("_btn_pause");
			_videoEnd();

			break;
		case "scroll":
			_changeScroll();
			break;
	};

	if(msg.indexOf("volume")>=0){
		changeVolume(msg);
	};

	if(msg.indexOf("btnScroll")>=0){
		_changeBtnScroll(msg);
	};

	if (msg.indexOf("link")>=0) {
		// 跳转页面
		_changeData(msg);
	};

	if(msg.indexOf("caseVal")>=0){
		// page2 按钮的下拉菜单 特色文化品牌
		_changeCaseVal(msg);
	};

	if(msg.indexOf("exampleVal")>=0){
		// page1 按钮的下拉菜单 非物质文化遗产
		_changeExampleVal(msg);
	};

	if(msg.indexOf("vSrc")>=0){
		// page4 按钮的下拉菜单 璀璨文教
		_changeVSrc(msg);
	};




};

var url = window.location.pathname;
    url = url.substring(url.lastIndexOf('/') + 1, url.length);

var LASTCLICK = '';

var timeout = false;

var _changeScroll = function(){
	if (timeout){
      clearTimeout(timeout);
      $("._btnOpacity li").fadeTo("slow", 1);
  };
  timeout = setTimeout(function(){
     _videoPageBtn();
  },3000);
};

var _changeBtnScroll = function(msg){
	if (msg!=null && msg!="") {
		var oScroll = msg.substring(9,msg.length);
		if (!isNaN(oScroll)) {
			$("._btnControl").scrollTop(oScroll);
		};
	};
};

var _changeVSrc = function(msg){
	if(msg!=null && msg!=""){
		var oDate = msg.substring(4,msg.length);
		if(!isNaN(oDate)){
			LASTCLICK = $("._v_src p").eq(oDate).html();
      $("._v_src p").css("background-image", "url(images/btn-small-nol.png)");
      $("._v_src p").eq(oDate).css("background-image", "url(images/btn-small-click.png)");

      var arrSrc = ['video1', 'video2', 'video3'];

      $("._videoBox").attr("lang", "false");
      $("._btn_play").removeClass("_btn_play").addClass("_btn_pause");

      $("._myVideo").attr("src", "video/page4/" + arrSrc[oDate] + ".mp4");
      myVideo.load();

      $("._btnOpacity li").fadeTo("slow", 1);

      setTimeout(function() {
          _videoPageBtn();
      }, 1000);


		};
	};
};

var _changeExampleVal = function(msg){
	if(msg!=null && msg!=""){
		var oVal = msg.substring(10,msg.length);
		if(!isNaN(oVal)){
			LASTCLICK = $("._example_val p").eq(oVal).html();
      $("._example_val p").css("background-image", "url(images/btn-small-nol.png)");
      $("._example_val p").eq(oVal).css("background-image", "url(images/btn-small-click.png)");

			$("._example_left div img").attr("src", "images/page1/" + _exampleWord[oVal]._pic1 + ".jpg");
      $("._example_right div img").attr("src", "images/page1/" + _exampleWord[oVal]._pic2 + ".jpg");
      $("._example_bottom div h1").html(_exampleWord[oVal]._title);
      $("._example_bottom div ul").html(_exampleWord[oVal]._word);
		};
	};

};


var _changeCaseVal = function(msg){
	if(msg!=null && msg!=""){
		var _caseVal = msg.substring(7,msg.length);
		if(!isNaN(_caseVal)){
			LASTCLICK = $("._case_val p").eq(_caseVal).html();
      $("._case_val p").css("background-image", "url(images/btn-small-nol.png)");
      $("._case_val p").eq(_caseVal).css("background-image", "url(images/btn-small-click.png)");

			if (_caseVal == 1) {
            $("._case_left").removeClass("_case_left").addClass("_case_left2");
            $("._case_right").removeClass("_case_right").addClass("_case_right2");
						$("._case_left2 div img").attr("src", "images/page2/2-1.jpg");
            $("._case_right2 div img").attr("src", "images/page2/2-2.jpg");

			      if ($("._case_right2 div").length < 2) {
							$("._case_right2").append('<div><img src="images/page2/2-3.jpg"></div>');
						};
        } else {
            $("._case_left2").removeClass("_case_left2").addClass("_case_left");
            $("._case_right2").removeClass("_case_right2").addClass("_case_right");
            $("._case_right").children("div").eq(1).remove();
        };

        $("._case_left div img").attr("src", "images/page2/" + _caseWord[_caseVal]._pic1 + ".jpg");
        $("._case_right div img").attr("src", "images/page2/" + _caseWord[_caseVal]._pic2 + ".jpg");
        $("._case_bottom div h1").html(_caseWord[_caseVal]._title);
        $("._case_bottom div ul").html(_caseWord[_caseVal]._word);
		};
	};
};


var _changeData = function(msg) {
	if(msg!=null && msg!=""){
		var oDate = msg.substring(4,msg.length);
		if(!isNaN(oDate)){
			$("._nav").css("background-image", "");
      $("._btnControl li").eq(oDate).children("._nav").css("background-image", "url(images/btn-click.png)");

		  // ---------- 判断下拉列表 ---------

		  if ($("._btnControl li").eq(oDate).attr("showLang") == 'false') {

		      $("._btnControl li").eq(oDate).children("._nav").next("._btnList").css("display", "block");
		      $("._btnControl li").eq(oDate).children("._nav").next("._btnList").children("p").css("background-image", "");
		      $("._btnControl li").eq(oDate).attr("showLang", "true");

		      $("._btnControl li").eq(oDate).children("._nav").next("._btnList").children("p").each(function(i, v) {
						if($(v).html() == LASTCLICK){
							$("._btnList p").css("background-image", "url(images/btn-small-nol.png)");
							$(v).css("background-image", "url(images/btn-small-click.png)");
						};
		      });

		  } else if ($("._btnControl li").eq(oDate).attr("showLang") == 'true') {

		      $("._btnControl li").eq(oDate).children("._nav").next("._btnList").css("display", "none");
		      $("._btnControl li").eq(oDate).attr("showLang", "false");

		  };


      // ------- 跳转页面 -------
      if ($("._btnControl li").eq(oDate).attr("page") != url) {

        if ($("._btnControl li").eq(oDate).attr("page") == 'iframe1.html') {
            window.location.href = "iframe1.html";

        }else if ($("._btnControl li").eq(oDate).attr("page") == 'iframe2.html'){
            window.location.href = "iframe2.html";

        } else if ($("._btnControl li").eq(oDate).attr("page") == 'index.html'){
            window.location.href = "index.html";

        }else {
            window.location.href = "page" + (parseInt(oDate)-parseInt(1)) + ".html";
        };

      };


		};
	};

};

