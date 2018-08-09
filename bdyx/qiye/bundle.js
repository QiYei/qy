(function($) {
  $.localize = function(pkg, options) {
    var $wrappedSet          = this;
    var intermediateLangData = {};
    options = options || {};
    var saveSettings = {async: $.ajaxSettings.async, timeout: $.ajaxSettings.timeout};
    $.ajaxSetup({async: false, timeout: (options && options.timeout ? options.timeout : 500)});

    function loadLanguage(pkg, lang, level) {
      level = level || 1;
      var file;
      if (options && options.loadBase && level == 1) {
        intermediateLangData = {};
        file = pkg + '.json';
        jsonCall(file, pkg, lang, level);
      }
      else if (level == 1) {
        intermediateLangData = {};
        loadLanguage(pkg, lang, 2);
      }
      else if (level == 2 && lang.length >= 2) {
        file = pkg + '-' + lang.substring(0, 2) + '.json';
        jsonCall(file, pkg, lang, level);
      }
      else if (level == 3 && lang.length >= 5) {
        file = pkg + '-' + lang.substring(0, 5) + '.json';
        jsonCall(file, pkg, lang, level);
      }
    }

    function jsonCall(file, pkg, lang, level) {
	  if (options.pathPrefix) file = options.pathPrefix + "/" + file;
      $.getJSON(file, null, function(d){
        $.extend(intermediateLangData, d);
        notifyDelegateLanguageLoaded(intermediateLangData);
        loadLanguage(pkg, lang, level + 1);
      });
    }

    function defaultCallback(data) {
      $.localize.data[pkg] = data;
      var keys, value;
      $wrappedSet.each(function(){
        elem = $(this);
        key = elem.attr("rel").match(/localize\[(.*?)\]/)[1];
        value = valueForKey(key, data);
        if (elem.attr('tagName') == "INPUT") {
          elem.val(value);
        }
        else {
          elem.html(value);
        }
      });
    }

    function notifyDelegateLanguageLoaded(data) {
      if (options.callback) {
        // pass the defaultCallback so it can be used in addition to some custom behavior
        options.callback(data, defaultCallback);
      }
      else {
        defaultCallback(data);
      }
    }

    function valueForKey(key, data){
      var keys  = key.split(/\./);
      var value = data;
      while (keys.length > 0) {
        if(value){
          value = value[keys.shift()];
        }
        else{
          return null;
        }
      }
      return value;
    }

    function regexify(string_or_regex_or_array){
      if (typeof(string_or_regex_or_array) == "string") {
        return "^" + string_or_regex_or_array + "$";
      }
      else if (string_or_regex_or_array.length) {
        var matchers = [];
        var x = string_or_regex_or_array.length;
        while (x--) {
          matchers.push(regexify(string_or_regex_or_array[x]));
        }
        return matchers.join("|");
      }
      else {
        return string_or_regex_or_array;
      }
    }

    var lang = normaliseLang(options && options.language ? options.language : $.defaultLanguage);

    if (options.skipLanguage && lang.match( regexify(options.skipLanguage) )) return;
    loadLanguage(pkg, lang, 1);

    $.ajaxSetup(saveSettings);
  };

  $.fn.localize = $.localize;

  // Storage for retrieved data
  $.localize.data = {};

  // Retrieve the default language set for the browser.
  $.defaultLanguage = normaliseLang(navigator.language
    ? navigator.language       // Mozilla
    : navigator.userLanguage   // IE
  );

  // Ensure language code is in the format aa-AA.
  function normaliseLang(lang) {
   lang = lang.replace(/_/, '-').toLowerCase();
   if (lang.length > 3) {
     lang = lang.substring(0, 3) + lang.substring(3).toUpperCase();
   }
   return lang;
  }
})(jQuery);
// proMarket plugin - easy insert promarket tracking snippet with site id and keyword
// By James Garvin (coderifous)
// Copyright 2009 - License: MIT

