var url = window.location.pathname;
    url = url.substring(url.lastIndexOf('/') + 1, url.length);

$(function() {
    // _btnScroll();
    _btnControls();
    switch(url){
        case 'index.html':
          _blueFlash();
          _redFlash();
          _wordShow();
          break;
        case 'iframe1.html':
          _showList();
          break;
        case 'iframe2.html':
          _showList();
          break;
        case 'page1.html':
          _exampleHtml();
          _showList();
          break;
        case 'page2.html':
          _caseHtml();
          _showList();
          break;
        case 'page3.html':
          _testScroll(demo,demo1,demo2);
          _testScroll(txtDemo,txtDemo1,txtDemo2);
          _showList();
          break;
        case 'page4.html':
          _btnVideo();
          _videoSrc();
          _navScroll();
          _showList();
          break;
        default:
        window.location.href = 'index.html';

    };


});

var _showList = function(){
    $("._btnControl li").css("display","none");
    $("._showList").css("display","block");
};

var LASTCLICK = '';

var _redFlash = function(){
    // 图片不透明度，轮流显示

    for (var i = 0; i < 76; i++) {
        $("._redFlash").append('<li alt="'+(i+1)+'"></li>');
    };

    var b = 0;
    setInterval(function() {
        if(b>76){
            b = 0;
        }
        $('._redFlash ._flash').removeClass('_flash');
        $("._redFlash li").eq(b).addClass("_flash");
        $("._redFlash li").eq(b+6).addClass("_flash");
        $("._redFlash li").eq(b+12).addClass("_flash");
        b++;
    },500);
};

var _blueFlash = function() {
    // 图片不透明度，轮流显示
    for (var i = 0; i < 43; i++) {
        $("._blueFlash").append('<li alt="'+(i+1)+'"></li>');
    };

    var a = 0;
    setInterval(function () {
        if(a>43){
            a = 0;
        }
        $('._blueFlash ._flash').removeClass('_flash');
        $("._blueFlash li").eq(a).addClass("_flash");
        $("._blueFlash li").eq(a+6).addClass("_flash");
        a++;
    },500);
};

var _btnControls = function() {

    // btn
    $("._btnControl li").each(function(i, v) {
        $(this).attr("showLang", "true");
        if (i == 0) {
            $(this).attr("page", "iframe" + (i + 1) + ".html");
        }else if(i == 1){
            $(this).attr("page", "iframe" + (i + 1) + ".html");
        }else if(i == 6){
            $(this).attr("page", "index.html");
        }else {
            $(this).attr("page", "page" + (i - 1) + ".html");
        };

    });

    $("._btnControl li ._nav").on("click", function() {
        var index = $(this).parent("li").index();
        $("._nav").css("background-image", "");
        $(this).css("background-image", "url(images/btn-click.png)");
        btnClick('link'+index);

        if ($(this).parent("li").attr("page") != url) {

            if ($(this).parent("li").attr("page") == 'iframe1.html') {
                window.location.href = "iframe1.html";

            }else if ($(this).parent("li").attr("page") == 'iframe2.html'){
                window.location.href = "iframe2.html";

            } else if ($(this).parent("li").attr("page") == 'index.html'){
                window.location.href = "index.html";

            }else {
                window.location.href = "page" + (index - 1) + ".html";

            };

        };


        if ($(this).parent("li").attr("showLang") == 'false') {

            $(this).next("._btnList").css("display", "block");
            $(this).next("._btnList").children("p").css("background-image", "");
            $(this).parent("li").attr("showLang", "true");

            $(this).next("._btnList").children("p").each(function(i, v) {
				if($(v).html() == LASTCLICK){
					$("._btnList p").css("background-image", "url(images/btn-small-nol.png)");
					$(v).css("background-image", "url(images/btn-small-click.png)");
				};
            });

        } else if ($(this).parent("li").attr("showLang") == 'true') {
            $(this).next("._btnList").css("display", "none");
            $(this).parent("li").attr("showLang", "false");

        };

    });

    $("._btnList p").on("click", function() {
        LASTCLICK = $(this).html();
        $("._btnList p").css("background-image", "url(images/btn-small-nol.png)");
        $(this).css("background-image", "url(images/btn-small-click.png)");
    });


};

var _wordShow = function() {
    $('._anOpacity').removeClass('_anOpacity');
    $("._msgWord li").eq(0).addClass("_anOpacity");

    var _msgWord = $("._msgWord li");
    var i = 0;
    var len = _msgWord.length;
    setInterval(function() {
        if (i > len - 1) {
            i = 0;
        }
        $('._anOpacity').removeClass('_anOpacity');
        $("._msgWord li").eq(i).addClass("_anOpacity");
        i++;

    }, 2000);


};

// page3
var _testScroll = function(demo,demo1,demo2){
    var speed=80;
    var MyMarh=setInterval(scrolledArea,speed);

    demo2.innerHTML=demo1.innerHTML;


    demo.onmouseover=function(){
        clearInterval(MyMarh);
    };

    demo.onmouseout=function(){
        MyMarh=setInterval(scrolledArea,speed);
    };

    function scrolledArea(){
        if(demo2.offsetHeight-demo.scrollTop<=0){
           demo.scrollTop-=demo1.offsetHeight;
        }else{
           demo.scrollTop++;
        }
    };

};

