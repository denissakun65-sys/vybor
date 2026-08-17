const questions = [
  {cat:'18+', q:'Обосраться на первом свидании или назвать партнёра именем бывшего во время секса?', note:'Свидание мечты отменяется в обоих случаях.', options:['Провал на свидании','Имя бывшего'], votes:[19832,20117]},
  {cat:'18+', q:'Показать маме всю историю браузера или дать друзьям прочитать все личные переписки?', note:'Удалять, закрывать вкладки и давать пояснения нельзя.', options:['История для мамы','Переписки друзьям'], votes:[24419,23982]},
  {cat:'18+', q:'Год без секса или год без музыки?', note:'Совсем. Даже случайно услышанное считается.', options:['Без секса','Без музыки'], votes:[21804,22011]},
  {cat:'18+', q:'Выпить стакан воды из чужой ванны или лизнуть поручень в метро?', note:'Вода после купания. Поручень в час пик.', options:['Вода из ванны','Поручень метро'], votes:[17338,17081]},
  {cat:'18+', q:'Всегда говорить вслух, когда хочешь в туалет, или каждый раз сообщать, когда тебе кто-то нравится?', note:'Громко и при всех присутствующих.', options:['Говорить про туалет','Признаваться в симпатии'], votes:[25091,14972]},
  {cat:'18+', q:'Навсегда отказаться от алкоголя или от секса?', note:'Даже по праздникам. Исключений нет.', options:['Без алкоголя','Без секса'], votes:[28110,12377]},
  {cat:'18+', q:'Родители получают доступ к твоим сообщениям или бывший — к твоим фотографиям?', note:'Полный архив за последние пять лет.', options:['Сообщения родителям','Фото бывшему'], votes:[20145,19862]},
  {cat:'18+', q:'Месяц не мыться или месяц спать по три часа в сутки?', note:'Дезодорант нельзя. Отсыпаться днём тоже.', options:['Не мыться','Спать по 3 часа'], votes:[12538,27301]},
  {cat:'18+', q:'Каждый твой оргазм сопровождается сиреной или каждое враньё — громким мяуканьем?', note:'Звук слышат все в радиусе ста метров.', options:['Сирена','Мяуканье'], votes:[19944,20218]},
  {cat:'18+', q:'Прийти голым на чужую свадьбу или в свадебном костюме на похороны?', note:'Уйти раньше окончания нельзя.', options:['Голым на свадьбу','Нарядным на похороны'], votes:[21887,17862]},
  {cat:'18+', q:'Телефон без пароля остаётся на вечеринке или твой дневник читают вслух семье?', note:'В телефоне открыты последние переписки.', options:['Телефон на вечеринке','Дневник семье'], votes:[20502,20319]},
  {cat:'18+', q:'Жить с родителями до 35 или каждый месяц переезжать к новому случайному соседу?', note:'Денег на отдельное жильё в этом сценарии нет.', options:['С родителями','Случайные соседи'], votes:[22677,18120]},
  {cat:'ДИЛЕММЫ', icon:'⚖', q:'Узнать дату своей смерти или причину?', note:'Изменить будущее нельзя — только знать.', options:['Знать дату','Знать причину'], votes:[18422,17931]},
  {cat:'АБСУРД', icon:'◉', q:'Если бы тени умели говорить, чью ты бы боялся услышать?', note:'Свою тень тоже можно выбрать.', options:['Свою','Чужую'], votes:[9104,13487]},
  {cat:'ДЕНЬГИ', icon:'₽', q:'10 миллионов сейчас или 100 тысяч каждый месяц до конца жизни?', note:'Выплаты не индексируются. Деньги легальные.', options:['10 млн сейчас','100 тыс. в месяц'], votes:[22519,23714]},
  {cat:'ОТНОШЕНИЯ', icon:'♡', q:'Что важнее: быть правым или сохранить отношения?', note:'Представь, что спор действительно важный.', options:['Быть правым','Сохранить отношения'], votes:[15282,16019]},
  {cat:'БУДУЩЕЕ', icon:'↗', q:'Жить 200 лет, но не иметь детей, или обычную жизнь с семьёй?', note:'Здоровье до конца жизни сохраняется.', options:['200 лет','Обычная жизнь'], votes:[11633,24591]},
  {cat:'МОЗГОЛОМКИ', icon:'✦', q:'Ты бы удалил одно плохое воспоминание, если вместе с ним исчезнет одно хорошее?', note:'Выбрать конкретные воспоминания нельзя.', options:['Да, удалю','Нет, оставлю всё'], votes:[16840,17192]},
  {cat:'ДИЛЕММЫ', icon:'⚖', q:'Всегда говорить только правду или никогда больше не говорить?', note:'Писать и жестикулировать тоже считается речью.', options:['Только правда','Полное молчание'], votes:[27891,9412]},
  {cat:'АБСУРД', icon:'◉', q:'Кот размером со слона или сто слонов размером с кота?', note:'Они настроены дружелюбно, но очень хотят есть.', options:['Огромный кот','Сто мини-слонов'], votes:[19355,20418]},
  {cat:'ДЕНЬГИ', icon:'₽', q:'Работа мечты за обычную зарплату или скучная работа за тройную?', note:'Рабочий день и коллектив одинаковые.', options:['Работа мечты','Тройная зарплата'], votes:[21774,22109]},
  {cat:'ОТНОШЕНИЯ', icon:'♡', q:'Читать мысли партнёра или позволить ему читать твои?', note:'Отключить способность будет нельзя.', options:['Читать его мысли','Открыть свои'], votes:[25661,11308]},
  {cat:'БУДУЩЕЕ', icon:'↗', q:'Телепортироваться куда угодно или останавливать время на 10 минут в день?', note:'Телепортация мгновенная. Время нельзя копить.', options:['Телепортация','Остановка времени'], votes:[18491,18605]},
  {cat:'МОЗГОЛОМКИ', icon:'✦', q:'Если точная копия тебя совершит преступление, должен ли ты отвечать?', note:'Копия помнит всю твою жизнь и считает себя тобой.', options:['Да, должен','Нет, не должен'], votes:[10924,26951]},
  {cat:'ДИЛЕММЫ', icon:'⚖', q:'Спасти любимого человека или пятерых незнакомцев?', note:'Третьего варианта нет. Никто не узнает о выборе.', options:['Любимого','Пятерых незнакомцев'], votes:[29718,15002]},
  {cat:'АБСУРД', icon:'◉', q:'Что хуже: икать каждый раз, когда врёшь, или мяукать после каждого чиха?', note:'Очень тихо сделать это не получится.', options:['Икать от лжи','Мяукать от чиха'], votes:[15808,20316]},
  {cat:'ДЕНЬГИ', icon:'₽', q:'Получить квартиру, в которой нельзя делать ремонт, или машину, которую нельзя продать?', note:'Обе вещи новые и находятся в твоём городе.', options:['Квартира','Машина'], votes:[32144,8709]},
  {cat:'ОТНОШЕНИЯ', icon:'♡', q:'Лучше один друг на всю жизнь или много близких друзей на разные её этапы?', note:'В обоих случаях дружба будет настоящей.', options:['Один навсегда','Много в разное время'], votes:[19776,20212]},
  {cat:'БУДУЩЕЕ', icon:'↗', q:'Отказаться от смартфона навсегда или от путешествий навсегда?', note:'Компьютером пользоваться можно. Командировки — тоже путешествия.', options:['Без смартфона','Без путешествий'], votes:[13014,28967]},
  {cat:'МОЗГОЛОМКИ', icon:'✦', q:'Если корабль заменить по одной детали целиком — это всё ещё тот же корабль?', note:'Да, это тот самый парадокс Тесея.', options:['Да, тот же','Нет, уже другой'], votes:[20041,19884]},
  {cat:'ДИЛЕММЫ', icon:'⚖', q:'Забыть всё прошлое или не создавать новых воспоминаний?', note:'Навыки сохранятся, но люди и события — нет.', options:['Забыть прошлое','Без новых воспоминаний'], votes:[26451,11207]},
  {cat:'АБСУРД', icon:'◉', q:'Облака на вкус скорее сладкие или солёные?', note:'Наука временно не участвует в этом голосовании.', options:['Сладкие','Солёные'], votes:[28317,9462]},
  {cat:'ДЕНЬГИ', icon:'₽', q:'Стабильность без роста или риск с шансом 20% стать очень богатым?', note:'В случае неудачи придётся начать с нуля.', options:['Стабильность','Рискнуть'], votes:[19915,20103]},
  {cat:'ОТНОШЕНИЯ', icon:'♡', q:'Лучше получить честный болезненный ответ или утешительную ложь?', note:'Ты никогда не узнаешь, что ложь была ложью.', options:['Честный ответ','Утешительная ложь'], votes:[31401,9501]},
  {cat:'БУДУЩЕЕ', icon:'↗', q:'Жить в идеальном виртуальном мире или несовершенной реальности?', note:'В виртуальном мире ты не будешь знать, что он виртуальный.', options:['Идеальная иллюзия','Реальная жизнь'], votes:[12519,27482]},
  {cat:'МОЗГОЛОМКИ', icon:'✦', q:'Может ли решение быть свободным, если мозг принял его раньше тебя?', note:'Не думай слишком долго — или мозг победит.', options:['Да, может','Нет, не может'], votes:[17662,18091]},
  {cat:'ДИЛЕММЫ', icon:'⚖', q:'Иметь кнопку «отменить» для слов или для поступков?', note:'Использовать можно один раз в неделю.', options:['Отменять слова','Отменять поступки'], votes:[14408,26992]},
  {cat:'АБСУРД', icon:'◉', q:'Если понедельник исчезнет, вторник станет понедельником?', note:'Вопрос одобрен людьми, не любящими будильники.', options:['Да, неизбежно','Нет, будет вторник'], votes:[19011,18765]},
  {cat:'ДЕНЬГИ', icon:'₽', q:'Получать 1 рубль за каждый шаг или 100 рублей за каждый час сна?', note:'Выплаты пожизненные и без налогов.', options:['Рубль за шаг','100 ₽ за час сна'], votes:[23451,17334]},
  {cat:'ОТНОШЕНИЯ', icon:'♡', q:'Вернуться к одному разговору в прошлом или увидеть один разговор из будущего?', note:'Изменить увиденное напрямую нельзя.', options:['Разговор из прошлого','Разговор из будущего'], votes:[20148,20390]},
  {cat:'БУДУЩЕЕ', icon:'↗', q:'Идеальная память или способность мгновенно забывать по желанию?', note:'Обе способности полностью под контролем.', options:['Помнить всё','Забывать по желанию'], votes:[22973,19207]},
  {cat:'МОЗГОЛОМКИ', icon:'✦', q:'Если никто не помнит событие, было ли оно частью истории?', note:'Все физические следы тоже исчезли.', options:['Да, было','Нет, не было'], votes:[21840,18552]}
];

