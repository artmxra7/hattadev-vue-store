(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-127faf75"],{5319:function(t,e,r){"use strict";var n=r("d784"),a=r("825a"),i=r("7b0b"),o=r("50c4"),c=r("a691"),u=r("1d80"),l=r("8aa5"),s=r("14c3"),f=Math.max,h=Math.min,d=Math.floor,v=/\$([$&'`]|\d\d?|<[^>]*>)/g,p=/\$([$&'`]|\d\d?)/g,g=function(t){return void 0===t?t:String(t)};n("replace",2,(function(t,e,r){return[function(r,n){var a=u(this),i=void 0==r?void 0:r[t];return void 0!==i?i.call(r,a,n):e.call(String(a),r,n)},function(t,i){var u=r(e,t,this,i);if(u.done)return u.value;var d=a(t),v=String(this),p="function"===typeof i;p||(i=String(i));var b=d.global;if(b){var w=d.unicode;d.lastIndex=0}var k=[];while(1){var y=s(d,v);if(null===y)break;if(k.push(y),!b)break;var m=String(y[0]);""===m&&(d.lastIndex=l(v,o(d.lastIndex),w))}for(var x="",S=0,$=0;$<k.length;$++){y=k[$];for(var _=String(y[0]),A=f(h(c(y.index),v.length),0),E=[],q=1;q<y.length;q++)E.push(g(y[q]));var C=y.groups;if(p){var I=[_].concat(E,A,v);void 0!==C&&I.push(C);var M=String(i.apply(void 0,I))}else M=n(_,v,A,E,C,i);A>=S&&(x+=v.slice(S,A)+M,S=A+_.length)}return x+v.slice(S)}];function n(t,r,n,a,o,c){var u=n+t.length,l=a.length,s=p;return void 0!==o&&(o=i(o),s=v),e.call(c,s,(function(e,i){var c;switch(i.charAt(0)){case"$":return"$";case"&":return t;case"`":return r.slice(0,n);case"'":return r.slice(u);case"<":c=o[i.slice(1,-1)];break;default:var s=+i;if(0===s)return e;if(s>l){var f=d(s/10);return 0===f?e:f<=l?void 0===a[f-1]?i.charAt(1):a[f-1]+i.charAt(1):e}c=a[s-1]}return void 0===c?"":c}))}}))},"99af":function(t,e,r){"use strict";var n=r("23e7"),a=r("d039"),i=r("e8b5"),o=r("861d"),c=r("7b0b"),u=r("50c4"),l=r("8418"),s=r("65f0"),f=r("1dde"),h=r("b622"),d=r("60ae"),v=h("isConcatSpreadable"),p=9007199254740991,g="Maximum allowed index exceeded",b=d>=51||!a((function(){var t=[];return t[v]=!1,t.concat()[0]!==t})),w=f("concat"),k=function(t){if(!o(t))return!1;var e=t[v];return void 0!==e?!!e:i(t)},y=!b||!w;n({target:"Array",proto:!0,forced:y},{concat:function(t){var e,r,n,a,i,o=c(this),f=s(o,0),h=0;for(e=-1,n=arguments.length;e<n;e++)if(i=-1===e?o:arguments[e],k(i)){if(a=u(i.length),h+a>p)throw TypeError(g);for(r=0;r<a;r++,h++)r in i&&l(f,h,i[r])}else{if(h>=p)throw TypeError(g);l(f,h++,i)}return f.length=h,f}})},ed10:function(t,e,r){"use strict";r.r(e);var n=function(){var t=this,e=t.$createElement;t._self._c;return t._m(0)},a=[function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[r("h1",[t._v("Bitte stehen Sie bereit")])])}],i=(r("99af"),r("5319"),r("bc3a")),o=r.n(i),c={data:function(){return{token:""}},created:function(){this.tokenName="_sw_payment_token",this.token=this.$route.query[this.tokenName];var t="";for(var e in this.$route.query)Object.prototype.hasOwnProperty.call(this.$route.query,e)&&(t+="".concat(e,"=").concat(this.$route.query[e],"&"));o.a.get("http://77.245.20.254/store-api/v3/axonlab/payment/finalize-transaction?".concat(t),{headers:{"sw-access-key":"SWSCAUPEWFJVU0FVC20WCNDLUG","sw-context-token":localStorage.getItem("contextToken")}}).then((function(t){window.location.replace(t.data.finishUrl)}))}},u=c,l=r("2877"),s=Object(l["a"])(u,n,a,!1,null,null,null);e["default"]=s.exports}}]);
//# sourceMappingURL=chunk-127faf75.989e61ff.js.map