// page4
var _btnVideo = function() {

    $("._videoBox").on("click", function() {
        var arr = $("._videoBox").attr("lang");
        if (arr == "false") {
            btnPause();
            btnClick('pause');

            $("._videoBox").attr("lang", "true");
            $("._btn_pause").removeClass("_btn_pause").addClass("_btn_play");
        } else {
            btnPlay();
            btnClick('play');

            $("._videoBox").attr("lang", "false");
            $("._btn_play").removeClass("_btn_play").addClass("_btn_pause");
        };
        _videoEnd();
    });
};


var _videoEnd = function() {
    myVideo.addEventListener('ended', function() {
        myVideo.currentTime = 0;
        $("._videoBox").attr("lang", "false");
        $("._btn_play").removeClass("_btn_play").addClass("_btn_pause");
    }, false);
};

var _videoSrc = function() {
    _videoPageBtn();

    $("._v_src").siblings("h3._nav").on("click", function(){
        $("._btnOpacity li").fadeTo("slow", 1);

        setTimeout(function() {
            _videoPageBtn();
        }, 3000);
    });

    $("._v_src p").on("click", function() {
        var index = $(this).index();
        btnClick('vSrc'+index);
        var arrSrc = ['video1', 'video2', 'video3'];
        $("._videoBox").attr("lang", "false");
        $("._btn_play").removeClass("_btn_play").addClass("_btn_pause");

        $("._myVideo").attr("src", "video/page4/" + arrSrc[index] + ".mp4");
        myVideo.load();

        $("._btnOpacity li").fadeTo("slow", 1);
        setTimeout(function() {
            _videoPageBtn();
        }, 3000);

    });
};


var _btnScroll = function(){
    $("._btnControl").scroll(function(){
        var _a = $("._btnControl").scrollTop();
        // console.log(_a+" px");
        btnClick('btnScroll'+_a);
    });
};

var timeout = false;

var _navScroll = function(){

    $("._btnOpacity").on("click",function(){

        btnClick('scroll');
        if (timeout){
            clearTimeout(timeout);
            $("._btnOpacity").fadeTo("slow", 1);
        };
        timeout = setTimeout(function(){
           _videoPageBtn();
        },6000);
    });
};

var _videoPageBtn = function() {
    $("._btnOpacity").eq(0).fadeTo("slow", 0.30);
    $("._btnOpacity").eq(1).fadeTo("slow", 0.35);
};





// page2

/*
word
*/
var _caseVal_1 = '<li>“百姓大舞台”活动采取党政搭台、群众唱戏的方式，力促群众自办节目、自我服务，变“送文化”为“种文化”，变“文化输血”为“文化造血”，打通公共文化服务“最后一公里”，提升群众文化获得感。</li>';
_caseVal_1 += '<li>目前，宁海县已举办乡村“百姓大舞台”活动300余场次，场场不重复，受惠群众达13万余人次。</li>';

var _caseVal_2 = '<li>“宁海之春”春节联欢晚会是宁海县最具地方特色的群众文化活动之一。</li>';
_caseVal_2 += '<li>从2000年开始，“宁海之春”春节联欢晚会已经成功举办了十六届。</li>';
_caseVal_2 += '<li>一年一度的“宁海之春”春节联欢晚会承载着对快速发展的宁海经济社会和谐发展新成就的真情讴歌与宁海人民和谐幸福新生活的热情赞美，以及对宁海美好的未来的热切展望。</li>';

var _caseVal_3 = '<li>戏曲纳凉晚会的发展历经了整整24个年头；业余戏曲演唱团队50余支，遍布全县各乡镇。每年的7月至9月，在徐霞客大道、一休公园、柔石公园等地，以及全县各镇乡（街道）都能看到业余戏曲演唱团队的上千场的演出，受惠群众达300多万人次。</li>';

var _caseVal_4 = '<li>“宁海之秋”群众文化艺术节在10月—12月之间举行，一般由六、七个活动内容构成，参加人员为全县18个镇乡（街道）的群众，不仅丰富了群众的文化生活，还挖掘了草根文艺人才和民间文艺团队，其中，杨梅岭村舞蹈队代表宁海县参加了浙江省第十届排舞大赛并获得兰花银奖的优异成绩。</li>';

/*
word picSrc title
*/
var _caseWord = [{
        _pic1: '1-1',
        _pic2: '1-2',
        _title: '乡村“百姓大舞台”',
        _word: _caseVal_1
    },
    {
        _pic1: '2-1',
        _pic2: '2-2',
        _pic2: '2-3',
        _title: '“宁海之春”春节联欢晚会',
        _word: _caseVal_2
    },
    {
        _pic1: '3-1',
        _pic2: '3-2',
        _title: '“宁海之夏”戏曲纳凉晚会',
        _word: _caseVal_3
    },
    {
        _pic1: '4-1',
        _pic2: '4-2',
        _title: '“宁海之秋”群众文化艺术节',
        _word: _caseVal_4
    }
];

