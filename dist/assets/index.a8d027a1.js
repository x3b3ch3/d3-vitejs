import{o as e,c as t,j as a,s,u as n,e as o,a as i,m as r,b as p,l,d as m,p as c,f as d,g as b,D as u,h,i as v,k as g,n as y,q as T,r as f,t as C,F as A,v as S,w as R,x as k,y as x,z as L,A as N,B as I,C as w}from"./vendor.812f1845.js";!function(e=".",t="__import__"){try{self[t]=new Function("u","return import(u)")}catch(a){const s=new URL(e,location),n=e=>{URL.revokeObjectURL(e.src),e.remove()};self[t]=e=>new Promise(((a,o)=>{const i=new URL(e,s);if(self[t].moduleMap[i])return a(self[t].moduleMap[i]);const r=new Blob([`import * as m from '${i}';`,`${t}.moduleMap['${i}']=m;`],{type:"text/javascript"}),p=Object.assign(document.createElement("script"),{type:"module",src:URL.createObjectURL(r),onerror(){o(new Error(`Failed to import: ${e}`)),n(p)},onload(){a(self[t].moduleMap[i]),n(p)}});document.head.appendChild(p)})),self[t].moduleMap={}}}("assets/");var M={ENG:"#999",NZL:"#000",FRA:"#00F",IRE:"#393",ITA:"#00F",SCO:"#009",ARG:"#99F",WAL:"#F00",AUS:"#CC0",RSA:"#0C3"},E=[{name:"Coupe du monde de rugby à XV 2003",start:"2003-10-10",end:"2003-11-22"},{name:"Coupe du monde de rugby à XV 2007",start:"2007-9-7",end:"2007-10-20"},{name:"Coupe du monde de rugby à XV 2011",start:"2011-9-9",end:"2011-10-23"},{name:"Coupe du monde de rugby à XV 2015",start:"2015-9-18",end:"2015-10-31"},{name:"Coupe du monde de rugby à XV 2019",start:"2019-9-20",end:"2019-11-2"},{name:"Coupe du monde de rugby à XV 2023",start:"2023-9-8",end:"2023-10-28"}],P=[{name:"Tri Nations 2004",start:"2004-07-17",end:"2004-08-21"},{name:"Tri Nations 2005",start:"2005-07-30",end:"2005-09-03"},{name:"Tri Nations 2006",start:"2006-07-08",end:"2006-09-09"},{name:"Tri Nations 2007",start:"2007-06-16",end:"2007-07-21"},{name:"Tri Nations 2008",start:"2008-07-05",end:"2008-09-13"},{name:"Tri Nations 2009",start:"2009-07-18",end:"2009-09-19"},{name:"Tri Nations 2010",start:"2010-07-10",end:"2010-09-11"},{name:"Tri Nations 2011",start:"2011-07-23",end:"2011-08-27"},{name:"The Rugby Championship 2012",start:"2012-08-18",end:"2012-10-06"},{name:"The Rugby Championship 2013",start:"2013-08-17",end:"2013-10-06"},{name:"The Rugby Championship 2014",start:"2014-08-16",end:"2014-10-05"},{name:"The Rugby Championship 2015",start:"2015-07-17",end:"2015-08-08"},{name:"The Rugby Championship 2016",start:"2016-08-20",end:"2016-10-08"},{name:"The Rugby Championship 2017",start:"2017-08-19",end:"2017-10-07"},{name:"The Rugby Championship 2018",start:"2018-08-18",end:"2018-10-07"},{name:"The Rugby Championship 2019",start:"2019-07-21",end:"2019-08-11"},{name:"Tri Nations 2020",start:"2020-10-31",end:"2020-12-05"},{name:"The Rugby Championship 2021",start:"2021-08-14",end:"2021-10-02"},{name:"The Rugby Championship 2022",start:"2022-08-06",end:"2022-09-24"}],$=[{name:"Coupe d'automne des nations 2020",start:"2020-11-13",end:"2020-12-05"},{name:"Coupe d'automne des nations 2021",start:"2021-10-29",end:"2021-11-21"},{name:"Coupe d'automne des nations 2022",start:"2022-11-05",end:"2022-11-20"}],B=[{name:"Tournoi des 6 nations 2004",start:"2004-02-14",end:"2004-03-27"},{name:"Tournoi des 6 nations 2005",start:"2005-2-5",end:"2005-3-19"},{name:"Tournoi des 6 nations 2006",start:"2006-2-4",end:"2006-3-18"},{name:"Tournoi des 6 nations 2007",start:"2007-2-3",end:"2007-3-17"},{name:"Tournoi des 6 nations 2008",start:"2008-2-2",end:"2008-3-15"},{name:"Tournoi des 6 nations 2009",start:"2009-2-7",end:"2009-3-21"},{name:"Tournoi des 6 nations 2010",start:"2010-2-6",end:"2010-3-20"},{name:"Tournoi des 6 nations 2011",start:"2011-2-4",end:"2011-3-19"},{name:"Tournoi des 6 nations 2012",start:"2012-2-4",end:"2012-3-17"},{name:"Tournoi des 6 nations 2013",start:"2013-2-2",end:"2013-3-16"},{name:"Tournoi des 6 nations 2014",start:"2014-2-1",end:"2014-3-15"},{name:"Tournoi des 6 nations 2015",start:"2015-2-6",end:"2015-3-21"},{name:"Tournoi des 6 nations 2016",start:"2016-2-6",end:"2016-3-19"},{name:"Tournoi des 6 nations 2017",start:"2017-2-4",end:"2017-3-18"},{name:"Tournoi des 6 nations 2018",start:"2018-2-3",end:"2018-3-17"},{name:"Tournoi des 6 nations 2019",start:"2019-2-1",end:"2019-3-16"},{name:"Tournoi des 6 nations 2020",start:"2020-2-1",end:"2020-10-31"},{name:"Tournoi des 6 nations 2021",start:"2021-2-6",end:"2021-3-26"},{name:"Tournoi des 6 nations 2022",start:"2022-2-5",end:"2022-3-19"},{name:"Tournoi des 6 nations 2023",start:"2023-2-4",end:"2023-3-18"}];const U={class:"chart"};const O={methods:{fetch(){const e=[];let t=[];const n=this.allteams.map(((s,n)=>(n=s.id,s.active?e.push(a(`../datas/teams/${n}.min.json`).then((e=>(t.length||(t=Object.keys(e).map((e=>new Date(e)))),Object.assign(s,{values:Object.values(e)}))))):e.push(Promise.resolve(Object.assign(s,{values:[]}))),s)));Promise.all(e).then((e=>{this.data={series:n,dates:t},this.chartEl?this.chartEl.update():(this.chartEl=this.chart(),s("body .chart").node().appendChild(this.chartEl.node))}))},chart(){const e=screen.availWidth,t=screen.availHeight,a=20,s=20,c=20,d=20;this.x=n().domain(o(this.data.dates)).range([d,e-s]);const b=i("svg").attr("viewBox",[0,0,e,t]).style("overflow","visible"),u=b.append("g").attr("transform",`translate(${e/2+d/2},${t+a+c})`);[[E,"blue",-370,"World cups"],[$,"orange",110,"Coupe d'automne des nations"],[B,"red",-540,"6 Nations cups"],[P,"green",-210,"Tri Nations / Rugby Championships"]].forEach((([e,s,n,o])=>{e.forEach((e=>{const n=new Date(e.start.split("-").toString()),o=new Date(e.end.split("-").toString());b.append("rect").attr("transform",`translate(${this.x(n)},${a})`).attr("width",this.x(o)-this.x(n)).attr("height",t-a-c).attr("fill",s).attr("fill-opacity",.07)})),u.append("rect").attr("width",40).attr("height",20).attr("fill",s).attr("fill-opacity",.07).attr("stroke","darkgrey").attr("x",n).attr("y",-15),u.append("text").attr("x",n+50).text(o)}));const h=this.data.series.filter((e=>e));let y=[r(h,(e=>r(e.values.map((e=>e[this.type]))))),p(h,(e=>p(e.values.map((e=>e[this.type])))))];"pos"===this.type&&(y=y.reverse()),this.y=l().domain(y).nice().range([t-c,a]);const T=e=>e.attr("transform",`translate(${d},0)`).call(g(this.y)),f=a=>a.attr("transform",`translate(${d},0)`).attr("stroke-opacity",.2).call(g(this.y).ticks(t/40).tickFormat("").tickSizeInner(-e+s+d));b.append("g").call((a=>a.attr("transform",`translate(0,${t-c})`).call(v(this.x).ticks(e/80).tickSizeOuter(0)))),b.append("g").call((e=>e.attr("transform",`translate(0,${t-c})`).attr("stroke-opacity",.2).call(v(this.x).ticks(t/40).tickFormat("").tickSizeInner(-t+a+c))));const C=b.append("g").call(T),A=b.append("g").call(f),S=m().defined((e=>!isNaN(e))).x(((e,t)=>this.x(this.data.dates[t]))).y((e=>this.y(e))),R=b.append("g").attr("fill","none").attr("stroke-width",1.5).attr("stroke-linejoin","round").attr("stroke-linecap","round"),k=b.append("g").attr("class","popin").attr("display","none");k.append("circle").attr("r",2.5);const x=k.append("g").attr("font-family","sans-serif").attr("font-size",14).attr("text-anchor","middle");x.append("rect").attr("fill","#FFF").attr("stroke","#000").attr("stroke-opacity",.3).attr("fill-opacity",.8),x.append("text").attr("class","date").attr("y",-50),x.append("text").attr("class","name").attr("y",-75),x.append("text").attr("class","score").attr("y",-25);const L=()=>{const e=this.data.series.filter((e=>e)),s=r(e,(e=>r(e.values.map((e=>e[this.type]))))),n=p(e,(e=>p(e.values.map((e=>e[this.type])))));y=[s,n],"pos"===this.type&&(y=y.reverse()),this.y=l().domain(y).range([t-c,a]),C.transition().duration(1e3).call(T),A.transition().duration(1e3).call(f),R.selectAll("path").data(this.data.series).join((e=>{e.append("path").attr("stroke",(e=>M[(e||{}).abbreviation]||"steelblue")).attr("class",(e=>(e||{}).abbreviation||"")).transition().duration(1e3).attr("d",(e=>S(((e||{}).values||[]).map((e=>e[this.type])))))}),(e=>e.call((e=>e.transition().duration(1e3).attr("d",(e=>S(((e||{}).values||[]).map((e=>e[this.type]))))).on("end",(()=>{b.call(this.hover,R.selectAll("path"))}))))),(e=>e.remove())).attr("stroke",(e=>M[(e||{}).abbreviation]||"steelblue")).style("mix-blend-mode","multiply")};return L(),b.call(this.hover,R.selectAll("path")),{node:b.node(),update:L}},hover(e,t){"ontouchstart"in document?e.style("-webkit-tap-highlight-color","transparent").on("touchmove",m).on("touchstart",v).on("touchend",g):e.on("mousemove",m).on("mouseenter",v).on("mouseleave",g);const a=this.x,s=this.y,n=this.data,o=this.type,i=e.select("g.popin"),r=i.select("g"),l=r.select("rect");function m(e){e.preventDefault();const m=c(e,this),v=a.invert(m[0]),g=s.invert(m[1]),y=d(n.dates,v),T=b(n.series.filter((e=>e)),(e=>Math.abs(e.values.map((e=>e[o]))[y]-g)));t.style("stroke",(e=>e===T?M[e.abbreviation]:"#bbb")).filter((e=>e===T)).raise(),i.attr("transform",`translate(${a(n.dates[y])},${s(T.values.map((e=>e[o]))[y])})`),r.select("text.date").text(u.fromJSDate(n.dates[y]).toLocaleString(u.DATE_FULL)),r.select("text.name").text(`${T.name} (${T.abbreviation})`),r.select("text.score").text(T.values.map((e=>`Points : ${e.pts.toPrecision(4)}  |  Rang : ${e.pos}`))[y].toString()),l.attr("width",(()=>40+p([...r.selectAll("text")].map((e=>e.getBBox().width))))),l.attr("height",(()=>30+h([...r.selectAll("text")].map((e=>e.getBBox().height))))),l.attr("x",(()=>-(40+p([...r.selectAll("text")].map((e=>e.getBBox().width))))/2)),l.attr("y",(()=>-(40+h([...r.selectAll("text")].map((e=>e.getBBox().height))))))}function v(){t.style("mix-blend-mode",null).style("stroke","#bbb"),i.attr("display",null)}function g(){t.style("mix-blend-mode","multiply").style("stroke",null),i.attr("display","none")}}},data:()=>({data:{}}),watch:{teams(e,t){this.allteams=e,this.fetch()},type(e,t){this.fetch()}},props:["teams","type"]},G=Object.assign(O,{expose:[],setup:function(a){return(a,s)=>(e(),t("p",U))}});var j={33:{name:"Wales",abbreviation:"WAL",pos:8,pts:79.62012046471759},34:{name:"England",abbreviation:"ENG",pos:5,pts:85.80492573303783},35:{name:"Scotland",abbreviation:"SCO",pos:6,pts:84.44750925890675},36:{name:"Ireland",abbreviation:"IRE",pos:2,pts:92.10678374954988},37:{name:"New Zealand",abbreviation:"NZL",pos:3,pts:89.80407167219418},38:{name:"Australia",abbreviation:"AUS",pos:9,pts:77.47503631683716},39:{name:"South Africa",abbreviation:"RSA",pos:1,pts:94.54079384845836},40:{name:"Argentina",abbreviation:"ARG",pos:7,pts:80.6813542010344},41:{name:"Italy",abbreviation:"ITA",pos:11,pts:75.58337957955605},42:{name:"France",abbreviation:"FRA",pos:4,pts:86.27510203545444},43:{name:"Spain",abbreviation:"ESP",pos:19,pts:63.45998111951987},44:{name:"Portugal",abbreviation:"POR",pos:16,pts:70.77594531044969},45:{name:"Samoa",abbreviation:"SAM",pos:14,pts:72.22805358836959},46:{name:"Fiji",abbreviation:"FIJ",pos:10,pts:76.37933814589064},47:{name:"Tonga",abbreviation:"TGA",pos:15,pts:71.57116120800283},49:{name:"Japan",abbreviation:"JPN",pos:12,pts:74.26926623424008},50:{name:"Canada",abbreviation:"CAN",pos:21,pts:60.9038040657715},51:{name:"USA",abbreviation:"USA",pos:17,pts:67.94113845801807},52:{name:"Romania",abbreviation:"ROU",pos:20,pts:63.40439365949112},57:{name:"Zimbabwe",abbreviation:"ZIM",pos:31,pts:52.43299312866253},58:{name:"Namibia",abbreviation:"NAM",pos:22,pts:60.557354646582155},64:{name:"Netherlands",abbreviation:"NED",pos:29,pts:55.2382069814229},68:{name:"Uruguay",abbreviation:"URU",pos:18,pts:67.38629847649784},681:{name:"Cote D'Ivoire",abbreviation:"CIV",pos:47,pts:46.23820366795943},692:{name:"Andorra",abbreviation:"AND",pos:88,pts:31.676610534963615},693:{name:"Arabian Gulf",abbreviation:"AER"},696:{name:"Austria",abbreviation:"AUT",pos:87,pts:31.816679202372757},697:{name:"Bahamas",abbreviation:"BAH",pos:102,pts:27.75692421788799},698:{name:"Barbados",abbreviation:"BAR",pos:83,pts:34.724777640377326},699:{name:"Belgium",abbreviation:"BEL",pos:26,pts:56.58191022624913},700:{name:"Bermuda",abbreviation:"BER",pos:67,pts:38.91146457164229},701:{name:"Bosnia & Herzegovina",abbreviation:"BIH",pos:93,pts:30.113248656505995},702:{name:"Botswana",abbreviation:"BOT",pos:76,pts:36.21395294232694},703:{name:"Brazil",abbreviation:"BRA",pos:28,pts:55.374386366847354},704:{name:"Bulgaria",abbreviation:"BUL",pos:59,pts:42.40599434766207},705:{name:"Cameroon",abbreviation:"CMR",pos:107,pts:23.1200853709647},707:{name:"Cayman Islands",abbreviation:"CAY",pos:54,pts:44.368988406422446},708:{name:"Chile",abbreviation:"CHI",pos:23,pts:60.48996532847948},709:{name:"China",abbreviation:"CHN",pos:82,pts:34.91418975961267},710:{name:"Chinese Taipei",abbreviation:"TPE",pos:65,pts:39.229748477122634},711:{name:"Colombia",abbreviation:"COL",pos:41,pts:47.20532403757122},712:{name:"Cook Islands",abbreviation:"COK",pos:52,pts:45.106883747652994},713:{name:"Croatia",abbreviation:"CRO",pos:40,pts:47.49899575247672},714:{name:"Czechia",abbreviation:"CZE",pos:35,pts:50.92227514328728},715:{name:"Denmark",abbreviation:"DEN",pos:77,pts:36.09579986040047},720:{name:"Georgia",abbreviation:"GEO",pos:13,pts:72.67693804775645},721:{name:"Germany",abbreviation:"GER",pos:32,pts:52.319912929187666},722:{name:"Guam",abbreviation:"GUM",pos:74,pts:36.37834645978975},723:{name:"Guyana",abbreviation:"GUY",pos:57,pts:42.86223208850565},725:{name:"Hong Kong China",abbreviation:"HKG",pos:24,pts:59.79800825204525},726:{name:"Hungary",abbreviation:"HUN",pos:71,pts:37.46311703938482},727:{name:"India",abbreviation:"IND",pos:86,pts:33.149196626957185},729:{name:"Israel",abbreviation:"ISR",pos:63,pts:41.23599329395556},732:{name:"Jamaica",abbreviation:"JAM",pos:66,pts:39.00289216517771},734:{name:"Kazakhstan",abbreviation:"KAZ",pos:64,pts:41.1590368649243},735:{name:"Kenya",abbreviation:"KEN",pos:34,pts:51.11552159106227},736:{name:"Korea",abbreviation:"KOR",pos:30,pts:53.45530939403538},737:{name:"Latvia",abbreviation:"LAT",pos:58,pts:42.736118474620184},738:{name:"Lithuania",abbreviation:"LTU",pos:42,pts:47.0230862648856},739:{name:"Luxembourg",abbreviation:"LUX",pos:62,pts:41.43914130970632},740:{name:"Madagascar",abbreviation:"MAD",pos:43,pts:46.892618219598845},741:{name:"Malaysia",abbreviation:"MAS",pos:51,pts:45.142930806643164},743:{name:"Moldova",abbreviation:"MDA",pos:56,pts:43.13302143033079},744:{name:"Monaco",abbreviation:"MON",pos:109,pts:17.171558073802643},745:{name:"Morocco",abbreviation:"MAR",pos:46,pts:46.33345200516988},748:{name:"Niue Island",abbreviation:"NIU",pos:101,pts:28.62618599821591},749:{name:"Norway",abbreviation:"NOR",pos:105,pts:25.95205925585125},750:{name:"Papua New Guinea",abbreviation:"PNG",pos:84,pts:33.68373495485308},751:{name:"Paraguay",abbreviation:"PAR",pos:38,pts:48.496587750244416},752:{name:"Peru",abbreviation:"PER",pos:75,pts:36.34962670617964},753:{name:"Poland",abbreviation:"POL",pos:33,pts:51.416845682996446},756:{name:"Russia",abbreviation:"RUS",pos:25,pts:58.06119262441148},759:{name:"Senegal",abbreviation:"SEN",pos:61,pts:41.519612523239246},760:{name:"Singapore",abbreviation:"SGP",pos:55,pts:44.04501371881927},761:{name:"Slovenia",abbreviation:"SLO",pos:72,pts:37.10209513216913},762:{name:"Solomon Islands",abbreviation:"SOL",pos:106,pts:23.972960374916912},766:{name:"Sri Lanka",abbreviation:"SRI",pos:45,pts:46.725970816327404},767:{name:"St Lucia",abbreviation:"LCA"},768:{name:"Eswatini",abbreviation:"SWZ",pos:104,pts:26.041034781746408},769:{name:"Sweden",abbreviation:"SWE",pos:36,pts:50.45677083991962},770:{name:"Switzerland",abbreviation:"SUI",pos:27,pts:56.2912064751571},771:{name:"Tahiti",abbreviation:"PYF"},772:{name:"Thailand",abbreviation:"THA",pos:80,pts:35.48529404312245},774:{name:"Trinidad & Tobago",abbreviation:"TTO",pos:50,pts:45.50985632221536},775:{name:"Tunisia",abbreviation:"TUN",pos:48,pts:46.09730376168768},776:{name:"Uganda",abbreviation:"UGA",pos:37,pts:50.38005471798778},777:{name:"Ukraine",abbreviation:"UKR",pos:53,pts:44.82238234970582},780:{name:"Vanuatu",abbreviation:"VAN",pos:111,pts:15.289167657403121},781:{name:"Venezuela",abbreviation:"VEN",pos:79,pts:35.872916157258715},784:{name:"Zambia",abbreviation:"ZAM",pos:68,pts:38.8267057170795},1029:{name:"Finland",abbreviation:"FIN",pos:78,pts:35.975047506875335},1030:{name:"Malta",abbreviation:"MLT",pos:44,pts:46.751056254089576},1031:{name:"Nigeria",abbreviation:"NGR",pos:69,pts:38.371356953172324},1247:{name:"Mexico",abbreviation:"MEX",pos:49,pts:45.821314380372456},1784:{name:"Laos",abbreviation:"LAO",pos:94,pts:30},2340:{name:"Serbia",abbreviation:"SRB",pos:73,pts:36.56875903662771},2382:{name:"Ghana",abbreviation:"GHA",pos:85,pts:33.268169788413765},2386:{name:"Burundi",abbreviation:"BDI",pos:103,pts:26.15648565369965},2387:{name:"Rwanda",abbreviation:"RWA",pos:99,pts:29.783758194069794},2389:{name:"Burkina Faso",abbreviation:"BUR",pos:90,pts:31.05},2397:{name:"Pakistan",abbreviation:"PAK",pos:92,pts:30.131830833302693},2476:{name:"St Vincent and the Grenadines",abbreviation:"VIN",pos:81,pts:34.91461494604602},2529:{name:"Greece",abbreviation:"GRE",pos:110,pts:16.5464517270594},2537:{name:"Philippines",abbreviation:"PHI",pos:39,pts:47.79565441444189},2576:{name:"Indonesia",abbreviation:"INA",pos:108,pts:21.94819879866199},2585:{name:"Costa Rica",abbreviation:"CRC",pos:100,pts:29.355816477561113},2744:{name:"Iran",abbreviation:"IRI",pos:94,pts:30},2857:{name:"Mauritius",abbreviation:"MRI",pos:91,pts:30.5580989461403},2861:{name:"Uzbekistan",abbreviation:"UZB",pos:89,pts:31.2828007869781},3200:{name:"Algeria",abbreviation:"ALG",pos:70,pts:37.948418160697074},3223:{name:"United Arab Emirates",abbreviation:"UAE",pos:60,pts:41.882469507367155},3224:{name:"Qatar",abbreviation:"QAT",pos:94,pts:30},3404:{name:"Turkey",abbreviation:"TUR",pos:94,pts:30},3674:{name:"American Samoa",abbreviation:"ASA",pos:112,pts:13.532106726695798},4756:{name:"Nepal",abbreviation:"NEP",pos:94,pts:30}};const F=R("data-v-27547396");y("data-v-27547396");const H={class:"types"},q={class:"teams"};T();const D={mounted(){this.selis=[...document.querySelectorAll(".teams li.active")],this.emitIds(),this.emitType(),setTimeout(this.close,2e3)},computed:{sortedTeams:()=>Object.entries(j).filter((e=>e[1].pos)).sort(((e,t)=>e[1].pos-t[1].pos))},methods:{typesLiClick(e){e.target.parentNode.querySelectorAll("li").forEach((e=>e.classList.remove("active"))),e.target.classList.toggle("active"),this.emitType()},emitType(){this.$emit("changed-type",document.querySelector(".types li.active").dataset.id)},teamsLiClick(e){e.target.classList.toggle("active"),e.target.classList.contains("active")?this.selis.push(e.target):this.selis.splice(this.selis.indexOf(e.target),1),this.selis.length>10&&this.selis.shift().classList.remove("active"),this.emitIds()},emitIds(e){this.$emit("changed-team-ids",[...document.querySelectorAll(".teams li")].map((e=>{const t=e.dataset.id,a=e.classList.contains("active");return Object.assign({id:t},j[t],{active:a})})))},toggle(e){this.$el.classList.toggle("closed",e)},open(){this.toggle(!1)},close(){this.toggle(!0)}},data:()=>({types:[{name:"Points",field:"pts"},{name:"Rang mondial",field:"pos"}],titles:{mode:"Sélectionner un mode d'affichage",team:"Sélectionner une équipe (10 max)"}})},V=Object.assign(D,{expose:[],setup:function(a){return F(((a,s)=>(e(),t("aside",{onMouseenter:s[3]||(s[3]=(...e)=>a.open&&a.open(...e)),onMouseleave:s[4]||(s[4]=(...e)=>a.close&&a.close(...e))},[f("h1",null,C(a.titles.mode),1),f("ul",H,[(e(!0),t(A,null,S(a.types,((n,o)=>(e(),t("li",{key:o,"data-id":n.field,class:{active:0===o},onClick:s[1]||(s[1]=(...e)=>a.typesLiClick&&a.typesLiClick(...e))},C(n.name),11,["data-id"])))),128))]),f("h1",null,C(a.titles.team),1),f("ul",q,[(e(!0),t(A,null,S(a.sortedTeams,((n,o)=>(e(),t("li",{key:o,"data-id":n[0],class:{active:"42"===n[0]||1===n[1].pos},onClick:s[2]||(s[2]=(...e)=>a.teamsLiClick&&a.teamsLiClick(...e))},C(n[1].pos)+". "+C(n[1].name)+" ("+C(n[1].abbreviation)+") - "+C(Math.round(100*n[1].pts)/100),11,["data-id"])))),128))])],32))))}});V.__scopeId="data-v-27547396";const z=R("data-v-31fe511e");y("data-v-31fe511e");const K=f("h1",null,"Simulateur",-1),Z={class:"form"},W=f("tr",null,[f("td",null,"Équipe"),f("td",null,"Score"),f("td",null,"Dom?")],-1),_={class:"team-form"},X={class:"team-form"},J=f("tr",null,[f("td",{colspan:"3"},[N("Coupe du monde "),f("input",{class:"wcup-bonus",type:"checkbox",name:""})])],-1),Y={colspan:"3"},Q=N(),ee=f("table",{class:"results"},null,-1);T();const te={mounted(){this.match={home:{},guest:{}},this.$el.querySelectorAll("select").forEach((e=>{this.changeTeam({target:e})})),this.$el.querySelectorAll("input[type=number]").forEach((e=>{this.changeScore({target:e})})),setTimeout(this.close,2e3)},computed:{sortedTeams:function(){return Object.entries(j).filter((e=>e[1].pos)).sort(((e,t)=>e[1].pos-t[1].pos))}},methods:{toggle(e){this.$el.classList.toggle("closed",e)},open(){this.toggle(!1)},close(e){e&&this.$el===e.explicitOriginalTarget||(this.$el.querySelectorAll("select").forEach(((e,t,a)=>{e.blur()})),this.toggle(!0))},changeTeam(e){const t=e.target,s=+t.value,n=t.classList.contains("team1")?"team1":"team2";this.match[n]=j[e.target.value],this.match[n].score=+this.$el.querySelector(`.${n}-score`).value,a(`../datas/teams/${s}.min.json`).then((e=>{this.match[n].pts=e[Object.keys(e).pop()].pts}))},changeScore(e){const t=e.target,a=t.classList.contains("team1-score")?"team1":"team2";this.match[a].score=+t.value},changeHomeBonus(e){const t=e.target.classList.contains("team1-home")?"team2":"team1";document.querySelector(`.${t}-home`).checked=!1},compute(){const e=document.querySelector(".home-bonus:checked"),t=e?e.classList.contains("team1-home")?3:-3:0,a=document.querySelector(".wcup-bonus:checked")?2:1,s=this.clamp(this.match.team1.pts+t-this.match.team2.pts,-10,10),n=this.match.team1.score-this.match.team2.score;let o=Math.abs(n)>15?1.5:1;const i=Object.entries(j).filter((e=>e[1].pos)),r=["team1","team2"];for(const c of r){"team2"===c&&(o*=-1),this.match[c].newPts=this.match[c].pts-(s/10-Math.sign(n))*o*a;i.find((e=>e[1].abbreviation==this.match[c].abbreviation)).newPts=this.match[c].newPts}i.sort(((e,t)=>(e[1].newPts||e[1].pts)<(t[1].newPts||t[1].pts)));for(const c of r){const e=this.match[c];e.newPos=i.findIndex((t=>t[1].abbreviation==e.abbreviation))+1}this.$el.querySelector(".results").innerHTML="";const p=(e,t,a)=>{const s=e[1].pos!==t+1,n=1===a.filter((t=>t[1].pts===e[1].pts)).length,o=!!e[1].newPts;return s&&n||o},l=i.findIndex(p),m=i.findLastIndex(p);for(let c=l;c<=m;c++){const e=i[c][1];let t=((e.newPts||e.pts)-e.pts).toPrecision(2),a=e.pos-(c+1);a>0&&(a="+"+a),t>0&&(t="+"+t),this.$el.querySelector(".results").innerHTML+=`<tr><td>${e.abbreviation}</td><td>${(e.newPts||e.pts).toPrecision(4)}</td><td>(${t})</td><td>${c+1}</td><td>(${a})</td></tr>`}},clean(){const e=Object.entries(j);this.$el.querySelector(".results").innerHTML="",e.filter((e=>e[1].newPts)).forEach((e=>{delete e[1].newPts,delete e[1].newPos}))},clamp:(e,t,a)=>Math.max(t,Math.min(e,a))},data:()=>({selectedTeam1:"33",selectedTeam2:"42"})},ae=Object.assign(te,{expose:[],setup:function(a){return z(((a,s)=>(e(),t("aside",{onMouseenter:s[11]||(s[11]=(...e)=>a.open&&a.open(...e)),onMouseleave:s[12]||(s[12]=(...e)=>a.close&&a.close(...e))},[K,f("table",Z,[W,f("tr",_,[f("td",null,[k(f("select",{class:"team1","onUpdate:modelValue":s[1]||(s[1]=e=>L(selectedTeam1)?selectedTeam1.value=e:null),onChange:s[2]||(s[2]=(...e)=>a.changeTeam&&a.changeTeam(...e))},[(e(!0),t(A,null,S(a.sortedTeams,((a,s,n)=>(e(),t("option",{value:a[0]},C(a[1].name)+" ("+C(a[1].abbreviation)+")",9,["value"])))),256))],544),[[x,a.selectedTeam1]])]),f("td",null,[f("input",{class:"team1-score",type:"number",value:"0",pattern:"[0-9]+",name:"",onChange:s[3]||(s[3]=(...e)=>a.changeScore&&a.changeScore(...e))},null,32)]),f("td",null,[f("input",{class:"team1-home home-bonus",type:"checkbox",name:"",onChange:s[4]||(s[4]=(...e)=>a.changeHomeBonus&&a.changeHomeBonus(...e))},null,32)])]),f("tr",X,[f("td",null,[k(f("select",{class:"team2","onUpdate:modelValue":s[5]||(s[5]=e=>L(selectedTeam2)?selectedTeam2.value=e:null),onChange:s[6]||(s[6]=(...e)=>a.changeTeam&&a.changeTeam(...e))},[(e(!0),t(A,null,S(a.sortedTeams,((a,s,n)=>(e(),t("option",{value:a[0]},C(a[1].name)+" ("+C(a[1].abbreviation)+")",9,["value"])))),256))],544),[[x,a.selectedTeam2]])]),f("td",null,[f("input",{class:"team2-score",type:"number",value:"0",pattern:"[0-9]+",name:"",onChange:s[7]||(s[7]=(...e)=>a.changeScore&&a.changeScore(...e))},null,32)]),f("td",null,[f("input",{class:"team2-home home-bonus",type:"checkbox",name:"",onChange:s[8]||(s[8]=(...e)=>a.changeHomeBonus&&a.changeHomeBonus(...e))},null,32)])]),J,f("tr",null,[f("td",Y,[f("button",{onClick:s[9]||(s[9]=(...e)=>a.compute&&a.compute(...e))},"Résultats >"),Q,f("button",{onClick:s[10]||(s[10]=(...e)=>a.clean&&a.clean(...e))},"Remise à 0")])])]),ee],32))))}});ae.__scopeId="data-v-31fe511e";const se={methods:{updateIds(e){this.teams=e},updateType(e){this.type=e}},data:()=>({teams:[],type:"pos",titre:"Historique des classements / notes World Rugby masculins",admin:!0})};w(Object.assign(se,{expose:[],setup:function(a){return(a,s)=>(e(),t(A,null,[f("h2",null,C(a.titre),1),f(V,{top:"10",onChangedTeamIds:a.updateIds,onChangedType:a.updateType},null,8,["onChangedTeamIds","onChangedType"]),f(G,{teams:a.teams,type:a.type},null,8,["teams","type"]),a.admin?(e(),t(ae,{key:0})):I("",!0)],64))}})).mount("#app");
