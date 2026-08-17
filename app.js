const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const STORE='honestChoiceV4';
const defaults={profiles:[],current:null,settings:{theme:'dark',accent:'#7c5cff',font:100,compact:false,motion:true,adult:true,intensity:2,unique:true,privacy:false},questions:{}};
let db=load(), currentQuestion=null, previewQuestion=null, session=[];
function load(){try{return {...structuredClone(defaults),...JSON.parse(localStorage.getItem(STORE)||'{}')}}catch{return structuredClone(defaults)}}
function save(){localStorage.setItem(STORE,JSON.stringify(db))}
function profile(){return db.profiles.find(p=>p.id===db.current)}
function hash(str){let h=2166136261;for(let i=0;i<str.length;i++)h=Math.imul(h^str.charCodeAt(i),16777619);return(h>>>0).toString(36)}
function pick(a){return a[Math.floor(Math.random()*a.length)]}
function esc(s){return String(s).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]))}
function toast(t){const e=$('#toast');e.textContent=t;e.classList.add('show');setTimeout(()=>e.classList.remove('show'),1800)}
function initials(name){return name.split(/\s+/).slice(0,2).map(x=>x[0]).join('').toUpperCase()}
function displayName(name){if(!db.settings.privacy)return name;const x=name.split(/\s+/);return x[0]+(x[1]?' '+x[1][0]+'.':'')}
function today(){return new Date().toISOString().slice(0,10)}

