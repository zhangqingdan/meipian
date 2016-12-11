
function getUrlParams() {
	var search = location.search.slice(1);
	var params = search.split('&');
	var result = {}, kv;
	params.forEach(function(item) {
		kv = item.split('=');
		result[kv[0]] = kv[1];
	});
	return result;
}

var params = getUrlParams();
var diaryId = params.diaryId;
reqwest({
  url: '/s/api',
  method: 'get',
  data: [{
  	name: 'cmd', value: 'Secret.getDiaryById'
  }, {
  	name: 'diaryId', value: diaryId
  }],
  success: function(response) {
  	dataParse(response);
  }
});


var doms = ['title', 'photo', 'username', 'time', 'like', 'visit', 'musicName', 'container','subjectFavoed','audio'];
var DOM = {}
doms.forEach(function(id) {
	DOM[id] = document.getElementById(id);
})

function dataParse(response) {
	var diaryData = response.res;
	var counter = response.ext.counter;
	var user = response.ext.user;
	DOM.title.innerHTML = diaryData.title;
	DOM.time.innerHTML = timeFormat(diaryData.showDate);
	var userinfo = user[diaryData.ownerUserId];
	DOM.photo.style.backgroundImage = 'url('+ singToSrc(userinfo.headImageSign) +')';
	DOM.username.innerHTML = userinfo.nickName;
	DOM.like.innerHTML = counter.subjectLiked[diaryId];
	DOM.visit.innerHTML = counter.visit[diaryId];
	DOM.subjectFavoed.innerHTML = counter.subjectFavoed[diaryId];
	var musicDownload=diaryData.musicDownload;
	var music=musicDownload.split('/');
	DOM.audio.setAttribute('src',music[music.length-1]);
	DOM.musicName.innerHTML = diaryData.musicName;
	diaryParse(diaryData.contentJson.modules);
	// console.log(diaryData.contentJson.modules)
}

function timeFormat(str) {
	var year = str.slice(0, 4);
	var month = str.slice(4, 6);
	var date = str.slice(-2);
	return year + '.' + month + '.' + date;
}
function singToSrc(sign) {
	return '/s/img/' + sign;
}




function diaryParse(modules){
	var frg=document.createDocumentFragment();
	modules.forEach(function(module){
		var moduleDiv=document.createElement('div');
		frg.appendChild(moduleDiv);
		module.datas.forEach(function(data){
			if(data.imageSign){
				var dataImg=document.createElement('img');
				dataImg.style.display='block';
				dataImg.style.width='100%';
				dataImg.src=singToSrc(data.imageSign);
				if(moduleDiv.childNodes.length){
					moduleDiv.insertBefore(dataImg,moduleDiv.childNodes[0]);
				}else{
					moduleDiv.appendChild(dataImg);
				}
			}else if(data.text){
				var dataP=document.createElement('p');
				dataP.innerHTML=data.text;
				dataP.style.fontSize=.34375+'rem';
				dataP.style.marginTop=.0625+'rem';
				dataP.style.marginBottom=.0625+'rem';
				moduleDiv.appendChild(dataP);
			}
		})
	})
	var container=document.getElementById('container');
	container.appendChild(frg);
}




$(function(){


	// $('#like').click(function(){
	// 	var innerHTML=$('#like').html();
	// 	$('#like').html()=innerHTML+1;
	// })



	$('body').one('touchstart',function(){
		$('audio').get(0).play();
		$('#music-btn').css('backgroundImage','url(images/icon-pause.png)');
		$('#music-btn').attr('class','music-btn play');
	});
	$('#music-btn').click(function(){
		if($('#music-btn').hasClass("play")){
			$('audio').get(0).pause();
			$('#music-btn').css('backgroundImage','url(images/icon-play.png)');
			$('#music-btn').attr('class','music-btn stop');
		}else if($('#music-btn').hasClass("stop")){
			$('audio').get(0).play();
			$('#music-btn').css('backgroundImage','url(images/icon-pause.png)');
			$('#music-btn').attr('class','music-btn play');
		}
	});



	





	$('#jubao').click(function(){
		$('#alert').css('display','block');
		setTimeout(function(){
			$('#alert').css('display','none');
		},500);
	})






})


























