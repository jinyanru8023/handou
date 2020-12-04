//导航
$('.fsh').eq(0).hover(function(){
    $(".drop").eq(0).css("display","block");
    // $(".drop1").css("display","block");
    $(this).css('color','red');

},function(){
 $(".drop").eq(0).css("display","none");
 $(".drop1").css("display","block");
 $(this).css('color','');
})
$('.fsh').eq(1).hover(function(){
    $(".drop").eq(1).css("display","block");
    $(this).css('color','red');

},function(){
 $(".drop").eq(1).css("display","none");
 $(this).css('color','');
})


$('li').on('mouseenter',function(){
    $(this).css("display","block");
})
// $('.drop1').each((index,value)=>{
//     $('.drop1').eq(index).on('mouseenter',function(){
//         $(this).css("display","block");
//         $(this).css('background','pink')
//     });
    
// })
//轮播
function Slider(){
    this.big_box = document.querySelector('#slide1');
    this.ul_li = this.big_box.children[0].children;
    
    this.num = this.ul_li.length;
    this.ol_li = this.addElement();
    this.lt = this.$('#ltBtn');
    this.rt = this.$('#rtBtn');
    this.cur_index = 0;
    this.addEvent();
    this.msg = this.$('#msg');
    this.slide();
    this.timer = null;
    this.autoPlay();

}
Slider.prototype.autoPlay = function(){
    this.timer = setInterval(()=>{
        this.cur_index ++;
        if(this.cur_index === this.num){
            this.cur_index = 0;
        }
        this.slide();
    },3000);
    this.big_box.onmouseenter = function(){
        //取消计时器
        clearInterval(this.timer);
    }.bind(this);
    //大盒子添加移出事件
    this.big_box.onmouseleave = function(){
        //调用自动轮播
        this.autoPlay();
    }.bind(this);
}
Slider.prototype.slide = function(){
    for(let i = 0;i < this.num;i ++){
        this.ul_li[i].style.display = 'none';
        this.ol_li[i].style.backgroundColor = 'yellow';
    }
    this.ul_li[this.cur_index].style.display = 'block';
    this.ol_li[this.cur_index].style.backgroundColor = 'blue';
    this.msg.innerText = this.ul_li[this.cur_index].children[0].children[0].alt;

}
Slider.prototype.addEvent = function(){
    this.lt.onclick = function(){
        this.cur_index --;
        if(this.cur_index === -1){
            this.cur_index = this.num - 1;
        }
        this.slide();
    }.bind(this);
    
    this.rt.onclick = function(){
        this.cur_index ++;
        if(this.cur_index === this.num){
            this.cur_index = 0;
        }
        this.slide();
    }.bind(this);
    for(let i = 0;i < this.num;i ++){
        this.ol_li[i].onclick = function(){
            this.cur_index = i;
            this.slide();
        }.bind(this);
    }
}
Slider.prototype.addElement = function(){
    let left_span = this.createElement('span');
    left_span.id = 'ltBtn';
    left_span.innerHTML = '&lt;';
    this.big_box.appendChild(left_span);
    let right_span = this.createElement('span');
    right_span.id = 'rtBtn';
    right_span.innerHTML = '&gt;';
    this.big_box.appendChild(right_span);
    let msg = this.createElement('div');
    msg.id = 'msg';
    this.big_box.appendChild(msg);
    let ol = this.createElement('ol');
    let arr_li = [];
    for(let i = 0;i < this.num ;i ++){
        
        let li = this.createElement('li');
        ol.appendChild(li);
        arr_li.push(li);
    }
    this.big_box.appendChild(ol);
    return arr_li;
    
}
Slider.prototype.createElement = function(ele){
    let o_element = document.createElement(ele);
    return o_element;
}
Slider.prototype.$ = function(selector){
    return document.querySelector(selector);
}
new Slider();