const bank={
 adult:{label:'18+',notes:['Оба варианта добровольные, но достоинство уже вышло из чата.','Третьего варианта нет, удалить воспоминание тоже нельзя.','Все участники — совершеннолетние и согласны на происходящее.'],pairs:[
  ['дать партнёру посмотреть всю твою историю порно','дать родителям прочитать все твои интимные переписки'],
  ['заниматься сексом только под гимн страны','каждый раз слышать за стеной аплодисменты соседей'],
  ['навсегда потерять возможность испытывать оргазм','испытывать его каждый раз, когда чихаешь на людях'],
  ['рассказать партнёру о самой странной фантазии','услышать без фильтров все фантазии партнёра'],
  ['случайно отправить интимное голосовое в семейный чат','пять минут объяснять семье, кому оно предназначалось'],
  ['год встречаться только с бывшими своих друзей','позволить друзьям выбирать тебе каждое свидание'],
  ['чтобы мама нашла твою взрослую игрушку','чтобы партнёр нашёл твой старый дневник о бывшем'],
  ['никогда больше не заниматься сексом трезвым','никогда больше не заниматься сексом в темноте'],
  ['услышать честный рейтинг себя от всех бывших','публично выставить рейтинг всем своим бывшим'],
  ['всегда называть партнёра неправильным именем','всегда вспоминать родителей в самый неподходящий момент'],
  ['провести ночь в наручниках по обоюдному согласию','объяснять утром все следы любопытным родственникам'],
  ['показать друзьям последнее интимное фото в телефоне','дать партнёру прочитать последний разговор о нём с друзьями']
 ]},
 cringe:{label:'КРИНЖ',notes:['Интернет запомнит это навсегда.','Свидетели будут, оправданий не будет.','Уровень неловкости измерению не подлежит.'],pairs:[
  ['громко пукнуть в полной тишине на первом свидании','назвать официанта папой и продолжить разговор'],
  ['обосраться в лифте с соседями','застрять там на два часа после этого'],
  ['показать всей компании свои заметки в телефоне','зачитать вслух все недавние поисковые запросы'],
  ['случайно поставить лайк бывшему в три часа ночи','сразу после этого позвонить и молча сбросить'],
  ['стать мемом школы или университета на год','навсегда получить кличку из самого позорного случая'],
  ['каждый раз объяснять собственную шутку','громче всех смеяться над шутками, которых не понял'],
  ['прийти на тусовку в костюме, когда все в обычной одежде','прийти в домашней одежде на официальный вечер'],
  ['отправить скриншот переписки человеку из этой переписки','отправить ему голосовое с обсуждением его самого'],
  ['спеть любимую песню без музыки перед бывшим','станцевать любимый танец перед его новой компанией'],
  ['неделю говорить голосом мультяшного злодея','месяц заканчивать каждую фразу словом «мяу»'],
  ['познакомить родителей со случайным человеком как с партнёром','объяснить настоящему партнёру, зачем ты это сделал'],
  ['уснуть лицом в салате на свадьбе друга','проснуться и произнести длинный тост, ничего не понимая']
 ]},
 relations:{label:'ОТНОШЕНИЯ',notes:['Любой ответ кому-то разобьёт сердце.','Все узнают о решении сразу.','Отменить выбор после разговора нельзя.'],pairs:[
  ['узнать обо всех изменах партнёра','никогда не узнать, но продолжать сомневаться'],
  ['сохранить токсичные отношения ради сильных чувств','уйти и больше никогда не испытывать такой страсти'],
  ['выбрать партнёра вместо лучшего друга','выбрать друга и навсегда потерять партнёра'],
  ['услышать всю правду о том, что близкие думают о тебе','навсегда остаться в приятном заблуждении'],
  ['вернуться к человеку, который однажды предал','довериться новому человеку с тем же риском'],
  ['признаться в любви без взаимности перед всеми','скрывать взаимные чувства ещё десять лет'],
  ['знать пароль от телефона партнёра','дать ему полный доступ к своему телефону'],
  ['простить одну измену и никогда её не вспоминать','уйти сразу, даже если человек искренне раскаивается'],
  ['жить с любимым человеком в бедности','жить богато с человеком, к которому ничего не чувствуешь'],
  ['узнать, что друг годами тебе завидовал','узнать, что партнёр годами тебя жалел'],
  ['никогда больше не видеть бывшего','встречать его каждую неделю счастливым с другим'],
  ['позволить родителям решать, с кем тебе быть','позволить друзьям голосованием решать судьбу отношений']
 ]},
 money:{label:'ДЕНЬГИ',notes:['Деньги настоящие, последствия тоже.','Налогов нет, чувства вины могут быть.','Никто не посадит, но все будут знать.'],pairs:[
  ['получить десять миллионов и потерять всех друзей','остаться без денег, но сохранить каждого близкого'],
  ['продать доступ ко всей истории браузера за миллион','продать все личные переписки за два миллиона'],
  ['получать деньги за каждую чужую неудачу','терять деньги за каждую собственную удачу'],
  ['стать богатым благодаря человеку, которого ненавидишь','навсегда остаться бедным из принципа'],
  ['получить квартиру над круглосуточным караоке','получить машину, в которой всегда пахнет тухлой рыбой'],
  ['забрать выигрыш себе и соврать компании','честно разделить его на двадцать человек'],
  ['получить миллион за самый позорный прямой эфир','отказаться и всю жизнь знать, что запись всё равно существует'],
  ['никогда больше не платить за еду, но есть только невкусное','платить втрое дороже, но всегда есть любимое'],
  ['получить наследство от незнакомца с очень странным условием','отказаться, не узнав сумму и условие'],
  ['жить бесплатно с родителями до сорока','отдавать почти весь доход за крошечную отдельную комнату'],
  ['каждый месяц просить деньги у бывшего','каждую неделю отчитываться родителям о каждой покупке'],
  ['получить состояние сейчас и забыть последние пять лет','остаться при своих деньгах и помнить всё']
 ]},
 life:{label:'ЖИЗНЬ',notes:['Это вымышленная дилемма, но ответ многое о тебе говорит.','Никаких лазеек и третьих вариантов.','Знать последствия заранее не получится.'],pairs:[
  ['узнать точную дату собственной смерти','увидеть даты смерти всех близких'],
  ['стереть самый счастливый год жизни','каждую ночь заново переживать самый худший день'],
  ['жить вечно и видеть, как все уходят','прожить всего десять идеальных лет'],
  ['получить ответ на любой вопрос, но потерять чувство юмора','остаться весёлым и никогда не узнать главную правду'],
  ['вернуться в прошлое без воспоминаний о будущем','попасть в будущее без возможности вернуться'],
  ['никогда больше не испытывать страх','никогда больше не испытывать радость'],
  ['узнать, что вся жизнь была симуляцией','остаться в ней, навсегда забыв правду'],
  ['исправить одну свою ошибку и создать новую чужую','оставить прошлое как есть'],
  ['потерять все воспоминания о людях','сохранить воспоминания, но забыть все навыки'],
  ['всегда слышать, когда тебе врут','всегда быть вынужденным говорить правду'],
  ['один раз увидеть собственное будущее','один раз изменить чужое прошлое'],
  ['стать гением, которого все ненавидят','остаться обычным человеком, которого все любят']
 ]},
 absurd:{label:'АБСУРД',notes:['Наука отказалась это комментировать.','Да, запах тоже учитывается.','Объяснять происходящее окружающим придётся самостоятельно.'],pairs:[
  ['иметь вместо слюны майонез','потеть рассолом от солёных огурцов'],
  ['каждое утро просыпаться с чужими бровями','каждый вечер терять один случайный носок'],
  ['разговаривать только шёпотом в туалете','кричать каждый раз при открытии холодильника'],
  ['иметь одну огромную руку','иметь двадцать крошечных пальцев на каждой ноге'],
  ['чихать конфетти на похоронах','плакать кетчупом на свадьбах'],
  ['чтобы твой кот умел читать переписки','чтобы холодильник комментировал твой рацион'],
  ['ездить верхом на гигантском голубе','ежедневно выгуливать сто маленьких жирафов'],
  ['всегда пахнуть свежим хлебом для собак','всегда пахнуть мокрой собакой для людей'],
  ['есть суп вилкой всю жизнь','пить чай через макаронину'],
  ['заменить смех звуком автомобильной сигнализации','заменить плач мелодией из старой игры'],
  ['иметь говорящий пупок без чувства такта','иметь колени, которые громко сплетничают'],
  ['раз в неделю превращаться в табурет','каждую ночь спорить со своей подушкой']
 ]}
};
const prefixes={1:['Что ты выберешь: ','Если обязательно выбирать: '],2:['Что хуже: ','На что ты реально согласишься: ','Если отмазаться нельзя: '],3:['Без морали: ','Выбирай, трусить уже поздно: ','Какой кошмар забираешь себе: ']};
function questionPool(category='random'){
  const allowed=Object.keys(bank).filter(k=>db.settings.adult||k!=='adult');
  const keys=category==='random'||!allowed.includes(category)?allowed:[category];
  return keys.flatMap(k=>bank[k].pairs.map((_,index)=>({category:k,index,key:'pair_'+hash(k+'|'+index)})))
}
function migrateLegacyData(){if((db.dataVersion||0)>=10)return;db.profiles.forEach(p=>{p.seen=[]});db.dataVersion=10;save()}
function makeQuestion(category='random',intensity=db.settings.intensity,format='either',forced=null){
  const source=forced||pick(questionPool(category)),b=bank[source.category],pair=b.pairs[source.index];let q,opts;
  if(format==='yesno'){q=`Согласишься ли ты ${pair[0]}, если иначе придётся ${pair[1]}?`;opts=['Да, соглашусь','Нет, не соглашусь']}
  else if(format==='sacrifice'){q=`Чем ты скорее пожертвуешь: возможностью ${pair[0]} или возможностью ${pair[1]}?`;opts=[pair[0],pair[1]]}
  else{q=pick(prefixes[intensity])+pair[0]+' или '+pair[1]+'?';q=q[0].toUpperCase()+q.slice(1);opts=[pair[0],pair[1]]}
  const id='q_'+hash(source.category+'|'+format+'|'+q);return{id,key:source.key,cat:b.label,q,note:pick(b.notes),options:opts,generated:true}
}
function uniqueQuestion(category='random',intensity=db.settings.intensity,format='either'){
  const p=profile(),pool=questionPool(category);if(!p)return makeQuestion(category,intensity,format,pick(pool));
  let available=db.settings.unique?pool.filter(x=>!p.seen.includes(x.key)):pool;
  if(!available.length){const keys=new Set(pool.map(x=>x.key));p.seen=p.seen.filter(x=>!keys.has(x));save();available=pool;toast('Уникальный набор пройден — начинаем новый круг')}
  return makeQuestion(category,intensity,format,pick(available))
}
function markQuestionSeen(q){const p=profile();if(!p||!q?.key||p.seen.includes(q.key))return;p.seen.push(q.key);save();renderRemaining()}
function renderRemaining(){const p=profile();if(!p)return;const pool=questionPool('random'),left=pool.filter(x=>!p.seen.includes(x.key)).length;$('#remainingQuestions').textContent=`Без повторов: осталось ${left} из ${pool.length} уникальных сюжетов в текущем круге.`}

