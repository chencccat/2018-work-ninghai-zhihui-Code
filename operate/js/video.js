
/*
	播放之视频的功能
*/

	var myVideo = null;
	var a = 0;
	onload = function(){
		myVideo = document.getElementById("_myVideo");
		myVideo.currentTime = 0;
	}

	function btnPause(){
		if(myVideo.played){
			myVideo.pause();

		};
	};

	function btnPlay(){
		if(myVideo.paused){
			myVideo.play();

		};
	};


	function btnStop(){
		myVideo.currentTime = 0;
		myVideo.pause();
	};

	var timeout = null;

	// function hideButtons(){
	// 	$(".codrops-demos").css("display","block");
	// 	timeout = setTimeout(function(){
	// 		$(".codrops-demos").css("display","none");
	// 	},3000);
	// }

	//设置音量
	function changeVolume(msg){
		if(msg!=null && msg!=""){
			var volumeNo = msg.substring(6,msg.length);
			if(!isNaN(volumeNo)){
				myVideo.volume = volumeNo/10;
			}else{
				myVideo.volume = 1;
			}
		}
	}

	//快进
	function goAhead(){
		myVideo.currentTime += 10;
	}

	//快退
	function goBack(){
		myVideo.currentTime -= 10;
	}