(function($) {
  $.proMarket = function(siteId, keyWords) {
    $("body").proMarket(siteId, keyWords);
  };

  $.fn.proMarket = function(siteId, keyWords) {
    this.append(
      '<IFRAME WIDTH="1" HEIGHT="1" MARGINWIDTH="0" MARGINHEIGHT="0" HSPACE="0" ' +
      'VSPACE="0" FRAMEBORDER="0" SCROLLING="no" ' +
      'SRC="http://pbid.pro-market.net/engine?site=' + siteId.toString() +
      ';size=1x1;kw=' + keyWords + '"></IFRAME>');
    return this;
  };
})(jQuery);
// QueryString Engine v1.0.1 (modified)
// By James Campbell (modified by coderifous)
(function($) {
  $.querystringvalues = $.queryStringValues = $.QueryStringValues = $.QueryStringvalues = $.queryStringValues = $.queryStringvalues = $.querystringValues = $.getqueryString = $.queryString = $.querystring = $.QueryString = $.Querystring = $.getQueryString = $.getquerystring = $.getQuerystring  = function(options)
  {
    defaults = { defaultvalue: null };
    options = $.extend(defaults , options);
    qs = location.search.substring(1, location.search.length);
    if (qs.length == 0) return options.defaultvalue;
      qs = qs.replace(/\+/g, ' ');
      var args = qs.split('&');
      for (var i = 0; i < args.length; i ++ )
      {
        var value;
        var pair = args[i].split('=');
        var name = gentlyDecode(pair[0]);

      if (pair.length == 2)
      {
        value = gentlyDecode(pair[1]);
      }
      else
      {
        value = name;
      }
      if (name == options.id || i == options.id-1)
      {
          return value;
      }
      }
    return options.defaultvalue;
  };
})(jQuery);
$.sendToClipboard = function(text) {
  var copier = $("#flash_copier");
  if (copier.size() == 0) {
    copier = $('<div id="flash_copier"></div>').appendTo("body");
  }
  copier.html('<embed src="_clipboard.swf" FlashVars="clipboard='+encodeURIComponent(text)+'" width="0" height="0" type="application/x-shockwave-flash"></embed>');
};

$.fn.centerOver = function(element, topOffset, leftOffset) {
  topOffset = topOffset || 0;
  leftOffset = leftOffset || 0;
  var self = this;
  self.css({
    top: (element.position().top + element.outerHeight()/2 - self.height()/2 + topOffset).px(),
    left: (element.position().left + element.outerWidth()/2 - self.width()/2 + leftOffset).px()
  });
  return self;
};

$.fn.sponsor = function(programFile, callback) {
  var self = this;
  $.getJSON(programFile, function(program) {
    var sponsor = program.slots[rand(program.slots.length)];
    var id = sponsor.id;
    var anchor = self.find("a");
    anchor.attr("href", sponsor.url);
    anchor.find("img").attr("src", sponsor.image);
    anchor.find("p").html(sponsor.message);
    if (pageTracker) {
      pageTracker._trackPageview("/sponsor/" + id);
      anchor.unbind("click");
      anchor.click(function() { pageTracker._trackPageview("/outgoing/sponsor/" + id); });
    }
    if (callback) callback.call(self);
  });
  return self;
};

function rand(max) {
  return Math.floor(Math.random() * max);
}

Number.prototype.px = function(){ return this.toString() + "px"; };