function validateName(raw){const name=raw.trim().replace(/\s+/g,' ');if(!/^[А-ЯЁA-Z][а-яёa-z-]{1,}(?:\s+[А-ЯЁA-Z][а-яёa-z-]{1,})+(?:\s+[А-ЯЁA-Z][а-яёa-z-]{1,})?$/.test(name))return'Введите имя и фамилию с заглавных букв';if(/тест|админ|никто|человек|фейк|аноним|qwerty|asdf/i.test(name))return'Похоже на псевдоним. Введите настоящее имя';if(new Set(name.toLowerCase().replace(/\s/g,'')).size<4)return'Имя выглядит некорректно';return''}
function openNameModal(cancel=true){$('#nameModal').classList.add('open');$('#nameModal').setAttribute('aria-hidden','false');$('#cancelName').style.display=cancel?'inline':'none';setTimeout(()=>$('#realNameInput').focus(),50)}
function closeNameModal(){if(profile()){$('#nameModal').classList.remove('open');$('#nameModal').setAttribute('aria-hidden','true');$('#nameForm').reset()}}
$('#nameForm').onsubmit=e=>{e.preventDefault();const name=$('#realNameInput').value.trim().replace(/\s+/g,' '),error=validateName(name);if(error){$('#nameError').textContent=error;$('#nameError').classList.add('error');$('#realNameInput').classList.add('invalid');return}if(!$('#ageConfirm').checked){$('#nameError').textContent='Нужно подтвердить возраст 18+';$('#nameError').classList.add('error');return}const p={id:'p_'+crypto.randomUUID(),name,created:Date.now(),answers:[],seen:[],streak:0,lastActive:Date.now(),bookmarks:[]};db.profiles.push(p);db.current=p.id;save();closeNameModal();startSession();renderAll();toast('Профиль создан')};
$('#realNameInput').oninput=()=>{$('#nameError').textContent='Минимум два слова, только буквы и дефис';$('#nameError').classList.remove('error');$('#realNameInput').classList.remove('invalid')};$('#cancelName').onclick=closeNameModal;

