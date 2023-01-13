const up=document.getElementById('up');
const left=document.getElementById('left');
const down=document.getElementById('down');
const right=document.getElementById('right');
const restart=document.getElementById('restart');
const start=document.getElementById('start');
const win=document.getElementById('win');
const fail=document.getElementById('gameover');




var a=[['a1','a2','a3','a4'],['b1','b2','b3','b4'],['c1','c2','c3','c4'],['d1','d2','d3','d4']];


/*清除方块内容*/
function clear(block){
    block.style.backgroundColor="#cdc1b3";
    block.innerHTML='';
}

/*给方块上色和数字*/
function create(block){
    switch(block.innerHTML){
    case '':
        block.style.backgroundColor='#cdc1b3';
        block.innerHTML='';
        break;

    case '2':
        block.style.backgroundColor='#efe5db';
        block.innerHTML='2';
        block.style.color='#7a6d65';
        block.style.fontSize='65px';
        block.style.textAlign='center';
        block.style.lineHeight='98px';
        break;
    
    case '4':
        block.style.backgroundColor='#eddcbe';
        block.innerHTML='4';
        block.style.color='#7a6d65';
        block.style.fontSize='65px';
        block.style.textAlign='center';
        block.style.lineHeight='98px';
        break;

    case '8':
        block.style.backgroundColor='#f3b079';
        block.innerHTML='8';
        block.style.color='#7a6d65';
        block.style.fontSize='65px';
        block.style.textAlign='center';
        block.style.lineHeight='98px';
        break;

    case '16':
        block.style.backgroundColor='#f7925c';
        block.innerHTML='16';
        block.style.color='#7a6d65';
        block.style.fontSize='65px';
        block.style.textAlign='center';
        block.style.lineHeight='98px';
        break;

    case '32':
        block.style.backgroundColor='#f57656';
        block.innerHTML='32';
        block.style.color='#7a6d65';
        block.style.fontSize='65px';
        block.style.textAlign='center';
        block.style.lineHeight='98px';
        break;

    case '64':
        block.style.backgroundColor='#f4522c';
        block.innerHTML='64';
        block.style.color='#7a6d65';
        block.style.fontSize='65px';
        block.style.textAlign='center';
        block.style.lineHeight='98px';
        break;

    case '128':
        block.style.backgroundColor='#edce71';
        block.innerHTML='128';
        block.style.color='#7a6d65';
        block.style.fontSize='43px';
        block.style.textAlign='center';
        block.style.lineHeight='98px';
        break;

    case '256':
        block.style.backgroundColor='#e6d151';
        block.innerHTML='256';
        block.style.color='#7a6d65';
        block.style.fontSize='43px';
        block.style.textAlign='center';
        block.style.lineHeight='98px';
        break;

    case '512':
        block.style.backgroundColor='#1200ff';
        block.innerHTML='512';
        block.style.color='#7a6d65';
        block.style.fontSize='43px';
        block.style.textAlign='center';
        block.style.lineHeight='98px';
        break;

    case '1024':
        block.style.backgroundColor='#cc00ff';
        block.innerHTML='1024';
        block.style.color='#7a6d65';
        block.style.fontSize='32px';
        block.style.textAlign='center';
        block.style.lineHeight='98px';
        break;

    case '2048':
        block.style.backgroundColor='#000000';
        block.innerHTML='2048';
        block.style.color='#7a6d65';
        block.style.fontSize='32px';
        block.style.textAlign='center';
        block.style.lineHeight='98px';
        break;
    }
}

function gameover(){
    restart.style.visibility='visible';
    up.style.visibility='hidden';
    left.style.visibility='hidden';
    down.style.visibility='hidden';
    right.style.visibility='hidden';
    start.style.visibility='hidden';
    fail.style.visibility='visible';
}

function gamewin(){
    restart.style.visibility='visible';
    up.style.visibility='hidden';
    left.style.visibility='hidden';
    down.style.visibility='hidden';
    right.style.visibility='hidden';
    start.style.visibility='hidden';
    win.style.visibility='visible';
}

function check(){
    let cnt=0;
    for(let i=0;i<4;i++)
    {
        for(let j=0;j<4;j++)
        {
            let object2=document.getElementById(a[i][j]);
            if(object2.innerHTML===2048)
            {
                gamewin();
            }else if(object2.innerHTML!=='')
            {
                cnt++;
            }
        }
    }
    if(cnt===16)
    {
        gameover();
    }
}

/*随机生成数字函数（‘2’或‘4’）*/
function random_span(){
	var x=[];
	var y=[];
		for (let i=0;i<4;i++ )
		{
			for (let j=0;j<4;j++ )
			{
				if(document.getElementById(a[i][j]).innerHTML==""){
					x.push(i);
					y.push(j);
				}
			}
		}
		if(x.length!=0){
			var r=[2,4];
			var num1=Math.floor(Math.random() * x.length);
			var object=document.getElementById(a[x[num1]][y[num1]]);
            object.innerHTML=r[Math.floor(Math.random() * 2)];
			create(object);
			return;
		}
}

