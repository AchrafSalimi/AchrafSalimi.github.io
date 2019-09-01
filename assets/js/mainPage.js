
            for(let i=0 ; i<document.querySelectorAll('.Loader-logo path').length ; i++){
                console.log(document.querySelectorAll('.Loader-logo path')[i].getTotalLength());
            }
            var SlideTimer;
            var Shown=false,onAnimation=false;
            let profileIcon = document.querySelector('.profile-icon');
            let cover = document.getElementById('cover-website');
            let LoginShown=false;

            if(window.getComputedStyle(document.querySelector('.Loader-logo path:nth-child(8)')).getPropertyValue('stroke-dashoffset') == 0){OnAnimationEnd(document.querySelector('.Loader-logo path:nth-child(8)'),function(){
                    document.querySelector('body').style.overflowY= 'scroll';
                    document.getElementById('loader').classList.add('loader-faded');
            })}else{
                    document.querySelector('body').style.overflowY= 'scroll';
                    document.getElementById('loader').classList.add('loader-faded');   
            }
/* Initialize*/

            function initialize(){
                let frontSc = document.getElementsByClassName('front-screen')[0];
                let ImgSlide = document.querySelector('.image-slide ul');
                let frontTitle = {header:'',paragraph:'',url:'',img:''};
                let profileSpan = document.querySelector('.profile-icon span');
                
                document.getElementById('search-icon').addEventListener('click',SearchBarClick);

                // ------------profileIcon animation end ------------------
                profileIcon.addEventListener('click',profileIconClick);
                document.querySelector('.close-button').addEventListener('click',profileIconClick);
                OnAnimationEnd(profileSpan,profileAnimationEnd);
                //----------------------- profile form --------------------------------------
                let LoginForm = document.getElementById('profile-form');

                function LoginFormAnimationEnd(){
                    if(window.getComputedStyle(this).getPropertyValue('opacity') == 0){
                        this.style.display='none';
                    }
                }
                OnTransitionEnd(LoginForm,LoginFormAnimationEnd);
                //----------------------------------------------------------
                // 
                //------------------------- dynamic slider image filling -------------------
                list.map((elm,i) =>{
                    frontSc.innerHTML = "<div id='front-screen-image-"+i+"' class='front-screen-div "+(elm.hasOwnProperty('focus') ? 'front-image-focus' : '')+"' style='background-image: url("+elm.img+")'></div>" + frontSc.innerHTML;
                    ImgSlide.innerHTML += "<li id='slide-image-"+i+"'"+(elm.hasOwnProperty('focus') ? ' class="focus"' : '') +" style='background-image: url("+elm.img+")' url="+elm.url+"><div><div><h2>"+elm.title+"</h2></div></div></li>";
                    if(elm.hasOwnProperty('focus')){
                        frontTitle.img = elm.img;
                        frontTitle.header=elm.title ;
                        frontTitle.paragraph=elm.paragraph;
                        frontTitle.url = elm.url;
                    } 
                })
                //----------------------------- dynamic front screen element generating-------------------
                frontSc.innerHTML += "<div class='front-title fade-up'><img src="+frontTitle.img+" /><h2>"+frontTitle.header+"</h2><p>"+frontTitle.paragraph+"<br><button onclick='window.open(&apos;"+frontTitle.url+"&apos;,&apos;_blank&apos;)'>Read more...</button></div></p>";
                //---------------------- slider image event listeners----------------------
                document.querySelectorAll(".image-slide ul li").forEach((a)=>{
                    a.addEventListener('mouseenter', onSlideHover);
                    a.addEventListener('click', onSlideClick);
                    a.addEventListener('mouseleave', StartAutoSlide);
                });

                //----------------------front title-----------------------
                let FrontTitleElm = document.querySelector('.front-title');
                function handleTitleAnimationEnd(){
                    this.classList.toggle('fade-up');
                }
                OnAnimationEnd(FrontTitleElm,handleTitleAnimationEnd);
                //---------------------- Set slider auto-slide------------------
                StartAutoSlide();
                OnTransitionEnd(document.getElementById('loader'),function(){
                    this.style.display = 'none';
                });


}






/*handler functions*/


//--------------------- animationendSetting ---------------//

                function OnAnimationEnd(el,fct){
                    el.addEventListener('animationend',fct);
                    el.addEventListener('webkitAnimationEnd',fct);
                    el.addEventListener('mozAnimationEnd',fct);
                }

                function OnTransitionEnd(el,fct){
                    el.addEventListener('transitionend',fct);
                    el.addEventListener('webkitTransitionEnd',fct);
                }
               /* function FadeFunction(element,opac,direction) {
                let step=0.1;
                let opacity = opac;
                if(direction === undefined){direction = 'asc'}
                if(direction === 'desc'){ step = -step}

                element.style.display = 'block';
                if (opacity < 1.1 && opacity > -0.1) {
                    opacity += opacity*step;
                    setTimeout(function(){FadeFunction(element,opacity,direction)},50);
                }else if(direction==='desc' && opacity<0){
                    element.style.display='none';
                }
                element.style.opacity = opacity;
                
                }*/