function gentlyEncode(string) {
  return ( encodeURIComponent
           ? encodeURIComponent(string).replace(/%20(\D)?/g, "+$1").replace(/'/g, escape("'"))
           : escape(string).replace(/\+/g, "%2B").replace(/%20/g, "+") );
}

function gentlyDecode(string) {
  return decodeURIComponent ? decodeURIComponent(string) : unescape(string);
}
// default lang necessities
$.localize.data.lmgtfy = {
  setup: {
    type_question: "写下你的问题,点击按钮：百度一下",
    share_link:    "分享下面这个链接",
    or:            "打开"
  },

  play: {
    step_1: "第一步 1: 输入你的问题",
    step_2: "第二步 2: 点击百度一下按钮",
    pwnage: "百度一下真的很难吗？",
    nice:   "这很简单。"
  },

  link: {
    creating:  "创建中...",
    fetching:  "Fetching...",
    copied:    "URL copied to clipboard",
    shortened: "TinyURL copied to clipboard"
  }
};

$.fn.countDown = function() {
  var self       = this;
  var targetDate = dbDate(this.attr("data-ends-at"));

  recurseDurationCountdown();

  function recurseDurationCountdown() {
    var seconds = parseInt((targetDate - new Date()) / 1000);
    self.text(formatDuration(seconds));
    if (seconds > 0) {
      setTimeout(recurseDurationCountdown, 1000);
    }
  }

  function formatDuration(seconds) {
    var hh, mm, ss, days;
    if (seconds <= 0) {
      return "--:--:--";
    }
    else if (seconds > 60 * 60 * 24) {
      days = parseInt(seconds / 60 / 60 / 24);
      var suffix = days > 1 ? "s" : "";
      return days.toString() + " day" + suffix;
    }
    else {
      ss = seconds % 60;
      mm = parseInt(seconds / 60 % 60);
      hh = parseInt(seconds / 60 / 60);
      return hh + ":" + twoDigits(mm) + ":" + twoDigits(ss);
    }
  }

  function twoDigits(n) {
    var prefix = n < 10 ? "0" : "";
    return prefix + n;
  }

  function dbDate(str) {
    var s = $.trim(str);
    s = s.replace(/-/,"/").replace(/-/,"/");
    return new Date(s);
  }
}

$(function(){
  initializeLocalization();
  initializeAboutLink();
  initializeControls();

  var searchString = $.getQueryString({ id: "q" });
  var inputField   = $("input[type=text]:first");
  var fakeMouse    = $("#fake_mouse");
  var instructions = $("#instructions > div");
  var button       = ($.getQueryString({ id: "l" }) == "1") ? $("#lucky") : $("#search");
  var inputLink    = $("#link input.link");
  var linkButtons  = $("#link_buttons");
  var linkMessage  = $("#link_message");

  // loadDeal();
  loadBanner();
  $("body").addClass("skip-deal");

  if (searchString) {
    $.proMarket("120083", gentlyEncode(searchString)); 
    googleItForThem();
  }
  else {
    getTheSearchTerms();
  }


  function loadDeal() {
   /* var callback = function(data) {
      var node = $(".deal");
      var tracking_link = "http://aff.lmgtfy.com/offers/" + data._id["$oid"] + "/click";
      node.attr("href", tracking_link);
      node.find(".pitch").css("background-image", "url(" + data.image_url + ")");
      node.find(".region_name").text(data.region_name);
      node.find(".title").text(data.title);
      node.find(".price").text(data.price.replace(/\.00$/, ""));
      node.find(".savings .value").text(data.savings);
      node.find(".action a").attr("href", data.link);
      node.find(".remaining .value")
        .attr("data-ends-at", data.offer_ends_at)
        .countDown(data.offer_ends_at);
      node.fadeIn();
    };
    $.getJSON("http://aff.lmgtfy.com/offers/local.json?callback=?", callback);*/
  }

  function loadBanner() {
   /* var node = $(".banner");

    var bit = parseInt(Math.random() * 2);
    if (bit == 0) {
      node.html('<iframe frameborder="0" height="90" marginheight="0" marginwidth="0" scrolling="no" src="http://facebook.livingsocial.com/micro/ad_manager/t/frame?banner=true&campaign=DEALS&tracking_link=http://tracking.livingsocial.com/aff_c?offer_id=3&aff_id=3960&offer_file_id=24" width="728"></iframe><img src="http://tracking.livingsocial.com/aff_i?offer_id=3&aff_id=3960&offer_file_id=24" width="1" height="1">');
    } else {
      node.html('<iframe frameborder="0" height="90" marginheight="0" marginwidth="0" scrolling="no" src="http://facebook.livingsocial.com/micro/ad_manager/t/frame?banner=true&campaign=Dailydeals&tracking_link=http://tracking.livingsocial.com/aff_c?offer_id=3&aff_id=3960&offer_file_id=62" width="728"></iframe><img src="http://tracking.livingsocial.com/aff_i?offer_id=3&aff_id=3960&offer_file_id=62" width="1" height="1">');
    }

    node.fadeIn();*/
  }

  function initializeAboutLink() {
    $("a[name=about]").click(function() {
      $("#about").toggle();
      $('html,body').animate({ scrollTop: $("#about").offset().top }, 1000);
      return false;
    });
    linkifyAbout();
  }

  function initializeControls() {
    $('input.copyable').click(function() { $(this).select(); });
    $("#link").hover(function(){ linkButtons.fadeIn("fast"); }, function(){ linkButtons.fadeOut("fast"); });
    $("#go").click(function(){ window.location.href = inputLink.val(); return false; });
    $("#reset").click(function(){ showTheUrl($(this).attr("url")); return false; });
    $("#tiny").click(function(){
      linkStatus("link.fetching", 0, true);
      $.getJSON("http://json-tinyurl.appspot.com/?callback=?&url=" + gentlyEncode(inputLink.val()), function(data) {
        inputLink.val(data.tinyurl).focus().select();
        linkStatus("link.fetching", 1500);
      });
      $(this).hide();
      $("#reset").show();
      return false;
    });
    $("#language select").change(function(e){
      var l = window.location;
      var hostnameMinusSubdomain = l.hostname.match(/[^.]+\.(?:[^.]+)$/)[0];
      var url = l.protocol + "//" + $(this).val() + "." + hostnameMinusSubdomain + l.pathname;
      window.location.href = url;
    });
  }

  function initializeLocalization() {
    var localize_opts = {
      pathPrefix: 'lang',
      skipLanguage: /^en/,
      callback: function(data, defaultCallback) {
        defaultCallback(data);
        linkifyAbout();
      }
    };
    var lang = $.getQueryString({ id: "lang" }) || sniffUrlForLanguage();
    if (lang) localize_opts.language = lang;
    $("[rel*=localize]").localize('lmgtfy', localize_opts);
  }

  function sniffUrlForLanguage() {
    return sniffSubdomainForLanguage() || sniffDomainForLanguage();
  }

  function sniffSubdomainForLanguage() {
    var first = window.location.hostname.split(".")[0];
    var match = first.match(/^[a-z]{2}(?:-[a-z]{2})?$/i);
    return match ? match[0] : null;
  }

  function sniffDomainForLanguage() {
    var domainLanguageOverrides = {
      "haddkeressemmegneked": "hu",
      "klingon": "xx-KL"
    };

    for (var domain in domainLanguageOverrides) {
      if (window.location.hostname.match(domain)) {
        return domainLanguageOverrides[domain];
      }
    }
    return null;
  }

  function langString(langkey) {
    var keys = langkey.split(/\./);
    return keys.length == 1 ? $.localize.data.lmgtfy[keys[0]] : $.localize.data.lmgtfy[keys[0]][keys[1]];
  }

  function linkifyAbout() {
    $("#about p").each(function() {
      $(this).html($(this).text().replace(/(@([a-zA-Z0-9_]+))/g, '<a href="http://twitter.com/$2">$1</a>'));
    });
  }

  function instruct(langkey) {
    instructions.html(langString(langkey));
  }

  function linkStatus(langkey, millis, stuck) {
    millis = millis || 2500;
    linkMessage.html(langString(langkey)).show().centerOver(inputLink);
    if (!stuck) {
      setTimeout(function(){ linkMessage.fadeOut(millis/4*3); }, millis/4);
    }
  }

  function getTheSearchTerms() {
    // $("#alert").show();
    $("form").submit(function(){ $("#search").click(); return false; });
    instruct("setup.type_question");
    inputField.focus().select();

    $("input[type=button]").click(function(e){
      instruct("setup.share_link");

      var l   = window.location;
      var url = l.protocol + "//" + l.hostname + l.pathname + "?";
      var searchString = gentlyEncode(inputField.val());

      $.proMarket("120083", searchString);

      strings = [ "q=" + searchString ];
      if (this.id == "lucky") strings.push("l=1");

      url += strings.join("&");

      showTheUrl(url);
    });
  }

  function showTheUrl(url) {
    $("#copy").hide();

    $("#link").centerOver($("#link_placeholder")).show();
    $("#reset").attr("url", url).hide();
    $("#tiny").hide();

    linkStatus("link.creating", 1500);
    inputLink.val(url).focus().select();
    linkButtons.centerOver(inputLink, 28);
  }

  function googleItForThem() {
    if ($.getQueryString({ id: "fwd" })) redirect();

    $("body").css("cursor", "wait");
    fakeMouse.show();
    instruct("play.step_1");

    fakeMouse.animate({
      top:  (inputField.position().top  + 15).px(),
      left: (inputField.position().left + 10).px()
    }, 2500, 'swing', function(){
      inputField.focus();
      fakeMouse.animate({ top: "+=18px", left: "+=10px" }, 'fast', function() { fixSafariRenderGlitch(); });
      type(searchString, 0);
    });

    function type(string, index){
      var val = string.substr(0, index + 1);
      inputField.attr('value', val);
      if (index < string.length) {
        setTimeout(function(){ type(string, index + 1); }, Math.random() * 240);
      }
      else {
        doneTyping();
      }
    }

    function doneTyping(){
      instruct("play.step_2");
      fakeMouse.animate({
        top:  (button.position().top  + 10).px(),
        left: (button.position().left + 30).px()
      }, 3000, 'swing', function(){
        var key = $.getQueryString({ id: "n" }) == 1 ? "play.nice" : "play.pwnage";
        instruct(key);
        button.focus();
        setTimeout(redirect, 3000);
      });
    }

    function easterEgg(){
      if (searchString == "funny sarah jessica parker movie") {
        return "/movie-not-found.html";
      } else {
        return false;
      }
    }

    function redirect(){
      if ($.getQueryString({ id: "debug" })) return;

      var google = "http://www.baidu.com/s?wd=";//"http://vanillaresults.com/?q=";
      if (button.attr("id") == $("#lucky").attr("id")) {
        google = "http://www.google.com/search?hl=en&btnI=I%27m+Feeling+Lucky&pws=0&q=";
      }

      var egg = easterEgg();
      if (egg) {
        page = egg;
      } else {
        page = google + gentlyEncode(searchString);
      }

      window.location.href = page;
    }

    function fixSafariRenderGlitch() {
      if ($.browser.safari) inputField.blur().focus();
    }
  }
});