up.addEventListener('click',moveup);
/*移动指令 */
function moveup(){
    var moveflag;
    let i=1;
    let j=0;
    let succes=false;
    var mover=[[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
    for(j=0;j<4;j++)
    {
        for(i=1;i<4;i++)
        {
            moveflag=true;
            let romx=i;
            let romy=j;
            let object;
            let object1;
            while(moveflag&&romx>0){
                object=document.getElementById(a[romx][romy]);
                object1=document.getElementById(a[romx-1][romy]);
                if(object1.innerHTML==='')
                {
                    if(object.innerHTML!=='')
                    {
                        succes=true;
                    }
                    object1.innerHTML=object.innerHTML;
                    object.innerHTML='';
                }else{
                    moveflag=false;
                    if(object1.innerHTML===object.innerHTML&&mover[romx-1][romy]===0)
                    {
                        object1.innerHTML*=2;
                        object.innerHTML='';
                        succes=true;
                        mover[romx-1][romy]=1;
                    }
                }
                create(object1);
                create(object);
                romx--;
            }           
        }
        
    }
    if(succes)
    {
        random_span();
    }
    check();
}

down.addEventListener('click',movedown);
function movedown(){
    var moveflag;
    let i=1;
    let j=0;
    let succes=false;
    var mover=[[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
    for(j=0;j<4;j++)
    {
        for(i=2;i>=0;i--)
        {
            moveflag=true;
            let romx=i;
            let romy=j;
            let object;
            let object1;
            while(moveflag&&romx<3){
                object=document.getElementById(a[romx][romy]);
                object1=document.getElementById(a[romx+1][romy]);
                if(object1.innerHTML==='')
                {
                    if(object.innerHTML!=='')
                    {
                        succes=true;
                    }
                    object1.innerHTML=object.innerHTML;
                    object.innerHTML='';
                }else{
                    moveflag=false;
                    if(object1.innerHTML===object.innerHTML&&mover[romx+1][romy]===0)
                    {
                        object1.innerHTML*=2;
                        object.innerHTML='';
                        succes=true;
                        mover[romx+1][romy]=1;
                    }
                }
                create(object1);
                create(object);
                romx++;
            }           
        }
        
    }
    if(succes){
        random_span();
    }
    check();
}

left.addEventListener('click',moveleft);
function moveleft(){
    var moveflag;
    let i=1;
    let j=0;
    let succes=false;
    var mover=[[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
    for(i=0;i<4;i++)
    {
        for(j=1;j<4;j++)
        {
            moveflag=true;
            let romx=i;
            let romy=j;
            let object;
            let object1;
            while(moveflag&&romy>0){
                object=document.getElementById(a[romx][romy]);
                object1=document.getElementById(a[romx][romy-1]);
                if(object1.innerHTML==='')
                {
                    if(object.innerHTML!=='')
                    {
                        succes=true;
                    }
                    object1.innerHTML=object.innerHTML;
                    object.innerHTML='';
                }else{
                    moveflag=false;
                    if(object1.innerHTML===object.innerHTML&&mover[romx][romy-1]===0)
                    {
                        succes=true;
                        object1.innerHTML*=2;
                        object.innerHTML='';
                        mover[romx][romy-1]=1;
                    }
                }
                create(object1);
                create(object);
                romy--;
            }           
        }
        
    }
    if(succes){
        random_span();
    }
    check();
}

right.addEventListener('click',moveright);
function moveright(){
    var moveflag;
    let i=1;
    let j=0;
    let succes=false;
    var mover=[[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
    for(i=0;i<4;i++)
    {
        for(j=2;j>=0;j--)
        {
            moveflag=true;
            let romx=i;
            let romy=j;
            let object;
            let object1;
            while(moveflag&&romy<3){
                object=document.getElementById(a[romx][romy]);
                object1=document.getElementById(a[romx][romy+1]);
                if(object1.innerHTML==='')
                {
                    if(object.innerHTML!=='')
                    {
                        succes=true;
                    }
                    object1.innerHTML=object.innerHTML;
                    object.innerHTML='';
                }else{
                    moveflag=false;
                    if(object1.innerHTML===object.innerHTML&&mover[romx][romy+1]===0)
                    {
                        succes=true;
                        object1.innerHTML*=2;
                        object.innerHTML='';
                        mover[romx][romy+1]=1;
                    }
                }
                create(object1);
                create(object);
                romy++;
            }           
        }
        
    }
    if(succes)
    {
        random_span();
    }
    check();
}

/*积分板，传入要加的分 */



start.addEventListener('click',begin);
function begin(){
    random_span();
    start.style.visibility='hidden';
    restart.style.visibility='visible';
}

restart.addEventListener('click',re_start);
function re_start(){
    restart.style.visibility='hidden';
    fail.style.visibility='hidden';
    win.style.visibility='hidden';
    up.style.visibility='visible';
    left.style.visibility='visible';
    down.style.visibility='visible';
    right.style.visibility='visible';
    start.style.visibility='visible';
    for(let i=0;i<4;i++)
    {
        for(let j=0;j<4;j++)
        {
            let object=document.getElementById(a[i][j]);
            clear(object);
        }
    }
}