function localVotes(qid){return db.profiles.flatMap(p=>p.answers).filter(a=>a.qid===qid)}
function renderQuestion(q=currentQuestion){if(!q)return;currentQuestion=q;markQuestionSeen(q);$('#questionType').textContent=q.cat;$('#questionText').textContent=q.q;$('#questionNote').textContent=q.note;$('#questionNumber').textContent=String((profile()?.answers.length||0)+1).padStart(3,'0');const prior=profile()?.answers.find(a=>a.qid===q.id);$('#answerGrid').innerHTML=q.options.map((o,i)=>`<button class="answer-btn" data-choice="${i}"><span class="answer-fill"></span><span class="answer-inner"><span><small>ВАРИАНТ ${i?'Б':'А'}</small><b>${esc(o)}</b></span><strong></strong></span></button>`).join('');$$('.answer-btn').forEach(b=>b.onclick=()=>vote(+b.dataset.choice));$('#resultNote').textContent='';$('#funVerdict').classList.remove('show');$('#confetti').innerHTML='';$('#nextQuestion').disabled=true;$('#bookmarkQuestion').classList.toggle('active',profile()?.bookmarks.includes(q.id));if(prior)reveal(prior.choice,false);else{$('#localVoteLabel').textContent=localVotes(q.id).length?`${localVotes(q.id).length} локальных ответов`:'Пока нет локальных ответов'}}
function vote(choice){const p=profile();if(!p||p.answers.some(a=>a.qid===currentQuestion.id))return;const before=localVotes(currentQuestion.id),counts=[before.filter(x=>x.choice===0).length,before.filter(x=>x.choice===1).length];counts[choice]++;const majority=counts[0]===counts[1]?null:(counts[0]>counts[1]?0:1);p.answers.push({qid:currentQuestion.id,q:currentQuestion.q,options:currentQuestion.options,cat:currentQuestion.cat,choice,time:Date.now(),date:today()});if(currentQuestion.key&&!p.seen.includes(currentQuestion.key))p.seen.push(currentQuestion.key);p.streak++;p.lastActive=Date.now();save();reveal(choice,true);updateSession(true);renderStats();renderPeople();renderHistory()}
const verdicts={majority:['Стадное чувство? Нет, просто здравый смысл.','Народ с тобой. Сегодня ты подозрительно нормальный.','Большинство одобряет. Мама, возможно, тоже.','Ты попал в массовое сознание без очереди.'],minority:['Редкий выбор. Смелость или хаос — решай сам.','Ты против системы. Система слегка растеряна.','Большинство ушло направо, ты эффектно свернул не туда.','Поздравляем: твоя логика пока эксклюзивна.'],first:['Ты открыл голосование. Теперь остальные будут равняться или спорить.','Первый голос — и сразу абсолютное большинство. Удобно.','Статистика начинается с тебя. Никаких ботов, только ответственность.']};
function celebrate(choice,ps,total){const type=total===1?'first':ps[choice]>=50?'majority':'minority';$('#verdictLabel').textContent=type==='minority'?'РЕЖИМ: БУНТАРЬ':type==='first'?'ПЕРВОПРОХОДЕЦ':'РЕЖИМ: НАРОД';$('#verdictIcon').textContent=type==='minority'?'↯':type==='first'?'★':'✓';$('#verdictText').textContent=pick(verdicts[type]);$('#funVerdict').classList.add('show');const colors=['var(--accent)','var(--lime)','#ff5c64','#27a8ff','#f5c542'];$('#confetti').innerHTML=Array.from({length:18},(_,i)=>`<i style="--x:${Math.round((Math.random()-.5)*520)}px;--y:${Math.round((Math.random()-.7)*300)}px;--r:${Math.round(Math.random()*180)}deg;--c:${colors[i%colors.length]}"></i>`).join('')}
function reveal(choice,isNew){const votes=localVotes(currentQuestion.id),counts=[votes.filter(x=>x.choice===0).length,votes.filter(x=>x.choice===1).length],total=votes.length,ps=total?[Math.round(counts[0]/total*100),0]:[0,0];ps[1]=100-ps[0];$$('.answer-btn').forEach((b,i)=>{b.disabled=true;b.classList.add('revealed');if(i===choice)b.classList.add('chosen');b.querySelector('strong').textContent=ps[i]+'%';requestAnimationFrame(()=>b.querySelector('.answer-fill').style.width=ps[i]+'%')});$('#localVoteLabel').textContent=`${total} ${total===1?'честный локальный ответ':'локальных ответов'}`;$('#resultNote').textContent=total===1?'Ты первый, поэтому результат пока 100 / 0. Никаких выдуманных голосов.':(ps[choice]>=50?'Твой вариант сейчас поддерживает локальное большинство.':'Сейчас это выбор локального меньшинства.');if(isNew)celebrate(choice,ps,total);$('#nextQuestion').disabled=false}
function next(){currentQuestion=uniqueQuestion();renderQuestion();updateSession(false)}
function startSession(){session=Array.from({length:10},(_,i)=>({n:i+1,done:false}));currentQuestion=uniqueQuestion();renderQuestion();renderSession()}
function updateSession(done){const item=session.find(x=>!x.done);if(item&&done)item.done=true;renderSession()}
function renderSession(){const done=session.filter(x=>x.done).length;$('#sessionProgress').textContent=`${done} / 10`;$('#sessionBar').style.width=done*10+'%';$('#sessionList').innerHTML=session.map((x,i)=>`<div class="session-item ${x.done?'done':i===done?'current':''}"><i>${x.done?'✓':x.n}</i><span>${x.done?'Ответ записан':i===done?'Текущий вопрос':'Ожидает'}</span></div>`).join('')}
function renderFunStats(){const p=profile();if(!p)return;const chaos=Math.min(100,p.answers.length*3+p.streak*2+p.bookmarks.length*4+db.settings.intensity*5);$('#chaosBar').style.width=chaos+'%';$('#chaosValue').textContent=chaos+'%';const achievements=[['✓','Первый выбор',p.answers.length>=1],['10','Десять ответов',p.answers.length>=10],['↯','Серия из пяти',p.streak>=5],['◇','Три сохранённых',p.bookmarks.length>=3],['∞','Пятьдесят ответов',p.answers.length>=50]];$('#achievementList').innerHTML=achievements.map(([icon,title,on])=>`<span class="achievement ${on?'unlocked':''}" title="${title}">${icon}</span>`).join('');$$('#playModes button').forEach(b=>b.classList.toggle('active',+b.dataset.mode===db.settings.intensity))}
function agreement(p){if(!p.answers.length)return null;let agree=0,eligible=0;p.answers.forEach(a=>{const votes=localVotes(a.qid);if(votes.length<2)return;const c=[votes.filter(x=>x.choice===0).length,votes.filter(x=>x.choice===1).length];if(c[0]===c[1])return;eligible++;if(a.choice===(c[0]>c[1]?0:1))agree++});return eligible?Math.round(agree/eligible*100):null}
function renderStats(){const p=profile();if(!p)return;$('#helloName').textContent=p.name.split(' ')[0];$('#topName').textContent=displayName(p.name);$('#topAvatar').textContent=initials(p.name);$('#statAnswers').textContent=p.answers.length;$('#statToday').textContent=p.answers.filter(a=>a.date===today()).length+' сегодня';const a=agreement(p);$('#statAgreement').textContent=a===null?'—':a+'%';$('#statStreak').textContent=p.streak;$('#statPeople').textContent=db.profiles.length;$('#peopleBadge').textContent=db.profiles.length;renderFunStats()}
function renderPeople(){const sorted=[...db.profiles].sort((a,b)=>b.answers.length-a.answers.length);$('#emptyPeople').style.display=sorted.length?'none':'block';$('#peopleTable').innerHTML=sorted.map((p,i)=>{const a=agreement(p);return`<tr><td class="rank-pill">${String(i+1).padStart(2,'0')}</td><td><div class="table-person"><span class="avatar">${initials(p.name)}</span><span><b>${esc(displayName(p.name))}</b><small>${p.id===db.current?'ТЕКУЩИЙ ПРОФИЛЬ':'ЛОКАЛЬНЫЙ УЧАСТНИК'}</small></span></div></td><td>${p.answers.length}</td><td>${a===null?'недостаточно данных':a+'%'}</td><td>${p.streak}</td><td>${new Date(p.lastActive).toLocaleString('ru-RU',{day:'2-digit',month:'short',hour:'2-digit',minute:'2-digit'})}</td><td class="table-actions"><button data-switch="${p.id}">Выбрать</button></td></tr>`}).join('');$$('[data-switch]').forEach(b=>b.onclick=()=>switchProfile(b.dataset.switch))}
function renderHistory(){const p=profile(),a=[...(p?.answers||[])].reverse();$('#historyList').innerHTML=a.length?a.map((x,i)=>`<article class="history-item"><span>${i+1}</span><div><h4>${esc(x.q)}</h4><p>${esc(x.options[x.choice])} · ${x.cat}</p></div><time>${new Date(x.time).toLocaleString('ru-RU',{day:'2-digit',month:'short',hour:'2-digit',minute:'2-digit'})}</time></article>`).join(''):'<div class="empty-history">Здесь появятся только реальные ответы текущего участника.</div>'}
function renderProfileMenu(){const r=$('#profileButton').getBoundingClientRect(),m=$('#profileMenu');m.style.top=r.bottom+6+'px';m.style.right=innerWidth-r.right+'px';m.innerHTML=db.profiles.map(p=>`<button class="menu-person" data-menu-profile="${p.id}"><span class="avatar">${initials(p.name)}</span>${esc(displayName(p.name))}</button>`).join('')+'<hr><button id="menuAdd">＋ Добавить участника</button>';$$('[data-menu-profile]').forEach(b=>b.onclick=()=>{switchProfile(b.dataset.menuProfile);m.classList.remove('open')});$('#menuAdd').onclick=()=>{m.classList.remove('open');openNameModal(true)}}
function switchProfile(id){db.current=id;save();startSession();renderAll();toast('Профиль переключён')}
function renderAll(){renderStats();renderPeople();renderHistory();renderSettings();renderProfileMenu();renderRemaining()}

