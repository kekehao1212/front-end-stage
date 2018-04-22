import './style.less'
export function showLoading(){
  var temp = 
    `<div class="gl-mask">
        <img class="gl-loading" src="//s.vpalstatic.com/public/h5/loading.gif"/>
      </div>`
  var loadingNode = document.createElement('div')  
  loadingNode.id = "vh5-loading-mask"
  loadingNode.innerHTML =  temp
  document.body.appendChild(loadingNode)
  
}
/**
隐藏loading提示
**/
export function hideLoading(){
  var loadingNode = document.querySelector('#vh5-loading-mask')
    if(loadingNode !==null){
        document.body.removeChild(loadingNode)
    }
  
}