const categories = [
  ['ВСЕ','all'],['18+','adult'],['ДИЛЕММЫ','balance'],['АБСУРД','orbit'],['ДЕНЬГИ','coin'],['ОТНОШЕНИЯ','link'],['БУДУЩЕЕ','future'],['МОЗГОЛОМКИ','mind']
];
const iconPaths = {
  all:'<circle cx="12" cy="12" r="8"/><path d="M4 12h16M12 4c3 3 3 13 0 16M12 4c-3 3-3 13 0 16"/>',
  adult:'<path d="M12 3 21 7v6c0 5-4 7-9 9-5-2-9-4-9-9V7Z"/><path d="M8 10v5M7 10h2M7 15h2M12 10v5l3-5v5"/>',
  balance:'<path d="M12 3v18M5 6h14M7 6l-4 8h8L7 6ZM17 6l-4 8h8l-4-8ZM8 21h8"/>',
  orbit:'<circle cx="12" cy="12" r="3"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(35 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(-35 12 12)"/>',
  coin:'<circle cx="12" cy="12" r="9"/><path d="M9 7h4a3 3 0 0 1 0 6H9V7Zm0 6h5M9 17h4M9 5v14"/>',
  link:'<path d="M9.5 14.5 14.5 9M7 17H5a4 4 0 0 1 0-8h3M17 7h2a4 4 0 0 1 0 8h-3"/>',
  future:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l4 3M4 4l3 1-2 3"/>',
  mind:'<path d="M8 20H6a3 3 0 0 1-2-5 4 4 0 0 1 1-7 4 4 0 0 1 7-2 4 4 0 0 1 7 3 4 4 0 0 1 1 7 3 3 0 0 1-3 4h-2M12 5v16M8 9h4M12 13h4"/>'
};
function icon(name){return `<svg class="topic-icon" viewBox="0 0 24 24" aria-hidden="true">${iconPaths[name]}</svg>`}
let activeCategory='ВСЕ', filtered=[...questions.keys()], current=0, voted=false;
let stats=JSON.parse(localStorage.getItem('vyborStatsV2')||'{"answered":0,"agreed":0,"streak":0,"votes":{}}');
const $=s=>document.querySelector(s);
const els={card:$('#pollCard'),category:$('#questionCategory'),q:$('#questionText'),note:$('#questionNote'),options:$('#options'),count:$('#voteCount'),idx:$('#currentIndex'),total:$('#questionCount'),next:$('#nextBtn'),message:$('#resultMessage')};