$('#nextQuestion').onclick=next;$('#skipQuestion').onclick=next;$('#randomQuestion').onclick=next;$('#quickGenerate').onclick=()=>{next();$('#feed').scrollIntoView({behavior:'smooth'})};$('#restartSession').onclick=startSession;
$$('#playModes button').forEach(b=>b.onclick=()=>{updateSetting('intensity',+b.dataset.mode);renderFunStats();$('#genIntensity').value=b.dataset.mode;$('#intensityOutput').textContent=['','Мягко','Смело','Жёстко'][b.dataset.mode];next();toast('Режим игры изменён')});
$('#chaosQuestion').onclick=()=>{const chaosCats=db.settings.adult?['adult','cringe','absurd']:['cringe','absurd'];currentQuestion=uniqueQuestion(pick(chaosCats),3,'either');renderQuestion();$('#feed').scrollIntoView({behavior:'smooth'});toast('Колесо хаоса выбрало вопрос')};
$('#bookmarkQuestion').onclick=()=>{const p=profile(),i=p.bookmarks.indexOf(currentQuestion.id);if(i<0){p.bookmarks.push(currentQuestion.id);toast('Вопрос сохранён')}else{p.bookmarks.splice(i,1);toast('Удалено из сохранённых')}save();$('#bookmarkQuestion').classList.toggle('active',i<0)};
$('#shareQuestion').onclick=async()=>{try{await navigator.clipboard.writeText(currentQuestion.q+'\nА: '+currentQuestion.options[0]+'\nБ: '+currentQuestion.options[1]);toast('Вопрос скопирован')}catch{toast('Копирование недоступно')}};
$('#profileButton').onclick=()=>{$('#profileMenu').classList.toggle('open');renderProfileMenu()};$('#addPerson').onclick=()=>openNameModal(true);document.addEventListener('click',e=>{if(!e.target.closest('.profile-button')&&!e.target.closest('.profile-menu'))$('#profileMenu').classList.remove('open')});
$('#generateCustom').onclick=()=>{previewQuestion=uniqueQuestion($('#genCategory').value,+$('#genIntensity').value,$('#genFormat').value);markQuestionSeen(previewQuestion);$('#previewMeta').textContent=previewQuestion.cat+' · УНИКАЛЬНАЯ КОМБИНАЦИЯ';$('#previewQuestion').textContent=previewQuestion.q;$('#previewOptions').innerHTML=previewQuestion.options.map(x=>`<i>${esc(x)}</i>`).join('');$('#sendToFeed').disabled=false};$('#sendToFeed').onclick=()=>{currentQuestion=previewQuestion;renderQuestion();$('#feed').scrollIntoView({behavior:'smooth'});toast('Вопрос добавлен в ленту')};$('#genIntensity').oninput=e=>$('#intensityOutput').textContent=['','Мягко','Смело','Жёстко'][e.target.value];
$('#clearHistory').onclick=()=>{const p=profile();if(confirm('Удалить ответы и историю текущего участника?')){p.answers=[];p.seen=[];p.streak=0;save();startSession();renderAll();toast('История очищена')}};
$('#resetSeen').onclick=()=>{const p=profile();if(!p)return;p.seen=[];save();next();renderRemaining();toast('Набор вопросов начат заново')};
function exportLocalData(){const blob=new Blob([JSON.stringify(db,null,2)],{type:'application/json'}),a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='honest-choice-data.json';a.click();URL.revokeObjectURL(a.href);toast('Данные экспортированы')}
$('#exportData').onclick=exportLocalData;$('#exportDataSettings').onclick=exportLocalData;$('#importData').onclick=()=>$('#importFile').click();$('#importFile').onchange=async e=>{try{const data=JSON.parse(await e.target.files[0].text());if(!Array.isArray(data.profiles)||!data.settings)throw Error();db=data;save();location.reload()}catch{toast('Не удалось прочитать файл данных')}};

