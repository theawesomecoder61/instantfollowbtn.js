  (function($){
    $.fn.instantfollowbtn = function(options) {

      // variables!
      var t = $(this);
      var atoken = options.accessToken;
      var cid = options.clientID;
      var uid = options.userID;
      var btxt = options.btnText;

      // set some defaults
      var defaults = { 
        accessToken: "",
        btnText: "",
        clientID: "",
        toggleSpeed: 300,
        toggle: "hover",
        userID: "25025320"
      }
      var options = $.extend(defaults, options);

      // add a class and some html
      t.addClass("ig-btn").html("<span class='btn'></span><div class='count'><div class='count-num front'>Hello!</div></div>");

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

          t.find(".btn").text(btxt);
          $(".count-num").hide();

          // some events
          var tog = false;
          if(options.toggle == "click") {
            t.click(function() {
              if(!tog) {
                tog = true;
                  t.find(".btn").text(btxt);
                  $(".count-num").fadeIn(options.toggleSpeed).text(followers);
              } else {
                tog = false;
                t.find(".btn").text(btxt);
                $(".count-num").fadeOut(options.toggleSpeed);
              }
            });
          }
          
          if(options.toggle == "dblclick") {
            t.dblclick(function() {
              if(!tog) {
                tog = true;
                  t.find(".btn").text(btxt);
                  $(".count-num").fadeIn(options.toggleSpeed).text(followers);
              } else {
                tog = false;
                t.find(".btn").text(btxt);
                $(".count-num").fadeOut(options.toggleSpeed);
              }
            });
          }
          
          if(options.toggle == "hover") {
            t.mouseenter(function() {
              t.find(".btn").text(btxt);
              $(".count-num").fadeIn(options.toggleSpeed).text(followers);
            });
            t.mouseleave(function() {
              t.find(".btn").text(btxt);
              $(".count-num").fadeOut(options.toggleSpeed);
            });
          }

        }
      });

      return this.each(function() {
        // I don't think I'll need this
      }); 
    }; 
  })(jQuery);