var _caseHtml = function() {

    $("._case_val p").on("click", function() {
        var index = $(this).index();
        btnClick('caseVal'+index);
		console.log(index);
        if (index == 1) {
            $("._case_left").removeClass("_case_left").addClass("_case_left2");
            $("._case_right").removeClass("_case_right").addClass("_case_right2");
			$("._case_left2 div img").attr("src", "images/page2/2-1.jpg");
            $("._case_right2 div img").attr("src", "images/page2/2-2.jpg");

            if ($("._case_right2 div").length < 2) {
				$("._case_right2").append('<div><img src="images/page2/2-3.jpg"></div>');
			}
        } else {
            $("._case_left2").removeClass("_case_left2").addClass("_case_left");
            $("._case_right2").removeClass("_case_right2").addClass("_case_right");
            $("._case_right").children("div").eq(1).remove();
        };

        $("._case_left div img").attr("src", "images/page2/" + _caseWord[index]._pic1 + ".jpg");
        $("._case_right div img").attr("src", "images/page2/" + _caseWord[index]._pic2 + ".jpg");
        $("._case_bottom div h1").html(_caseWord[index]._title);
        $("._case_bottom div ul").html(_caseWord[index]._word);
    });
};


// page1

/*
	word
	*/
var _exampleVal_1 = '<li>传统戏台建造分三步工艺：木匠布局基台、雕花匠雕琢构件、漆匠整体彩绘。</li>';
_exampleVal_1 += '<li>设计上与祠堂庙宇结合，座落在纵轴线上，面向正大殿，对准祖宗神灵，构建四合院式建筑群。</li>';
_exampleVal_1 += '<li>建造材料上一律砖木结构，采用翼角起翘的亭台形式。戏台屋顶筑法讲究，有单檐歇山顶和重檐歇山顶，檐步越往上越陡，增加飞檐翘角的立体效果。</li>';

var _exampleVal_2 = '<li>泥金彩漆，宁波传统工艺“三金”之一，是一种泥金工艺和彩漆工艺相结合为主要特征的漆器工艺。现仅宁波市辖县宁海还保留此项传统手工艺。</li>';
_exampleVal_2 += '<li>泥金彩漆以中国生漆和金箔为主要原料。1953年举办的全国首届工艺美术展览会上，宁波泥金彩漆中的双龙提桶、描金饭盂、堆塑、贴金沥粉粉斗等作品，受到了行家的赞扬，一些美术家撰文高度评价其艺术成就，并出版画片加以介绍，影响颇大。</li>';

var _exampleVal_3 = '<li>历史上，宁海可谓是“戏曲之乡”，其民间戏曲活动相当活跃。据明崇祯《宁海县志》载：“正月演剧，敬祖迎神。乡间十二起，城里十四起，至十八日乃止”。</li>';
_exampleVal_3 += '<li>有专家考证，约在明万历年间（1573—1619），明代四大声腔之一的余姚腔流入宁海，和当地的民间曲艺、吹唱班结合，久而久之形成了一种戏曲形式，因其用宁海地区的方言来念白和演唱，且所唱的曲调较原余姚腔平缓、委婉，遂称之为“宁海平调”。</li>';

var _exampleVal_4 = '<li>十里红妆婚俗主要包括红妆器物和传统婚嫁习俗两部分。红妆器物指的是通体朱红漆、局部贴黄金的家具器物和精巧细致的女红作品，流光溢彩，喜庆繁华，其数量之多，门类之齐全，耗费之昂贵，艺术价值之高，全国罕见。</li>';
_exampleVal_4 += '<li>红妆制作上，集中了雕刻、堆塑、描金、勾漆、填彩、刺绣、裁缝等工艺技巧，也包含了小木作、雕作、漆作、桶作、竹作、铜作、锡作等民间匠作。娶亲时红嫁妆铺排成列，延绵十里之远，极尽奢华之俗，集中展现了浙东地区精湛的手工技艺。</li>';

/*
word picSrc title
*/
var _exampleWord = [{
        _pic1: '1-1',
        _pic2: '1-2',
        _title: '传统戏台建造技艺',
        _word: _caseVal_1
    },
    {
        _pic1: '2-1',
        _pic2: '2-2',
        _title: '泥金彩漆',
        _word: _exampleVal_2
    },
    {
        _pic1: '3-1',
        _pic2: '3-2',
        _title: '宁海平调',
        _word: _exampleVal_3
    },
    {
        _pic1: '4-1',
        _pic2: '4-2',
        _title: '十里红妆婚俗',
        _word: _exampleVal_4
    }
];

var _exampleHtml = function() {

    $("._example_val p").on("click", function() {
        var index = $(this).index();
        btnClick("exampleVal"+index);
        $("._example_left div img").attr("src", "images/page1/" + _exampleWord[index]._pic1 + ".jpg");
        $("._example_right div img").attr("src", "images/page1/" + _exampleWord[index]._pic2 + ".jpg");
        $("._example_bottom div h1").html(_exampleWord[index]._title);
        $("._example_bottom div ul").html(_exampleWord[index]._word);
    });
};

