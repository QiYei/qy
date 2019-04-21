function qiye() {
	var txt= document.getElementById("text").value;
	if (txt == "") {
		$('#my').modal();
	} else {
		var google = "https://www.pixiv.net/member_illust.php?mode=medium&illust_id=" + txt;
		window.location.href = google;
		$(" #text").val("");
	}
}

function fk() {
	window.open('http://zifeigzs.mikecrm.com/Ki7guN0','_blank', 'height=700, width=780, top=35, left=300, toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, status=no');
}


//回车时，默认是登陆
function on_return() {
	if(window.event.keyCode == 13){
		if (document.all('btn')!=null){
			document.all('btn').click();
		}
	}
}

//---------------------------------------------------------------------------------------1

function qiye1() {
	var txt= document.getElementById("text1").value;
	if (txt == "") {
		$('#my1').modal();
	} else {
		var google = "https://www.bilibili.com/video/av" + txt;
		window.location.href = google;
		$(" #text1").val("");
	}
}

//---------------------------------------------------------------------------------------2

function qiye2() {
	var txt= document.getElementById("text2").value;
	if (txt == "") {
		$('#my2').modal();
	} else {
		var google = "https://live.bilibili.com/" + txt;
		window.location.href = google;
		$(" #text2").val("");
	}
}

//---------------------------------------------------------------------------------------3	

function qiye3() {
	var txt= document.getElementById("text3").value;
	if (txt == "") {
		$('#my3').modal();
	} else {
		var google = "https://www.baidu.com/s?wd=" + txt;
		window.location.href = google;
		$(" #text3").val("");
	}
}

//---------------------------------------------------------------------------------------3	

function qiye4() {
	var txt= document.getElementById("text4").value;
	if (txt == "") {
		$('#my4').modal();
	} else {
		var google = "http://pan.baidu.com/s/" + txt;
		window.location.href = google;
		$(" #text4").val("");
	}
}

//=======================================================================================

$(function () {
	$('[data-toggle="modal"]').tooltip();
	$('[data-toggle="popover"]').popover();
})

window.onload = function(){
    //屏蔽键盘事件
    document.onkeydown = function (){
        var e = window.event || arguments[0];
        //F12
        if(e.keyCode == 123){
            return false;
        //Ctrl+Shift+I
        }else if((e.ctrlKey) && (e.shiftKey) && (e.keyCode == 73)){
            return false;
        //Shift+F10
        }else if((e.shiftKey) && (e.keyCode == 121)){
            return false;
        //Ctrl+U
        }else if((e.ctrlKey) && (e.keyCode == 85)){
            return false;
        }
    };
    //屏蔽鼠标右键
    document.oncontextmenu = function (){
        return false;
    }
}
