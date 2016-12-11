function getUrlParams(){
	var search = location.search.slice(1);
	var params=search.split('$');
	var result={};
	var kv;
	params.forEach(function(item) {
		kv=item.split('=');
		result[kv[0]] = kv[1];
	});
	return result;
}

var params=getUrlParams();
var diaryId=params.diaryId; 

reqwest({
	url:'/s/api',
	method:'get',
	data:[{
		name:'cmd', value:'Secret.getDiaryById'
	},{
		name:'diaryId',value:diaryId
	}],
	success:function(response) {
		dataParse(response);
	}
});

var doms=['title','photo','username','time','like','visit','musicName','container'];
var DOM={};
doms.forEach(function(id){
	DOM[id]=document.getElementById(id);
});

function dataParse(response){
	var diaryData=response.res;
	var counter=response.ext.counter;
	var user=response.ext.user;

	DOM.title.innerHTML=diaryData.title;
	DOM.time.innerHTML=timeFormat(diaryData.showDate);

	var userinfo=user[diaryData.ownerUserId];
	DOM.photo.style.backgroundImage='url('+singToSrc(userinfo.headImageSign)+')';
	DOM.username.innerHTML=userinfo.nickName;
	DOM.like.innerHTML=counter.subjectLiked[diaryId];
	DOM.visit.innerHTML=counter.visit[diaryId];
	DOM.musicName.innerHTML=diaryData.musicName;
}

function timeFormat(str){
	var year=str.slice(0,4);
	var month=str.slice(4,6);
	var data=str.slice(6);

	return year+'.'+month+'.'+data ;

}

function singToSrc(sign){
	return '/s/img/'+sign;
}

function diaryParse(modules){
	var frg=document.createDocumentFragment();
	modules.forEach(function(module){
		var moduleDiv=document.createElement('div');
		frg.appendChild(moduleDiv);

		
	})
}