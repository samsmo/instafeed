/*sam smolenski 2013*/
(function ($){
 $.fn.instagrid = function (options) {
  	var that = this, appTotal,
      opts = $.extend({}, $.fn.instagrid.defaults, options);
  	$.ajax({
      type: "GET",
      dataType: "jsonp",
      cache: false,
      url: composeRequestURL(opts),
      success: function (res) {
      	formatData(that,res);
      }
    });
    function formatData(obj, data){
      console.log(data);
      if(data.meta.code == 200){
        var ul ='<ul>';
        $.each(data.data, function(key, value){
          var li,url;
          if(opts.tag !== null){
            if(value.tags.length > 0 ){
              $.each(value.tags, function(k, v){
                if(v == opts.tag){
                  ul +=  returnLi(opts.image_size,value.images,value.link);
                }{
                  obj.splice(key,1);
                }
              });
            }else{
              obj.splice(key, 1);
            }
          }else{
             ul +=  returnLi(opts.image_size,value.images,value.link);
          }
        });
        $(obj.selector).append(ul);
      }else{
        console.log('error, please change information and try again');
      }
    }
  }
  function composeRequestURL(opts){
    var apiEndpoint = "https://api.instagram.com/v1", para;
    para="?access_token="+opts.accessToken;
    if(opts.count !== null){
      para += "&count="+opts.count;
    }
    apiEndpoint +="/users/"+opts.userId+"/media/recent/"+para;
    console.log(apiEndpoint);
    return apiEndpoint;
  }
  function returnLi(size,img,link){
    var r;
    if(size == "low"){
      r = img.low_resolution.url;
    }else if(size == "thumb"){
      r = img.thumbnail.url;
    }else if(size == "standard"){
      r = img.standard_resolution.url;
    }
    r = "<li><a href='"+link+"'><img src='"+r+"' /></a></li>"; 
    return r;
  }
  $.fn.instagrid.defaults = {
    tag: null,
    userId: null,
    accessToken: '372608.250f576.73e72b1a5c344f40b1006959053d02bd',
    clientId: '250f5766d7ec4f3e9b5b0f85a4cbc4ff',
    image_size: "low",
    count: null
  };
})(jQuery);