//var Ajax=function(o){void 0===o&&(o={});var e=void 0===o.contextPath?location.origin:o.contextPath,n=void 0===o.count?5:o.count,t=void 0!==o.isLog&&o.isLog,r=void 0===o.timeout?3e4:o.timeout,l=void 0===o.loadComponent?null:o.loadComponent,a=0,s=[],i=!0;function u(){if(s.length>0&&a<n){var o=s[0];s.splice(0,1),c(o.url,o.method,o.headers,o.params,o.async,o.success,o.error),u()}}function c(o,c,d,h,y,g,p){if(i){if(void 0!==y&&null!=y||(y=!0),y&&a>=n)return t&&console.log("요청개수가 많습니다. 조절해주시기 바랍니다."),void(s[s.length]={url:o,method:c,headers:d,params:h,async:y,success:g,error:p});a++,null==c&&(c="get"),-1==o.indexOf("http")&&(o=e+o),t&&(console.log("Request Ajax : "+o),console.log("       method : "+c),null!=h?console.log("       params : "+JSON.stringify(h)):console.log("       params : null"),console.log("       async : "+y)),d||(d={}),d.isAjax=!0;try{var j=jQuery("META[name='_csrf']").attr("content"),m=jQuery("META[name='_csrf_header']").attr("content");j.isBlank()||m.isBlank()||(d[m]=j)}catch(o){console.log(o)}return null!=l&&a>0&&l.show(),jQuery.ajax({url:o,type:c,data:h,dataType:"json",timeout:r,async:y,headers:d,success:function(e){--a<0&&(a=0),0==a&&null!=l&&l.hide(),u(),e?"SUCCESS"==e.RESULT?g.apply(this,arguments):p&&p.apply(this,arguments):t&&console.log(o+" 결과가 없습니다. 확인바랍니다.")},error:function(o,e){--a<0&&(a=0),0==a&&null!=l&&l.hide(),u(),p&&p.apply(this,arguments)}})}alert("Ajax Error : jQuery 라이브러리가 존재하지 않습니다.")}return void 0===window.jQuery&&(alert("Ajax Error : jQuery 라이브러리를 등록해주시기 바랍니다."),i=!1),null==l||l.length||(l=jQuery(l)),{call:function(o,e,n,t,r,l,a){return c(o,e,n,t,r,l,a)}}};

var Ajax = function(o) {
    void 0 === o && (o = {});
    var e = void 0 === o.contextPath ? location.origin : o.contextPath
      , n = void 0 === o.count ? 5 : o.count
      , t = void 0 !== o.isLog && o.isLog
      , r = void 0 === o.timeout ? 3e4 : o.timeout
      , l = void 0 === o.loadComponent ? null : o.loadComponent
      , a = 0
      , s = []
      , i = !0;
    function u() {
        if (s.length > 0 && a < n) {
            var o = s[0];
            s.splice(0, 1),
            c(o.url, o.method, o.headers, o.params, o.async, o.success, o.error),
            u()
        }
    }
    function c(o, c, d, h, y, g, p) {
        if (i) {
            if (void 0 !== y && null != y || (y = !0),
            y && a >= n)
                return t && console.log("요청개수가 많습니다. 조절해주시기 바랍니다."),
                void (s[s.length] = {
                    url: o,
                    method: c,
                    headers: d,
                    params: h,
                    async: y,
                    success: g,
                    error: p
                });
            a++,
            null == c && (c = "get"),
            -1 == o.indexOf("http") && (o = e + o),
            t && (console.log("Request Ajax : " + o),
            console.log("       method : " + c),
            null != h ? console.log("       params : " + JSON.stringify(h)) : console.log("       params : null"),
            console.log("       async : " + y)),
            d || (d = {}),
            d.isAjax = !0;
            try {
                var j = jQuery("META[name='_csrf']").attr("content")
                  , m = jQuery("META[name='_csrf_header']").attr("content");
                j.isBlank() || m.isBlank() || (d[m] = j)
            } catch (o) {
                console.log(o)
            }
            return null != l && a > 0 && l.show(),
            jQuery.ajax({
                url: o,
                type: c,
                data: h,
                dataType: "json",
                timeout: r,
                async: y,
                headers: d,
                success: function(e) {
                    --a < 0 && (a = 0),
                    0 == a && null != l && l.hide(),
                    u(),
                    e ? "SUCCESS" == e.RESULT ? g.apply(this, arguments) : p && p.apply(this, arguments) : t && console.log(o + " 결과가 없습니다. 확인바랍니다.")
                },
                error: function(o, e) {
                    --a < 0 && (a = 0),
                    0 == a && null != l && l.hide(),
                    u(),
                    p && p.apply(this, arguments)
                }
            })
        }
        alert("Ajax Error : jQuery 라이브러리가 존재하지 않습니다.")
    }
    return void 0 === window.jQuery && (alert("Ajax Error : jQuery 라이브러리를 등록해주시기 바랍니다."),
    i = !1),
    null == l || l.length || (l = jQuery(l)),
    {
        call: function(o, e, n, t, r, l, a) {
            return c(o, e, n, t, r, l, a)
        }
    }
};