function format(n){return new Intl.NumberFormat('ru-RU').format(n)}
function renderTopics(){
  $('#topicList').innerHTML=categories.map(([name,iconName])=>`<button class="topic-btn ${name===activeCategory?'active':''}" data-cat="${name}">${icon(iconName)}<span>${name}</span></button>`).join('');
  document.querySelectorAll('.topic-btn').forEach(b=>b.onclick=()=>{activeCategory=b.dataset.cat; filtered=questions.map((_,i)=>i).filter(i=>activeCategory==='ВСЕ'||questions[i].cat===activeCategory);current=0;renderTopics();changeQuestion();document.querySelector('#vote').scrollIntoView({behavior:'smooth'});});
}
function renderQuestion(){
  const qi=filtered[current%filtered.length], data=questions[qi]; voted=false;
  els.category.textContent=data.cat;els.q.textContent=data.q;els.note.textContent=data.note;els.idx.textContent=String(current+1).padStart(2,'0');els.total.textContent=String(filtered.length).padStart(2,'0');
  const saved=stats.votes[qi];
  els.options.innerHTML=data.options.map((o,i)=>`<button class="option-btn" data-option="${i}"><span class="fill"></span><span class="option-content"><span>${o}</span><b class="percent"></b></span></button>`).join('');
  els.count.textContent=format(data.votes.reduce((a,b)=>a+b,0)+(saved!==undefined?1:0));els.message.textContent='';els.next.disabled=true;
  document.querySelectorAll('.option-btn').forEach(b=>b.onclick=()=>vote(qi,+b.dataset.option));
  if(saved!==undefined) reveal(qi,saved,false);
}
function vote(qi,choice){
  if(voted||stats.votes[qi]!==undefined)return;
  const data=questions[qi], total=data.votes[0]+data.votes[1]+1, counts=[...data.votes];counts[choice]++;
  const majority=counts[0]>=counts[1]?0:1;stats.answered++;stats.votes[qi]=choice;
  if(choice===majority){stats.agreed++;stats.streak++;}else stats.streak=0;
  localStorage.setItem('vyborStatsV2',JSON.stringify(stats));reveal(qi,choice,true);updateStats();
}
function reveal(qi,choice,isNew){
  voted=true;const data=questions[qi],counts=[...data.votes];counts[choice]++;const total=counts[0]+counts[1];let p0=Math.round(counts[0]/total*100), ps=[p0,100-p0];
  document.querySelectorAll('.option-btn').forEach((b,i)=>{b.disabled=true;b.classList.add('revealed');if(i===choice)b.classList.add('chosen');b.querySelector('.percent').textContent=ps[i]+'%';requestAnimationFrame(()=>b.querySelector('.fill').style.width=ps[i]+'%');});
  els.count.textContent=format(total);els.next.disabled=false;
  const majority=ps[choice]>=50;els.message.textContent=majority?'Ты с большинством. Но это ещё не значит, что вы правы.':'Редкий выбор — так ответило меньшинство.';
  if(!isNew) els.message.textContent='Ты уже отвечал на этот вопрос.';
}
function changeQuestion(target){
  els.card.classList.add('change');setTimeout(()=>{if(target!==undefined){const pos=filtered.indexOf(target);if(pos>=0)current=pos;else{activeCategory='ВСЕ';filtered=[...questions.keys()];current=target;renderTopics();}}else current=(current+1)%filtered.length;renderQuestion();els.card.classList.remove('change');},220);
}
function randomQuestion(){const next=Math.floor(Math.random()*questions.length);changeQuestion(next);setTimeout(()=>$('#vote').scrollIntoView({behavior:'smooth',block:'center'}),80)}
function updateStats(){
  $('#answeredCount').textContent=stats.answered;$('#streakCount').textContent=stats.streak;const rate=stats.answered?Math.round(stats.agreed/stats.answered*100):0;$('#agreementRate').textContent=stats.answered?rate+'%':'—';$('#statRing').style.background=`conic-gradient(var(--ink) ${rate*3.6}deg,#ffffff88 0)`;
}
function renderRating(){
 const ranked=questions.map((q,i)=>({q,i,d:Math.abs(q.votes[0]/(q.votes[0]+q.votes[1])*100-50)})).sort((a,b)=>a.d-b.d).slice(0,3);
 $('#ratingGrid').innerHTML=ranked.map((x,n)=>{let p=Math.round(x.q.votes[0]/(x.q.votes[0]+x.q.votes[1])*100);return `<article class="rating-card" data-i="${x.i}"><span class="rank">#0${n+1} · ${x.q.cat}</span><h3>${x.q.q}</h3><div class="split-bar"><i style="width:${p}%"></i><i style="width:${100-p}%"></i></div><div class="split-labels"><span>${p}%</span><span>${100-p}%</span></div></article>`}).join('');
 document.querySelectorAll('.rating-card').forEach(c=>c.onclick=()=>{changeQuestion(+c.dataset.i);setTimeout(()=>$('#vote').scrollIntoView({behavior:'smooth'}),100)});
}
function showToast(text){const t=$('#toast');t.textContent=text;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),1800)}