/*----------------profile-icon------------------*/
                let form = document.getElementById('profile-form');
                function profileIconClick(){
                    
                    showLogin();
                    profileClick();
                }

                function profileClick(){
                    profileIcon.removeEventListener('click',profileIconClick);
                    !LoginShown && document.querySelector('.profile-icon span').classList.add('profile-click-show');
                    LoginShown && document.querySelector('.profile-icon span').classList.add('profile-click-hide');
                    LoginShown = !LoginShown;
                }

                function showCover(){
                    if(window.matchMedia("(max-width:600px)").matches){
                        if(cover.style.display==='none'){
                            cover.style.display='block';

                        }else{
                            cover.style.display='none';
                        }
                    }
                }

                function showLogin(){
                    
                    showCover();
                    form.style.display = 'block';
                    /*form.style.display = 'block';
                    let class1='hidden';
                    let class2='shown';

                    if(form.classList.contains('shown')){class1='shown';class2='hidden';setTimeout(() => {
                        form.style.display = 'none';
                    }, 300)}
                    form.classList.replace(class1,class2);*/
                    if(form.classList.contains('shown')){
                        form.classList.add('hidden');
                        form.classList.remove('shown');
                    }else{
                        form.classList.add('shown');
                        form.classList.remove('hidden');
                    }
                }

                function profileAnimationEnd(){
                    LoginShown && this.classList.remove('profile-click-show');
                    !LoginShown && this.classList.remove('profile-click-hide');
                    profileIcon.addEventListener('click',profileIconClick);
                }
/*----------------------------------------------*/



                function StartAutoSlide(){
                    SlideTimer = setInterval(FocusNext, 4000);
                }
    
                function onSlideHover(e,elem){
                    clearInterval(SlideTimer);
                    handleSlideHover(e,this);
                }

                function handleSlideHover(e,elem){
                    if(elem === undefined){elem = this}

                    let Focused = document.querySelector('.focus');
                    if(Focused.id !== elem.id){
                        
                        SwitchFocus(elem,Focused);
                            //------------------- title fade up---------------------------
                            let element=document.getElementsByClassName('front-title')[0];
                            let listitem=list[parseInt(elem.id.slice(-1),10)];

                            let frontTitle = {header: listitem.title,paragraph: listitem.paragraph,url:listitem.url,img:listitem.img};
                            if(element.classList.contains('fade-up')){
                                element.classList.remove('fade-up');
                            }
                            element.innerHTML = "<img src="+frontTitle.img+" /><h2>"+frontTitle.header+"</h2><p>"+frontTitle.paragraph+"<br><button onclick='window.open(&apos;"+frontTitle.url+"&apos;,&apos;_blank&apos;)'>Read more...</button></p></div>";     
                                element.classList.add('fade-up');
                        //------ image handle------
                        document.getElementsByClassName('front-image-focus')[0].classList.toggle('front-image-focus');
                        document.getElementById(('front-screen-image-'+elem.id.slice(-1))).classList.toggle('front-image-focus');
                    }
                }

                function onSlideClick(){
                    var popup = window.open(this.getAttribute('url'),'_blank')
                    popup.blur();
                    window.focus;
                /*    let Focused = document.querySelector('.focus');
                    SwitchFocus(this,Focused);*/
                }

                function fadeUpTitle(element,listitem){
                    let frontTitle = {header: listitem.title,paragraph: listitem.paragraph,img: listitem.img};
                      
                    if(element.classList.contains('fade-up')){
                        element.classList.remove('fade-up');
                        console.log('done');
                    }

                    element.classList.add('fade-up');

                    element.innerHTML = "<h2>"+frontTitle.header+"</h2><p>"+frontTitle.paragraph+"</p><button>Read more...</button></div>";     
            
                }

                function SwitchFocus(element1,element2){
                    element2.classList.toggle('focus');
                    element1.classList.toggle('focus');
                    
                };

                function FocusNext(){
                    let e = null;
                    let Next = document.querySelector('.focus').nextElementSibling;
                    if(Next===null){Next = document.getElementById('slide-image-0');}
                    handleSlideHover(e,Next);
                }


                //------------------------HamClick----------------------------
                function onHamClick(){
                    document.querySelector('.Ham-icon').classList.toggle('Ham-clicked');
                    document.querySelector('.links').classList.toggle('nav-show');
                    if (form.classList.contains('hidden')){
                        showCover();
                    }
                }


                //---------------------------searchBarClick--------------------

                function SearchBarClick(e){
                    let Bar = document.getElementsByClassName('search-bar')[0];
                if(!Shown && !onAnimation){

                        onAnimation = true;
                        !Bar.classList.contains('search-bar-show')&& Bar.classList.toggle('search-bar-show');
                        setTimeout(() => {
                            Bar.children[0].setAttribute('placeholder',"Search in the website...");
                            Bar.children[1].children[0].innerHTML="Search";
                        }, 500);
                        setTimeout(() => {
                            onAnimation=false;
                            Shown = true;
                        }, 600);

                }else if(Shown && !onAnimation){
                        Shown = false;
                        onAnimation = true;
                        Bar.children[0].setAttribute('placeholder',"");
                        Bar.children[1].children[0].innerHTML="";
                        !Bar.classList.contains('search-bar-hide') && Bar.classList.toggle('search-bar-hide');
                        Bar.classList.contains('search-bar-show')&&Bar.classList.toggle('search-bar-show');
                        setTimeout(() => {
                            Bar.classList.toggle('search-bar-hide');
                            onAnimation=false;
                        }, 600);

                }
                }

                
