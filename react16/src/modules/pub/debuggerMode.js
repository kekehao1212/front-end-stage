export default function(){
	window.dev_tool_count = 0
    $('body').on('click','.service-tel',(e)=>{
      window.dev_tool_count++;
      if(window.dev_tool_count===10){
        require.ensure([], function(){
          require("vconsole");
        }, "vconsole"); 
      }
    })
}