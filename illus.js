/* 식물 일러스트(직접 그린 단순 SVG). 실제 사진이 아니라 특징을 보여주는 그림이에요. */
var PALS = {
  green:{bg:'#dcefe2',a:'#2f8a55',b:'#58b27c',s:'#2a6f45',pot:'#c9805a',pot2:'#b36a46',x:'#e8c44a'},
  lime: {bg:'#e8f2d3',a:'#6aa532',b:'#93c750',s:'#4f8225',pot:'#e8e4dc',pot2:'#d3cdc0',x:'#e8c44a'},
  dark: {bg:'#d3e6dc',a:'#1f5e3d',b:'#3a8a62',s:'#1b4d33',pot:'#8a949b',pot2:'#737d84',x:'#e8c44a'},
  blue: {bg:'#dfeaf0',a:'#6f9fa8',b:'#9cc4cb',s:'#5b8890',pot:'#c9805a',pot2:'#b36a46',x:'#e07a9a'},
  sand: {bg:'#f1e8d6',a:'#4f8f5a',b:'#7bb27c',s:'#3f7a4a',pot:'#b9c4c9',pot2:'#a2aeb4',x:'#e0709a'},
  red:  {bg:'#f5e0dc',a:'#2d7a4b',b:'#c8372d',s:'#2a6a43',pot:'#e8e4dc',pot2:'#d3cdc0',x:'#f2d64b'},
  white:{bg:'#e6eef6',a:'#3a8a5c',b:'#f7f4ec',s:'#2e7048',pot:'#c9805a',pot2:'#b36a46',x:'#f2d64b'},
  pink: {bg:'#f6e3ec',a:'#3f8a58',b:'#ee9cc0',s:'#2f6f46',pot:'#e8e4dc',pot2:'#d3cdc0',x:'#f2d64b'}
};

function _pot(p){ return '<path d="M72 120L78 152H122L128 120Z" fill="'+p.pot+'"/><rect x="67" y="112" width="66" height="12" rx="4" fill="'+p.pot2+'"/>'; }
function _stem(d,c,w){ return '<path d="'+d+'" fill="none" stroke="'+c+'" stroke-width="'+(w||3)+'" stroke-linecap="round"/>'; }
function _lf(x,y,len,w,a,f){
  return '<g transform="translate('+x+' '+y+') rotate('+a+')"><path d="M0 0C'+w+' '+(-len*.3)+' '+w+' '+(-len*.75)+' 0 '+(-len)+'C'+(-w)+' '+(-len*.75)+' '+(-w)+' '+(-len*.3)+' 0 0Z" fill="'+f+'"/></g>';
}
/* 하트잎: (x,y)는 줄기가 붙는 자리, a=0이면 위쪽을 향해요 */
function _heart(x,y,s,a,f,cut){
  var g='<g transform="translate('+x+' '+y+') rotate('+a+') scale('+s+')"><path d="M0-17C-14-13-17 3-7 6C-3 7 0 3 0 0C0 3 3 7 7 6C17 3 14-13 0-17Z" fill="'+f+'"/>';
  if(cut){ g+='<path d="M-15-9L-7-8M-13-2L-6-3M15-9L7-8M13-2L6-3" stroke="'+cut+'" stroke-width="1.8" stroke-linecap="round"/>'; }
  return g+'</g>';
}
function _dot(x,y,r,f){ return '<circle cx="'+x+'" cy="'+y+'" r="'+r+'" fill="'+f+'"/>'; }
function _bloom(x,y,r,f,c){
  var s='',i,rad;
  for(i=0;i<5;i++){ rad=(i*72-90)*Math.PI/180; s+=_dot((x+Math.cos(rad)*r*.7).toFixed(1),(y+Math.sin(rad)*r*.7).toFixed(1),(r*.55).toFixed(1),f); }
  return s+_dot(x,y,(r*.35).toFixed(1),c);
}
function _ell(x,y,rx,ry,a,f){ return '<ellipse cx="'+x+'" cy="'+y+'" rx="'+rx+'" ry="'+ry+'" transform="rotate('+a+' '+x+' '+y+')" fill="'+f+'"/>'; }
function _arc(d,c,w,dash){ return '<path d="'+d+'" fill="none" stroke="'+c+'" stroke-width="'+w+'" stroke-linecap="butt"'+(dash?' stroke-dasharray="'+dash+'"':'')+'/>'; }