const generatorBank = {
  '18+': [
    ['Дать родителям прочитать твои переписки или показать друзьям историю браузера?','Переписки родителям','История друзьям'],
    ['Год жить без секса или год без любимой музыки?','Без секса','Без музыки'],
    ['Опозориться на первом свидании или случайно написать бывшему ночью?','Позор на свидании','Сообщение бывшему'],
    ['Месяц не мыться или месяц спать только по три часа?','Не мыться','Почти не спать'],
    ['Каждый раз вслух сообщать о симпатии или о желании сходить в туалет?','Про симпатию','Про туалет']
  ],
  'Деньги': [
    ['Получить {sum} сейчас или удвоенную сумму через {years}?','Деньги сейчас','Подождать'],
    ['Выбрать {comfort} или рискнуть всем ради {dream}?','Стабильность','Риск'],
    ['Работать {hours}, но за тройную зарплату, или жить скромно со свободным временем?','Высокий доход','Свободное время']
  ],
  'Отношения': [
    ['Знать всю правду о близком человеке или сохранить доверие без доказательств?','Знать правду','Сохранить доверие'],
    ['Вернуть одну прошлую дружбу или гарантированно найти новую?','Вернуть прошлое','Найти новое'],
    ['Всегда понимать чувства других или уметь идеально объяснять свои?','Понимать других','Объяснять себя']
  ],
  'Будущее': [
    ['Увидеть свой мир через {years} или получить один совет от себя из будущего?','Увидеть мир','Получить совет'],
    ['Жить в городе без машин или в городе без интернета?','Без машин','Без интернета'],
    ['Доверить важное решение алгоритму или случайному человеку?','Алгоритму','Человеку']
  ],
  'Абсурд': [
    ['Иметь голос навигатора или смеяться звуком старого модема?','Голос навигатора','Смех модема'],
    ['Если бы {object} умел обижаться, пришлось бы перед ним извиняться?','Да, пришлось бы','Нет, это вещь'],
    ['Каждый понедельник менять имя или каждую пятницу — профессию?','Менять имя','Менять профессию']
  ],
  'Выбор': [
    ['Помнить каждую ошибку или забывать каждый успех?','Помнить ошибки','Забывать успехи'],
    ['Иметь один идеальный день в году или хорошие выходные каждую неделю?','Идеальный день','Хорошие выходные'],
    ['Уметь отменять сказанное или заранее слышать последствия своих слов?','Отменять слова','Слышать последствия']
  ]
};
const substitutions={sum:['миллион','10 миллионов','годовую зарплату'],years:['5 лет','10 лет','20 лет'],comfort:['полную стабильность','знакомую работу','предсказуемую жизнь'],dream:['мечты','собственного дела','свободы'],hours:['по 12 часов в день','без выходных один год','три дня в неделю'],object:['будильник','холодильник','рабочий стол']};
let generated=null,lastGenerated='';
function pick(a){return a[Math.floor(Math.random()*a.length)]}
function fillTemplate(text){return text.replace(/\{(\w+)\}/g,(_,key)=>pick(substitutions[key]))}
function generateDilemma(){
  let category=$('#genCategory').value;
  if(category==='Случайная') category=pick(Object.keys(generatorBank));
  const tone=$('#genTone').value;
  let variants=generatorBank[category], item=pick(variants), tries=0;
  while(item[0]===lastGenerated&&tries++<8)item=pick(variants);
  lastGenerated=item[0];
  let q=fillTemplate(item[0]);
  if(tone==='Сложный'&&category!=='Абсурд')q=q.replace(/\?$/,', если изменить решение потом будет нельзя?');
  if(tone==='Ироничный'&&category!=='Абсурд')q=q.replace(/\?$/,' — и объяснить свой выбор родителям?');
  if(tone==='Жёсткий 18+'&&category!=='18+')q=q.replace(/\?$/,' — пока все друзья смотрят и снимают на видео?');
  const map={'18+':'18+','Деньги':'ДЕНЬГИ','Отношения':'ОТНОШЕНИЯ','Будущее':'БУДУЩЕЕ','Абсурд':'АБСУРД','Выбор':'ДИЛЕММЫ'};
  generated={cat:map[category],q,note:'Вопрос создан генератором прямо в твоём браузере.',options:[item[1],item[2]],votes:[Math.floor(8500+Math.random()*16000),Math.floor(8500+Math.random()*16000)]};
  $('#generatedQuestion').innerHTML=`<span class="gen-label">${generated.cat} · НОВЫЙ ВОПРОС</span><h3>${generated.q}</h3><div class="gen-options"><span>${generated.options[0]}</span><i>ИЛИ</i><span>${generated.options[1]}</span></div>`;
  $('#addQuestionBtn').disabled=false;
}
function addGenerated(){
  if(!generated)return;
  questions.push({...generated});
  activeCategory='ВСЕ';filtered=[...questions.keys()];current=questions.length-1;
  renderTopics();renderRating();renderQuestion();
  $('#vote').scrollIntoView({behavior:'smooth'});
  showToast('Вопрос добавлен в голосование');
  generated=null;$('#addQuestionBtn').disabled=true;
}

