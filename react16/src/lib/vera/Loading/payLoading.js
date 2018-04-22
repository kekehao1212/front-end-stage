import './style.less'
export function showPayLoading(target, txt='正在支付...'){
  var temp = 
    `<div class="vh5-mask">
            <div class="vh5-loading-box centered">
              <div class="vh5-pay-loading">
                <svg id="check" width="128px" height="128px" viewBox="0 0 128 128" version="1.1">
                  <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <path d="M45.7199765,64.5684793 C45.7199765,62.3593403 47.5151948,60.5684793 49.7200609,60.5684793 L99.5842865,60.5684793 C101.793472,60.5684793 103.584371,62.3638355 103.584371,64.5684793 L103.584371,64.5684793 C103.584371,66.7776183 101.789153,68.5684793 99.5842865,68.5684793 L49.7200609,68.5684793 C47.5108753,68.5684793 45.7199765,66.7731232 45.7199765,64.5684793 L45.7199765,64.5684793 Z" id="Rectangle-25" fill="#FF86B1" transform="translate(74.652174, 64.568479) rotate(-45.000000) translate(-74.652174, -64.568479) "></path>
                    <path d="M103.584371,64.5684793 L103.584371,64.5684793 L45.7199765,64.5684793" id="Rectangle-24" fill="transparent" stroke-width="10" stroke="white" stroke-dashoffset="0" stroke-dasharray="100" transform="translate(74.652174, 64.568479) rotate(-45.000000) translate(-74.652174, -64.568479) "/>
                    
                    <path d="M35.9276494,75.1432728 C35.9276494,72.9341338 37.7217697,71.1432728 39.9244883,71.1432728 L59.9308106,71.1432728 C62.1382037,71.1432728 63.9276494,72.938629 63.9276494,75.1432728 L63.9276494,75.1432728 C63.9276494,77.3524118 62.1335292,79.1432728 59.9308106,79.1432728 L39.9244883,79.1432728 C37.7170952,79.1432728 35.9276494,77.3479167 35.9276494,75.1432728 L35.9276494,75.1432728 Z" id="Rectangle-10" fill="#FF3E83" transform="translate(49.927649, 75.143273) rotate(-315.000000) translate(-49.927649, -75.143273) "></path>
                    <path d="M63.9276494,75.1432728 L63.9276494,75.1432728 L35.9276494,75.1432728" id="Rectangle-9" stroke-width="10" stroke="white" stroke-dashoffset="0" stroke-dasharray="100" fill="red" transform="translate(49.927649, 75.143273) rotate(-315.000000) translate(-49.927649, -75.143273) "/>
                    
                    <path d="M64,128 C99.346224,128 128,99.346224 128,64 C128,28.653776 99.346224,0 64,0 C28.653776,0 0,28.653776 0,64 C0,99.346224 28.653776,128 64,128 Z M64,124 C97.137085,124 124,97.137085 124,64 C124,30.862915 97.137085,4 64,4 C30.862915,4 4,30.862915 4,64 C4,97.137085 30.862915,124 64,124 Z" id="Combined-Shape" fill="#FF6CA1" opacity="0.2"/>
                  </g>
                </svg>
                <div id="circle" class="circle moving"></div>
              </div>
              <div class="vh5-loading-text">${txt}</div>
            </div>
          </div>`
  var loadingNode = document.createElement('div')  
  loadingNode.id = "vh5-pay-loading-mask"
  loadingNode.innerHTML =  temp
  if(target){
    target.appendChild(loadingNode)
  }else{
    document.body.appendChild(loadingNode)
  }
  
  var circle = document.querySelector('#circle');
  var check_mask_left = document.querySelector('#Rectangle-9');
  var check_mask_right = document.querySelector('#Rectangle-24');
  prefixedEventListener(circle,"AnimationIteration",function(e){
      var elapsedTime = e.elapsedTime;
      globalETime = e.elapsedTime;
  });
  prefixedEventListener(circle,"AnimationEnd",function(e){
      circle.style.display = 'none';
      check_mask_left.style.webkitAnimation = '"dash" 0s linear forwards';
      check_mask_left.style.animation = '"dash" 0s linear forwards';
      check_mask_right.style.webkitAnimation = '"dashDelay" 0s linear forwards';
      check_mask_right.style.animation = '"dashDelay" 0s linear forwards';
  });
}
var globalETime = 0;
var pfx = ["webkit", "moz", "MS", "o", ""];
function prefixedEventListener(element, type, callback) {
    for (var p = 0; p < pfx.length; p++) {
        if (!pfx[p]) type = type.toLowerCase();
        element.addEventListener(pfx[p]+type, callback, false);
    }
}
/**
隐藏loading提示
**/
export function hidePayLoading(){
  var loadingNode = document.querySelector('#vh5-pay-loading-mask');
    if(loadingNode !==null){
       //document.body.removeChild(loadingNode);
       loadingNode.remove()
    }
}
/**
loading停止：圆圈停在270度，然后画对勾
**/
export function stopPayLoading(txt='支付成功'){
  var circle = document.querySelector('#circle');
  if(!circle){
    return
  }
  var computedStyle =window.getComputedStyle(circle),
      duratioin = parseFloat(computedStyle.getPropertyValue('animation-duration'));
  var eTimes = parseInt(globalETime/duratioin);
  circle.classList.remove('moving');
  circle.style.webkitAnimation = '"rotate" 0s linear forwards';
  circle.style.animation = '"rotate" 0s linear forwards';
  document.querySelector('.vh5-loading-text').textContent = txt
}