var ILLUS = {
  monstera:function(p){
    return _stem('M100 114C100 92 80 80 68 70',p.s)+_stem('M100 114C102 92 124 80 136 68',p.s)+_stem('M100 114C100 90 100 74 100 58',p.s)
      +_heart(68,70,2.1,-45,p.a,p.bg)+_heart(136,68,2.1,45,p.b,p.bg)+_heart(100,58,2.3,0,p.a,p.bg)+_pot(p);
  },
  heart:function(p){
    return _stem('M97 114C90 92 70 84 56 92',p.s,2.5)+_stem('M103 114C110 92 130 84 146 92',p.s,2.5)+_stem('M100 114C100 90 100 74 100 60',p.s,2.5)
      +_heart(56,92,1.2,-100,p.a)+_heart(76,84,1.1,-35,p.b)+_heart(146,92,1.2,100,p.a)+_heart(126,84,1.1,35,p.b)
      +_heart(100,60,1.3,0,p.a)+_heart(92,80,1,-50,p.b)+_heart(108,80,1,50,p.b)+_pot(p);
  },
  sword:function(p){
    var d=[[-32,66],[-16,90],[0,104],[15,86],[30,64]],s='',i;
    for(i=0;i<d.length;i++){ s+=_lf(100,116,d[i][1],9,d[i][0],i%2?p.b:p.a); }
    return s+_pot(p);
  },
  stick:function(p){
    var xs=[84,92,100,108,116],hs=[58,78,92,74,54],s='',i;
    for(i=0;i<xs.length;i++){ s+='<rect x="'+(xs[i]-4)+'" y="'+(116-hs[i])+'" width="8" height="'+hs[i]+'" rx="4" fill="'+(i%2?p.b:p.a)+'"/>'; }
    return s+_pot(p);
  },
  tree:function(p){
    var L=p.big?42:34,W=p.big?15:11,s=_stem('M100 114L100 40','#8a6a4a',5),y=[100,88,76,64,52],i;
    for(i=0;i<y.length;i++){ s+=_lf(100,y[i],L,W,(i%2?-60:60),i%2?p.b:p.a); }
    return s+_lf(100,46,L-4,W-1,0,p.a)+_pot(p);
  },
  arrow:function(p){
    return _stem('M100 114C100 100 100 90 100 80','#2c6b49',3)+_stem('M100 114C90 100 80 96 70 88','#2c6b49',3)+_stem('M100 114C112 100 122 96 132 90','#2c6b49',3)
      +_heart(70,88,1.9,-35,p.b)+_heart(132,90,1.8,35,p.b)+_heart(100,80,2.4,0,p.a)
      +_stem('M100 80L100 40',p.b,1.6)+_pot(p);
  },
  anthurium:function(p){
    return _stem('M100 114C90 100 80 92 72 84','#2a6a43',3)+_stem('M100 114C112 100 122 92 130 84','#2a6a43',3)+_stem('M100 114L100 66','#2a6a43',3)
      +_heart(72,84,1.7,-40,p.a)+_heart(130,84,1.7,40,p.a)+_heart(100,66,1.5,0,p.b)
      +'<rect x="97" y="30" width="6" height="26" rx="3" fill="'+p.x+'"/>'+_pot(p);
  },
  lily:function(p){
    var d=[[-42,56],[-22,70],[0,64],[20,72],[40,58]],s='',i;
    for(i=0;i<d.length;i++){ s+=_lf(100,116,d[i][1],13,d[i][0],i%2?p.s:p.a); }
    return s+_stem('M102 116L112 54','#2e7048',2.5)+_lf(112,64,40,11,8,p.b)+'<rect x="109" y="40" width="5" height="16" rx="2.5" fill="#e8d28a" transform="rotate(8 112 48)"/>'+_pot(p);
  },
  ivy:function(p){
    function lv(x,y,a,f){ return '<g transform="translate('+x+' '+y+') rotate('+a+') scale(1.15)"><path d="M0 0L-7-5L-9-12L-2-11L0-19L2-11L9-12L7-5Z" fill="'+f+'"/></g>'; }
    return _stem('M82 114C60 114 54 132 52 152',p.s,2)+_stem('M118 114C140 114 146 132 148 152',p.s,2)+_stem('M100 114C100 92 96 74 90 58',p.s,2)
      +lv(90,58,-10,p.a)+lv(96,76,30,p.b)+lv(96,92,-35,p.a)+lv(66,118,-70,p.b)+lv(56,136,-120,p.a)+lv(53,150,-175,p.b)
      +lv(134,118,70,p.a)+lv(144,136,120,p.b)+lv(148,150,175,p.a)+_pot(p);
  },
  hoya:function(p){
    var s=_stem('M96 114C84 92 72 76 62 58',p.s,2.5)+_stem('M104 114C116 92 128 76 138 58',p.s,2.5)+_stem('M100 114C100 92 100 76 100 58',p.s,2.5),i,t;
    var pts=[[86,98,-30],[74,82,-34],[66,66,-30],[114,98,30],[126,82,34],[134,66,30],[100,96,-15],[100,78,15],[100,62,0]];
    for(i=0;i<pts.length;i++){ t=pts[i]; s+=_ell(t[0]+(t[2]<0?-9:9),t[1],11,6.5,t[2]<0?-40:40,i%2?p.a:'#3f9a63'); }
    return s+_bloom(100,44,6,p.b,p.x)+_bloom(110,50,5,p.b,p.x)+_bloom(90,50,5,p.b,p.x)+_pot(p);
  },
  spider:function(p){
    var s='',i,arcs=['M98 114C84 70 54 62 32 82','M100 114C94 66 70 44 46 50','M102 114C108 66 132 44 156 50','M104 114C118 70 148 62 170 82','M100 114C100 76 100 54 100 36'];
    for(i=0;i<arcs.length;i++){ s+=_arc(arcs[i],i%2?p.a:p.b,6); }
    return s+_dot(32,84,5,'#f4f1ea')+_dot(170,84,5,'#f4f1ea')+_pot(p);
  },
  frond:function(p){
    var W=p.big?10:8,s='',i,arcs=['M98 114C84 74 54 62 28 76','M100 114C90 66 66 46 44 46','M100 114C100 70 100 48 100 26','M100 114C110 66 134 46 156 46','M102 114C116 74 146 62 172 76'];
    for(i=0;i<arcs.length;i++){ s+=_arc(arcs[i],i%2?p.a:p.b,W,'5 2'); }
    return s+_pot(p);
  },
  fern:function(p){
    var s='',i,arcs=['M96 114C76 90 48 88 26 106','M98 114C80 74 52 62 30 66','M100 114C92 66 74 44 54 36','M100 114C100 70 100 48 100 24','M100 114C108 66 126 44 146 36','M102 114C120 74 148 62 170 66','M104 114C124 90 152 88 174 106'];
    for(i=0;i<arcs.length;i++){ s+=_arc(arcs[i],i%2?p.a:p.b,9,'3 1.5'); }
    return s+_pot(p);
  },
  orchid:function(p){
    return _lf(100,116,52,16,-72,p.a)+_lf(100,116,52,16,72,p.a)+_lf(100,116,40,13,-30,p.s)
      +_stem('M104 112C106 72 122 50 150 46','#5b8a4a',2.5)
      +_bloom(150,46,12,p.b,p.x)+_bloom(128,56,11,p.b,p.x)+_bloom(114,76,10,p.b,p.x)+_dot(160,34,4,p.b)+_pot(p);
  },
  cactus:function(p){
    return _stem('M88 90H74Q66 90 66 82V62',p.a,13)+_stem('M112 76H126Q134 76 134 68V52',p.a,13)
      +'<rect x="86" y="34" width="28" height="84" rx="14" fill="'+p.a+'"/>'
      +_stem('M96 44V112',p.b,1.5)+_stem('M104 44V112',p.b,1.5)+_bloom(100,34,6,p.x,'#f6e9a0')+_pot(p);
  },
  rosette:function(p){
    var s='',a;
    for(a=-80;a<=80;a+=26.7){ s+=_lf(100,114,46,15,a,p.a); }
    for(a=-56;a<=56;a+=28){ s+=_lf(100,114,32,12,a,p.b); }
    return s+_lf(100,114,18,8,0,p.b)+_pot(p);
  },
  aloe:function(p){
    var s='',a,i=0;
    for(a=-62;a<=62;a+=20.7){ s+=_lf(100,116,i%2?74:88,9,a,i%2?p.b:p.a); i++; }
    return s+_pot(p);
  },
  jade:function(p){
    function cl(x,y){ return _ell(x-8,y,9,6,-20,p.a)+_ell(x+8,y,9,6,20,p.b)+_ell(x,y-8,9,6,90,p.a)+_ell(x,y+5,9,6,0,p.b); }
    return _stem('M100 114C100 96 98 84 96 72','#8a6a4a',8)+_stem('M98 88L76 70','#8a6a4a',5)+_stem('M98 82L124 64','#8a6a4a',5)
      +cl(72,64)+cl(96,56)+cl(126,58)+cl(104,76)+_pot(p);
  },
  kalanchoe:function(p){
    var s=_lf(100,116,40,15,-60,p.a)+_lf(100,116,40,15,60,p.a)+_lf(100,116,46,15,-25,p.s)+_lf(100,116,46,15,25,p.s)+_lf(100,116,50,14,0,p.a),i,pts=[[88,60],[100,54],[112,60],[94,70],[106,70],[100,44],[84,70],[116,70]];
    s+=_stem('M100 100L100 60','#4a8a50',2.5);
    for(i=0;i<pts.length;i++){ s+=_bloom(pts[i][0],pts[i][1],6,p.b,p.x); }
    return s+_pot(p);
  },
  cypress:function(p){
    var s='',k;
    for(k=0;k<6;k++){ s+=_ell(100,104-k*12,34-k*5,11,0,k%2?p.b:p.a); }
    return s+_pot(p);
  },
  basil:function(p){
    var s='',i,ang,r,x,y;
    for(i=0;i<22;i++){
      ang=i*2.4; r=6+i*1.9; x=100+Math.cos(ang)*r*1.15; y=92+Math.sin(ang)*r*.7-i*.9;
      if(y>108){ y=108; }
      s+=_ell(x.toFixed(1),y.toFixed(1),11,6.5,(ang*57)%90-45,i%2?p.b:p.a);
    }
    return s+_pot(p);
  },
  rosemary:function(p){
    var s='',stems=[[-24,70],[-12,88],[0,96],[12,86],[26,68]],i,j,st,y;
    for(i=0;i<stems.length;i++){
      st=stems[i]; s+='<g transform="translate(100 114) rotate('+st[0]+')">'+_stem('M0 0L0 '+(-st[1]),p.s,2);
      for(j=1;j<8;j++){ y=-j*st[1]/8.5; s+=_stem('M0 '+y+'L-9 '+(y-8),i%2?p.b:p.a,2.2)+_stem('M0 '+y+'L9 '+(y-8),i%2?p.a:p.b,2.2); }
      s+='</g>';
    }
    return s+_pot(p);
  },
  air:function(p){
    var s='',i,ends=[[50,92],[44,108],[58,76],[150,92],[156,108],[142,76],[70,64],[130,64],[100,56]],e;
    for(i=0;i<ends.length;i++){ e=ends[i]; s+=_stem('M100 118Q'+((100+e[0])/2+(e[0]<100?6:-6))+' '+(e[1]+14)+' '+e[0]+' '+e[1],i%2?p.a:p.b,4); }
    return s+_dot(100,118,7,p.a)+'<path d="M76 152Q100 124 124 152Z" fill="'+p.pot+'"/>'+_bloom(100,100,6,p.x,'#f6e9a0');
  }
};

function illusSvg(il,palKey,big,label){
  var p=PALS[palKey]||PALS.green,pp={},k;
  for(k in p){ pp[k]=p[k]; }
  pp.big=big;
  var body=(ILLUS[il]||ILLUS.tree)(pp);
  return '<svg class="ill" viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="'+(label||'')+' 그림"><rect width="200" height="160" fill="'+p.bg+'"/>'+body+'</svg>';
}