renderTopics();renderQuestion();renderRating();updateStats();
els.next.onclick=()=>changeQuestion();$('#skipBtn').onclick=()=>changeQuestion();$('#randomHeader').onclick=randomQuestion;$('#manifestoRandom').onclick=randomQuestion;$('#hotBtn').onclick=()=>{const hot=questions.findIndex(x=>x.q.startsWith('Что важнее: быть правым'));changeQuestion(hot);setTimeout(()=>$('#vote').scrollIntoView({behavior:'smooth'}),100)};
$('#copyBtn').onclick=async()=>{try{await navigator.clipboard.writeText(location.href.split('#')[0]+'#vote');showToast('Ссылка скопирована');}catch{showToast('Ссылка готова: '+location.href)}};
const helpModal=$('#localHelp');
function openLocalHelp(){helpModal.classList.add('open');helpModal.setAttribute('aria-hidden','false');document.body.classList.add('modal-open');helpModal.querySelector('.modal-close').focus()}
function closeLocalHelp(){helpModal.classList.remove('open');helpModal.setAttribute('aria-hidden','true');document.body.classList.remove('modal-open')}
document.querySelectorAll('[data-local-help]').forEach(b=>b.onclick=openLocalHelp);
document.querySelectorAll('[data-close-help]').forEach(b=>b.onclick=closeLocalHelp);
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&helpModal.classList.contains('open'))closeLocalHelp()});
document.querySelectorAll('[data-scroll]').forEach(b=>b.onclick=()=>document.getElementById(b.dataset.scroll).scrollIntoView({behavior:'smooth'}));
$('#regenerateBtn').onclick=generateDilemma;$('#addQuestionBtn').onclick=addGenerated;
$('#resetStats').onclick=()=>{if(confirm('Сбросить все твои ответы и статистику?')){stats={answered:0,agreed:0,streak:0,votes:{}};localStorage.setItem('vyborStatsV2',JSON.stringify(stats));updateStats();renderQuestion();showToast('Статистика сброшена')}};
window.addEventListener('scroll',()=>{const y=scrollY+180;document.querySelectorAll('.nav button').forEach(b=>{const el=document.getElementById(b.dataset.scroll);b.classList.toggle('active',el&&y>=el.offsetTop&&y<el.offsetTop+el.offsetHeight)})});