function hexRgb(hex){const n=parseInt(hex.slice(1),16);return`${n>>16},${n>>8&255},${n&255}`}
function applySettings(){const s=db.settings,theme=s.theme==='system'?(matchMedia('(prefers-color-scheme:light)').matches?'light':'dark'):s.theme;document.documentElement.dataset.theme=theme;document.documentElement.style.setProperty('--accent',s.accent);document.documentElement.style.setProperty('--accent-rgb',hexRgb(s.accent));const scale=s.font/100,root=document.documentElement.style;root.setProperty('--font-scale',scale);root.setProperty('--body-size',14*scale+'px');root.setProperty('--nav-size',12*scale+'px');root.setProperty('--meta-size',10*scale+'px');root.setProperty('--stat-size',23*scale+'px');root.setProperty('--section-size',28*scale+'px');root.setProperty('--answer-size',13*scale+'px');root.setProperty('--preview-size',30*scale+'px');root.setProperty('--modal-title-size',27*scale+'px');root.setProperty('--welcome-size',`clamp(${30*scale}px,${3.4*scale}vw,${49*scale}px)`);root.setProperty('--question-size',`clamp(${29*scale}px,${3.1*scale}vw,${45*scale}px)`);document.body.classList.toggle('compact',s.compact);document.body.classList.toggle('no-motion',!s.motion)}
function renderSettings(){const s=db.settings;$('#themeSetting').value=s.theme;$('#fontSetting').value=s.font;$('#compactSetting').checked=s.compact;$('#motionSetting').checked=s.motion;$('#adultSetting').checked=s.adult;$('#globalIntensity').value=s.intensity;$('#uniqueSetting').checked=s.unique;$('#privacySetting').checked=s.privacy;$('#globalIntensityLabel').textContent=['','Мягко','Смело','Жёстко'][s.intensity];$('#fontSettingLabel').textContent=s.font+'% — '+(s.font<100?'мельче':s.font>100?'крупнее':'стандартный');$$('#accentSetting button').forEach(b=>b.classList.toggle('active',b.dataset.color===s.accent));applySettings()}
function updateSetting(key,val){db.settings[key]=val;save();renderSettings();if(key==='privacy'){renderPeople();renderStats()}}
$('#themeSetting').onchange=e=>updateSetting('theme',e.target.value);$('#fontSetting').oninput=e=>updateSetting('font',+e.target.value);$('#compactSetting').onchange=e=>updateSetting('compact',e.target.checked);$('#motionSetting').onchange=e=>updateSetting('motion',e.target.checked);$('#adultSetting').onchange=e=>updateSetting('adult',e.target.checked);$('#globalIntensity').oninput=e=>updateSetting('intensity',+e.target.value);$('#uniqueSetting').onchange=e=>updateSetting('unique',e.target.checked);$('#privacySetting').onchange=e=>updateSetting('privacy',e.target.checked);$$('#accentSetting button').forEach(b=>b.onclick=()=>updateSetting('accent',b.dataset.color));
function openSettings(){$('#settingsDrawer').classList.add('open');$('#settingsDrawer').setAttribute('aria-hidden','false')}function closeSettings(){$('#settingsDrawer').classList.remove('open');$('#settingsDrawer').setAttribute('aria-hidden','true')}$('#openSettings').onclick=openSettings;$$('[data-close-settings]').forEach(b=>b.onclick=closeSettings);document.addEventListener('keydown',e=>{if(e.key==='Escape')closeSettings()});
$('#resetAll').onclick=()=>{if(confirm('Удалить всех участников, ответы и настройки на этом устройстве?')){localStorage.removeItem(STORE);location.reload()}};
$('#mobileMenu').onclick=()=>$('.sidebar').classList.toggle('open');$$('.sidebar a').forEach(a=>a.onclick=()=>$('.sidebar').classList.remove('open'));
document.addEventListener('keydown',e=>{if(e.target.matches('input,select,textarea')||$('#nameModal').classList.contains('open')||$('#settingsDrawer').classList.contains('open'))return;if(e.key==='1')$$('.answer-btn')[0]?.click();if(e.key==='2')$$('.answer-btn')[1]?.click();if(e.key.toLowerCase()==='n')($('#nextQuestion').disabled?$('#skipQuestion'):$('#nextQuestion')).click();if(e.key.toLowerCase()==='s')openSettings()});
$$('[data-section]').forEach(a=>{const el=$(a.getAttribute('href'));new IntersectionObserver(([x])=>{if(x.isIntersecting){$$('[data-section]').forEach(n=>n.classList.remove('active'));a.classList.add('active')}},{rootMargin:'-20% 0px -70%'}).observe(el)});
migrateLegacyData();applySettings();if(!profile())openNameModal(false);else{startSession();renderAll()}
