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
        btnText: "",
        clientID: "",
        otherText: "#followers#",
        toggleSpeed: 300,
        toggle: "",
        userID: "25025320"
      }
      var options = $.extend(defaults, options);

      // add a class and some html
      t.addClass("ig-btn").html("<span class='btn'></span><span class='tooltip'></span>");

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
          $(".tooltip").hide();

          // detect mobile
          var link = "";
          var isMobile = function() {
            return {
              detect: function() {
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
            link = "instagram://user?username=" + un;
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

          // other text
          var toShow = "";
          if(stxt == "#followers#" || stxt === null  || stxt == "") {
            toShow = addCommas(followers);
          }
          if(stxt == "#following#") {
            toShow = addCommas(following);
          }
          if(stxt !== "#followers#" && stxt !== "#following#"  && stxt !== "") {
            toShow = stxt;
          }

          // some events
          if(options.toggle == "" || options.toggle === null) {
            $(".tooltip").fadeIn(options.toggleSpeed).text(toShow);
          }

          var tog = false;
          if(options.toggle == "click") {
            t.click(function() {
              if(!tog) {
                tog = true;
                t.find(".btn").text(ptxt);
                $(".tooltip").fadeIn(options.toggleSpeed).text(toShow);
              } else {
                tog = false;
                t.find(".btn").text(ptxt);
                $(".tooltip").fadeOut(options.toggleSpeed);
              }
            });
          }

          if(options.toggle == "dblclick") {
            t.dblclick(function() {
              if(!tog) {
                tog = true;
                t.find(".btn").text(ptxt);
                $(".tooltip").fadeIn(options.toggleSpeed).text(toShow);
              } else {
                tog = false;
                t.find(".btn").text(ptxt);
                $(".tooltip").fadeOut(options.toggleSpeed);
              }
            });
          }

          if(options.toggle == "hover") {
            t.mouseenter(function() {
              t.find(".btn").text(ptxt);
              $(".tooltip").fadeIn(options.toggleSpeed).text(toShow);
            });
            t.mouseleave(function() {
              t.find(".btn").text(ptxt);
              $(".tooltip").fadeOut(options.toggleSpeed);
            });
          }

        }
      });

      return this.each(function() {
        // I don't think we need this
      }); 
    }; 
  })(jQuery);
