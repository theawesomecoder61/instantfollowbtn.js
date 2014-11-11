(function($){
  $.fn.instantfollowbtn = function(options) {

    // variables!
    var t = $(this);
    var atoken = options.accessToken;
    var cid = options.clientID;
    var uid = options.userID;
    var ptxt = options.primaryText;
    var stxt = options.secondaryText;

    // set some defaults
    var defaults = { 
      accessToken: "",
      clientID: "",
      primaryText: "",
      secondaryText: "",
      userID: "25025320"
    }
    var options = $.extend(defaults, options);

    // add a class and some html
    t.addClass("ig-btn").html("<span class='btn'></span><span class='secondary'></span>");

    // get some info about the user
    $.ajax({
      type: "GET",
      dataType: "jsonp",
      url: "https://api.instagram.com/v1/users/" + uid + "/?access_token=" + atoken,
      success: function(data) {

        // some variables
        var fn = data.data.full_name;
        var un = data.data.username;
        var following = data.data.counts.follows;
        var followers = data.data.counts.followed_by;

        // do some setup
        t.find(".btn").text(ptxt);
        $(".secondary").show();

        // detect mobile
        var link = "";
        var isMobile = function() {
          return {
            detect: function detectMobile() {
              var uagent = navigator.userAgent.toLowerCase(); 
              var list = this.mobiles;
              var ismobile = false;
              for(var d=0;d<list.length;d+=1){
                if(uagent.indexOf(list[d])!=-1){
                  ismobile = true;
                }
              }
              return ismobile;
            },
            mobiles: [
              "iphone","ipod","android"
            ]
          };
        }();
        if(isMobile.detect() || isMobile.detect() == true) {
          var ask1 = confirm("Would you like to go to the Instagram app?");
          if(ask1 || ask1 == true) {
            link="instagram://user?username="+un;
          } else {
            var ask2=confirm("Would you like to go to the Instagram mobile website?");
            if(ask2 || ask2 == true) {
              link="http://instagram.com/"+un;
            }
          }
        } else {
          link = "http://instagram.com/" + un; 
        }
        t.attr("href", link);

        // add commas
        function addCommas(nStr) {
          nStr += '';
          var x = nStr.split('.');
          var x1 = x[0];
          var x2 = x.length > 1 ? '.' + x[1] : '';
          var rgx = /(\d+)(\d{3})/;
          while (rgx.test(x1)) {
            x1 = x1.replace(rgx, '$1' + ',' + '$2');
          }
          return x1 + x2;
        }

        // primary text
        var ptoShow = "";
        if(options.primaryText == "#user#" || options.primaryText === null  || options.primaryText == "") {
          ptoShow = "Follow " + un;
        }
        if(options.primaryText !== "#user#" && options.primaryText !== "") {
          ptoShow = options.primaryText;
        }
        $(".btn").text(ptoShow);
        
        // secondary text
        var stoShow = 0;
        if(options.secondaryText == "#followers#" || options.secondaryText === null  || options.secondaryText == "") {
          stoShow = addCommas(followers);
        }
        if(options.secondaryText == "#following#") {
          stoShow = addCommas(following);
        }
        if(options.secondaryText !== "#followers#" && options.secondaryText !== "#following#"  && options.secondaryText !== "") {
          stoShow = options.secondaryText;
        }
        $(".secondary").text(stoShow);

      }
    });

    return this.each(function() {
      // I don't think we need this
    }); 
  }; 
})(jQuery);
