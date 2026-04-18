(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();/**
* @vue/shared v3.5.18
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**//*! #__NO_SIDE_EFFECTS__ */function qu(n){const e=Object.create(null);for(const t of n.split(","))e[t]=1;return t=>t in e}const vt={},cr=[],li=()=>{},g_=()=>!1,rl=n=>n.charCodeAt(0)===111&&n.charCodeAt(1)===110&&(n.charCodeAt(2)>122||n.charCodeAt(2)<97),ju=n=>n.startsWith("onUpdate:"),Ht=Object.assign,Yu=(n,e)=>{const t=n.indexOf(e);t>-1&&n.splice(t,1)},__=Object.prototype.hasOwnProperty,ft=(n,e)=>__.call(n,e),We=Array.isArray,ur=n=>Ro(n)==="[object Map]",ol=n=>Ro(n)==="[object Set]",qf=n=>Ro(n)==="[object Date]",Ye=n=>typeof n=="function",Dt=n=>typeof n=="string",Yn=n=>typeof n=="symbol",xt=n=>n!==null&&typeof n=="object",vp=n=>(xt(n)||Ye(n))&&Ye(n.then)&&Ye(n.catch),xp=Object.prototype.toString,Ro=n=>xp.call(n),v_=n=>Ro(n).slice(8,-1),yp=n=>Ro(n)==="[object Object]",Ku=n=>Dt(n)&&n!=="NaN"&&n[0]!=="-"&&""+parseInt(n,10)===n,jr=qu(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),al=n=>{const e=Object.create(null);return t=>e[t]||(e[t]=n(t))},x_=/-(\w)/g,Un=al(n=>n.replace(x_,(e,t)=>t?t.toUpperCase():"")),y_=/\B([A-Z])/g,ls=al(n=>n.replace(y_,"-$1").toLowerCase()),ll=al(n=>n.charAt(0).toUpperCase()+n.slice(1)),Dl=al(n=>n?`on${ll(n)}`:""),Ji=(n,e)=>!Object.is(n,e),ba=(n,...e)=>{for(let t=0;t<n.length;t++)n[t](...e)},Pc=(n,e,t,i=!1)=>{Object.defineProperty(n,e,{configurable:!0,enumerable:!1,writable:i,value:t})},za=n=>{const e=parseFloat(n);return isNaN(e)?n:e},S_=n=>{const e=Dt(n)?Number(n):NaN;return isNaN(e)?n:e};let jf;const cl=()=>jf||(jf=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{});function Dn(n){if(We(n)){const e={};for(let t=0;t<n.length;t++){const i=n[t],s=Dt(i)?T_(i):Dn(i);if(s)for(const r in s)e[r]=s[r]}return e}else if(Dt(n)||xt(n))return n}const b_=/;(?![^(]*\))/g,M_=/:([^]+)/,E_=/\/\*[^]*?\*\//g;function T_(n){const e={};return n.replace(E_,"").split(b_).forEach(t=>{if(t){const i=t.split(M_);i.length>1&&(e[i[0].trim()]=i[1].trim())}}),e}function Vt(n){let e="";if(Dt(n))e=n;else if(We(n))for(let t=0;t<n.length;t++){const i=Vt(n[t]);i&&(e+=i+" ")}else if(xt(n))for(const t in n)n[t]&&(e+=t+" ");return e.trim()}const w_="itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",A_=qu(w_);function Sp(n){return!!n||n===""}function R_(n,e){if(n.length!==e.length)return!1;let t=!0;for(let i=0;t&&i<n.length;i++)t=ul(n[i],e[i]);return t}function ul(n,e){if(n===e)return!0;let t=qf(n),i=qf(e);if(t||i)return t&&i?n.getTime()===e.getTime():!1;if(t=Yn(n),i=Yn(e),t||i)return n===e;if(t=We(n),i=We(e),t||i)return t&&i?R_(n,e):!1;if(t=xt(n),i=xt(e),t||i){if(!t||!i)return!1;const s=Object.keys(n).length,r=Object.keys(e).length;if(s!==r)return!1;for(const o in n){const a=n.hasOwnProperty(o),l=e.hasOwnProperty(o);if(a&&!l||!a&&l||!ul(n[o],e[o]))return!1}}return String(n)===String(e)}function C_(n,e){return n.findIndex(t=>ul(t,e))}const bp=n=>!!(n&&n.__v_isRef===!0),He=n=>Dt(n)?n:n==null?"":We(n)||xt(n)&&(n.toString===xp||!Ye(n.toString))?bp(n)?He(n.value):JSON.stringify(n,Mp,2):String(n),Mp=(n,e)=>bp(e)?Mp(n,e.value):ur(e)?{[`Map(${e.size})`]:[...e.entries()].reduce((t,[i,s],r)=>(t[Ll(i,r)+" =>"]=s,t),{})}:ol(e)?{[`Set(${e.size})`]:[...e.values()].map(t=>Ll(t))}:Yn(e)?Ll(e):xt(e)&&!We(e)&&!yp(e)?String(e):e,Ll=(n,e="")=>{var t;return Yn(n)?`Symbol(${(t=n.description)!=null?t:e})`:n};/**
* @vue/reactivity v3.5.18
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let qt;class Ep{constructor(e=!1){this.detached=e,this._active=!0,this._on=0,this.effects=[],this.cleanups=[],this._isPaused=!1,this.parent=qt,!e&&qt&&(this.index=(qt.scopes||(qt.scopes=[])).push(this)-1)}get active(){return this._active}pause(){if(this._active){this._isPaused=!0;let e,t;if(this.scopes)for(e=0,t=this.scopes.length;e<t;e++)this.scopes[e].pause();for(e=0,t=this.effects.length;e<t;e++)this.effects[e].pause()}}resume(){if(this._active&&this._isPaused){this._isPaused=!1;let e,t;if(this.scopes)for(e=0,t=this.scopes.length;e<t;e++)this.scopes[e].resume();for(e=0,t=this.effects.length;e<t;e++)this.effects[e].resume()}}run(e){if(this._active){const t=qt;try{return qt=this,e()}finally{qt=t}}}on(){++this._on===1&&(this.prevScope=qt,qt=this)}off(){this._on>0&&--this._on===0&&(qt=this.prevScope,this.prevScope=void 0)}stop(e){if(this._active){this._active=!1;let t,i;for(t=0,i=this.effects.length;t<i;t++)this.effects[t].stop();for(this.effects.length=0,t=0,i=this.cleanups.length;t<i;t++)this.cleanups[t]();if(this.cleanups.length=0,this.scopes){for(t=0,i=this.scopes.length;t<i;t++)this.scopes[t].stop(!0);this.scopes.length=0}if(!this.detached&&this.parent&&!e){const s=this.parent.scopes.pop();s&&s!==this&&(this.parent.scopes[this.index]=s,s.index=this.index)}this.parent=void 0}}}function Tp(n){return new Ep(n)}function wp(){return qt}function P_(n,e=!1){qt&&qt.cleanups.push(n)}let bt;const Il=new WeakSet;class Ap{constructor(e){this.fn=e,this.deps=void 0,this.depsTail=void 0,this.flags=5,this.next=void 0,this.cleanup=void 0,this.scheduler=void 0,qt&&qt.active&&qt.effects.push(this)}pause(){this.flags|=64}resume(){this.flags&64&&(this.flags&=-65,Il.has(this)&&(Il.delete(this),this.trigger()))}notify(){this.flags&2&&!(this.flags&32)||this.flags&8||Cp(this)}run(){if(!(this.flags&1))return this.fn();this.flags|=2,Yf(this),Pp(this);const e=bt,t=$n;bt=this,$n=!0;try{return this.fn()}finally{Dp(this),bt=e,$n=t,this.flags&=-3}}stop(){if(this.flags&1){for(let e=this.deps;e;e=e.nextDep)Qu(e);this.deps=this.depsTail=void 0,Yf(this),this.onStop&&this.onStop(),this.flags&=-2}}trigger(){this.flags&64?Il.add(this):this.scheduler?this.scheduler():this.runIfDirty()}runIfDirty(){Dc(this)&&this.run()}get dirty(){return Dc(this)}}let Rp=0,Yr,Kr;function Cp(n,e=!1){if(n.flags|=8,e){n.next=Kr,Kr=n;return}n.next=Yr,Yr=n}function Zu(){Rp++}function Ju(){if(--Rp>0)return;if(Kr){let e=Kr;for(Kr=void 0;e;){const t=e.next;e.next=void 0,e.flags&=-9,e=t}}let n;for(;Yr;){let e=Yr;for(Yr=void 0;e;){const t=e.next;if(e.next=void 0,e.flags&=-9,e.flags&1)try{e.trigger()}catch(i){n||(n=i)}e=t}}if(n)throw n}function Pp(n){for(let e=n.deps;e;e=e.nextDep)e.version=-1,e.prevActiveLink=e.dep.activeLink,e.dep.activeLink=e}function Dp(n){let e,t=n.depsTail,i=t;for(;i;){const s=i.prevDep;i.version===-1?(i===t&&(t=s),Qu(i),D_(i)):e=i,i.dep.activeLink=i.prevActiveLink,i.prevActiveLink=void 0,i=s}n.deps=e,n.depsTail=t}function Dc(n){for(let e=n.deps;e;e=e.nextDep)if(e.dep.version!==e.version||e.dep.computed&&(Lp(e.dep.computed)||e.dep.version!==e.version))return!0;return!!n._dirty}function Lp(n){if(n.flags&4&&!(n.flags&16)||(n.flags&=-17,n.globalVersion===lo)||(n.globalVersion=lo,!n.isSSR&&n.flags&128&&(!n.deps&&!n._dirty||!Dc(n))))return;n.flags|=2;const e=n.dep,t=bt,i=$n;bt=n,$n=!0;try{Pp(n);const s=n.fn(n._value);(e.version===0||Ji(s,n._value))&&(n.flags|=128,n._value=s,e.version++)}catch(s){throw e.version++,s}finally{bt=t,$n=i,Dp(n),n.flags&=-3}}function Qu(n,e=!1){const{dep:t,prevSub:i,nextSub:s}=n;if(i&&(i.nextSub=s,n.prevSub=void 0),s&&(s.prevSub=i,n.nextSub=void 0),t.subs===n&&(t.subs=i,!i&&t.computed)){t.computed.flags&=-5;for(let r=t.computed.deps;r;r=r.nextDep)Qu(r,!0)}!e&&!--t.sc&&t.map&&t.map.delete(t.key)}function D_(n){const{prevDep:e,nextDep:t}=n;e&&(e.nextDep=t,n.prevDep=void 0),t&&(t.prevDep=e,n.nextDep=void 0)}let $n=!0;const Ip=[];function Ci(){Ip.push($n),$n=!1}function Pi(){const n=Ip.pop();$n=n===void 0?!0:n}function Yf(n){const{cleanup:e}=n;if(n.cleanup=void 0,e){const t=bt;bt=void 0;try{e()}finally{bt=t}}}let lo=0;class L_{constructor(e,t){this.sub=e,this.dep=t,this.version=t.version,this.nextDep=this.prevDep=this.nextSub=this.prevSub=this.prevActiveLink=void 0}}class ef{constructor(e){this.computed=e,this.version=0,this.activeLink=void 0,this.subs=void 0,this.map=void 0,this.key=void 0,this.sc=0,this.__v_skip=!0}track(e){if(!bt||!$n||bt===this.computed)return;let t=this.activeLink;if(t===void 0||t.sub!==bt)t=this.activeLink=new L_(bt,this),bt.deps?(t.prevDep=bt.depsTail,bt.depsTail.nextDep=t,bt.depsTail=t):bt.deps=bt.depsTail=t,Up(t);else if(t.version===-1&&(t.version=this.version,t.nextDep)){const i=t.nextDep;i.prevDep=t.prevDep,t.prevDep&&(t.prevDep.nextDep=i),t.prevDep=bt.depsTail,t.nextDep=void 0,bt.depsTail.nextDep=t,bt.depsTail=t,bt.deps===t&&(bt.deps=i)}return t}trigger(e){this.version++,lo++,this.notify(e)}notify(e){Zu();try{for(let t=this.subs;t;t=t.prevSub)t.sub.notify()&&t.sub.dep.notify()}finally{Ju()}}}function Up(n){if(n.dep.sc++,n.sub.flags&4){const e=n.dep.computed;if(e&&!n.dep.subs){e.flags|=20;for(let i=e.deps;i;i=i.nextDep)Up(i)}const t=n.dep.subs;t!==n&&(n.prevSub=t,t&&(t.nextSub=n)),n.dep.subs=n}}const Ha=new WeakMap,Cs=Symbol(""),Lc=Symbol(""),co=Symbol("");function jt(n,e,t){if($n&&bt){let i=Ha.get(n);i||Ha.set(n,i=new Map);let s=i.get(t);s||(i.set(t,s=new ef),s.map=i,s.key=t),s.track()}}function Ti(n,e,t,i,s,r){const o=Ha.get(n);if(!o){lo++;return}const a=l=>{l&&l.trigger()};if(Zu(),e==="clear")o.forEach(a);else{const l=We(n),c=l&&Ku(t);if(l&&t==="length"){const u=Number(i);o.forEach((f,d)=>{(d==="length"||d===co||!Yn(d)&&d>=u)&&a(f)})}else switch((t!==void 0||o.has(void 0))&&a(o.get(t)),c&&a(o.get(co)),e){case"add":l?c&&a(o.get("length")):(a(o.get(Cs)),ur(n)&&a(o.get(Lc)));break;case"delete":l||(a(o.get(Cs)),ur(n)&&a(o.get(Lc)));break;case"set":ur(n)&&a(o.get(Cs));break}}Ju()}function I_(n,e){const t=Ha.get(n);return t&&t.get(e)}function Hs(n){const e=rt(n);return e===n?e:(jt(e,"iterate",co),Ln(n)?e:e.map(Gt))}function fl(n){return jt(n=rt(n),"iterate",co),n}const U_={__proto__:null,[Symbol.iterator](){return Ul(this,Symbol.iterator,Gt)},concat(...n){return Hs(this).concat(...n.map(e=>We(e)?Hs(e):e))},entries(){return Ul(this,"entries",n=>(n[1]=Gt(n[1]),n))},every(n,e){return mi(this,"every",n,e,void 0,arguments)},filter(n,e){return mi(this,"filter",n,e,t=>t.map(Gt),arguments)},find(n,e){return mi(this,"find",n,e,Gt,arguments)},findIndex(n,e){return mi(this,"findIndex",n,e,void 0,arguments)},findLast(n,e){return mi(this,"findLast",n,e,Gt,arguments)},findLastIndex(n,e){return mi(this,"findLastIndex",n,e,void 0,arguments)},forEach(n,e){return mi(this,"forEach",n,e,void 0,arguments)},includes(...n){return Nl(this,"includes",n)},indexOf(...n){return Nl(this,"indexOf",n)},join(n){return Hs(this).join(n)},lastIndexOf(...n){return Nl(this,"lastIndexOf",n)},map(n,e){return mi(this,"map",n,e,void 0,arguments)},pop(){return Ir(this,"pop")},push(...n){return Ir(this,"push",n)},reduce(n,...e){return Kf(this,"reduce",n,e)},reduceRight(n,...e){return Kf(this,"reduceRight",n,e)},shift(){return Ir(this,"shift")},some(n,e){return mi(this,"some",n,e,void 0,arguments)},splice(...n){return Ir(this,"splice",n)},toReversed(){return Hs(this).toReversed()},toSorted(n){return Hs(this).toSorted(n)},toSpliced(...n){return Hs(this).toSpliced(...n)},unshift(...n){return Ir(this,"unshift",n)},values(){return Ul(this,"values",Gt)}};function Ul(n,e,t){const i=fl(n),s=i[e]();return i!==n&&!Ln(n)&&(s._next=s.next,s.next=()=>{const r=s._next();return r.value&&(r.value=t(r.value)),r}),s}const N_=Array.prototype;function mi(n,e,t,i,s,r){const o=fl(n),a=o!==n&&!Ln(n),l=o[e];if(l!==N_[e]){const f=l.apply(n,r);return a?Gt(f):f}let c=t;o!==n&&(a?c=function(f,d){return t.call(this,Gt(f),d,n)}:t.length>2&&(c=function(f,d){return t.call(this,f,d,n)}));const u=l.call(o,c,i);return a&&s?s(u):u}function Kf(n,e,t,i){const s=fl(n);let r=t;return s!==n&&(Ln(n)?t.length>3&&(r=function(o,a,l){return t.call(this,o,a,l,n)}):r=function(o,a,l){return t.call(this,o,Gt(a),l,n)}),s[e](r,...i)}function Nl(n,e,t){const i=rt(n);jt(i,"iterate",co);const s=i[e](...t);return(s===-1||s===!1)&&sf(t[0])?(t[0]=rt(t[0]),i[e](...t)):s}function Ir(n,e,t=[]){Ci(),Zu();const i=rt(n)[e].apply(n,t);return Ju(),Pi(),i}const O_=qu("__proto__,__v_isRef,__isVue"),Np=new Set(Object.getOwnPropertyNames(Symbol).filter(n=>n!=="arguments"&&n!=="caller").map(n=>Symbol[n]).filter(Yn));function F_(n){Yn(n)||(n=String(n));const e=rt(this);return jt(e,"has",n),e.hasOwnProperty(n)}class Op{constructor(e=!1,t=!1){this._isReadonly=e,this._isShallow=t}get(e,t,i){if(t==="__v_skip")return e.__v_skip;const s=this._isReadonly,r=this._isShallow;if(t==="__v_isReactive")return!s;if(t==="__v_isReadonly")return s;if(t==="__v_isShallow")return r;if(t==="__v_raw")return i===(s?r?q_:zp:r?kp:Bp).get(e)||Object.getPrototypeOf(e)===Object.getPrototypeOf(i)?e:void 0;const o=We(e);if(!s){let l;if(o&&(l=U_[t]))return l;if(t==="hasOwnProperty")return F_}const a=Reflect.get(e,t,Pt(e)?e:i);return(Yn(t)?Np.has(t):O_(t))||(s||jt(e,"get",t),r)?a:Pt(a)?o&&Ku(t)?a:a.value:xt(a)?s?Vp(a):Co(a):a}}class Fp extends Op{constructor(e=!1){super(!1,e)}set(e,t,i,s){let r=e[t];if(!this._isShallow){const l=is(r);if(!Ln(i)&&!is(i)&&(r=rt(r),i=rt(i)),!We(e)&&Pt(r)&&!Pt(i))return l?!1:(r.value=i,!0)}const o=We(e)&&Ku(t)?Number(t)<e.length:ft(e,t),a=Reflect.set(e,t,i,Pt(e)?e:s);return e===rt(s)&&(o?Ji(i,r)&&Ti(e,"set",t,i):Ti(e,"add",t,i)),a}deleteProperty(e,t){const i=ft(e,t);e[t];const s=Reflect.deleteProperty(e,t);return s&&i&&Ti(e,"delete",t,void 0),s}has(e,t){const i=Reflect.has(e,t);return(!Yn(t)||!Np.has(t))&&jt(e,"has",t),i}ownKeys(e){return jt(e,"iterate",We(e)?"length":Cs),Reflect.ownKeys(e)}}class B_ extends Op{constructor(e=!1){super(!0,e)}set(e,t){return!0}deleteProperty(e,t){return!0}}const k_=new Fp,z_=new B_,H_=new Fp(!0);const Ic=n=>n,Xo=n=>Reflect.getPrototypeOf(n);function V_(n,e,t){return function(...i){const s=this.__v_raw,r=rt(s),o=ur(r),a=n==="entries"||n===Symbol.iterator&&o,l=n==="keys"&&o,c=s[n](...i),u=t?Ic:e?Va:Gt;return!e&&jt(r,"iterate",l?Lc:Cs),{next(){const{value:f,done:d}=c.next();return d?{value:f,done:d}:{value:a?[u(f[0]),u(f[1])]:u(f),done:d}},[Symbol.iterator](){return this}}}}function $o(n){return function(...e){return n==="delete"?!1:n==="clear"?void 0:this}}function G_(n,e){const t={get(s){const r=this.__v_raw,o=rt(r),a=rt(s);n||(Ji(s,a)&&jt(o,"get",s),jt(o,"get",a));const{has:l}=Xo(o),c=e?Ic:n?Va:Gt;if(l.call(o,s))return c(r.get(s));if(l.call(o,a))return c(r.get(a));r!==o&&r.get(s)},get size(){const s=this.__v_raw;return!n&&jt(rt(s),"iterate",Cs),Reflect.get(s,"size",s)},has(s){const r=this.__v_raw,o=rt(r),a=rt(s);return n||(Ji(s,a)&&jt(o,"has",s),jt(o,"has",a)),s===a?r.has(s):r.has(s)||r.has(a)},forEach(s,r){const o=this,a=o.__v_raw,l=rt(a),c=e?Ic:n?Va:Gt;return!n&&jt(l,"iterate",Cs),a.forEach((u,f)=>s.call(r,c(u),c(f),o))}};return Ht(t,n?{add:$o("add"),set:$o("set"),delete:$o("delete"),clear:$o("clear")}:{add(s){!e&&!Ln(s)&&!is(s)&&(s=rt(s));const r=rt(this);return Xo(r).has.call(r,s)||(r.add(s),Ti(r,"add",s,s)),this},set(s,r){!e&&!Ln(r)&&!is(r)&&(r=rt(r));const o=rt(this),{has:a,get:l}=Xo(o);let c=a.call(o,s);c||(s=rt(s),c=a.call(o,s));const u=l.call(o,s);return o.set(s,r),c?Ji(r,u)&&Ti(o,"set",s,r):Ti(o,"add",s,r),this},delete(s){const r=rt(this),{has:o,get:a}=Xo(r);let l=o.call(r,s);l||(s=rt(s),l=o.call(r,s)),a&&a.call(r,s);const c=r.delete(s);return l&&Ti(r,"delete",s,void 0),c},clear(){const s=rt(this),r=s.size!==0,o=s.clear();return r&&Ti(s,"clear",void 0,void 0),o}}),["keys","values","entries",Symbol.iterator].forEach(s=>{t[s]=V_(s,n,e)}),t}function tf(n,e){const t=G_(n,e);return(i,s,r)=>s==="__v_isReactive"?!n:s==="__v_isReadonly"?n:s==="__v_raw"?i:Reflect.get(ft(t,s)&&s in i?t:i,s,r)}const W_={get:tf(!1,!1)},X_={get:tf(!1,!0)},$_={get:tf(!0,!1)};const Bp=new WeakMap,kp=new WeakMap,zp=new WeakMap,q_=new WeakMap;function j_(n){switch(n){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function Y_(n){return n.__v_skip||!Object.isExtensible(n)?0:j_(v_(n))}function Co(n){return is(n)?n:nf(n,!1,k_,W_,Bp)}function Hp(n){return nf(n,!1,H_,X_,kp)}function Vp(n){return nf(n,!0,z_,$_,zp)}function nf(n,e,t,i,s){if(!xt(n)||n.__v_raw&&!(e&&n.__v_isReactive))return n;const r=Y_(n);if(r===0)return n;const o=s.get(n);if(o)return o;const a=new Proxy(n,r===2?i:t);return s.set(n,a),a}function Qi(n){return is(n)?Qi(n.__v_raw):!!(n&&n.__v_isReactive)}function is(n){return!!(n&&n.__v_isReadonly)}function Ln(n){return!!(n&&n.__v_isShallow)}function sf(n){return n?!!n.__v_raw:!1}function rt(n){const e=n&&n.__v_raw;return e?rt(e):n}function rf(n){return!ft(n,"__v_skip")&&Object.isExtensible(n)&&Pc(n,"__v_skip",!0),n}const Gt=n=>xt(n)?Co(n):n,Va=n=>xt(n)?Vp(n):n;function Pt(n){return n?n.__v_isRef===!0:!1}function Fe(n){return Gp(n,!1)}function K_(n){return Gp(n,!0)}function Gp(n,e){return Pt(n)?n:new Z_(n,e)}class Z_{constructor(e,t){this.dep=new ef,this.__v_isRef=!0,this.__v_isShallow=!1,this._rawValue=t?e:rt(e),this._value=t?e:Gt(e),this.__v_isShallow=t}get value(){return this.dep.track(),this._value}set value(e){const t=this._rawValue,i=this.__v_isShallow||Ln(e)||is(e);e=i?e:rt(e),Ji(e,t)&&(this._rawValue=e,this._value=i?e:Gt(e),this.dep.trigger())}}function Vn(n){return Pt(n)?n.value:n}const J_={get:(n,e,t)=>e==="__v_raw"?n:Vn(Reflect.get(n,e,t)),set:(n,e,t,i)=>{const s=n[e];return Pt(s)&&!Pt(t)?(s.value=t,!0):Reflect.set(n,e,t,i)}};function Wp(n){return Qi(n)?n:new Proxy(n,J_)}function Q_(n){const e=We(n)?new Array(n.length):{};for(const t in n)e[t]=tv(n,t);return e}class ev{constructor(e,t,i){this._object=e,this._key=t,this._defaultValue=i,this.__v_isRef=!0,this._value=void 0}get value(){const e=this._object[this._key];return this._value=e===void 0?this._defaultValue:e}set value(e){this._object[this._key]=e}get dep(){return I_(rt(this._object),this._key)}}function tv(n,e,t){const i=n[e];return Pt(i)?i:new ev(n,e,t)}class nv{constructor(e,t,i){this.fn=e,this.setter=t,this._value=void 0,this.dep=new ef(this),this.__v_isRef=!0,this.deps=void 0,this.depsTail=void 0,this.flags=16,this.globalVersion=lo-1,this.next=void 0,this.effect=this,this.__v_isReadonly=!t,this.isSSR=i}notify(){if(this.flags|=16,!(this.flags&8)&&bt!==this)return Cp(this,!0),!0}get value(){const e=this.dep.track();return Lp(this),e&&(e.version=this.dep.version),this._value}set value(e){this.setter&&this.setter(e)}}function iv(n,e,t=!1){let i,s;return Ye(n)?i=n:(i=n.get,s=n.set),new nv(i,s,t)}const qo={},Ga=new WeakMap;let Ss;function sv(n,e=!1,t=Ss){if(t){let i=Ga.get(t);i||Ga.set(t,i=[]),i.push(n)}}function rv(n,e,t=vt){const{immediate:i,deep:s,once:r,scheduler:o,augmentJob:a,call:l}=t,c=x=>s?x:Ln(x)||s===!1||s===0?wi(x,1):wi(x);let u,f,d,h,g=!1,_=!1;if(Pt(n)?(f=()=>n.value,g=Ln(n)):Qi(n)?(f=()=>c(n),g=!0):We(n)?(_=!0,g=n.some(x=>Qi(x)||Ln(x)),f=()=>n.map(x=>{if(Pt(x))return x.value;if(Qi(x))return c(x);if(Ye(x))return l?l(x,2):x()})):Ye(n)?e?f=l?()=>l(n,2):n:f=()=>{if(d){Ci();try{d()}finally{Pi()}}const x=Ss;Ss=u;try{return l?l(n,3,[h]):n(h)}finally{Ss=x}}:f=li,e&&s){const x=f,w=s===!0?1/0:s;f=()=>wi(x(),w)}const m=wp(),p=()=>{u.stop(),m&&m.active&&Yu(m.effects,u)};if(r&&e){const x=e;e=(...w)=>{x(...w),p()}}let C=_?new Array(n.length).fill(qo):qo;const b=x=>{if(!(!(u.flags&1)||!u.dirty&&!x))if(e){const w=u.run();if(s||g||(_?w.some((L,P)=>Ji(L,C[P])):Ji(w,C))){d&&d();const L=Ss;Ss=u;try{const P=[w,C===qo?void 0:_&&C[0]===qo?[]:C,h];C=w,l?l(e,3,P):e(...P)}finally{Ss=L}}}else u.run()};return a&&a(b),u=new Ap(f),u.scheduler=o?()=>o(b,!1):b,h=x=>sv(x,!1,u),d=u.onStop=()=>{const x=Ga.get(u);if(x){if(l)l(x,4);else for(const w of x)w();Ga.delete(u)}},e?i?b(!0):C=u.run():o?o(b.bind(null,!0),!0):u.run(),p.pause=u.pause.bind(u),p.resume=u.resume.bind(u),p.stop=p,p}function wi(n,e=1/0,t){if(e<=0||!xt(n)||n.__v_skip||(t=t||new Set,t.has(n)))return n;if(t.add(n),e--,Pt(n))wi(n.value,e,t);else if(We(n))for(let i=0;i<n.length;i++)wi(n[i],e,t);else if(ol(n)||ur(n))n.forEach(i=>{wi(i,e,t)});else if(yp(n)){for(const i in n)wi(n[i],e,t);for(const i of Object.getOwnPropertySymbols(n))Object.prototype.propertyIsEnumerable.call(n,i)&&wi(n[i],e,t)}return n}/**
* @vue/runtime-core v3.5.18
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function Po(n,e,t,i){try{return i?n(...i):n()}catch(s){hl(s,e,t)}}function Kn(n,e,t,i){if(Ye(n)){const s=Po(n,e,t,i);return s&&vp(s)&&s.catch(r=>{hl(r,e,t)}),s}if(We(n)){const s=[];for(let r=0;r<n.length;r++)s.push(Kn(n[r],e,t,i));return s}}function hl(n,e,t,i=!0){const s=e?e.vnode:null,{errorHandler:r,throwUnhandledErrorInProduction:o}=e&&e.appContext.config||vt;if(e){let a=e.parent;const l=e.proxy,c=`https://vuejs.org/error-reference/#runtime-${t}`;for(;a;){const u=a.ec;if(u){for(let f=0;f<u.length;f++)if(u[f](n,l,c)===!1)return}a=a.parent}if(r){Ci(),Po(r,null,10,[n,l,c]),Pi();return}}ov(n,t,s,i,o)}function ov(n,e,t,i=!0,s=!1){if(s)throw n}const nn=[];let ni=-1;const fr=[];let Wi=null,ir=0;const Xp=Promise.resolve();let Wa=null;function Do(n){const e=Wa||Xp;return n?e.then(this?n.bind(this):n):e}function av(n){let e=ni+1,t=nn.length;for(;e<t;){const i=e+t>>>1,s=nn[i],r=uo(s);r<n||r===n&&s.flags&2?e=i+1:t=i}return e}function of(n){if(!(n.flags&1)){const e=uo(n),t=nn[nn.length-1];!t||!(n.flags&2)&&e>=uo(t)?nn.push(n):nn.splice(av(e),0,n),n.flags|=1,$p()}}function $p(){Wa||(Wa=Xp.then(jp))}function lv(n){We(n)?fr.push(...n):Wi&&n.id===-1?Wi.splice(ir+1,0,n):n.flags&1||(fr.push(n),n.flags|=1),$p()}function Zf(n,e,t=ni+1){for(;t<nn.length;t++){const i=nn[t];if(i&&i.flags&2){if(n&&i.id!==n.uid)continue;nn.splice(t,1),t--,i.flags&4&&(i.flags&=-2),i(),i.flags&4||(i.flags&=-2)}}}function qp(n){if(fr.length){const e=[...new Set(fr)].sort((t,i)=>uo(t)-uo(i));if(fr.length=0,Wi){Wi.push(...e);return}for(Wi=e,ir=0;ir<Wi.length;ir++){const t=Wi[ir];t.flags&4&&(t.flags&=-2),t.flags&8||t(),t.flags&=-2}Wi=null,ir=0}}const uo=n=>n.id==null?n.flags&2?-1:1/0:n.id;function jp(n){try{for(ni=0;ni<nn.length;ni++){const e=nn[ni];e&&!(e.flags&8)&&(e.flags&4&&(e.flags&=-2),Po(e,e.i,e.i?15:14),e.flags&4||(e.flags&=-2))}}finally{for(;ni<nn.length;ni++){const e=nn[ni];e&&(e.flags&=-2)}ni=-1,nn.length=0,qp(),Wa=null,(nn.length||fr.length)&&jp()}}let Wt=null,Yp=null;function Xa(n){const e=Wt;return Wt=n,Yp=n&&n.type.__scopeId||null,e}function Ls(n,e=Wt,t){if(!e||n._n)return n;const i=(...s)=>{i._d&&fh(-1);const r=Xa(e);let o;try{o=n(...s)}finally{Xa(r),i._d&&fh(1)}return o};return i._n=!0,i._c=!0,i._d=!0,i}function St(n,e){if(Wt===null)return n;const t=_l(Wt),i=n.dirs||(n.dirs=[]);for(let s=0;s<e.length;s++){let[r,o,a,l=vt]=e[s];r&&(Ye(r)&&(r={mounted:r,updated:r}),r.deep&&wi(o),i.push({dir:r,instance:t,value:o,oldValue:void 0,arg:a,modifiers:l}))}return n}function fs(n,e,t,i){const s=n.dirs,r=e&&e.dirs;for(let o=0;o<s.length;o++){const a=s[o];r&&(a.oldValue=r[o].value);let l=a.dir[i];l&&(Ci(),Kn(l,t,8,[n.el,a,n,e]),Pi())}}const Kp=Symbol("_vte"),Zp=n=>n.__isTeleport,Zr=n=>n&&(n.disabled||n.disabled===""),Jf=n=>n&&(n.defer||n.defer===""),Qf=n=>typeof SVGElement<"u"&&n instanceof SVGElement,eh=n=>typeof MathMLElement=="function"&&n instanceof MathMLElement,Uc=(n,e)=>{const t=n&&n.to;return Dt(t)?e?e(t):null:t},Jp={name:"Teleport",__isTeleport:!0,process(n,e,t,i,s,r,o,a,l,c){const{mc:u,pc:f,pbc:d,o:{insert:h,querySelector:g,createText:_,createComment:m}}=c,p=Zr(e.props);let{shapeFlag:C,children:b,dynamicChildren:x}=e;if(n==null){const w=e.el=_(""),L=e.anchor=_("");h(w,t,i),h(L,t,i);const P=(y,E)=>{C&16&&(s&&s.isCE&&(s.ce._teleportTarget=y),u(b,y,E,s,r,o,a,l))},M=()=>{const y=e.target=Uc(e.props,g),E=Qp(y,e,_,h);y&&(o!=="svg"&&Qf(y)?o="svg":o!=="mathml"&&eh(y)&&(o="mathml"),p||(P(y,E),Ma(e,!1)))};p&&(P(t,L),Ma(e,!0)),Jf(e.props)?(e.el.__isMounted=!1,tn(()=>{M(),delete e.el.__isMounted},r)):M()}else{if(Jf(e.props)&&n.el.__isMounted===!1){tn(()=>{Jp.process(n,e,t,i,s,r,o,a,l,c)},r);return}e.el=n.el,e.targetStart=n.targetStart;const w=e.anchor=n.anchor,L=e.target=n.target,P=e.targetAnchor=n.targetAnchor,M=Zr(n.props),y=M?t:L,E=M?w:P;if(o==="svg"||Qf(L)?o="svg":(o==="mathml"||eh(L))&&(o="mathml"),x?(d(n.dynamicChildren,x,y,s,r,o,a),uf(n,e,!0)):l||f(n,e,y,E,s,r,o,a,!1),p)M?e.props&&n.props&&e.props.to!==n.props.to&&(e.props.to=n.props.to):jo(e,t,w,c,1);else if((e.props&&e.props.to)!==(n.props&&n.props.to)){const I=e.target=Uc(e.props,g);I&&jo(e,I,null,c,0)}else M&&jo(e,L,P,c,1);Ma(e,p)}},remove(n,e,t,{um:i,o:{remove:s}},r){const{shapeFlag:o,children:a,anchor:l,targetStart:c,targetAnchor:u,target:f,props:d}=n;if(f&&(s(c),s(u)),r&&s(l),o&16){const h=r||!Zr(d);for(let g=0;g<a.length;g++){const _=a[g];i(_,e,t,h,!!_.dynamicChildren)}}},move:jo,hydrate:cv};function jo(n,e,t,{o:{insert:i},m:s},r=2){r===0&&i(n.targetAnchor,e,t);const{el:o,anchor:a,shapeFlag:l,children:c,props:u}=n,f=r===2;if(f&&i(o,e,t),(!f||Zr(u))&&l&16)for(let d=0;d<c.length;d++)s(c[d],e,t,2);f&&i(a,e,t)}function cv(n,e,t,i,s,r,{o:{nextSibling:o,parentNode:a,querySelector:l,insert:c,createText:u}},f){const d=e.target=Uc(e.props,l);if(d){const h=Zr(e.props),g=d._lpa||d.firstChild;if(e.shapeFlag&16)if(h)e.anchor=f(o(n),e,a(n),t,i,s,r),e.targetStart=g,e.targetAnchor=g&&o(g);else{e.anchor=o(n);let _=g;for(;_;){if(_&&_.nodeType===8){if(_.data==="teleport start anchor")e.targetStart=_;else if(_.data==="teleport anchor"){e.targetAnchor=_,d._lpa=e.targetAnchor&&o(e.targetAnchor);break}}_=o(_)}e.targetAnchor||Qp(d,e,u,c),f(g&&o(g),e,d,t,i,s,r)}Ma(e,h)}return e.anchor&&o(e.anchor)}const uv=Jp;function Ma(n,e){const t=n.ctx;if(t&&t.ut){let i,s;for(e?(i=n.el,s=n.anchor):(i=n.targetStart,s=n.targetAnchor);i&&i!==s;)i.nodeType===1&&i.setAttribute("data-v-owner",t.uid),i=i.nextSibling;t.ut()}}function Qp(n,e,t,i){const s=e.targetStart=t(""),r=e.targetAnchor=t("");return s[Kp]=r,n&&(i(s,n),i(r,n)),r}const Xi=Symbol("_leaveCb"),Yo=Symbol("_enterCb");function fv(){const n={isMounted:!1,isLeaving:!1,isUnmounting:!1,leavingVNodes:new Map};return Mn(()=>{n.isMounted=!0}),am(()=>{n.isUnmounting=!0}),n}const An=[Function,Array],em={mode:String,appear:Boolean,persisted:Boolean,onBeforeEnter:An,onEnter:An,onAfterEnter:An,onEnterCancelled:An,onBeforeLeave:An,onLeave:An,onAfterLeave:An,onLeaveCancelled:An,onBeforeAppear:An,onAppear:An,onAfterAppear:An,onAppearCancelled:An},tm=n=>{const e=n.subTree;return e.component?tm(e.component):e},hv={name:"BaseTransition",props:em,setup(n,{slots:e}){const t=pf(),i=fv();return()=>{const s=e.default&&sm(e.default(),!0);if(!s||!s.length)return;const r=nm(s),o=rt(n),{mode:a}=o;if(i.isLeaving)return Ol(r);const l=th(r);if(!l)return Ol(r);let c=Nc(l,o,i,t,f=>c=f);l.type!==Yt&&fo(l,c);let u=t.subTree&&th(t.subTree);if(u&&u.type!==Yt&&!Ms(l,u)&&tm(t).type!==Yt){let f=Nc(u,o,i,t);if(fo(u,f),a==="out-in"&&l.type!==Yt)return i.isLeaving=!0,f.afterLeave=()=>{i.isLeaving=!1,t.job.flags&8||t.update(),delete f.afterLeave,u=void 0},Ol(r);a==="in-out"&&l.type!==Yt?f.delayLeave=(d,h,g)=>{const _=im(i,u);_[String(u.key)]=u,d[Xi]=()=>{h(),d[Xi]=void 0,delete c.delayedLeave,u=void 0},c.delayedLeave=()=>{g(),delete c.delayedLeave,u=void 0}}:u=void 0}else u&&(u=void 0);return r}}};function nm(n){let e=n[0];if(n.length>1){for(const t of n)if(t.type!==Yt){e=t;break}}return e}const dv=hv;function im(n,e){const{leavingVNodes:t}=n;let i=t.get(e.type);return i||(i=Object.create(null),t.set(e.type,i)),i}function Nc(n,e,t,i,s){const{appear:r,mode:o,persisted:a=!1,onBeforeEnter:l,onEnter:c,onAfterEnter:u,onEnterCancelled:f,onBeforeLeave:d,onLeave:h,onAfterLeave:g,onLeaveCancelled:_,onBeforeAppear:m,onAppear:p,onAfterAppear:C,onAppearCancelled:b}=e,x=String(n.key),w=im(t,n),L=(y,E)=>{y&&Kn(y,i,9,E)},P=(y,E)=>{const I=E[1];L(y,E),We(y)?y.every(V=>V.length<=1)&&I():y.length<=1&&I()},M={mode:o,persisted:a,beforeEnter(y){let E=l;if(!t.isMounted)if(r)E=m||l;else return;y[Xi]&&y[Xi](!0);const I=w[x];I&&Ms(n,I)&&I.el[Xi]&&I.el[Xi](),L(E,[y])},enter(y){let E=c,I=u,V=f;if(!t.isMounted)if(r)E=p||c,I=C||u,V=b||f;else return;let K=!1;const ee=y[Yo]=se=>{K||(K=!0,se?L(V,[y]):L(I,[y]),M.delayedLeave&&M.delayedLeave(),y[Yo]=void 0)};E?P(E,[y,ee]):ee()},leave(y,E){const I=String(n.key);if(y[Yo]&&y[Yo](!0),t.isUnmounting)return E();L(d,[y]);let V=!1;const K=y[Xi]=ee=>{V||(V=!0,E(),ee?L(_,[y]):L(g,[y]),y[Xi]=void 0,w[I]===n&&delete w[I])};w[I]=n,h?P(h,[y,K]):K()},clone(y){const E=Nc(y,e,t,i,s);return s&&s(E),E}};return M}function Ol(n){if(dl(n))return n=ss(n),n.children=null,n}function th(n){if(!dl(n))return Zp(n.type)&&n.children?nm(n.children):n;if(n.component)return n.component.subTree;const{shapeFlag:e,children:t}=n;if(t){if(e&16)return t[0];if(e&32&&Ye(t.default))return t.default()}}function fo(n,e){n.shapeFlag&6&&n.component?(n.transition=e,fo(n.component.subTree,e)):n.shapeFlag&128?(n.ssContent.transition=e.clone(n.ssContent),n.ssFallback.transition=e.clone(n.ssFallback)):n.transition=e}function sm(n,e=!1,t){let i=[],s=0;for(let r=0;r<n.length;r++){let o=n[r];const a=t==null?o.key:String(t)+String(o.key!=null?o.key:r);o.type===ht?(o.patchFlag&128&&s++,i=i.concat(sm(o.children,e,a))):(e||o.type!==Yt)&&i.push(a!=null?ss(o,{key:a}):o)}if(s>1)for(let r=0;r<i.length;r++)i[r].patchFlag=-2;return i}/*! #__NO_SIDE_EFFECTS__ */function Nn(n,e){return Ye(n)?Ht({name:n.name},e,{setup:n}):n}function rm(n){n.ids=[n.ids[0]+n.ids[2]+++"-",0,0]}function Jr(n,e,t,i,s=!1){if(We(n)){n.forEach((g,_)=>Jr(g,e&&(We(e)?e[_]:e),t,i,s));return}if(hr(i)&&!s){i.shapeFlag&512&&i.type.__asyncResolved&&i.component.subTree.component&&Jr(n,e,t,i.component.subTree);return}const r=i.shapeFlag&4?_l(i.component):i.el,o=s?null:r,{i:a,r:l}=n,c=e&&e.r,u=a.refs===vt?a.refs={}:a.refs,f=a.setupState,d=rt(f),h=f===vt?()=>!1:g=>ft(d,g);if(c!=null&&c!==l&&(Dt(c)?(u[c]=null,h(c)&&(f[c]=null)):Pt(c)&&(c.value=null)),Ye(l))Po(l,a,12,[o,u]);else{const g=Dt(l),_=Pt(l);if(g||_){const m=()=>{if(n.f){const p=g?h(l)?f[l]:u[l]:l.value;s?We(p)&&Yu(p,r):We(p)?p.includes(r)||p.push(r):g?(u[l]=[r],h(l)&&(f[l]=u[l])):(l.value=[r],n.k&&(u[n.k]=l.value))}else g?(u[l]=o,h(l)&&(f[l]=o)):_&&(l.value=o,n.k&&(u[n.k]=o))};o?(m.id=-1,tn(m,t)):m()}}}cl().requestIdleCallback;cl().cancelIdleCallback;const hr=n=>!!n.type.__asyncLoader,dl=n=>n.type.__isKeepAlive;function pv(n,e){om(n,"a",e)}function mv(n,e){om(n,"da",e)}function om(n,e,t=Kt){const i=n.__wdc||(n.__wdc=()=>{let s=t;for(;s;){if(s.isDeactivated)return;s=s.parent}return n()});if(pl(e,i,t),t){let s=t.parent;for(;s&&s.parent;)dl(s.parent.vnode)&&gv(i,e,t,s),s=s.parent}}function gv(n,e,t,i){const s=pl(e,n,i,!0);Bs(()=>{Yu(i[e],s)},t)}function pl(n,e,t=Kt,i=!1){if(t){const s=t[n]||(t[n]=[]),r=e.__weh||(e.__weh=(...o)=>{Ci();const a=Lo(t),l=Kn(e,t,n,o);return a(),Pi(),l});return i?s.unshift(r):s.push(r),r}}const Ii=n=>(e,t=Kt)=>{(!mo||n==="sp")&&pl(n,(...i)=>e(...i),t)},_v=Ii("bm"),Mn=Ii("m"),vv=Ii("bu"),xv=Ii("u"),am=Ii("bum"),Bs=Ii("um"),yv=Ii("sp"),Sv=Ii("rtg"),bv=Ii("rtc");function Mv(n,e=Kt){pl("ec",n,e)}const Ev="components";function af(n,e){return wv(Ev,n,!0,e)||n}const Tv=Symbol.for("v-ndc");function wv(n,e,t=!0,i=!1){const s=Wt||Kt;if(s){const r=s.type;{const a=g0(r,!1);if(a&&(a===e||a===Un(e)||a===ll(Un(e))))return r}const o=nh(s[n]||r[n],e)||nh(s.appContext[n],e);return!o&&i?r:o}}function nh(n,e){return n&&(n[e]||n[Un(e)]||n[ll(Un(e))])}function xn(n,e,t,i){let s;const r=t,o=We(n);if(o||Dt(n)){const a=o&&Qi(n);let l=!1,c=!1;a&&(l=!Ln(n),c=is(n),n=fl(n)),s=new Array(n.length);for(let u=0,f=n.length;u<f;u++)s[u]=e(l?c?Va(Gt(n[u])):Gt(n[u]):n[u],u,void 0,r)}else if(typeof n=="number"){s=new Array(n);for(let a=0;a<n;a++)s[a]=e(a+1,a,void 0,r)}else if(xt(n))if(n[Symbol.iterator])s=Array.from(n,(a,l)=>e(a,l,void 0,r));else{const a=Object.keys(n);s=new Array(a.length);for(let l=0,c=a.length;l<c;l++){const u=a[l];s[l]=e(n[u],u,l,r)}}else s=[];return s}function Av(n,e,t={},i,s){if(Wt.ce||Wt.parent&&hr(Wt.parent)&&Wt.parent.ce)return De(),es(ht,null,[dt("slot",t,i)],64);let r=n[e];r&&r._c&&(r._d=!1),De();const o=r&&lm(r(t)),a=t.key||o&&o.key,l=es(ht,{key:(a&&!Yn(a)?a:`_${e}`)+(!o&&i?"_fb":"")},o||[],o&&n._===1?64:-2);return r&&r._c&&(r._d=!0),l}function lm(n){return n.some(e=>po(e)?!(e.type===Yt||e.type===ht&&!lm(e.children)):!0)?n:null}const Oc=n=>n?wm(n)?_l(n):Oc(n.parent):null,Qr=Ht(Object.create(null),{$:n=>n,$el:n=>n.vnode.el,$data:n=>n.data,$props:n=>n.props,$attrs:n=>n.attrs,$slots:n=>n.slots,$refs:n=>n.refs,$parent:n=>Oc(n.parent),$root:n=>Oc(n.root),$host:n=>n.ce,$emit:n=>n.emit,$options:n=>um(n),$forceUpdate:n=>n.f||(n.f=()=>{of(n.update)}),$nextTick:n=>n.n||(n.n=Do.bind(n.proxy)),$watch:n=>Kv.bind(n)}),Fl=(n,e)=>n!==vt&&!n.__isScriptSetup&&ft(n,e),Rv={get({_:n},e){if(e==="__v_skip")return!0;const{ctx:t,setupState:i,data:s,props:r,accessCache:o,type:a,appContext:l}=n;let c;if(e[0]!=="$"){const h=o[e];if(h!==void 0)switch(h){case 1:return i[e];case 2:return s[e];case 4:return t[e];case 3:return r[e]}else{if(Fl(i,e))return o[e]=1,i[e];if(s!==vt&&ft(s,e))return o[e]=2,s[e];if((c=n.propsOptions[0])&&ft(c,e))return o[e]=3,r[e];if(t!==vt&&ft(t,e))return o[e]=4,t[e];Fc&&(o[e]=0)}}const u=Qr[e];let f,d;if(u)return e==="$attrs"&&jt(n.attrs,"get",""),u(n);if((f=a.__cssModules)&&(f=f[e]))return f;if(t!==vt&&ft(t,e))return o[e]=4,t[e];if(d=l.config.globalProperties,ft(d,e))return d[e]},set({_:n},e,t){const{data:i,setupState:s,ctx:r}=n;return Fl(s,e)?(s[e]=t,!0):i!==vt&&ft(i,e)?(i[e]=t,!0):ft(n.props,e)||e[0]==="$"&&e.slice(1)in n?!1:(r[e]=t,!0)},has({_:{data:n,setupState:e,accessCache:t,ctx:i,appContext:s,propsOptions:r}},o){let a;return!!t[o]||n!==vt&&ft(n,o)||Fl(e,o)||(a=r[0])&&ft(a,o)||ft(i,o)||ft(Qr,o)||ft(s.config.globalProperties,o)},defineProperty(n,e,t){return t.get!=null?n._.accessCache[e]=0:ft(t,"value")&&this.set(n,e,t.value,null),Reflect.defineProperty(n,e,t)}};function ih(n){return We(n)?n.reduce((e,t)=>(e[t]=null,e),{}):n}let Fc=!0;function Cv(n){const e=um(n),t=n.proxy,i=n.ctx;Fc=!1,e.beforeCreate&&sh(e.beforeCreate,n,"bc");const{data:s,computed:r,methods:o,watch:a,provide:l,inject:c,created:u,beforeMount:f,mounted:d,beforeUpdate:h,updated:g,activated:_,deactivated:m,beforeDestroy:p,beforeUnmount:C,destroyed:b,unmounted:x,render:w,renderTracked:L,renderTriggered:P,errorCaptured:M,serverPrefetch:y,expose:E,inheritAttrs:I,components:V,directives:K,filters:ee}=e;if(c&&Pv(c,i,null),o)for(const k in o){const N=o[k];Ye(N)&&(i[k]=N.bind(t))}if(s){const k=s.call(t,t);xt(k)&&(n.data=Co(k))}if(Fc=!0,r)for(const k in r){const N=r[k],ue=Ye(N)?N.bind(t,t):Ye(N.get)?N.get.bind(t,t):li,ye=!Ye(N)&&Ye(N.set)?N.set.bind(t):li,Te=Et({get:ue,set:ye});Object.defineProperty(i,k,{enumerable:!0,configurable:!0,get:()=>Te.value,set:Be=>Te.value=Be})}if(a)for(const k in a)cm(a[k],i,t,k);if(l){const k=Ye(l)?l.call(t):l;Reflect.ownKeys(k).forEach(N=>{Ea(N,k[N])})}u&&sh(u,n,"c");function O(k,N){We(N)?N.forEach(ue=>k(ue.bind(t))):N&&k(N.bind(t))}if(O(_v,f),O(Mn,d),O(vv,h),O(xv,g),O(pv,_),O(mv,m),O(Mv,M),O(bv,L),O(Sv,P),O(am,C),O(Bs,x),O(yv,y),We(E))if(E.length){const k=n.exposed||(n.exposed={});E.forEach(N=>{Object.defineProperty(k,N,{get:()=>t[N],set:ue=>t[N]=ue,enumerable:!0})})}else n.exposed||(n.exposed={});w&&n.render===li&&(n.render=w),I!=null&&(n.inheritAttrs=I),V&&(n.components=V),K&&(n.directives=K),y&&rm(n)}function Pv(n,e,t=li){We(n)&&(n=Bc(n));for(const i in n){const s=n[i];let r;xt(s)?"default"in s?r=ci(s.from||i,s.default,!0):r=ci(s.from||i):r=ci(s),Pt(r)?Object.defineProperty(e,i,{enumerable:!0,configurable:!0,get:()=>r.value,set:o=>r.value=o}):e[i]=r}}function sh(n,e,t){Kn(We(n)?n.map(i=>i.bind(e.proxy)):n.bind(e.proxy),e,t)}function cm(n,e,t,i){let s=i.includes(".")?Sm(t,i):()=>t[i];if(Dt(n)){const r=e[n];Ye(r)&&dr(s,r)}else if(Ye(n))dr(s,n.bind(t));else if(xt(n))if(We(n))n.forEach(r=>cm(r,e,t,i));else{const r=Ye(n.handler)?n.handler.bind(t):e[n.handler];Ye(r)&&dr(s,r,n)}}function um(n){const e=n.type,{mixins:t,extends:i}=e,{mixins:s,optionsCache:r,config:{optionMergeStrategies:o}}=n.appContext,a=r.get(e);let l;return a?l=a:!s.length&&!t&&!i?l=e:(l={},s.length&&s.forEach(c=>$a(l,c,o,!0)),$a(l,e,o)),xt(e)&&r.set(e,l),l}function $a(n,e,t,i=!1){const{mixins:s,extends:r}=e;r&&$a(n,r,t,!0),s&&s.forEach(o=>$a(n,o,t,!0));for(const o in e)if(!(i&&o==="expose")){const a=Dv[o]||t&&t[o];n[o]=a?a(n[o],e[o]):e[o]}return n}const Dv={data:rh,props:oh,emits:oh,methods:Wr,computed:Wr,beforeCreate:Qt,created:Qt,beforeMount:Qt,mounted:Qt,beforeUpdate:Qt,updated:Qt,beforeDestroy:Qt,beforeUnmount:Qt,destroyed:Qt,unmounted:Qt,activated:Qt,deactivated:Qt,errorCaptured:Qt,serverPrefetch:Qt,components:Wr,directives:Wr,watch:Iv,provide:rh,inject:Lv};function rh(n,e){return e?n?function(){return Ht(Ye(n)?n.call(this,this):n,Ye(e)?e.call(this,this):e)}:e:n}function Lv(n,e){return Wr(Bc(n),Bc(e))}function Bc(n){if(We(n)){const e={};for(let t=0;t<n.length;t++)e[n[t]]=n[t];return e}return n}function Qt(n,e){return n?[...new Set([].concat(n,e))]:e}function Wr(n,e){return n?Ht(Object.create(null),n,e):e}function oh(n,e){return n?We(n)&&We(e)?[...new Set([...n,...e])]:Ht(Object.create(null),ih(n),ih(e??{})):e}function Iv(n,e){if(!n)return e;if(!e)return n;const t=Ht(Object.create(null),n);for(const i in e)t[i]=Qt(n[i],e[i]);return t}function fm(){return{app:null,config:{isNativeTag:g_,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}let Uv=0;function Nv(n,e){return function(i,s=null){Ye(i)||(i=Ht({},i)),s!=null&&!xt(s)&&(s=null);const r=fm(),o=new WeakSet,a=[];let l=!1;const c=r.app={_uid:Uv++,_component:i,_props:s,_container:null,_context:r,_instance:null,version:v0,get config(){return r.config},set config(u){},use(u,...f){return o.has(u)||(u&&Ye(u.install)?(o.add(u),u.install(c,...f)):Ye(u)&&(o.add(u),u(c,...f))),c},mixin(u){return r.mixins.includes(u)||r.mixins.push(u),c},component(u,f){return f?(r.components[u]=f,c):r.components[u]},directive(u,f){return f?(r.directives[u]=f,c):r.directives[u]},mount(u,f,d){if(!l){const h=c._ceVNode||dt(i,s);return h.appContext=r,d===!0?d="svg":d===!1&&(d=void 0),n(h,u,d),l=!0,c._container=u,u.__vue_app__=c,_l(h.component)}},onUnmount(u){a.push(u)},unmount(){l&&(Kn(a,c._instance,16),n(null,c._container),delete c._container.__vue_app__)},provide(u,f){return r.provides[u]=f,c},runWithContext(u){const f=Ps;Ps=c;try{return u()}finally{Ps=f}}};return c}}let Ps=null;function Ea(n,e){if(Kt){let t=Kt.provides;const i=Kt.parent&&Kt.parent.provides;i===t&&(t=Kt.provides=Object.create(i)),t[n]=e}}function ci(n,e,t=!1){const i=pf();if(i||Ps){let s=Ps?Ps._context.provides:i?i.parent==null||i.ce?i.vnode.appContext&&i.vnode.appContext.provides:i.parent.provides:void 0;if(s&&n in s)return s[n];if(arguments.length>1)return t&&Ye(e)?e.call(i&&i.proxy):e}}function Ov(){return!!(pf()||Ps)}const hm={},dm=()=>Object.create(hm),pm=n=>Object.getPrototypeOf(n)===hm;function Fv(n,e,t,i=!1){const s={},r=dm();n.propsDefaults=Object.create(null),mm(n,e,s,r);for(const o in n.propsOptions[0])o in s||(s[o]=void 0);t?n.props=i?s:Hp(s):n.type.props?n.props=s:n.props=r,n.attrs=r}function Bv(n,e,t,i){const{props:s,attrs:r,vnode:{patchFlag:o}}=n,a=rt(s),[l]=n.propsOptions;let c=!1;if((i||o>0)&&!(o&16)){if(o&8){const u=n.vnode.dynamicProps;for(let f=0;f<u.length;f++){let d=u[f];if(ml(n.emitsOptions,d))continue;const h=e[d];if(l)if(ft(r,d))h!==r[d]&&(r[d]=h,c=!0);else{const g=Un(d);s[g]=kc(l,a,g,h,n,!1)}else h!==r[d]&&(r[d]=h,c=!0)}}}else{mm(n,e,s,r)&&(c=!0);let u;for(const f in a)(!e||!ft(e,f)&&((u=ls(f))===f||!ft(e,u)))&&(l?t&&(t[f]!==void 0||t[u]!==void 0)&&(s[f]=kc(l,a,f,void 0,n,!0)):delete s[f]);if(r!==a)for(const f in r)(!e||!ft(e,f))&&(delete r[f],c=!0)}c&&Ti(n.attrs,"set","")}function mm(n,e,t,i){const[s,r]=n.propsOptions;let o=!1,a;if(e)for(let l in e){if(jr(l))continue;const c=e[l];let u;s&&ft(s,u=Un(l))?!r||!r.includes(u)?t[u]=c:(a||(a={}))[u]=c:ml(n.emitsOptions,l)||(!(l in i)||c!==i[l])&&(i[l]=c,o=!0)}if(r){const l=rt(t),c=a||vt;for(let u=0;u<r.length;u++){const f=r[u];t[f]=kc(s,l,f,c[f],n,!ft(c,f))}}return o}function kc(n,e,t,i,s,r){const o=n[t];if(o!=null){const a=ft(o,"default");if(a&&i===void 0){const l=o.default;if(o.type!==Function&&!o.skipFactory&&Ye(l)){const{propsDefaults:c}=s;if(t in c)i=c[t];else{const u=Lo(s);i=c[t]=l.call(null,e),u()}}else i=l;s.ce&&s.ce._setProp(t,i)}o[0]&&(r&&!a?i=!1:o[1]&&(i===""||i===ls(t))&&(i=!0))}return i}const kv=new WeakMap;function gm(n,e,t=!1){const i=t?kv:e.propsCache,s=i.get(n);if(s)return s;const r=n.props,o={},a=[];let l=!1;if(!Ye(n)){const u=f=>{l=!0;const[d,h]=gm(f,e,!0);Ht(o,d),h&&a.push(...h)};!t&&e.mixins.length&&e.mixins.forEach(u),n.extends&&u(n.extends),n.mixins&&n.mixins.forEach(u)}if(!r&&!l)return xt(n)&&i.set(n,cr),cr;if(We(r))for(let u=0;u<r.length;u++){const f=Un(r[u]);ah(f)&&(o[f]=vt)}else if(r)for(const u in r){const f=Un(u);if(ah(f)){const d=r[u],h=o[f]=We(d)||Ye(d)?{type:d}:Ht({},d),g=h.type;let _=!1,m=!0;if(We(g))for(let p=0;p<g.length;++p){const C=g[p],b=Ye(C)&&C.name;if(b==="Boolean"){_=!0;break}else b==="String"&&(m=!1)}else _=Ye(g)&&g.name==="Boolean";h[0]=_,h[1]=m,(_||ft(h,"default"))&&a.push(f)}}const c=[o,a];return xt(n)&&i.set(n,c),c}function ah(n){return n[0]!=="$"&&!jr(n)}const lf=n=>n==="_"||n==="__"||n==="_ctx"||n==="$stable",cf=n=>We(n)?n.map(ii):[ii(n)],zv=(n,e,t)=>{if(e._n)return e;const i=Ls((...s)=>cf(e(...s)),t);return i._c=!1,i},_m=(n,e,t)=>{const i=n._ctx;for(const s in n){if(lf(s))continue;const r=n[s];if(Ye(r))e[s]=zv(s,r,i);else if(r!=null){const o=cf(r);e[s]=()=>o}}},vm=(n,e)=>{const t=cf(e);n.slots.default=()=>t},xm=(n,e,t)=>{for(const i in e)(t||!lf(i))&&(n[i]=e[i])},Hv=(n,e,t)=>{const i=n.slots=dm();if(n.vnode.shapeFlag&32){const s=e.__;s&&Pc(i,"__",s,!0);const r=e._;r?(xm(i,e,t),t&&Pc(i,"_",r,!0)):_m(e,i)}else e&&vm(n,e)},Vv=(n,e,t)=>{const{vnode:i,slots:s}=n;let r=!0,o=vt;if(i.shapeFlag&32){const a=e._;a?t&&a===1?r=!1:xm(s,e,t):(r=!e.$stable,_m(e,s)),o=e}else e&&(vm(n,e),o={default:1});if(r)for(const a in s)!lf(a)&&o[a]==null&&delete s[a]},tn=i0;function Gv(n){return Wv(n)}function Wv(n,e){const t=cl();t.__VUE__=!0;const{insert:i,remove:s,patchProp:r,createElement:o,createText:a,createComment:l,setText:c,setElementText:u,parentNode:f,nextSibling:d,setScopeId:h=li,insertStaticContent:g}=n,_=(D,v,U,F=null,H=null,B=null,J=void 0,X=null,Z=!!v.dynamicChildren)=>{if(D===v)return;D&&!Ms(D,v)&&(F=G(D),Be(D,H,B,!0),D=null),v.patchFlag===-2&&(Z=!1,v.dynamicChildren=null);const{type:ie,ref:de,shapeFlag:T}=v;switch(ie){case gl:m(D,v,U,F);break;case Yt:p(D,v,U,F);break;case Ta:D==null&&C(v,U,F,J);break;case ht:V(D,v,U,F,H,B,J,X,Z);break;default:T&1?w(D,v,U,F,H,B,J,X,Z):T&6?K(D,v,U,F,H,B,J,X,Z):(T&64||T&128)&&ie.process(D,v,U,F,H,B,J,X,Z,fe)}de!=null&&H?Jr(de,D&&D.ref,B,v||D,!v):de==null&&D&&D.ref!=null&&Jr(D.ref,null,B,D,!0)},m=(D,v,U,F)=>{if(D==null)i(v.el=a(v.children),U,F);else{const H=v.el=D.el;v.children!==D.children&&c(H,v.children)}},p=(D,v,U,F)=>{D==null?i(v.el=l(v.children||""),U,F):v.el=D.el},C=(D,v,U,F)=>{[D.el,D.anchor]=g(D.children,v,U,F,D.el,D.anchor)},b=({el:D,anchor:v},U,F)=>{let H;for(;D&&D!==v;)H=d(D),i(D,U,F),D=H;i(v,U,F)},x=({el:D,anchor:v})=>{let U;for(;D&&D!==v;)U=d(D),s(D),D=U;s(v)},w=(D,v,U,F,H,B,J,X,Z)=>{v.type==="svg"?J="svg":v.type==="math"&&(J="mathml"),D==null?L(v,U,F,H,B,J,X,Z):y(D,v,H,B,J,X,Z)},L=(D,v,U,F,H,B,J,X)=>{let Z,ie;const{props:de,shapeFlag:T,transition:S,dirs:z}=D;if(Z=D.el=o(D.type,B,de&&de.is,de),T&8?u(Z,D.children):T&16&&M(D.children,Z,null,F,H,Bl(D,B),J,X),z&&fs(D,null,F,"created"),P(Z,D,D.scopeId,J,F),de){for(const ce in de)ce!=="value"&&!jr(ce)&&r(Z,ce,null,de[ce],B,F);"value"in de&&r(Z,"value",null,de.value,B),(ie=de.onVnodeBeforeMount)&&ei(ie,F,D)}z&&fs(D,null,F,"beforeMount");const Y=Xv(H,S);Y&&S.beforeEnter(Z),i(Z,v,U),((ie=de&&de.onVnodeMounted)||Y||z)&&tn(()=>{ie&&ei(ie,F,D),Y&&S.enter(Z),z&&fs(D,null,F,"mounted")},H)},P=(D,v,U,F,H)=>{if(U&&h(D,U),F)for(let B=0;B<F.length;B++)h(D,F[B]);if(H){let B=H.subTree;if(v===B||Mm(B.type)&&(B.ssContent===v||B.ssFallback===v)){const J=H.vnode;P(D,J,J.scopeId,J.slotScopeIds,H.parent)}}},M=(D,v,U,F,H,B,J,X,Z=0)=>{for(let ie=Z;ie<D.length;ie++){const de=D[ie]=X?$i(D[ie]):ii(D[ie]);_(null,de,v,U,F,H,B,J,X)}},y=(D,v,U,F,H,B,J)=>{const X=v.el=D.el;let{patchFlag:Z,dynamicChildren:ie,dirs:de}=v;Z|=D.patchFlag&16;const T=D.props||vt,S=v.props||vt;let z;if(U&&hs(U,!1),(z=S.onVnodeBeforeUpdate)&&ei(z,U,v,D),de&&fs(v,D,U,"beforeUpdate"),U&&hs(U,!0),(T.innerHTML&&S.innerHTML==null||T.textContent&&S.textContent==null)&&u(X,""),ie?E(D.dynamicChildren,ie,X,U,F,Bl(v,H),B):J||N(D,v,X,null,U,F,Bl(v,H),B,!1),Z>0){if(Z&16)I(X,T,S,U,H);else if(Z&2&&T.class!==S.class&&r(X,"class",null,S.class,H),Z&4&&r(X,"style",T.style,S.style,H),Z&8){const Y=v.dynamicProps;for(let ce=0;ce<Y.length;ce++){const Q=Y[ce],Ae=T[Q],pe=S[Q];(pe!==Ae||Q==="value")&&r(X,Q,Ae,pe,H,U)}}Z&1&&D.children!==v.children&&u(X,v.children)}else!J&&ie==null&&I(X,T,S,U,H);((z=S.onVnodeUpdated)||de)&&tn(()=>{z&&ei(z,U,v,D),de&&fs(v,D,U,"updated")},F)},E=(D,v,U,F,H,B,J)=>{for(let X=0;X<v.length;X++){const Z=D[X],ie=v[X],de=Z.el&&(Z.type===ht||!Ms(Z,ie)||Z.shapeFlag&198)?f(Z.el):U;_(Z,ie,de,null,F,H,B,J,!0)}},I=(D,v,U,F,H)=>{if(v!==U){if(v!==vt)for(const B in v)!jr(B)&&!(B in U)&&r(D,B,v[B],null,H,F);for(const B in U){if(jr(B))continue;const J=U[B],X=v[B];J!==X&&B!=="value"&&r(D,B,X,J,H,F)}"value"in U&&r(D,"value",v.value,U.value,H)}},V=(D,v,U,F,H,B,J,X,Z)=>{const ie=v.el=D?D.el:a(""),de=v.anchor=D?D.anchor:a("");let{patchFlag:T,dynamicChildren:S,slotScopeIds:z}=v;z&&(X=X?X.concat(z):z),D==null?(i(ie,U,F),i(de,U,F),M(v.children||[],U,de,H,B,J,X,Z)):T>0&&T&64&&S&&D.dynamicChildren?(E(D.dynamicChildren,S,U,H,B,J,X),(v.key!=null||H&&v===H.subTree)&&uf(D,v,!0)):N(D,v,U,de,H,B,J,X,Z)},K=(D,v,U,F,H,B,J,X,Z)=>{v.slotScopeIds=X,D==null?v.shapeFlag&512?H.ctx.activate(v,U,F,J,Z):ee(v,U,F,H,B,J,Z):se(D,v,Z)},ee=(D,v,U,F,H,B,J)=>{const X=D.component=f0(D,F,H);if(dl(D)&&(X.ctx.renderer=fe),h0(X,!1,J),X.asyncDep){if(H&&H.registerDep(X,O,J),!D.el){const Z=X.subTree=dt(Yt);p(null,Z,v,U),D.placeholder=Z.el}}else O(X,D,v,U,H,B,J)},se=(D,v,U)=>{const F=v.component=D.component;if(t0(D,v,U))if(F.asyncDep&&!F.asyncResolved){k(F,v,U);return}else F.next=v,F.update();else v.el=D.el,F.vnode=v},O=(D,v,U,F,H,B,J)=>{const X=()=>{if(D.isMounted){let{next:T,bu:S,u:z,parent:Y,vnode:ce}=D;{const Pe=ym(D);if(Pe){T&&(T.el=ce.el,k(D,T,J)),Pe.asyncDep.then(()=>{D.isUnmounted||X()});return}}let Q=T,Ae;hs(D,!1),T?(T.el=ce.el,k(D,T,J)):T=ce,S&&ba(S),(Ae=T.props&&T.props.onVnodeBeforeUpdate)&&ei(Ae,Y,T,ce),hs(D,!0);const pe=ch(D),Ce=D.subTree;D.subTree=pe,_(Ce,pe,f(Ce.el),G(Ce),D,H,B),T.el=pe.el,Q===null&&n0(D,pe.el),z&&tn(z,H),(Ae=T.props&&T.props.onVnodeUpdated)&&tn(()=>ei(Ae,Y,T,ce),H)}else{let T;const{el:S,props:z}=v,{bm:Y,m:ce,parent:Q,root:Ae,type:pe}=D,Ce=hr(v);hs(D,!1),Y&&ba(Y),!Ce&&(T=z&&z.onVnodeBeforeMount)&&ei(T,Q,v),hs(D,!0);{Ae.ce&&Ae.ce._def.shadowRoot!==!1&&Ae.ce._injectChildStyle(pe);const Pe=D.subTree=ch(D);_(null,Pe,U,F,D,H,B),v.el=Pe.el}if(ce&&tn(ce,H),!Ce&&(T=z&&z.onVnodeMounted)){const Pe=v;tn(()=>ei(T,Q,Pe),H)}(v.shapeFlag&256||Q&&hr(Q.vnode)&&Q.vnode.shapeFlag&256)&&D.a&&tn(D.a,H),D.isMounted=!0,v=U=F=null}};D.scope.on();const Z=D.effect=new Ap(X);D.scope.off();const ie=D.update=Z.run.bind(Z),de=D.job=Z.runIfDirty.bind(Z);de.i=D,de.id=D.uid,Z.scheduler=()=>of(de),hs(D,!0),ie()},k=(D,v,U)=>{v.component=D;const F=D.vnode.props;D.vnode=v,D.next=null,Bv(D,v.props,F,U),Vv(D,v.children,U),Ci(),Zf(D),Pi()},N=(D,v,U,F,H,B,J,X,Z=!1)=>{const ie=D&&D.children,de=D?D.shapeFlag:0,T=v.children,{patchFlag:S,shapeFlag:z}=v;if(S>0){if(S&128){ye(ie,T,U,F,H,B,J,X,Z);return}else if(S&256){ue(ie,T,U,F,H,B,J,X,Z);return}}z&8?(de&16&&ge(ie,H,B),T!==ie&&u(U,T)):de&16?z&16?ye(ie,T,U,F,H,B,J,X,Z):ge(ie,H,B,!0):(de&8&&u(U,""),z&16&&M(T,U,F,H,B,J,X,Z))},ue=(D,v,U,F,H,B,J,X,Z)=>{D=D||cr,v=v||cr;const ie=D.length,de=v.length,T=Math.min(ie,de);let S;for(S=0;S<T;S++){const z=v[S]=Z?$i(v[S]):ii(v[S]);_(D[S],z,U,null,H,B,J,X,Z)}ie>de?ge(D,H,B,!0,!1,T):M(v,U,F,H,B,J,X,Z,T)},ye=(D,v,U,F,H,B,J,X,Z)=>{let ie=0;const de=v.length;let T=D.length-1,S=de-1;for(;ie<=T&&ie<=S;){const z=D[ie],Y=v[ie]=Z?$i(v[ie]):ii(v[ie]);if(Ms(z,Y))_(z,Y,U,null,H,B,J,X,Z);else break;ie++}for(;ie<=T&&ie<=S;){const z=D[T],Y=v[S]=Z?$i(v[S]):ii(v[S]);if(Ms(z,Y))_(z,Y,U,null,H,B,J,X,Z);else break;T--,S--}if(ie>T){if(ie<=S){const z=S+1,Y=z<de?v[z].el:F;for(;ie<=S;)_(null,v[ie]=Z?$i(v[ie]):ii(v[ie]),U,Y,H,B,J,X,Z),ie++}}else if(ie>S)for(;ie<=T;)Be(D[ie],H,B,!0),ie++;else{const z=ie,Y=ie,ce=new Map;for(ie=Y;ie<=S;ie++){const Ne=v[ie]=Z?$i(v[ie]):ii(v[ie]);Ne.key!=null&&ce.set(Ne.key,ie)}let Q,Ae=0;const pe=S-Y+1;let Ce=!1,Pe=0;const me=new Array(pe);for(ie=0;ie<pe;ie++)me[ie]=0;for(ie=z;ie<=T;ie++){const Ne=D[ie];if(Ae>=pe){Be(Ne,H,B,!0);continue}let Le;if(Ne.key!=null)Le=ce.get(Ne.key);else for(Q=Y;Q<=S;Q++)if(me[Q-Y]===0&&Ms(Ne,v[Q])){Le=Q;break}Le===void 0?Be(Ne,H,B,!0):(me[Le-Y]=ie+1,Le>=Pe?Pe=Le:Ce=!0,_(Ne,v[Le],U,null,H,B,J,X,Z),Ae++)}const we=Ce?$v(me):cr;for(Q=we.length-1,ie=pe-1;ie>=0;ie--){const Ne=Y+ie,Le=v[Ne],Me=v[Ne+1],je=Ne+1<de?Me.el||Me.placeholder:F;me[ie]===0?_(null,Le,U,je,H,B,J,X,Z):Ce&&(Q<0||ie!==we[Q]?Te(Le,U,je,2):Q--)}}},Te=(D,v,U,F,H=null)=>{const{el:B,type:J,transition:X,children:Z,shapeFlag:ie}=D;if(ie&6){Te(D.component.subTree,v,U,F);return}if(ie&128){D.suspense.move(v,U,F);return}if(ie&64){J.move(D,v,U,fe);return}if(J===ht){i(B,v,U);for(let T=0;T<Z.length;T++)Te(Z[T],v,U,F);i(D.anchor,v,U);return}if(J===Ta){b(D,v,U);return}if(F!==2&&ie&1&&X)if(F===0)X.beforeEnter(B),i(B,v,U),tn(()=>X.enter(B),H);else{const{leave:T,delayLeave:S,afterLeave:z}=X,Y=()=>{D.ctx.isUnmounted?s(B):i(B,v,U)},ce=()=>{T(B,()=>{Y(),z&&z()})};S?S(B,Y,ce):ce()}else i(B,v,U)},Be=(D,v,U,F=!1,H=!1)=>{const{type:B,props:J,ref:X,children:Z,dynamicChildren:ie,shapeFlag:de,patchFlag:T,dirs:S,cacheIndex:z}=D;if(T===-2&&(H=!1),X!=null&&(Ci(),Jr(X,null,U,D,!0),Pi()),z!=null&&(v.renderCache[z]=void 0),de&256){v.ctx.deactivate(D);return}const Y=de&1&&S,ce=!hr(D);let Q;if(ce&&(Q=J&&J.onVnodeBeforeUnmount)&&ei(Q,v,D),de&6)ae(D.component,U,F);else{if(de&128){D.suspense.unmount(U,F);return}Y&&fs(D,null,v,"beforeUnmount"),de&64?D.type.remove(D,v,U,fe,F):ie&&!ie.hasOnce&&(B!==ht||T>0&&T&64)?ge(ie,v,U,!1,!0):(B===ht&&T&384||!H&&de&16)&&ge(Z,v,U),F&&Ze(D)}(ce&&(Q=J&&J.onVnodeUnmounted)||Y)&&tn(()=>{Q&&ei(Q,v,D),Y&&fs(D,null,v,"unmounted")},U)},Ze=D=>{const{type:v,el:U,anchor:F,transition:H}=D;if(v===ht){Je(U,F);return}if(v===Ta){x(D);return}const B=()=>{s(U),H&&!H.persisted&&H.afterLeave&&H.afterLeave()};if(D.shapeFlag&1&&H&&!H.persisted){const{leave:J,delayLeave:X}=H,Z=()=>J(U,B);X?X(D.el,B,Z):Z()}else B()},Je=(D,v)=>{let U;for(;D!==v;)U=d(D),s(D),D=U;s(v)},ae=(D,v,U)=>{const{bum:F,scope:H,job:B,subTree:J,um:X,m:Z,a:ie,parent:de,slots:{__:T}}=D;lh(Z),lh(ie),F&&ba(F),de&&We(T)&&T.forEach(S=>{de.renderCache[S]=void 0}),H.stop(),B&&(B.flags|=8,Be(J,D,v,U)),X&&tn(X,v),tn(()=>{D.isUnmounted=!0},v),v&&v.pendingBranch&&!v.isUnmounted&&D.asyncDep&&!D.asyncResolved&&D.suspenseId===v.pendingId&&(v.deps--,v.deps===0&&v.resolve())},ge=(D,v,U,F=!1,H=!1,B=0)=>{for(let J=B;J<D.length;J++)Be(D[J],v,U,F,H)},G=D=>{if(D.shapeFlag&6)return G(D.component.subTree);if(D.shapeFlag&128)return D.suspense.next();const v=d(D.anchor||D.el),U=v&&v[Kp];return U?d(U):v};let le=!1;const oe=(D,v,U)=>{D==null?v._vnode&&Be(v._vnode,null,null,!0):_(v._vnode||null,D,v,null,null,null,U),v._vnode=D,le||(le=!0,Zf(),qp(),le=!1)},fe={p:_,um:Be,m:Te,r:Ze,mt:ee,mc:M,pc:N,pbc:E,n:G,o:n};return{render:oe,hydrate:void 0,createApp:Nv(oe)}}function Bl({type:n,props:e},t){return t==="svg"&&n==="foreignObject"||t==="mathml"&&n==="annotation-xml"&&e&&e.encoding&&e.encoding.includes("html")?void 0:t}function hs({effect:n,job:e},t){t?(n.flags|=32,e.flags|=4):(n.flags&=-33,e.flags&=-5)}function Xv(n,e){return(!n||n&&!n.pendingBranch)&&e&&!e.persisted}function uf(n,e,t=!1){const i=n.children,s=e.children;if(We(i)&&We(s))for(let r=0;r<i.length;r++){const o=i[r];let a=s[r];a.shapeFlag&1&&!a.dynamicChildren&&((a.patchFlag<=0||a.patchFlag===32)&&(a=s[r]=$i(s[r]),a.el=o.el),!t&&a.patchFlag!==-2&&uf(o,a)),a.type===gl&&(a.el=o.el),a.type===Yt&&!a.el&&(a.el=o.el)}}function $v(n){const e=n.slice(),t=[0];let i,s,r,o,a;const l=n.length;for(i=0;i<l;i++){const c=n[i];if(c!==0){if(s=t[t.length-1],n[s]<c){e[i]=s,t.push(i);continue}for(r=0,o=t.length-1;r<o;)a=r+o>>1,n[t[a]]<c?r=a+1:o=a;c<n[t[r]]&&(r>0&&(e[i]=t[r-1]),t[r]=i)}}for(r=t.length,o=t[r-1];r-- >0;)t[r]=o,o=e[o];return t}function ym(n){const e=n.subTree.component;if(e)return e.asyncDep&&!e.asyncResolved?e:ym(e)}function lh(n){if(n)for(let e=0;e<n.length;e++)n[e].flags|=8}const qv=Symbol.for("v-scx"),jv=()=>ci(qv);function Yv(n,e){return ff(n,null,e)}function dr(n,e,t){return ff(n,e,t)}function ff(n,e,t=vt){const{immediate:i,deep:s,flush:r,once:o}=t,a=Ht({},t),l=e&&i||!e&&r!=="post";let c;if(mo){if(r==="sync"){const h=jv();c=h.__watcherHandles||(h.__watcherHandles=[])}else if(!l){const h=()=>{};return h.stop=li,h.resume=li,h.pause=li,h}}const u=Kt;a.call=(h,g,_)=>Kn(h,u,g,_);let f=!1;r==="post"?a.scheduler=h=>{tn(h,u&&u.suspense)}:r!=="sync"&&(f=!0,a.scheduler=(h,g)=>{g?h():of(h)}),a.augmentJob=h=>{e&&(h.flags|=4),f&&(h.flags|=2,u&&(h.id=u.uid,h.i=u))};const d=rv(n,e,a);return mo&&(c?c.push(d):l&&d()),d}function Kv(n,e,t){const i=this.proxy,s=Dt(n)?n.includes(".")?Sm(i,n):()=>i[n]:n.bind(i,i);let r;Ye(e)?r=e:(r=e.handler,t=e);const o=Lo(this),a=ff(s,r.bind(i),t);return o(),a}function Sm(n,e){const t=e.split(".");return()=>{let i=n;for(let s=0;s<t.length&&i;s++)i=i[t[s]];return i}}const Zv=(n,e)=>e==="modelValue"||e==="model-value"?n.modelModifiers:n[`${e}Modifiers`]||n[`${Un(e)}Modifiers`]||n[`${ls(e)}Modifiers`];function Jv(n,e,...t){if(n.isUnmounted)return;const i=n.vnode.props||vt;let s=t;const r=e.startsWith("update:"),o=r&&Zv(i,e.slice(7));o&&(o.trim&&(s=t.map(u=>Dt(u)?u.trim():u)),o.number&&(s=t.map(za)));let a,l=i[a=Dl(e)]||i[a=Dl(Un(e))];!l&&r&&(l=i[a=Dl(ls(e))]),l&&Kn(l,n,6,s);const c=i[a+"Once"];if(c){if(!n.emitted)n.emitted={};else if(n.emitted[a])return;n.emitted[a]=!0,Kn(c,n,6,s)}}function bm(n,e,t=!1){const i=e.emitsCache,s=i.get(n);if(s!==void 0)return s;const r=n.emits;let o={},a=!1;if(!Ye(n)){const l=c=>{const u=bm(c,e,!0);u&&(a=!0,Ht(o,u))};!t&&e.mixins.length&&e.mixins.forEach(l),n.extends&&l(n.extends),n.mixins&&n.mixins.forEach(l)}return!r&&!a?(xt(n)&&i.set(n,null),null):(We(r)?r.forEach(l=>o[l]=null):Ht(o,r),xt(n)&&i.set(n,o),o)}function ml(n,e){return!n||!rl(e)?!1:(e=e.slice(2).replace(/Once$/,""),ft(n,e[0].toLowerCase()+e.slice(1))||ft(n,ls(e))||ft(n,e))}function ch(n){const{type:e,vnode:t,proxy:i,withProxy:s,propsOptions:[r],slots:o,attrs:a,emit:l,render:c,renderCache:u,props:f,data:d,setupState:h,ctx:g,inheritAttrs:_}=n,m=Xa(n);let p,C;try{if(t.shapeFlag&4){const x=s||i,w=x;p=ii(c.call(w,x,u,f,h,d,g)),C=a}else{const x=e;p=ii(x.length>1?x(f,{attrs:a,slots:o,emit:l}):x(f,null)),C=e.props?a:Qv(a)}}catch(x){eo.length=0,hl(x,n,1),p=dt(Yt)}let b=p;if(C&&_!==!1){const x=Object.keys(C),{shapeFlag:w}=b;x.length&&w&7&&(r&&x.some(ju)&&(C=e0(C,r)),b=ss(b,C,!1,!0))}return t.dirs&&(b=ss(b,null,!1,!0),b.dirs=b.dirs?b.dirs.concat(t.dirs):t.dirs),t.transition&&fo(b,t.transition),p=b,Xa(m),p}const Qv=n=>{let e;for(const t in n)(t==="class"||t==="style"||rl(t))&&((e||(e={}))[t]=n[t]);return e},e0=(n,e)=>{const t={};for(const i in n)(!ju(i)||!(i.slice(9)in e))&&(t[i]=n[i]);return t};function t0(n,e,t){const{props:i,children:s,component:r}=n,{props:o,children:a,patchFlag:l}=e,c=r.emitsOptions;if(e.dirs||e.transition)return!0;if(t&&l>=0){if(l&1024)return!0;if(l&16)return i?uh(i,o,c):!!o;if(l&8){const u=e.dynamicProps;for(let f=0;f<u.length;f++){const d=u[f];if(o[d]!==i[d]&&!ml(c,d))return!0}}}else return(s||a)&&(!a||!a.$stable)?!0:i===o?!1:i?o?uh(i,o,c):!0:!!o;return!1}function uh(n,e,t){const i=Object.keys(e);if(i.length!==Object.keys(n).length)return!0;for(let s=0;s<i.length;s++){const r=i[s];if(e[r]!==n[r]&&!ml(t,r))return!0}return!1}function n0({vnode:n,parent:e},t){for(;e;){const i=e.subTree;if(i.suspense&&i.suspense.activeBranch===n&&(i.el=n.el),i===n)(n=e.vnode).el=t,e=e.parent;else break}}const Mm=n=>n.__isSuspense;function i0(n,e){e&&e.pendingBranch?We(n)?e.effects.push(...n):e.effects.push(n):lv(n)}const ht=Symbol.for("v-fgt"),gl=Symbol.for("v-txt"),Yt=Symbol.for("v-cmt"),Ta=Symbol.for("v-stc"),eo=[];let Sn=null;function De(n=!1){eo.push(Sn=n?null:[])}function s0(){eo.pop(),Sn=eo[eo.length-1]||null}let ho=1;function fh(n,e=!1){ho+=n,n<0&&Sn&&e&&(Sn.hasOnce=!0)}function Em(n){return n.dynamicChildren=ho>0?Sn||cr:null,s0(),ho>0&&Sn&&Sn.push(n),n}function Oe(n,e,t,i,s,r){return Em(A(n,e,t,i,s,r,!0))}function es(n,e,t,i,s){return Em(dt(n,e,t,i,s,!0))}function po(n){return n?n.__v_isVNode===!0:!1}function Ms(n,e){return n.type===e.type&&n.key===e.key}const Tm=({key:n})=>n??null,wa=({ref:n,ref_key:e,ref_for:t})=>(typeof n=="number"&&(n=""+n),n!=null?Dt(n)||Pt(n)||Ye(n)?{i:Wt,r:n,k:e,f:!!t}:n:null);function A(n,e=null,t=null,i=0,s=null,r=n===ht?0:1,o=!1,a=!1){const l={__v_isVNode:!0,__v_skip:!0,type:n,props:e,key:e&&Tm(e),ref:e&&wa(e),scopeId:Yp,slotScopeIds:null,children:t,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetStart:null,targetAnchor:null,staticCount:0,shapeFlag:r,patchFlag:i,dynamicProps:s,dynamicChildren:null,appContext:null,ctx:Wt};return a?(df(l,t),r&128&&n.normalize(l)):t&&(l.shapeFlag|=Dt(t)?8:16),ho>0&&!o&&Sn&&(l.patchFlag>0||r&6)&&l.patchFlag!==32&&Sn.push(l),l}const dt=r0;function r0(n,e=null,t=null,i=0,s=null,r=!1){if((!n||n===Tv)&&(n=Yt),po(n)){const a=ss(n,e,!0);return t&&df(a,t),ho>0&&!r&&Sn&&(a.shapeFlag&6?Sn[Sn.indexOf(n)]=a:Sn.push(a)),a.patchFlag=-2,a}if(_0(n)&&(n=n.__vccOpts),e){e=o0(e);let{class:a,style:l}=e;a&&!Dt(a)&&(e.class=Vt(a)),xt(l)&&(sf(l)&&!We(l)&&(l=Ht({},l)),e.style=Dn(l))}const o=Dt(n)?1:Mm(n)?128:Zp(n)?64:xt(n)?4:Ye(n)?2:0;return A(n,e,t,i,s,o,r,!0)}function o0(n){return n?sf(n)||pm(n)?Ht({},n):n:null}function ss(n,e,t=!1,i=!1){const{props:s,ref:r,patchFlag:o,children:a,transition:l}=n,c=e?l0(s||{},e):s,u={__v_isVNode:!0,__v_skip:!0,type:n.type,props:c,key:c&&Tm(c),ref:e&&e.ref?t&&r?We(r)?r.concat(wa(e)):[r,wa(e)]:wa(e):r,scopeId:n.scopeId,slotScopeIds:n.slotScopeIds,children:a,target:n.target,targetStart:n.targetStart,targetAnchor:n.targetAnchor,staticCount:n.staticCount,shapeFlag:n.shapeFlag,patchFlag:e&&n.type!==ht?o===-1?16:o|16:o,dynamicProps:n.dynamicProps,dynamicChildren:n.dynamicChildren,appContext:n.appContext,dirs:n.dirs,transition:l,component:n.component,suspense:n.suspense,ssContent:n.ssContent&&ss(n.ssContent),ssFallback:n.ssFallback&&ss(n.ssFallback),placeholder:n.placeholder,el:n.el,anchor:n.anchor,ctx:n.ctx,ce:n.ce};return l&&i&&fo(u,l.clone(u)),u}function a0(n=" ",e=0){return dt(gl,null,n,e)}function hf(n,e){const t=dt(Ta,null,n);return t.staticCount=e,t}function Ct(n="",e=!1){return e?(De(),es(Yt,null,n)):dt(Yt,null,n)}function ii(n){return n==null||typeof n=="boolean"?dt(Yt):We(n)?dt(ht,null,n.slice()):po(n)?$i(n):dt(gl,null,String(n))}function $i(n){return n.el===null&&n.patchFlag!==-1||n.memo?n:ss(n)}function df(n,e){let t=0;const{shapeFlag:i}=n;if(e==null)e=null;else if(We(e))t=16;else if(typeof e=="object")if(i&65){const s=e.default;s&&(s._c&&(s._d=!1),df(n,s()),s._c&&(s._d=!0));return}else{t=32;const s=e._;!s&&!pm(e)?e._ctx=Wt:s===3&&Wt&&(Wt.slots._===1?e._=1:(e._=2,n.patchFlag|=1024))}else Ye(e)?(e={default:e,_ctx:Wt},t=32):(e=String(e),i&64?(t=16,e=[a0(e)]):t=8);n.children=e,n.shapeFlag|=t}function l0(...n){const e={};for(let t=0;t<n.length;t++){const i=n[t];for(const s in i)if(s==="class")e.class!==i.class&&(e.class=Vt([e.class,i.class]));else if(s==="style")e.style=Dn([e.style,i.style]);else if(rl(s)){const r=e[s],o=i[s];o&&r!==o&&!(We(r)&&r.includes(o))&&(e[s]=r?[].concat(r,o):o)}else s!==""&&(e[s]=i[s])}return e}function ei(n,e,t,i=null){Kn(n,e,7,[t,i])}const c0=fm();let u0=0;function f0(n,e,t){const i=n.type,s=(e?e.appContext:n.appContext)||c0,r={uid:u0++,vnode:n,type:i,parent:e,appContext:s,root:null,next:null,subTree:null,effect:null,update:null,job:null,scope:new Ep(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:e?e.provides:Object.create(s.provides),ids:e?e.ids:["",0,0],accessCache:null,renderCache:[],components:null,directives:null,propsOptions:gm(i,s),emitsOptions:bm(i,s),emit:null,emitted:null,propsDefaults:vt,inheritAttrs:i.inheritAttrs,ctx:vt,data:vt,props:vt,attrs:vt,slots:vt,refs:vt,setupState:vt,setupContext:null,suspense:t,suspenseId:t?t.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return r.ctx={_:r},r.root=e?e.root:r,r.emit=Jv.bind(null,r),n.ce&&n.ce(r),r}let Kt=null;const pf=()=>Kt||Wt;let qa,zc;{const n=cl(),e=(t,i)=>{let s;return(s=n[t])||(s=n[t]=[]),s.push(i),r=>{s.length>1?s.forEach(o=>o(r)):s[0](r)}};qa=e("__VUE_INSTANCE_SETTERS__",t=>Kt=t),zc=e("__VUE_SSR_SETTERS__",t=>mo=t)}const Lo=n=>{const e=Kt;return qa(n),n.scope.on(),()=>{n.scope.off(),qa(e)}},hh=()=>{Kt&&Kt.scope.off(),qa(null)};function wm(n){return n.vnode.shapeFlag&4}let mo=!1;function h0(n,e=!1,t=!1){e&&zc(e);const{props:i,children:s}=n.vnode,r=wm(n);Fv(n,i,r,e),Hv(n,s,t||e);const o=r?d0(n,e):void 0;return e&&zc(!1),o}function d0(n,e){const t=n.type;n.accessCache=Object.create(null),n.proxy=new Proxy(n.ctx,Rv);const{setup:i}=t;if(i){Ci();const s=n.setupContext=i.length>1?m0(n):null,r=Lo(n),o=Po(i,n,0,[n.props,s]),a=vp(o);if(Pi(),r(),(a||n.sp)&&!hr(n)&&rm(n),a){if(o.then(hh,hh),e)return o.then(l=>{dh(n,l)}).catch(l=>{hl(l,n,0)});n.asyncDep=o}else dh(n,o)}else Am(n)}function dh(n,e,t){Ye(e)?n.type.__ssrInlineRender?n.ssrRender=e:n.render=e:xt(e)&&(n.setupState=Wp(e)),Am(n)}function Am(n,e,t){const i=n.type;n.render||(n.render=i.render||li);{const s=Lo(n);Ci();try{Cv(n)}finally{Pi(),s()}}}const p0={get(n,e){return jt(n,"get",""),n[e]}};function m0(n){const e=t=>{n.exposed=t||{}};return{attrs:new Proxy(n.attrs,p0),slots:n.slots,emit:n.emit,expose:e}}function _l(n){return n.exposed?n.exposeProxy||(n.exposeProxy=new Proxy(Wp(rf(n.exposed)),{get(e,t){if(t in e)return e[t];if(t in Qr)return Qr[t](n)},has(e,t){return t in e||t in Qr}})):n.proxy}function g0(n,e=!0){return Ye(n)?n.displayName||n.name:n.name||e&&n.__name}function _0(n){return Ye(n)&&"__vccOpts"in n}const Et=(n,e)=>iv(n,e,mo);function mf(n,e,t){const i=arguments.length;return i===2?xt(e)&&!We(e)?po(e)?dt(n,null,[e]):dt(n,e):dt(n,null,e):(i>3?t=Array.prototype.slice.call(arguments,2):i===3&&po(t)&&(t=[t]),dt(n,e,t))}const v0="3.5.18";/**
* @vue/runtime-dom v3.5.18
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let Hc;const ph=typeof window<"u"&&window.trustedTypes;if(ph)try{Hc=ph.createPolicy("vue",{createHTML:n=>n})}catch{}const Rm=Hc?n=>Hc.createHTML(n):n=>n,x0="http://www.w3.org/2000/svg",y0="http://www.w3.org/1998/Math/MathML",Ei=typeof document<"u"?document:null,mh=Ei&&Ei.createElement("template"),S0={insert:(n,e,t)=>{e.insertBefore(n,t||null)},remove:n=>{const e=n.parentNode;e&&e.removeChild(n)},createElement:(n,e,t,i)=>{const s=e==="svg"?Ei.createElementNS(x0,n):e==="mathml"?Ei.createElementNS(y0,n):t?Ei.createElement(n,{is:t}):Ei.createElement(n);return n==="select"&&i&&i.multiple!=null&&s.setAttribute("multiple",i.multiple),s},createText:n=>Ei.createTextNode(n),createComment:n=>Ei.createComment(n),setText:(n,e)=>{n.nodeValue=e},setElementText:(n,e)=>{n.textContent=e},parentNode:n=>n.parentNode,nextSibling:n=>n.nextSibling,querySelector:n=>Ei.querySelector(n),setScopeId(n,e){n.setAttribute(e,"")},insertStaticContent(n,e,t,i,s,r){const o=t?t.previousSibling:e.lastChild;if(s&&(s===r||s.nextSibling))for(;e.insertBefore(s.cloneNode(!0),t),!(s===r||!(s=s.nextSibling)););else{mh.innerHTML=Rm(i==="svg"?`<svg>${n}</svg>`:i==="mathml"?`<math>${n}</math>`:n);const a=mh.content;if(i==="svg"||i==="mathml"){const l=a.firstChild;for(;l.firstChild;)a.appendChild(l.firstChild);a.removeChild(l)}e.insertBefore(a,t)}return[o?o.nextSibling:e.firstChild,t?t.previousSibling:e.lastChild]}},Ni="transition",Ur="animation",go=Symbol("_vtc"),Cm={name:String,type:String,css:{type:Boolean,default:!0},duration:[String,Number,Object],enterFromClass:String,enterActiveClass:String,enterToClass:String,appearFromClass:String,appearActiveClass:String,appearToClass:String,leaveFromClass:String,leaveActiveClass:String,leaveToClass:String},b0=Ht({},em,Cm),M0=n=>(n.displayName="Transition",n.props=b0,n),_o=M0((n,{slots:e})=>mf(dv,E0(n),e)),ds=(n,e=[])=>{We(n)?n.forEach(t=>t(...e)):n&&n(...e)},gh=n=>n?We(n)?n.some(e=>e.length>1):n.length>1:!1;function E0(n){const e={};for(const V in n)V in Cm||(e[V]=n[V]);if(n.css===!1)return e;const{name:t="v",type:i,duration:s,enterFromClass:r=`${t}-enter-from`,enterActiveClass:o=`${t}-enter-active`,enterToClass:a=`${t}-enter-to`,appearFromClass:l=r,appearActiveClass:c=o,appearToClass:u=a,leaveFromClass:f=`${t}-leave-from`,leaveActiveClass:d=`${t}-leave-active`,leaveToClass:h=`${t}-leave-to`}=n,g=T0(s),_=g&&g[0],m=g&&g[1],{onBeforeEnter:p,onEnter:C,onEnterCancelled:b,onLeave:x,onLeaveCancelled:w,onBeforeAppear:L=p,onAppear:P=C,onAppearCancelled:M=b}=e,y=(V,K,ee,se)=>{V._enterCancelled=se,ps(V,K?u:a),ps(V,K?c:o),ee&&ee()},E=(V,K)=>{V._isLeaving=!1,ps(V,f),ps(V,h),ps(V,d),K&&K()},I=V=>(K,ee)=>{const se=V?P:C,O=()=>y(K,V,ee);ds(se,[K,O]),_h(()=>{ps(K,V?l:r),gi(K,V?u:a),gh(se)||vh(K,i,_,O)})};return Ht(e,{onBeforeEnter(V){ds(p,[V]),gi(V,r),gi(V,o)},onBeforeAppear(V){ds(L,[V]),gi(V,l),gi(V,c)},onEnter:I(!1),onAppear:I(!0),onLeave(V,K){V._isLeaving=!0;const ee=()=>E(V,K);gi(V,f),V._enterCancelled?(gi(V,d),Sh()):(Sh(),gi(V,d)),_h(()=>{V._isLeaving&&(ps(V,f),gi(V,h),gh(x)||vh(V,i,m,ee))}),ds(x,[V,ee])},onEnterCancelled(V){y(V,!1,void 0,!0),ds(b,[V])},onAppearCancelled(V){y(V,!0,void 0,!0),ds(M,[V])},onLeaveCancelled(V){E(V),ds(w,[V])}})}function T0(n){if(n==null)return null;if(xt(n))return[kl(n.enter),kl(n.leave)];{const e=kl(n);return[e,e]}}function kl(n){return S_(n)}function gi(n,e){e.split(/\s+/).forEach(t=>t&&n.classList.add(t)),(n[go]||(n[go]=new Set)).add(e)}function ps(n,e){e.split(/\s+/).forEach(i=>i&&n.classList.remove(i));const t=n[go];t&&(t.delete(e),t.size||(n[go]=void 0))}function _h(n){requestAnimationFrame(()=>{requestAnimationFrame(n)})}let w0=0;function vh(n,e,t,i){const s=n._endId=++w0,r=()=>{s===n._endId&&i()};if(t!=null)return setTimeout(r,t);const{type:o,timeout:a,propCount:l}=A0(n,e);if(!o)return i();const c=o+"end";let u=0;const f=()=>{n.removeEventListener(c,d),r()},d=h=>{h.target===n&&++u>=l&&f()};setTimeout(()=>{u<l&&f()},a+1),n.addEventListener(c,d)}function A0(n,e){const t=window.getComputedStyle(n),i=g=>(t[g]||"").split(", "),s=i(`${Ni}Delay`),r=i(`${Ni}Duration`),o=xh(s,r),a=i(`${Ur}Delay`),l=i(`${Ur}Duration`),c=xh(a,l);let u=null,f=0,d=0;e===Ni?o>0&&(u=Ni,f=o,d=r.length):e===Ur?c>0&&(u=Ur,f=c,d=l.length):(f=Math.max(o,c),u=f>0?o>c?Ni:Ur:null,d=u?u===Ni?r.length:l.length:0);const h=u===Ni&&/\b(transform|all)(,|$)/.test(i(`${Ni}Property`).toString());return{type:u,timeout:f,propCount:d,hasTransform:h}}function xh(n,e){for(;n.length<e.length;)n=n.concat(n);return Math.max(...e.map((t,i)=>yh(t)+yh(n[i])))}function yh(n){return n==="auto"?0:Number(n.slice(0,-1).replace(",","."))*1e3}function Sh(){return document.body.offsetHeight}function R0(n,e,t){const i=n[go];i&&(e=(e?[e,...i]:[...i]).join(" ")),e==null?n.removeAttribute("class"):t?n.setAttribute("class",e):n.className=e}const ja=Symbol("_vod"),Pm=Symbol("_vsh"),C0={beforeMount(n,{value:e},{transition:t}){n[ja]=n.style.display==="none"?"":n.style.display,t&&e?t.beforeEnter(n):Nr(n,e)},mounted(n,{value:e},{transition:t}){t&&e&&t.enter(n)},updated(n,{value:e,oldValue:t},{transition:i}){!e!=!t&&(i?e?(i.beforeEnter(n),Nr(n,!0),i.enter(n)):i.leave(n,()=>{Nr(n,!1)}):Nr(n,e))},beforeUnmount(n,{value:e}){Nr(n,e)}};function Nr(n,e){n.style.display=e?n[ja]:"none",n[Pm]=!e}const P0=Symbol(""),D0=/(^|;)\s*display\s*:/;function L0(n,e,t){const i=n.style,s=Dt(t);let r=!1;if(t&&!s){if(e)if(Dt(e))for(const o of e.split(";")){const a=o.slice(0,o.indexOf(":")).trim();t[a]==null&&Aa(i,a,"")}else for(const o in e)t[o]==null&&Aa(i,o,"");for(const o in t)o==="display"&&(r=!0),Aa(i,o,t[o])}else if(s){if(e!==t){const o=i[P0];o&&(t+=";"+o),i.cssText=t,r=D0.test(t)}}else e&&n.removeAttribute("style");ja in n&&(n[ja]=r?i.display:"",n[Pm]&&(i.display="none"))}const bh=/\s*!important$/;function Aa(n,e,t){if(We(t))t.forEach(i=>Aa(n,e,i));else if(t==null&&(t=""),e.startsWith("--"))n.setProperty(e,t);else{const i=I0(n,e);bh.test(t)?n.setProperty(ls(i),t.replace(bh,""),"important"):n[i]=t}}const Mh=["Webkit","Moz","ms"],zl={};function I0(n,e){const t=zl[e];if(t)return t;let i=Un(e);if(i!=="filter"&&i in n)return zl[e]=i;i=ll(i);for(let s=0;s<Mh.length;s++){const r=Mh[s]+i;if(r in n)return zl[e]=r}return e}const Eh="http://www.w3.org/1999/xlink";function Th(n,e,t,i,s,r=A_(e)){i&&e.startsWith("xlink:")?t==null?n.removeAttributeNS(Eh,e.slice(6,e.length)):n.setAttributeNS(Eh,e,t):t==null||r&&!Sp(t)?n.removeAttribute(e):n.setAttribute(e,r?"":Yn(t)?String(t):t)}function wh(n,e,t,i,s){if(e==="innerHTML"||e==="textContent"){t!=null&&(n[e]=e==="innerHTML"?Rm(t):t);return}const r=n.tagName;if(e==="value"&&r!=="PROGRESS"&&!r.includes("-")){const a=r==="OPTION"?n.getAttribute("value")||"":n.value,l=t==null?n.type==="checkbox"?"on":"":String(t);(a!==l||!("_value"in n))&&(n.value=l),t==null&&n.removeAttribute(e),n._value=t;return}let o=!1;if(t===""||t==null){const a=typeof n[e];a==="boolean"?t=Sp(t):t==null&&a==="string"?(t="",o=!0):a==="number"&&(t=0,o=!0)}try{n[e]=t}catch{}o&&n.removeAttribute(s||e)}function Es(n,e,t,i){n.addEventListener(e,t,i)}function U0(n,e,t,i){n.removeEventListener(e,t,i)}const Ah=Symbol("_vei");function N0(n,e,t,i,s=null){const r=n[Ah]||(n[Ah]={}),o=r[e];if(i&&o)o.value=i;else{const[a,l]=O0(e);if(i){const c=r[e]=k0(i,s);Es(n,a,c,l)}else o&&(U0(n,a,o,l),r[e]=void 0)}}const Rh=/(?:Once|Passive|Capture)$/;function O0(n){let e;if(Rh.test(n)){e={};let i;for(;i=n.match(Rh);)n=n.slice(0,n.length-i[0].length),e[i[0].toLowerCase()]=!0}return[n[2]===":"?n.slice(3):ls(n.slice(2)),e]}let Hl=0;const F0=Promise.resolve(),B0=()=>Hl||(F0.then(()=>Hl=0),Hl=Date.now());function k0(n,e){const t=i=>{if(!i._vts)i._vts=Date.now();else if(i._vts<=t.attached)return;Kn(z0(i,t.value),e,5,[i])};return t.value=n,t.attached=B0(),t}function z0(n,e){if(We(e)){const t=n.stopImmediatePropagation;return n.stopImmediatePropagation=()=>{t.call(n),n._stopped=!0},e.map(i=>s=>!s._stopped&&i&&i(s))}else return e}const Ch=n=>n.charCodeAt(0)===111&&n.charCodeAt(1)===110&&n.charCodeAt(2)>96&&n.charCodeAt(2)<123,H0=(n,e,t,i,s,r)=>{const o=s==="svg";e==="class"?R0(n,i,o):e==="style"?L0(n,t,i):rl(e)?ju(e)||N0(n,e,t,i,r):(e[0]==="."?(e=e.slice(1),!0):e[0]==="^"?(e=e.slice(1),!1):V0(n,e,i,o))?(wh(n,e,i),!n.tagName.includes("-")&&(e==="value"||e==="checked"||e==="selected")&&Th(n,e,i,o,r,e!=="value")):n._isVueCE&&(/[A-Z]/.test(e)||!Dt(i))?wh(n,Un(e),i,r,e):(e==="true-value"?n._trueValue=i:e==="false-value"&&(n._falseValue=i),Th(n,e,i,o))};function V0(n,e,t,i){if(i)return!!(e==="innerHTML"||e==="textContent"||e in n&&Ch(e)&&Ye(t));if(e==="spellcheck"||e==="draggable"||e==="translate"||e==="autocorrect"||e==="form"||e==="list"&&n.tagName==="INPUT"||e==="type"&&n.tagName==="TEXTAREA")return!1;if(e==="width"||e==="height"){const s=n.tagName;if(s==="IMG"||s==="VIDEO"||s==="CANVAS"||s==="SOURCE")return!1}return Ch(e)&&Dt(t)?!1:e in n}const Ya=n=>{const e=n.props["onUpdate:modelValue"]||!1;return We(e)?t=>ba(e,t):e};function G0(n){n.target.composing=!0}function Ph(n){const e=n.target;e.composing&&(e.composing=!1,e.dispatchEvent(new Event("input")))}const pr=Symbol("_assign"),Ot={created(n,{modifiers:{lazy:e,trim:t,number:i}},s){n[pr]=Ya(s);const r=i||s.props&&s.props.type==="number";Es(n,e?"change":"input",o=>{if(o.target.composing)return;let a=n.value;t&&(a=a.trim()),r&&(a=za(a)),n[pr](a)}),t&&Es(n,"change",()=>{n.value=n.value.trim()}),e||(Es(n,"compositionstart",G0),Es(n,"compositionend",Ph),Es(n,"change",Ph))},mounted(n,{value:e}){n.value=e??""},beforeUpdate(n,{value:e,oldValue:t,modifiers:{lazy:i,trim:s,number:r}},o){if(n[pr]=Ya(o),n.composing)return;const a=(r||n.type==="number")&&!/^0\d/.test(n.value)?za(n.value):n.value,l=e??"";a!==l&&(document.activeElement===n&&n.type!=="range"&&(i&&e===t||s&&n.value.trim()===l)||(n.value=l))}},to={deep:!0,created(n,{value:e,modifiers:{number:t}},i){const s=ol(e);Es(n,"change",()=>{const r=Array.prototype.filter.call(n.options,o=>o.selected).map(o=>t?za(Ka(o)):Ka(o));n[pr](n.multiple?s?new Set(r):r:r[0]),n._assigning=!0,Do(()=>{n._assigning=!1})}),n[pr]=Ya(i)},mounted(n,{value:e}){Dh(n,e)},beforeUpdate(n,e,t){n[pr]=Ya(t)},updated(n,{value:e}){n._assigning||Dh(n,e)}};function Dh(n,e){const t=n.multiple,i=We(e);if(!(t&&!i&&!ol(e))){for(let s=0,r=n.options.length;s<r;s++){const o=n.options[s],a=Ka(o);if(t)if(i){const l=typeof a;l==="string"||l==="number"?o.selected=e.some(c=>String(c)===String(a)):o.selected=C_(e,a)>-1}else o.selected=e.has(a);else if(ul(Ka(o),e)){n.selectedIndex!==s&&(n.selectedIndex=s);return}}!t&&n.selectedIndex!==-1&&(n.selectedIndex=-1)}}function Ka(n){return"_value"in n?n._value:n.value}const W0=["ctrl","shift","alt","meta"],X0={stop:n=>n.stopPropagation(),prevent:n=>n.preventDefault(),self:n=>n.target!==n.currentTarget,ctrl:n=>!n.ctrlKey,shift:n=>!n.shiftKey,alt:n=>!n.altKey,meta:n=>!n.metaKey,left:n=>"button"in n&&n.button!==0,middle:n=>"button"in n&&n.button!==1,right:n=>"button"in n&&n.button!==2,exact:(n,e)=>W0.some(t=>n[`${t}Key`]&&!e.includes(t))},Or=(n,e)=>{const t=n._withMods||(n._withMods={}),i=e.join(".");return t[i]||(t[i]=(s,...r)=>{for(let o=0;o<e.length;o++){const a=X0[e[o]];if(a&&a(s,e))return}return n(s,...r)})},$0={esc:"escape",space:" ",up:"arrow-up",left:"arrow-left",right:"arrow-right",down:"arrow-down",delete:"backspace"},q0=(n,e)=>{const t=n._withKeys||(n._withKeys={}),i=e.join(".");return t[i]||(t[i]=s=>{if(!("key"in s))return;const r=ls(s.key);if(e.some(o=>o===r||$0[o]===r))return n(s)})},j0=Ht({patchProp:H0},S0);let Lh;function Y0(){return Lh||(Lh=Gv(j0))}const K0=(...n)=>{const e=Y0().createApp(...n),{mount:t}=e;return e.mount=i=>{const s=J0(i);if(!s)return;const r=e._component;!Ye(r)&&!r.render&&!r.template&&(r.template=s.innerHTML),s.nodeType===1&&(s.textContent="");const o=t(s,!1,Z0(s));return s instanceof Element&&(s.removeAttribute("v-cloak"),s.setAttribute("data-v-app","")),o},e};function Z0(n){if(n instanceof SVGElement)return"svg";if(typeof MathMLElement=="function"&&n instanceof MathMLElement)return"mathml"}function J0(n){return Dt(n)?document.querySelector(n):n}/*!
 * pinia v3.0.3
 * (c) 2025 Eduardo San Martin Morote
 * @license MIT
 */let Dm;const vl=n=>Dm=n,Lm=Symbol();function Vc(n){return n&&typeof n=="object"&&Object.prototype.toString.call(n)==="[object Object]"&&typeof n.toJSON!="function"}var no;(function(n){n.direct="direct",n.patchObject="patch object",n.patchFunction="patch function"})(no||(no={}));function Q0(){const n=Tp(!0),e=n.run(()=>Fe({}));let t=[],i=[];const s=rf({install(r){vl(s),s._a=r,r.provide(Lm,s),r.config.globalProperties.$pinia=s,i.forEach(o=>t.push(o)),i=[]},use(r){return this._a?t.push(r):i.push(r),this},_p:t,_a:null,_e:n,_s:new Map,state:e});return s}const Im=()=>{};function Ih(n,e,t,i=Im){n.push(e);const s=()=>{const r=n.indexOf(e);r>-1&&(n.splice(r,1),i())};return!t&&wp()&&P_(s),s}function Vs(n,...e){n.slice().forEach(t=>{t(...e)})}const ex=n=>n(),Uh=Symbol(),Vl=Symbol();function Gc(n,e){n instanceof Map&&e instanceof Map?e.forEach((t,i)=>n.set(i,t)):n instanceof Set&&e instanceof Set&&e.forEach(n.add,n);for(const t in e){if(!e.hasOwnProperty(t))continue;const i=e[t],s=n[t];Vc(s)&&Vc(i)&&n.hasOwnProperty(t)&&!Pt(i)&&!Qi(i)?n[t]=Gc(s,i):n[t]=i}return n}const tx=Symbol();function nx(n){return!Vc(n)||!Object.prototype.hasOwnProperty.call(n,tx)}const{assign:Gi}=Object;function ix(n){return!!(Pt(n)&&n.effect)}function sx(n,e,t,i){const{state:s,actions:r,getters:o}=e,a=t.state.value[n];let l;function c(){a||(t.state.value[n]=s?s():{});const u=Q_(t.state.value[n]);return Gi(u,r,Object.keys(o||{}).reduce((f,d)=>(f[d]=rf(Et(()=>{vl(t);const h=t._s.get(n);return o[d].call(h,h)})),f),{}))}return l=Um(n,c,e,t,i,!0),l}function Um(n,e,t={},i,s,r){let o;const a=Gi({actions:{}},t),l={deep:!0};let c,u,f=[],d=[],h;const g=i.state.value[n];!r&&!g&&(i.state.value[n]={}),Fe({});let _;function m(M){let y;c=u=!1,typeof M=="function"?(M(i.state.value[n]),y={type:no.patchFunction,storeId:n,events:h}):(Gc(i.state.value[n],M),y={type:no.patchObject,payload:M,storeId:n,events:h});const E=_=Symbol();Do().then(()=>{_===E&&(c=!0)}),u=!0,Vs(f,y,i.state.value[n])}const p=r?function(){const{state:y}=t,E=y?y():{};this.$patch(I=>{Gi(I,E)})}:Im;function C(){o.stop(),f=[],d=[],i._s.delete(n)}const b=(M,y="")=>{if(Uh in M)return M[Vl]=y,M;const E=function(){vl(i);const I=Array.from(arguments),V=[],K=[];function ee(k){V.push(k)}function se(k){K.push(k)}Vs(d,{args:I,name:E[Vl],store:w,after:ee,onError:se});let O;try{O=M.apply(this&&this.$id===n?this:w,I)}catch(k){throw Vs(K,k),k}return O instanceof Promise?O.then(k=>(Vs(V,k),k)).catch(k=>(Vs(K,k),Promise.reject(k))):(Vs(V,O),O)};return E[Uh]=!0,E[Vl]=y,E},x={_p:i,$id:n,$onAction:Ih.bind(null,d),$patch:m,$reset:p,$subscribe(M,y={}){const E=Ih(f,M,y.detached,()=>I()),I=o.run(()=>dr(()=>i.state.value[n],V=>{(y.flush==="sync"?u:c)&&M({storeId:n,type:no.direct,events:h},V)},Gi({},l,y)));return E},$dispose:C},w=Co(x);i._s.set(n,w);const P=(i._a&&i._a.runWithContext||ex)(()=>i._e.run(()=>(o=Tp()).run(()=>e({action:b}))));for(const M in P){const y=P[M];if(Pt(y)&&!ix(y)||Qi(y))r||(g&&nx(y)&&(Pt(y)?y.value=g[M]:Gc(y,g[M])),i.state.value[n][M]=y);else if(typeof y=="function"){const E=b(y,M);P[M]=E,a.actions[M]=y}}return Gi(w,P),Gi(rt(w),P),Object.defineProperty(w,"$state",{get:()=>i.state.value[n],set:M=>{m(y=>{Gi(y,M)})}}),i._p.forEach(M=>{Gi(w,o.run(()=>M({store:w,app:i._a,pinia:i,options:a})))}),g&&r&&t.hydrate&&t.hydrate(w.$state,g),c=!0,u=!0,w}/*! #__NO_SIDE_EFFECTS__ */function Nm(n,e,t){let i;const s=typeof e=="function";i=s?t:e;function r(o,a){const l=Ov();return o=o||(l?ci(Lm,null):null),o&&vl(o),o=Dm,o._s.has(n)||(s?Um(n,e,i,o):sx(n,i,o)),o._s.get(n)}return r.$id=n,r}const rx="/background.mp4",On=(n,e)=>{const t=n.__vccOpts||n;for(const[i,s]of e)t[i]=s;return t},ox={},ax={id:"app"};function lx(n,e){const t=af("router-view");return De(),Oe("div",ax,[e[0]||(e[0]=A("video",{class:"video-background",autoplay:"",muted:"",loop:""},[A("source",{src:rx,type:"video/mp4"})],-1)),dt(t)])}const cx=On(ox,[["render",lx]]);/*!
  * vue-router v4.5.1
  * (c) 2025 Eduardo San Martin Morote
  * @license MIT
  */const sr=typeof document<"u";function Om(n){return typeof n=="object"||"displayName"in n||"props"in n||"__vccOpts"in n}function ux(n){return n.__esModule||n[Symbol.toStringTag]==="Module"||n.default&&Om(n.default)}const ut=Object.assign;function Gl(n,e){const t={};for(const i in e){const s=e[i];t[i]=Zn(s)?s.map(n):n(s)}return t}const io=()=>{},Zn=Array.isArray,Fm=/#/g,fx=/&/g,hx=/\//g,dx=/=/g,px=/\?/g,Bm=/\+/g,mx=/%5B/g,gx=/%5D/g,km=/%5E/g,_x=/%60/g,zm=/%7B/g,vx=/%7C/g,Hm=/%7D/g,xx=/%20/g;function gf(n){return encodeURI(""+n).replace(vx,"|").replace(mx,"[").replace(gx,"]")}function yx(n){return gf(n).replace(zm,"{").replace(Hm,"}").replace(km,"^")}function Wc(n){return gf(n).replace(Bm,"%2B").replace(xx,"+").replace(Fm,"%23").replace(fx,"%26").replace(_x,"`").replace(zm,"{").replace(Hm,"}").replace(km,"^")}function Sx(n){return Wc(n).replace(dx,"%3D")}function bx(n){return gf(n).replace(Fm,"%23").replace(px,"%3F")}function Mx(n){return n==null?"":bx(n).replace(hx,"%2F")}function vo(n){try{return decodeURIComponent(""+n)}catch{}return""+n}const Ex=/\/$/,Tx=n=>n.replace(Ex,"");function Wl(n,e,t="/"){let i,s={},r="",o="";const a=e.indexOf("#");let l=e.indexOf("?");return a<l&&a>=0&&(l=-1),l>-1&&(i=e.slice(0,l),r=e.slice(l+1,a>-1?a:e.length),s=n(r)),a>-1&&(i=i||e.slice(0,a),o=e.slice(a,e.length)),i=Cx(i??e,t),{fullPath:i+(r&&"?")+r+o,path:i,query:s,hash:vo(o)}}function wx(n,e){const t=e.query?n(e.query):"";return e.path+(t&&"?")+t+(e.hash||"")}function Nh(n,e){return!e||!n.toLowerCase().startsWith(e.toLowerCase())?n:n.slice(e.length)||"/"}function Ax(n,e,t){const i=e.matched.length-1,s=t.matched.length-1;return i>-1&&i===s&&xr(e.matched[i],t.matched[s])&&Vm(e.params,t.params)&&n(e.query)===n(t.query)&&e.hash===t.hash}function xr(n,e){return(n.aliasOf||n)===(e.aliasOf||e)}function Vm(n,e){if(Object.keys(n).length!==Object.keys(e).length)return!1;for(const t in n)if(!Rx(n[t],e[t]))return!1;return!0}function Rx(n,e){return Zn(n)?Oh(n,e):Zn(e)?Oh(e,n):n===e}function Oh(n,e){return Zn(e)?n.length===e.length&&n.every((t,i)=>t===e[i]):n.length===1&&n[0]===e}function Cx(n,e){if(n.startsWith("/"))return n;if(!n)return e;const t=e.split("/"),i=n.split("/"),s=i[i.length-1];(s===".."||s===".")&&i.push("");let r=t.length-1,o,a;for(o=0;o<i.length;o++)if(a=i[o],a!==".")if(a==="..")r>1&&r--;else break;return t.slice(0,r).join("/")+"/"+i.slice(o).join("/")}const Oi={path:"/",name:void 0,params:{},query:{},hash:"",fullPath:"/",matched:[],meta:{},redirectedFrom:void 0};var xo;(function(n){n.pop="pop",n.push="push"})(xo||(xo={}));var so;(function(n){n.back="back",n.forward="forward",n.unknown=""})(so||(so={}));function Px(n){if(!n)if(sr){const e=document.querySelector("base");n=e&&e.getAttribute("href")||"/",n=n.replace(/^\w+:\/\/[^\/]+/,"")}else n="/";return n[0]!=="/"&&n[0]!=="#"&&(n="/"+n),Tx(n)}const Dx=/^[^#]+#/;function Lx(n,e){return n.replace(Dx,"#")+e}function Ix(n,e){const t=document.documentElement.getBoundingClientRect(),i=n.getBoundingClientRect();return{behavior:e.behavior,left:i.left-t.left-(e.left||0),top:i.top-t.top-(e.top||0)}}const xl=()=>({left:window.scrollX,top:window.scrollY});function Ux(n){let e;if("el"in n){const t=n.el,i=typeof t=="string"&&t.startsWith("#"),s=typeof t=="string"?i?document.getElementById(t.slice(1)):document.querySelector(t):t;if(!s)return;e=Ix(s,n)}else e=n;"scrollBehavior"in document.documentElement.style?window.scrollTo(e):window.scrollTo(e.left!=null?e.left:window.scrollX,e.top!=null?e.top:window.scrollY)}function Fh(n,e){return(history.state?history.state.position-e:-1)+n}const Xc=new Map;function Nx(n,e){Xc.set(n,e)}function Ox(n){const e=Xc.get(n);return Xc.delete(n),e}let Fx=()=>location.protocol+"//"+location.host;function Gm(n,e){const{pathname:t,search:i,hash:s}=e,r=n.indexOf("#");if(r>-1){let a=s.includes(n.slice(r))?n.slice(r).length:1,l=s.slice(a);return l[0]!=="/"&&(l="/"+l),Nh(l,"")}return Nh(t,n)+i+s}function Bx(n,e,t,i){let s=[],r=[],o=null;const a=({state:d})=>{const h=Gm(n,location),g=t.value,_=e.value;let m=0;if(d){if(t.value=h,e.value=d,o&&o===g){o=null;return}m=_?d.position-_.position:0}else i(h);s.forEach(p=>{p(t.value,g,{delta:m,type:xo.pop,direction:m?m>0?so.forward:so.back:so.unknown})})};function l(){o=t.value}function c(d){s.push(d);const h=()=>{const g=s.indexOf(d);g>-1&&s.splice(g,1)};return r.push(h),h}function u(){const{history:d}=window;d.state&&d.replaceState(ut({},d.state,{scroll:xl()}),"")}function f(){for(const d of r)d();r=[],window.removeEventListener("popstate",a),window.removeEventListener("beforeunload",u)}return window.addEventListener("popstate",a),window.addEventListener("beforeunload",u,{passive:!0}),{pauseListeners:l,listen:c,destroy:f}}function Bh(n,e,t,i=!1,s=!1){return{back:n,current:e,forward:t,replaced:i,position:window.history.length,scroll:s?xl():null}}function kx(n){const{history:e,location:t}=window,i={value:Gm(n,t)},s={value:e.state};s.value||r(i.value,{back:null,current:i.value,forward:null,position:e.length-1,replaced:!0,scroll:null},!0);function r(l,c,u){const f=n.indexOf("#"),d=f>-1?(t.host&&document.querySelector("base")?n:n.slice(f))+l:Fx()+n+l;try{e[u?"replaceState":"pushState"](c,"",d),s.value=c}catch{t[u?"replace":"assign"](d)}}function o(l,c){const u=ut({},e.state,Bh(s.value.back,l,s.value.forward,!0),c,{position:s.value.position});r(l,u,!0),i.value=l}function a(l,c){const u=ut({},s.value,e.state,{forward:l,scroll:xl()});r(u.current,u,!0);const f=ut({},Bh(i.value,l,null),{position:u.position+1},c);r(l,f,!1),i.value=l}return{location:i,state:s,push:a,replace:o}}function zx(n){n=Px(n);const e=kx(n),t=Bx(n,e.state,e.location,e.replace);function i(r,o=!0){o||t.pauseListeners(),history.go(r)}const s=ut({location:"",base:n,go:i,createHref:Lx.bind(null,n)},e,t);return Object.defineProperty(s,"location",{enumerable:!0,get:()=>e.location.value}),Object.defineProperty(s,"state",{enumerable:!0,get:()=>e.state.value}),s}function Hx(n){return typeof n=="string"||n&&typeof n=="object"}function Wm(n){return typeof n=="string"||typeof n=="symbol"}const Xm=Symbol("");var kh;(function(n){n[n.aborted=4]="aborted",n[n.cancelled=8]="cancelled",n[n.duplicated=16]="duplicated"})(kh||(kh={}));function yr(n,e){return ut(new Error,{type:n,[Xm]:!0},e)}function _i(n,e){return n instanceof Error&&Xm in n&&(e==null||!!(n.type&e))}const zh="[^/]+?",Vx={sensitive:!1,strict:!1,start:!0,end:!0},Gx=/[.+*?^${}()[\]/\\]/g;function Wx(n,e){const t=ut({},Vx,e),i=[];let s=t.start?"^":"";const r=[];for(const c of n){const u=c.length?[]:[90];t.strict&&!c.length&&(s+="/");for(let f=0;f<c.length;f++){const d=c[f];let h=40+(t.sensitive?.25:0);if(d.type===0)f||(s+="/"),s+=d.value.replace(Gx,"\\$&"),h+=40;else if(d.type===1){const{value:g,repeatable:_,optional:m,regexp:p}=d;r.push({name:g,repeatable:_,optional:m});const C=p||zh;if(C!==zh){h+=10;try{new RegExp(`(${C})`)}catch(x){throw new Error(`Invalid custom RegExp for param "${g}" (${C}): `+x.message)}}let b=_?`((?:${C})(?:/(?:${C}))*)`:`(${C})`;f||(b=m&&c.length<2?`(?:/${b})`:"/"+b),m&&(b+="?"),s+=b,h+=20,m&&(h+=-8),_&&(h+=-20),C===".*"&&(h+=-50)}u.push(h)}i.push(u)}if(t.strict&&t.end){const c=i.length-1;i[c][i[c].length-1]+=.7000000000000001}t.strict||(s+="/?"),t.end?s+="$":t.strict&&!s.endsWith("/")&&(s+="(?:/|$)");const o=new RegExp(s,t.sensitive?"":"i");function a(c){const u=c.match(o),f={};if(!u)return null;for(let d=1;d<u.length;d++){const h=u[d]||"",g=r[d-1];f[g.name]=h&&g.repeatable?h.split("/"):h}return f}function l(c){let u="",f=!1;for(const d of n){(!f||!u.endsWith("/"))&&(u+="/"),f=!1;for(const h of d)if(h.type===0)u+=h.value;else if(h.type===1){const{value:g,repeatable:_,optional:m}=h,p=g in c?c[g]:"";if(Zn(p)&&!_)throw new Error(`Provided param "${g}" is an array but it is not repeatable (* or + modifiers)`);const C=Zn(p)?p.join("/"):p;if(!C)if(m)d.length<2&&(u.endsWith("/")?u=u.slice(0,-1):f=!0);else throw new Error(`Missing required param "${g}"`);u+=C}}return u||"/"}return{re:o,score:i,keys:r,parse:a,stringify:l}}function Xx(n,e){let t=0;for(;t<n.length&&t<e.length;){const i=e[t]-n[t];if(i)return i;t++}return n.length<e.length?n.length===1&&n[0]===80?-1:1:n.length>e.length?e.length===1&&e[0]===80?1:-1:0}function $m(n,e){let t=0;const i=n.score,s=e.score;for(;t<i.length&&t<s.length;){const r=Xx(i[t],s[t]);if(r)return r;t++}if(Math.abs(s.length-i.length)===1){if(Hh(i))return 1;if(Hh(s))return-1}return s.length-i.length}function Hh(n){const e=n[n.length-1];return n.length>0&&e[e.length-1]<0}const $x={type:0,value:""},qx=/[a-zA-Z0-9_]/;function jx(n){if(!n)return[[]];if(n==="/")return[[$x]];if(!n.startsWith("/"))throw new Error(`Invalid path "${n}"`);function e(h){throw new Error(`ERR (${t})/"${c}": ${h}`)}let t=0,i=t;const s=[];let r;function o(){r&&s.push(r),r=[]}let a=0,l,c="",u="";function f(){c&&(t===0?r.push({type:0,value:c}):t===1||t===2||t===3?(r.length>1&&(l==="*"||l==="+")&&e(`A repeatable param (${c}) must be alone in its segment. eg: '/:ids+.`),r.push({type:1,value:c,regexp:u,repeatable:l==="*"||l==="+",optional:l==="*"||l==="?"})):e("Invalid state to consume buffer"),c="")}function d(){c+=l}for(;a<n.length;){if(l=n[a++],l==="\\"&&t!==2){i=t,t=4;continue}switch(t){case 0:l==="/"?(c&&f(),o()):l===":"?(f(),t=1):d();break;case 4:d(),t=i;break;case 1:l==="("?t=2:qx.test(l)?d():(f(),t=0,l!=="*"&&l!=="?"&&l!=="+"&&a--);break;case 2:l===")"?u[u.length-1]=="\\"?u=u.slice(0,-1)+l:t=3:u+=l;break;case 3:f(),t=0,l!=="*"&&l!=="?"&&l!=="+"&&a--,u="";break;default:e("Unknown state");break}}return t===2&&e(`Unfinished custom RegExp for param "${c}"`),f(),o(),s}function Yx(n,e,t){const i=Wx(jx(n.path),t),s=ut(i,{record:n,parent:e,children:[],alias:[]});return e&&!s.record.aliasOf==!e.record.aliasOf&&e.children.push(s),s}function Kx(n,e){const t=[],i=new Map;e=Xh({strict:!1,end:!0,sensitive:!1},e);function s(f){return i.get(f)}function r(f,d,h){const g=!h,_=Gh(f);_.aliasOf=h&&h.record;const m=Xh(e,f),p=[_];if("alias"in f){const x=typeof f.alias=="string"?[f.alias]:f.alias;for(const w of x)p.push(Gh(ut({},_,{components:h?h.record.components:_.components,path:w,aliasOf:h?h.record:_})))}let C,b;for(const x of p){const{path:w}=x;if(d&&w[0]!=="/"){const L=d.record.path,P=L[L.length-1]==="/"?"":"/";x.path=d.record.path+(w&&P+w)}if(C=Yx(x,d,m),h?h.alias.push(C):(b=b||C,b!==C&&b.alias.push(C),g&&f.name&&!Wh(C)&&o(f.name)),qm(C)&&l(C),_.children){const L=_.children;for(let P=0;P<L.length;P++)r(L[P],C,h&&h.children[P])}h=h||C}return b?()=>{o(b)}:io}function o(f){if(Wm(f)){const d=i.get(f);d&&(i.delete(f),t.splice(t.indexOf(d),1),d.children.forEach(o),d.alias.forEach(o))}else{const d=t.indexOf(f);d>-1&&(t.splice(d,1),f.record.name&&i.delete(f.record.name),f.children.forEach(o),f.alias.forEach(o))}}function a(){return t}function l(f){const d=Qx(f,t);t.splice(d,0,f),f.record.name&&!Wh(f)&&i.set(f.record.name,f)}function c(f,d){let h,g={},_,m;if("name"in f&&f.name){if(h=i.get(f.name),!h)throw yr(1,{location:f});m=h.record.name,g=ut(Vh(d.params,h.keys.filter(b=>!b.optional).concat(h.parent?h.parent.keys.filter(b=>b.optional):[]).map(b=>b.name)),f.params&&Vh(f.params,h.keys.map(b=>b.name))),_=h.stringify(g)}else if(f.path!=null)_=f.path,h=t.find(b=>b.re.test(_)),h&&(g=h.parse(_),m=h.record.name);else{if(h=d.name?i.get(d.name):t.find(b=>b.re.test(d.path)),!h)throw yr(1,{location:f,currentLocation:d});m=h.record.name,g=ut({},d.params,f.params),_=h.stringify(g)}const p=[];let C=h;for(;C;)p.unshift(C.record),C=C.parent;return{name:m,path:_,params:g,matched:p,meta:Jx(p)}}n.forEach(f=>r(f));function u(){t.length=0,i.clear()}return{addRoute:r,resolve:c,removeRoute:o,clearRoutes:u,getRoutes:a,getRecordMatcher:s}}function Vh(n,e){const t={};for(const i of e)i in n&&(t[i]=n[i]);return t}function Gh(n){const e={path:n.path,redirect:n.redirect,name:n.name,meta:n.meta||{},aliasOf:n.aliasOf,beforeEnter:n.beforeEnter,props:Zx(n),children:n.children||[],instances:{},leaveGuards:new Set,updateGuards:new Set,enterCallbacks:{},components:"components"in n?n.components||null:n.component&&{default:n.component}};return Object.defineProperty(e,"mods",{value:{}}),e}function Zx(n){const e={},t=n.props||!1;if("component"in n)e.default=t;else for(const i in n.components)e[i]=typeof t=="object"?t[i]:t;return e}function Wh(n){for(;n;){if(n.record.aliasOf)return!0;n=n.parent}return!1}function Jx(n){return n.reduce((e,t)=>ut(e,t.meta),{})}function Xh(n,e){const t={};for(const i in n)t[i]=i in e?e[i]:n[i];return t}function Qx(n,e){let t=0,i=e.length;for(;t!==i;){const r=t+i>>1;$m(n,e[r])<0?i=r:t=r+1}const s=ey(n);return s&&(i=e.lastIndexOf(s,i-1)),i}function ey(n){let e=n;for(;e=e.parent;)if(qm(e)&&$m(n,e)===0)return e}function qm({record:n}){return!!(n.name||n.components&&Object.keys(n.components).length||n.redirect)}function ty(n){const e={};if(n===""||n==="?")return e;const i=(n[0]==="?"?n.slice(1):n).split("&");for(let s=0;s<i.length;++s){const r=i[s].replace(Bm," "),o=r.indexOf("="),a=vo(o<0?r:r.slice(0,o)),l=o<0?null:vo(r.slice(o+1));if(a in e){let c=e[a];Zn(c)||(c=e[a]=[c]),c.push(l)}else e[a]=l}return e}function $h(n){let e="";for(let t in n){const i=n[t];if(t=Sx(t),i==null){i!==void 0&&(e+=(e.length?"&":"")+t);continue}(Zn(i)?i.map(r=>r&&Wc(r)):[i&&Wc(i)]).forEach(r=>{r!==void 0&&(e+=(e.length?"&":"")+t,r!=null&&(e+="="+r))})}return e}function ny(n){const e={};for(const t in n){const i=n[t];i!==void 0&&(e[t]=Zn(i)?i.map(s=>s==null?null:""+s):i==null?i:""+i)}return e}const iy=Symbol(""),qh=Symbol(""),_f=Symbol(""),jm=Symbol(""),$c=Symbol("");function Fr(){let n=[];function e(i){return n.push(i),()=>{const s=n.indexOf(i);s>-1&&n.splice(s,1)}}function t(){n=[]}return{add:e,list:()=>n.slice(),reset:t}}function qi(n,e,t,i,s,r=o=>o()){const o=i&&(i.enterCallbacks[s]=i.enterCallbacks[s]||[]);return()=>new Promise((a,l)=>{const c=d=>{d===!1?l(yr(4,{from:t,to:e})):d instanceof Error?l(d):Hx(d)?l(yr(2,{from:e,to:d})):(o&&i.enterCallbacks[s]===o&&typeof d=="function"&&o.push(d),a())},u=r(()=>n.call(i&&i.instances[s],e,t,c));let f=Promise.resolve(u);n.length<3&&(f=f.then(c)),f.catch(d=>l(d))})}function Xl(n,e,t,i,s=r=>r()){const r=[];for(const o of n)for(const a in o.components){let l=o.components[a];if(!(e!=="beforeRouteEnter"&&!o.instances[a]))if(Om(l)){const u=(l.__vccOpts||l)[e];u&&r.push(qi(u,t,i,o,a,s))}else{let c=l();r.push(()=>c.then(u=>{if(!u)throw new Error(`Couldn't resolve component "${a}" at "${o.path}"`);const f=ux(u)?u.default:u;o.mods[a]=u,o.components[a]=f;const h=(f.__vccOpts||f)[e];return h&&qi(h,t,i,o,a,s)()}))}}return r}function jh(n){const e=ci(_f),t=ci(jm),i=Et(()=>{const l=Vn(n.to);return e.resolve(l)}),s=Et(()=>{const{matched:l}=i.value,{length:c}=l,u=l[c-1],f=t.matched;if(!u||!f.length)return-1;const d=f.findIndex(xr.bind(null,u));if(d>-1)return d;const h=Yh(l[c-2]);return c>1&&Yh(u)===h&&f[f.length-1].path!==h?f.findIndex(xr.bind(null,l[c-2])):d}),r=Et(()=>s.value>-1&&ly(t.params,i.value.params)),o=Et(()=>s.value>-1&&s.value===t.matched.length-1&&Vm(t.params,i.value.params));function a(l={}){if(ay(l)){const c=e[Vn(n.replace)?"replace":"push"](Vn(n.to)).catch(io);return n.viewTransition&&typeof document<"u"&&"startViewTransition"in document&&document.startViewTransition(()=>c),c}return Promise.resolve()}return{route:i,href:Et(()=>i.value.href),isActive:r,isExactActive:o,navigate:a}}function sy(n){return n.length===1?n[0]:n}const ry=Nn({name:"RouterLink",compatConfig:{MODE:3},props:{to:{type:[String,Object],required:!0},replace:Boolean,activeClass:String,exactActiveClass:String,custom:Boolean,ariaCurrentValue:{type:String,default:"page"},viewTransition:Boolean},useLink:jh,setup(n,{slots:e}){const t=Co(jh(n)),{options:i}=ci(_f),s=Et(()=>({[Kh(n.activeClass,i.linkActiveClass,"router-link-active")]:t.isActive,[Kh(n.exactActiveClass,i.linkExactActiveClass,"router-link-exact-active")]:t.isExactActive}));return()=>{const r=e.default&&sy(e.default(t));return n.custom?r:mf("a",{"aria-current":t.isExactActive?n.ariaCurrentValue:null,href:t.href,onClick:t.navigate,class:s.value},r)}}}),oy=ry;function ay(n){if(!(n.metaKey||n.altKey||n.ctrlKey||n.shiftKey)&&!n.defaultPrevented&&!(n.button!==void 0&&n.button!==0)){if(n.currentTarget&&n.currentTarget.getAttribute){const e=n.currentTarget.getAttribute("target");if(/\b_blank\b/i.test(e))return}return n.preventDefault&&n.preventDefault(),!0}}function ly(n,e){for(const t in e){const i=e[t],s=n[t];if(typeof i=="string"){if(i!==s)return!1}else if(!Zn(s)||s.length!==i.length||i.some((r,o)=>r!==s[o]))return!1}return!0}function Yh(n){return n?n.aliasOf?n.aliasOf.path:n.path:""}const Kh=(n,e,t)=>n??e??t,cy=Nn({name:"RouterView",inheritAttrs:!1,props:{name:{type:String,default:"default"},route:Object},compatConfig:{MODE:3},setup(n,{attrs:e,slots:t}){const i=ci($c),s=Et(()=>n.route||i.value),r=ci(qh,0),o=Et(()=>{let c=Vn(r);const{matched:u}=s.value;let f;for(;(f=u[c])&&!f.components;)c++;return c}),a=Et(()=>s.value.matched[o.value]);Ea(qh,Et(()=>o.value+1)),Ea(iy,a),Ea($c,s);const l=Fe();return dr(()=>[l.value,a.value,n.name],([c,u,f],[d,h,g])=>{u&&(u.instances[f]=c,h&&h!==u&&c&&c===d&&(u.leaveGuards.size||(u.leaveGuards=h.leaveGuards),u.updateGuards.size||(u.updateGuards=h.updateGuards))),c&&u&&(!h||!xr(u,h)||!d)&&(u.enterCallbacks[f]||[]).forEach(_=>_(c))},{flush:"post"}),()=>{const c=s.value,u=n.name,f=a.value,d=f&&f.components[u];if(!d)return Zh(t.default,{Component:d,route:c});const h=f.props[u],g=h?h===!0?c.params:typeof h=="function"?h(c):h:null,m=mf(d,ut({},g,e,{onVnodeUnmounted:p=>{p.component.isUnmounted&&(f.instances[u]=null)},ref:l}));return Zh(t.default,{Component:m,route:c})||m}}});function Zh(n,e){if(!n)return null;const t=n(e);return t.length===1?t[0]:t}const uy=cy;function fy(n){const e=Kx(n.routes,n),t=n.parseQuery||ty,i=n.stringifyQuery||$h,s=n.history,r=Fr(),o=Fr(),a=Fr(),l=K_(Oi);let c=Oi;sr&&n.scrollBehavior&&"scrollRestoration"in history&&(history.scrollRestoration="manual");const u=Gl.bind(null,G=>""+G),f=Gl.bind(null,Mx),d=Gl.bind(null,vo);function h(G,le){let oe,fe;return Wm(G)?(oe=e.getRecordMatcher(G),fe=le):fe=G,e.addRoute(fe,oe)}function g(G){const le=e.getRecordMatcher(G);le&&e.removeRoute(le)}function _(){return e.getRoutes().map(G=>G.record)}function m(G){return!!e.getRecordMatcher(G)}function p(G,le){if(le=ut({},le||l.value),typeof G=="string"){const U=Wl(t,G,le.path),F=e.resolve({path:U.path},le),H=s.createHref(U.fullPath);return ut(U,F,{params:d(F.params),hash:vo(U.hash),redirectedFrom:void 0,href:H})}let oe;if(G.path!=null)oe=ut({},G,{path:Wl(t,G.path,le.path).path});else{const U=ut({},G.params);for(const F in U)U[F]==null&&delete U[F];oe=ut({},G,{params:f(U)}),le.params=f(le.params)}const fe=e.resolve(oe,le),Ve=G.hash||"";fe.params=u(d(fe.params));const D=wx(i,ut({},G,{hash:yx(Ve),path:fe.path})),v=s.createHref(D);return ut({fullPath:D,hash:Ve,query:i===$h?ny(G.query):G.query||{}},fe,{redirectedFrom:void 0,href:v})}function C(G){return typeof G=="string"?Wl(t,G,l.value.path):ut({},G)}function b(G,le){if(c!==G)return yr(8,{from:le,to:G})}function x(G){return P(G)}function w(G){return x(ut(C(G),{replace:!0}))}function L(G){const le=G.matched[G.matched.length-1];if(le&&le.redirect){const{redirect:oe}=le;let fe=typeof oe=="function"?oe(G):oe;return typeof fe=="string"&&(fe=fe.includes("?")||fe.includes("#")?fe=C(fe):{path:fe},fe.params={}),ut({query:G.query,hash:G.hash,params:fe.path!=null?{}:G.params},fe)}}function P(G,le){const oe=c=p(G),fe=l.value,Ve=G.state,D=G.force,v=G.replace===!0,U=L(oe);if(U)return P(ut(C(U),{state:typeof U=="object"?ut({},Ve,U.state):Ve,force:D,replace:v}),le||oe);const F=oe;F.redirectedFrom=le;let H;return!D&&Ax(i,fe,oe)&&(H=yr(16,{to:F,from:fe}),Te(fe,fe,!0,!1)),(H?Promise.resolve(H):E(F,fe)).catch(B=>_i(B)?_i(B,2)?B:ye(B):N(B,F,fe)).then(B=>{if(B){if(_i(B,2))return P(ut({replace:v},C(B.to),{state:typeof B.to=="object"?ut({},Ve,B.to.state):Ve,force:D}),le||F)}else B=V(F,fe,!0,v,Ve);return I(F,fe,B),B})}function M(G,le){const oe=b(G,le);return oe?Promise.reject(oe):Promise.resolve()}function y(G){const le=Je.values().next().value;return le&&typeof le.runWithContext=="function"?le.runWithContext(G):G()}function E(G,le){let oe;const[fe,Ve,D]=hy(G,le);oe=Xl(fe.reverse(),"beforeRouteLeave",G,le);for(const U of fe)U.leaveGuards.forEach(F=>{oe.push(qi(F,G,le))});const v=M.bind(null,G,le);return oe.push(v),ge(oe).then(()=>{oe=[];for(const U of r.list())oe.push(qi(U,G,le));return oe.push(v),ge(oe)}).then(()=>{oe=Xl(Ve,"beforeRouteUpdate",G,le);for(const U of Ve)U.updateGuards.forEach(F=>{oe.push(qi(F,G,le))});return oe.push(v),ge(oe)}).then(()=>{oe=[];for(const U of D)if(U.beforeEnter)if(Zn(U.beforeEnter))for(const F of U.beforeEnter)oe.push(qi(F,G,le));else oe.push(qi(U.beforeEnter,G,le));return oe.push(v),ge(oe)}).then(()=>(G.matched.forEach(U=>U.enterCallbacks={}),oe=Xl(D,"beforeRouteEnter",G,le,y),oe.push(v),ge(oe))).then(()=>{oe=[];for(const U of o.list())oe.push(qi(U,G,le));return oe.push(v),ge(oe)}).catch(U=>_i(U,8)?U:Promise.reject(U))}function I(G,le,oe){a.list().forEach(fe=>y(()=>fe(G,le,oe)))}function V(G,le,oe,fe,Ve){const D=b(G,le);if(D)return D;const v=le===Oi,U=sr?history.state:{};oe&&(fe||v?s.replace(G.fullPath,ut({scroll:v&&U&&U.scroll},Ve)):s.push(G.fullPath,Ve)),l.value=G,Te(G,le,oe,v),ye()}let K;function ee(){K||(K=s.listen((G,le,oe)=>{if(!ae.listening)return;const fe=p(G),Ve=L(fe);if(Ve){P(ut(Ve,{replace:!0,force:!0}),fe).catch(io);return}c=fe;const D=l.value;sr&&Nx(Fh(D.fullPath,oe.delta),xl()),E(fe,D).catch(v=>_i(v,12)?v:_i(v,2)?(P(ut(C(v.to),{force:!0}),fe).then(U=>{_i(U,20)&&!oe.delta&&oe.type===xo.pop&&s.go(-1,!1)}).catch(io),Promise.reject()):(oe.delta&&s.go(-oe.delta,!1),N(v,fe,D))).then(v=>{v=v||V(fe,D,!1),v&&(oe.delta&&!_i(v,8)?s.go(-oe.delta,!1):oe.type===xo.pop&&_i(v,20)&&s.go(-1,!1)),I(fe,D,v)}).catch(io)}))}let se=Fr(),O=Fr(),k;function N(G,le,oe){ye(G);const fe=O.list();return fe.length&&fe.forEach(Ve=>Ve(G,le,oe)),Promise.reject(G)}function ue(){return k&&l.value!==Oi?Promise.resolve():new Promise((G,le)=>{se.add([G,le])})}function ye(G){return k||(k=!G,ee(),se.list().forEach(([le,oe])=>G?oe(G):le()),se.reset()),G}function Te(G,le,oe,fe){const{scrollBehavior:Ve}=n;if(!sr||!Ve)return Promise.resolve();const D=!oe&&Ox(Fh(G.fullPath,0))||(fe||!oe)&&history.state&&history.state.scroll||null;return Do().then(()=>Ve(G,le,D)).then(v=>v&&Ux(v)).catch(v=>N(v,G,le))}const Be=G=>s.go(G);let Ze;const Je=new Set,ae={currentRoute:l,listening:!0,addRoute:h,removeRoute:g,clearRoutes:e.clearRoutes,hasRoute:m,getRoutes:_,resolve:p,options:n,push:x,replace:w,go:Be,back:()=>Be(-1),forward:()=>Be(1),beforeEach:r.add,beforeResolve:o.add,afterEach:a.add,onError:O.add,isReady:ue,install(G){const le=this;G.component("RouterLink",oy),G.component("RouterView",uy),G.config.globalProperties.$router=le,Object.defineProperty(G.config.globalProperties,"$route",{enumerable:!0,get:()=>Vn(l)}),sr&&!Ze&&l.value===Oi&&(Ze=!0,x(s.location).catch(Ve=>{}));const oe={};for(const Ve in Oi)Object.defineProperty(oe,Ve,{get:()=>l.value[Ve],enumerable:!0});G.provide(_f,le),G.provide(jm,Hp(oe)),G.provide($c,l);const fe=G.unmount;Je.add(G),G.unmount=function(){Je.delete(G),Je.size<1&&(c=Oi,K&&K(),K=null,l.value=Oi,Ze=!1,k=!1),fe()}}};function ge(G){return G.reduce((le,oe)=>le.then(()=>y(oe)),Promise.resolve())}return ae}function hy(n,e){const t=[],i=[],s=[],r=Math.max(e.matched.length,n.matched.length);for(let o=0;o<r;o++){const a=e.matched[o];a&&(n.matched.find(c=>xr(c,a))?i.push(a):t.push(a));const l=n.matched[o];l&&(e.matched.find(c=>xr(c,l))||s.push(l))}return[t,i,s]}const dy=Nm("dashboard",()=>{const n=Fe("all"),e=Fe(null),t=Fe(!1),i=Fe(null);return{currentFloor:n,selectedRoom:e,isLoading:t,error:i,selectFloor:l=>{n.value=l},setSelectedRoom:l=>{e.value=l},setLoading:l=>{t.value=l},setError:l=>{i.value=l}}});function Ym(n,e){return function(){return n.apply(e,arguments)}}const{toString:py}=Object.prototype,{getPrototypeOf:vf}=Object,{iterator:yl,toStringTag:Km}=Symbol,Sl=(n=>e=>{const t=py.call(e);return n[t]||(n[t]=t.slice(8,-1).toLowerCase())})(Object.create(null)),Jn=n=>(n=n.toLowerCase(),e=>Sl(e)===n),bl=n=>e=>typeof e===n,{isArray:Rr}=Array,yo=bl("undefined");function Io(n){return n!==null&&!yo(n)&&n.constructor!==null&&!yo(n.constructor)&&un(n.constructor.isBuffer)&&n.constructor.isBuffer(n)}const Zm=Jn("ArrayBuffer");function my(n){let e;return typeof ArrayBuffer<"u"&&ArrayBuffer.isView?e=ArrayBuffer.isView(n):e=n&&n.buffer&&Zm(n.buffer),e}const gy=bl("string"),un=bl("function"),Jm=bl("number"),Uo=n=>n!==null&&typeof n=="object",_y=n=>n===!0||n===!1,Ra=n=>{if(Sl(n)!=="object")return!1;const e=vf(n);return(e===null||e===Object.prototype||Object.getPrototypeOf(e)===null)&&!(Km in n)&&!(yl in n)},vy=n=>{if(!Uo(n)||Io(n))return!1;try{return Object.keys(n).length===0&&Object.getPrototypeOf(n)===Object.prototype}catch{return!1}},xy=Jn("Date"),yy=Jn("File"),Sy=Jn("Blob"),by=Jn("FileList"),My=n=>Uo(n)&&un(n.pipe),Ey=n=>{let e;return n&&(typeof FormData=="function"&&n instanceof FormData||un(n.append)&&((e=Sl(n))==="formdata"||e==="object"&&un(n.toString)&&n.toString()==="[object FormData]"))},Ty=Jn("URLSearchParams"),[wy,Ay,Ry,Cy]=["ReadableStream","Request","Response","Headers"].map(Jn),Py=n=>n.trim?n.trim():n.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,"");function No(n,e,{allOwnKeys:t=!1}={}){if(n===null||typeof n>"u")return;let i,s;if(typeof n!="object"&&(n=[n]),Rr(n))for(i=0,s=n.length;i<s;i++)e.call(null,n[i],i,n);else{if(Io(n))return;const r=t?Object.getOwnPropertyNames(n):Object.keys(n),o=r.length;let a;for(i=0;i<o;i++)a=r[i],e.call(null,n[a],a,n)}}function Qm(n,e){if(Io(n))return null;e=e.toLowerCase();const t=Object.keys(n);let i=t.length,s;for(;i-- >0;)if(s=t[i],e===s.toLowerCase())return s;return null}const ws=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:global,eg=n=>!yo(n)&&n!==ws;function qc(){const{caseless:n}=eg(this)&&this||{},e={},t=(i,s)=>{const r=n&&Qm(e,s)||s;Ra(e[r])&&Ra(i)?e[r]=qc(e[r],i):Ra(i)?e[r]=qc({},i):Rr(i)?e[r]=i.slice():e[r]=i};for(let i=0,s=arguments.length;i<s;i++)arguments[i]&&No(arguments[i],t);return e}const Dy=(n,e,t,{allOwnKeys:i}={})=>(No(e,(s,r)=>{t&&un(s)?n[r]=Ym(s,t):n[r]=s},{allOwnKeys:i}),n),Ly=n=>(n.charCodeAt(0)===65279&&(n=n.slice(1)),n),Iy=(n,e,t,i)=>{n.prototype=Object.create(e.prototype,i),n.prototype.constructor=n,Object.defineProperty(n,"super",{value:e.prototype}),t&&Object.assign(n.prototype,t)},Uy=(n,e,t,i)=>{let s,r,o;const a={};if(e=e||{},n==null)return e;do{for(s=Object.getOwnPropertyNames(n),r=s.length;r-- >0;)o=s[r],(!i||i(o,n,e))&&!a[o]&&(e[o]=n[o],a[o]=!0);n=t!==!1&&vf(n)}while(n&&(!t||t(n,e))&&n!==Object.prototype);return e},Ny=(n,e,t)=>{n=String(n),(t===void 0||t>n.length)&&(t=n.length),t-=e.length;const i=n.indexOf(e,t);return i!==-1&&i===t},Oy=n=>{if(!n)return null;if(Rr(n))return n;let e=n.length;if(!Jm(e))return null;const t=new Array(e);for(;e-- >0;)t[e]=n[e];return t},Fy=(n=>e=>n&&e instanceof n)(typeof Uint8Array<"u"&&vf(Uint8Array)),By=(n,e)=>{const i=(n&&n[yl]).call(n);let s;for(;(s=i.next())&&!s.done;){const r=s.value;e.call(n,r[0],r[1])}},ky=(n,e)=>{let t;const i=[];for(;(t=n.exec(e))!==null;)i.push(t);return i},zy=Jn("HTMLFormElement"),Hy=n=>n.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g,function(t,i,s){return i.toUpperCase()+s}),Jh=(({hasOwnProperty:n})=>(e,t)=>n.call(e,t))(Object.prototype),Vy=Jn("RegExp"),tg=(n,e)=>{const t=Object.getOwnPropertyDescriptors(n),i={};No(t,(s,r)=>{let o;(o=e(s,r,n))!==!1&&(i[r]=o||s)}),Object.defineProperties(n,i)},Gy=n=>{tg(n,(e,t)=>{if(un(n)&&["arguments","caller","callee"].indexOf(t)!==-1)return!1;const i=n[t];if(un(i)){if(e.enumerable=!1,"writable"in e){e.writable=!1;return}e.set||(e.set=()=>{throw Error("Can not rewrite read-only method '"+t+"'")})}})},Wy=(n,e)=>{const t={},i=s=>{s.forEach(r=>{t[r]=!0})};return Rr(n)?i(n):i(String(n).split(e)),t},Xy=()=>{},$y=(n,e)=>n!=null&&Number.isFinite(n=+n)?n:e;function qy(n){return!!(n&&un(n.append)&&n[Km]==="FormData"&&n[yl])}const jy=n=>{const e=new Array(10),t=(i,s)=>{if(Uo(i)){if(e.indexOf(i)>=0)return;if(Io(i))return i;if(!("toJSON"in i)){e[s]=i;const r=Rr(i)?[]:{};return No(i,(o,a)=>{const l=t(o,s+1);!yo(l)&&(r[a]=l)}),e[s]=void 0,r}}return i};return t(n,0)},Yy=Jn("AsyncFunction"),Ky=n=>n&&(Uo(n)||un(n))&&un(n.then)&&un(n.catch),ng=((n,e)=>n?setImmediate:e?((t,i)=>(ws.addEventListener("message",({source:s,data:r})=>{s===ws&&r===t&&i.length&&i.shift()()},!1),s=>{i.push(s),ws.postMessage(t,"*")}))(`axios@${Math.random()}`,[]):t=>setTimeout(t))(typeof setImmediate=="function",un(ws.postMessage)),Zy=typeof queueMicrotask<"u"?queueMicrotask.bind(ws):typeof process<"u"&&process.nextTick||ng,Jy=n=>n!=null&&un(n[yl]),re={isArray:Rr,isArrayBuffer:Zm,isBuffer:Io,isFormData:Ey,isArrayBufferView:my,isString:gy,isNumber:Jm,isBoolean:_y,isObject:Uo,isPlainObject:Ra,isEmptyObject:vy,isReadableStream:wy,isRequest:Ay,isResponse:Ry,isHeaders:Cy,isUndefined:yo,isDate:xy,isFile:yy,isBlob:Sy,isRegExp:Vy,isFunction:un,isStream:My,isURLSearchParams:Ty,isTypedArray:Fy,isFileList:by,forEach:No,merge:qc,extend:Dy,trim:Py,stripBOM:Ly,inherits:Iy,toFlatObject:Uy,kindOf:Sl,kindOfTest:Jn,endsWith:Ny,toArray:Oy,forEachEntry:By,matchAll:ky,isHTMLForm:zy,hasOwnProperty:Jh,hasOwnProp:Jh,reduceDescriptors:tg,freezeMethods:Gy,toObjectSet:Wy,toCamelCase:Hy,noop:Xy,toFiniteNumber:$y,findKey:Qm,global:ws,isContextDefined:eg,isSpecCompliantForm:qy,toJSONObject:jy,isAsyncFn:Yy,isThenable:Ky,setImmediate:ng,asap:Zy,isIterable:Jy};function Qe(n,e,t,i,s){Error.call(this),Error.captureStackTrace?Error.captureStackTrace(this,this.constructor):this.stack=new Error().stack,this.message=n,this.name="AxiosError",e&&(this.code=e),t&&(this.config=t),i&&(this.request=i),s&&(this.response=s,this.status=s.status?s.status:null)}re.inherits(Qe,Error,{toJSON:function(){return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:re.toJSONObject(this.config),code:this.code,status:this.status}}});const ig=Qe.prototype,sg={};["ERR_BAD_OPTION_VALUE","ERR_BAD_OPTION","ECONNABORTED","ETIMEDOUT","ERR_NETWORK","ERR_FR_TOO_MANY_REDIRECTS","ERR_DEPRECATED","ERR_BAD_RESPONSE","ERR_BAD_REQUEST","ERR_CANCELED","ERR_NOT_SUPPORT","ERR_INVALID_URL"].forEach(n=>{sg[n]={value:n}});Object.defineProperties(Qe,sg);Object.defineProperty(ig,"isAxiosError",{value:!0});Qe.from=(n,e,t,i,s,r)=>{const o=Object.create(ig);return re.toFlatObject(n,o,function(l){return l!==Error.prototype},a=>a!=="isAxiosError"),Qe.call(o,n.message,e,t,i,s),o.cause=n,o.name=n.name,r&&Object.assign(o,r),o};const Qy=null;function jc(n){return re.isPlainObject(n)||re.isArray(n)}function rg(n){return re.endsWith(n,"[]")?n.slice(0,-2):n}function Qh(n,e,t){return n?n.concat(e).map(function(s,r){return s=rg(s),!t&&r?"["+s+"]":s}).join(t?".":""):e}function eS(n){return re.isArray(n)&&!n.some(jc)}const tS=re.toFlatObject(re,{},null,function(e){return/^is[A-Z]/.test(e)});function Ml(n,e,t){if(!re.isObject(n))throw new TypeError("target must be an object");e=e||new FormData,t=re.toFlatObject(t,{metaTokens:!0,dots:!1,indexes:!1},!1,function(_,m){return!re.isUndefined(m[_])});const i=t.metaTokens,s=t.visitor||u,r=t.dots,o=t.indexes,l=(t.Blob||typeof Blob<"u"&&Blob)&&re.isSpecCompliantForm(e);if(!re.isFunction(s))throw new TypeError("visitor must be a function");function c(g){if(g===null)return"";if(re.isDate(g))return g.toISOString();if(re.isBoolean(g))return g.toString();if(!l&&re.isBlob(g))throw new Qe("Blob is not supported. Use a Buffer instead.");return re.isArrayBuffer(g)||re.isTypedArray(g)?l&&typeof Blob=="function"?new Blob([g]):Buffer.from(g):g}function u(g,_,m){let p=g;if(g&&!m&&typeof g=="object"){if(re.endsWith(_,"{}"))_=i?_:_.slice(0,-2),g=JSON.stringify(g);else if(re.isArray(g)&&eS(g)||(re.isFileList(g)||re.endsWith(_,"[]"))&&(p=re.toArray(g)))return _=rg(_),p.forEach(function(b,x){!(re.isUndefined(b)||b===null)&&e.append(o===!0?Qh([_],x,r):o===null?_:_+"[]",c(b))}),!1}return jc(g)?!0:(e.append(Qh(m,_,r),c(g)),!1)}const f=[],d=Object.assign(tS,{defaultVisitor:u,convertValue:c,isVisitable:jc});function h(g,_){if(!re.isUndefined(g)){if(f.indexOf(g)!==-1)throw Error("Circular reference detected in "+_.join("."));f.push(g),re.forEach(g,function(p,C){(!(re.isUndefined(p)||p===null)&&s.call(e,p,re.isString(C)?C.trim():C,_,d))===!0&&h(p,_?_.concat(C):[C])}),f.pop()}}if(!re.isObject(n))throw new TypeError("data must be an object");return h(n),e}function ed(n){const e={"!":"%21","'":"%27","(":"%28",")":"%29","~":"%7E","%20":"+","%00":"\0"};return encodeURIComponent(n).replace(/[!'()~]|%20|%00/g,function(i){return e[i]})}function xf(n,e){this._pairs=[],n&&Ml(n,this,e)}const og=xf.prototype;og.append=function(e,t){this._pairs.push([e,t])};og.toString=function(e){const t=e?function(i){return e.call(this,i,ed)}:ed;return this._pairs.map(function(s){return t(s[0])+"="+t(s[1])},"").join("&")};function nS(n){return encodeURIComponent(n).replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}function ag(n,e,t){if(!e)return n;const i=t&&t.encode||nS;re.isFunction(t)&&(t={serialize:t});const s=t&&t.serialize;let r;if(s?r=s(e,t):r=re.isURLSearchParams(e)?e.toString():new xf(e,t).toString(i),r){const o=n.indexOf("#");o!==-1&&(n=n.slice(0,o)),n+=(n.indexOf("?")===-1?"?":"&")+r}return n}class td{constructor(){this.handlers=[]}use(e,t,i){return this.handlers.push({fulfilled:e,rejected:t,synchronous:i?i.synchronous:!1,runWhen:i?i.runWhen:null}),this.handlers.length-1}eject(e){this.handlers[e]&&(this.handlers[e]=null)}clear(){this.handlers&&(this.handlers=[])}forEach(e){re.forEach(this.handlers,function(i){i!==null&&e(i)})}}const lg={silentJSONParsing:!0,forcedJSONParsing:!0,clarifyTimeoutError:!1},iS=typeof URLSearchParams<"u"?URLSearchParams:xf,sS=typeof FormData<"u"?FormData:null,rS=typeof Blob<"u"?Blob:null,oS={isBrowser:!0,classes:{URLSearchParams:iS,FormData:sS,Blob:rS},protocols:["http","https","file","blob","url","data"]},yf=typeof window<"u"&&typeof document<"u",Yc=typeof navigator=="object"&&navigator||void 0,aS=yf&&(!Yc||["ReactNative","NativeScript","NS"].indexOf(Yc.product)<0),lS=typeof WorkerGlobalScope<"u"&&self instanceof WorkerGlobalScope&&typeof self.importScripts=="function",cS=yf&&window.location.href||"http://localhost",uS=Object.freeze(Object.defineProperty({__proto__:null,hasBrowserEnv:yf,hasStandardBrowserEnv:aS,hasStandardBrowserWebWorkerEnv:lS,navigator:Yc,origin:cS},Symbol.toStringTag,{value:"Module"})),Zt={...uS,...oS};function fS(n,e){return Ml(n,new Zt.classes.URLSearchParams,{visitor:function(t,i,s,r){return Zt.isNode&&re.isBuffer(t)?(this.append(i,t.toString("base64")),!1):r.defaultVisitor.apply(this,arguments)},...e})}function hS(n){return re.matchAll(/\w+|\[(\w*)]/g,n).map(e=>e[0]==="[]"?"":e[1]||e[0])}function dS(n){const e={},t=Object.keys(n);let i;const s=t.length;let r;for(i=0;i<s;i++)r=t[i],e[r]=n[r];return e}function cg(n){function e(t,i,s,r){let o=t[r++];if(o==="__proto__")return!0;const a=Number.isFinite(+o),l=r>=t.length;return o=!o&&re.isArray(s)?s.length:o,l?(re.hasOwnProp(s,o)?s[o]=[s[o],i]:s[o]=i,!a):((!s[o]||!re.isObject(s[o]))&&(s[o]=[]),e(t,i,s[o],r)&&re.isArray(s[o])&&(s[o]=dS(s[o])),!a)}if(re.isFormData(n)&&re.isFunction(n.entries)){const t={};return re.forEachEntry(n,(i,s)=>{e(hS(i),s,t,0)}),t}return null}function pS(n,e,t){if(re.isString(n))try{return(e||JSON.parse)(n),re.trim(n)}catch(i){if(i.name!=="SyntaxError")throw i}return(t||JSON.stringify)(n)}const Oo={transitional:lg,adapter:["xhr","http","fetch"],transformRequest:[function(e,t){const i=t.getContentType()||"",s=i.indexOf("application/json")>-1,r=re.isObject(e);if(r&&re.isHTMLForm(e)&&(e=new FormData(e)),re.isFormData(e))return s?JSON.stringify(cg(e)):e;if(re.isArrayBuffer(e)||re.isBuffer(e)||re.isStream(e)||re.isFile(e)||re.isBlob(e)||re.isReadableStream(e))return e;if(re.isArrayBufferView(e))return e.buffer;if(re.isURLSearchParams(e))return t.setContentType("application/x-www-form-urlencoded;charset=utf-8",!1),e.toString();let a;if(r){if(i.indexOf("application/x-www-form-urlencoded")>-1)return fS(e,this.formSerializer).toString();if((a=re.isFileList(e))||i.indexOf("multipart/form-data")>-1){const l=this.env&&this.env.FormData;return Ml(a?{"files[]":e}:e,l&&new l,this.formSerializer)}}return r||s?(t.setContentType("application/json",!1),pS(e)):e}],transformResponse:[function(e){const t=this.transitional||Oo.transitional,i=t&&t.forcedJSONParsing,s=this.responseType==="json";if(re.isResponse(e)||re.isReadableStream(e))return e;if(e&&re.isString(e)&&(i&&!this.responseType||s)){const o=!(t&&t.silentJSONParsing)&&s;try{return JSON.parse(e)}catch(a){if(o)throw a.name==="SyntaxError"?Qe.from(a,Qe.ERR_BAD_RESPONSE,this,null,this.response):a}}return e}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,maxBodyLength:-1,env:{FormData:Zt.classes.FormData,Blob:Zt.classes.Blob},validateStatus:function(e){return e>=200&&e<300},headers:{common:{Accept:"application/json, text/plain, */*","Content-Type":void 0}}};re.forEach(["delete","get","head","post","put","patch"],n=>{Oo.headers[n]={}});const mS=re.toObjectSet(["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"]),gS=n=>{const e={};let t,i,s;return n&&n.split(`
`).forEach(function(o){s=o.indexOf(":"),t=o.substring(0,s).trim().toLowerCase(),i=o.substring(s+1).trim(),!(!t||e[t]&&mS[t])&&(t==="set-cookie"?e[t]?e[t].push(i):e[t]=[i]:e[t]=e[t]?e[t]+", "+i:i)}),e},nd=Symbol("internals");function Br(n){return n&&String(n).trim().toLowerCase()}function Ca(n){return n===!1||n==null?n:re.isArray(n)?n.map(Ca):String(n)}function _S(n){const e=Object.create(null),t=/([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;let i;for(;i=t.exec(n);)e[i[1]]=i[2];return e}const vS=n=>/^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(n.trim());function $l(n,e,t,i,s){if(re.isFunction(i))return i.call(this,e,t);if(s&&(e=t),!!re.isString(e)){if(re.isString(i))return e.indexOf(i)!==-1;if(re.isRegExp(i))return i.test(e)}}function xS(n){return n.trim().toLowerCase().replace(/([a-z\d])(\w*)/g,(e,t,i)=>t.toUpperCase()+i)}function yS(n,e){const t=re.toCamelCase(" "+e);["get","set","has"].forEach(i=>{Object.defineProperty(n,i+t,{value:function(s,r,o){return this[i].call(this,e,s,r,o)},configurable:!0})})}let fn=class{constructor(e){e&&this.set(e)}set(e,t,i){const s=this;function r(a,l,c){const u=Br(l);if(!u)throw new Error("header name must be a non-empty string");const f=re.findKey(s,u);(!f||s[f]===void 0||c===!0||c===void 0&&s[f]!==!1)&&(s[f||l]=Ca(a))}const o=(a,l)=>re.forEach(a,(c,u)=>r(c,u,l));if(re.isPlainObject(e)||e instanceof this.constructor)o(e,t);else if(re.isString(e)&&(e=e.trim())&&!vS(e))o(gS(e),t);else if(re.isObject(e)&&re.isIterable(e)){let a={},l,c;for(const u of e){if(!re.isArray(u))throw TypeError("Object iterator must return a key-value pair");a[c=u[0]]=(l=a[c])?re.isArray(l)?[...l,u[1]]:[l,u[1]]:u[1]}o(a,t)}else e!=null&&r(t,e,i);return this}get(e,t){if(e=Br(e),e){const i=re.findKey(this,e);if(i){const s=this[i];if(!t)return s;if(t===!0)return _S(s);if(re.isFunction(t))return t.call(this,s,i);if(re.isRegExp(t))return t.exec(s);throw new TypeError("parser must be boolean|regexp|function")}}}has(e,t){if(e=Br(e),e){const i=re.findKey(this,e);return!!(i&&this[i]!==void 0&&(!t||$l(this,this[i],i,t)))}return!1}delete(e,t){const i=this;let s=!1;function r(o){if(o=Br(o),o){const a=re.findKey(i,o);a&&(!t||$l(i,i[a],a,t))&&(delete i[a],s=!0)}}return re.isArray(e)?e.forEach(r):r(e),s}clear(e){const t=Object.keys(this);let i=t.length,s=!1;for(;i--;){const r=t[i];(!e||$l(this,this[r],r,e,!0))&&(delete this[r],s=!0)}return s}normalize(e){const t=this,i={};return re.forEach(this,(s,r)=>{const o=re.findKey(i,r);if(o){t[o]=Ca(s),delete t[r];return}const a=e?xS(r):String(r).trim();a!==r&&delete t[r],t[a]=Ca(s),i[a]=!0}),this}concat(...e){return this.constructor.concat(this,...e)}toJSON(e){const t=Object.create(null);return re.forEach(this,(i,s)=>{i!=null&&i!==!1&&(t[s]=e&&re.isArray(i)?i.join(", "):i)}),t}[Symbol.iterator](){return Object.entries(this.toJSON())[Symbol.iterator]()}toString(){return Object.entries(this.toJSON()).map(([e,t])=>e+": "+t).join(`
`)}getSetCookie(){return this.get("set-cookie")||[]}get[Symbol.toStringTag](){return"AxiosHeaders"}static from(e){return e instanceof this?e:new this(e)}static concat(e,...t){const i=new this(e);return t.forEach(s=>i.set(s)),i}static accessor(e){const i=(this[nd]=this[nd]={accessors:{}}).accessors,s=this.prototype;function r(o){const a=Br(o);i[a]||(yS(s,o),i[a]=!0)}return re.isArray(e)?e.forEach(r):r(e),this}};fn.accessor(["Content-Type","Content-Length","Accept","Accept-Encoding","User-Agent","Authorization"]);re.reduceDescriptors(fn.prototype,({value:n},e)=>{let t=e[0].toUpperCase()+e.slice(1);return{get:()=>n,set(i){this[t]=i}}});re.freezeMethods(fn);function ql(n,e){const t=this||Oo,i=e||t,s=fn.from(i.headers);let r=i.data;return re.forEach(n,function(a){r=a.call(t,r,s.normalize(),e?e.status:void 0)}),s.normalize(),r}function ug(n){return!!(n&&n.__CANCEL__)}function Cr(n,e,t){Qe.call(this,n??"canceled",Qe.ERR_CANCELED,e,t),this.name="CanceledError"}re.inherits(Cr,Qe,{__CANCEL__:!0});function fg(n,e,t){const i=t.config.validateStatus;!t.status||!i||i(t.status)?n(t):e(new Qe("Request failed with status code "+t.status,[Qe.ERR_BAD_REQUEST,Qe.ERR_BAD_RESPONSE][Math.floor(t.status/100)-4],t.config,t.request,t))}function SS(n){const e=/^([-+\w]{1,25})(:?\/\/|:)/.exec(n);return e&&e[1]||""}function bS(n,e){n=n||10;const t=new Array(n),i=new Array(n);let s=0,r=0,o;return e=e!==void 0?e:1e3,function(l){const c=Date.now(),u=i[r];o||(o=c),t[s]=l,i[s]=c;let f=r,d=0;for(;f!==s;)d+=t[f++],f=f%n;if(s=(s+1)%n,s===r&&(r=(r+1)%n),c-o<e)return;const h=u&&c-u;return h?Math.round(d*1e3/h):void 0}}function MS(n,e){let t=0,i=1e3/e,s,r;const o=(c,u=Date.now())=>{t=u,s=null,r&&(clearTimeout(r),r=null),n(...c)};return[(...c)=>{const u=Date.now(),f=u-t;f>=i?o(c,u):(s=c,r||(r=setTimeout(()=>{r=null,o(s)},i-f)))},()=>s&&o(s)]}const Za=(n,e,t=3)=>{let i=0;const s=bS(50,250);return MS(r=>{const o=r.loaded,a=r.lengthComputable?r.total:void 0,l=o-i,c=s(l),u=o<=a;i=o;const f={loaded:o,total:a,progress:a?o/a:void 0,bytes:l,rate:c||void 0,estimated:c&&a&&u?(a-o)/c:void 0,event:r,lengthComputable:a!=null,[e?"download":"upload"]:!0};n(f)},t)},id=(n,e)=>{const t=n!=null;return[i=>e[0]({lengthComputable:t,total:n,loaded:i}),e[1]]},sd=n=>(...e)=>re.asap(()=>n(...e)),ES=Zt.hasStandardBrowserEnv?((n,e)=>t=>(t=new URL(t,Zt.origin),n.protocol===t.protocol&&n.host===t.host&&(e||n.port===t.port)))(new URL(Zt.origin),Zt.navigator&&/(msie|trident)/i.test(Zt.navigator.userAgent)):()=>!0,TS=Zt.hasStandardBrowserEnv?{write(n,e,t,i,s,r){const o=[n+"="+encodeURIComponent(e)];re.isNumber(t)&&o.push("expires="+new Date(t).toGMTString()),re.isString(i)&&o.push("path="+i),re.isString(s)&&o.push("domain="+s),r===!0&&o.push("secure"),document.cookie=o.join("; ")},read(n){const e=document.cookie.match(new RegExp("(^|;\\s*)("+n+")=([^;]*)"));return e?decodeURIComponent(e[3]):null},remove(n){this.write(n,"",Date.now()-864e5)}}:{write(){},read(){return null},remove(){}};function wS(n){return/^([a-z][a-z\d+\-.]*:)?\/\//i.test(n)}function AS(n,e){return e?n.replace(/\/?\/$/,"")+"/"+e.replace(/^\/+/,""):n}function hg(n,e,t){let i=!wS(e);return n&&(i||t==!1)?AS(n,e):e}const rd=n=>n instanceof fn?{...n}:n;function Is(n,e){e=e||{};const t={};function i(c,u,f,d){return re.isPlainObject(c)&&re.isPlainObject(u)?re.merge.call({caseless:d},c,u):re.isPlainObject(u)?re.merge({},u):re.isArray(u)?u.slice():u}function s(c,u,f,d){if(re.isUndefined(u)){if(!re.isUndefined(c))return i(void 0,c,f,d)}else return i(c,u,f,d)}function r(c,u){if(!re.isUndefined(u))return i(void 0,u)}function o(c,u){if(re.isUndefined(u)){if(!re.isUndefined(c))return i(void 0,c)}else return i(void 0,u)}function a(c,u,f){if(f in e)return i(c,u);if(f in n)return i(void 0,c)}const l={url:r,method:r,data:r,baseURL:o,transformRequest:o,transformResponse:o,paramsSerializer:o,timeout:o,timeoutMessage:o,withCredentials:o,withXSRFToken:o,adapter:o,responseType:o,xsrfCookieName:o,xsrfHeaderName:o,onUploadProgress:o,onDownloadProgress:o,decompress:o,maxContentLength:o,maxBodyLength:o,beforeRedirect:o,transport:o,httpAgent:o,httpsAgent:o,cancelToken:o,socketPath:o,responseEncoding:o,validateStatus:a,headers:(c,u,f)=>s(rd(c),rd(u),f,!0)};return re.forEach(Object.keys({...n,...e}),function(u){const f=l[u]||s,d=f(n[u],e[u],u);re.isUndefined(d)&&f!==a||(t[u]=d)}),t}const dg=n=>{const e=Is({},n);let{data:t,withXSRFToken:i,xsrfHeaderName:s,xsrfCookieName:r,headers:o,auth:a}=e;e.headers=o=fn.from(o),e.url=ag(hg(e.baseURL,e.url,e.allowAbsoluteUrls),n.params,n.paramsSerializer),a&&o.set("Authorization","Basic "+btoa((a.username||"")+":"+(a.password?unescape(encodeURIComponent(a.password)):"")));let l;if(re.isFormData(t)){if(Zt.hasStandardBrowserEnv||Zt.hasStandardBrowserWebWorkerEnv)o.setContentType(void 0);else if((l=o.getContentType())!==!1){const[c,...u]=l?l.split(";").map(f=>f.trim()).filter(Boolean):[];o.setContentType([c||"multipart/form-data",...u].join("; "))}}if(Zt.hasStandardBrowserEnv&&(i&&re.isFunction(i)&&(i=i(e)),i||i!==!1&&ES(e.url))){const c=s&&r&&TS.read(r);c&&o.set(s,c)}return e},RS=typeof XMLHttpRequest<"u",CS=RS&&function(n){return new Promise(function(t,i){const s=dg(n);let r=s.data;const o=fn.from(s.headers).normalize();let{responseType:a,onUploadProgress:l,onDownloadProgress:c}=s,u,f,d,h,g;function _(){h&&h(),g&&g(),s.cancelToken&&s.cancelToken.unsubscribe(u),s.signal&&s.signal.removeEventListener("abort",u)}let m=new XMLHttpRequest;m.open(s.method.toUpperCase(),s.url,!0),m.timeout=s.timeout;function p(){if(!m)return;const b=fn.from("getAllResponseHeaders"in m&&m.getAllResponseHeaders()),w={data:!a||a==="text"||a==="json"?m.responseText:m.response,status:m.status,statusText:m.statusText,headers:b,config:n,request:m};fg(function(P){t(P),_()},function(P){i(P),_()},w),m=null}"onloadend"in m?m.onloadend=p:m.onreadystatechange=function(){!m||m.readyState!==4||m.status===0&&!(m.responseURL&&m.responseURL.indexOf("file:")===0)||setTimeout(p)},m.onabort=function(){m&&(i(new Qe("Request aborted",Qe.ECONNABORTED,n,m)),m=null)},m.onerror=function(){i(new Qe("Network Error",Qe.ERR_NETWORK,n,m)),m=null},m.ontimeout=function(){let x=s.timeout?"timeout of "+s.timeout+"ms exceeded":"timeout exceeded";const w=s.transitional||lg;s.timeoutErrorMessage&&(x=s.timeoutErrorMessage),i(new Qe(x,w.clarifyTimeoutError?Qe.ETIMEDOUT:Qe.ECONNABORTED,n,m)),m=null},r===void 0&&o.setContentType(null),"setRequestHeader"in m&&re.forEach(o.toJSON(),function(x,w){m.setRequestHeader(w,x)}),re.isUndefined(s.withCredentials)||(m.withCredentials=!!s.withCredentials),a&&a!=="json"&&(m.responseType=s.responseType),c&&([d,g]=Za(c,!0),m.addEventListener("progress",d)),l&&m.upload&&([f,h]=Za(l),m.upload.addEventListener("progress",f),m.upload.addEventListener("loadend",h)),(s.cancelToken||s.signal)&&(u=b=>{m&&(i(!b||b.type?new Cr(null,n,m):b),m.abort(),m=null)},s.cancelToken&&s.cancelToken.subscribe(u),s.signal&&(s.signal.aborted?u():s.signal.addEventListener("abort",u)));const C=SS(s.url);if(C&&Zt.protocols.indexOf(C)===-1){i(new Qe("Unsupported protocol "+C+":",Qe.ERR_BAD_REQUEST,n));return}m.send(r||null)})},PS=(n,e)=>{const{length:t}=n=n?n.filter(Boolean):[];if(e||t){let i=new AbortController,s;const r=function(c){if(!s){s=!0,a();const u=c instanceof Error?c:this.reason;i.abort(u instanceof Qe?u:new Cr(u instanceof Error?u.message:u))}};let o=e&&setTimeout(()=>{o=null,r(new Qe(`timeout ${e} of ms exceeded`,Qe.ETIMEDOUT))},e);const a=()=>{n&&(o&&clearTimeout(o),o=null,n.forEach(c=>{c.unsubscribe?c.unsubscribe(r):c.removeEventListener("abort",r)}),n=null)};n.forEach(c=>c.addEventListener("abort",r));const{signal:l}=i;return l.unsubscribe=()=>re.asap(a),l}},DS=function*(n,e){let t=n.byteLength;if(t<e){yield n;return}let i=0,s;for(;i<t;)s=i+e,yield n.slice(i,s),i=s},LS=async function*(n,e){for await(const t of IS(n))yield*DS(t,e)},IS=async function*(n){if(n[Symbol.asyncIterator]){yield*n;return}const e=n.getReader();try{for(;;){const{done:t,value:i}=await e.read();if(t)break;yield i}}finally{await e.cancel()}},od=(n,e,t,i)=>{const s=LS(n,e);let r=0,o,a=l=>{o||(o=!0,i&&i(l))};return new ReadableStream({async pull(l){try{const{done:c,value:u}=await s.next();if(c){a(),l.close();return}let f=u.byteLength;if(t){let d=r+=f;t(d)}l.enqueue(new Uint8Array(u))}catch(c){throw a(c),c}},cancel(l){return a(l),s.return()}},{highWaterMark:2})},El=typeof fetch=="function"&&typeof Request=="function"&&typeof Response=="function",pg=El&&typeof ReadableStream=="function",US=El&&(typeof TextEncoder=="function"?(n=>e=>n.encode(e))(new TextEncoder):async n=>new Uint8Array(await new Response(n).arrayBuffer())),mg=(n,...e)=>{try{return!!n(...e)}catch{return!1}},NS=pg&&mg(()=>{let n=!1;const e=new Request(Zt.origin,{body:new ReadableStream,method:"POST",get duplex(){return n=!0,"half"}}).headers.has("Content-Type");return n&&!e}),ad=64*1024,Kc=pg&&mg(()=>re.isReadableStream(new Response("").body)),Ja={stream:Kc&&(n=>n.body)};El&&(n=>{["text","arrayBuffer","blob","formData","stream"].forEach(e=>{!Ja[e]&&(Ja[e]=re.isFunction(n[e])?t=>t[e]():(t,i)=>{throw new Qe(`Response type '${e}' is not supported`,Qe.ERR_NOT_SUPPORT,i)})})})(new Response);const OS=async n=>{if(n==null)return 0;if(re.isBlob(n))return n.size;if(re.isSpecCompliantForm(n))return(await new Request(Zt.origin,{method:"POST",body:n}).arrayBuffer()).byteLength;if(re.isArrayBufferView(n)||re.isArrayBuffer(n))return n.byteLength;if(re.isURLSearchParams(n)&&(n=n+""),re.isString(n))return(await US(n)).byteLength},FS=async(n,e)=>{const t=re.toFiniteNumber(n.getContentLength());return t??OS(e)},BS=El&&(async n=>{let{url:e,method:t,data:i,signal:s,cancelToken:r,timeout:o,onDownloadProgress:a,onUploadProgress:l,responseType:c,headers:u,withCredentials:f="same-origin",fetchOptions:d}=dg(n);c=c?(c+"").toLowerCase():"text";let h=PS([s,r&&r.toAbortSignal()],o),g;const _=h&&h.unsubscribe&&(()=>{h.unsubscribe()});let m;try{if(l&&NS&&t!=="get"&&t!=="head"&&(m=await FS(u,i))!==0){let w=new Request(e,{method:"POST",body:i,duplex:"half"}),L;if(re.isFormData(i)&&(L=w.headers.get("content-type"))&&u.setContentType(L),w.body){const[P,M]=id(m,Za(sd(l)));i=od(w.body,ad,P,M)}}re.isString(f)||(f=f?"include":"omit");const p="credentials"in Request.prototype;g=new Request(e,{...d,signal:h,method:t.toUpperCase(),headers:u.normalize().toJSON(),body:i,duplex:"half",credentials:p?f:void 0});let C=await fetch(g,d);const b=Kc&&(c==="stream"||c==="response");if(Kc&&(a||b&&_)){const w={};["status","statusText","headers"].forEach(y=>{w[y]=C[y]});const L=re.toFiniteNumber(C.headers.get("content-length")),[P,M]=a&&id(L,Za(sd(a),!0))||[];C=new Response(od(C.body,ad,P,()=>{M&&M(),_&&_()}),w)}c=c||"text";let x=await Ja[re.findKey(Ja,c)||"text"](C,n);return!b&&_&&_(),await new Promise((w,L)=>{fg(w,L,{data:x,headers:fn.from(C.headers),status:C.status,statusText:C.statusText,config:n,request:g})})}catch(p){throw _&&_(),p&&p.name==="TypeError"&&/Load failed|fetch/i.test(p.message)?Object.assign(new Qe("Network Error",Qe.ERR_NETWORK,n,g),{cause:p.cause||p}):Qe.from(p,p&&p.code,n,g)}}),Zc={http:Qy,xhr:CS,fetch:BS};re.forEach(Zc,(n,e)=>{if(n){try{Object.defineProperty(n,"name",{value:e})}catch{}Object.defineProperty(n,"adapterName",{value:e})}});const ld=n=>`- ${n}`,kS=n=>re.isFunction(n)||n===null||n===!1,gg={getAdapter:n=>{n=re.isArray(n)?n:[n];const{length:e}=n;let t,i;const s={};for(let r=0;r<e;r++){t=n[r];let o;if(i=t,!kS(t)&&(i=Zc[(o=String(t)).toLowerCase()],i===void 0))throw new Qe(`Unknown adapter '${o}'`);if(i)break;s[o||"#"+r]=i}if(!i){const r=Object.entries(s).map(([a,l])=>`adapter ${a} `+(l===!1?"is not supported by the environment":"is not available in the build"));let o=e?r.length>1?`since :
`+r.map(ld).join(`
`):" "+ld(r[0]):"as no adapter specified";throw new Qe("There is no suitable adapter to dispatch the request "+o,"ERR_NOT_SUPPORT")}return i},adapters:Zc};function jl(n){if(n.cancelToken&&n.cancelToken.throwIfRequested(),n.signal&&n.signal.aborted)throw new Cr(null,n)}function cd(n){return jl(n),n.headers=fn.from(n.headers),n.data=ql.call(n,n.transformRequest),["post","put","patch"].indexOf(n.method)!==-1&&n.headers.setContentType("application/x-www-form-urlencoded",!1),gg.getAdapter(n.adapter||Oo.adapter)(n).then(function(i){return jl(n),i.data=ql.call(n,n.transformResponse,i),i.headers=fn.from(i.headers),i},function(i){return ug(i)||(jl(n),i&&i.response&&(i.response.data=ql.call(n,n.transformResponse,i.response),i.response.headers=fn.from(i.response.headers))),Promise.reject(i)})}const _g="1.11.0",Tl={};["object","boolean","number","function","string","symbol"].forEach((n,e)=>{Tl[n]=function(i){return typeof i===n||"a"+(e<1?"n ":" ")+n}});const ud={};Tl.transitional=function(e,t,i){function s(r,o){return"[Axios v"+_g+"] Transitional option '"+r+"'"+o+(i?". "+i:"")}return(r,o,a)=>{if(e===!1)throw new Qe(s(o," has been removed"+(t?" in "+t:"")),Qe.ERR_DEPRECATED);return t&&!ud[o]&&(ud[o]=!0),e?e(r,o,a):!0}};Tl.spelling=function(e){return(t,i)=>!0};function zS(n,e,t){if(typeof n!="object")throw new Qe("options must be an object",Qe.ERR_BAD_OPTION_VALUE);const i=Object.keys(n);let s=i.length;for(;s-- >0;){const r=i[s],o=e[r];if(o){const a=n[r],l=a===void 0||o(a,r,n);if(l!==!0)throw new Qe("option "+r+" must be "+l,Qe.ERR_BAD_OPTION_VALUE);continue}if(t!==!0)throw new Qe("Unknown option "+r,Qe.ERR_BAD_OPTION)}}const Pa={assertOptions:zS,validators:Tl},ti=Pa.validators;let Ds=class{constructor(e){this.defaults=e||{},this.interceptors={request:new td,response:new td}}async request(e,t){try{return await this._request(e,t)}catch(i){if(i instanceof Error){let s={};Error.captureStackTrace?Error.captureStackTrace(s):s=new Error;const r=s.stack?s.stack.replace(/^.+\n/,""):"";try{i.stack?r&&!String(i.stack).endsWith(r.replace(/^.+\n.+\n/,""))&&(i.stack+=`
`+r):i.stack=r}catch{}}throw i}}_request(e,t){typeof e=="string"?(t=t||{},t.url=e):t=e||{},t=Is(this.defaults,t);const{transitional:i,paramsSerializer:s,headers:r}=t;i!==void 0&&Pa.assertOptions(i,{silentJSONParsing:ti.transitional(ti.boolean),forcedJSONParsing:ti.transitional(ti.boolean),clarifyTimeoutError:ti.transitional(ti.boolean)},!1),s!=null&&(re.isFunction(s)?t.paramsSerializer={serialize:s}:Pa.assertOptions(s,{encode:ti.function,serialize:ti.function},!0)),t.allowAbsoluteUrls!==void 0||(this.defaults.allowAbsoluteUrls!==void 0?t.allowAbsoluteUrls=this.defaults.allowAbsoluteUrls:t.allowAbsoluteUrls=!0),Pa.assertOptions(t,{baseUrl:ti.spelling("baseURL"),withXsrfToken:ti.spelling("withXSRFToken")},!0),t.method=(t.method||this.defaults.method||"get").toLowerCase();let o=r&&re.merge(r.common,r[t.method]);r&&re.forEach(["delete","get","head","post","put","patch","common"],g=>{delete r[g]}),t.headers=fn.concat(o,r);const a=[];let l=!0;this.interceptors.request.forEach(function(_){typeof _.runWhen=="function"&&_.runWhen(t)===!1||(l=l&&_.synchronous,a.unshift(_.fulfilled,_.rejected))});const c=[];this.interceptors.response.forEach(function(_){c.push(_.fulfilled,_.rejected)});let u,f=0,d;if(!l){const g=[cd.bind(this),void 0];for(g.unshift(...a),g.push(...c),d=g.length,u=Promise.resolve(t);f<d;)u=u.then(g[f++],g[f++]);return u}d=a.length;let h=t;for(f=0;f<d;){const g=a[f++],_=a[f++];try{h=g(h)}catch(m){_.call(this,m);break}}try{u=cd.call(this,h)}catch(g){return Promise.reject(g)}for(f=0,d=c.length;f<d;)u=u.then(c[f++],c[f++]);return u}getUri(e){e=Is(this.defaults,e);const t=hg(e.baseURL,e.url,e.allowAbsoluteUrls);return ag(t,e.params,e.paramsSerializer)}};re.forEach(["delete","get","head","options"],function(e){Ds.prototype[e]=function(t,i){return this.request(Is(i||{},{method:e,url:t,data:(i||{}).data}))}});re.forEach(["post","put","patch"],function(e){function t(i){return function(r,o,a){return this.request(Is(a||{},{method:e,headers:i?{"Content-Type":"multipart/form-data"}:{},url:r,data:o}))}}Ds.prototype[e]=t(),Ds.prototype[e+"Form"]=t(!0)});let HS=class vg{constructor(e){if(typeof e!="function")throw new TypeError("executor must be a function.");let t;this.promise=new Promise(function(r){t=r});const i=this;this.promise.then(s=>{if(!i._listeners)return;let r=i._listeners.length;for(;r-- >0;)i._listeners[r](s);i._listeners=null}),this.promise.then=s=>{let r;const o=new Promise(a=>{i.subscribe(a),r=a}).then(s);return o.cancel=function(){i.unsubscribe(r)},o},e(function(r,o,a){i.reason||(i.reason=new Cr(r,o,a),t(i.reason))})}throwIfRequested(){if(this.reason)throw this.reason}subscribe(e){if(this.reason){e(this.reason);return}this._listeners?this._listeners.push(e):this._listeners=[e]}unsubscribe(e){if(!this._listeners)return;const t=this._listeners.indexOf(e);t!==-1&&this._listeners.splice(t,1)}toAbortSignal(){const e=new AbortController,t=i=>{e.abort(i)};return this.subscribe(t),e.signal.unsubscribe=()=>this.unsubscribe(t),e.signal}static source(){let e;return{token:new vg(function(s){e=s}),cancel:e}}};function VS(n){return function(t){return n.apply(null,t)}}function GS(n){return re.isObject(n)&&n.isAxiosError===!0}const Jc={Continue:100,SwitchingProtocols:101,Processing:102,EarlyHints:103,Ok:200,Created:201,Accepted:202,NonAuthoritativeInformation:203,NoContent:204,ResetContent:205,PartialContent:206,MultiStatus:207,AlreadyReported:208,ImUsed:226,MultipleChoices:300,MovedPermanently:301,Found:302,SeeOther:303,NotModified:304,UseProxy:305,Unused:306,TemporaryRedirect:307,PermanentRedirect:308,BadRequest:400,Unauthorized:401,PaymentRequired:402,Forbidden:403,NotFound:404,MethodNotAllowed:405,NotAcceptable:406,ProxyAuthenticationRequired:407,RequestTimeout:408,Conflict:409,Gone:410,LengthRequired:411,PreconditionFailed:412,PayloadTooLarge:413,UriTooLong:414,UnsupportedMediaType:415,RangeNotSatisfiable:416,ExpectationFailed:417,ImATeapot:418,MisdirectedRequest:421,UnprocessableEntity:422,Locked:423,FailedDependency:424,TooEarly:425,UpgradeRequired:426,PreconditionRequired:428,TooManyRequests:429,RequestHeaderFieldsTooLarge:431,UnavailableForLegalReasons:451,InternalServerError:500,NotImplemented:501,BadGateway:502,ServiceUnavailable:503,GatewayTimeout:504,HttpVersionNotSupported:505,VariantAlsoNegotiates:506,InsufficientStorage:507,LoopDetected:508,NotExtended:510,NetworkAuthenticationRequired:511};Object.entries(Jc).forEach(([n,e])=>{Jc[e]=n});function xg(n){const e=new Ds(n),t=Ym(Ds.prototype.request,e);return re.extend(t,Ds.prototype,e,{allOwnKeys:!0}),re.extend(t,e,null,{allOwnKeys:!0}),t.create=function(s){return xg(Is(n,s))},t}const Ut=xg(Oo);Ut.Axios=Ds;Ut.CanceledError=Cr;Ut.CancelToken=HS;Ut.isCancel=ug;Ut.VERSION=_g;Ut.toFormData=Ml;Ut.AxiosError=Qe;Ut.Cancel=Ut.CanceledError;Ut.all=function(e){return Promise.all(e)};Ut.spread=VS;Ut.isAxiosError=GS;Ut.mergeConfig=Is;Ut.AxiosHeaders=fn;Ut.formToJSON=n=>cg(re.isHTMLForm(n)?new FormData(n):n);Ut.getAdapter=gg.getAdapter;Ut.HttpStatusCode=Jc;Ut.default=Ut;const{Axios:BD,AxiosError:kD,CanceledError:zD,isCancel:HD,CancelToken:VD,VERSION:GD,all:WD,Cancel:XD,isAxiosError:$D,spread:qD,toFormData:jD,AxiosHeaders:YD,HttpStatusCode:KD,formToJSON:ZD,getAdapter:JD,mergeConfig:QD}=Ut,En=Ut.create({baseURL:"http://localhost:8009",timeout:1e4,headers:{"Content-Type":"application/json"}});En.interceptors.request.use(n=>n,n=>Promise.reject(n));En.interceptors.response.use(n=>{if(Array.isArray(n.data)||n.data&&typeof n.data=="object"&&!("success"in n.data)&&!("code"in n.data))return n;const{success:e,code:t,msg:i}=n.data;return e?n:Promise.reject(new Error(i||"请求失败"))},n=>(n.response?n.response.status:n.request,Promise.reject(n)));async function WS(){try{return(await En.get("/api/config/rooms")).data}catch{return[]}}async function Sf(n){try{const t=(await En.get("/api/config/rooms")).data.find(i=>i.roomId===n);return t||null}catch{return null}}async function XS(n){try{const t=(await En.get("/api/config/rooms")).data.find(i=>i.roomId===n);return t?{roomId:n,cols:t.cols||30,rows:t.rows||22,maxRacks:t.max_racks||660}:{roomId:n,cols:30,rows:22,maxRacks:660}}catch{return{roomId:n,cols:30,rows:22,maxRacks:660}}}/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const bf="179",mr={ROTATE:0,DOLLY:1,PAN:2},rr={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},$S=0,fd=1,qS=2,yg=1,jS=2,Mi=3,rs=0,hn=1,Gn=2,ts=0,gr=1,hd=2,dd=3,pd=4,YS=5,Ts=100,KS=101,ZS=102,JS=103,QS=104,eb=200,tb=201,nb=202,ib=203,Qc=204,eu=205,sb=206,rb=207,ob=208,ab=209,lb=210,cb=211,ub=212,fb=213,hb=214,tu=0,nu=1,iu=2,Sr=3,su=4,ru=5,ou=6,au=7,Sg=0,db=1,pb=2,ns=0,mb=1,gb=2,_b=3,bg=4,vb=5,xb=6,yb=7,Mg=300,br=301,Mr=302,lu=303,cu=304,wl=306,uu=1e3,As=1001,fu=1002,qn=1003,Sb=1004,Ko=1005,oi=1006,Yl=1007,Rs=1008,Di=1009,Eg=1010,Tg=1011,So=1012,Mf=1013,Us=1014,Ai=1015,Fo=1016,Ef=1017,Tf=1018,bo=1020,wg=35902,Ag=1021,Rg=1022,Xn=1023,Mo=1026,Eo=1027,Cg=1028,wf=1029,Pg=1030,Af=1031,Rf=1033,Da=33776,La=33777,Ia=33778,Ua=33779,hu=35840,du=35841,pu=35842,mu=35843,gu=36196,_u=37492,vu=37496,xu=37808,yu=37809,Su=37810,bu=37811,Mu=37812,Eu=37813,Tu=37814,wu=37815,Au=37816,Ru=37817,Cu=37818,Pu=37819,Du=37820,Lu=37821,Na=36492,Iu=36494,Uu=36495,Dg=36283,Nu=36284,Ou=36285,Fu=36286,bb=3200,Mb=3201,Lg=0,Eb=1,Yi="",Cn="srgb",Er="srgb-linear",Qa="linear",mt="srgb",Gs=7680,md=519,Tb=512,wb=513,Ab=514,Ig=515,Rb=516,Cb=517,Pb=518,Db=519,gd=35044,_d="300 es",ai=2e3,el=2001;class ks{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){const i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){const i=this._listeners;if(i===void 0)return;const s=i[e];if(s!==void 0){const r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const i=t[e.type];if(i!==void 0){e.target=this;const s=i.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,e);e.target=null}}}const Xt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Oa=Math.PI/180,Bu=180/Math.PI;function Pr(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Xt[n&255]+Xt[n>>8&255]+Xt[n>>16&255]+Xt[n>>24&255]+"-"+Xt[e&255]+Xt[e>>8&255]+"-"+Xt[e>>16&15|64]+Xt[e>>24&255]+"-"+Xt[t&63|128]+Xt[t>>8&255]+"-"+Xt[t>>16&255]+Xt[t>>24&255]+Xt[i&255]+Xt[i>>8&255]+Xt[i>>16&255]+Xt[i>>24&255]).toLowerCase()}function nt(n,e,t){return Math.max(e,Math.min(t,n))}function Lb(n,e){return(n%e+e)%e}function Kl(n,e,t){return(1-t)*n+t*e}function kr(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function an(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}const Ib={DEG2RAD:Oa};class Se{constructor(e=0,t=0){Se.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6],this.y=s[1]*t+s[4]*i+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=nt(this.x,e.x,t.x),this.y=nt(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=nt(this.x,e,t),this.y=nt(this.y,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(nt(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(nt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),s=Math.sin(t),r=this.x-e.x,o=this.y-e.y;return this.x=r*i-o*s+e.x,this.y=r*s+o*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Ns{constructor(e=0,t=0,i=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=s}static slerpFlat(e,t,i,s,r,o,a){let l=i[s+0],c=i[s+1],u=i[s+2],f=i[s+3];const d=r[o+0],h=r[o+1],g=r[o+2],_=r[o+3];if(a===0){e[t+0]=l,e[t+1]=c,e[t+2]=u,e[t+3]=f;return}if(a===1){e[t+0]=d,e[t+1]=h,e[t+2]=g,e[t+3]=_;return}if(f!==_||l!==d||c!==h||u!==g){let m=1-a;const p=l*d+c*h+u*g+f*_,C=p>=0?1:-1,b=1-p*p;if(b>Number.EPSILON){const w=Math.sqrt(b),L=Math.atan2(w,p*C);m=Math.sin(m*L)/w,a=Math.sin(a*L)/w}const x=a*C;if(l=l*m+d*x,c=c*m+h*x,u=u*m+g*x,f=f*m+_*x,m===1-a){const w=1/Math.sqrt(l*l+c*c+u*u+f*f);l*=w,c*=w,u*=w,f*=w}}e[t]=l,e[t+1]=c,e[t+2]=u,e[t+3]=f}static multiplyQuaternionsFlat(e,t,i,s,r,o){const a=i[s],l=i[s+1],c=i[s+2],u=i[s+3],f=r[o],d=r[o+1],h=r[o+2],g=r[o+3];return e[t]=a*g+u*f+l*h-c*d,e[t+1]=l*g+u*d+c*f-a*h,e[t+2]=c*g+u*h+a*d-l*f,e[t+3]=u*g-a*f-l*d-c*h,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,s){return this._x=e,this._y=t,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,s=e._y,r=e._z,o=e._order,a=Math.cos,l=Math.sin,c=a(i/2),u=a(s/2),f=a(r/2),d=l(i/2),h=l(s/2),g=l(r/2);switch(o){case"XYZ":this._x=d*u*f+c*h*g,this._y=c*h*f-d*u*g,this._z=c*u*g+d*h*f,this._w=c*u*f-d*h*g;break;case"YXZ":this._x=d*u*f+c*h*g,this._y=c*h*f-d*u*g,this._z=c*u*g-d*h*f,this._w=c*u*f+d*h*g;break;case"ZXY":this._x=d*u*f-c*h*g,this._y=c*h*f+d*u*g,this._z=c*u*g+d*h*f,this._w=c*u*f-d*h*g;break;case"ZYX":this._x=d*u*f-c*h*g,this._y=c*h*f+d*u*g,this._z=c*u*g-d*h*f,this._w=c*u*f+d*h*g;break;case"YZX":this._x=d*u*f+c*h*g,this._y=c*h*f+d*u*g,this._z=c*u*g-d*h*f,this._w=c*u*f-d*h*g;break;case"XZY":this._x=d*u*f-c*h*g,this._y=c*h*f-d*u*g,this._z=c*u*g+d*h*f,this._w=c*u*f+d*h*g;break;default:}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,s=Math.sin(i);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],s=t[4],r=t[8],o=t[1],a=t[5],l=t[9],c=t[2],u=t[6],f=t[10],d=i+a+f;if(d>0){const h=.5/Math.sqrt(d+1);this._w=.25/h,this._x=(u-l)*h,this._y=(r-c)*h,this._z=(o-s)*h}else if(i>a&&i>f){const h=2*Math.sqrt(1+i-a-f);this._w=(u-l)/h,this._x=.25*h,this._y=(s+o)/h,this._z=(r+c)/h}else if(a>f){const h=2*Math.sqrt(1+a-i-f);this._w=(r-c)/h,this._x=(s+o)/h,this._y=.25*h,this._z=(l+u)/h}else{const h=2*Math.sqrt(1+f-i-a);this._w=(o-s)/h,this._x=(r+c)/h,this._y=(l+u)/h,this._z=.25*h}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(nt(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const s=Math.min(1,t/i);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,s=e._y,r=e._z,o=e._w,a=t._x,l=t._y,c=t._z,u=t._w;return this._x=i*u+o*a+s*c-r*l,this._y=s*u+o*l+r*a-i*c,this._z=r*u+o*c+i*l-s*a,this._w=o*u-i*a-s*l-r*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const i=this._x,s=this._y,r=this._z,o=this._w;let a=o*e._w+i*e._x+s*e._y+r*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=i,this._y=s,this._z=r,this;const l=1-a*a;if(l<=Number.EPSILON){const h=1-t;return this._w=h*o+t*this._w,this._x=h*i+t*this._x,this._y=h*s+t*this._y,this._z=h*r+t*this._z,this.normalize(),this}const c=Math.sqrt(l),u=Math.atan2(c,a),f=Math.sin((1-t)*u)/c,d=Math.sin(t*u)/c;return this._w=o*f+this._w*d,this._x=i*f+this._x*d,this._y=s*f+this._y*d,this._z=r*f+this._z*d,this._onChangeCallback(),this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class ${constructor(e=0,t=0,i=0){$.prototype.isVector3=!0,this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(vd.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(vd.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6]*s,this.y=r[1]*t+r[4]*i+r[7]*s,this.z=r[2]*t+r[5]*i+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,s=this.z,r=e.elements,o=1/(r[3]*t+r[7]*i+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*i+r[8]*s+r[12])*o,this.y=(r[1]*t+r[5]*i+r[9]*s+r[13])*o,this.z=(r[2]*t+r[6]*i+r[10]*s+r[14])*o,this}applyQuaternion(e){const t=this.x,i=this.y,s=this.z,r=e.x,o=e.y,a=e.z,l=e.w,c=2*(o*s-a*i),u=2*(a*t-r*s),f=2*(r*i-o*t);return this.x=t+l*c+o*f-a*u,this.y=i+l*u+a*c-r*f,this.z=s+l*f+r*u-o*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*i+r[8]*s,this.y=r[1]*t+r[5]*i+r[9]*s,this.z=r[2]*t+r[6]*i+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=nt(this.x,e.x,t.x),this.y=nt(this.y,e.y,t.y),this.z=nt(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=nt(this.x,e,t),this.y=nt(this.y,e,t),this.z=nt(this.z,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(nt(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,s=e.y,r=e.z,o=t.x,a=t.y,l=t.z;return this.x=s*l-r*a,this.y=r*o-i*l,this.z=i*a-s*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return Zl.copy(this).projectOnVector(e),this.sub(Zl)}reflect(e){return this.sub(Zl.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(nt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,s=this.z-e.z;return t*t+i*i+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const s=Math.sin(t)*e;return this.x=s*Math.sin(i),this.y=Math.cos(t)*e,this.z=s*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Zl=new $,vd=new Ns;class et{constructor(e,t,i,s,r,o,a,l,c){et.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,s,r,o,a,l,c)}set(e,t,i,s,r,o,a,l,c){const u=this.elements;return u[0]=e,u[1]=s,u[2]=a,u[3]=t,u[4]=r,u[5]=l,u[6]=i,u[7]=o,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,s=t.elements,r=this.elements,o=i[0],a=i[3],l=i[6],c=i[1],u=i[4],f=i[7],d=i[2],h=i[5],g=i[8],_=s[0],m=s[3],p=s[6],C=s[1],b=s[4],x=s[7],w=s[2],L=s[5],P=s[8];return r[0]=o*_+a*C+l*w,r[3]=o*m+a*b+l*L,r[6]=o*p+a*x+l*P,r[1]=c*_+u*C+f*w,r[4]=c*m+u*b+f*L,r[7]=c*p+u*x+f*P,r[2]=d*_+h*C+g*w,r[5]=d*m+h*b+g*L,r[8]=d*p+h*x+g*P,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8];return t*o*u-t*a*c-i*r*u+i*a*l+s*r*c-s*o*l}invert(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8],f=u*o-a*c,d=a*l-u*r,h=c*r-o*l,g=t*f+i*d+s*h;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return e[0]=f*_,e[1]=(s*c-u*i)*_,e[2]=(a*i-s*o)*_,e[3]=d*_,e[4]=(u*t-s*l)*_,e[5]=(s*r-a*t)*_,e[6]=h*_,e[7]=(i*l-c*t)*_,e[8]=(o*t-i*r)*_,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,s,r,o,a){const l=Math.cos(r),c=Math.sin(r);return this.set(i*l,i*c,-i*(l*o+c*a)+o+e,-s*c,s*l,-s*(-c*o+l*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(Jl.makeScale(e,t)),this}rotate(e){return this.premultiply(Jl.makeRotation(-e)),this}translate(e,t){return this.premultiply(Jl.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let s=0;s<9;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Jl=new et;function Ug(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function tl(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function Ub(){const n=tl("canvas");return n.style.display="block",n}const xd={};function _r(n){n in xd||(xd[n]=!0)}function Nb(n,e,t){return new Promise(function(i,s){function r(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:s();break;case n.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:i()}}setTimeout(r,t)})}const yd=new et().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Sd=new et().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Ob(){const n={enabled:!0,workingColorSpace:Er,spaces:{},convert:function(s,r,o){return this.enabled===!1||r===o||!r||!o||(this.spaces[r].transfer===mt&&(s.r=Ri(s.r),s.g=Ri(s.g),s.b=Ri(s.b)),this.spaces[r].primaries!==this.spaces[o].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===mt&&(s.r=vr(s.r),s.g=vr(s.g),s.b=vr(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Yi?Qa:this.spaces[s].transfer},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,o){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return _r("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return _r("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(s,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[Er]:{primaries:e,whitePoint:i,transfer:Qa,toXYZ:yd,fromXYZ:Sd,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Cn},outputColorSpaceConfig:{drawingBufferColorSpace:Cn}},[Cn]:{primaries:e,whitePoint:i,transfer:mt,toXYZ:yd,fromXYZ:Sd,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Cn}}}),n}const at=Ob();function Ri(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function vr(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let Ws;class Fb{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{Ws===void 0&&(Ws=tl("canvas")),Ws.width=e.width,Ws.height=e.height;const s=Ws.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),i=Ws}return i.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=tl("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const s=i.getImageData(0,0,e.width,e.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=Ri(r[o]/255)*255;return i.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(Ri(t[i]/255)*255):t[i]=Ri(t[i]);return{data:t,width:e.width,height:e.height}}else return e}}let Bb=0;class Cf{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Bb++}),this.uuid=Pr(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):t instanceof VideoFrame?e.set(t.displayHeight,t.displayWidth,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(Ql(s[o].image)):r.push(Ql(s[o]))}else r=Ql(s);i.url=r}return t||(e.images[this.uuid]=i),i}}function Ql(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?Fb.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:{}}let kb=0;const ec=new $;class sn extends ks{constructor(e=sn.DEFAULT_IMAGE,t=sn.DEFAULT_MAPPING,i=As,s=As,r=oi,o=Rs,a=Xn,l=Di,c=sn.DEFAULT_ANISOTROPY,u=Yi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:kb++}),this.uuid=Pr(),this.name="",this.source=new Cf(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new Se(0,0),this.repeat=new Se(1,1),this.center=new Se(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new et,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(ec).x}get height(){return this.source.getSize(ec).y}get depth(){return this.source.getSize(ec).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const i=e[t];if(i===void 0)continue;const s=this[t];s!==void 0&&(s&&i&&s.isVector2&&i.isVector2||s&&i&&s.isVector3&&i.isVector3||s&&i&&s.isMatrix3&&i.isMatrix3?s.copy(i):this[t]=i)}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Mg)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case uu:e.x=e.x-Math.floor(e.x);break;case As:e.x=e.x<0?0:1;break;case fu:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case uu:e.y=e.y-Math.floor(e.y);break;case As:e.y=e.y<0?0:1;break;case fu:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}sn.DEFAULT_IMAGE=null;sn.DEFAULT_MAPPING=Mg;sn.DEFAULT_ANISOTROPY=1;class Lt{constructor(e=0,t=0,i=0,s=1){Lt.prototype.isVector4=!0,this.x=e,this.y=t,this.z=i,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,s){return this.x=e,this.y=t,this.z=i,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,s=this.z,r=this.w,o=e.elements;return this.x=o[0]*t+o[4]*i+o[8]*s+o[12]*r,this.y=o[1]*t+o[5]*i+o[9]*s+o[13]*r,this.z=o[2]*t+o[6]*i+o[10]*s+o[14]*r,this.w=o[3]*t+o[7]*i+o[11]*s+o[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,s,r;const l=e.elements,c=l[0],u=l[4],f=l[8],d=l[1],h=l[5],g=l[9],_=l[2],m=l[6],p=l[10];if(Math.abs(u-d)<.01&&Math.abs(f-_)<.01&&Math.abs(g-m)<.01){if(Math.abs(u+d)<.1&&Math.abs(f+_)<.1&&Math.abs(g+m)<.1&&Math.abs(c+h+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const b=(c+1)/2,x=(h+1)/2,w=(p+1)/2,L=(u+d)/4,P=(f+_)/4,M=(g+m)/4;return b>x&&b>w?b<.01?(i=0,s=.707106781,r=.707106781):(i=Math.sqrt(b),s=L/i,r=P/i):x>w?x<.01?(i=.707106781,s=0,r=.707106781):(s=Math.sqrt(x),i=L/s,r=M/s):w<.01?(i=.707106781,s=.707106781,r=0):(r=Math.sqrt(w),i=P/r,s=M/r),this.set(i,s,r,t),this}let C=Math.sqrt((m-g)*(m-g)+(f-_)*(f-_)+(d-u)*(d-u));return Math.abs(C)<.001&&(C=1),this.x=(m-g)/C,this.y=(f-_)/C,this.z=(d-u)/C,this.w=Math.acos((c+h+p-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=nt(this.x,e.x,t.x),this.y=nt(this.y,e.y,t.y),this.z=nt(this.z,e.z,t.z),this.w=nt(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=nt(this.x,e,t),this.y=nt(this.y,e,t),this.z=nt(this.z,e,t),this.w=nt(this.w,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(nt(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class zb extends ks{constructor(e=1,t=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:oi,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},i),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=i.depth,this.scissor=new Lt(0,0,e,t),this.scissorTest=!1,this.viewport=new Lt(0,0,e,t);const s={width:e,height:t,depth:i.depth},r=new sn(s);this.textures=[];const o=i.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview}_setTextureOptions(e={}){const t={minFilter:oi,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=i,this.textures[s].isArrayTexture=this.textures[s].image.depth>1;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,i=e.textures.length;t<i;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const s=Object.assign({},e.textures[t].image);this.textures[t].source=new Cf(s)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Os extends zb{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class Ng extends sn{constructor(e=null,t=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=qn,this.minFilter=qn,this.wrapR=As,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class Hb extends sn{constructor(e=null,t=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=qn,this.minFilter=qn,this.wrapR=As,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Bo{constructor(e=new $(1/0,1/0,1/0),t=new $(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(Fn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(Fn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=Fn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const r=i.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,Fn):Fn.fromBufferAttribute(r,o),Fn.applyMatrix4(e.matrixWorld),this.expandByPoint(Fn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Zo.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Zo.copy(i.boundingBox)),Zo.applyMatrix4(e.matrixWorld),this.union(Zo)}const s=e.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Fn),Fn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(zr),Jo.subVectors(this.max,zr),Xs.subVectors(e.a,zr),$s.subVectors(e.b,zr),qs.subVectors(e.c,zr),Fi.subVectors($s,Xs),Bi.subVectors(qs,$s),ms.subVectors(Xs,qs);let t=[0,-Fi.z,Fi.y,0,-Bi.z,Bi.y,0,-ms.z,ms.y,Fi.z,0,-Fi.x,Bi.z,0,-Bi.x,ms.z,0,-ms.x,-Fi.y,Fi.x,0,-Bi.y,Bi.x,0,-ms.y,ms.x,0];return!tc(t,Xs,$s,qs,Jo)||(t=[1,0,0,0,1,0,0,0,1],!tc(t,Xs,$s,qs,Jo))?!1:(Qo.crossVectors(Fi,Bi),t=[Qo.x,Qo.y,Qo.z],tc(t,Xs,$s,qs,Jo))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Fn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Fn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(vi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),vi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),vi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),vi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),vi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),vi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),vi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),vi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(vi),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const vi=[new $,new $,new $,new $,new $,new $,new $,new $],Fn=new $,Zo=new Bo,Xs=new $,$s=new $,qs=new $,Fi=new $,Bi=new $,ms=new $,zr=new $,Jo=new $,Qo=new $,gs=new $;function tc(n,e,t,i,s){for(let r=0,o=n.length-3;r<=o;r+=3){gs.fromArray(n,r);const a=s.x*Math.abs(gs.x)+s.y*Math.abs(gs.y)+s.z*Math.abs(gs.z),l=e.dot(gs),c=t.dot(gs),u=i.dot(gs);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>a)return!1}return!0}const Vb=new Bo,Hr=new $,nc=new $;class Pf{constructor(e=new $,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):Vb.setFromPoints(e).getCenter(i);let s=0;for(let r=0,o=e.length;r<o;r++)s=Math.max(s,i.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Hr.subVectors(e,this.center);const t=Hr.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),s=(i-this.radius)*.5;this.center.addScaledVector(Hr,s/i),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(nc.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Hr.copy(e.center).add(nc)),this.expandByPoint(Hr.copy(e.center).sub(nc))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}const xi=new $,ic=new $,ea=new $,ki=new $,sc=new $,ta=new $,rc=new $;class Df{constructor(e=new $,t=new $(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,xi)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=xi.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(xi.copy(this.origin).addScaledVector(this.direction,t),xi.distanceToSquared(e))}distanceSqToSegment(e,t,i,s){ic.copy(e).add(t).multiplyScalar(.5),ea.copy(t).sub(e).normalize(),ki.copy(this.origin).sub(ic);const r=e.distanceTo(t)*.5,o=-this.direction.dot(ea),a=ki.dot(this.direction),l=-ki.dot(ea),c=ki.lengthSq(),u=Math.abs(1-o*o);let f,d,h,g;if(u>0)if(f=o*l-a,d=o*a-l,g=r*u,f>=0)if(d>=-g)if(d<=g){const _=1/u;f*=_,d*=_,h=f*(f+o*d+2*a)+d*(o*f+d+2*l)+c}else d=r,f=Math.max(0,-(o*d+a)),h=-f*f+d*(d+2*l)+c;else d=-r,f=Math.max(0,-(o*d+a)),h=-f*f+d*(d+2*l)+c;else d<=-g?(f=Math.max(0,-(-o*r+a)),d=f>0?-r:Math.min(Math.max(-r,-l),r),h=-f*f+d*(d+2*l)+c):d<=g?(f=0,d=Math.min(Math.max(-r,-l),r),h=d*(d+2*l)+c):(f=Math.max(0,-(o*r+a)),d=f>0?r:Math.min(Math.max(-r,-l),r),h=-f*f+d*(d+2*l)+c);else d=o>0?-r:r,f=Math.max(0,-(o*d+a)),h=-f*f+d*(d+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,f),s&&s.copy(ic).addScaledVector(ea,d),h}intersectSphere(e,t){xi.subVectors(e.center,this.origin);const i=xi.dot(this.direction),s=xi.dot(xi)-i*i,r=e.radius*e.radius;if(s>r)return null;const o=Math.sqrt(r-s),a=i-o,l=i+o;return l<0?null:a<0?this.at(l,t):this.at(a,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,s,r,o,a,l;const c=1/this.direction.x,u=1/this.direction.y,f=1/this.direction.z,d=this.origin;return c>=0?(i=(e.min.x-d.x)*c,s=(e.max.x-d.x)*c):(i=(e.max.x-d.x)*c,s=(e.min.x-d.x)*c),u>=0?(r=(e.min.y-d.y)*u,o=(e.max.y-d.y)*u):(r=(e.max.y-d.y)*u,o=(e.min.y-d.y)*u),i>o||r>s||((r>i||isNaN(i))&&(i=r),(o<s||isNaN(s))&&(s=o),f>=0?(a=(e.min.z-d.z)*f,l=(e.max.z-d.z)*f):(a=(e.max.z-d.z)*f,l=(e.min.z-d.z)*f),i>l||a>s)||((a>i||i!==i)&&(i=a),(l<s||s!==s)&&(s=l),s<0)?null:this.at(i>=0?i:s,t)}intersectsBox(e){return this.intersectBox(e,xi)!==null}intersectTriangle(e,t,i,s,r){sc.subVectors(t,e),ta.subVectors(i,e),rc.crossVectors(sc,ta);let o=this.direction.dot(rc),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;ki.subVectors(this.origin,e);const l=a*this.direction.dot(ta.crossVectors(ki,ta));if(l<0)return null;const c=a*this.direction.dot(sc.cross(ki));if(c<0||l+c>o)return null;const u=-a*ki.dot(rc);return u<0?null:this.at(u/o,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class It{constructor(e,t,i,s,r,o,a,l,c,u,f,d,h,g,_,m){It.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,s,r,o,a,l,c,u,f,d,h,g,_,m)}set(e,t,i,s,r,o,a,l,c,u,f,d,h,g,_,m){const p=this.elements;return p[0]=e,p[4]=t,p[8]=i,p[12]=s,p[1]=r,p[5]=o,p[9]=a,p[13]=l,p[2]=c,p[6]=u,p[10]=f,p[14]=d,p[3]=h,p[7]=g,p[11]=_,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new It().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,i=e.elements,s=1/js.setFromMatrixColumn(e,0).length(),r=1/js.setFromMatrixColumn(e,1).length(),o=1/js.setFromMatrixColumn(e,2).length();return t[0]=i[0]*s,t[1]=i[1]*s,t[2]=i[2]*s,t[3]=0,t[4]=i[4]*r,t[5]=i[5]*r,t[6]=i[6]*r,t[7]=0,t[8]=i[8]*o,t[9]=i[9]*o,t[10]=i[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,s=e.y,r=e.z,o=Math.cos(i),a=Math.sin(i),l=Math.cos(s),c=Math.sin(s),u=Math.cos(r),f=Math.sin(r);if(e.order==="XYZ"){const d=o*u,h=o*f,g=a*u,_=a*f;t[0]=l*u,t[4]=-l*f,t[8]=c,t[1]=h+g*c,t[5]=d-_*c,t[9]=-a*l,t[2]=_-d*c,t[6]=g+h*c,t[10]=o*l}else if(e.order==="YXZ"){const d=l*u,h=l*f,g=c*u,_=c*f;t[0]=d+_*a,t[4]=g*a-h,t[8]=o*c,t[1]=o*f,t[5]=o*u,t[9]=-a,t[2]=h*a-g,t[6]=_+d*a,t[10]=o*l}else if(e.order==="ZXY"){const d=l*u,h=l*f,g=c*u,_=c*f;t[0]=d-_*a,t[4]=-o*f,t[8]=g+h*a,t[1]=h+g*a,t[5]=o*u,t[9]=_-d*a,t[2]=-o*c,t[6]=a,t[10]=o*l}else if(e.order==="ZYX"){const d=o*u,h=o*f,g=a*u,_=a*f;t[0]=l*u,t[4]=g*c-h,t[8]=d*c+_,t[1]=l*f,t[5]=_*c+d,t[9]=h*c-g,t[2]=-c,t[6]=a*l,t[10]=o*l}else if(e.order==="YZX"){const d=o*l,h=o*c,g=a*l,_=a*c;t[0]=l*u,t[4]=_-d*f,t[8]=g*f+h,t[1]=f,t[5]=o*u,t[9]=-a*u,t[2]=-c*u,t[6]=h*f+g,t[10]=d-_*f}else if(e.order==="XZY"){const d=o*l,h=o*c,g=a*l,_=a*c;t[0]=l*u,t[4]=-f,t[8]=c*u,t[1]=d*f+_,t[5]=o*u,t[9]=h*f-g,t[2]=g*f-h,t[6]=a*u,t[10]=_*f+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Gb,e,Wb)}lookAt(e,t,i){const s=this.elements;return gn.subVectors(e,t),gn.lengthSq()===0&&(gn.z=1),gn.normalize(),zi.crossVectors(i,gn),zi.lengthSq()===0&&(Math.abs(i.z)===1?gn.x+=1e-4:gn.z+=1e-4,gn.normalize(),zi.crossVectors(i,gn)),zi.normalize(),na.crossVectors(gn,zi),s[0]=zi.x,s[4]=na.x,s[8]=gn.x,s[1]=zi.y,s[5]=na.y,s[9]=gn.y,s[2]=zi.z,s[6]=na.z,s[10]=gn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,s=t.elements,r=this.elements,o=i[0],a=i[4],l=i[8],c=i[12],u=i[1],f=i[5],d=i[9],h=i[13],g=i[2],_=i[6],m=i[10],p=i[14],C=i[3],b=i[7],x=i[11],w=i[15],L=s[0],P=s[4],M=s[8],y=s[12],E=s[1],I=s[5],V=s[9],K=s[13],ee=s[2],se=s[6],O=s[10],k=s[14],N=s[3],ue=s[7],ye=s[11],Te=s[15];return r[0]=o*L+a*E+l*ee+c*N,r[4]=o*P+a*I+l*se+c*ue,r[8]=o*M+a*V+l*O+c*ye,r[12]=o*y+a*K+l*k+c*Te,r[1]=u*L+f*E+d*ee+h*N,r[5]=u*P+f*I+d*se+h*ue,r[9]=u*M+f*V+d*O+h*ye,r[13]=u*y+f*K+d*k+h*Te,r[2]=g*L+_*E+m*ee+p*N,r[6]=g*P+_*I+m*se+p*ue,r[10]=g*M+_*V+m*O+p*ye,r[14]=g*y+_*K+m*k+p*Te,r[3]=C*L+b*E+x*ee+w*N,r[7]=C*P+b*I+x*se+w*ue,r[11]=C*M+b*V+x*O+w*ye,r[15]=C*y+b*K+x*k+w*Te,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],s=e[8],r=e[12],o=e[1],a=e[5],l=e[9],c=e[13],u=e[2],f=e[6],d=e[10],h=e[14],g=e[3],_=e[7],m=e[11],p=e[15];return g*(+r*l*f-s*c*f-r*a*d+i*c*d+s*a*h-i*l*h)+_*(+t*l*h-t*c*d+r*o*d-s*o*h+s*c*u-r*l*u)+m*(+t*c*f-t*a*h-r*o*f+i*o*h+r*a*u-i*c*u)+p*(-s*a*u-t*l*f+t*a*d+s*o*f-i*o*d+i*l*u)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8],f=e[9],d=e[10],h=e[11],g=e[12],_=e[13],m=e[14],p=e[15],C=f*m*c-_*d*c+_*l*h-a*m*h-f*l*p+a*d*p,b=g*d*c-u*m*c-g*l*h+o*m*h+u*l*p-o*d*p,x=u*_*c-g*f*c+g*a*h-o*_*h-u*a*p+o*f*p,w=g*f*l-u*_*l-g*a*d+o*_*d+u*a*m-o*f*m,L=t*C+i*b+s*x+r*w;if(L===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const P=1/L;return e[0]=C*P,e[1]=(_*d*r-f*m*r-_*s*h+i*m*h+f*s*p-i*d*p)*P,e[2]=(a*m*r-_*l*r+_*s*c-i*m*c-a*s*p+i*l*p)*P,e[3]=(f*l*r-a*d*r-f*s*c+i*d*c+a*s*h-i*l*h)*P,e[4]=b*P,e[5]=(u*m*r-g*d*r+g*s*h-t*m*h-u*s*p+t*d*p)*P,e[6]=(g*l*r-o*m*r-g*s*c+t*m*c+o*s*p-t*l*p)*P,e[7]=(o*d*r-u*l*r+u*s*c-t*d*c-o*s*h+t*l*h)*P,e[8]=x*P,e[9]=(g*f*r-u*_*r-g*i*h+t*_*h+u*i*p-t*f*p)*P,e[10]=(o*_*r-g*a*r+g*i*c-t*_*c-o*i*p+t*a*p)*P,e[11]=(u*a*r-o*f*r-u*i*c+t*f*c+o*i*h-t*a*h)*P,e[12]=w*P,e[13]=(u*_*s-g*f*s+g*i*d-t*_*d-u*i*m+t*f*m)*P,e[14]=(g*a*s-o*_*s-g*i*l+t*_*l+o*i*m-t*a*m)*P,e[15]=(o*f*s-u*a*s+u*i*l-t*f*l-o*i*d+t*a*d)*P,this}scale(e){const t=this.elements,i=e.x,s=e.y,r=e.z;return t[0]*=i,t[4]*=s,t[8]*=r,t[1]*=i,t[5]*=s,t[9]*=r,t[2]*=i,t[6]*=s,t[10]*=r,t[3]*=i,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,s))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),s=Math.sin(t),r=1-i,o=e.x,a=e.y,l=e.z,c=r*o,u=r*a;return this.set(c*o+i,c*a-s*l,c*l+s*a,0,c*a+s*l,u*a+i,u*l-s*o,0,c*l-s*a,u*l+s*o,r*l*l+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,s,r,o){return this.set(1,i,r,0,e,1,o,0,t,s,1,0,0,0,0,1),this}compose(e,t,i){const s=this.elements,r=t._x,o=t._y,a=t._z,l=t._w,c=r+r,u=o+o,f=a+a,d=r*c,h=r*u,g=r*f,_=o*u,m=o*f,p=a*f,C=l*c,b=l*u,x=l*f,w=i.x,L=i.y,P=i.z;return s[0]=(1-(_+p))*w,s[1]=(h+x)*w,s[2]=(g-b)*w,s[3]=0,s[4]=(h-x)*L,s[5]=(1-(d+p))*L,s[6]=(m+C)*L,s[7]=0,s[8]=(g+b)*P,s[9]=(m-C)*P,s[10]=(1-(d+_))*P,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,i){const s=this.elements;let r=js.set(s[0],s[1],s[2]).length();const o=js.set(s[4],s[5],s[6]).length(),a=js.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),e.x=s[12],e.y=s[13],e.z=s[14],Bn.copy(this);const c=1/r,u=1/o,f=1/a;return Bn.elements[0]*=c,Bn.elements[1]*=c,Bn.elements[2]*=c,Bn.elements[4]*=u,Bn.elements[5]*=u,Bn.elements[6]*=u,Bn.elements[8]*=f,Bn.elements[9]*=f,Bn.elements[10]*=f,t.setFromRotationMatrix(Bn),i.x=r,i.y=o,i.z=a,this}makePerspective(e,t,i,s,r,o,a=ai,l=!1){const c=this.elements,u=2*r/(t-e),f=2*r/(i-s),d=(t+e)/(t-e),h=(i+s)/(i-s);let g,_;if(l)g=r/(o-r),_=o*r/(o-r);else if(a===ai)g=-(o+r)/(o-r),_=-2*o*r/(o-r);else if(a===el)g=-o/(o-r),_=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=u,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=f,c[9]=h,c[13]=0,c[2]=0,c[6]=0,c[10]=g,c[14]=_,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,i,s,r,o,a=ai,l=!1){const c=this.elements,u=2/(t-e),f=2/(i-s),d=-(t+e)/(t-e),h=-(i+s)/(i-s);let g,_;if(l)g=1/(o-r),_=o/(o-r);else if(a===ai)g=-2/(o-r),_=-(o+r)/(o-r);else if(a===el)g=-1/(o-r),_=-r/(o-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=u,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=f,c[9]=0,c[13]=h,c[2]=0,c[6]=0,c[10]=g,c[14]=_,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let s=0;s<16;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}}const js=new $,Bn=new It,Gb=new $(0,0,0),Wb=new $(1,1,1),zi=new $,na=new $,gn=new $,bd=new It,Md=new Ns;class fi{constructor(e=0,t=0,i=0,s=fi.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,s=this._order){return this._x=e,this._y=t,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const s=e.elements,r=s[0],o=s[4],a=s[8],l=s[1],c=s[5],u=s[9],f=s[2],d=s[6],h=s[10];switch(t){case"XYZ":this._y=Math.asin(nt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,h),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-nt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,h),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-f,r),this._z=0);break;case"ZXY":this._x=Math.asin(nt(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-f,h),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-nt(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(d,h),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(nt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-f,r)):(this._x=0,this._y=Math.atan2(a,h));break;case"XZY":this._z=Math.asin(-nt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-u,h),this._y=0);break;default:}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return bd.makeRotationFromQuaternion(e),this.setFromRotationMatrix(bd,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Md.setFromEuler(this),this.setFromQuaternion(Md,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}fi.DEFAULT_ORDER="XYZ";class Lf{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Xb=0;const Ed=new $,Ys=new Ns,yi=new It,ia=new $,Vr=new $,$b=new $,qb=new Ns,Td=new $(1,0,0),wd=new $(0,1,0),Ad=new $(0,0,1),Rd={type:"added"},jb={type:"removed"},Ks={type:"childadded",child:null},oc={type:"childremoved",child:null};class dn extends ks{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Xb++}),this.uuid=Pr(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=dn.DEFAULT_UP.clone();const e=new $,t=new fi,i=new Ns,s=new $(1,1,1);function r(){i.setFromEuler(t,!1)}function o(){t.setFromQuaternion(i,void 0,!1)}t._onChange(r),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new It},normalMatrix:{value:new et}}),this.matrix=new It,this.matrixWorld=new It,this.matrixAutoUpdate=dn.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=dn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Lf,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Ys.setFromAxisAngle(e,t),this.quaternion.multiply(Ys),this}rotateOnWorldAxis(e,t){return Ys.setFromAxisAngle(e,t),this.quaternion.premultiply(Ys),this}rotateX(e){return this.rotateOnAxis(Td,e)}rotateY(e){return this.rotateOnAxis(wd,e)}rotateZ(e){return this.rotateOnAxis(Ad,e)}translateOnAxis(e,t){return Ed.copy(e).applyQuaternion(this.quaternion),this.position.add(Ed.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Td,e)}translateY(e){return this.translateOnAxis(wd,e)}translateZ(e){return this.translateOnAxis(Ad,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(yi.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?ia.copy(e):ia.set(e,t,i);const s=this.parent;this.updateWorldMatrix(!0,!1),Vr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?yi.lookAt(Vr,ia,this.up):yi.lookAt(ia,Vr,this.up),this.quaternion.setFromRotationMatrix(yi),s&&(yi.extractRotation(s.matrixWorld),Ys.setFromRotationMatrix(yi),this.quaternion.premultiply(Ys.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?this:(e&&e.isObject3D&&(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Rd),Ks.child=e,this.dispatchEvent(Ks),Ks.child=null),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(jb),oc.child=e,this.dispatchEvent(oc),oc.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),yi.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),yi.multiply(e.parent.matrixWorld)),e.applyMatrix4(yi),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Rd),Ks.child=e,this.dispatchEvent(Ks),Ks.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,s=this.children.length;i<s;i++){const o=this.children[i].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Vr,e,$b),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Vr,qb,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t){const i=this.parent;if(e===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(a=>({...a})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const f=l[c];r(e.shapes,f)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(r(e.materials,this.material[l]));s.material=a}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];s.animations.push(r(e.animations,l))}}if(t){const a=o(e.geometries),l=o(e.materials),c=o(e.textures),u=o(e.images),f=o(e.shapes),d=o(e.skeletons),h=o(e.animations),g=o(e.nodes);a.length>0&&(i.geometries=a),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),u.length>0&&(i.images=u),f.length>0&&(i.shapes=f),d.length>0&&(i.skeletons=d),h.length>0&&(i.animations=h),g.length>0&&(i.nodes=g)}return i.object=s,i;function o(a){const l=[];for(const c in a){const u=a[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const s=e.children[i];this.add(s.clone())}return this}}dn.DEFAULT_UP=new $(0,1,0);dn.DEFAULT_MATRIX_AUTO_UPDATE=!0;dn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const kn=new $,Si=new $,ac=new $,bi=new $,Zs=new $,Js=new $,Cd=new $,lc=new $,cc=new $,uc=new $,fc=new Lt,hc=new Lt,dc=new Lt;class Wn{constructor(e=new $,t=new $,i=new $){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,s){s.subVectors(i,t),kn.subVectors(e,t),s.cross(kn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,i,s,r){kn.subVectors(s,t),Si.subVectors(i,t),ac.subVectors(e,t);const o=kn.dot(kn),a=kn.dot(Si),l=kn.dot(ac),c=Si.dot(Si),u=Si.dot(ac),f=o*c-a*a;if(f===0)return r.set(0,0,0),null;const d=1/f,h=(c*l-a*u)*d,g=(o*u-a*l)*d;return r.set(1-h-g,g,h)}static containsPoint(e,t,i,s){return this.getBarycoord(e,t,i,s,bi)===null?!1:bi.x>=0&&bi.y>=0&&bi.x+bi.y<=1}static getInterpolation(e,t,i,s,r,o,a,l){return this.getBarycoord(e,t,i,s,bi)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,bi.x),l.addScaledVector(o,bi.y),l.addScaledVector(a,bi.z),l)}static getInterpolatedAttribute(e,t,i,s,r,o){return fc.setScalar(0),hc.setScalar(0),dc.setScalar(0),fc.fromBufferAttribute(e,t),hc.fromBufferAttribute(e,i),dc.fromBufferAttribute(e,s),o.setScalar(0),o.addScaledVector(fc,r.x),o.addScaledVector(hc,r.y),o.addScaledVector(dc,r.z),o}static isFrontFacing(e,t,i,s){return kn.subVectors(i,t),Si.subVectors(e,t),kn.cross(Si).dot(s)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,s){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,i,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return kn.subVectors(this.c,this.b),Si.subVectors(this.a,this.b),kn.cross(Si).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Wn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Wn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,s,r){return Wn.getInterpolation(e,this.a,this.b,this.c,t,i,s,r)}containsPoint(e){return Wn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Wn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,s=this.b,r=this.c;let o,a;Zs.subVectors(s,i),Js.subVectors(r,i),lc.subVectors(e,i);const l=Zs.dot(lc),c=Js.dot(lc);if(l<=0&&c<=0)return t.copy(i);cc.subVectors(e,s);const u=Zs.dot(cc),f=Js.dot(cc);if(u>=0&&f<=u)return t.copy(s);const d=l*f-u*c;if(d<=0&&l>=0&&u<=0)return o=l/(l-u),t.copy(i).addScaledVector(Zs,o);uc.subVectors(e,r);const h=Zs.dot(uc),g=Js.dot(uc);if(g>=0&&h<=g)return t.copy(r);const _=h*c-l*g;if(_<=0&&c>=0&&g<=0)return a=c/(c-g),t.copy(i).addScaledVector(Js,a);const m=u*g-h*f;if(m<=0&&f-u>=0&&h-g>=0)return Cd.subVectors(r,s),a=(f-u)/(f-u+(h-g)),t.copy(s).addScaledVector(Cd,a);const p=1/(m+_+d);return o=_*p,a=d*p,t.copy(i).addScaledVector(Zs,o).addScaledVector(Js,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const Og={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Hi={h:0,s:0,l:0},sa={h:0,s:0,l:0};function pc(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}class lt{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Cn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,at.colorSpaceToWorking(this,t),this}setRGB(e,t,i,s=at.workingColorSpace){return this.r=e,this.g=t,this.b=i,at.colorSpaceToWorking(this,s),this}setHSL(e,t,i,s=at.workingColorSpace){if(e=Lb(e,1),t=nt(t,0,1),i=nt(i,0,1),t===0)this.r=this.g=this.b=i;else{const r=i<=.5?i*(1+t):i+t-i*t,o=2*i-r;this.r=pc(o,r,e+1/3),this.g=pc(o,r,e),this.b=pc(o,r,e-1/3)}return at.colorSpaceToWorking(this,s),this}setStyle(e,t=Cn){function i(r){r!==void 0&&parseFloat(r)<1}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(r,16),t)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Cn){const i=Og[e.toLowerCase()];return i!==void 0&&this.setHex(i,t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Ri(e.r),this.g=Ri(e.g),this.b=Ri(e.b),this}copyLinearToSRGB(e){return this.r=vr(e.r),this.g=vr(e.g),this.b=vr(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Cn){return at.workingToColorSpace($t.copy(this),e),Math.round(nt($t.r*255,0,255))*65536+Math.round(nt($t.g*255,0,255))*256+Math.round(nt($t.b*255,0,255))}getHexString(e=Cn){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=at.workingColorSpace){at.workingToColorSpace($t.copy(this),t);const i=$t.r,s=$t.g,r=$t.b,o=Math.max(i,s,r),a=Math.min(i,s,r);let l,c;const u=(a+o)/2;if(a===o)l=0,c=0;else{const f=o-a;switch(c=u<=.5?f/(o+a):f/(2-o-a),o){case i:l=(s-r)/f+(s<r?6:0);break;case s:l=(r-i)/f+2;break;case r:l=(i-s)/f+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,t=at.workingColorSpace){return at.workingToColorSpace($t.copy(this),t),e.r=$t.r,e.g=$t.g,e.b=$t.b,e}getStyle(e=Cn){at.workingToColorSpace($t.copy(this),e);const t=$t.r,i=$t.g,s=$t.b;return e!==Cn?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(e,t,i){return this.getHSL(Hi),this.setHSL(Hi.h+e,Hi.s+t,Hi.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(Hi),e.getHSL(sa);const i=Kl(Hi.h,sa.h,t),s=Kl(Hi.s,sa.s,t),r=Kl(Hi.l,sa.l,t);return this.setHSL(i,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*i+r[6]*s,this.g=r[1]*t+r[4]*i+r[7]*s,this.b=r[2]*t+r[5]*i+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const $t=new lt;lt.NAMES=Og;let Yb=0;class ko extends ks{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Yb++}),this.uuid=Pr(),this.name="",this.type="Material",this.blending=gr,this.side=rs,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Qc,this.blendDst=eu,this.blendEquation=Ts,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new lt(0,0,0),this.blendAlpha=0,this.depthFunc=Sr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=md,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Gs,this.stencilZFail=Gs,this.stencilZPass=Gs,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0)continue;const s=this[t];s!==void 0&&(s&&s.isColor?s.set(i):s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[t]=i)}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==gr&&(i.blending=this.blending),this.side!==rs&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==Qc&&(i.blendSrc=this.blendSrc),this.blendDst!==eu&&(i.blendDst=this.blendDst),this.blendEquation!==Ts&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==Sr&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==md&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Gs&&(i.stencilFail=this.stencilFail),this.stencilZFail!==Gs&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==Gs&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(r){const o=[];for(const a in r){const l=r[a];delete l.metadata,o.push(l)}return o}if(t){const r=s(e.textures),o=s(e.images);r.length>0&&(i.textures=r),o.length>0&&(i.images=o)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const s=t.length;i=new Array(s);for(let r=0;r!==s;++r)i[r]=t[r].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class zo extends ko{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new lt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new fi,this.combine=Sg,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Nt=new $,ra=new Se;let Kb=0;class ui{constructor(e,t,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Kb++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=gd,this.updateRanges=[],this.gpuType=Ai,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[i+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)ra.fromBufferAttribute(this,t),ra.applyMatrix3(e),this.setXY(t,ra.x,ra.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)Nt.fromBufferAttribute(this,t),Nt.applyMatrix3(e),this.setXYZ(t,Nt.x,Nt.y,Nt.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)Nt.fromBufferAttribute(this,t),Nt.applyMatrix4(e),this.setXYZ(t,Nt.x,Nt.y,Nt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)Nt.fromBufferAttribute(this,t),Nt.applyNormalMatrix(e),this.setXYZ(t,Nt.x,Nt.y,Nt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)Nt.fromBufferAttribute(this,t),Nt.transformDirection(e),this.setXYZ(t,Nt.x,Nt.y,Nt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=kr(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=an(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=kr(t,this.array)),t}setX(e,t){return this.normalized&&(t=an(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=kr(t,this.array)),t}setY(e,t){return this.normalized&&(t=an(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=kr(t,this.array)),t}setZ(e,t){return this.normalized&&(t=an(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=kr(t,this.array)),t}setW(e,t){return this.normalized&&(t=an(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=an(t,this.array),i=an(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,s){return e*=this.itemSize,this.normalized&&(t=an(t,this.array),i=an(i,this.array),s=an(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this}setXYZW(e,t,i,s,r){return e*=this.itemSize,this.normalized&&(t=an(t,this.array),i=an(i,this.array),s=an(s,this.array),r=an(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==gd&&(e.usage=this.usage),e}}class Fg extends ui{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class Bg extends ui{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class In extends ui{constructor(e,t,i){super(new Float32Array(e),t,i)}}let Zb=0;const Rn=new It,mc=new dn,Qs=new $,_n=new Bo,Gr=new Bo,zt=new $;class Ui extends ks{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Zb++}),this.uuid=Pr(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Ug(e)?Bg:Fg)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const r=new et().getNormalMatrix(e);i.applyNormalMatrix(r),i.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Rn.makeRotationFromQuaternion(e),this.applyMatrix4(Rn),this}rotateX(e){return Rn.makeRotationX(e),this.applyMatrix4(Rn),this}rotateY(e){return Rn.makeRotationY(e),this.applyMatrix4(Rn),this}rotateZ(e){return Rn.makeRotationZ(e),this.applyMatrix4(Rn),this}translate(e,t,i){return Rn.makeTranslation(e,t,i),this.applyMatrix4(Rn),this}scale(e,t,i){return Rn.makeScale(e,t,i),this.applyMatrix4(Rn),this}lookAt(e){return mc.lookAt(e),mc.updateMatrix(),this.applyMatrix4(mc.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Qs).negate(),this.translate(Qs.x,Qs.y,Qs.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const i=[];for(let s=0,r=e.length;s<r;s++){const o=e[s];i.push(o.x,o.y,o.z||0)}this.setAttribute("position",new In(i,3))}else{const i=Math.min(e.length,t.count);for(let s=0;s<i;s++){const r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count,t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Bo);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){this.boundingBox.set(new $(-1/0,-1/0,-1/0),new $(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,s=t.length;i<s;i++){const r=t[i];_n.setFromBufferAttribute(r),this.morphTargetsRelative?(zt.addVectors(this.boundingBox.min,_n.min),this.boundingBox.expandByPoint(zt),zt.addVectors(this.boundingBox.max,_n.max),this.boundingBox.expandByPoint(zt)):(this.boundingBox.expandByPoint(_n.min),this.boundingBox.expandByPoint(_n.max))}}else this.boundingBox.makeEmpty();isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Pf);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){this.boundingSphere.set(new $,1/0);return}if(e){const i=this.boundingSphere.center;if(_n.setFromBufferAttribute(e),t)for(let r=0,o=t.length;r<o;r++){const a=t[r];Gr.setFromBufferAttribute(a),this.morphTargetsRelative?(zt.addVectors(_n.min,Gr.min),_n.expandByPoint(zt),zt.addVectors(_n.max,Gr.max),_n.expandByPoint(zt)):(_n.expandByPoint(Gr.min),_n.expandByPoint(Gr.max))}_n.getCenter(i);let s=0;for(let r=0,o=e.count;r<o;r++)zt.fromBufferAttribute(e,r),s=Math.max(s,i.distanceToSquared(zt));if(t)for(let r=0,o=t.length;r<o;r++){const a=t[r],l=this.morphTargetsRelative;for(let c=0,u=a.count;c<u;c++)zt.fromBufferAttribute(a,c),l&&(Qs.fromBufferAttribute(e,c),zt.add(Qs)),s=Math.max(s,i.distanceToSquared(zt))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0)return;const i=t.position,s=t.normal,r=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new ui(new Float32Array(4*i.count),4));const o=this.getAttribute("tangent"),a=[],l=[];for(let M=0;M<i.count;M++)a[M]=new $,l[M]=new $;const c=new $,u=new $,f=new $,d=new Se,h=new Se,g=new Se,_=new $,m=new $;function p(M,y,E){c.fromBufferAttribute(i,M),u.fromBufferAttribute(i,y),f.fromBufferAttribute(i,E),d.fromBufferAttribute(r,M),h.fromBufferAttribute(r,y),g.fromBufferAttribute(r,E),u.sub(c),f.sub(c),h.sub(d),g.sub(d);const I=1/(h.x*g.y-g.x*h.y);isFinite(I)&&(_.copy(u).multiplyScalar(g.y).addScaledVector(f,-h.y).multiplyScalar(I),m.copy(f).multiplyScalar(h.x).addScaledVector(u,-g.x).multiplyScalar(I),a[M].add(_),a[y].add(_),a[E].add(_),l[M].add(m),l[y].add(m),l[E].add(m))}let C=this.groups;C.length===0&&(C=[{start:0,count:e.count}]);for(let M=0,y=C.length;M<y;++M){const E=C[M],I=E.start,V=E.count;for(let K=I,ee=I+V;K<ee;K+=3)p(e.getX(K+0),e.getX(K+1),e.getX(K+2))}const b=new $,x=new $,w=new $,L=new $;function P(M){w.fromBufferAttribute(s,M),L.copy(w);const y=a[M];b.copy(y),b.sub(w.multiplyScalar(w.dot(y))).normalize(),x.crossVectors(L,y);const I=x.dot(l[M])<0?-1:1;o.setXYZW(M,b.x,b.y,b.z,I)}for(let M=0,y=C.length;M<y;++M){const E=C[M],I=E.start,V=E.count;for(let K=I,ee=I+V;K<ee;K+=3)P(e.getX(K+0)),P(e.getX(K+1)),P(e.getX(K+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new ui(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let d=0,h=i.count;d<h;d++)i.setXYZ(d,0,0,0);const s=new $,r=new $,o=new $,a=new $,l=new $,c=new $,u=new $,f=new $;if(e)for(let d=0,h=e.count;d<h;d+=3){const g=e.getX(d+0),_=e.getX(d+1),m=e.getX(d+2);s.fromBufferAttribute(t,g),r.fromBufferAttribute(t,_),o.fromBufferAttribute(t,m),u.subVectors(o,r),f.subVectors(s,r),u.cross(f),a.fromBufferAttribute(i,g),l.fromBufferAttribute(i,_),c.fromBufferAttribute(i,m),a.add(u),l.add(u),c.add(u),i.setXYZ(g,a.x,a.y,a.z),i.setXYZ(_,l.x,l.y,l.z),i.setXYZ(m,c.x,c.y,c.z)}else for(let d=0,h=t.count;d<h;d+=3)s.fromBufferAttribute(t,d+0),r.fromBufferAttribute(t,d+1),o.fromBufferAttribute(t,d+2),u.subVectors(o,r),f.subVectors(s,r),u.cross(f),i.setXYZ(d+0,u.x,u.y,u.z),i.setXYZ(d+1,u.x,u.y,u.z),i.setXYZ(d+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)zt.fromBufferAttribute(e,t),zt.normalize(),e.setXYZ(t,zt.x,zt.y,zt.z)}toNonIndexed(){function e(a,l){const c=a.array,u=a.itemSize,f=a.normalized,d=new c.constructor(l.length*u);let h=0,g=0;for(let _=0,m=l.length;_<m;_++){a.isInterleavedBufferAttribute?h=l[_]*a.data.stride+a.offset:h=l[_]*u;for(let p=0;p<u;p++)d[g++]=c[h++]}return new ui(d,u,f)}if(this.index===null)return this;const t=new Ui,i=this.index.array,s=this.attributes;for(const a in s){const l=s[a],c=e(l,i);t.setAttribute(a,c)}const r=this.morphAttributes;for(const a in r){const l=[],c=r[a];for(let u=0,f=c.length;u<f;u++){const d=c[u],h=e(d,i);l.push(h)}t.morphAttributes[a]=l}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const l in i){const c=i[l];e.data.attributes[l]=c.toJSON(e.data)}const s={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let f=0,d=c.length;f<d;f++){const h=c[f];u.push(h.toJSON(e.data))}u.length>0&&(s[l]=u,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere=a.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone());const s=e.attributes;for(const c in s){const u=s[c];this.setAttribute(c,u.clone(t))}const r=e.morphAttributes;for(const c in r){const u=[],f=r[c];for(let d=0,h=f.length;d<h;d++)u.push(f[d].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let c=0,u=o.length;c<u;c++){const f=o[c];this.addGroup(f.start,f.count,f.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Pd=new It,_s=new Df,oa=new Pf,Dd=new $,aa=new $,la=new $,ca=new $,gc=new $,ua=new $,Ld=new $,fa=new $;class bn extends dn{constructor(e=new Ui,t=new zo){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(e,t){const i=this.geometry,s=i.attributes.position,r=i.morphAttributes.position,o=i.morphTargetsRelative;t.fromBufferAttribute(s,e);const a=this.morphTargetInfluences;if(r&&a){ua.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const u=a[l],f=r[l];u!==0&&(gc.fromBufferAttribute(f,e),o?ua.addScaledVector(gc,u):ua.addScaledVector(gc.sub(t),u))}t.add(ua)}return t}raycast(e,t){const i=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),oa.copy(i.boundingSphere),oa.applyMatrix4(r),_s.copy(e.ray).recast(e.near),!(oa.containsPoint(_s.origin)===!1&&(_s.intersectSphere(oa,Dd)===null||_s.origin.distanceToSquared(Dd)>(e.far-e.near)**2))&&(Pd.copy(r).invert(),_s.copy(e.ray).applyMatrix4(Pd),!(i.boundingBox!==null&&_s.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,_s)))}_computeIntersections(e,t,i){let s;const r=this.geometry,o=this.material,a=r.index,l=r.attributes.position,c=r.attributes.uv,u=r.attributes.uv1,f=r.attributes.normal,d=r.groups,h=r.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,_=d.length;g<_;g++){const m=d[g],p=o[m.materialIndex],C=Math.max(m.start,h.start),b=Math.min(a.count,Math.min(m.start+m.count,h.start+h.count));for(let x=C,w=b;x<w;x+=3){const L=a.getX(x),P=a.getX(x+1),M=a.getX(x+2);s=ha(this,p,e,i,c,u,f,L,P,M),s&&(s.faceIndex=Math.floor(x/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const g=Math.max(0,h.start),_=Math.min(a.count,h.start+h.count);for(let m=g,p=_;m<p;m+=3){const C=a.getX(m),b=a.getX(m+1),x=a.getX(m+2);s=ha(this,o,e,i,c,u,f,C,b,x),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}else if(l!==void 0)if(Array.isArray(o))for(let g=0,_=d.length;g<_;g++){const m=d[g],p=o[m.materialIndex],C=Math.max(m.start,h.start),b=Math.min(l.count,Math.min(m.start+m.count,h.start+h.count));for(let x=C,w=b;x<w;x+=3){const L=x,P=x+1,M=x+2;s=ha(this,p,e,i,c,u,f,L,P,M),s&&(s.faceIndex=Math.floor(x/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const g=Math.max(0,h.start),_=Math.min(l.count,h.start+h.count);for(let m=g,p=_;m<p;m+=3){const C=m,b=m+1,x=m+2;s=ha(this,o,e,i,c,u,f,C,b,x),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}}}function Jb(n,e,t,i,s,r,o,a){let l;if(e.side===hn?l=i.intersectTriangle(o,r,s,!0,a):l=i.intersectTriangle(s,r,o,e.side===rs,a),l===null)return null;fa.copy(a),fa.applyMatrix4(n.matrixWorld);const c=t.ray.origin.distanceTo(fa);return c<t.near||c>t.far?null:{distance:c,point:fa.clone(),object:n}}function ha(n,e,t,i,s,r,o,a,l,c){n.getVertexPosition(a,aa),n.getVertexPosition(l,la),n.getVertexPosition(c,ca);const u=Jb(n,e,t,i,aa,la,ca,Ld);if(u){const f=new $;Wn.getBarycoord(Ld,aa,la,ca,f),s&&(u.uv=Wn.getInterpolatedAttribute(s,a,l,c,f,new Se)),r&&(u.uv1=Wn.getInterpolatedAttribute(r,a,l,c,f,new Se)),o&&(u.normal=Wn.getInterpolatedAttribute(o,a,l,c,f,new $),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));const d={a,b:l,c,normal:new $,materialIndex:0};Wn.getNormal(aa,la,ca,d.normal),u.face=d,u.barycoord=f}return u}class Ho extends Ui{constructor(e=1,t=1,i=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:s,heightSegments:r,depthSegments:o};const a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);const l=[],c=[],u=[],f=[];let d=0,h=0;g("z","y","x",-1,-1,i,t,e,o,r,0),g("z","y","x",1,-1,i,t,-e,o,r,1),g("x","z","y",1,1,e,i,t,s,o,2),g("x","z","y",1,-1,e,i,-t,s,o,3),g("x","y","z",1,-1,e,t,i,s,r,4),g("x","y","z",-1,-1,e,t,-i,s,r,5),this.setIndex(l),this.setAttribute("position",new In(c,3)),this.setAttribute("normal",new In(u,3)),this.setAttribute("uv",new In(f,2));function g(_,m,p,C,b,x,w,L,P,M,y){const E=x/P,I=w/M,V=x/2,K=w/2,ee=L/2,se=P+1,O=M+1;let k=0,N=0;const ue=new $;for(let ye=0;ye<O;ye++){const Te=ye*I-K;for(let Be=0;Be<se;Be++){const Ze=Be*E-V;ue[_]=Ze*C,ue[m]=Te*b,ue[p]=ee,c.push(ue.x,ue.y,ue.z),ue[_]=0,ue[m]=0,ue[p]=L>0?1:-1,u.push(ue.x,ue.y,ue.z),f.push(Be/P),f.push(1-ye/M),k+=1}}for(let ye=0;ye<M;ye++)for(let Te=0;Te<P;Te++){const Be=d+Te+se*ye,Ze=d+Te+se*(ye+1),Je=d+(Te+1)+se*(ye+1),ae=d+(Te+1)+se*ye;l.push(Be,Ze,ae),l.push(Ze,Je,ae),N+=6}a.addGroup(h,N,y),h+=N,d+=k}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ho(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Tr(n){const e={};for(const t in n){e[t]={};for(const i in n[t]){const s=n[t][i];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?e[t][i]=null:e[t][i]=s.clone():Array.isArray(s)?e[t][i]=s.slice():e[t][i]=s}}return e}function en(n){const e={};for(let t=0;t<n.length;t++){const i=Tr(n[t]);for(const s in i)e[s]=i[s]}return e}function Qb(n){const e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function kg(n){const e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:at.workingColorSpace}const eM={clone:Tr,merge:en};var tM=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,nM=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class os extends ko{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=tM,this.fragmentShader=nM,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Tr(e.uniforms),this.uniformsGroups=Qb(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const o=this.uniforms[s].value;o&&o.isTexture?t.uniforms[s]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[s]={type:"m4",value:o.toArray()}:t.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}}class zg extends dn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new It,this.projectionMatrix=new It,this.projectionMatrixInverse=new It,this.coordinateSystem=ai,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Vi=new $,Id=new Se,Ud=new Se;class Pn extends zg{constructor(e=50,t=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Bu*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Oa*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Bu*2*Math.atan(Math.tan(Oa*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){Vi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Vi.x,Vi.y).multiplyScalar(-e/Vi.z),Vi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Vi.x,Vi.y).multiplyScalar(-e/Vi.z)}getViewSize(e,t){return this.getViewBounds(e,Id,Ud),t.subVectors(Ud,Id)}setViewOffset(e,t,i,s,r,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Oa*.5*this.fov)/this.zoom,i=2*t,s=this.aspect*i,r=-.5*s;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;r+=o.offsetX*s/l,t-=o.offsetY*i/c,s*=o.width/l,i*=o.height/c}const a=this.filmOffset;a!==0&&(r+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const er=-90,tr=1;class iM extends dn{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new Pn(er,tr,e,t);s.layers=this.layers,this.add(s);const r=new Pn(er,tr,e,t);r.layers=this.layers,this.add(r);const o=new Pn(er,tr,e,t);o.layers=this.layers,this.add(o);const a=new Pn(er,tr,e,t);a.layers=this.layers,this.add(a);const l=new Pn(er,tr,e,t);l.layers=this.layers,this.add(l);const c=new Pn(er,tr,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,s,r,o,a,l]=t;for(const c of t)this.remove(c);if(e===ai)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===el)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,o,a,l,c,u]=this.children,f=e.getRenderTarget(),d=e.getActiveCubeFace(),h=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const _=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,e.setRenderTarget(i,0,s),e.render(t,r),e.setRenderTarget(i,1,s),e.render(t,o),e.setRenderTarget(i,2,s),e.render(t,a),e.setRenderTarget(i,3,s),e.render(t,l),e.setRenderTarget(i,4,s),e.render(t,c),i.texture.generateMipmaps=_,e.setRenderTarget(i,5,s),e.render(t,u),e.setRenderTarget(f,d,h),e.xr.enabled=g,i.texture.needsPMREMUpdate=!0}}class Hg extends sn{constructor(e=[],t=br,i,s,r,o,a,l,c,u){super(e,t,i,s,r,o,a,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class sM extends Os{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},s=[i,i,i,i,i,i];this.texture=new Hg(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new Ho(5,5,5),r=new os({name:"CubemapFromEquirect",uniforms:Tr(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:hn,blending:ts});r.uniforms.tEquirect.value=t;const o=new bn(s,r),a=t.minFilter;return t.minFilter===Rs&&(t.minFilter=oi),new iM(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t=!0,i=!0,s=!0){const r=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,i,s);e.setRenderTarget(r)}}class Ki extends dn{constructor(){super(),this.isGroup=!0,this.type="Group"}}const rM={type:"move"};class _c{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ki,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ki,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new $,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new $),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ki,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new $,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new $),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let s=null,r=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){o=!0;for(const _ of e.hand.values()){const m=t.getJointPose(_,i),p=this._getHandJoint(c,_);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const u=c.joints["index-finger-tip"],f=c.joints["thumb-tip"],d=u.position.distanceTo(f.position),h=.02,g=.005;c.inputState.pinching&&d>h+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&d<=h-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,i),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(s=t.getPose(e.targetRaySpace,i),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(rM)))}return a!==null&&(a.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new Ki;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}class oM extends dn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new fi,this.environmentIntensity=1,this.environmentRotation=new fi,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}const vc=new $,aM=new $,lM=new et;class ji{constructor(e=new $(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,s){return this.normal.set(e,t,i),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const s=vc.subVectors(i,t).cross(aM.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const i=e.delta(vc),s=this.normal.dot(i);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const r=-(e.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:t.copy(e.start).addScaledVector(i,r)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||lM.getNormalMatrix(e),s=this.coplanarPoint(vc).applyMatrix4(e),r=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const vs=new Pf,cM=new Se(.5,.5),da=new $;class Vg{constructor(e=new ji,t=new ji,i=new ji,s=new ji,r=new ji,o=new ji){this.planes=[e,t,i,s,r,o]}set(e,t,i,s,r,o){const a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(i),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=ai,i=!1){const s=this.planes,r=e.elements,o=r[0],a=r[1],l=r[2],c=r[3],u=r[4],f=r[5],d=r[6],h=r[7],g=r[8],_=r[9],m=r[10],p=r[11],C=r[12],b=r[13],x=r[14],w=r[15];if(s[0].setComponents(c-o,h-u,p-g,w-C).normalize(),s[1].setComponents(c+o,h+u,p+g,w+C).normalize(),s[2].setComponents(c+a,h+f,p+_,w+b).normalize(),s[3].setComponents(c-a,h-f,p-_,w-b).normalize(),i)s[4].setComponents(l,d,m,x).normalize(),s[5].setComponents(c-l,h-d,p-m,w-x).normalize();else if(s[4].setComponents(c-l,h-d,p-m,w-x).normalize(),t===ai)s[5].setComponents(c+l,h+d,p+m,w+x).normalize();else if(t===el)s[5].setComponents(l,d,m,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),vs.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),vs.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(vs)}intersectsSprite(e){vs.center.set(0,0,0);const t=cM.distanceTo(e.center);return vs.radius=.7071067811865476+t,vs.applyMatrix4(e.matrixWorld),this.intersectsSphere(vs)}intersectsSphere(e){const t=this.planes,i=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(i)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const s=t[i];if(da.x=s.normal.x>0?e.max.x:e.min.x,da.y=s.normal.y>0?e.max.y:e.min.y,da.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(da)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class uM extends sn{constructor(e,t,i,s,r,o,a,l,c){super(e,t,i,s,r,o,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Gg extends sn{constructor(e,t,i=Us,s,r,o,a=qn,l=qn,c,u=Mo,f=1){if(u!==Mo&&u!==Eo)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const d={width:e,height:t,depth:f};super(d,s,r,o,a,l,u,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Cf(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class di{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){}getPointAt(e,t){const i=this.getUtoTmapping(e);return this.getPoint(i,t)}getPoints(e=5){const t=[];for(let i=0;i<=e;i++)t.push(this.getPoint(i/e));return t}getSpacedPoints(e=5){const t=[];for(let i=0;i<=e;i++)t.push(this.getPointAt(i/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let i,s=this.getPoint(0),r=0;t.push(0);for(let o=1;o<=e;o++)i=this.getPoint(o/e),r+=i.distanceTo(s),t.push(r),s=i;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){const i=this.getLengths();let s=0;const r=i.length;let o;t?o=t:o=e*i[r-1];let a=0,l=r-1,c;for(;a<=l;)if(s=Math.floor(a+(l-a)/2),c=i[s]-o,c<0)a=s+1;else if(c>0)l=s-1;else{l=s;break}if(s=l,i[s]===o)return s/(r-1);const u=i[s],d=i[s+1]-u,h=(o-u)/d;return(s+h)/(r-1)}getTangent(e,t){let s=e-1e-4,r=e+1e-4;s<0&&(s=0),r>1&&(r=1);const o=this.getPoint(s),a=this.getPoint(r),l=t||(o.isVector2?new Se:new $);return l.copy(a).sub(o).normalize(),l}getTangentAt(e,t){const i=this.getUtoTmapping(e);return this.getTangent(i,t)}computeFrenetFrames(e,t=!1){const i=new $,s=[],r=[],o=[],a=new $,l=new It;for(let h=0;h<=e;h++){const g=h/e;s[h]=this.getTangentAt(g,new $)}r[0]=new $,o[0]=new $;let c=Number.MAX_VALUE;const u=Math.abs(s[0].x),f=Math.abs(s[0].y),d=Math.abs(s[0].z);u<=c&&(c=u,i.set(1,0,0)),f<=c&&(c=f,i.set(0,1,0)),d<=c&&i.set(0,0,1),a.crossVectors(s[0],i).normalize(),r[0].crossVectors(s[0],a),o[0].crossVectors(s[0],r[0]);for(let h=1;h<=e;h++){if(r[h]=r[h-1].clone(),o[h]=o[h-1].clone(),a.crossVectors(s[h-1],s[h]),a.length()>Number.EPSILON){a.normalize();const g=Math.acos(nt(s[h-1].dot(s[h]),-1,1));r[h].applyMatrix4(l.makeRotationAxis(a,g))}o[h].crossVectors(s[h],r[h])}if(t===!0){let h=Math.acos(nt(r[0].dot(r[e]),-1,1));h/=e,s[0].dot(a.crossVectors(r[0],r[e]))>0&&(h=-h);for(let g=1;g<=e;g++)r[g].applyMatrix4(l.makeRotationAxis(s[g],h*g)),o[g].crossVectors(s[g],r[g])}return{tangents:s,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class If extends di{constructor(e=0,t=0,i=1,s=1,r=0,o=Math.PI*2,a=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=i,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=l}getPoint(e,t=new Se){const i=t,s=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(o?r=0:r=s),this.aClockwise===!0&&!o&&(r===s?r=-s:r=r-s);const a=this.aStartAngle+e*r;let l=this.aX+this.xRadius*Math.cos(a),c=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const u=Math.cos(this.aRotation),f=Math.sin(this.aRotation),d=l-this.aX,h=c-this.aY;l=d*u-h*f+this.aX,c=d*f+h*u+this.aY}return i.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class fM extends If{constructor(e,t,i,s,r,o){super(e,t,i,i,s,r,o),this.isArcCurve=!0,this.type="ArcCurve"}}function Uf(){let n=0,e=0,t=0,i=0;function s(r,o,a,l){n=r,e=a,t=-3*r+3*o-2*a-l,i=2*r-2*o+a+l}return{initCatmullRom:function(r,o,a,l,c){s(o,a,c*(a-r),c*(l-o))},initNonuniformCatmullRom:function(r,o,a,l,c,u,f){let d=(o-r)/c-(a-r)/(c+u)+(a-o)/u,h=(a-o)/u-(l-o)/(u+f)+(l-a)/f;d*=u,h*=u,s(o,a,d,h)},calc:function(r){const o=r*r,a=o*r;return n+e*r+t*o+i*a}}}const pa=new $,xc=new Uf,yc=new Uf,Sc=new Uf;class hM extends di{constructor(e=[],t=!1,i="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=i,this.tension=s}getPoint(e,t=new $){const i=t,s=this.points,r=s.length,o=(r-(this.closed?0:1))*e;let a=Math.floor(o),l=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:l===0&&a===r-1&&(a=r-2,l=1);let c,u;this.closed||a>0?c=s[(a-1)%r]:(pa.subVectors(s[0],s[1]).add(s[0]),c=pa);const f=s[a%r],d=s[(a+1)%r];if(this.closed||a+2<r?u=s[(a+2)%r]:(pa.subVectors(s[r-1],s[r-2]).add(s[r-1]),u=pa),this.curveType==="centripetal"||this.curveType==="chordal"){const h=this.curveType==="chordal"?.5:.25;let g=Math.pow(c.distanceToSquared(f),h),_=Math.pow(f.distanceToSquared(d),h),m=Math.pow(d.distanceToSquared(u),h);_<1e-4&&(_=1),g<1e-4&&(g=_),m<1e-4&&(m=_),xc.initNonuniformCatmullRom(c.x,f.x,d.x,u.x,g,_,m),yc.initNonuniformCatmullRom(c.y,f.y,d.y,u.y,g,_,m),Sc.initNonuniformCatmullRom(c.z,f.z,d.z,u.z,g,_,m)}else this.curveType==="catmullrom"&&(xc.initCatmullRom(c.x,f.x,d.x,u.x,this.tension),yc.initCatmullRom(c.y,f.y,d.y,u.y,this.tension),Sc.initCatmullRom(c.z,f.z,d.z,u.z,this.tension));return i.set(xc.calc(l),yc.calc(l),Sc.calc(l)),i}copy(e){super.copy(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const s=e.points[t];this.points.push(s.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,i=this.points.length;t<i;t++){const s=this.points[t];e.points.push(s.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const s=e.points[t];this.points.push(new $().fromArray(s))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function Nd(n,e,t,i,s){const r=(i-e)*.5,o=(s-t)*.5,a=n*n,l=n*a;return(2*t-2*i+r+o)*l+(-3*t+3*i-2*r-o)*a+r*n+t}function dM(n,e){const t=1-n;return t*t*e}function pM(n,e){return 2*(1-n)*n*e}function mM(n,e){return n*n*e}function ro(n,e,t,i){return dM(n,e)+pM(n,t)+mM(n,i)}function gM(n,e){const t=1-n;return t*t*t*e}function _M(n,e){const t=1-n;return 3*t*t*n*e}function vM(n,e){return 3*(1-n)*n*n*e}function xM(n,e){return n*n*n*e}function oo(n,e,t,i,s){return gM(n,e)+_M(n,t)+vM(n,i)+xM(n,s)}class Wg extends di{constructor(e=new Se,t=new Se,i=new Se,s=new Se){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=i,this.v3=s}getPoint(e,t=new Se){const i=t,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return i.set(oo(e,s.x,r.x,o.x,a.x),oo(e,s.y,r.y,o.y,a.y)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class yM extends di{constructor(e=new $,t=new $,i=new $,s=new $){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=i,this.v3=s}getPoint(e,t=new $){const i=t,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return i.set(oo(e,s.x,r.x,o.x,a.x),oo(e,s.y,r.y,o.y,a.y),oo(e,s.z,r.z,o.z,a.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class Xg extends di{constructor(e=new Se,t=new Se){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new Se){const i=t;return e===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(e).add(this.v1)),i}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new Se){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class SM extends di{constructor(e=new $,t=new $){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new $){const i=t;return e===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(e).add(this.v1)),i}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new $){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class $g extends di{constructor(e=new Se,t=new Se,i=new Se){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=i}getPoint(e,t=new Se){const i=t,s=this.v0,r=this.v1,o=this.v2;return i.set(ro(e,s.x,r.x,o.x),ro(e,s.y,r.y,o.y)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class bM extends di{constructor(e=new $,t=new $,i=new $){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=i}getPoint(e,t=new $){const i=t,s=this.v0,r=this.v1,o=this.v2;return i.set(ro(e,s.x,r.x,o.x),ro(e,s.y,r.y,o.y),ro(e,s.z,r.z,o.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class qg extends di{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new Se){const i=t,s=this.points,r=(s.length-1)*e,o=Math.floor(r),a=r-o,l=s[o===0?o:o-1],c=s[o],u=s[o>s.length-2?s.length-1:o+1],f=s[o>s.length-3?s.length-1:o+2];return i.set(Nd(a,l.x,c.x,u.x,f.x),Nd(a,l.y,c.y,u.y,f.y)),i}copy(e){super.copy(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const s=e.points[t];this.points.push(s.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,i=this.points.length;t<i;t++){const s=this.points[t];e.points.push(s.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const s=e.points[t];this.points.push(new Se().fromArray(s))}return this}}var ku=Object.freeze({__proto__:null,ArcCurve:fM,CatmullRomCurve3:hM,CubicBezierCurve:Wg,CubicBezierCurve3:yM,EllipseCurve:If,LineCurve:Xg,LineCurve3:SM,QuadraticBezierCurve:$g,QuadraticBezierCurve3:bM,SplineCurve:qg});class MM extends di{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){const e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){const i=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new ku[i](t,e))}return this}getPoint(e,t){const i=e*this.getLength(),s=this.getCurveLengths();let r=0;for(;r<s.length;){if(s[r]>=i){const o=s[r]-i,a=this.curves[r],l=a.getLength(),c=l===0?0:1-o/l;return a.getPointAt(c,t)}r++}return null}getLength(){const e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const e=[];let t=0;for(let i=0,s=this.curves.length;i<s;i++)t+=this.curves[i].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){const t=[];for(let i=0;i<=e;i++)t.push(this.getPoint(i/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){const t=[];let i;for(let s=0,r=this.curves;s<r.length;s++){const o=r[s],a=o.isEllipseCurve?e*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?e*o.points.length:e,l=o.getPoints(a);for(let c=0;c<l.length;c++){const u=l[c];i&&i.equals(u)||(t.push(u),i=u)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,i=e.curves.length;t<i;t++){const s=e.curves[t];this.curves.push(s.clone())}return this.autoClose=e.autoClose,this}toJSON(){const e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,i=this.curves.length;t<i;t++){const s=this.curves[t];e.curves.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,i=e.curves.length;t<i;t++){const s=e.curves[t];this.curves.push(new ku[s.type]().fromJSON(s))}return this}}class zu extends MM{constructor(e){super(),this.type="Path",this.currentPoint=new Se,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,i=e.length;t<i;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){const i=new Xg(this.currentPoint.clone(),new Se(e,t));return this.curves.push(i),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,i,s){const r=new $g(this.currentPoint.clone(),new Se(e,t),new Se(i,s));return this.curves.push(r),this.currentPoint.set(i,s),this}bezierCurveTo(e,t,i,s,r,o){const a=new Wg(this.currentPoint.clone(),new Se(e,t),new Se(i,s),new Se(r,o));return this.curves.push(a),this.currentPoint.set(r,o),this}splineThru(e){const t=[this.currentPoint.clone()].concat(e),i=new qg(t);return this.curves.push(i),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,i,s,r,o){const a=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(e+a,t+l,i,s,r,o),this}absarc(e,t,i,s,r,o){return this.absellipse(e,t,i,i,s,r,o),this}ellipse(e,t,i,s,r,o,a,l){const c=this.currentPoint.x,u=this.currentPoint.y;return this.absellipse(e+c,t+u,i,s,r,o,a,l),this}absellipse(e,t,i,s,r,o,a,l){const c=new If(e,t,i,s,r,o,a,l);if(this.curves.length>0){const f=c.getPoint(0);f.equals(this.currentPoint)||this.lineTo(f.x,f.y)}this.curves.push(c);const u=c.getPoint(1);return this.currentPoint.copy(u),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){const e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}}class Nf extends zu{constructor(e){super(e),this.uuid=Pr(),this.type="Shape",this.holes=[]}getPointsHoles(e){const t=[];for(let i=0,s=this.holes.length;i<s;i++)t[i]=this.holes[i].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,i=e.holes.length;t<i;t++){const s=e.holes[t];this.holes.push(s.clone())}return this}toJSON(){const e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,i=this.holes.length;t<i;t++){const s=this.holes[t];e.holes.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,i=e.holes.length;t<i;t++){const s=e.holes[t];this.holes.push(new zu().fromJSON(s))}return this}}function EM(n,e,t=2){const i=e&&e.length,s=i?e[0]*t:n.length;let r=jg(n,0,s,t,!0);const o=[];if(!r||r.next===r.prev)return o;let a,l,c;if(i&&(r=CM(n,e,r,t)),n.length>80*t){a=1/0,l=1/0;let u=-1/0,f=-1/0;for(let d=t;d<s;d+=t){const h=n[d],g=n[d+1];h<a&&(a=h),g<l&&(l=g),h>u&&(u=h),g>f&&(f=g)}c=Math.max(u-a,f-l),c=c!==0?32767/c:0}return To(r,o,t,a,l,c,0),o}function jg(n,e,t,i,s){let r;if(s===zM(n,e,t,i)>0)for(let o=e;o<t;o+=i)r=Od(o/i|0,n[o],n[o+1],r);else for(let o=t-i;o>=e;o-=i)r=Od(o/i|0,n[o],n[o+1],r);return r&&wr(r,r.next)&&(Ao(r),r=r.next),r}function Fs(n,e){if(!n)return n;e||(e=n);let t=n,i;do if(i=!1,!t.steiner&&(wr(t,t.next)||At(t.prev,t,t.next)===0)){if(Ao(t),t=e=t.prev,t===t.next)break;i=!0}else t=t.next;while(i||t!==e);return e}function To(n,e,t,i,s,r,o){if(!n)return;!o&&r&&UM(n,i,s,r);let a=n;for(;n.prev!==n.next;){const l=n.prev,c=n.next;if(r?wM(n,i,s,r):TM(n)){e.push(l.i,n.i,c.i),Ao(n),n=c.next,a=c.next;continue}if(n=c,n===a){o?o===1?(n=AM(Fs(n),e),To(n,e,t,i,s,r,2)):o===2&&RM(n,e,t,i,s,r):To(Fs(n),e,t,i,s,r,1);break}}}function TM(n){const e=n.prev,t=n,i=n.next;if(At(e,t,i)>=0)return!1;const s=e.x,r=t.x,o=i.x,a=e.y,l=t.y,c=i.y,u=Math.min(s,r,o),f=Math.min(a,l,c),d=Math.max(s,r,o),h=Math.max(a,l,c);let g=i.next;for(;g!==e;){if(g.x>=u&&g.x<=d&&g.y>=f&&g.y<=h&&Xr(s,a,r,l,o,c,g.x,g.y)&&At(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function wM(n,e,t,i){const s=n.prev,r=n,o=n.next;if(At(s,r,o)>=0)return!1;const a=s.x,l=r.x,c=o.x,u=s.y,f=r.y,d=o.y,h=Math.min(a,l,c),g=Math.min(u,f,d),_=Math.max(a,l,c),m=Math.max(u,f,d),p=Hu(h,g,e,t,i),C=Hu(_,m,e,t,i);let b=n.prevZ,x=n.nextZ;for(;b&&b.z>=p&&x&&x.z<=C;){if(b.x>=h&&b.x<=_&&b.y>=g&&b.y<=m&&b!==s&&b!==o&&Xr(a,u,l,f,c,d,b.x,b.y)&&At(b.prev,b,b.next)>=0||(b=b.prevZ,x.x>=h&&x.x<=_&&x.y>=g&&x.y<=m&&x!==s&&x!==o&&Xr(a,u,l,f,c,d,x.x,x.y)&&At(x.prev,x,x.next)>=0))return!1;x=x.nextZ}for(;b&&b.z>=p;){if(b.x>=h&&b.x<=_&&b.y>=g&&b.y<=m&&b!==s&&b!==o&&Xr(a,u,l,f,c,d,b.x,b.y)&&At(b.prev,b,b.next)>=0)return!1;b=b.prevZ}for(;x&&x.z<=C;){if(x.x>=h&&x.x<=_&&x.y>=g&&x.y<=m&&x!==s&&x!==o&&Xr(a,u,l,f,c,d,x.x,x.y)&&At(x.prev,x,x.next)>=0)return!1;x=x.nextZ}return!0}function AM(n,e){let t=n;do{const i=t.prev,s=t.next.next;!wr(i,s)&&Kg(i,t,t.next,s)&&wo(i,s)&&wo(s,i)&&(e.push(i.i,t.i,s.i),Ao(t),Ao(t.next),t=n=s),t=t.next}while(t!==n);return Fs(t)}function RM(n,e,t,i,s,r){let o=n;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&FM(o,a)){let l=Zg(o,a);o=Fs(o,o.next),l=Fs(l,l.next),To(o,e,t,i,s,r,0),To(l,e,t,i,s,r,0);return}a=a.next}o=o.next}while(o!==n)}function CM(n,e,t,i){const s=[];for(let r=0,o=e.length;r<o;r++){const a=e[r]*i,l=r<o-1?e[r+1]*i:n.length,c=jg(n,a,l,i,!1);c===c.next&&(c.steiner=!0),s.push(OM(c))}s.sort(PM);for(let r=0;r<s.length;r++)t=DM(s[r],t);return t}function PM(n,e){let t=n.x-e.x;if(t===0&&(t=n.y-e.y,t===0)){const i=(n.next.y-n.y)/(n.next.x-n.x),s=(e.next.y-e.y)/(e.next.x-e.x);t=i-s}return t}function DM(n,e){const t=LM(n,e);if(!t)return e;const i=Zg(t,n);return Fs(i,i.next),Fs(t,t.next)}function LM(n,e){let t=e;const i=n.x,s=n.y;let r=-1/0,o;if(wr(n,t))return t;do{if(wr(n,t.next))return t.next;if(s<=t.y&&s>=t.next.y&&t.next.y!==t.y){const f=t.x+(s-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(f<=i&&f>r&&(r=f,o=t.x<t.next.x?t:t.next,f===i))return o}t=t.next}while(t!==e);if(!o)return null;const a=o,l=o.x,c=o.y;let u=1/0;t=o;do{if(i>=t.x&&t.x>=l&&i!==t.x&&Yg(s<c?i:r,s,l,c,s<c?r:i,s,t.x,t.y)){const f=Math.abs(s-t.y)/(i-t.x);wo(t,n)&&(f<u||f===u&&(t.x>o.x||t.x===o.x&&IM(o,t)))&&(o=t,u=f)}t=t.next}while(t!==a);return o}function IM(n,e){return At(n.prev,n,e.prev)<0&&At(e.next,n,n.next)<0}function UM(n,e,t,i){let s=n;do s.z===0&&(s.z=Hu(s.x,s.y,e,t,i)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==n);s.prevZ.nextZ=null,s.prevZ=null,NM(s)}function NM(n){let e,t=1;do{let i=n,s;n=null;let r=null;for(e=0;i;){e++;let o=i,a=0;for(let c=0;c<t&&(a++,o=o.nextZ,!!o);c++);let l=t;for(;a>0||l>0&&o;)a!==0&&(l===0||!o||i.z<=o.z)?(s=i,i=i.nextZ,a--):(s=o,o=o.nextZ,l--),r?r.nextZ=s:n=s,s.prevZ=r,r=s;i=o}r.nextZ=null,t*=2}while(e>1);return n}function Hu(n,e,t,i,s){return n=(n-t)*s|0,e=(e-i)*s|0,n=(n|n<<8)&16711935,n=(n|n<<4)&252645135,n=(n|n<<2)&858993459,n=(n|n<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,n|e<<1}function OM(n){let e=n,t=n;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==n);return t}function Yg(n,e,t,i,s,r,o,a){return(s-o)*(e-a)>=(n-o)*(r-a)&&(n-o)*(i-a)>=(t-o)*(e-a)&&(t-o)*(r-a)>=(s-o)*(i-a)}function Xr(n,e,t,i,s,r,o,a){return!(n===o&&e===a)&&Yg(n,e,t,i,s,r,o,a)}function FM(n,e){return n.next.i!==e.i&&n.prev.i!==e.i&&!BM(n,e)&&(wo(n,e)&&wo(e,n)&&kM(n,e)&&(At(n.prev,n,e.prev)||At(n,e.prev,e))||wr(n,e)&&At(n.prev,n,n.next)>0&&At(e.prev,e,e.next)>0)}function At(n,e,t){return(e.y-n.y)*(t.x-e.x)-(e.x-n.x)*(t.y-e.y)}function wr(n,e){return n.x===e.x&&n.y===e.y}function Kg(n,e,t,i){const s=ga(At(n,e,t)),r=ga(At(n,e,i)),o=ga(At(t,i,n)),a=ga(At(t,i,e));return!!(s!==r&&o!==a||s===0&&ma(n,t,e)||r===0&&ma(n,i,e)||o===0&&ma(t,n,i)||a===0&&ma(t,e,i))}function ma(n,e,t){return e.x<=Math.max(n.x,t.x)&&e.x>=Math.min(n.x,t.x)&&e.y<=Math.max(n.y,t.y)&&e.y>=Math.min(n.y,t.y)}function ga(n){return n>0?1:n<0?-1:0}function BM(n,e){let t=n;do{if(t.i!==n.i&&t.next.i!==n.i&&t.i!==e.i&&t.next.i!==e.i&&Kg(t,t.next,n,e))return!0;t=t.next}while(t!==n);return!1}function wo(n,e){return At(n.prev,n,n.next)<0?At(n,e,n.next)>=0&&At(n,n.prev,e)>=0:At(n,e,n.prev)<0||At(n,n.next,e)<0}function kM(n,e){let t=n,i=!1;const s=(n.x+e.x)/2,r=(n.y+e.y)/2;do t.y>r!=t.next.y>r&&t.next.y!==t.y&&s<(t.next.x-t.x)*(r-t.y)/(t.next.y-t.y)+t.x&&(i=!i),t=t.next;while(t!==n);return i}function Zg(n,e){const t=Vu(n.i,n.x,n.y),i=Vu(e.i,e.x,e.y),s=n.next,r=e.prev;return n.next=e,e.prev=n,t.next=s,s.prev=t,i.next=t,t.prev=i,r.next=i,i.prev=r,i}function Od(n,e,t,i){const s=Vu(n,e,t);return i?(s.next=i.next,s.prev=i,i.next.prev=s,i.next=s):(s.prev=s,s.next=s),s}function Ao(n){n.next.prev=n.prev,n.prev.next=n.next,n.prevZ&&(n.prevZ.nextZ=n.nextZ),n.nextZ&&(n.nextZ.prevZ=n.prevZ)}function Vu(n,e,t){return{i:n,x:e,y:t,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function zM(n,e,t,i){let s=0;for(let r=e,o=t-i;r<t;r+=i)s+=(n[o]-n[r])*(n[r+1]+n[o+1]),o=r;return s}class HM{static triangulate(e,t,i=2){return EM(e,t,i)}}class or{static area(e){const t=e.length;let i=0;for(let s=t-1,r=0;r<t;s=r++)i+=e[s].x*e[r].y-e[r].x*e[s].y;return i*.5}static isClockWise(e){return or.area(e)<0}static triangulateShape(e,t){const i=[],s=[],r=[];Fd(e),Bd(i,e);let o=e.length;t.forEach(Fd);for(let l=0;l<t.length;l++)s.push(o),o+=t[l].length,Bd(i,t[l]);const a=HM.triangulate(i,s);for(let l=0;l<a.length;l+=3)r.push(a.slice(l,l+3));return r}}function Fd(n){const e=n.length;e>2&&n[e-1].equals(n[0])&&n.pop()}function Bd(n,e){for(let t=0;t<e.length;t++)n.push(e[t].x),n.push(e[t].y)}class Al extends Ui{constructor(e=new Nf([new Se(.5,.5),new Se(-.5,.5),new Se(-.5,-.5),new Se(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];const i=this,s=[],r=[];for(let a=0,l=e.length;a<l;a++){const c=e[a];o(c)}this.setAttribute("position",new In(s,3)),this.setAttribute("uv",new In(r,2)),this.computeVertexNormals();function o(a){const l=[],c=t.curveSegments!==void 0?t.curveSegments:12,u=t.steps!==void 0?t.steps:1,f=t.depth!==void 0?t.depth:1;let d=t.bevelEnabled!==void 0?t.bevelEnabled:!0,h=t.bevelThickness!==void 0?t.bevelThickness:.2,g=t.bevelSize!==void 0?t.bevelSize:h-.1,_=t.bevelOffset!==void 0?t.bevelOffset:0,m=t.bevelSegments!==void 0?t.bevelSegments:3;const p=t.extrudePath,C=t.UVGenerator!==void 0?t.UVGenerator:VM;let b,x=!1,w,L,P,M;p&&(b=p.getSpacedPoints(u),x=!0,d=!1,w=p.computeFrenetFrames(u,!1),L=new $,P=new $,M=new $),d||(m=0,h=0,g=0,_=0);const y=a.extractPoints(c);let E=y.shape;const I=y.holes;if(!or.isClockWise(E)){E=E.reverse();for(let U=0,F=I.length;U<F;U++){const H=I[U];or.isClockWise(H)&&(I[U]=H.reverse())}}function K(U){const H=10000000000000001e-36;let B=U[0];for(let J=1;J<=U.length;J++){const X=J%U.length,Z=U[X],ie=Z.x-B.x,de=Z.y-B.y,T=ie*ie+de*de,S=Math.max(Math.abs(Z.x),Math.abs(Z.y),Math.abs(B.x),Math.abs(B.y)),z=H*S*S;if(T<=z){U.splice(X,1),J--;continue}B=Z}}K(E),I.forEach(K);const ee=I.length,se=E;for(let U=0;U<ee;U++){const F=I[U];E=E.concat(F)}function O(U,F,H){return U.clone().addScaledVector(F,H)}const k=E.length;function N(U,F,H){let B,J,X;const Z=U.x-F.x,ie=U.y-F.y,de=H.x-U.x,T=H.y-U.y,S=Z*Z+ie*ie,z=Z*T-ie*de;if(Math.abs(z)>Number.EPSILON){const Y=Math.sqrt(S),ce=Math.sqrt(de*de+T*T),Q=F.x-ie/Y,Ae=F.y+Z/Y,pe=H.x-T/ce,Ce=H.y+de/ce,Pe=((pe-Q)*T-(Ce-Ae)*de)/(Z*T-ie*de);B=Q+Z*Pe-U.x,J=Ae+ie*Pe-U.y;const me=B*B+J*J;if(me<=2)return new Se(B,J);X=Math.sqrt(me/2)}else{let Y=!1;Z>Number.EPSILON?de>Number.EPSILON&&(Y=!0):Z<-Number.EPSILON?de<-Number.EPSILON&&(Y=!0):Math.sign(ie)===Math.sign(T)&&(Y=!0),Y?(B=-ie,J=Z,X=Math.sqrt(S)):(B=Z,J=ie,X=Math.sqrt(S/2))}return new Se(B/X,J/X)}const ue=[];for(let U=0,F=se.length,H=F-1,B=U+1;U<F;U++,H++,B++)H===F&&(H=0),B===F&&(B=0),ue[U]=N(se[U],se[H],se[B]);const ye=[];let Te,Be=ue.concat();for(let U=0,F=ee;U<F;U++){const H=I[U];Te=[];for(let B=0,J=H.length,X=J-1,Z=B+1;B<J;B++,X++,Z++)X===J&&(X=0),Z===J&&(Z=0),Te[B]=N(H[B],H[X],H[Z]);ye.push(Te),Be=Be.concat(Te)}let Ze;if(m===0)Ze=or.triangulateShape(se,I);else{const U=[],F=[];for(let H=0;H<m;H++){const B=H/m,J=h*Math.cos(B*Math.PI/2),X=g*Math.sin(B*Math.PI/2)+_;for(let Z=0,ie=se.length;Z<ie;Z++){const de=O(se[Z],ue[Z],X);oe(de.x,de.y,-J),B===0&&U.push(de)}for(let Z=0,ie=ee;Z<ie;Z++){const de=I[Z];Te=ye[Z];const T=[];for(let S=0,z=de.length;S<z;S++){const Y=O(de[S],Te[S],X);oe(Y.x,Y.y,-J),B===0&&T.push(Y)}B===0&&F.push(T)}}Ze=or.triangulateShape(U,F)}const Je=Ze.length,ae=g+_;for(let U=0;U<k;U++){const F=d?O(E[U],Be[U],ae):E[U];x?(P.copy(w.normals[0]).multiplyScalar(F.x),L.copy(w.binormals[0]).multiplyScalar(F.y),M.copy(b[0]).add(P).add(L),oe(M.x,M.y,M.z)):oe(F.x,F.y,0)}for(let U=1;U<=u;U++)for(let F=0;F<k;F++){const H=d?O(E[F],Be[F],ae):E[F];x?(P.copy(w.normals[U]).multiplyScalar(H.x),L.copy(w.binormals[U]).multiplyScalar(H.y),M.copy(b[U]).add(P).add(L),oe(M.x,M.y,M.z)):oe(H.x,H.y,f/u*U)}for(let U=m-1;U>=0;U--){const F=U/m,H=h*Math.cos(F*Math.PI/2),B=g*Math.sin(F*Math.PI/2)+_;for(let J=0,X=se.length;J<X;J++){const Z=O(se[J],ue[J],B);oe(Z.x,Z.y,f+H)}for(let J=0,X=I.length;J<X;J++){const Z=I[J];Te=ye[J];for(let ie=0,de=Z.length;ie<de;ie++){const T=O(Z[ie],Te[ie],B);x?oe(T.x,T.y+b[u-1].y,b[u-1].x+H):oe(T.x,T.y,f+H)}}}ge(),G();function ge(){const U=s.length/3;if(d){let F=0,H=k*F;for(let B=0;B<Je;B++){const J=Ze[B];fe(J[2]+H,J[1]+H,J[0]+H)}F=u+m*2,H=k*F;for(let B=0;B<Je;B++){const J=Ze[B];fe(J[0]+H,J[1]+H,J[2]+H)}}else{for(let F=0;F<Je;F++){const H=Ze[F];fe(H[2],H[1],H[0])}for(let F=0;F<Je;F++){const H=Ze[F];fe(H[0]+k*u,H[1]+k*u,H[2]+k*u)}}i.addGroup(U,s.length/3-U,0)}function G(){const U=s.length/3;let F=0;le(se,F),F+=se.length;for(let H=0,B=I.length;H<B;H++){const J=I[H];le(J,F),F+=J.length}i.addGroup(U,s.length/3-U,1)}function le(U,F){let H=U.length;for(;--H>=0;){const B=H;let J=H-1;J<0&&(J=U.length-1);for(let X=0,Z=u+m*2;X<Z;X++){const ie=k*X,de=k*(X+1),T=F+B+ie,S=F+J+ie,z=F+J+de,Y=F+B+de;Ve(T,S,z,Y)}}}function oe(U,F,H){l.push(U),l.push(F),l.push(H)}function fe(U,F,H){D(U),D(F),D(H);const B=s.length/3,J=C.generateTopUV(i,s,B-3,B-2,B-1);v(J[0]),v(J[1]),v(J[2])}function Ve(U,F,H,B){D(U),D(F),D(B),D(F),D(H),D(B);const J=s.length/3,X=C.generateSideWallUV(i,s,J-6,J-3,J-2,J-1);v(X[0]),v(X[1]),v(X[3]),v(X[1]),v(X[2]),v(X[3])}function D(U){s.push(l[U*3+0]),s.push(l[U*3+1]),s.push(l[U*3+2])}function v(U){r.push(U.x),r.push(U.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON(),t=this.parameters.shapes,i=this.parameters.options;return GM(t,i,e)}static fromJSON(e,t){const i=[];for(let r=0,o=e.shapes.length;r<o;r++){const a=t[e.shapes[r]];i.push(a)}const s=e.options.extrudePath;return s!==void 0&&(e.options.extrudePath=new ku[s.type]().fromJSON(s)),new Al(i,e.options)}}const VM={generateTopUV:function(n,e,t,i,s){const r=e[t*3],o=e[t*3+1],a=e[i*3],l=e[i*3+1],c=e[s*3],u=e[s*3+1];return[new Se(r,o),new Se(a,l),new Se(c,u)]},generateSideWallUV:function(n,e,t,i,s,r){const o=e[t*3],a=e[t*3+1],l=e[t*3+2],c=e[i*3],u=e[i*3+1],f=e[i*3+2],d=e[s*3],h=e[s*3+1],g=e[s*3+2],_=e[r*3],m=e[r*3+1],p=e[r*3+2];return Math.abs(a-u)<Math.abs(o-c)?[new Se(o,1-l),new Se(c,1-f),new Se(d,1-g),new Se(_,1-p)]:[new Se(a,1-l),new Se(u,1-f),new Se(h,1-g),new Se(m,1-p)]}};function GM(n,e,t){if(t.shapes=[],Array.isArray(n))for(let i=0,s=n.length;i<s;i++){const r=n[i];t.shapes.push(r.uuid)}else t.shapes.push(n.uuid);return t.options=Object.assign({},e),e.extrudePath!==void 0&&(t.options.extrudePath=e.extrudePath.toJSON()),t}class Vo extends Ui{constructor(e=1,t=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:s};const r=e/2,o=t/2,a=Math.floor(i),l=Math.floor(s),c=a+1,u=l+1,f=e/a,d=t/l,h=[],g=[],_=[],m=[];for(let p=0;p<u;p++){const C=p*d-o;for(let b=0;b<c;b++){const x=b*f-r;g.push(x,-C,0),_.push(0,0,1),m.push(b/a),m.push(1-p/l)}}for(let p=0;p<l;p++)for(let C=0;C<a;C++){const b=C+c*p,x=C+c*(p+1),w=C+1+c*(p+1),L=C+1+c*p;h.push(b,x,L),h.push(x,w,L)}this.setIndex(h),this.setAttribute("position",new In(g,3)),this.setAttribute("normal",new In(_,3)),this.setAttribute("uv",new In(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Vo(e.width,e.height,e.widthSegments,e.heightSegments)}}class Of extends Ui{constructor(e=.5,t=1,i=32,s=1,r=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:i,phiSegments:s,thetaStart:r,thetaLength:o},i=Math.max(3,i),s=Math.max(1,s);const a=[],l=[],c=[],u=[];let f=e;const d=(t-e)/s,h=new $,g=new Se;for(let _=0;_<=s;_++){for(let m=0;m<=i;m++){const p=r+m/i*o;h.x=f*Math.cos(p),h.y=f*Math.sin(p),l.push(h.x,h.y,h.z),c.push(0,0,1),g.x=(h.x/t+1)/2,g.y=(h.y/t+1)/2,u.push(g.x,g.y)}f+=d}for(let _=0;_<s;_++){const m=_*(i+1);for(let p=0;p<i;p++){const C=p+m,b=C,x=C+i+1,w=C+i+2,L=C+1;a.push(b,x,L),a.push(x,w,L)}}this.setIndex(a),this.setAttribute("position",new In(l,3)),this.setAttribute("normal",new In(c,3)),this.setAttribute("uv",new In(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Of(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class WM extends ko{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new lt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new lt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Lg,this.normalScale=new Se(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new fi,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class XM extends ko{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=bb,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class $M extends ko{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class qM extends dn{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new lt(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}class jM extends zg{constructor(e=-1,t=1,i=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=i-e,o=i+e,a=s+t,l=s-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,o=r+c*this.view.width,a-=u*this.view.offsetY,l=a-u*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class YM extends qM{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}class KM extends Pn{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}const kd=new It;class ZM{constructor(e,t,i=0,s=1/0){this.ray=new Df(e,t),this.near=i,this.far=s,this.camera=null,this.layers=new Lf,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera&&(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t)}setFromXRController(e){return kd.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(kd),this}intersectObject(e,t=!0,i=[]){return Gu(e,this,i,t),i.sort(zd),i}intersectObjects(e,t=!0,i=[]){for(let s=0,r=e.length;s<r;s++)Gu(e[s],this,i,t);return i.sort(zd),i}}function zd(n,e){return n.distance-e.distance}function Gu(n,e,t,i){let s=!0;if(n.layers.test(e.layers)&&n.raycast(e,t)===!1&&(s=!1),s===!0&&i===!0){const r=n.children;for(let o=0,a=r.length;o<a;o++)Gu(r[o],e,t,!0)}}class Hd{constructor(e=1,t=0,i=0){this.radius=e,this.phi=t,this.theta=i}set(e,t,i){return this.radius=e,this.phi=t,this.theta=i,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=nt(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,i){return this.radius=Math.sqrt(e*e+t*t+i*i),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,i),this.phi=Math.acos(nt(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class JM extends ks{constructor(e,t=null){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(e){e!==void 0&&(this.domElement!==null&&this.disconnect(),this.domElement=e)}disconnect(){}dispose(){}update(){}}function Vd(n,e,t,i){const s=QM(i);switch(t){case Ag:return n*e;case Cg:return n*e/s.components*s.byteLength;case wf:return n*e/s.components*s.byteLength;case Pg:return n*e*2/s.components*s.byteLength;case Af:return n*e*2/s.components*s.byteLength;case Rg:return n*e*3/s.components*s.byteLength;case Xn:return n*e*4/s.components*s.byteLength;case Rf:return n*e*4/s.components*s.byteLength;case Da:case La:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case Ia:case Ua:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case du:case mu:return Math.max(n,16)*Math.max(e,8)/4;case hu:case pu:return Math.max(n,8)*Math.max(e,8)/2;case gu:case _u:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case vu:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case xu:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case yu:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case Su:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case bu:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case Mu:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case Eu:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case Tu:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case wu:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case Au:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case Ru:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case Cu:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case Pu:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case Du:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case Lu:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case Na:case Iu:case Uu:return Math.ceil(n/4)*Math.ceil(e/4)*16;case Dg:case Nu:return Math.ceil(n/4)*Math.ceil(e/4)*8;case Ou:case Fu:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function QM(n){switch(n){case Di:case Eg:return{byteLength:1,components:1};case So:case Tg:case Fo:return{byteLength:2,components:1};case Ef:case Tf:return{byteLength:2,components:4};case Us:case Mf:case Ai:return{byteLength:4,components:1};case wg:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:bf}}));typeof window<"u"&&(window.__THREE__||(window.__THREE__=bf));/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function Jg(){let n=null,e=!1,t=null,i=null;function s(r,o){t(r,o),i=n.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&(i=n.requestAnimationFrame(s),e=!0)},stop:function(){n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){n=r}}}function eE(n){const e=new WeakMap;function t(a,l){const c=a.array,u=a.usage,f=c.byteLength,d=n.createBuffer();n.bindBuffer(l,d),n.bufferData(l,c,u),a.onUploadCallback();let h;if(c instanceof Float32Array)h=n.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)h=n.HALF_FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?h=n.HALF_FLOAT:h=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)h=n.SHORT;else if(c instanceof Uint32Array)h=n.UNSIGNED_INT;else if(c instanceof Int32Array)h=n.INT;else if(c instanceof Int8Array)h=n.BYTE;else if(c instanceof Uint8Array)h=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)h=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:h,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:f}}function i(a,l,c){const u=l.array,f=l.updateRanges;if(n.bindBuffer(c,a),f.length===0)n.bufferSubData(c,0,u);else{f.sort((h,g)=>h.start-g.start);let d=0;for(let h=1;h<f.length;h++){const g=f[d],_=f[h];_.start<=g.start+g.count+1?g.count=Math.max(g.count,_.start+_.count-g.start):(++d,f[d]=_)}f.length=d+1;for(let h=0,g=f.length;h<g;h++){const _=f[h];n.bufferSubData(c,_.start*u.BYTES_PER_ELEMENT,u,_.start,_.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=e.get(a);l&&(n.deleteBuffer(l.buffer),e.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const u=e.get(a);(!u||u.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const c=e.get(a);if(c===void 0)e.set(a,t(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,a,l),c.version=a.version}}return{get:s,remove:r,update:o}}var tE=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,nE=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,iE=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,sE=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,rE=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,oE=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,aE=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,lE=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,cE=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,uE=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,fE=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,hE=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,dE=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,pE=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,mE=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,gE=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,_E=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,vE=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,xE=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,yE=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,SE=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,bE=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,ME=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,EE=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,TE=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,wE=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,AE=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,RE=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,CE=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,PE=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,DE="gl_FragColor = linearToOutputTexel( gl_FragColor );",LE=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,IE=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,UE=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,NE=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,OE=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,FE=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,BE=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,kE=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,zE=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,HE=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,VE=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,GE=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,WE=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,XE=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,$E=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,qE=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,jE=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,YE=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,KE=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,ZE=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,JE=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,QE=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,e1=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,t1=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,n1=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,i1=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,s1=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,r1=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,o1=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,a1=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,l1=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,c1=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,u1=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,f1=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,h1=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,d1=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,p1=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,m1=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,g1=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,_1=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,v1=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,x1=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,y1=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,S1=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,b1=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,M1=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,E1=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,T1=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,w1=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,A1=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,R1=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,C1=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,P1=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,D1=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,L1=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,I1=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,U1=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,N1=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,O1=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		float depth = unpackRGBAToDepth( texture2D( depths, uv ) );
		#ifdef USE_REVERSEDEPTHBUF
			return step( depth, compare );
		#else
			return step( compare, depth );
		#endif
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		#ifdef USE_REVERSEDEPTHBUF
			float hard_shadow = step( distribution.x, compare );
		#else
			float hard_shadow = step( compare , distribution.x );
		#endif
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,F1=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,B1=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,k1=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,z1=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,H1=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,V1=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,G1=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,W1=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,X1=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,$1=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,q1=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,j1=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Y1=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,K1=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Z1=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,J1=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Q1=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const eT=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,tT=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,nT=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,iT=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,sT=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,rT=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,oT=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,aT=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSEDEPTHBUF
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,lT=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,cT=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,uT=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,fT=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,hT=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,dT=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,pT=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,mT=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,gT=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,_T=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,vT=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,xT=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,yT=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,ST=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,bT=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,MT=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ET=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,TT=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,wT=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,AT=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,RT=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,CT=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,PT=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,DT=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,LT=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,IT=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,tt={alphahash_fragment:tE,alphahash_pars_fragment:nE,alphamap_fragment:iE,alphamap_pars_fragment:sE,alphatest_fragment:rE,alphatest_pars_fragment:oE,aomap_fragment:aE,aomap_pars_fragment:lE,batching_pars_vertex:cE,batching_vertex:uE,begin_vertex:fE,beginnormal_vertex:hE,bsdfs:dE,iridescence_fragment:pE,bumpmap_pars_fragment:mE,clipping_planes_fragment:gE,clipping_planes_pars_fragment:_E,clipping_planes_pars_vertex:vE,clipping_planes_vertex:xE,color_fragment:yE,color_pars_fragment:SE,color_pars_vertex:bE,color_vertex:ME,common:EE,cube_uv_reflection_fragment:TE,defaultnormal_vertex:wE,displacementmap_pars_vertex:AE,displacementmap_vertex:RE,emissivemap_fragment:CE,emissivemap_pars_fragment:PE,colorspace_fragment:DE,colorspace_pars_fragment:LE,envmap_fragment:IE,envmap_common_pars_fragment:UE,envmap_pars_fragment:NE,envmap_pars_vertex:OE,envmap_physical_pars_fragment:qE,envmap_vertex:FE,fog_vertex:BE,fog_pars_vertex:kE,fog_fragment:zE,fog_pars_fragment:HE,gradientmap_pars_fragment:VE,lightmap_pars_fragment:GE,lights_lambert_fragment:WE,lights_lambert_pars_fragment:XE,lights_pars_begin:$E,lights_toon_fragment:jE,lights_toon_pars_fragment:YE,lights_phong_fragment:KE,lights_phong_pars_fragment:ZE,lights_physical_fragment:JE,lights_physical_pars_fragment:QE,lights_fragment_begin:e1,lights_fragment_maps:t1,lights_fragment_end:n1,logdepthbuf_fragment:i1,logdepthbuf_pars_fragment:s1,logdepthbuf_pars_vertex:r1,logdepthbuf_vertex:o1,map_fragment:a1,map_pars_fragment:l1,map_particle_fragment:c1,map_particle_pars_fragment:u1,metalnessmap_fragment:f1,metalnessmap_pars_fragment:h1,morphinstance_vertex:d1,morphcolor_vertex:p1,morphnormal_vertex:m1,morphtarget_pars_vertex:g1,morphtarget_vertex:_1,normal_fragment_begin:v1,normal_fragment_maps:x1,normal_pars_fragment:y1,normal_pars_vertex:S1,normal_vertex:b1,normalmap_pars_fragment:M1,clearcoat_normal_fragment_begin:E1,clearcoat_normal_fragment_maps:T1,clearcoat_pars_fragment:w1,iridescence_pars_fragment:A1,opaque_fragment:R1,packing:C1,premultiplied_alpha_fragment:P1,project_vertex:D1,dithering_fragment:L1,dithering_pars_fragment:I1,roughnessmap_fragment:U1,roughnessmap_pars_fragment:N1,shadowmap_pars_fragment:O1,shadowmap_pars_vertex:F1,shadowmap_vertex:B1,shadowmask_pars_fragment:k1,skinbase_vertex:z1,skinning_pars_vertex:H1,skinning_vertex:V1,skinnormal_vertex:G1,specularmap_fragment:W1,specularmap_pars_fragment:X1,tonemapping_fragment:$1,tonemapping_pars_fragment:q1,transmission_fragment:j1,transmission_pars_fragment:Y1,uv_pars_fragment:K1,uv_pars_vertex:Z1,uv_vertex:J1,worldpos_vertex:Q1,background_vert:eT,background_frag:tT,backgroundCube_vert:nT,backgroundCube_frag:iT,cube_vert:sT,cube_frag:rT,depth_vert:oT,depth_frag:aT,distanceRGBA_vert:lT,distanceRGBA_frag:cT,equirect_vert:uT,equirect_frag:fT,linedashed_vert:hT,linedashed_frag:dT,meshbasic_vert:pT,meshbasic_frag:mT,meshlambert_vert:gT,meshlambert_frag:_T,meshmatcap_vert:vT,meshmatcap_frag:xT,meshnormal_vert:yT,meshnormal_frag:ST,meshphong_vert:bT,meshphong_frag:MT,meshphysical_vert:ET,meshphysical_frag:TT,meshtoon_vert:wT,meshtoon_frag:AT,points_vert:RT,points_frag:CT,shadow_vert:PT,shadow_frag:DT,sprite_vert:LT,sprite_frag:IT},Ee={common:{diffuse:{value:new lt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new et},alphaMap:{value:null},alphaMapTransform:{value:new et},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new et}},envmap:{envMap:{value:null},envMapRotation:{value:new et},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new et}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new et}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new et},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new et},normalScale:{value:new Se(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new et},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new et}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new et}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new et}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new lt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new lt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new et},alphaTest:{value:0},uvTransform:{value:new et}},sprite:{diffuse:{value:new lt(16777215)},opacity:{value:1},center:{value:new Se(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new et},alphaMap:{value:null},alphaMapTransform:{value:new et},alphaTest:{value:0}}},si={basic:{uniforms:en([Ee.common,Ee.specularmap,Ee.envmap,Ee.aomap,Ee.lightmap,Ee.fog]),vertexShader:tt.meshbasic_vert,fragmentShader:tt.meshbasic_frag},lambert:{uniforms:en([Ee.common,Ee.specularmap,Ee.envmap,Ee.aomap,Ee.lightmap,Ee.emissivemap,Ee.bumpmap,Ee.normalmap,Ee.displacementmap,Ee.fog,Ee.lights,{emissive:{value:new lt(0)}}]),vertexShader:tt.meshlambert_vert,fragmentShader:tt.meshlambert_frag},phong:{uniforms:en([Ee.common,Ee.specularmap,Ee.envmap,Ee.aomap,Ee.lightmap,Ee.emissivemap,Ee.bumpmap,Ee.normalmap,Ee.displacementmap,Ee.fog,Ee.lights,{emissive:{value:new lt(0)},specular:{value:new lt(1118481)},shininess:{value:30}}]),vertexShader:tt.meshphong_vert,fragmentShader:tt.meshphong_frag},standard:{uniforms:en([Ee.common,Ee.envmap,Ee.aomap,Ee.lightmap,Ee.emissivemap,Ee.bumpmap,Ee.normalmap,Ee.displacementmap,Ee.roughnessmap,Ee.metalnessmap,Ee.fog,Ee.lights,{emissive:{value:new lt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:tt.meshphysical_vert,fragmentShader:tt.meshphysical_frag},toon:{uniforms:en([Ee.common,Ee.aomap,Ee.lightmap,Ee.emissivemap,Ee.bumpmap,Ee.normalmap,Ee.displacementmap,Ee.gradientmap,Ee.fog,Ee.lights,{emissive:{value:new lt(0)}}]),vertexShader:tt.meshtoon_vert,fragmentShader:tt.meshtoon_frag},matcap:{uniforms:en([Ee.common,Ee.bumpmap,Ee.normalmap,Ee.displacementmap,Ee.fog,{matcap:{value:null}}]),vertexShader:tt.meshmatcap_vert,fragmentShader:tt.meshmatcap_frag},points:{uniforms:en([Ee.points,Ee.fog]),vertexShader:tt.points_vert,fragmentShader:tt.points_frag},dashed:{uniforms:en([Ee.common,Ee.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:tt.linedashed_vert,fragmentShader:tt.linedashed_frag},depth:{uniforms:en([Ee.common,Ee.displacementmap]),vertexShader:tt.depth_vert,fragmentShader:tt.depth_frag},normal:{uniforms:en([Ee.common,Ee.bumpmap,Ee.normalmap,Ee.displacementmap,{opacity:{value:1}}]),vertexShader:tt.meshnormal_vert,fragmentShader:tt.meshnormal_frag},sprite:{uniforms:en([Ee.sprite,Ee.fog]),vertexShader:tt.sprite_vert,fragmentShader:tt.sprite_frag},background:{uniforms:{uvTransform:{value:new et},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:tt.background_vert,fragmentShader:tt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new et}},vertexShader:tt.backgroundCube_vert,fragmentShader:tt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:tt.cube_vert,fragmentShader:tt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:tt.equirect_vert,fragmentShader:tt.equirect_frag},distanceRGBA:{uniforms:en([Ee.common,Ee.displacementmap,{referencePosition:{value:new $},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:tt.distanceRGBA_vert,fragmentShader:tt.distanceRGBA_frag},shadow:{uniforms:en([Ee.lights,Ee.fog,{color:{value:new lt(0)},opacity:{value:1}}]),vertexShader:tt.shadow_vert,fragmentShader:tt.shadow_frag}};si.physical={uniforms:en([si.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new et},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new et},clearcoatNormalScale:{value:new Se(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new et},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new et},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new et},sheen:{value:0},sheenColor:{value:new lt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new et},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new et},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new et},transmissionSamplerSize:{value:new Se},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new et},attenuationDistance:{value:0},attenuationColor:{value:new lt(0)},specularColor:{value:new lt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new et},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new et},anisotropyVector:{value:new Se},anisotropyMap:{value:null},anisotropyMapTransform:{value:new et}}]),vertexShader:tt.meshphysical_vert,fragmentShader:tt.meshphysical_frag};const _a={r:0,b:0,g:0},xs=new fi,UT=new It;function NT(n,e,t,i,s,r,o){const a=new lt(0);let l=r===!0?0:1,c,u,f=null,d=0,h=null;function g(b){let x=b.isScene===!0?b.background:null;return x&&x.isTexture&&(x=(b.backgroundBlurriness>0?t:e).get(x)),x}function _(b){let x=!1;const w=g(b);w===null?p(a,l):w&&w.isColor&&(p(w,1),x=!0);const L=n.xr.getEnvironmentBlendMode();L==="additive"?i.buffers.color.setClear(0,0,0,1,o):L==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,o),(n.autoClear||x)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function m(b,x){const w=g(x);w&&(w.isCubeTexture||w.mapping===wl)?(u===void 0&&(u=new bn(new Ho(1,1,1),new os({name:"BackgroundCubeMaterial",uniforms:Tr(si.backgroundCube.uniforms),vertexShader:si.backgroundCube.vertexShader,fragmentShader:si.backgroundCube.fragmentShader,side:hn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(L,P,M){this.matrixWorld.copyPosition(M.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(u)),xs.copy(x.backgroundRotation),xs.x*=-1,xs.y*=-1,xs.z*=-1,w.isCubeTexture&&w.isRenderTargetTexture===!1&&(xs.y*=-1,xs.z*=-1),u.material.uniforms.envMap.value=w,u.material.uniforms.flipEnvMap.value=w.isCubeTexture&&w.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=x.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(UT.makeRotationFromEuler(xs)),u.material.toneMapped=at.getTransfer(w.colorSpace)!==mt,(f!==w||d!==w.version||h!==n.toneMapping)&&(u.material.needsUpdate=!0,f=w,d=w.version,h=n.toneMapping),u.layers.enableAll(),b.unshift(u,u.geometry,u.material,0,0,null)):w&&w.isTexture&&(c===void 0&&(c=new bn(new Vo(2,2),new os({name:"BackgroundMaterial",uniforms:Tr(si.background.uniforms),vertexShader:si.background.vertexShader,fragmentShader:si.background.fragmentShader,side:rs,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=w,c.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,c.material.toneMapped=at.getTransfer(w.colorSpace)!==mt,w.matrixAutoUpdate===!0&&w.updateMatrix(),c.material.uniforms.uvTransform.value.copy(w.matrix),(f!==w||d!==w.version||h!==n.toneMapping)&&(c.material.needsUpdate=!0,f=w,d=w.version,h=n.toneMapping),c.layers.enableAll(),b.unshift(c,c.geometry,c.material,0,0,null))}function p(b,x){b.getRGB(_a,kg(n)),i.buffers.color.setClear(_a.r,_a.g,_a.b,x,o)}function C(){u!==void 0&&(u.geometry.dispose(),u.material.dispose(),u=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(b,x=1){a.set(b),l=x,p(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(b){l=b,p(a,l)},render:_,addToRenderList:m,dispose:C}}function OT(n,e){const t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},s=d(null);let r=s,o=!1;function a(E,I,V,K,ee){let se=!1;const O=f(K,V,I);r!==O&&(r=O,c(r.object)),se=h(E,K,V,ee),se&&g(E,K,V,ee),ee!==null&&e.update(ee,n.ELEMENT_ARRAY_BUFFER),(se||o)&&(o=!1,x(E,I,V,K),ee!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(ee).buffer))}function l(){return n.createVertexArray()}function c(E){return n.bindVertexArray(E)}function u(E){return n.deleteVertexArray(E)}function f(E,I,V){const K=V.wireframe===!0;let ee=i[E.id];ee===void 0&&(ee={},i[E.id]=ee);let se=ee[I.id];se===void 0&&(se={},ee[I.id]=se);let O=se[K];return O===void 0&&(O=d(l()),se[K]=O),O}function d(E){const I=[],V=[],K=[];for(let ee=0;ee<t;ee++)I[ee]=0,V[ee]=0,K[ee]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:I,enabledAttributes:V,attributeDivisors:K,object:E,attributes:{},index:null}}function h(E,I,V,K){const ee=r.attributes,se=I.attributes;let O=0;const k=V.getAttributes();for(const N in k)if(k[N].location>=0){const ye=ee[N];let Te=se[N];if(Te===void 0&&(N==="instanceMatrix"&&E.instanceMatrix&&(Te=E.instanceMatrix),N==="instanceColor"&&E.instanceColor&&(Te=E.instanceColor)),ye===void 0||ye.attribute!==Te||Te&&ye.data!==Te.data)return!0;O++}return r.attributesNum!==O||r.index!==K}function g(E,I,V,K){const ee={},se=I.attributes;let O=0;const k=V.getAttributes();for(const N in k)if(k[N].location>=0){let ye=se[N];ye===void 0&&(N==="instanceMatrix"&&E.instanceMatrix&&(ye=E.instanceMatrix),N==="instanceColor"&&E.instanceColor&&(ye=E.instanceColor));const Te={};Te.attribute=ye,ye&&ye.data&&(Te.data=ye.data),ee[N]=Te,O++}r.attributes=ee,r.attributesNum=O,r.index=K}function _(){const E=r.newAttributes;for(let I=0,V=E.length;I<V;I++)E[I]=0}function m(E){p(E,0)}function p(E,I){const V=r.newAttributes,K=r.enabledAttributes,ee=r.attributeDivisors;V[E]=1,K[E]===0&&(n.enableVertexAttribArray(E),K[E]=1),ee[E]!==I&&(n.vertexAttribDivisor(E,I),ee[E]=I)}function C(){const E=r.newAttributes,I=r.enabledAttributes;for(let V=0,K=I.length;V<K;V++)I[V]!==E[V]&&(n.disableVertexAttribArray(V),I[V]=0)}function b(E,I,V,K,ee,se,O){O===!0?n.vertexAttribIPointer(E,I,V,ee,se):n.vertexAttribPointer(E,I,V,K,ee,se)}function x(E,I,V,K){_();const ee=K.attributes,se=V.getAttributes(),O=I.defaultAttributeValues;for(const k in se){const N=se[k];if(N.location>=0){let ue=ee[k];if(ue===void 0&&(k==="instanceMatrix"&&E.instanceMatrix&&(ue=E.instanceMatrix),k==="instanceColor"&&E.instanceColor&&(ue=E.instanceColor)),ue!==void 0){const ye=ue.normalized,Te=ue.itemSize,Be=e.get(ue);if(Be===void 0)continue;const Ze=Be.buffer,Je=Be.type,ae=Be.bytesPerElement,ge=Je===n.INT||Je===n.UNSIGNED_INT||ue.gpuType===Mf;if(ue.isInterleavedBufferAttribute){const G=ue.data,le=G.stride,oe=ue.offset;if(G.isInstancedInterleavedBuffer){for(let fe=0;fe<N.locationSize;fe++)p(N.location+fe,G.meshPerAttribute);E.isInstancedMesh!==!0&&K._maxInstanceCount===void 0&&(K._maxInstanceCount=G.meshPerAttribute*G.count)}else for(let fe=0;fe<N.locationSize;fe++)m(N.location+fe);n.bindBuffer(n.ARRAY_BUFFER,Ze);for(let fe=0;fe<N.locationSize;fe++)b(N.location+fe,Te/N.locationSize,Je,ye,le*ae,(oe+Te/N.locationSize*fe)*ae,ge)}else{if(ue.isInstancedBufferAttribute){for(let G=0;G<N.locationSize;G++)p(N.location+G,ue.meshPerAttribute);E.isInstancedMesh!==!0&&K._maxInstanceCount===void 0&&(K._maxInstanceCount=ue.meshPerAttribute*ue.count)}else for(let G=0;G<N.locationSize;G++)m(N.location+G);n.bindBuffer(n.ARRAY_BUFFER,Ze);for(let G=0;G<N.locationSize;G++)b(N.location+G,Te/N.locationSize,Je,ye,Te*ae,Te/N.locationSize*G*ae,ge)}}else if(O!==void 0){const ye=O[k];if(ye!==void 0)switch(ye.length){case 2:n.vertexAttrib2fv(N.location,ye);break;case 3:n.vertexAttrib3fv(N.location,ye);break;case 4:n.vertexAttrib4fv(N.location,ye);break;default:n.vertexAttrib1fv(N.location,ye)}}}}C()}function w(){M();for(const E in i){const I=i[E];for(const V in I){const K=I[V];for(const ee in K)u(K[ee].object),delete K[ee];delete I[V]}delete i[E]}}function L(E){if(i[E.id]===void 0)return;const I=i[E.id];for(const V in I){const K=I[V];for(const ee in K)u(K[ee].object),delete K[ee];delete I[V]}delete i[E.id]}function P(E){for(const I in i){const V=i[I];if(V[E.id]===void 0)continue;const K=V[E.id];for(const ee in K)u(K[ee].object),delete K[ee];delete V[E.id]}}function M(){y(),o=!0,r!==s&&(r=s,c(r.object))}function y(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:M,resetDefaultState:y,dispose:w,releaseStatesOfGeometry:L,releaseStatesOfProgram:P,initAttributes:_,enableAttribute:m,disableUnusedAttributes:C}}function FT(n,e,t){let i;function s(c){i=c}function r(c,u){n.drawArrays(i,c,u),t.update(u,i,1)}function o(c,u,f){f!==0&&(n.drawArraysInstanced(i,c,u,f),t.update(u,i,f))}function a(c,u,f){if(f===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,u,0,f);let h=0;for(let g=0;g<f;g++)h+=u[g];t.update(h,i,1)}function l(c,u,f,d){if(f===0)return;const h=e.get("WEBGL_multi_draw");if(h===null)for(let g=0;g<c.length;g++)o(c[g],u[g],d[g]);else{h.multiDrawArraysInstancedWEBGL(i,c,0,u,0,d,0,f);let g=0;for(let _=0;_<f;_++)g+=u[_]*d[_];t.update(g,i,1)}}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function BT(n,e,t,i){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){const P=e.get("EXT_texture_filter_anisotropic");s=n.getParameter(P.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(P){return!(P!==Xn&&i.convert(P)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(P){const M=P===Fo&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(P!==Di&&i.convert(P)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&P!==Ai&&!M)}function l(P){if(P==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";P="mediump"}return P==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const u=l(c);u!==c&&(c=u);const f=t.logarithmicDepthBuffer===!0,d=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),h=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),g=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=n.getParameter(n.MAX_TEXTURE_SIZE),m=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),p=n.getParameter(n.MAX_VERTEX_ATTRIBS),C=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),b=n.getParameter(n.MAX_VARYING_VECTORS),x=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),w=g>0,L=n.getParameter(n.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:f,reversedDepthBuffer:d,maxTextures:h,maxVertexTextures:g,maxTextureSize:_,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:C,maxVaryings:b,maxFragmentUniforms:x,vertexTextures:w,maxSamples:L}}function kT(n){const e=this;let t=null,i=0,s=!1,r=!1;const o=new ji,a=new et,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(f,d){const h=f.length!==0||d||i!==0||s;return s=d,i=f.length,h},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(f,d){t=u(f,d,0)},this.setState=function(f,d,h){const g=f.clippingPlanes,_=f.clipIntersection,m=f.clipShadows,p=n.get(f);if(!s||g===null||g.length===0||r&&!m)r?u(null):c();else{const C=r?0:i,b=C*4;let x=p.clippingState||null;l.value=x,x=u(g,d,b,h);for(let w=0;w!==b;++w)x[w]=t[w];p.clippingState=x,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=C}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function u(f,d,h,g){const _=f!==null?f.length:0;let m=null;if(_!==0){if(m=l.value,g!==!0||m===null){const p=h+_*4,C=d.matrixWorldInverse;a.getNormalMatrix(C),(m===null||m.length<p)&&(m=new Float32Array(p));for(let b=0,x=h;b!==_;++b,x+=4)o.copy(f[b]).applyMatrix4(C,a),o.normal.toArray(m,x),m[x+3]=o.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,m}}function zT(n){let e=new WeakMap;function t(o,a){return a===lu?o.mapping=br:a===cu&&(o.mapping=Mr),o}function i(o){if(o&&o.isTexture){const a=o.mapping;if(a===lu||a===cu)if(e.has(o)){const l=e.get(o).texture;return t(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new sM(l.height);return c.fromEquirectangularTexture(n,o),e.set(o,c),o.addEventListener("dispose",s),t(c.texture,o.mapping)}else return null}}return o}function s(o){const a=o.target;a.removeEventListener("dispose",s);const l=e.get(a);l!==void 0&&(e.delete(a),l.dispose())}function r(){e=new WeakMap}return{get:i,dispose:r}}const ar=4,Gd=[.125,.215,.35,.446,.526,.582],lr=20,bc=new jM,Wd=new lt;let Mc=null,Ec=0,Tc=0,wc=!1;const bs=(1+Math.sqrt(5))/2,nr=1/bs,Xd=[new $(-bs,nr,0),new $(bs,nr,0),new $(-nr,0,bs),new $(nr,0,bs),new $(0,bs,-nr),new $(0,bs,nr),new $(-1,1,-1),new $(1,1,-1),new $(-1,1,1),new $(1,1,1)],HT=new $;class $d{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,i=.1,s=100,r={}){const{size:o=256,position:a=HT}=r;Mc=this._renderer.getRenderTarget(),Ec=this._renderer.getActiveCubeFace(),Tc=this._renderer.getActiveMipmapLevel(),wc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,i,s,l,a),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Yd(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=jd(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Mc,Ec,Tc),this._renderer.xr.enabled=wc,e.scissorTest=!1,va(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===br||e.mapping===Mr?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Mc=this._renderer.getRenderTarget(),Ec=this._renderer.getActiveCubeFace(),Tc=this._renderer.getActiveMipmapLevel(),wc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:oi,minFilter:oi,generateMipmaps:!1,type:Fo,format:Xn,colorSpace:Er,depthBuffer:!1},s=qd(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=qd(e,t,i);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=VT(r)),this._blurMaterial=GT(r,e,t)}return s}_compileMaterial(e){const t=new bn(this._lodPlanes[0],e);this._renderer.compile(t,bc)}_sceneToCubeUV(e,t,i,s,r){const l=new Pn(90,1,t,i),c=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],f=this._renderer,d=f.autoClear,h=f.toneMapping;f.getClearColor(Wd),f.toneMapping=ns,f.autoClear=!1,f.state.buffers.depth.getReversed()&&(f.setRenderTarget(s),f.clearDepth(),f.setRenderTarget(null));const _=new zo({name:"PMREM.Background",side:hn,depthWrite:!1,depthTest:!1}),m=new bn(new Ho,_);let p=!1;const C=e.background;C?C.isColor&&(_.color.copy(C),e.background=null,p=!0):(_.color.copy(Wd),p=!0);for(let b=0;b<6;b++){const x=b%3;x===0?(l.up.set(0,c[b],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+u[b],r.y,r.z)):x===1?(l.up.set(0,0,c[b]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+u[b],r.z)):(l.up.set(0,c[b],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+u[b]));const w=this._cubeSize;va(s,x*w,b>2?w:0,w,w),f.setRenderTarget(s),p&&f.render(m,l),f.render(e,l)}m.geometry.dispose(),m.material.dispose(),f.toneMapping=h,f.autoClear=d,e.background=C}_textureToCubeUV(e,t){const i=this._renderer,s=e.mapping===br||e.mapping===Mr;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Yd()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=jd());const r=s?this._cubemapMaterial:this._equirectMaterial,o=new bn(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=e;const l=this._cubeSize;va(t,0,0,3*l,2*l),i.setRenderTarget(t),i.render(o,bc)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;const s=this._lodPlanes.length;for(let r=1;r<s;r++){const o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=Xd[(s-r-1)%Xd.length];this._blur(e,r-1,r,o,a)}t.autoClear=i}_blur(e,t,i,s,r){const o=this._pingPongRenderTarget;this._halfBlur(e,o,t,i,s,"latitudinal",r),this._halfBlur(o,e,i,i,s,"longitudinal",r)}_halfBlur(e,t,i,s,r,o,a){const l=this._renderer,c=this._blurMaterial,u=3,f=new bn(this._lodPlanes[s],c),d=c.uniforms,h=this._sizeLods[i]-1,g=isFinite(r)?Math.PI/(2*h):2*Math.PI/(2*lr-1),_=r/g,m=isFinite(r)?1+Math.floor(u*_):lr;m>lr;const p=[];let C=0;for(let P=0;P<lr;++P){const M=P/_,y=Math.exp(-M*M/2);p.push(y),P===0?C+=y:P<m&&(C+=2*y)}for(let P=0;P<p.length;P++)p[P]=p[P]/C;d.envMap.value=e.texture,d.samples.value=m,d.weights.value=p,d.latitudinal.value=o==="latitudinal",a&&(d.poleAxis.value=a);const{_lodMax:b}=this;d.dTheta.value=g,d.mipInt.value=b-i;const x=this._sizeLods[s],w=3*x*(s>b-ar?s-b+ar:0),L=4*(this._cubeSize-x);va(t,w,L,3*x,2*x),l.setRenderTarget(t),l.render(f,bc)}}function VT(n){const e=[],t=[],i=[];let s=n;const r=n-ar+1+Gd.length;for(let o=0;o<r;o++){const a=Math.pow(2,s);t.push(a);let l=1/a;o>n-ar?l=Gd[o-n+ar-1]:o===0&&(l=0),i.push(l);const c=1/(a-2),u=-c,f=1+c,d=[u,u,f,u,f,f,u,u,f,f,u,f],h=6,g=6,_=3,m=2,p=1,C=new Float32Array(_*g*h),b=new Float32Array(m*g*h),x=new Float32Array(p*g*h);for(let L=0;L<h;L++){const P=L%3*2/3-1,M=L>2?0:-1,y=[P,M,0,P+2/3,M,0,P+2/3,M+1,0,P,M,0,P+2/3,M+1,0,P,M+1,0];C.set(y,_*g*L),b.set(d,m*g*L);const E=[L,L,L,L,L,L];x.set(E,p*g*L)}const w=new Ui;w.setAttribute("position",new ui(C,_)),w.setAttribute("uv",new ui(b,m)),w.setAttribute("faceIndex",new ui(x,p)),e.push(w),s>ar&&s--}return{lodPlanes:e,sizeLods:t,sigmas:i}}function qd(n,e,t){const i=new Os(n,e,t);return i.texture.mapping=wl,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function va(n,e,t,i,s){n.viewport.set(e,t,i,s),n.scissor.set(e,t,i,s)}function GT(n,e,t){const i=new Float32Array(lr),s=new $(0,1,0);return new os({name:"SphericalGaussianBlur",defines:{n:lr,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Ff(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:ts,depthTest:!1,depthWrite:!1})}function jd(){return new os({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Ff(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:ts,depthTest:!1,depthWrite:!1})}function Yd(){return new os({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Ff(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:ts,depthTest:!1,depthWrite:!1})}function Ff(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function WT(n){let e=new WeakMap,t=null;function i(a){if(a&&a.isTexture){const l=a.mapping,c=l===lu||l===cu,u=l===br||l===Mr;if(c||u){let f=e.get(a);const d=f!==void 0?f.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==d)return t===null&&(t=new $d(n)),f=c?t.fromEquirectangular(a,f):t.fromCubemap(a,f),f.texture.pmremVersion=a.pmremVersion,e.set(a,f),f.texture;if(f!==void 0)return f.texture;{const h=a.image;return c&&h&&h.height>0||u&&h&&s(h)?(t===null&&(t=new $d(n)),f=c?t.fromEquirectangular(a):t.fromCubemap(a),f.texture.pmremVersion=a.pmremVersion,e.set(a,f),a.addEventListener("dispose",r),f.texture):null}}}return a}function s(a){let l=0;const c=6;for(let u=0;u<c;u++)a[u]!==void 0&&l++;return l===c}function r(a){const l=a.target;l.removeEventListener("dispose",r);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:i,dispose:o}}function XT(n){const e={};function t(i){if(e[i]!==void 0)return e[i];let s;switch(i){case"WEBGL_depth_texture":s=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=n.getExtension(i)}return e[i]=s,s}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){const s=t(i);return s===null&&_r("THREE.WebGLRenderer: "+i+" extension not supported."),s}}}function $T(n,e,t,i){const s={},r=new WeakMap;function o(f){const d=f.target;d.index!==null&&e.remove(d.index);for(const g in d.attributes)e.remove(d.attributes[g]);d.removeEventListener("dispose",o),delete s[d.id];const h=r.get(d);h&&(e.remove(h),r.delete(d)),i.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function a(f,d){return s[d.id]===!0||(d.addEventListener("dispose",o),s[d.id]=!0,t.memory.geometries++),d}function l(f){const d=f.attributes;for(const h in d)e.update(d[h],n.ARRAY_BUFFER)}function c(f){const d=[],h=f.index,g=f.attributes.position;let _=0;if(h!==null){const C=h.array;_=h.version;for(let b=0,x=C.length;b<x;b+=3){const w=C[b+0],L=C[b+1],P=C[b+2];d.push(w,L,L,P,P,w)}}else if(g!==void 0){const C=g.array;_=g.version;for(let b=0,x=C.length/3-1;b<x;b+=3){const w=b+0,L=b+1,P=b+2;d.push(w,L,L,P,P,w)}}else return;const m=new(Ug(d)?Bg:Fg)(d,1);m.version=_;const p=r.get(f);p&&e.remove(p),r.set(f,m)}function u(f){const d=r.get(f);if(d){const h=f.index;h!==null&&d.version<h.version&&c(f)}else c(f);return r.get(f)}return{get:a,update:l,getWireframeAttribute:u}}function qT(n,e,t){let i;function s(d){i=d}let r,o;function a(d){r=d.type,o=d.bytesPerElement}function l(d,h){n.drawElements(i,h,r,d*o),t.update(h,i,1)}function c(d,h,g){g!==0&&(n.drawElementsInstanced(i,h,r,d*o,g),t.update(h,i,g))}function u(d,h,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,h,0,r,d,0,g);let m=0;for(let p=0;p<g;p++)m+=h[p];t.update(m,i,1)}function f(d,h,g,_){if(g===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<d.length;p++)c(d[p]/o,h[p],_[p]);else{m.multiDrawElementsInstancedWEBGL(i,h,0,r,d,0,_,0,g);let p=0;for(let C=0;C<g;C++)p+=h[C]*_[C];t.update(p,i,1)}}this.setMode=s,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=u,this.renderMultiDrawInstances=f}function jT(n){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,o,a){switch(t.calls++,o){case n.TRIANGLES:t.triangles+=a*(r/3);break;case n.LINES:t.lines+=a*(r/2);break;case n.LINE_STRIP:t.lines+=a*(r-1);break;case n.LINE_LOOP:t.lines+=a*r;break;case n.POINTS:t.points+=a*r;break;default:break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:i}}function YT(n,e,t){const i=new WeakMap,s=new Lt;function r(o,a,l){const c=o.morphTargetInfluences,u=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,f=u!==void 0?u.length:0;let d=i.get(a);if(d===void 0||d.count!==f){let E=function(){M.dispose(),i.delete(a),a.removeEventListener("dispose",E)};var h=E;d!==void 0&&d.texture.dispose();const g=a.morphAttributes.position!==void 0,_=a.morphAttributes.normal!==void 0,m=a.morphAttributes.color!==void 0,p=a.morphAttributes.position||[],C=a.morphAttributes.normal||[],b=a.morphAttributes.color||[];let x=0;g===!0&&(x=1),_===!0&&(x=2),m===!0&&(x=3);let w=a.attributes.position.count*x,L=1;w>e.maxTextureSize&&(L=Math.ceil(w/e.maxTextureSize),w=e.maxTextureSize);const P=new Float32Array(w*L*4*f),M=new Ng(P,w,L,f);M.type=Ai,M.needsUpdate=!0;const y=x*4;for(let I=0;I<f;I++){const V=p[I],K=C[I],ee=b[I],se=w*L*4*I;for(let O=0;O<V.count;O++){const k=O*y;g===!0&&(s.fromBufferAttribute(V,O),P[se+k+0]=s.x,P[se+k+1]=s.y,P[se+k+2]=s.z,P[se+k+3]=0),_===!0&&(s.fromBufferAttribute(K,O),P[se+k+4]=s.x,P[se+k+5]=s.y,P[se+k+6]=s.z,P[se+k+7]=0),m===!0&&(s.fromBufferAttribute(ee,O),P[se+k+8]=s.x,P[se+k+9]=s.y,P[se+k+10]=s.z,P[se+k+11]=ee.itemSize===4?s.w:1)}}d={count:f,texture:M,size:new Se(w,L)},i.set(a,d),a.addEventListener("dispose",E)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",o.morphTexture,t);else{let g=0;for(let m=0;m<c.length;m++)g+=c[m];const _=a.morphTargetsRelative?1:1-g;l.getUniforms().setValue(n,"morphTargetBaseInfluence",_),l.getUniforms().setValue(n,"morphTargetInfluences",c)}l.getUniforms().setValue(n,"morphTargetsTexture",d.texture,t),l.getUniforms().setValue(n,"morphTargetsTextureSize",d.size)}return{update:r}}function KT(n,e,t,i){let s=new WeakMap;function r(l){const c=i.render.frame,u=l.geometry,f=e.get(l,u);if(s.get(f)!==c&&(e.update(f),s.set(f,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),s.get(l)!==c&&(t.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,n.ARRAY_BUFFER),s.set(l,c))),l.isSkinnedMesh){const d=l.skeleton;s.get(d)!==c&&(d.update(),s.set(d,c))}return f}function o(){s=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:r,dispose:o}}const Qg=new sn,Kd=new Gg(1,1),e_=new Ng,t_=new Hb,n_=new Hg,Zd=[],Jd=[],Qd=new Float32Array(16),ep=new Float32Array(9),tp=new Float32Array(4);function Dr(n,e,t){const i=n[0];if(i<=0||i>0)return n;const s=e*t;let r=Zd[s];if(r===void 0&&(r=new Float32Array(s),Zd[s]=r),e!==0){i.toArray(r,0);for(let o=1,a=0;o!==e;++o)a+=t,n[o].toArray(r,a)}return r}function Bt(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function kt(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function Rl(n,e){let t=Jd[e];t===void 0&&(t=new Int32Array(e),Jd[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function ZT(n,e){const t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function JT(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Bt(t,e))return;n.uniform2fv(this.addr,e),kt(t,e)}}function QT(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Bt(t,e))return;n.uniform3fv(this.addr,e),kt(t,e)}}function ew(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Bt(t,e))return;n.uniform4fv(this.addr,e),kt(t,e)}}function tw(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Bt(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),kt(t,e)}else{if(Bt(t,i))return;tp.set(i),n.uniformMatrix2fv(this.addr,!1,tp),kt(t,i)}}function nw(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Bt(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),kt(t,e)}else{if(Bt(t,i))return;ep.set(i),n.uniformMatrix3fv(this.addr,!1,ep),kt(t,i)}}function iw(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Bt(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),kt(t,e)}else{if(Bt(t,i))return;Qd.set(i),n.uniformMatrix4fv(this.addr,!1,Qd),kt(t,i)}}function sw(n,e){const t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function rw(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Bt(t,e))return;n.uniform2iv(this.addr,e),kt(t,e)}}function ow(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Bt(t,e))return;n.uniform3iv(this.addr,e),kt(t,e)}}function aw(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Bt(t,e))return;n.uniform4iv(this.addr,e),kt(t,e)}}function lw(n,e){const t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function cw(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Bt(t,e))return;n.uniform2uiv(this.addr,e),kt(t,e)}}function uw(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Bt(t,e))return;n.uniform3uiv(this.addr,e),kt(t,e)}}function fw(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Bt(t,e))return;n.uniform4uiv(this.addr,e),kt(t,e)}}function hw(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);let r;this.type===n.SAMPLER_2D_SHADOW?(Kd.compareFunction=Ig,r=Kd):r=Qg,t.setTexture2D(e||r,s)}function dw(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture3D(e||t_,s)}function pw(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTextureCube(e||n_,s)}function mw(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture2DArray(e||e_,s)}function gw(n){switch(n){case 5126:return ZT;case 35664:return JT;case 35665:return QT;case 35666:return ew;case 35674:return tw;case 35675:return nw;case 35676:return iw;case 5124:case 35670:return sw;case 35667:case 35671:return rw;case 35668:case 35672:return ow;case 35669:case 35673:return aw;case 5125:return lw;case 36294:return cw;case 36295:return uw;case 36296:return fw;case 35678:case 36198:case 36298:case 36306:case 35682:return hw;case 35679:case 36299:case 36307:return dw;case 35680:case 36300:case 36308:case 36293:return pw;case 36289:case 36303:case 36311:case 36292:return mw}}function _w(n,e){n.uniform1fv(this.addr,e)}function vw(n,e){const t=Dr(e,this.size,2);n.uniform2fv(this.addr,t)}function xw(n,e){const t=Dr(e,this.size,3);n.uniform3fv(this.addr,t)}function yw(n,e){const t=Dr(e,this.size,4);n.uniform4fv(this.addr,t)}function Sw(n,e){const t=Dr(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function bw(n,e){const t=Dr(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function Mw(n,e){const t=Dr(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function Ew(n,e){n.uniform1iv(this.addr,e)}function Tw(n,e){n.uniform2iv(this.addr,e)}function ww(n,e){n.uniform3iv(this.addr,e)}function Aw(n,e){n.uniform4iv(this.addr,e)}function Rw(n,e){n.uniform1uiv(this.addr,e)}function Cw(n,e){n.uniform2uiv(this.addr,e)}function Pw(n,e){n.uniform3uiv(this.addr,e)}function Dw(n,e){n.uniform4uiv(this.addr,e)}function Lw(n,e,t){const i=this.cache,s=e.length,r=Rl(t,s);Bt(i,r)||(n.uniform1iv(this.addr,r),kt(i,r));for(let o=0;o!==s;++o)t.setTexture2D(e[o]||Qg,r[o])}function Iw(n,e,t){const i=this.cache,s=e.length,r=Rl(t,s);Bt(i,r)||(n.uniform1iv(this.addr,r),kt(i,r));for(let o=0;o!==s;++o)t.setTexture3D(e[o]||t_,r[o])}function Uw(n,e,t){const i=this.cache,s=e.length,r=Rl(t,s);Bt(i,r)||(n.uniform1iv(this.addr,r),kt(i,r));for(let o=0;o!==s;++o)t.setTextureCube(e[o]||n_,r[o])}function Nw(n,e,t){const i=this.cache,s=e.length,r=Rl(t,s);Bt(i,r)||(n.uniform1iv(this.addr,r),kt(i,r));for(let o=0;o!==s;++o)t.setTexture2DArray(e[o]||e_,r[o])}function Ow(n){switch(n){case 5126:return _w;case 35664:return vw;case 35665:return xw;case 35666:return yw;case 35674:return Sw;case 35675:return bw;case 35676:return Mw;case 5124:case 35670:return Ew;case 35667:case 35671:return Tw;case 35668:case 35672:return ww;case 35669:case 35673:return Aw;case 5125:return Rw;case 36294:return Cw;case 36295:return Pw;case 36296:return Dw;case 35678:case 36198:case 36298:case 36306:case 35682:return Lw;case 35679:case 36299:case 36307:return Iw;case 35680:case 36300:case 36308:case 36293:return Uw;case 36289:case 36303:case 36311:case 36292:return Nw}}class Fw{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=gw(t.type)}}class Bw{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Ow(t.type)}}class kw{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const s=this.seq;for(let r=0,o=s.length;r!==o;++r){const a=s[r];a.setValue(e,t[a.id],i)}}}const Ac=/(\w+)(\])?(\[|\.)?/g;function np(n,e){n.seq.push(e),n.map[e.id]=e}function zw(n,e,t){const i=n.name,s=i.length;for(Ac.lastIndex=0;;){const r=Ac.exec(i),o=Ac.lastIndex;let a=r[1];const l=r[2]==="]",c=r[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===s){np(t,c===void 0?new Fw(a,n,e):new Bw(a,n,e));break}else{let f=t.map[a];f===void 0&&(f=new kw(a),np(t,f)),t=f}}}class Fa{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let s=0;s<i;++s){const r=e.getActiveUniform(t,s),o=e.getUniformLocation(t,r.name);zw(r,o,this)}}setValue(e,t,i,s){const r=this.map[t];r!==void 0&&r.setValue(e,i,s)}setOptional(e,t,i){const s=t[i];s!==void 0&&this.setValue(e,i,s)}static upload(e,t,i,s){for(let r=0,o=t.length;r!==o;++r){const a=t[r],l=i[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,s)}}static seqWithValue(e,t){const i=[];for(let s=0,r=e.length;s!==r;++s){const o=e[s];o.id in t&&i.push(o)}return i}}function ip(n,e,t){const i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}const Hw=37297;let Vw=0;function Gw(n,e){const t=n.split(`
`),i=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let o=s;o<r;o++){const a=o+1;i.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return i.join(`
`)}const sp=new et;function Ww(n){at._getMatrix(sp,at.workingColorSpace,n);const e=`mat3( ${sp.elements.map(t=>t.toFixed(4))} )`;switch(at.getTransfer(n)){case Qa:return[e,"LinearTransferOETF"];case mt:return[e,"sRGBTransferOETF"];default:return[e,"LinearTransferOETF"]}}function rp(n,e,t){const i=n.getShaderParameter(e,n.COMPILE_STATUS),r=(n.getShaderInfoLog(e)||"").trim();if(i&&r==="")return"";const o=/ERROR: 0:(\d+)/.exec(r);if(o){const a=parseInt(o[1]);return t.toUpperCase()+`

`+r+`

`+Gw(n.getShaderSource(e),a)}else return r}function Xw(n,e){const t=Ww(e);return[`vec4 ${n}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function $w(n,e){let t;switch(e){case mb:t="Linear";break;case gb:t="Reinhard";break;case _b:t="Cineon";break;case bg:t="ACESFilmic";break;case xb:t="AgX";break;case yb:t="Neutral";break;case vb:t="Custom";break;default:t="Linear"}return"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const xa=new $;function qw(){at.getLuminanceCoefficients(xa);const n=xa.x.toFixed(4),e=xa.y.toFixed(4),t=xa.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function jw(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter($r).join(`
`)}function Yw(n){const e=[];for(const t in n){const i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function Kw(n,e){const t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){const r=n.getActiveAttrib(e,s),o=r.name;let a=1;r.type===n.FLOAT_MAT2&&(a=2),r.type===n.FLOAT_MAT3&&(a=3),r.type===n.FLOAT_MAT4&&(a=4),t[o]={type:r.type,location:n.getAttribLocation(e,o),locationSize:a}}return t}function $r(n){return n!==""}function op(n,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function ap(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const Zw=/^[ \t]*#include +<([\w\d./]+)>/gm;function Wu(n){return n.replace(Zw,Qw)}const Jw=new Map;function Qw(n,e){let t=tt[e];if(t===void 0){const i=Jw.get(e);if(i!==void 0)t=tt[i];else throw new Error("Can not resolve #include <"+e+">")}return Wu(t)}const eA=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function lp(n){return n.replace(eA,tA)}function tA(n,e,t,i){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function cp(n){let e=`precision ${n.precision} float;
	precision ${n.precision} int;
	precision ${n.precision} sampler2D;
	precision ${n.precision} samplerCube;
	precision ${n.precision} sampler3D;
	precision ${n.precision} sampler2DArray;
	precision ${n.precision} sampler2DShadow;
	precision ${n.precision} samplerCubeShadow;
	precision ${n.precision} sampler2DArrayShadow;
	precision ${n.precision} isampler2D;
	precision ${n.precision} isampler3D;
	precision ${n.precision} isamplerCube;
	precision ${n.precision} isampler2DArray;
	precision ${n.precision} usampler2D;
	precision ${n.precision} usampler3D;
	precision ${n.precision} usamplerCube;
	precision ${n.precision} usampler2DArray;
	`;return n.precision==="highp"?e+=`
#define HIGH_PRECISION`:n.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function nA(n){let e="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===yg?e="SHADOWMAP_TYPE_PCF":n.shadowMapType===jS?e="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===Mi&&(e="SHADOWMAP_TYPE_VSM"),e}function iA(n){let e="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case br:case Mr:e="ENVMAP_TYPE_CUBE";break;case wl:e="ENVMAP_TYPE_CUBE_UV";break}return e}function sA(n){let e="ENVMAP_MODE_REFLECTION";if(n.envMap)switch(n.envMapMode){case Mr:e="ENVMAP_MODE_REFRACTION";break}return e}function rA(n){let e="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case Sg:e="ENVMAP_BLENDING_MULTIPLY";break;case db:e="ENVMAP_BLENDING_MIX";break;case pb:e="ENVMAP_BLENDING_ADD";break}return e}function oA(n){const e=n.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:i,maxMip:t}}function aA(n,e,t,i){const s=n.getContext(),r=t.defines;let o=t.vertexShader,a=t.fragmentShader;const l=nA(t),c=iA(t),u=sA(t),f=rA(t),d=oA(t),h=jw(t),g=Yw(r),_=s.createProgram();let m,p,C=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter($r).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter($r).join(`
`),p.length>0&&(p+=`
`)):(m=[cp(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reversedDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter($r).join(`
`),p=[cp(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",t.envMap?"#define "+f:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reversedDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==ns?"#define TONE_MAPPING":"",t.toneMapping!==ns?tt.tonemapping_pars_fragment:"",t.toneMapping!==ns?$w("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",tt.colorspace_pars_fragment,Xw("linearToOutputTexel",t.outputColorSpace),qw(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter($r).join(`
`)),o=Wu(o),o=op(o,t),o=ap(o,t),a=Wu(a),a=op(a,t),a=ap(a,t),o=lp(o),a=lp(a),t.isRawShaderMaterial!==!0&&(C=`#version 300 es
`,m=[h,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",t.glslVersion===_d?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===_d?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const b=C+m+o,x=C+p+a,w=ip(s,s.VERTEX_SHADER,b),L=ip(s,s.FRAGMENT_SHADER,x);s.attachShader(_,w),s.attachShader(_,L),t.index0AttributeName!==void 0?s.bindAttribLocation(_,0,t.index0AttributeName):t.morphTargets===!0&&s.bindAttribLocation(_,0,"position"),s.linkProgram(_);function P(I){if(n.debug.checkShaderErrors){const V=s.getProgramInfoLog(_)||"",K=s.getShaderInfoLog(w)||"",ee=s.getShaderInfoLog(L)||"",se=V.trim(),O=K.trim(),k=ee.trim();let N=!0,ue=!0;if(s.getProgramParameter(_,s.LINK_STATUS)===!1)if(N=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,_,w,L);else{const ye=rp(s,w,"vertex"),Te=rp(s,L,"fragment")}else se!==""||(O===""||k==="")&&(ue=!1);ue&&(I.diagnostics={runnable:N,programLog:se,vertexShader:{log:O,prefix:m},fragmentShader:{log:k,prefix:p}})}s.deleteShader(w),s.deleteShader(L),M=new Fa(s,_),y=Kw(s,_)}let M;this.getUniforms=function(){return M===void 0&&P(this),M};let y;this.getAttributes=function(){return y===void 0&&P(this),y};let E=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return E===!1&&(E=s.getProgramParameter(_,Hw)),E},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(_),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Vw++,this.cacheKey=e,this.usedTimes=1,this.program=_,this.vertexShader=w,this.fragmentShader=L,this}let lA=0;class cA{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,i=e.fragmentShader,s=this._getShaderStage(t),r=this._getShaderStage(i),o=this._getShaderCacheForMaterial(e);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new uA(e),t.set(e,i)),i}}class uA{constructor(e){this.id=lA++,this.code=e,this.usedTimes=0}}function fA(n,e,t,i,s,r,o){const a=new Lf,l=new cA,c=new Set,u=[],f=s.logarithmicDepthBuffer,d=s.vertexTextures;let h=s.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(y){return c.add(y),y===0?"uv":`uv${y}`}function m(y,E,I,V,K){const ee=V.fog,se=K.geometry,O=y.isMeshStandardMaterial?V.environment:null,k=(y.isMeshStandardMaterial?t:e).get(y.envMap||O),N=k&&k.mapping===wl?k.image.height:null,ue=g[y.type];y.precision!==null&&(h=s.getMaxPrecision(y.precision),y.precision);const ye=se.morphAttributes.position||se.morphAttributes.normal||se.morphAttributes.color,Te=ye!==void 0?ye.length:0;let Be=0;se.morphAttributes.position!==void 0&&(Be=1),se.morphAttributes.normal!==void 0&&(Be=2),se.morphAttributes.color!==void 0&&(Be=3);let Ze,Je,ae,ge;if(ue){const ct=si[ue];Ze=ct.vertexShader,Je=ct.fragmentShader}else Ze=y.vertexShader,Je=y.fragmentShader,l.update(y),ae=l.getVertexShaderID(y),ge=l.getFragmentShaderID(y);const G=n.getRenderTarget(),le=n.state.buffers.depth.getReversed(),oe=K.isInstancedMesh===!0,fe=K.isBatchedMesh===!0,Ve=!!y.map,D=!!y.matcap,v=!!k,U=!!y.aoMap,F=!!y.lightMap,H=!!y.bumpMap,B=!!y.normalMap,J=!!y.displacementMap,X=!!y.emissiveMap,Z=!!y.metalnessMap,ie=!!y.roughnessMap,de=y.anisotropy>0,T=y.clearcoat>0,S=y.dispersion>0,z=y.iridescence>0,Y=y.sheen>0,ce=y.transmission>0,Q=de&&!!y.anisotropyMap,Ae=T&&!!y.clearcoatMap,pe=T&&!!y.clearcoatNormalMap,Ce=T&&!!y.clearcoatRoughnessMap,Pe=z&&!!y.iridescenceMap,me=z&&!!y.iridescenceThicknessMap,we=Y&&!!y.sheenColorMap,Ne=Y&&!!y.sheenRoughnessMap,Le=!!y.specularMap,Me=!!y.specularColorMap,je=!!y.specularIntensityMap,W=ce&&!!y.transmissionMap,xe=ce&&!!y.thicknessMap,be=!!y.gradientMap,Ue=!!y.alphaMap,_e=y.alphaTest>0,he=!!y.alphaHash,ze=!!y.extensions;let Ke=ns;y.toneMapped&&(G===null||G.isXRRenderTarget===!0)&&(Ke=n.toneMapping);const yt={shaderID:ue,shaderType:y.type,shaderName:y.name,vertexShader:Ze,fragmentShader:Je,defines:y.defines,customVertexShaderID:ae,customFragmentShaderID:ge,isRawShaderMaterial:y.isRawShaderMaterial===!0,glslVersion:y.glslVersion,precision:h,batching:fe,batchingColor:fe&&K._colorsTexture!==null,instancing:oe,instancingColor:oe&&K.instanceColor!==null,instancingMorph:oe&&K.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:G===null?n.outputColorSpace:G.isXRRenderTarget===!0?G.texture.colorSpace:Er,alphaToCoverage:!!y.alphaToCoverage,map:Ve,matcap:D,envMap:v,envMapMode:v&&k.mapping,envMapCubeUVHeight:N,aoMap:U,lightMap:F,bumpMap:H,normalMap:B,displacementMap:d&&J,emissiveMap:X,normalMapObjectSpace:B&&y.normalMapType===Eb,normalMapTangentSpace:B&&y.normalMapType===Lg,metalnessMap:Z,roughnessMap:ie,anisotropy:de,anisotropyMap:Q,clearcoat:T,clearcoatMap:Ae,clearcoatNormalMap:pe,clearcoatRoughnessMap:Ce,dispersion:S,iridescence:z,iridescenceMap:Pe,iridescenceThicknessMap:me,sheen:Y,sheenColorMap:we,sheenRoughnessMap:Ne,specularMap:Le,specularColorMap:Me,specularIntensityMap:je,transmission:ce,transmissionMap:W,thicknessMap:xe,gradientMap:be,opaque:y.transparent===!1&&y.blending===gr&&y.alphaToCoverage===!1,alphaMap:Ue,alphaTest:_e,alphaHash:he,combine:y.combine,mapUv:Ve&&_(y.map.channel),aoMapUv:U&&_(y.aoMap.channel),lightMapUv:F&&_(y.lightMap.channel),bumpMapUv:H&&_(y.bumpMap.channel),normalMapUv:B&&_(y.normalMap.channel),displacementMapUv:J&&_(y.displacementMap.channel),emissiveMapUv:X&&_(y.emissiveMap.channel),metalnessMapUv:Z&&_(y.metalnessMap.channel),roughnessMapUv:ie&&_(y.roughnessMap.channel),anisotropyMapUv:Q&&_(y.anisotropyMap.channel),clearcoatMapUv:Ae&&_(y.clearcoatMap.channel),clearcoatNormalMapUv:pe&&_(y.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Ce&&_(y.clearcoatRoughnessMap.channel),iridescenceMapUv:Pe&&_(y.iridescenceMap.channel),iridescenceThicknessMapUv:me&&_(y.iridescenceThicknessMap.channel),sheenColorMapUv:we&&_(y.sheenColorMap.channel),sheenRoughnessMapUv:Ne&&_(y.sheenRoughnessMap.channel),specularMapUv:Le&&_(y.specularMap.channel),specularColorMapUv:Me&&_(y.specularColorMap.channel),specularIntensityMapUv:je&&_(y.specularIntensityMap.channel),transmissionMapUv:W&&_(y.transmissionMap.channel),thicknessMapUv:xe&&_(y.thicknessMap.channel),alphaMapUv:Ue&&_(y.alphaMap.channel),vertexTangents:!!se.attributes.tangent&&(B||de),vertexColors:y.vertexColors,vertexAlphas:y.vertexColors===!0&&!!se.attributes.color&&se.attributes.color.itemSize===4,pointsUvs:K.isPoints===!0&&!!se.attributes.uv&&(Ve||Ue),fog:!!ee,useFog:y.fog===!0,fogExp2:!!ee&&ee.isFogExp2,flatShading:y.flatShading===!0&&y.wireframe===!1,sizeAttenuation:y.sizeAttenuation===!0,logarithmicDepthBuffer:f,reversedDepthBuffer:le,skinning:K.isSkinnedMesh===!0,morphTargets:se.morphAttributes.position!==void 0,morphNormals:se.morphAttributes.normal!==void 0,morphColors:se.morphAttributes.color!==void 0,morphTargetsCount:Te,morphTextureStride:Be,numDirLights:E.directional.length,numPointLights:E.point.length,numSpotLights:E.spot.length,numSpotLightMaps:E.spotLightMap.length,numRectAreaLights:E.rectArea.length,numHemiLights:E.hemi.length,numDirLightShadows:E.directionalShadowMap.length,numPointLightShadows:E.pointShadowMap.length,numSpotLightShadows:E.spotShadowMap.length,numSpotLightShadowsWithMaps:E.numSpotLightShadowsWithMaps,numLightProbes:E.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:y.dithering,shadowMapEnabled:n.shadowMap.enabled&&I.length>0,shadowMapType:n.shadowMap.type,toneMapping:Ke,decodeVideoTexture:Ve&&y.map.isVideoTexture===!0&&at.getTransfer(y.map.colorSpace)===mt,decodeVideoTextureEmissive:X&&y.emissiveMap.isVideoTexture===!0&&at.getTransfer(y.emissiveMap.colorSpace)===mt,premultipliedAlpha:y.premultipliedAlpha,doubleSided:y.side===Gn,flipSided:y.side===hn,useDepthPacking:y.depthPacking>=0,depthPacking:y.depthPacking||0,index0AttributeName:y.index0AttributeName,extensionClipCullDistance:ze&&y.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ze&&y.extensions.multiDraw===!0||fe)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:y.customProgramCacheKey()};return yt.vertexUv1s=c.has(1),yt.vertexUv2s=c.has(2),yt.vertexUv3s=c.has(3),c.clear(),yt}function p(y){const E=[];if(y.shaderID?E.push(y.shaderID):(E.push(y.customVertexShaderID),E.push(y.customFragmentShaderID)),y.defines!==void 0)for(const I in y.defines)E.push(I),E.push(y.defines[I]);return y.isRawShaderMaterial===!1&&(C(E,y),b(E,y),E.push(n.outputColorSpace)),E.push(y.customProgramCacheKey),E.join()}function C(y,E){y.push(E.precision),y.push(E.outputColorSpace),y.push(E.envMapMode),y.push(E.envMapCubeUVHeight),y.push(E.mapUv),y.push(E.alphaMapUv),y.push(E.lightMapUv),y.push(E.aoMapUv),y.push(E.bumpMapUv),y.push(E.normalMapUv),y.push(E.displacementMapUv),y.push(E.emissiveMapUv),y.push(E.metalnessMapUv),y.push(E.roughnessMapUv),y.push(E.anisotropyMapUv),y.push(E.clearcoatMapUv),y.push(E.clearcoatNormalMapUv),y.push(E.clearcoatRoughnessMapUv),y.push(E.iridescenceMapUv),y.push(E.iridescenceThicknessMapUv),y.push(E.sheenColorMapUv),y.push(E.sheenRoughnessMapUv),y.push(E.specularMapUv),y.push(E.specularColorMapUv),y.push(E.specularIntensityMapUv),y.push(E.transmissionMapUv),y.push(E.thicknessMapUv),y.push(E.combine),y.push(E.fogExp2),y.push(E.sizeAttenuation),y.push(E.morphTargetsCount),y.push(E.morphAttributeCount),y.push(E.numDirLights),y.push(E.numPointLights),y.push(E.numSpotLights),y.push(E.numSpotLightMaps),y.push(E.numHemiLights),y.push(E.numRectAreaLights),y.push(E.numDirLightShadows),y.push(E.numPointLightShadows),y.push(E.numSpotLightShadows),y.push(E.numSpotLightShadowsWithMaps),y.push(E.numLightProbes),y.push(E.shadowMapType),y.push(E.toneMapping),y.push(E.numClippingPlanes),y.push(E.numClipIntersection),y.push(E.depthPacking)}function b(y,E){a.disableAll(),E.supportsVertexTextures&&a.enable(0),E.instancing&&a.enable(1),E.instancingColor&&a.enable(2),E.instancingMorph&&a.enable(3),E.matcap&&a.enable(4),E.envMap&&a.enable(5),E.normalMapObjectSpace&&a.enable(6),E.normalMapTangentSpace&&a.enable(7),E.clearcoat&&a.enable(8),E.iridescence&&a.enable(9),E.alphaTest&&a.enable(10),E.vertexColors&&a.enable(11),E.vertexAlphas&&a.enable(12),E.vertexUv1s&&a.enable(13),E.vertexUv2s&&a.enable(14),E.vertexUv3s&&a.enable(15),E.vertexTangents&&a.enable(16),E.anisotropy&&a.enable(17),E.alphaHash&&a.enable(18),E.batching&&a.enable(19),E.dispersion&&a.enable(20),E.batchingColor&&a.enable(21),E.gradientMap&&a.enable(22),y.push(a.mask),a.disableAll(),E.fog&&a.enable(0),E.useFog&&a.enable(1),E.flatShading&&a.enable(2),E.logarithmicDepthBuffer&&a.enable(3),E.reversedDepthBuffer&&a.enable(4),E.skinning&&a.enable(5),E.morphTargets&&a.enable(6),E.morphNormals&&a.enable(7),E.morphColors&&a.enable(8),E.premultipliedAlpha&&a.enable(9),E.shadowMapEnabled&&a.enable(10),E.doubleSided&&a.enable(11),E.flipSided&&a.enable(12),E.useDepthPacking&&a.enable(13),E.dithering&&a.enable(14),E.transmission&&a.enable(15),E.sheen&&a.enable(16),E.opaque&&a.enable(17),E.pointsUvs&&a.enable(18),E.decodeVideoTexture&&a.enable(19),E.decodeVideoTextureEmissive&&a.enable(20),E.alphaToCoverage&&a.enable(21),y.push(a.mask)}function x(y){const E=g[y.type];let I;if(E){const V=si[E];I=eM.clone(V.uniforms)}else I=y.uniforms;return I}function w(y,E){let I;for(let V=0,K=u.length;V<K;V++){const ee=u[V];if(ee.cacheKey===E){I=ee,++I.usedTimes;break}}return I===void 0&&(I=new aA(n,E,y,r),u.push(I)),I}function L(y){if(--y.usedTimes===0){const E=u.indexOf(y);u[E]=u[u.length-1],u.pop(),y.destroy()}}function P(y){l.remove(y)}function M(){l.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:x,acquireProgram:w,releaseProgram:L,releaseShaderCache:P,programs:u,dispose:M}}function hA(){let n=new WeakMap;function e(o){return n.has(o)}function t(o){let a=n.get(o);return a===void 0&&(a={},n.set(o,a)),a}function i(o){n.delete(o)}function s(o,a,l){n.get(o)[a]=l}function r(){n=new WeakMap}return{has:e,get:t,remove:i,update:s,dispose:r}}function dA(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.z!==e.z?n.z-e.z:n.id-e.id}function up(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function fp(){const n=[];let e=0;const t=[],i=[],s=[];function r(){e=0,t.length=0,i.length=0,s.length=0}function o(f,d,h,g,_,m){let p=n[e];return p===void 0?(p={id:f.id,object:f,geometry:d,material:h,groupOrder:g,renderOrder:f.renderOrder,z:_,group:m},n[e]=p):(p.id=f.id,p.object=f,p.geometry=d,p.material=h,p.groupOrder=g,p.renderOrder=f.renderOrder,p.z=_,p.group=m),e++,p}function a(f,d,h,g,_,m){const p=o(f,d,h,g,_,m);h.transmission>0?i.push(p):h.transparent===!0?s.push(p):t.push(p)}function l(f,d,h,g,_,m){const p=o(f,d,h,g,_,m);h.transmission>0?i.unshift(p):h.transparent===!0?s.unshift(p):t.unshift(p)}function c(f,d){t.length>1&&t.sort(f||dA),i.length>1&&i.sort(d||up),s.length>1&&s.sort(d||up)}function u(){for(let f=e,d=n.length;f<d;f++){const h=n[f];if(h.id===null)break;h.id=null,h.object=null,h.geometry=null,h.material=null,h.group=null}}return{opaque:t,transmissive:i,transparent:s,init:r,push:a,unshift:l,finish:u,sort:c}}function pA(){let n=new WeakMap;function e(i,s){const r=n.get(i);let o;return r===void 0?(o=new fp,n.set(i,[o])):s>=r.length?(o=new fp,r.push(o)):o=r[s],o}function t(){n=new WeakMap}return{get:e,dispose:t}}function mA(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new $,color:new lt};break;case"SpotLight":t={position:new $,direction:new $,color:new lt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new $,color:new lt,distance:0,decay:0};break;case"HemisphereLight":t={direction:new $,skyColor:new lt,groundColor:new lt};break;case"RectAreaLight":t={color:new lt,position:new $,halfWidth:new $,halfHeight:new $};break}return n[e.id]=t,t}}}function gA(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Se};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Se};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Se,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}let _A=0;function vA(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function xA(n){const e=new mA,t=gA(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new $);const s=new $,r=new It,o=new It;function a(c){let u=0,f=0,d=0;for(let y=0;y<9;y++)i.probe[y].set(0,0,0);let h=0,g=0,_=0,m=0,p=0,C=0,b=0,x=0,w=0,L=0,P=0;c.sort(vA);for(let y=0,E=c.length;y<E;y++){const I=c[y],V=I.color,K=I.intensity,ee=I.distance,se=I.shadow&&I.shadow.map?I.shadow.map.texture:null;if(I.isAmbientLight)u+=V.r*K,f+=V.g*K,d+=V.b*K;else if(I.isLightProbe){for(let O=0;O<9;O++)i.probe[O].addScaledVector(I.sh.coefficients[O],K);P++}else if(I.isDirectionalLight){const O=e.get(I);if(O.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){const k=I.shadow,N=t.get(I);N.shadowIntensity=k.intensity,N.shadowBias=k.bias,N.shadowNormalBias=k.normalBias,N.shadowRadius=k.radius,N.shadowMapSize=k.mapSize,i.directionalShadow[h]=N,i.directionalShadowMap[h]=se,i.directionalShadowMatrix[h]=I.shadow.matrix,C++}i.directional[h]=O,h++}else if(I.isSpotLight){const O=e.get(I);O.position.setFromMatrixPosition(I.matrixWorld),O.color.copy(V).multiplyScalar(K),O.distance=ee,O.coneCos=Math.cos(I.angle),O.penumbraCos=Math.cos(I.angle*(1-I.penumbra)),O.decay=I.decay,i.spot[_]=O;const k=I.shadow;if(I.map&&(i.spotLightMap[w]=I.map,w++,k.updateMatrices(I),I.castShadow&&L++),i.spotLightMatrix[_]=k.matrix,I.castShadow){const N=t.get(I);N.shadowIntensity=k.intensity,N.shadowBias=k.bias,N.shadowNormalBias=k.normalBias,N.shadowRadius=k.radius,N.shadowMapSize=k.mapSize,i.spotShadow[_]=N,i.spotShadowMap[_]=se,x++}_++}else if(I.isRectAreaLight){const O=e.get(I);O.color.copy(V).multiplyScalar(K),O.halfWidth.set(I.width*.5,0,0),O.halfHeight.set(0,I.height*.5,0),i.rectArea[m]=O,m++}else if(I.isPointLight){const O=e.get(I);if(O.color.copy(I.color).multiplyScalar(I.intensity),O.distance=I.distance,O.decay=I.decay,I.castShadow){const k=I.shadow,N=t.get(I);N.shadowIntensity=k.intensity,N.shadowBias=k.bias,N.shadowNormalBias=k.normalBias,N.shadowRadius=k.radius,N.shadowMapSize=k.mapSize,N.shadowCameraNear=k.camera.near,N.shadowCameraFar=k.camera.far,i.pointShadow[g]=N,i.pointShadowMap[g]=se,i.pointShadowMatrix[g]=I.shadow.matrix,b++}i.point[g]=O,g++}else if(I.isHemisphereLight){const O=e.get(I);O.skyColor.copy(I.color).multiplyScalar(K),O.groundColor.copy(I.groundColor).multiplyScalar(K),i.hemi[p]=O,p++}}m>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=Ee.LTC_FLOAT_1,i.rectAreaLTC2=Ee.LTC_FLOAT_2):(i.rectAreaLTC1=Ee.LTC_HALF_1,i.rectAreaLTC2=Ee.LTC_HALF_2)),i.ambient[0]=u,i.ambient[1]=f,i.ambient[2]=d;const M=i.hash;(M.directionalLength!==h||M.pointLength!==g||M.spotLength!==_||M.rectAreaLength!==m||M.hemiLength!==p||M.numDirectionalShadows!==C||M.numPointShadows!==b||M.numSpotShadows!==x||M.numSpotMaps!==w||M.numLightProbes!==P)&&(i.directional.length=h,i.spot.length=_,i.rectArea.length=m,i.point.length=g,i.hemi.length=p,i.directionalShadow.length=C,i.directionalShadowMap.length=C,i.pointShadow.length=b,i.pointShadowMap.length=b,i.spotShadow.length=x,i.spotShadowMap.length=x,i.directionalShadowMatrix.length=C,i.pointShadowMatrix.length=b,i.spotLightMatrix.length=x+w-L,i.spotLightMap.length=w,i.numSpotLightShadowsWithMaps=L,i.numLightProbes=P,M.directionalLength=h,M.pointLength=g,M.spotLength=_,M.rectAreaLength=m,M.hemiLength=p,M.numDirectionalShadows=C,M.numPointShadows=b,M.numSpotShadows=x,M.numSpotMaps=w,M.numLightProbes=P,i.version=_A++)}function l(c,u){let f=0,d=0,h=0,g=0,_=0;const m=u.matrixWorldInverse;for(let p=0,C=c.length;p<C;p++){const b=c[p];if(b.isDirectionalLight){const x=i.directional[f];x.direction.setFromMatrixPosition(b.matrixWorld),s.setFromMatrixPosition(b.target.matrixWorld),x.direction.sub(s),x.direction.transformDirection(m),f++}else if(b.isSpotLight){const x=i.spot[h];x.position.setFromMatrixPosition(b.matrixWorld),x.position.applyMatrix4(m),x.direction.setFromMatrixPosition(b.matrixWorld),s.setFromMatrixPosition(b.target.matrixWorld),x.direction.sub(s),x.direction.transformDirection(m),h++}else if(b.isRectAreaLight){const x=i.rectArea[g];x.position.setFromMatrixPosition(b.matrixWorld),x.position.applyMatrix4(m),o.identity(),r.copy(b.matrixWorld),r.premultiply(m),o.extractRotation(r),x.halfWidth.set(b.width*.5,0,0),x.halfHeight.set(0,b.height*.5,0),x.halfWidth.applyMatrix4(o),x.halfHeight.applyMatrix4(o),g++}else if(b.isPointLight){const x=i.point[d];x.position.setFromMatrixPosition(b.matrixWorld),x.position.applyMatrix4(m),d++}else if(b.isHemisphereLight){const x=i.hemi[_];x.direction.setFromMatrixPosition(b.matrixWorld),x.direction.transformDirection(m),_++}}}return{setup:a,setupView:l,state:i}}function hp(n){const e=new xA(n),t=[],i=[];function s(u){c.camera=u,t.length=0,i.length=0}function r(u){t.push(u)}function o(u){i.push(u)}function a(){e.setup(t)}function l(u){e.setupView(t,u)}const c={lightsArray:t,shadowsArray:i,camera:null,lights:e,transmissionRenderTarget:{}};return{init:s,state:c,setupLights:a,setupLightsView:l,pushLight:r,pushShadow:o}}function yA(n){let e=new WeakMap;function t(s,r=0){const o=e.get(s);let a;return o===void 0?(a=new hp(n),e.set(s,[a])):r>=o.length?(a=new hp(n),o.push(a)):a=o[r],a}function i(){e=new WeakMap}return{get:t,dispose:i}}const SA=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,bA=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function MA(n,e,t){let i=new Vg;const s=new Se,r=new Se,o=new Lt,a=new XM({depthPacking:Mb}),l=new $M,c={},u=t.maxTextureSize,f={[rs]:hn,[hn]:rs,[Gn]:Gn},d=new os({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Se},radius:{value:4}},vertexShader:SA,fragmentShader:bA}),h=d.clone();h.defines.HORIZONTAL_PASS=1;const g=new Ui;g.setAttribute("position",new ui(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new bn(g,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=yg;let p=this.type;this.render=function(L,P,M){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||L.length===0)return;const y=n.getRenderTarget(),E=n.getActiveCubeFace(),I=n.getActiveMipmapLevel(),V=n.state;V.setBlending(ts),V.buffers.depth.getReversed()?V.buffers.color.setClear(0,0,0,0):V.buffers.color.setClear(1,1,1,1),V.buffers.depth.setTest(!0),V.setScissorTest(!1);const K=p!==Mi&&this.type===Mi,ee=p===Mi&&this.type!==Mi;for(let se=0,O=L.length;se<O;se++){const k=L[se],N=k.shadow;if(N===void 0||N.autoUpdate===!1&&N.needsUpdate===!1)continue;s.copy(N.mapSize);const ue=N.getFrameExtents();if(s.multiply(ue),r.copy(N.mapSize),(s.x>u||s.y>u)&&(s.x>u&&(r.x=Math.floor(u/ue.x),s.x=r.x*ue.x,N.mapSize.x=r.x),s.y>u&&(r.y=Math.floor(u/ue.y),s.y=r.y*ue.y,N.mapSize.y=r.y)),N.map===null||K===!0||ee===!0){const Te=this.type!==Mi?{minFilter:qn,magFilter:qn}:{};N.map!==null&&N.map.dispose(),N.map=new Os(s.x,s.y,Te),N.map.texture.name=k.name+".shadowMap",N.camera.updateProjectionMatrix()}n.setRenderTarget(N.map),n.clear();const ye=N.getViewportCount();for(let Te=0;Te<ye;Te++){const Be=N.getViewport(Te);o.set(r.x*Be.x,r.y*Be.y,r.x*Be.z,r.y*Be.w),V.viewport(o),N.updateMatrices(k,Te),i=N.getFrustum(),x(P,M,N.camera,k,this.type)}N.isPointLightShadow!==!0&&this.type===Mi&&C(N,M),N.needsUpdate=!1}p=this.type,m.needsUpdate=!1,n.setRenderTarget(y,E,I)};function C(L,P){const M=e.update(_);d.defines.VSM_SAMPLES!==L.blurSamples&&(d.defines.VSM_SAMPLES=L.blurSamples,h.defines.VSM_SAMPLES=L.blurSamples,d.needsUpdate=!0,h.needsUpdate=!0),L.mapPass===null&&(L.mapPass=new Os(s.x,s.y)),d.uniforms.shadow_pass.value=L.map.texture,d.uniforms.resolution.value=L.mapSize,d.uniforms.radius.value=L.radius,n.setRenderTarget(L.mapPass),n.clear(),n.renderBufferDirect(P,null,M,d,_,null),h.uniforms.shadow_pass.value=L.mapPass.texture,h.uniforms.resolution.value=L.mapSize,h.uniforms.radius.value=L.radius,n.setRenderTarget(L.map),n.clear(),n.renderBufferDirect(P,null,M,h,_,null)}function b(L,P,M,y){let E=null;const I=M.isPointLight===!0?L.customDistanceMaterial:L.customDepthMaterial;if(I!==void 0)E=I;else if(E=M.isPointLight===!0?l:a,n.localClippingEnabled&&P.clipShadows===!0&&Array.isArray(P.clippingPlanes)&&P.clippingPlanes.length!==0||P.displacementMap&&P.displacementScale!==0||P.alphaMap&&P.alphaTest>0||P.map&&P.alphaTest>0||P.alphaToCoverage===!0){const V=E.uuid,K=P.uuid;let ee=c[V];ee===void 0&&(ee={},c[V]=ee);let se=ee[K];se===void 0&&(se=E.clone(),ee[K]=se,P.addEventListener("dispose",w)),E=se}if(E.visible=P.visible,E.wireframe=P.wireframe,y===Mi?E.side=P.shadowSide!==null?P.shadowSide:P.side:E.side=P.shadowSide!==null?P.shadowSide:f[P.side],E.alphaMap=P.alphaMap,E.alphaTest=P.alphaToCoverage===!0?.5:P.alphaTest,E.map=P.map,E.clipShadows=P.clipShadows,E.clippingPlanes=P.clippingPlanes,E.clipIntersection=P.clipIntersection,E.displacementMap=P.displacementMap,E.displacementScale=P.displacementScale,E.displacementBias=P.displacementBias,E.wireframeLinewidth=P.wireframeLinewidth,E.linewidth=P.linewidth,M.isPointLight===!0&&E.isMeshDistanceMaterial===!0){const V=n.properties.get(E);V.light=M}return E}function x(L,P,M,y,E){if(L.visible===!1)return;if(L.layers.test(P.layers)&&(L.isMesh||L.isLine||L.isPoints)&&(L.castShadow||L.receiveShadow&&E===Mi)&&(!L.frustumCulled||i.intersectsObject(L))){L.modelViewMatrix.multiplyMatrices(M.matrixWorldInverse,L.matrixWorld);const K=e.update(L),ee=L.material;if(Array.isArray(ee)){const se=K.groups;for(let O=0,k=se.length;O<k;O++){const N=se[O],ue=ee[N.materialIndex];if(ue&&ue.visible){const ye=b(L,ue,y,E);L.onBeforeShadow(n,L,P,M,K,ye,N),n.renderBufferDirect(M,null,K,ye,L,N),L.onAfterShadow(n,L,P,M,K,ye,N)}}}else if(ee.visible){const se=b(L,ee,y,E);L.onBeforeShadow(n,L,P,M,K,se,null),n.renderBufferDirect(M,null,K,se,L,null),L.onAfterShadow(n,L,P,M,K,se,null)}}const V=L.children;for(let K=0,ee=V.length;K<ee;K++)x(V[K],P,M,y,E)}function w(L){L.target.removeEventListener("dispose",w);for(const M in c){const y=c[M],E=L.target.uuid;E in y&&(y[E].dispose(),delete y[E])}}}const EA={[tu]:nu,[iu]:ou,[su]:au,[Sr]:ru,[nu]:tu,[ou]:iu,[au]:su,[ru]:Sr};function TA(n,e){function t(){let W=!1;const xe=new Lt;let be=null;const Ue=new Lt(0,0,0,0);return{setMask:function(_e){be!==_e&&!W&&(n.colorMask(_e,_e,_e,_e),be=_e)},setLocked:function(_e){W=_e},setClear:function(_e,he,ze,Ke,yt){yt===!0&&(_e*=Ke,he*=Ke,ze*=Ke),xe.set(_e,he,ze,Ke),Ue.equals(xe)===!1&&(n.clearColor(_e,he,ze,Ke),Ue.copy(xe))},reset:function(){W=!1,be=null,Ue.set(-1,0,0,0)}}}function i(){let W=!1,xe=!1,be=null,Ue=null,_e=null;return{setReversed:function(he){if(xe!==he){const ze=e.get("EXT_clip_control");he?ze.clipControlEXT(ze.LOWER_LEFT_EXT,ze.ZERO_TO_ONE_EXT):ze.clipControlEXT(ze.LOWER_LEFT_EXT,ze.NEGATIVE_ONE_TO_ONE_EXT),xe=he;const Ke=_e;_e=null,this.setClear(Ke)}},getReversed:function(){return xe},setTest:function(he){he?G(n.DEPTH_TEST):le(n.DEPTH_TEST)},setMask:function(he){be!==he&&!W&&(n.depthMask(he),be=he)},setFunc:function(he){if(xe&&(he=EA[he]),Ue!==he){switch(he){case tu:n.depthFunc(n.NEVER);break;case nu:n.depthFunc(n.ALWAYS);break;case iu:n.depthFunc(n.LESS);break;case Sr:n.depthFunc(n.LEQUAL);break;case su:n.depthFunc(n.EQUAL);break;case ru:n.depthFunc(n.GEQUAL);break;case ou:n.depthFunc(n.GREATER);break;case au:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}Ue=he}},setLocked:function(he){W=he},setClear:function(he){_e!==he&&(xe&&(he=1-he),n.clearDepth(he),_e=he)},reset:function(){W=!1,be=null,Ue=null,_e=null,xe=!1}}}function s(){let W=!1,xe=null,be=null,Ue=null,_e=null,he=null,ze=null,Ke=null,yt=null;return{setTest:function(ct){W||(ct?G(n.STENCIL_TEST):le(n.STENCIL_TEST))},setMask:function(ct){xe!==ct&&!W&&(n.stencilMask(ct),xe=ct)},setFunc:function(ct,pi,Qn){(be!==ct||Ue!==pi||_e!==Qn)&&(n.stencilFunc(ct,pi,Qn),be=ct,Ue=pi,_e=Qn)},setOp:function(ct,pi,Qn){(he!==ct||ze!==pi||Ke!==Qn)&&(n.stencilOp(ct,pi,Qn),he=ct,ze=pi,Ke=Qn)},setLocked:function(ct){W=ct},setClear:function(ct){yt!==ct&&(n.clearStencil(ct),yt=ct)},reset:function(){W=!1,xe=null,be=null,Ue=null,_e=null,he=null,ze=null,Ke=null,yt=null}}}const r=new t,o=new i,a=new s,l=new WeakMap,c=new WeakMap;let u={},f={},d=new WeakMap,h=[],g=null,_=!1,m=null,p=null,C=null,b=null,x=null,w=null,L=null,P=new lt(0,0,0),M=0,y=!1,E=null,I=null,V=null,K=null,ee=null;const se=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let O=!1,k=0;const N=n.getParameter(n.VERSION);N.indexOf("WebGL")!==-1?(k=parseFloat(/^WebGL (\d)/.exec(N)[1]),O=k>=1):N.indexOf("OpenGL ES")!==-1&&(k=parseFloat(/^OpenGL ES (\d)/.exec(N)[1]),O=k>=2);let ue=null,ye={};const Te=n.getParameter(n.SCISSOR_BOX),Be=n.getParameter(n.VIEWPORT),Ze=new Lt().fromArray(Te),Je=new Lt().fromArray(Be);function ae(W,xe,be,Ue){const _e=new Uint8Array(4),he=n.createTexture();n.bindTexture(W,he),n.texParameteri(W,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(W,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let ze=0;ze<be;ze++)W===n.TEXTURE_3D||W===n.TEXTURE_2D_ARRAY?n.texImage3D(xe,0,n.RGBA,1,1,Ue,0,n.RGBA,n.UNSIGNED_BYTE,_e):n.texImage2D(xe+ze,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,_e);return he}const ge={};ge[n.TEXTURE_2D]=ae(n.TEXTURE_2D,n.TEXTURE_2D,1),ge[n.TEXTURE_CUBE_MAP]=ae(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),ge[n.TEXTURE_2D_ARRAY]=ae(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),ge[n.TEXTURE_3D]=ae(n.TEXTURE_3D,n.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),G(n.DEPTH_TEST),o.setFunc(Sr),H(!1),B(fd),G(n.CULL_FACE),U(ts);function G(W){u[W]!==!0&&(n.enable(W),u[W]=!0)}function le(W){u[W]!==!1&&(n.disable(W),u[W]=!1)}function oe(W,xe){return f[W]!==xe?(n.bindFramebuffer(W,xe),f[W]=xe,W===n.DRAW_FRAMEBUFFER&&(f[n.FRAMEBUFFER]=xe),W===n.FRAMEBUFFER&&(f[n.DRAW_FRAMEBUFFER]=xe),!0):!1}function fe(W,xe){let be=h,Ue=!1;if(W){be=d.get(xe),be===void 0&&(be=[],d.set(xe,be));const _e=W.textures;if(be.length!==_e.length||be[0]!==n.COLOR_ATTACHMENT0){for(let he=0,ze=_e.length;he<ze;he++)be[he]=n.COLOR_ATTACHMENT0+he;be.length=_e.length,Ue=!0}}else be[0]!==n.BACK&&(be[0]=n.BACK,Ue=!0);Ue&&n.drawBuffers(be)}function Ve(W){return g!==W?(n.useProgram(W),g=W,!0):!1}const D={[Ts]:n.FUNC_ADD,[KS]:n.FUNC_SUBTRACT,[ZS]:n.FUNC_REVERSE_SUBTRACT};D[JS]=n.MIN,D[QS]=n.MAX;const v={[eb]:n.ZERO,[tb]:n.ONE,[nb]:n.SRC_COLOR,[Qc]:n.SRC_ALPHA,[lb]:n.SRC_ALPHA_SATURATE,[ob]:n.DST_COLOR,[sb]:n.DST_ALPHA,[ib]:n.ONE_MINUS_SRC_COLOR,[eu]:n.ONE_MINUS_SRC_ALPHA,[ab]:n.ONE_MINUS_DST_COLOR,[rb]:n.ONE_MINUS_DST_ALPHA,[cb]:n.CONSTANT_COLOR,[ub]:n.ONE_MINUS_CONSTANT_COLOR,[fb]:n.CONSTANT_ALPHA,[hb]:n.ONE_MINUS_CONSTANT_ALPHA};function U(W,xe,be,Ue,_e,he,ze,Ke,yt,ct){if(W===ts){_===!0&&(le(n.BLEND),_=!1);return}if(_===!1&&(G(n.BLEND),_=!0),W!==YS){if(W!==m||ct!==y){if((p!==Ts||x!==Ts)&&(n.blendEquation(n.FUNC_ADD),p=Ts,x=Ts),ct)switch(W){case gr:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case hd:n.blendFunc(n.ONE,n.ONE);break;case dd:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case pd:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:break}else switch(W){case gr:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case hd:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case dd:break;case pd:break;default:break}C=null,b=null,w=null,L=null,P.set(0,0,0),M=0,m=W,y=ct}return}_e=_e||xe,he=he||be,ze=ze||Ue,(xe!==p||_e!==x)&&(n.blendEquationSeparate(D[xe],D[_e]),p=xe,x=_e),(be!==C||Ue!==b||he!==w||ze!==L)&&(n.blendFuncSeparate(v[be],v[Ue],v[he],v[ze]),C=be,b=Ue,w=he,L=ze),(Ke.equals(P)===!1||yt!==M)&&(n.blendColor(Ke.r,Ke.g,Ke.b,yt),P.copy(Ke),M=yt),m=W,y=!1}function F(W,xe){W.side===Gn?le(n.CULL_FACE):G(n.CULL_FACE);let be=W.side===hn;xe&&(be=!be),H(be),W.blending===gr&&W.transparent===!1?U(ts):U(W.blending,W.blendEquation,W.blendSrc,W.blendDst,W.blendEquationAlpha,W.blendSrcAlpha,W.blendDstAlpha,W.blendColor,W.blendAlpha,W.premultipliedAlpha),o.setFunc(W.depthFunc),o.setTest(W.depthTest),o.setMask(W.depthWrite),r.setMask(W.colorWrite);const Ue=W.stencilWrite;a.setTest(Ue),Ue&&(a.setMask(W.stencilWriteMask),a.setFunc(W.stencilFunc,W.stencilRef,W.stencilFuncMask),a.setOp(W.stencilFail,W.stencilZFail,W.stencilZPass)),X(W.polygonOffset,W.polygonOffsetFactor,W.polygonOffsetUnits),W.alphaToCoverage===!0?G(n.SAMPLE_ALPHA_TO_COVERAGE):le(n.SAMPLE_ALPHA_TO_COVERAGE)}function H(W){E!==W&&(W?n.frontFace(n.CW):n.frontFace(n.CCW),E=W)}function B(W){W!==$S?(G(n.CULL_FACE),W!==I&&(W===fd?n.cullFace(n.BACK):W===qS?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):le(n.CULL_FACE),I=W}function J(W){W!==V&&(O&&n.lineWidth(W),V=W)}function X(W,xe,be){W?(G(n.POLYGON_OFFSET_FILL),(K!==xe||ee!==be)&&(n.polygonOffset(xe,be),K=xe,ee=be)):le(n.POLYGON_OFFSET_FILL)}function Z(W){W?G(n.SCISSOR_TEST):le(n.SCISSOR_TEST)}function ie(W){W===void 0&&(W=n.TEXTURE0+se-1),ue!==W&&(n.activeTexture(W),ue=W)}function de(W,xe,be){be===void 0&&(ue===null?be=n.TEXTURE0+se-1:be=ue);let Ue=ye[be];Ue===void 0&&(Ue={type:void 0,texture:void 0},ye[be]=Ue),(Ue.type!==W||Ue.texture!==xe)&&(ue!==be&&(n.activeTexture(be),ue=be),n.bindTexture(W,xe||ge[W]),Ue.type=W,Ue.texture=xe)}function T(){const W=ye[ue];W!==void 0&&W.type!==void 0&&(n.bindTexture(W.type,null),W.type=void 0,W.texture=void 0)}function S(){try{n.compressedTexImage2D(...arguments)}catch{}}function z(){try{n.compressedTexImage3D(...arguments)}catch{}}function Y(){try{n.texSubImage2D(...arguments)}catch{}}function ce(){try{n.texSubImage3D(...arguments)}catch{}}function Q(){try{n.compressedTexSubImage2D(...arguments)}catch{}}function Ae(){try{n.compressedTexSubImage3D(...arguments)}catch{}}function pe(){try{n.texStorage2D(...arguments)}catch{}}function Ce(){try{n.texStorage3D(...arguments)}catch{}}function Pe(){try{n.texImage2D(...arguments)}catch{}}function me(){try{n.texImage3D(...arguments)}catch{}}function we(W){Ze.equals(W)===!1&&(n.scissor(W.x,W.y,W.z,W.w),Ze.copy(W))}function Ne(W){Je.equals(W)===!1&&(n.viewport(W.x,W.y,W.z,W.w),Je.copy(W))}function Le(W,xe){let be=c.get(xe);be===void 0&&(be=new WeakMap,c.set(xe,be));let Ue=be.get(W);Ue===void 0&&(Ue=n.getUniformBlockIndex(xe,W.name),be.set(W,Ue))}function Me(W,xe){const Ue=c.get(xe).get(W);l.get(xe)!==Ue&&(n.uniformBlockBinding(xe,Ue,W.__bindingPointIndex),l.set(xe,Ue))}function je(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),o.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),u={},ue=null,ye={},f={},d=new WeakMap,h=[],g=null,_=!1,m=null,p=null,C=null,b=null,x=null,w=null,L=null,P=new lt(0,0,0),M=0,y=!1,E=null,I=null,V=null,K=null,ee=null,Ze.set(0,0,n.canvas.width,n.canvas.height),Je.set(0,0,n.canvas.width,n.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:G,disable:le,bindFramebuffer:oe,drawBuffers:fe,useProgram:Ve,setBlending:U,setMaterial:F,setFlipSided:H,setCullFace:B,setLineWidth:J,setPolygonOffset:X,setScissorTest:Z,activeTexture:ie,bindTexture:de,unbindTexture:T,compressedTexImage2D:S,compressedTexImage3D:z,texImage2D:Pe,texImage3D:me,updateUBOMapping:Le,uniformBlockBinding:Me,texStorage2D:pe,texStorage3D:Ce,texSubImage2D:Y,texSubImage3D:ce,compressedTexSubImage2D:Q,compressedTexSubImage3D:Ae,scissor:we,viewport:Ne,reset:je}}function wA(n,e,t,i,s,r,o){const a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Se,u=new WeakMap;let f;const d=new WeakMap;let h=!1;try{h=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(T,S){return h?new OffscreenCanvas(T,S):tl("canvas")}function _(T,S,z){let Y=1;const ce=de(T);if((ce.width>z||ce.height>z)&&(Y=z/Math.max(ce.width,ce.height)),Y<1)if(typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&T instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&T instanceof ImageBitmap||typeof VideoFrame<"u"&&T instanceof VideoFrame){const Q=Math.floor(Y*ce.width),Ae=Math.floor(Y*ce.height);f===void 0&&(f=g(Q,Ae));const pe=S?g(Q,Ae):f;return pe.width=Q,pe.height=Ae,pe.getContext("2d").drawImage(T,0,0,Q,Ae),pe}else return"data"in T,T;return T}function m(T){return T.generateMipmaps}function p(T){n.generateMipmap(T)}function C(T){return T.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:T.isWebGL3DRenderTarget?n.TEXTURE_3D:T.isWebGLArrayRenderTarget||T.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function b(T,S,z,Y,ce=!1){if(T!==null&&n[T]!==void 0)return n[T];let Q=S;if(S===n.RED&&(z===n.FLOAT&&(Q=n.R32F),z===n.HALF_FLOAT&&(Q=n.R16F),z===n.UNSIGNED_BYTE&&(Q=n.R8)),S===n.RED_INTEGER&&(z===n.UNSIGNED_BYTE&&(Q=n.R8UI),z===n.UNSIGNED_SHORT&&(Q=n.R16UI),z===n.UNSIGNED_INT&&(Q=n.R32UI),z===n.BYTE&&(Q=n.R8I),z===n.SHORT&&(Q=n.R16I),z===n.INT&&(Q=n.R32I)),S===n.RG&&(z===n.FLOAT&&(Q=n.RG32F),z===n.HALF_FLOAT&&(Q=n.RG16F),z===n.UNSIGNED_BYTE&&(Q=n.RG8)),S===n.RG_INTEGER&&(z===n.UNSIGNED_BYTE&&(Q=n.RG8UI),z===n.UNSIGNED_SHORT&&(Q=n.RG16UI),z===n.UNSIGNED_INT&&(Q=n.RG32UI),z===n.BYTE&&(Q=n.RG8I),z===n.SHORT&&(Q=n.RG16I),z===n.INT&&(Q=n.RG32I)),S===n.RGB_INTEGER&&(z===n.UNSIGNED_BYTE&&(Q=n.RGB8UI),z===n.UNSIGNED_SHORT&&(Q=n.RGB16UI),z===n.UNSIGNED_INT&&(Q=n.RGB32UI),z===n.BYTE&&(Q=n.RGB8I),z===n.SHORT&&(Q=n.RGB16I),z===n.INT&&(Q=n.RGB32I)),S===n.RGBA_INTEGER&&(z===n.UNSIGNED_BYTE&&(Q=n.RGBA8UI),z===n.UNSIGNED_SHORT&&(Q=n.RGBA16UI),z===n.UNSIGNED_INT&&(Q=n.RGBA32UI),z===n.BYTE&&(Q=n.RGBA8I),z===n.SHORT&&(Q=n.RGBA16I),z===n.INT&&(Q=n.RGBA32I)),S===n.RGB&&z===n.UNSIGNED_INT_5_9_9_9_REV&&(Q=n.RGB9_E5),S===n.RGBA){const Ae=ce?Qa:at.getTransfer(Y);z===n.FLOAT&&(Q=n.RGBA32F),z===n.HALF_FLOAT&&(Q=n.RGBA16F),z===n.UNSIGNED_BYTE&&(Q=Ae===mt?n.SRGB8_ALPHA8:n.RGBA8),z===n.UNSIGNED_SHORT_4_4_4_4&&(Q=n.RGBA4),z===n.UNSIGNED_SHORT_5_5_5_1&&(Q=n.RGB5_A1)}return(Q===n.R16F||Q===n.R32F||Q===n.RG16F||Q===n.RG32F||Q===n.RGBA16F||Q===n.RGBA32F)&&e.get("EXT_color_buffer_float"),Q}function x(T,S){let z;return T?S===null||S===Us||S===bo?z=n.DEPTH24_STENCIL8:S===Ai?z=n.DEPTH32F_STENCIL8:S===So&&(z=n.DEPTH24_STENCIL8):S===null||S===Us||S===bo?z=n.DEPTH_COMPONENT24:S===Ai?z=n.DEPTH_COMPONENT32F:S===So&&(z=n.DEPTH_COMPONENT16),z}function w(T,S){return m(T)===!0||T.isFramebufferTexture&&T.minFilter!==qn&&T.minFilter!==oi?Math.log2(Math.max(S.width,S.height))+1:T.mipmaps!==void 0&&T.mipmaps.length>0?T.mipmaps.length:T.isCompressedTexture&&Array.isArray(T.image)?S.mipmaps.length:1}function L(T){const S=T.target;S.removeEventListener("dispose",L),M(S),S.isVideoTexture&&u.delete(S)}function P(T){const S=T.target;S.removeEventListener("dispose",P),E(S)}function M(T){const S=i.get(T);if(S.__webglInit===void 0)return;const z=T.source,Y=d.get(z);if(Y){const ce=Y[S.__cacheKey];ce.usedTimes--,ce.usedTimes===0&&y(T),Object.keys(Y).length===0&&d.delete(z)}i.remove(T)}function y(T){const S=i.get(T);n.deleteTexture(S.__webglTexture);const z=T.source,Y=d.get(z);delete Y[S.__cacheKey],o.memory.textures--}function E(T){const S=i.get(T);if(T.depthTexture&&(T.depthTexture.dispose(),i.remove(T.depthTexture)),T.isWebGLCubeRenderTarget)for(let Y=0;Y<6;Y++){if(Array.isArray(S.__webglFramebuffer[Y]))for(let ce=0;ce<S.__webglFramebuffer[Y].length;ce++)n.deleteFramebuffer(S.__webglFramebuffer[Y][ce]);else n.deleteFramebuffer(S.__webglFramebuffer[Y]);S.__webglDepthbuffer&&n.deleteRenderbuffer(S.__webglDepthbuffer[Y])}else{if(Array.isArray(S.__webglFramebuffer))for(let Y=0;Y<S.__webglFramebuffer.length;Y++)n.deleteFramebuffer(S.__webglFramebuffer[Y]);else n.deleteFramebuffer(S.__webglFramebuffer);if(S.__webglDepthbuffer&&n.deleteRenderbuffer(S.__webglDepthbuffer),S.__webglMultisampledFramebuffer&&n.deleteFramebuffer(S.__webglMultisampledFramebuffer),S.__webglColorRenderbuffer)for(let Y=0;Y<S.__webglColorRenderbuffer.length;Y++)S.__webglColorRenderbuffer[Y]&&n.deleteRenderbuffer(S.__webglColorRenderbuffer[Y]);S.__webglDepthRenderbuffer&&n.deleteRenderbuffer(S.__webglDepthRenderbuffer)}const z=T.textures;for(let Y=0,ce=z.length;Y<ce;Y++){const Q=i.get(z[Y]);Q.__webglTexture&&(n.deleteTexture(Q.__webglTexture),o.memory.textures--),i.remove(z[Y])}i.remove(T)}let I=0;function V(){I=0}function K(){const T=I;return T>=s.maxTextures,I+=1,T}function ee(T){const S=[];return S.push(T.wrapS),S.push(T.wrapT),S.push(T.wrapR||0),S.push(T.magFilter),S.push(T.minFilter),S.push(T.anisotropy),S.push(T.internalFormat),S.push(T.format),S.push(T.type),S.push(T.generateMipmaps),S.push(T.premultiplyAlpha),S.push(T.flipY),S.push(T.unpackAlignment),S.push(T.colorSpace),S.join()}function se(T,S){const z=i.get(T);if(T.isVideoTexture&&Z(T),T.isRenderTargetTexture===!1&&T.isExternalTexture!==!0&&T.version>0&&z.__version!==T.version){const Y=T.image;if(Y!==null){if(Y.complete!==!1){ge(z,T,S);return}}}else T.isExternalTexture&&(z.__webglTexture=T.sourceTexture?T.sourceTexture:null);t.bindTexture(n.TEXTURE_2D,z.__webglTexture,n.TEXTURE0+S)}function O(T,S){const z=i.get(T);if(T.isRenderTargetTexture===!1&&T.version>0&&z.__version!==T.version){ge(z,T,S);return}t.bindTexture(n.TEXTURE_2D_ARRAY,z.__webglTexture,n.TEXTURE0+S)}function k(T,S){const z=i.get(T);if(T.isRenderTargetTexture===!1&&T.version>0&&z.__version!==T.version){ge(z,T,S);return}t.bindTexture(n.TEXTURE_3D,z.__webglTexture,n.TEXTURE0+S)}function N(T,S){const z=i.get(T);if(T.version>0&&z.__version!==T.version){G(z,T,S);return}t.bindTexture(n.TEXTURE_CUBE_MAP,z.__webglTexture,n.TEXTURE0+S)}const ue={[uu]:n.REPEAT,[As]:n.CLAMP_TO_EDGE,[fu]:n.MIRRORED_REPEAT},ye={[qn]:n.NEAREST,[Sb]:n.NEAREST_MIPMAP_NEAREST,[Ko]:n.NEAREST_MIPMAP_LINEAR,[oi]:n.LINEAR,[Yl]:n.LINEAR_MIPMAP_NEAREST,[Rs]:n.LINEAR_MIPMAP_LINEAR},Te={[Tb]:n.NEVER,[Db]:n.ALWAYS,[wb]:n.LESS,[Ig]:n.LEQUAL,[Ab]:n.EQUAL,[Pb]:n.GEQUAL,[Rb]:n.GREATER,[Cb]:n.NOTEQUAL};function Be(T,S){if(S.type===Ai&&e.has("OES_texture_float_linear")===!1&&(S.magFilter===oi||S.magFilter===Yl||S.magFilter===Ko||S.magFilter===Rs||S.minFilter===oi||S.minFilter===Yl||S.minFilter===Ko||S.minFilter),n.texParameteri(T,n.TEXTURE_WRAP_S,ue[S.wrapS]),n.texParameteri(T,n.TEXTURE_WRAP_T,ue[S.wrapT]),(T===n.TEXTURE_3D||T===n.TEXTURE_2D_ARRAY)&&n.texParameteri(T,n.TEXTURE_WRAP_R,ue[S.wrapR]),n.texParameteri(T,n.TEXTURE_MAG_FILTER,ye[S.magFilter]),n.texParameteri(T,n.TEXTURE_MIN_FILTER,ye[S.minFilter]),S.compareFunction&&(n.texParameteri(T,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(T,n.TEXTURE_COMPARE_FUNC,Te[S.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(S.magFilter===qn||S.minFilter!==Ko&&S.minFilter!==Rs||S.type===Ai&&e.has("OES_texture_float_linear")===!1)return;if(S.anisotropy>1||i.get(S).__currentAnisotropy){const z=e.get("EXT_texture_filter_anisotropic");n.texParameterf(T,z.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(S.anisotropy,s.getMaxAnisotropy())),i.get(S).__currentAnisotropy=S.anisotropy}}}function Ze(T,S){let z=!1;T.__webglInit===void 0&&(T.__webglInit=!0,S.addEventListener("dispose",L));const Y=S.source;let ce=d.get(Y);ce===void 0&&(ce={},d.set(Y,ce));const Q=ee(S);if(Q!==T.__cacheKey){ce[Q]===void 0&&(ce[Q]={texture:n.createTexture(),usedTimes:0},o.memory.textures++,z=!0),ce[Q].usedTimes++;const Ae=ce[T.__cacheKey];Ae!==void 0&&(ce[T.__cacheKey].usedTimes--,Ae.usedTimes===0&&y(S)),T.__cacheKey=Q,T.__webglTexture=ce[Q].texture}return z}function Je(T,S,z){return Math.floor(Math.floor(T/z)/S)}function ae(T,S,z,Y){const Q=T.updateRanges;if(Q.length===0)t.texSubImage2D(n.TEXTURE_2D,0,0,0,S.width,S.height,z,Y,S.data);else{Q.sort((me,we)=>me.start-we.start);let Ae=0;for(let me=1;me<Q.length;me++){const we=Q[Ae],Ne=Q[me],Le=we.start+we.count,Me=Je(Ne.start,S.width,4),je=Je(we.start,S.width,4);Ne.start<=Le+1&&Me===je&&Je(Ne.start+Ne.count-1,S.width,4)===Me?we.count=Math.max(we.count,Ne.start+Ne.count-we.start):(++Ae,Q[Ae]=Ne)}Q.length=Ae+1;const pe=n.getParameter(n.UNPACK_ROW_LENGTH),Ce=n.getParameter(n.UNPACK_SKIP_PIXELS),Pe=n.getParameter(n.UNPACK_SKIP_ROWS);n.pixelStorei(n.UNPACK_ROW_LENGTH,S.width);for(let me=0,we=Q.length;me<we;me++){const Ne=Q[me],Le=Math.floor(Ne.start/4),Me=Math.ceil(Ne.count/4),je=Le%S.width,W=Math.floor(Le/S.width),xe=Me,be=1;n.pixelStorei(n.UNPACK_SKIP_PIXELS,je),n.pixelStorei(n.UNPACK_SKIP_ROWS,W),t.texSubImage2D(n.TEXTURE_2D,0,je,W,xe,be,z,Y,S.data)}T.clearUpdateRanges(),n.pixelStorei(n.UNPACK_ROW_LENGTH,pe),n.pixelStorei(n.UNPACK_SKIP_PIXELS,Ce),n.pixelStorei(n.UNPACK_SKIP_ROWS,Pe)}}function ge(T,S,z){let Y=n.TEXTURE_2D;(S.isDataArrayTexture||S.isCompressedArrayTexture)&&(Y=n.TEXTURE_2D_ARRAY),S.isData3DTexture&&(Y=n.TEXTURE_3D);const ce=Ze(T,S),Q=S.source;t.bindTexture(Y,T.__webglTexture,n.TEXTURE0+z);const Ae=i.get(Q);if(Q.version!==Ae.__version||ce===!0){t.activeTexture(n.TEXTURE0+z);const pe=at.getPrimaries(at.workingColorSpace),Ce=S.colorSpace===Yi?null:at.getPrimaries(S.colorSpace),Pe=S.colorSpace===Yi||pe===Ce?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,S.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,S.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Pe);let me=_(S.image,!1,s.maxTextureSize);me=ie(S,me);const we=r.convert(S.format,S.colorSpace),Ne=r.convert(S.type);let Le=b(S.internalFormat,we,Ne,S.colorSpace,S.isVideoTexture);Be(Y,S);let Me;const je=S.mipmaps,W=S.isVideoTexture!==!0,xe=Ae.__version===void 0||ce===!0,be=Q.dataReady,Ue=w(S,me);if(S.isDepthTexture)Le=x(S.format===Eo,S.type),xe&&(W?t.texStorage2D(n.TEXTURE_2D,1,Le,me.width,me.height):t.texImage2D(n.TEXTURE_2D,0,Le,me.width,me.height,0,we,Ne,null));else if(S.isDataTexture)if(je.length>0){W&&xe&&t.texStorage2D(n.TEXTURE_2D,Ue,Le,je[0].width,je[0].height);for(let _e=0,he=je.length;_e<he;_e++)Me=je[_e],W?be&&t.texSubImage2D(n.TEXTURE_2D,_e,0,0,Me.width,Me.height,we,Ne,Me.data):t.texImage2D(n.TEXTURE_2D,_e,Le,Me.width,Me.height,0,we,Ne,Me.data);S.generateMipmaps=!1}else W?(xe&&t.texStorage2D(n.TEXTURE_2D,Ue,Le,me.width,me.height),be&&ae(S,me,we,Ne)):t.texImage2D(n.TEXTURE_2D,0,Le,me.width,me.height,0,we,Ne,me.data);else if(S.isCompressedTexture)if(S.isCompressedArrayTexture){W&&xe&&t.texStorage3D(n.TEXTURE_2D_ARRAY,Ue,Le,je[0].width,je[0].height,me.depth);for(let _e=0,he=je.length;_e<he;_e++)if(Me=je[_e],S.format!==Xn){if(we!==null)if(W){if(be)if(S.layerUpdates.size>0){const ze=Vd(Me.width,Me.height,S.format,S.type);for(const Ke of S.layerUpdates){const yt=Me.data.subarray(Ke*ze/Me.data.BYTES_PER_ELEMENT,(Ke+1)*ze/Me.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,_e,0,0,Ke,Me.width,Me.height,1,we,yt)}S.clearLayerUpdates()}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,_e,0,0,0,Me.width,Me.height,me.depth,we,Me.data)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,_e,Le,Me.width,Me.height,me.depth,0,Me.data,0,0)}else W?be&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,_e,0,0,0,Me.width,Me.height,me.depth,we,Ne,Me.data):t.texImage3D(n.TEXTURE_2D_ARRAY,_e,Le,Me.width,Me.height,me.depth,0,we,Ne,Me.data)}else{W&&xe&&t.texStorage2D(n.TEXTURE_2D,Ue,Le,je[0].width,je[0].height);for(let _e=0,he=je.length;_e<he;_e++)Me=je[_e],S.format!==Xn?we!==null&&(W?be&&t.compressedTexSubImage2D(n.TEXTURE_2D,_e,0,0,Me.width,Me.height,we,Me.data):t.compressedTexImage2D(n.TEXTURE_2D,_e,Le,Me.width,Me.height,0,Me.data)):W?be&&t.texSubImage2D(n.TEXTURE_2D,_e,0,0,Me.width,Me.height,we,Ne,Me.data):t.texImage2D(n.TEXTURE_2D,_e,Le,Me.width,Me.height,0,we,Ne,Me.data)}else if(S.isDataArrayTexture)if(W){if(xe&&t.texStorage3D(n.TEXTURE_2D_ARRAY,Ue,Le,me.width,me.height,me.depth),be)if(S.layerUpdates.size>0){const _e=Vd(me.width,me.height,S.format,S.type);for(const he of S.layerUpdates){const ze=me.data.subarray(he*_e/me.data.BYTES_PER_ELEMENT,(he+1)*_e/me.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,he,me.width,me.height,1,we,Ne,ze)}S.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,me.width,me.height,me.depth,we,Ne,me.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,Le,me.width,me.height,me.depth,0,we,Ne,me.data);else if(S.isData3DTexture)W?(xe&&t.texStorage3D(n.TEXTURE_3D,Ue,Le,me.width,me.height,me.depth),be&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,me.width,me.height,me.depth,we,Ne,me.data)):t.texImage3D(n.TEXTURE_3D,0,Le,me.width,me.height,me.depth,0,we,Ne,me.data);else if(S.isFramebufferTexture){if(xe)if(W)t.texStorage2D(n.TEXTURE_2D,Ue,Le,me.width,me.height);else{let _e=me.width,he=me.height;for(let ze=0;ze<Ue;ze++)t.texImage2D(n.TEXTURE_2D,ze,Le,_e,he,0,we,Ne,null),_e>>=1,he>>=1}}else if(je.length>0){if(W&&xe){const _e=de(je[0]);t.texStorage2D(n.TEXTURE_2D,Ue,Le,_e.width,_e.height)}for(let _e=0,he=je.length;_e<he;_e++)Me=je[_e],W?be&&t.texSubImage2D(n.TEXTURE_2D,_e,0,0,we,Ne,Me):t.texImage2D(n.TEXTURE_2D,_e,Le,we,Ne,Me);S.generateMipmaps=!1}else if(W){if(xe){const _e=de(me);t.texStorage2D(n.TEXTURE_2D,Ue,Le,_e.width,_e.height)}be&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,we,Ne,me)}else t.texImage2D(n.TEXTURE_2D,0,Le,we,Ne,me);m(S)&&p(Y),Ae.__version=Q.version,S.onUpdate&&S.onUpdate(S)}T.__version=S.version}function G(T,S,z){if(S.image.length!==6)return;const Y=Ze(T,S),ce=S.source;t.bindTexture(n.TEXTURE_CUBE_MAP,T.__webglTexture,n.TEXTURE0+z);const Q=i.get(ce);if(ce.version!==Q.__version||Y===!0){t.activeTexture(n.TEXTURE0+z);const Ae=at.getPrimaries(at.workingColorSpace),pe=S.colorSpace===Yi?null:at.getPrimaries(S.colorSpace),Ce=S.colorSpace===Yi||Ae===pe?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,S.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,S.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ce);const Pe=S.isCompressedTexture||S.image[0].isCompressedTexture,me=S.image[0]&&S.image[0].isDataTexture,we=[];for(let he=0;he<6;he++)!Pe&&!me?we[he]=_(S.image[he],!0,s.maxCubemapSize):we[he]=me?S.image[he].image:S.image[he],we[he]=ie(S,we[he]);const Ne=we[0],Le=r.convert(S.format,S.colorSpace),Me=r.convert(S.type),je=b(S.internalFormat,Le,Me,S.colorSpace),W=S.isVideoTexture!==!0,xe=Q.__version===void 0||Y===!0,be=ce.dataReady;let Ue=w(S,Ne);Be(n.TEXTURE_CUBE_MAP,S);let _e;if(Pe){W&&xe&&t.texStorage2D(n.TEXTURE_CUBE_MAP,Ue,je,Ne.width,Ne.height);for(let he=0;he<6;he++){_e=we[he].mipmaps;for(let ze=0;ze<_e.length;ze++){const Ke=_e[ze];S.format!==Xn?Le!==null&&(W?be&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+he,ze,0,0,Ke.width,Ke.height,Le,Ke.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+he,ze,je,Ke.width,Ke.height,0,Ke.data)):W?be&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+he,ze,0,0,Ke.width,Ke.height,Le,Me,Ke.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+he,ze,je,Ke.width,Ke.height,0,Le,Me,Ke.data)}}}else{if(_e=S.mipmaps,W&&xe){_e.length>0&&Ue++;const he=de(we[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,Ue,je,he.width,he.height)}for(let he=0;he<6;he++)if(me){W?be&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+he,0,0,0,we[he].width,we[he].height,Le,Me,we[he].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+he,0,je,we[he].width,we[he].height,0,Le,Me,we[he].data);for(let ze=0;ze<_e.length;ze++){const yt=_e[ze].image[he].image;W?be&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+he,ze+1,0,0,yt.width,yt.height,Le,Me,yt.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+he,ze+1,je,yt.width,yt.height,0,Le,Me,yt.data)}}else{W?be&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+he,0,0,0,Le,Me,we[he]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+he,0,je,Le,Me,we[he]);for(let ze=0;ze<_e.length;ze++){const Ke=_e[ze];W?be&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+he,ze+1,0,0,Le,Me,Ke.image[he]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+he,ze+1,je,Le,Me,Ke.image[he])}}}m(S)&&p(n.TEXTURE_CUBE_MAP),Q.__version=ce.version,S.onUpdate&&S.onUpdate(S)}T.__version=S.version}function le(T,S,z,Y,ce,Q){const Ae=r.convert(z.format,z.colorSpace),pe=r.convert(z.type),Ce=b(z.internalFormat,Ae,pe,z.colorSpace),Pe=i.get(S),me=i.get(z);if(me.__renderTarget=S,!Pe.__hasExternalTextures){const we=Math.max(1,S.width>>Q),Ne=Math.max(1,S.height>>Q);ce===n.TEXTURE_3D||ce===n.TEXTURE_2D_ARRAY?t.texImage3D(ce,Q,Ce,we,Ne,S.depth,0,Ae,pe,null):t.texImage2D(ce,Q,Ce,we,Ne,0,Ae,pe,null)}t.bindFramebuffer(n.FRAMEBUFFER,T),X(S)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,Y,ce,me.__webglTexture,0,J(S)):(ce===n.TEXTURE_2D||ce>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&ce<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,Y,ce,me.__webglTexture,Q),t.bindFramebuffer(n.FRAMEBUFFER,null)}function oe(T,S,z){if(n.bindRenderbuffer(n.RENDERBUFFER,T),S.depthBuffer){const Y=S.depthTexture,ce=Y&&Y.isDepthTexture?Y.type:null,Q=x(S.stencilBuffer,ce),Ae=S.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,pe=J(S);X(S)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,pe,Q,S.width,S.height):z?n.renderbufferStorageMultisample(n.RENDERBUFFER,pe,Q,S.width,S.height):n.renderbufferStorage(n.RENDERBUFFER,Q,S.width,S.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,Ae,n.RENDERBUFFER,T)}else{const Y=S.textures;for(let ce=0;ce<Y.length;ce++){const Q=Y[ce],Ae=r.convert(Q.format,Q.colorSpace),pe=r.convert(Q.type),Ce=b(Q.internalFormat,Ae,pe,Q.colorSpace),Pe=J(S);z&&X(S)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,Pe,Ce,S.width,S.height):X(S)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Pe,Ce,S.width,S.height):n.renderbufferStorage(n.RENDERBUFFER,Ce,S.width,S.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function fe(T,S){if(S&&S.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(n.FRAMEBUFFER,T),!(S.depthTexture&&S.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const Y=i.get(S.depthTexture);Y.__renderTarget=S,(!Y.__webglTexture||S.depthTexture.image.width!==S.width||S.depthTexture.image.height!==S.height)&&(S.depthTexture.image.width=S.width,S.depthTexture.image.height=S.height,S.depthTexture.needsUpdate=!0),se(S.depthTexture,0);const ce=Y.__webglTexture,Q=J(S);if(S.depthTexture.format===Mo)X(S)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,ce,0,Q):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,ce,0);else if(S.depthTexture.format===Eo)X(S)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,ce,0,Q):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,ce,0);else throw new Error("Unknown depthTexture format")}function Ve(T){const S=i.get(T),z=T.isWebGLCubeRenderTarget===!0;if(S.__boundDepthTexture!==T.depthTexture){const Y=T.depthTexture;if(S.__depthDisposeCallback&&S.__depthDisposeCallback(),Y){const ce=()=>{delete S.__boundDepthTexture,delete S.__depthDisposeCallback,Y.removeEventListener("dispose",ce)};Y.addEventListener("dispose",ce),S.__depthDisposeCallback=ce}S.__boundDepthTexture=Y}if(T.depthTexture&&!S.__autoAllocateDepthBuffer){if(z)throw new Error("target.depthTexture not supported in Cube render targets");const Y=T.texture.mipmaps;Y&&Y.length>0?fe(S.__webglFramebuffer[0],T):fe(S.__webglFramebuffer,T)}else if(z){S.__webglDepthbuffer=[];for(let Y=0;Y<6;Y++)if(t.bindFramebuffer(n.FRAMEBUFFER,S.__webglFramebuffer[Y]),S.__webglDepthbuffer[Y]===void 0)S.__webglDepthbuffer[Y]=n.createRenderbuffer(),oe(S.__webglDepthbuffer[Y],T,!1);else{const ce=T.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,Q=S.__webglDepthbuffer[Y];n.bindRenderbuffer(n.RENDERBUFFER,Q),n.framebufferRenderbuffer(n.FRAMEBUFFER,ce,n.RENDERBUFFER,Q)}}else{const Y=T.texture.mipmaps;if(Y&&Y.length>0?t.bindFramebuffer(n.FRAMEBUFFER,S.__webglFramebuffer[0]):t.bindFramebuffer(n.FRAMEBUFFER,S.__webglFramebuffer),S.__webglDepthbuffer===void 0)S.__webglDepthbuffer=n.createRenderbuffer(),oe(S.__webglDepthbuffer,T,!1);else{const ce=T.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,Q=S.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,Q),n.framebufferRenderbuffer(n.FRAMEBUFFER,ce,n.RENDERBUFFER,Q)}}t.bindFramebuffer(n.FRAMEBUFFER,null)}function D(T,S,z){const Y=i.get(T);S!==void 0&&le(Y.__webglFramebuffer,T,T.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),z!==void 0&&Ve(T)}function v(T){const S=T.texture,z=i.get(T),Y=i.get(S);T.addEventListener("dispose",P);const ce=T.textures,Q=T.isWebGLCubeRenderTarget===!0,Ae=ce.length>1;if(Ae||(Y.__webglTexture===void 0&&(Y.__webglTexture=n.createTexture()),Y.__version=S.version,o.memory.textures++),Q){z.__webglFramebuffer=[];for(let pe=0;pe<6;pe++)if(S.mipmaps&&S.mipmaps.length>0){z.__webglFramebuffer[pe]=[];for(let Ce=0;Ce<S.mipmaps.length;Ce++)z.__webglFramebuffer[pe][Ce]=n.createFramebuffer()}else z.__webglFramebuffer[pe]=n.createFramebuffer()}else{if(S.mipmaps&&S.mipmaps.length>0){z.__webglFramebuffer=[];for(let pe=0;pe<S.mipmaps.length;pe++)z.__webglFramebuffer[pe]=n.createFramebuffer()}else z.__webglFramebuffer=n.createFramebuffer();if(Ae)for(let pe=0,Ce=ce.length;pe<Ce;pe++){const Pe=i.get(ce[pe]);Pe.__webglTexture===void 0&&(Pe.__webglTexture=n.createTexture(),o.memory.textures++)}if(T.samples>0&&X(T)===!1){z.__webglMultisampledFramebuffer=n.createFramebuffer(),z.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,z.__webglMultisampledFramebuffer);for(let pe=0;pe<ce.length;pe++){const Ce=ce[pe];z.__webglColorRenderbuffer[pe]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,z.__webglColorRenderbuffer[pe]);const Pe=r.convert(Ce.format,Ce.colorSpace),me=r.convert(Ce.type),we=b(Ce.internalFormat,Pe,me,Ce.colorSpace,T.isXRRenderTarget===!0),Ne=J(T);n.renderbufferStorageMultisample(n.RENDERBUFFER,Ne,we,T.width,T.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+pe,n.RENDERBUFFER,z.__webglColorRenderbuffer[pe])}n.bindRenderbuffer(n.RENDERBUFFER,null),T.depthBuffer&&(z.__webglDepthRenderbuffer=n.createRenderbuffer(),oe(z.__webglDepthRenderbuffer,T,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(Q){t.bindTexture(n.TEXTURE_CUBE_MAP,Y.__webglTexture),Be(n.TEXTURE_CUBE_MAP,S);for(let pe=0;pe<6;pe++)if(S.mipmaps&&S.mipmaps.length>0)for(let Ce=0;Ce<S.mipmaps.length;Ce++)le(z.__webglFramebuffer[pe][Ce],T,S,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+pe,Ce);else le(z.__webglFramebuffer[pe],T,S,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+pe,0);m(S)&&p(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Ae){for(let pe=0,Ce=ce.length;pe<Ce;pe++){const Pe=ce[pe],me=i.get(Pe);let we=n.TEXTURE_2D;(T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(we=T.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(we,me.__webglTexture),Be(we,Pe),le(z.__webglFramebuffer,T,Pe,n.COLOR_ATTACHMENT0+pe,we,0),m(Pe)&&p(we)}t.unbindTexture()}else{let pe=n.TEXTURE_2D;if((T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(pe=T.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(pe,Y.__webglTexture),Be(pe,S),S.mipmaps&&S.mipmaps.length>0)for(let Ce=0;Ce<S.mipmaps.length;Ce++)le(z.__webglFramebuffer[Ce],T,S,n.COLOR_ATTACHMENT0,pe,Ce);else le(z.__webglFramebuffer,T,S,n.COLOR_ATTACHMENT0,pe,0);m(S)&&p(pe),t.unbindTexture()}T.depthBuffer&&Ve(T)}function U(T){const S=T.textures;for(let z=0,Y=S.length;z<Y;z++){const ce=S[z];if(m(ce)){const Q=C(T),Ae=i.get(ce).__webglTexture;t.bindTexture(Q,Ae),p(Q),t.unbindTexture()}}}const F=[],H=[];function B(T){if(T.samples>0){if(X(T)===!1){const S=T.textures,z=T.width,Y=T.height;let ce=n.COLOR_BUFFER_BIT;const Q=T.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,Ae=i.get(T),pe=S.length>1;if(pe)for(let Pe=0;Pe<S.length;Pe++)t.bindFramebuffer(n.FRAMEBUFFER,Ae.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Pe,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,Ae.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Pe,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,Ae.__webglMultisampledFramebuffer);const Ce=T.texture.mipmaps;Ce&&Ce.length>0?t.bindFramebuffer(n.DRAW_FRAMEBUFFER,Ae.__webglFramebuffer[0]):t.bindFramebuffer(n.DRAW_FRAMEBUFFER,Ae.__webglFramebuffer);for(let Pe=0;Pe<S.length;Pe++){if(T.resolveDepthBuffer&&(T.depthBuffer&&(ce|=n.DEPTH_BUFFER_BIT),T.stencilBuffer&&T.resolveStencilBuffer&&(ce|=n.STENCIL_BUFFER_BIT)),pe){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,Ae.__webglColorRenderbuffer[Pe]);const me=i.get(S[Pe]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,me,0)}n.blitFramebuffer(0,0,z,Y,0,0,z,Y,ce,n.NEAREST),l===!0&&(F.length=0,H.length=0,F.push(n.COLOR_ATTACHMENT0+Pe),T.depthBuffer&&T.resolveDepthBuffer===!1&&(F.push(Q),H.push(Q),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,H)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,F))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),pe)for(let Pe=0;Pe<S.length;Pe++){t.bindFramebuffer(n.FRAMEBUFFER,Ae.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Pe,n.RENDERBUFFER,Ae.__webglColorRenderbuffer[Pe]);const me=i.get(S[Pe]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,Ae.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Pe,n.TEXTURE_2D,me,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,Ae.__webglMultisampledFramebuffer)}else if(T.depthBuffer&&T.resolveDepthBuffer===!1&&l){const S=T.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[S])}}}function J(T){return Math.min(s.maxSamples,T.samples)}function X(T){const S=i.get(T);return T.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&S.__useRenderToTexture!==!1}function Z(T){const S=o.render.frame;u.get(T)!==S&&(u.set(T,S),T.update())}function ie(T,S){const z=T.colorSpace,Y=T.format,ce=T.type;return T.isCompressedTexture===!0||T.isVideoTexture===!0||z!==Er&&z!==Yi&&at.getTransfer(z),S}function de(T){return typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement?(c.width=T.naturalWidth||T.width,c.height=T.naturalHeight||T.height):typeof VideoFrame<"u"&&T instanceof VideoFrame?(c.width=T.displayWidth,c.height=T.displayHeight):(c.width=T.width,c.height=T.height),c}this.allocateTextureUnit=K,this.resetTextureUnits=V,this.setTexture2D=se,this.setTexture2DArray=O,this.setTexture3D=k,this.setTextureCube=N,this.rebindTextures=D,this.setupRenderTarget=v,this.updateRenderTargetMipmap=U,this.updateMultisampleRenderTarget=B,this.setupDepthRenderbuffer=Ve,this.setupFrameBufferTexture=le,this.useMultisampledRTT=X}function AA(n,e){function t(i,s=Yi){let r;const o=at.getTransfer(s);if(i===Di)return n.UNSIGNED_BYTE;if(i===Ef)return n.UNSIGNED_SHORT_4_4_4_4;if(i===Tf)return n.UNSIGNED_SHORT_5_5_5_1;if(i===wg)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===Eg)return n.BYTE;if(i===Tg)return n.SHORT;if(i===So)return n.UNSIGNED_SHORT;if(i===Mf)return n.INT;if(i===Us)return n.UNSIGNED_INT;if(i===Ai)return n.FLOAT;if(i===Fo)return n.HALF_FLOAT;if(i===Ag)return n.ALPHA;if(i===Rg)return n.RGB;if(i===Xn)return n.RGBA;if(i===Mo)return n.DEPTH_COMPONENT;if(i===Eo)return n.DEPTH_STENCIL;if(i===Cg)return n.RED;if(i===wf)return n.RED_INTEGER;if(i===Pg)return n.RG;if(i===Af)return n.RG_INTEGER;if(i===Rf)return n.RGBA_INTEGER;if(i===Da||i===La||i===Ia||i===Ua)if(o===mt)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===Da)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===La)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Ia)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Ua)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===Da)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===La)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Ia)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Ua)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===hu||i===du||i===pu||i===mu)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===hu)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===du)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===pu)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===mu)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===gu||i===_u||i===vu)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(i===gu||i===_u)return o===mt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===vu)return o===mt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===xu||i===yu||i===Su||i===bu||i===Mu||i===Eu||i===Tu||i===wu||i===Au||i===Ru||i===Cu||i===Pu||i===Du||i===Lu)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(i===xu)return o===mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===yu)return o===mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Su)return o===mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===bu)return o===mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Mu)return o===mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Eu)return o===mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Tu)return o===mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===wu)return o===mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Au)return o===mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Ru)return o===mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Cu)return o===mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Pu)return o===mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Du)return o===mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Lu)return o===mt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Na||i===Iu||i===Uu)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(i===Na)return o===mt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Iu)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Uu)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Dg||i===Nu||i===Ou||i===Fu)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(i===Na)return r.COMPRESSED_RED_RGTC1_EXT;if(i===Nu)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Ou)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Fu)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===bo?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}class i_ extends sn{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}}const RA=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,CA=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class PA{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const i=new i_(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,i=new os({vertexShader:RA,fragmentShader:CA,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new bn(new Vo(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class DA extends ks{constructor(e,t){super();const i=this;let s=null,r=1,o=null,a="local-floor",l=1,c=null,u=null,f=null,d=null,h=null,g=null;const _=new PA,m={},p=t.getContextAttributes();let C=null,b=null;const x=[],w=[],L=new Se;let P=null;const M=new Pn;M.viewport=new Lt;const y=new Pn;y.viewport=new Lt;const E=[M,y],I=new KM;let V=null,K=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(ae){let ge=x[ae];return ge===void 0&&(ge=new _c,x[ae]=ge),ge.getTargetRaySpace()},this.getControllerGrip=function(ae){let ge=x[ae];return ge===void 0&&(ge=new _c,x[ae]=ge),ge.getGripSpace()},this.getHand=function(ae){let ge=x[ae];return ge===void 0&&(ge=new _c,x[ae]=ge),ge.getHandSpace()};function ee(ae){const ge=w.indexOf(ae.inputSource);if(ge===-1)return;const G=x[ge];G!==void 0&&(G.update(ae.inputSource,ae.frame,c||o),G.dispatchEvent({type:ae.type,data:ae.inputSource}))}function se(){s.removeEventListener("select",ee),s.removeEventListener("selectstart",ee),s.removeEventListener("selectend",ee),s.removeEventListener("squeeze",ee),s.removeEventListener("squeezestart",ee),s.removeEventListener("squeezeend",ee),s.removeEventListener("end",se),s.removeEventListener("inputsourceschange",O);for(let ae=0;ae<x.length;ae++){const ge=w[ae];ge!==null&&(w[ae]=null,x[ae].disconnect(ge))}V=null,K=null,_.reset();for(const ae in m)delete m[ae];e.setRenderTarget(C),h=null,d=null,f=null,s=null,b=null,Je.stop(),i.isPresenting=!1,e.setPixelRatio(P),e.setSize(L.width,L.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(ae){r=ae,i.isPresenting},this.setReferenceSpaceType=function(ae){a=ae,i.isPresenting},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(ae){c=ae},this.getBaseLayer=function(){return d!==null?d:h},this.getBinding=function(){return f},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(ae){if(s=ae,s!==null){if(C=e.getRenderTarget(),s.addEventListener("select",ee),s.addEventListener("selectstart",ee),s.addEventListener("selectend",ee),s.addEventListener("squeeze",ee),s.addEventListener("squeezestart",ee),s.addEventListener("squeezeend",ee),s.addEventListener("end",se),s.addEventListener("inputsourceschange",O),p.xrCompatible!==!0&&await t.makeXRCompatible(),P=e.getPixelRatio(),e.getSize(L),typeof XRWebGLBinding<"u"&&(f=new XRWebGLBinding(s,t)),f!==null&&"createProjectionLayer"in XRWebGLBinding.prototype){let G=null,le=null,oe=null;p.depth&&(oe=p.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,G=p.stencil?Eo:Mo,le=p.stencil?bo:Us);const fe={colorFormat:t.RGBA8,depthFormat:oe,scaleFactor:r};d=f.createProjectionLayer(fe),s.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),b=new Os(d.textureWidth,d.textureHeight,{format:Xn,type:Di,depthTexture:new Gg(d.textureWidth,d.textureHeight,le,void 0,void 0,void 0,void 0,void 0,void 0,G),stencilBuffer:p.stencil,colorSpace:e.outputColorSpace,samples:p.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}else{const G={antialias:p.antialias,alpha:!0,depth:p.depth,stencil:p.stencil,framebufferScaleFactor:r};h=new XRWebGLLayer(s,t,G),s.updateRenderState({baseLayer:h}),e.setPixelRatio(1),e.setSize(h.framebufferWidth,h.framebufferHeight,!1),b=new Os(h.framebufferWidth,h.framebufferHeight,{format:Xn,type:Di,colorSpace:e.outputColorSpace,stencilBuffer:p.stencil,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1})}b.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await s.requestReferenceSpace(a),Je.setContext(s),Je.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function O(ae){for(let ge=0;ge<ae.removed.length;ge++){const G=ae.removed[ge],le=w.indexOf(G);le>=0&&(w[le]=null,x[le].disconnect(G))}for(let ge=0;ge<ae.added.length;ge++){const G=ae.added[ge];let le=w.indexOf(G);if(le===-1){for(let fe=0;fe<x.length;fe++)if(fe>=w.length){w.push(G),le=fe;break}else if(w[fe]===null){w[fe]=G,le=fe;break}if(le===-1)break}const oe=x[le];oe&&oe.connect(G)}}const k=new $,N=new $;function ue(ae,ge,G){k.setFromMatrixPosition(ge.matrixWorld),N.setFromMatrixPosition(G.matrixWorld);const le=k.distanceTo(N),oe=ge.projectionMatrix.elements,fe=G.projectionMatrix.elements,Ve=oe[14]/(oe[10]-1),D=oe[14]/(oe[10]+1),v=(oe[9]+1)/oe[5],U=(oe[9]-1)/oe[5],F=(oe[8]-1)/oe[0],H=(fe[8]+1)/fe[0],B=Ve*F,J=Ve*H,X=le/(-F+H),Z=X*-F;if(ge.matrixWorld.decompose(ae.position,ae.quaternion,ae.scale),ae.translateX(Z),ae.translateZ(X),ae.matrixWorld.compose(ae.position,ae.quaternion,ae.scale),ae.matrixWorldInverse.copy(ae.matrixWorld).invert(),oe[10]===-1)ae.projectionMatrix.copy(ge.projectionMatrix),ae.projectionMatrixInverse.copy(ge.projectionMatrixInverse);else{const ie=Ve+X,de=D+X,T=B-Z,S=J+(le-Z),z=v*D/de*ie,Y=U*D/de*ie;ae.projectionMatrix.makePerspective(T,S,z,Y,ie,de),ae.projectionMatrixInverse.copy(ae.projectionMatrix).invert()}}function ye(ae,ge){ge===null?ae.matrixWorld.copy(ae.matrix):ae.matrixWorld.multiplyMatrices(ge.matrixWorld,ae.matrix),ae.matrixWorldInverse.copy(ae.matrixWorld).invert()}this.updateCamera=function(ae){if(s===null)return;let ge=ae.near,G=ae.far;_.texture!==null&&(_.depthNear>0&&(ge=_.depthNear),_.depthFar>0&&(G=_.depthFar)),I.near=y.near=M.near=ge,I.far=y.far=M.far=G,(V!==I.near||K!==I.far)&&(s.updateRenderState({depthNear:I.near,depthFar:I.far}),V=I.near,K=I.far),I.layers.mask=ae.layers.mask|6,M.layers.mask=I.layers.mask&3,y.layers.mask=I.layers.mask&5;const le=ae.parent,oe=I.cameras;ye(I,le);for(let fe=0;fe<oe.length;fe++)ye(oe[fe],le);oe.length===2?ue(I,M,y):I.projectionMatrix.copy(M.projectionMatrix),Te(ae,I,le)};function Te(ae,ge,G){G===null?ae.matrix.copy(ge.matrixWorld):(ae.matrix.copy(G.matrixWorld),ae.matrix.invert(),ae.matrix.multiply(ge.matrixWorld)),ae.matrix.decompose(ae.position,ae.quaternion,ae.scale),ae.updateMatrixWorld(!0),ae.projectionMatrix.copy(ge.projectionMatrix),ae.projectionMatrixInverse.copy(ge.projectionMatrixInverse),ae.isPerspectiveCamera&&(ae.fov=Bu*2*Math.atan(1/ae.projectionMatrix.elements[5]),ae.zoom=1)}this.getCamera=function(){return I},this.getFoveation=function(){if(!(d===null&&h===null))return l},this.setFoveation=function(ae){l=ae,d!==null&&(d.fixedFoveation=ae),h!==null&&h.fixedFoveation!==void 0&&(h.fixedFoveation=ae)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(I)},this.getCameraTexture=function(ae){return m[ae]};let Be=null;function Ze(ae,ge){if(u=ge.getViewerPose(c||o),g=ge,u!==null){const G=u.views;h!==null&&(e.setRenderTargetFramebuffer(b,h.framebuffer),e.setRenderTarget(b));let le=!1;G.length!==I.cameras.length&&(I.cameras.length=0,le=!0);for(let D=0;D<G.length;D++){const v=G[D];let U=null;if(h!==null)U=h.getViewport(v);else{const H=f.getViewSubImage(d,v);U=H.viewport,D===0&&(e.setRenderTargetTextures(b,H.colorTexture,H.depthStencilTexture),e.setRenderTarget(b))}let F=E[D];F===void 0&&(F=new Pn,F.layers.enable(D),F.viewport=new Lt,E[D]=F),F.matrix.fromArray(v.transform.matrix),F.matrix.decompose(F.position,F.quaternion,F.scale),F.projectionMatrix.fromArray(v.projectionMatrix),F.projectionMatrixInverse.copy(F.projectionMatrix).invert(),F.viewport.set(U.x,U.y,U.width,U.height),D===0&&(I.matrix.copy(F.matrix),I.matrix.decompose(I.position,I.quaternion,I.scale)),le===!0&&I.cameras.push(F)}const oe=s.enabledFeatures;if(oe&&oe.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&f){const D=f.getDepthInformation(G[0]);D&&D.isValid&&D.texture&&_.init(D,s.renderState)}if(oe&&oe.includes("camera-access")&&(e.state.unbindTexture(),f))for(let D=0;D<G.length;D++){const v=G[D].camera;if(v){let U=m[v];U||(U=new i_,m[v]=U);const F=f.getCameraImage(v);U.sourceTexture=F}}}for(let G=0;G<x.length;G++){const le=w[G],oe=x[G];le!==null&&oe!==void 0&&oe.update(le,ge,c||o)}Be&&Be(ae,ge),ge.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:ge}),g=null}const Je=new Jg;Je.setAnimationLoop(Ze),this.setAnimationLoop=function(ae){Be=ae},this.dispose=function(){}}}const ys=new fi,LA=new It;function IA(n,e){function t(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function i(m,p){p.color.getRGB(m.fogColor.value,kg(n)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function s(m,p,C,b,x){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(m,p):p.isMeshToonMaterial?(r(m,p),f(m,p)):p.isMeshPhongMaterial?(r(m,p),u(m,p)):p.isMeshStandardMaterial?(r(m,p),d(m,p),p.isMeshPhysicalMaterial&&h(m,p,x)):p.isMeshMatcapMaterial?(r(m,p),g(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),_(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(o(m,p),p.isLineDashedMaterial&&a(m,p)):p.isPointsMaterial?l(m,p,C,b):p.isSpriteMaterial?c(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,t(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===hn&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,t(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===hn&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,t(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,t(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const C=e.get(p),b=C.envMap,x=C.envMapRotation;b&&(m.envMap.value=b,ys.copy(x),ys.x*=-1,ys.y*=-1,ys.z*=-1,b.isCubeTexture&&b.isRenderTargetTexture===!1&&(ys.y*=-1,ys.z*=-1),m.envMapRotation.value.setFromMatrix4(LA.makeRotationFromEuler(ys)),m.flipEnvMap.value=b.isCubeTexture&&b.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,m.aoMapTransform))}function o(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform))}function a(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function l(m,p,C,b){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*C,m.scale.value=b*.5,p.map&&(m.map.value=p.map,t(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function u(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function f(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function d(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function h(m,p,C){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===hn&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=C.texture,m.transmissionSamplerSize.value.set(C.width,C.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function _(m,p){const C=e.get(p).light;m.referencePosition.value.setFromMatrixPosition(C.matrixWorld),m.nearDistance.value=C.shadow.camera.near,m.farDistance.value=C.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function UA(n,e,t,i){let s={},r={},o=[];const a=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function l(C,b){const x=b.program;i.uniformBlockBinding(C,x)}function c(C,b){let x=s[C.id];x===void 0&&(g(C),x=u(C),s[C.id]=x,C.addEventListener("dispose",m));const w=b.program;i.updateUBOMapping(C,w);const L=e.render.frame;r[C.id]!==L&&(d(C),r[C.id]=L)}function u(C){const b=f();C.__bindingPointIndex=b;const x=n.createBuffer(),w=C.__size,L=C.usage;return n.bindBuffer(n.UNIFORM_BUFFER,x),n.bufferData(n.UNIFORM_BUFFER,w,L),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,b,x),x}function f(){for(let C=0;C<a;C++)if(o.indexOf(C)===-1)return o.push(C),C;return 0}function d(C){const b=s[C.id],x=C.uniforms,w=C.__cache;n.bindBuffer(n.UNIFORM_BUFFER,b);for(let L=0,P=x.length;L<P;L++){const M=Array.isArray(x[L])?x[L]:[x[L]];for(let y=0,E=M.length;y<E;y++){const I=M[y];if(h(I,L,y,w)===!0){const V=I.__offset,K=Array.isArray(I.value)?I.value:[I.value];let ee=0;for(let se=0;se<K.length;se++){const O=K[se],k=_(O);typeof O=="number"||typeof O=="boolean"?(I.__data[0]=O,n.bufferSubData(n.UNIFORM_BUFFER,V+ee,I.__data)):O.isMatrix3?(I.__data[0]=O.elements[0],I.__data[1]=O.elements[1],I.__data[2]=O.elements[2],I.__data[3]=0,I.__data[4]=O.elements[3],I.__data[5]=O.elements[4],I.__data[6]=O.elements[5],I.__data[7]=0,I.__data[8]=O.elements[6],I.__data[9]=O.elements[7],I.__data[10]=O.elements[8],I.__data[11]=0):(O.toArray(I.__data,ee),ee+=k.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,V,I.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function h(C,b,x,w){const L=C.value,P=b+"_"+x;if(w[P]===void 0)return typeof L=="number"||typeof L=="boolean"?w[P]=L:w[P]=L.clone(),!0;{const M=w[P];if(typeof L=="number"||typeof L=="boolean"){if(M!==L)return w[P]=L,!0}else if(M.equals(L)===!1)return M.copy(L),!0}return!1}function g(C){const b=C.uniforms;let x=0;const w=16;for(let P=0,M=b.length;P<M;P++){const y=Array.isArray(b[P])?b[P]:[b[P]];for(let E=0,I=y.length;E<I;E++){const V=y[E],K=Array.isArray(V.value)?V.value:[V.value];for(let ee=0,se=K.length;ee<se;ee++){const O=K[ee],k=_(O),N=x%w,ue=N%k.boundary,ye=N+ue;x+=ue,ye!==0&&w-ye<k.storage&&(x+=w-ye),V.__data=new Float32Array(k.storage/Float32Array.BYTES_PER_ELEMENT),V.__offset=x,x+=k.storage}}}const L=x%w;return L>0&&(x+=w-L),C.__size=x,C.__cache={},this}function _(C){const b={boundary:0,storage:0};return typeof C=="number"||typeof C=="boolean"?(b.boundary=4,b.storage=4):C.isVector2?(b.boundary=8,b.storage=8):C.isVector3||C.isColor?(b.boundary=16,b.storage=12):C.isVector4?(b.boundary=16,b.storage=16):C.isMatrix3?(b.boundary=48,b.storage=48):C.isMatrix4?(b.boundary=64,b.storage=64):C.isTexture,b}function m(C){const b=C.target;b.removeEventListener("dispose",m);const x=o.indexOf(b.__bindingPointIndex);o.splice(x,1),n.deleteBuffer(s[b.id]),delete s[b.id],delete r[b.id]}function p(){for(const C in s)n.deleteBuffer(s[C]);o=[],s={},r={}}return{bind:l,update:c,dispose:p}}class NA{constructor(e={}){const{canvas:t=Ub(),context:i=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:f=!1,reversedDepthBuffer:d=!1}=e;this.isWebGLRenderer=!0;let h;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");h=i.getContextAttributes().alpha}else h=o;const g=new Uint32Array(4),_=new Int32Array(4);let m=null,p=null;const C=[],b=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=ns,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const x=this;let w=!1;this._outputColorSpace=Cn;let L=0,P=0,M=null,y=-1,E=null;const I=new Lt,V=new Lt;let K=null;const ee=new lt(0);let se=0,O=t.width,k=t.height,N=1,ue=null,ye=null;const Te=new Lt(0,0,O,k),Be=new Lt(0,0,O,k);let Ze=!1;const Je=new Vg;let ae=!1,ge=!1;const G=new It,le=new $,oe=new Lt,fe={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Ve=!1;function D(){return M===null?N:1}let v=i;function U(R,q){return t.getContext(R,q)}try{const R={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:f};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${bf}`),t.addEventListener("webglcontextlost",be,!1),t.addEventListener("webglcontextrestored",Ue,!1),t.addEventListener("webglcontextcreationerror",_e,!1),v===null){const q="webgl2";if(v=U(q,R),v===null)throw U(q)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(R){throw R}let F,H,B,J,X,Z,ie,de,T,S,z,Y,ce,Q,Ae,pe,Ce,Pe,me,we,Ne,Le,Me,je;function W(){F=new XT(v),F.init(),Le=new AA(v,F),H=new BT(v,F,e,Le),B=new TA(v,F),H.reversedDepthBuffer&&d&&B.buffers.depth.setReversed(!0),J=new jT(v),X=new hA,Z=new wA(v,F,B,X,H,Le,J),ie=new zT(x),de=new WT(x),T=new eE(v),Me=new OT(v,T),S=new $T(v,T,J,Me),z=new KT(v,S,T,J),me=new YT(v,H,Z),pe=new kT(X),Y=new fA(x,ie,de,F,H,Me,pe),ce=new IA(x,X),Q=new pA,Ae=new yA(F),Pe=new NT(x,ie,de,B,z,h,l),Ce=new MA(x,z,H),je=new UA(v,J,H,B),we=new FT(v,F,J),Ne=new qT(v,F,J),J.programs=Y.programs,x.capabilities=H,x.extensions=F,x.properties=X,x.renderLists=Q,x.shadowMap=Ce,x.state=B,x.info=J}W();const xe=new DA(x,v);this.xr=xe,this.getContext=function(){return v},this.getContextAttributes=function(){return v.getContextAttributes()},this.forceContextLoss=function(){const R=F.get("WEBGL_lose_context");R&&R.loseContext()},this.forceContextRestore=function(){const R=F.get("WEBGL_lose_context");R&&R.restoreContext()},this.getPixelRatio=function(){return N},this.setPixelRatio=function(R){R!==void 0&&(N=R,this.setSize(O,k,!1))},this.getSize=function(R){return R.set(O,k)},this.setSize=function(R,q,te=!0){xe.isPresenting||(O=R,k=q,t.width=Math.floor(R*N),t.height=Math.floor(q*N),te===!0&&(t.style.width=R+"px",t.style.height=q+"px"),this.setViewport(0,0,R,q))},this.getDrawingBufferSize=function(R){return R.set(O*N,k*N).floor()},this.setDrawingBufferSize=function(R,q,te){O=R,k=q,N=te,t.width=Math.floor(R*te),t.height=Math.floor(q*te),this.setViewport(0,0,R,q)},this.getCurrentViewport=function(R){return R.copy(I)},this.getViewport=function(R){return R.copy(Te)},this.setViewport=function(R,q,te,ne){R.isVector4?Te.set(R.x,R.y,R.z,R.w):Te.set(R,q,te,ne),B.viewport(I.copy(Te).multiplyScalar(N).round())},this.getScissor=function(R){return R.copy(Be)},this.setScissor=function(R,q,te,ne){R.isVector4?Be.set(R.x,R.y,R.z,R.w):Be.set(R,q,te,ne),B.scissor(V.copy(Be).multiplyScalar(N).round())},this.getScissorTest=function(){return Ze},this.setScissorTest=function(R){B.setScissorTest(Ze=R)},this.setOpaqueSort=function(R){ue=R},this.setTransparentSort=function(R){ye=R},this.getClearColor=function(R){return R.copy(Pe.getClearColor())},this.setClearColor=function(){Pe.setClearColor(...arguments)},this.getClearAlpha=function(){return Pe.getClearAlpha()},this.setClearAlpha=function(){Pe.setClearAlpha(...arguments)},this.clear=function(R=!0,q=!0,te=!0){let ne=0;if(R){let j=!1;if(M!==null){const ve=M.texture.format;j=ve===Rf||ve===Af||ve===wf}if(j){const ve=M.texture.type,Re=ve===Di||ve===Us||ve===So||ve===bo||ve===Ef||ve===Tf,ke=Pe.getClearColor(),Ie=Pe.getClearAlpha(),$e=ke.r,qe=ke.g,Ge=ke.b;Re?(g[0]=$e,g[1]=qe,g[2]=Ge,g[3]=Ie,v.clearBufferuiv(v.COLOR,0,g)):(_[0]=$e,_[1]=qe,_[2]=Ge,_[3]=Ie,v.clearBufferiv(v.COLOR,0,_))}else ne|=v.COLOR_BUFFER_BIT}q&&(ne|=v.DEPTH_BUFFER_BIT),te&&(ne|=v.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),v.clear(ne)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",be,!1),t.removeEventListener("webglcontextrestored",Ue,!1),t.removeEventListener("webglcontextcreationerror",_e,!1),Pe.dispose(),Q.dispose(),Ae.dispose(),X.dispose(),ie.dispose(),de.dispose(),z.dispose(),Me.dispose(),je.dispose(),Y.dispose(),xe.dispose(),xe.removeEventListener("sessionstart",Qn),xe.removeEventListener("sessionend",Hf),cs.stop()};function be(R){R.preventDefault(),w=!0}function Ue(){w=!1;const R=J.autoReset,q=Ce.enabled,te=Ce.autoUpdate,ne=Ce.needsUpdate,j=Ce.type;W(),J.autoReset=R,Ce.enabled=q,Ce.autoUpdate=te,Ce.needsUpdate=ne,Ce.type=j}function _e(R){}function he(R){const q=R.target;q.removeEventListener("dispose",he),ze(q)}function ze(R){Ke(R),X.remove(R)}function Ke(R){const q=X.get(R).programs;q!==void 0&&(q.forEach(function(te){Y.releaseProgram(te)}),R.isShaderMaterial&&Y.releaseShaderCache(R))}this.renderBufferDirect=function(R,q,te,ne,j,ve){q===null&&(q=fe);const Re=j.isMesh&&j.matrixWorld.determinant()<0,ke=u_(R,q,te,ne,j);B.setMaterial(ne,Re);let Ie=te.index,$e=1;if(ne.wireframe===!0){if(Ie=S.getWireframeAttribute(te),Ie===void 0)return;$e=2}const qe=te.drawRange,Ge=te.attributes.position;let it=qe.start*$e,pt=(qe.start+qe.count)*$e;ve!==null&&(it=Math.max(it,ve.start*$e),pt=Math.min(pt,(ve.start+ve.count)*$e)),Ie!==null?(it=Math.max(it,0),pt=Math.min(pt,Ie.count)):Ge!=null&&(it=Math.max(it,0),pt=Math.min(pt,Ge.count));const Rt=pt-it;if(Rt<0||Rt===1/0)return;Me.setup(j,ne,ke,te,Ie);let Mt,_t=we;if(Ie!==null&&(Mt=T.get(Ie),_t=Ne,_t.setIndex(Mt)),j.isMesh)ne.wireframe===!0?(B.setLineWidth(ne.wireframeLinewidth*D()),_t.setMode(v.LINES)):_t.setMode(v.TRIANGLES);else if(j.isLine){let Xe=ne.linewidth;Xe===void 0&&(Xe=1),B.setLineWidth(Xe*D()),j.isLineSegments?_t.setMode(v.LINES):j.isLineLoop?_t.setMode(v.LINE_LOOP):_t.setMode(v.LINE_STRIP)}else j.isPoints?_t.setMode(v.POINTS):j.isSprite&&_t.setMode(v.TRIANGLES);if(j.isBatchedMesh)if(j._multiDrawInstances!==null)_r("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),_t.renderMultiDrawInstances(j._multiDrawStarts,j._multiDrawCounts,j._multiDrawCount,j._multiDrawInstances);else if(F.get("WEBGL_multi_draw"))_t.renderMultiDraw(j._multiDrawStarts,j._multiDrawCounts,j._multiDrawCount);else{const Xe=j._multiDrawStarts,Tt=j._multiDrawCounts,ot=j._multiDrawCount,pn=Ie?T.get(Ie).bytesPerElement:1,zs=X.get(ne).currentProgram.getUniforms();for(let mn=0;mn<ot;mn++)zs.setValue(v,"_gl_DrawID",mn),_t.render(Xe[mn]/pn,Tt[mn])}else if(j.isInstancedMesh)_t.renderInstances(it,Rt,j.count);else if(te.isInstancedBufferGeometry){const Xe=te._maxInstanceCount!==void 0?te._maxInstanceCount:1/0,Tt=Math.min(te.instanceCount,Xe);_t.renderInstances(it,Rt,Tt)}else _t.render(it,Rt)};function yt(R,q,te){R.transparent===!0&&R.side===Gn&&R.forceSinglePass===!1?(R.side=hn,R.needsUpdate=!0,Wo(R,q,te),R.side=rs,R.needsUpdate=!0,Wo(R,q,te),R.side=Gn):Wo(R,q,te)}this.compile=function(R,q,te=null){te===null&&(te=R),p=Ae.get(te),p.init(q),b.push(p),te.traverseVisible(function(j){j.isLight&&j.layers.test(q.layers)&&(p.pushLight(j),j.castShadow&&p.pushShadow(j))}),R!==te&&R.traverseVisible(function(j){j.isLight&&j.layers.test(q.layers)&&(p.pushLight(j),j.castShadow&&p.pushShadow(j))}),p.setupLights();const ne=new Set;return R.traverse(function(j){if(!(j.isMesh||j.isPoints||j.isLine||j.isSprite))return;const ve=j.material;if(ve)if(Array.isArray(ve))for(let Re=0;Re<ve.length;Re++){const ke=ve[Re];yt(ke,te,j),ne.add(ke)}else yt(ve,te,j),ne.add(ve)}),p=b.pop(),ne},this.compileAsync=function(R,q,te=null){const ne=this.compile(R,q,te);return new Promise(j=>{function ve(){if(ne.forEach(function(Re){X.get(Re).currentProgram.isReady()&&ne.delete(Re)}),ne.size===0){j(R);return}setTimeout(ve,10)}F.get("KHR_parallel_shader_compile")!==null?ve():setTimeout(ve,10)})};let ct=null;function pi(R){ct&&ct(R)}function Qn(){cs.stop()}function Hf(){cs.start()}const cs=new Jg;cs.setAnimationLoop(pi),typeof self<"u"&&cs.setContext(self),this.setAnimationLoop=function(R){ct=R,xe.setAnimationLoop(R),R===null?cs.stop():cs.start()},xe.addEventListener("sessionstart",Qn),xe.addEventListener("sessionend",Hf),this.render=function(R,q){if(q!==void 0&&q.isCamera!==!0||w===!0)return;if(R.matrixWorldAutoUpdate===!0&&R.updateMatrixWorld(),q.parent===null&&q.matrixWorldAutoUpdate===!0&&q.updateMatrixWorld(),xe.enabled===!0&&xe.isPresenting===!0&&(xe.cameraAutoUpdate===!0&&xe.updateCamera(q),q=xe.getCamera()),R.isScene===!0&&R.onBeforeRender(x,R,q,M),p=Ae.get(R,b.length),p.init(q),b.push(p),G.multiplyMatrices(q.projectionMatrix,q.matrixWorldInverse),Je.setFromProjectionMatrix(G,ai,q.reversedDepth),ge=this.localClippingEnabled,ae=pe.init(this.clippingPlanes,ge),m=Q.get(R,C.length),m.init(),C.push(m),xe.enabled===!0&&xe.isPresenting===!0){const ve=x.xr.getDepthSensingMesh();ve!==null&&Cl(ve,q,-1/0,x.sortObjects)}Cl(R,q,0,x.sortObjects),m.finish(),x.sortObjects===!0&&m.sort(ue,ye),Ve=xe.enabled===!1||xe.isPresenting===!1||xe.hasDepthSensing()===!1,Ve&&Pe.addToRenderList(m,R),this.info.render.frame++,ae===!0&&pe.beginShadows();const te=p.state.shadowsArray;Ce.render(te,R,q),ae===!0&&pe.endShadows(),this.info.autoReset===!0&&this.info.reset();const ne=m.opaque,j=m.transmissive;if(p.setupLights(),q.isArrayCamera){const ve=q.cameras;if(j.length>0)for(let Re=0,ke=ve.length;Re<ke;Re++){const Ie=ve[Re];Gf(ne,j,R,Ie)}Ve&&Pe.render(R);for(let Re=0,ke=ve.length;Re<ke;Re++){const Ie=ve[Re];Vf(m,R,Ie,Ie.viewport)}}else j.length>0&&Gf(ne,j,R,q),Ve&&Pe.render(R),Vf(m,R,q);M!==null&&P===0&&(Z.updateMultisampleRenderTarget(M),Z.updateRenderTargetMipmap(M)),R.isScene===!0&&R.onAfterRender(x,R,q),Me.resetDefaultState(),y=-1,E=null,b.pop(),b.length>0?(p=b[b.length-1],ae===!0&&pe.setGlobalState(x.clippingPlanes,p.state.camera)):p=null,C.pop(),C.length>0?m=C[C.length-1]:m=null};function Cl(R,q,te,ne){if(R.visible===!1)return;if(R.layers.test(q.layers)){if(R.isGroup)te=R.renderOrder;else if(R.isLOD)R.autoUpdate===!0&&R.update(q);else if(R.isLight)p.pushLight(R),R.castShadow&&p.pushShadow(R);else if(R.isSprite){if(!R.frustumCulled||Je.intersectsSprite(R)){ne&&oe.setFromMatrixPosition(R.matrixWorld).applyMatrix4(G);const Re=z.update(R),ke=R.material;ke.visible&&m.push(R,Re,ke,te,oe.z,null)}}else if((R.isMesh||R.isLine||R.isPoints)&&(!R.frustumCulled||Je.intersectsObject(R))){const Re=z.update(R),ke=R.material;if(ne&&(R.boundingSphere!==void 0?(R.boundingSphere===null&&R.computeBoundingSphere(),oe.copy(R.boundingSphere.center)):(Re.boundingSphere===null&&Re.computeBoundingSphere(),oe.copy(Re.boundingSphere.center)),oe.applyMatrix4(R.matrixWorld).applyMatrix4(G)),Array.isArray(ke)){const Ie=Re.groups;for(let $e=0,qe=Ie.length;$e<qe;$e++){const Ge=Ie[$e],it=ke[Ge.materialIndex];it&&it.visible&&m.push(R,Re,it,te,oe.z,Ge)}}else ke.visible&&m.push(R,Re,ke,te,oe.z,null)}}const ve=R.children;for(let Re=0,ke=ve.length;Re<ke;Re++)Cl(ve[Re],q,te,ne)}function Vf(R,q,te,ne){const j=R.opaque,ve=R.transmissive,Re=R.transparent;p.setupLightsView(te),ae===!0&&pe.setGlobalState(x.clippingPlanes,te),ne&&B.viewport(I.copy(ne)),j.length>0&&Go(j,q,te),ve.length>0&&Go(ve,q,te),Re.length>0&&Go(Re,q,te),B.buffers.depth.setTest(!0),B.buffers.depth.setMask(!0),B.buffers.color.setMask(!0),B.setPolygonOffset(!1)}function Gf(R,q,te,ne){if((te.isScene===!0?te.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[ne.id]===void 0&&(p.state.transmissionRenderTarget[ne.id]=new Os(1,1,{generateMipmaps:!0,type:F.has("EXT_color_buffer_half_float")||F.has("EXT_color_buffer_float")?Fo:Di,minFilter:Rs,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:at.workingColorSpace}));const ve=p.state.transmissionRenderTarget[ne.id],Re=ne.viewport||I;ve.setSize(Re.z*x.transmissionResolutionScale,Re.w*x.transmissionResolutionScale);const ke=x.getRenderTarget(),Ie=x.getActiveCubeFace(),$e=x.getActiveMipmapLevel();x.setRenderTarget(ve),x.getClearColor(ee),se=x.getClearAlpha(),se<1&&x.setClearColor(16777215,.5),x.clear(),Ve&&Pe.render(te);const qe=x.toneMapping;x.toneMapping=ns;const Ge=ne.viewport;if(ne.viewport!==void 0&&(ne.viewport=void 0),p.setupLightsView(ne),ae===!0&&pe.setGlobalState(x.clippingPlanes,ne),Go(R,te,ne),Z.updateMultisampleRenderTarget(ve),Z.updateRenderTargetMipmap(ve),F.has("WEBGL_multisampled_render_to_texture")===!1){let it=!1;for(let pt=0,Rt=q.length;pt<Rt;pt++){const Mt=q[pt],_t=Mt.object,Xe=Mt.geometry,Tt=Mt.material,ot=Mt.group;if(Tt.side===Gn&&_t.layers.test(ne.layers)){const pn=Tt.side;Tt.side=hn,Tt.needsUpdate=!0,Wf(_t,te,ne,Xe,Tt,ot),Tt.side=pn,Tt.needsUpdate=!0,it=!0}}it===!0&&(Z.updateMultisampleRenderTarget(ve),Z.updateRenderTargetMipmap(ve))}x.setRenderTarget(ke,Ie,$e),x.setClearColor(ee,se),Ge!==void 0&&(ne.viewport=Ge),x.toneMapping=qe}function Go(R,q,te){const ne=q.isScene===!0?q.overrideMaterial:null;for(let j=0,ve=R.length;j<ve;j++){const Re=R[j],ke=Re.object,Ie=Re.geometry,$e=Re.group;let qe=Re.material;qe.allowOverride===!0&&ne!==null&&(qe=ne),ke.layers.test(te.layers)&&Wf(ke,q,te,Ie,qe,$e)}}function Wf(R,q,te,ne,j,ve){R.onBeforeRender(x,q,te,ne,j,ve),R.modelViewMatrix.multiplyMatrices(te.matrixWorldInverse,R.matrixWorld),R.normalMatrix.getNormalMatrix(R.modelViewMatrix),j.onBeforeRender(x,q,te,ne,R,ve),j.transparent===!0&&j.side===Gn&&j.forceSinglePass===!1?(j.side=hn,j.needsUpdate=!0,x.renderBufferDirect(te,q,ne,j,R,ve),j.side=rs,j.needsUpdate=!0,x.renderBufferDirect(te,q,ne,j,R,ve),j.side=Gn):x.renderBufferDirect(te,q,ne,j,R,ve),R.onAfterRender(x,q,te,ne,j,ve)}function Wo(R,q,te){q.isScene!==!0&&(q=fe);const ne=X.get(R),j=p.state.lights,ve=p.state.shadowsArray,Re=j.state.version,ke=Y.getParameters(R,j.state,ve,q,te),Ie=Y.getProgramCacheKey(ke);let $e=ne.programs;ne.environment=R.isMeshStandardMaterial?q.environment:null,ne.fog=q.fog,ne.envMap=(R.isMeshStandardMaterial?de:ie).get(R.envMap||ne.environment),ne.envMapRotation=ne.environment!==null&&R.envMap===null?q.environmentRotation:R.envMapRotation,$e===void 0&&(R.addEventListener("dispose",he),$e=new Map,ne.programs=$e);let qe=$e.get(Ie);if(qe!==void 0){if(ne.currentProgram===qe&&ne.lightsStateVersion===Re)return $f(R,ke),qe}else ke.uniforms=Y.getUniforms(R),R.onBeforeCompile(ke,x),qe=Y.acquireProgram(ke,Ie),$e.set(Ie,qe),ne.uniforms=ke.uniforms;const Ge=ne.uniforms;return(!R.isShaderMaterial&&!R.isRawShaderMaterial||R.clipping===!0)&&(Ge.clippingPlanes=pe.uniform),$f(R,ke),ne.needsLights=h_(R),ne.lightsStateVersion=Re,ne.needsLights&&(Ge.ambientLightColor.value=j.state.ambient,Ge.lightProbe.value=j.state.probe,Ge.directionalLights.value=j.state.directional,Ge.directionalLightShadows.value=j.state.directionalShadow,Ge.spotLights.value=j.state.spot,Ge.spotLightShadows.value=j.state.spotShadow,Ge.rectAreaLights.value=j.state.rectArea,Ge.ltc_1.value=j.state.rectAreaLTC1,Ge.ltc_2.value=j.state.rectAreaLTC2,Ge.pointLights.value=j.state.point,Ge.pointLightShadows.value=j.state.pointShadow,Ge.hemisphereLights.value=j.state.hemi,Ge.directionalShadowMap.value=j.state.directionalShadowMap,Ge.directionalShadowMatrix.value=j.state.directionalShadowMatrix,Ge.spotShadowMap.value=j.state.spotShadowMap,Ge.spotLightMatrix.value=j.state.spotLightMatrix,Ge.spotLightMap.value=j.state.spotLightMap,Ge.pointShadowMap.value=j.state.pointShadowMap,Ge.pointShadowMatrix.value=j.state.pointShadowMatrix),ne.currentProgram=qe,ne.uniformsList=null,qe}function Xf(R){if(R.uniformsList===null){const q=R.currentProgram.getUniforms();R.uniformsList=Fa.seqWithValue(q.seq,R.uniforms)}return R.uniformsList}function $f(R,q){const te=X.get(R);te.outputColorSpace=q.outputColorSpace,te.batching=q.batching,te.batchingColor=q.batchingColor,te.instancing=q.instancing,te.instancingColor=q.instancingColor,te.instancingMorph=q.instancingMorph,te.skinning=q.skinning,te.morphTargets=q.morphTargets,te.morphNormals=q.morphNormals,te.morphColors=q.morphColors,te.morphTargetsCount=q.morphTargetsCount,te.numClippingPlanes=q.numClippingPlanes,te.numIntersection=q.numClipIntersection,te.vertexAlphas=q.vertexAlphas,te.vertexTangents=q.vertexTangents,te.toneMapping=q.toneMapping}function u_(R,q,te,ne,j){q.isScene!==!0&&(q=fe),Z.resetTextureUnits();const ve=q.fog,Re=ne.isMeshStandardMaterial?q.environment:null,ke=M===null?x.outputColorSpace:M.isXRRenderTarget===!0?M.texture.colorSpace:Er,Ie=(ne.isMeshStandardMaterial?de:ie).get(ne.envMap||Re),$e=ne.vertexColors===!0&&!!te.attributes.color&&te.attributes.color.itemSize===4,qe=!!te.attributes.tangent&&(!!ne.normalMap||ne.anisotropy>0),Ge=!!te.morphAttributes.position,it=!!te.morphAttributes.normal,pt=!!te.morphAttributes.color;let Rt=ns;ne.toneMapped&&(M===null||M.isXRRenderTarget===!0)&&(Rt=x.toneMapping);const Mt=te.morphAttributes.position||te.morphAttributes.normal||te.morphAttributes.color,_t=Mt!==void 0?Mt.length:0,Xe=X.get(ne),Tt=p.state.lights;if(ae===!0&&(ge===!0||R!==E)){const Jt=R===E&&ne.id===y;pe.setState(ne,R,Jt)}let ot=!1;ne.version===Xe.__version?(Xe.needsLights&&Xe.lightsStateVersion!==Tt.state.version||Xe.outputColorSpace!==ke||j.isBatchedMesh&&Xe.batching===!1||!j.isBatchedMesh&&Xe.batching===!0||j.isBatchedMesh&&Xe.batchingColor===!0&&j.colorTexture===null||j.isBatchedMesh&&Xe.batchingColor===!1&&j.colorTexture!==null||j.isInstancedMesh&&Xe.instancing===!1||!j.isInstancedMesh&&Xe.instancing===!0||j.isSkinnedMesh&&Xe.skinning===!1||!j.isSkinnedMesh&&Xe.skinning===!0||j.isInstancedMesh&&Xe.instancingColor===!0&&j.instanceColor===null||j.isInstancedMesh&&Xe.instancingColor===!1&&j.instanceColor!==null||j.isInstancedMesh&&Xe.instancingMorph===!0&&j.morphTexture===null||j.isInstancedMesh&&Xe.instancingMorph===!1&&j.morphTexture!==null||Xe.envMap!==Ie||ne.fog===!0&&Xe.fog!==ve||Xe.numClippingPlanes!==void 0&&(Xe.numClippingPlanes!==pe.numPlanes||Xe.numIntersection!==pe.numIntersection)||Xe.vertexAlphas!==$e||Xe.vertexTangents!==qe||Xe.morphTargets!==Ge||Xe.morphNormals!==it||Xe.morphColors!==pt||Xe.toneMapping!==Rt||Xe.morphTargetsCount!==_t)&&(ot=!0):(ot=!0,Xe.__version=ne.version);let pn=Xe.currentProgram;ot===!0&&(pn=Wo(ne,q,j));let zs=!1,mn=!1,Lr=!1;const wt=pn.getUniforms(),Tn=Xe.uniforms;if(B.useProgram(pn.program)&&(zs=!0,mn=!0,Lr=!0),ne.id!==y&&(y=ne.id,mn=!0),zs||E!==R){B.buffers.depth.getReversed()&&R.reversedDepth!==!0&&(R._reversedDepth=!0,R.updateProjectionMatrix()),wt.setValue(v,"projectionMatrix",R.projectionMatrix),wt.setValue(v,"viewMatrix",R.matrixWorldInverse);const on=wt.map.cameraPosition;on!==void 0&&on.setValue(v,le.setFromMatrixPosition(R.matrixWorld)),H.logarithmicDepthBuffer&&wt.setValue(v,"logDepthBufFC",2/(Math.log(R.far+1)/Math.LN2)),(ne.isMeshPhongMaterial||ne.isMeshToonMaterial||ne.isMeshLambertMaterial||ne.isMeshBasicMaterial||ne.isMeshStandardMaterial||ne.isShaderMaterial)&&wt.setValue(v,"isOrthographic",R.isOrthographicCamera===!0),E!==R&&(E=R,mn=!0,Lr=!0)}if(j.isSkinnedMesh){wt.setOptional(v,j,"bindMatrix"),wt.setOptional(v,j,"bindMatrixInverse");const Jt=j.skeleton;Jt&&(Jt.boneTexture===null&&Jt.computeBoneTexture(),wt.setValue(v,"boneTexture",Jt.boneTexture,Z))}j.isBatchedMesh&&(wt.setOptional(v,j,"batchingTexture"),wt.setValue(v,"batchingTexture",j._matricesTexture,Z),wt.setOptional(v,j,"batchingIdTexture"),wt.setValue(v,"batchingIdTexture",j._indirectTexture,Z),wt.setOptional(v,j,"batchingColorTexture"),j._colorsTexture!==null&&wt.setValue(v,"batchingColorTexture",j._colorsTexture,Z));const wn=te.morphAttributes;if((wn.position!==void 0||wn.normal!==void 0||wn.color!==void 0)&&me.update(j,te,pn),(mn||Xe.receiveShadow!==j.receiveShadow)&&(Xe.receiveShadow=j.receiveShadow,wt.setValue(v,"receiveShadow",j.receiveShadow)),ne.isMeshGouraudMaterial&&ne.envMap!==null&&(Tn.envMap.value=Ie,Tn.flipEnvMap.value=Ie.isCubeTexture&&Ie.isRenderTargetTexture===!1?-1:1),ne.isMeshStandardMaterial&&ne.envMap===null&&q.environment!==null&&(Tn.envMapIntensity.value=q.environmentIntensity),mn&&(wt.setValue(v,"toneMappingExposure",x.toneMappingExposure),Xe.needsLights&&f_(Tn,Lr),ve&&ne.fog===!0&&ce.refreshFogUniforms(Tn,ve),ce.refreshMaterialUniforms(Tn,ne,N,k,p.state.transmissionRenderTarget[R.id]),Fa.upload(v,Xf(Xe),Tn,Z)),ne.isShaderMaterial&&ne.uniformsNeedUpdate===!0&&(Fa.upload(v,Xf(Xe),Tn,Z),ne.uniformsNeedUpdate=!1),ne.isSpriteMaterial&&wt.setValue(v,"center",j.center),wt.setValue(v,"modelViewMatrix",j.modelViewMatrix),wt.setValue(v,"normalMatrix",j.normalMatrix),wt.setValue(v,"modelMatrix",j.matrixWorld),ne.isShaderMaterial||ne.isRawShaderMaterial){const Jt=ne.uniformsGroups;for(let on=0,Pl=Jt.length;on<Pl;on++){const us=Jt[on];je.update(us,pn),je.bind(us,pn)}}return pn}function f_(R,q){R.ambientLightColor.needsUpdate=q,R.lightProbe.needsUpdate=q,R.directionalLights.needsUpdate=q,R.directionalLightShadows.needsUpdate=q,R.pointLights.needsUpdate=q,R.pointLightShadows.needsUpdate=q,R.spotLights.needsUpdate=q,R.spotLightShadows.needsUpdate=q,R.rectAreaLights.needsUpdate=q,R.hemisphereLights.needsUpdate=q}function h_(R){return R.isMeshLambertMaterial||R.isMeshToonMaterial||R.isMeshPhongMaterial||R.isMeshStandardMaterial||R.isShadowMaterial||R.isShaderMaterial&&R.lights===!0}this.getActiveCubeFace=function(){return L},this.getActiveMipmapLevel=function(){return P},this.getRenderTarget=function(){return M},this.setRenderTargetTextures=function(R,q,te){const ne=X.get(R);ne.__autoAllocateDepthBuffer=R.resolveDepthBuffer===!1,ne.__autoAllocateDepthBuffer===!1&&(ne.__useRenderToTexture=!1),X.get(R.texture).__webglTexture=q,X.get(R.depthTexture).__webglTexture=ne.__autoAllocateDepthBuffer?void 0:te,ne.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(R,q){const te=X.get(R);te.__webglFramebuffer=q,te.__useDefaultFramebuffer=q===void 0};const d_=v.createFramebuffer();this.setRenderTarget=function(R,q=0,te=0){M=R,L=q,P=te;let ne=!0,j=null,ve=!1,Re=!1;if(R){const Ie=X.get(R);if(Ie.__useDefaultFramebuffer!==void 0)B.bindFramebuffer(v.FRAMEBUFFER,null),ne=!1;else if(Ie.__webglFramebuffer===void 0)Z.setupRenderTarget(R);else if(Ie.__hasExternalTextures)Z.rebindTextures(R,X.get(R.texture).__webglTexture,X.get(R.depthTexture).__webglTexture);else if(R.depthBuffer){const Ge=R.depthTexture;if(Ie.__boundDepthTexture!==Ge){if(Ge!==null&&X.has(Ge)&&(R.width!==Ge.image.width||R.height!==Ge.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");Z.setupDepthRenderbuffer(R)}}const $e=R.texture;($e.isData3DTexture||$e.isDataArrayTexture||$e.isCompressedArrayTexture)&&(Re=!0);const qe=X.get(R).__webglFramebuffer;R.isWebGLCubeRenderTarget?(Array.isArray(qe[q])?j=qe[q][te]:j=qe[q],ve=!0):R.samples>0&&Z.useMultisampledRTT(R)===!1?j=X.get(R).__webglMultisampledFramebuffer:Array.isArray(qe)?j=qe[te]:j=qe,I.copy(R.viewport),V.copy(R.scissor),K=R.scissorTest}else I.copy(Te).multiplyScalar(N).floor(),V.copy(Be).multiplyScalar(N).floor(),K=Ze;if(te!==0&&(j=d_),B.bindFramebuffer(v.FRAMEBUFFER,j)&&ne&&B.drawBuffers(R,j),B.viewport(I),B.scissor(V),B.setScissorTest(K),ve){const Ie=X.get(R.texture);v.framebufferTexture2D(v.FRAMEBUFFER,v.COLOR_ATTACHMENT0,v.TEXTURE_CUBE_MAP_POSITIVE_X+q,Ie.__webglTexture,te)}else if(Re){const Ie=q;for(let $e=0;$e<R.textures.length;$e++){const qe=X.get(R.textures[$e]);v.framebufferTextureLayer(v.FRAMEBUFFER,v.COLOR_ATTACHMENT0+$e,qe.__webglTexture,te,Ie)}}else if(R!==null&&te!==0){const Ie=X.get(R.texture);v.framebufferTexture2D(v.FRAMEBUFFER,v.COLOR_ATTACHMENT0,v.TEXTURE_2D,Ie.__webglTexture,te)}y=-1},this.readRenderTargetPixels=function(R,q,te,ne,j,ve,Re,ke=0){if(!(R&&R.isWebGLRenderTarget))return;let Ie=X.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&Re!==void 0&&(Ie=Ie[Re]),Ie){B.bindFramebuffer(v.FRAMEBUFFER,Ie);try{const $e=R.textures[ke],qe=$e.format,Ge=$e.type;if(!H.textureFormatReadable(qe)||!H.textureTypeReadable(Ge))return;q>=0&&q<=R.width-ne&&te>=0&&te<=R.height-j&&(R.textures.length>1&&v.readBuffer(v.COLOR_ATTACHMENT0+ke),v.readPixels(q,te,ne,j,Le.convert(qe),Le.convert(Ge),ve))}finally{const $e=M!==null?X.get(M).__webglFramebuffer:null;B.bindFramebuffer(v.FRAMEBUFFER,$e)}}},this.readRenderTargetPixelsAsync=async function(R,q,te,ne,j,ve,Re,ke=0){if(!(R&&R.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ie=X.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&Re!==void 0&&(Ie=Ie[Re]),Ie)if(q>=0&&q<=R.width-ne&&te>=0&&te<=R.height-j){B.bindFramebuffer(v.FRAMEBUFFER,Ie);const $e=R.textures[ke],qe=$e.format,Ge=$e.type;if(!H.textureFormatReadable(qe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!H.textureTypeReadable(Ge))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const it=v.createBuffer();v.bindBuffer(v.PIXEL_PACK_BUFFER,it),v.bufferData(v.PIXEL_PACK_BUFFER,ve.byteLength,v.STREAM_READ),R.textures.length>1&&v.readBuffer(v.COLOR_ATTACHMENT0+ke),v.readPixels(q,te,ne,j,Le.convert(qe),Le.convert(Ge),0);const pt=M!==null?X.get(M).__webglFramebuffer:null;B.bindFramebuffer(v.FRAMEBUFFER,pt);const Rt=v.fenceSync(v.SYNC_GPU_COMMANDS_COMPLETE,0);return v.flush(),await Nb(v,Rt,4),v.bindBuffer(v.PIXEL_PACK_BUFFER,it),v.getBufferSubData(v.PIXEL_PACK_BUFFER,0,ve),v.deleteBuffer(it),v.deleteSync(Rt),ve}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(R,q=null,te=0){const ne=Math.pow(2,-te),j=Math.floor(R.image.width*ne),ve=Math.floor(R.image.height*ne),Re=q!==null?q.x:0,ke=q!==null?q.y:0;Z.setTexture2D(R,0),v.copyTexSubImage2D(v.TEXTURE_2D,te,0,0,Re,ke,j,ve),B.unbindTexture()};const p_=v.createFramebuffer(),m_=v.createFramebuffer();this.copyTextureToTexture=function(R,q,te=null,ne=null,j=0,ve=null){ve===null&&(j!==0?(_r("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),ve=j,j=0):ve=0);let Re,ke,Ie,$e,qe,Ge,it,pt,Rt;const Mt=R.isCompressedTexture?R.mipmaps[ve]:R.image;if(te!==null)Re=te.max.x-te.min.x,ke=te.max.y-te.min.y,Ie=te.isBox3?te.max.z-te.min.z:1,$e=te.min.x,qe=te.min.y,Ge=te.isBox3?te.min.z:0;else{const wn=Math.pow(2,-j);Re=Math.floor(Mt.width*wn),ke=Math.floor(Mt.height*wn),R.isDataArrayTexture?Ie=Mt.depth:R.isData3DTexture?Ie=Math.floor(Mt.depth*wn):Ie=1,$e=0,qe=0,Ge=0}ne!==null?(it=ne.x,pt=ne.y,Rt=ne.z):(it=0,pt=0,Rt=0);const _t=Le.convert(q.format),Xe=Le.convert(q.type);let Tt;q.isData3DTexture?(Z.setTexture3D(q,0),Tt=v.TEXTURE_3D):q.isDataArrayTexture||q.isCompressedArrayTexture?(Z.setTexture2DArray(q,0),Tt=v.TEXTURE_2D_ARRAY):(Z.setTexture2D(q,0),Tt=v.TEXTURE_2D),v.pixelStorei(v.UNPACK_FLIP_Y_WEBGL,q.flipY),v.pixelStorei(v.UNPACK_PREMULTIPLY_ALPHA_WEBGL,q.premultiplyAlpha),v.pixelStorei(v.UNPACK_ALIGNMENT,q.unpackAlignment);const ot=v.getParameter(v.UNPACK_ROW_LENGTH),pn=v.getParameter(v.UNPACK_IMAGE_HEIGHT),zs=v.getParameter(v.UNPACK_SKIP_PIXELS),mn=v.getParameter(v.UNPACK_SKIP_ROWS),Lr=v.getParameter(v.UNPACK_SKIP_IMAGES);v.pixelStorei(v.UNPACK_ROW_LENGTH,Mt.width),v.pixelStorei(v.UNPACK_IMAGE_HEIGHT,Mt.height),v.pixelStorei(v.UNPACK_SKIP_PIXELS,$e),v.pixelStorei(v.UNPACK_SKIP_ROWS,qe),v.pixelStorei(v.UNPACK_SKIP_IMAGES,Ge);const wt=R.isDataArrayTexture||R.isData3DTexture,Tn=q.isDataArrayTexture||q.isData3DTexture;if(R.isDepthTexture){const wn=X.get(R),Jt=X.get(q),on=X.get(wn.__renderTarget),Pl=X.get(Jt.__renderTarget);B.bindFramebuffer(v.READ_FRAMEBUFFER,on.__webglFramebuffer),B.bindFramebuffer(v.DRAW_FRAMEBUFFER,Pl.__webglFramebuffer);for(let us=0;us<Ie;us++)wt&&(v.framebufferTextureLayer(v.READ_FRAMEBUFFER,v.COLOR_ATTACHMENT0,X.get(R).__webglTexture,j,Ge+us),v.framebufferTextureLayer(v.DRAW_FRAMEBUFFER,v.COLOR_ATTACHMENT0,X.get(q).__webglTexture,ve,Rt+us)),v.blitFramebuffer($e,qe,Re,ke,it,pt,Re,ke,v.DEPTH_BUFFER_BIT,v.NEAREST);B.bindFramebuffer(v.READ_FRAMEBUFFER,null),B.bindFramebuffer(v.DRAW_FRAMEBUFFER,null)}else if(j!==0||R.isRenderTargetTexture||X.has(R)){const wn=X.get(R),Jt=X.get(q);B.bindFramebuffer(v.READ_FRAMEBUFFER,p_),B.bindFramebuffer(v.DRAW_FRAMEBUFFER,m_);for(let on=0;on<Ie;on++)wt?v.framebufferTextureLayer(v.READ_FRAMEBUFFER,v.COLOR_ATTACHMENT0,wn.__webglTexture,j,Ge+on):v.framebufferTexture2D(v.READ_FRAMEBUFFER,v.COLOR_ATTACHMENT0,v.TEXTURE_2D,wn.__webglTexture,j),Tn?v.framebufferTextureLayer(v.DRAW_FRAMEBUFFER,v.COLOR_ATTACHMENT0,Jt.__webglTexture,ve,Rt+on):v.framebufferTexture2D(v.DRAW_FRAMEBUFFER,v.COLOR_ATTACHMENT0,v.TEXTURE_2D,Jt.__webglTexture,ve),j!==0?v.blitFramebuffer($e,qe,Re,ke,it,pt,Re,ke,v.COLOR_BUFFER_BIT,v.NEAREST):Tn?v.copyTexSubImage3D(Tt,ve,it,pt,Rt+on,$e,qe,Re,ke):v.copyTexSubImage2D(Tt,ve,it,pt,$e,qe,Re,ke);B.bindFramebuffer(v.READ_FRAMEBUFFER,null),B.bindFramebuffer(v.DRAW_FRAMEBUFFER,null)}else Tn?R.isDataTexture||R.isData3DTexture?v.texSubImage3D(Tt,ve,it,pt,Rt,Re,ke,Ie,_t,Xe,Mt.data):q.isCompressedArrayTexture?v.compressedTexSubImage3D(Tt,ve,it,pt,Rt,Re,ke,Ie,_t,Mt.data):v.texSubImage3D(Tt,ve,it,pt,Rt,Re,ke,Ie,_t,Xe,Mt):R.isDataTexture?v.texSubImage2D(v.TEXTURE_2D,ve,it,pt,Re,ke,_t,Xe,Mt.data):R.isCompressedTexture?v.compressedTexSubImage2D(v.TEXTURE_2D,ve,it,pt,Mt.width,Mt.height,_t,Mt.data):v.texSubImage2D(v.TEXTURE_2D,ve,it,pt,Re,ke,_t,Xe,Mt);v.pixelStorei(v.UNPACK_ROW_LENGTH,ot),v.pixelStorei(v.UNPACK_IMAGE_HEIGHT,pn),v.pixelStorei(v.UNPACK_SKIP_PIXELS,zs),v.pixelStorei(v.UNPACK_SKIP_ROWS,mn),v.pixelStorei(v.UNPACK_SKIP_IMAGES,Lr),ve===0&&q.generateMipmaps&&v.generateMipmap(Tt),B.unbindTexture()},this.copyTextureToTexture3D=function(R,q,te=null,ne=null,j=0){return _r('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(R,q,te,ne,j)},this.initRenderTarget=function(R){X.get(R).__webglFramebuffer===void 0&&Z.setupRenderTarget(R)},this.initTexture=function(R){R.isCubeTexture?Z.setTextureCube(R,0):R.isData3DTexture?Z.setTexture3D(R,0):R.isDataArrayTexture||R.isCompressedArrayTexture?Z.setTexture2DArray(R,0):Z.setTexture2D(R,0),B.unbindTexture()},this.resetState=function(){L=0,P=0,M=null,B.reset(),Me.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return ai}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=at._getDrawingBufferColorSpace(e),t.unpackColorSpace=at._getUnpackColorSpace()}}const dp={type:"change"},Bf={type:"start"},s_={type:"end"},ya=new Df,pp=new ji,OA=Math.cos(70*Ib.DEG2RAD),Ft=new $,ln=2*Math.PI,gt={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Rc=1e-6;class FA extends JM{constructor(e,t=null){super(e,t),this.state=gt.NONE,this.target=new $,this.cursor=new $,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:mr.ROTATE,MIDDLE:mr.DOLLY,RIGHT:mr.PAN},this.touches={ONE:rr.ROTATE,TWO:rr.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new $,this._lastQuaternion=new Ns,this._lastTargetPosition=new $,this._quat=new Ns().setFromUnitVectors(e.up,new $(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Hd,this._sphericalDelta=new Hd,this._scale=1,this._panOffset=new $,this._rotateStart=new Se,this._rotateEnd=new Se,this._rotateDelta=new Se,this._panStart=new Se,this._panEnd=new Se,this._panDelta=new Se,this._dollyStart=new Se,this._dollyEnd=new Se,this._dollyDelta=new Se,this._dollyDirection=new $,this._mouse=new Se,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=kA.bind(this),this._onPointerDown=BA.bind(this),this._onPointerUp=zA.bind(this),this._onContextMenu=qA.bind(this),this._onMouseWheel=GA.bind(this),this._onKeyDown=WA.bind(this),this._onTouchStart=XA.bind(this),this._onTouchMove=$A.bind(this),this._onMouseDown=HA.bind(this),this._onMouseMove=VA.bind(this),this._interceptControlDown=jA.bind(this),this._interceptControlUp=YA.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}connect(e){super.connect(e),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(dp),this.update(),this.state=gt.NONE}update(e=null){const t=this.object.position;Ft.copy(t).sub(this.target),Ft.applyQuaternion(this._quat),this._spherical.setFromVector3(Ft),this.autoRotate&&this.state===gt.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let i=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(i)&&isFinite(s)&&(i<-Math.PI?i+=ln:i>Math.PI&&(i-=ln),s<-Math.PI?s+=ln:s>Math.PI&&(s-=ln),i<=s?this._spherical.theta=Math.max(i,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(i+s)/2?Math.max(i,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const o=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=o!=this._spherical.radius}if(Ft.setFromSpherical(this._spherical),Ft.applyQuaternion(this._quatInverse),t.copy(this.target).add(Ft),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let o=null;if(this.object.isPerspectiveCamera){const a=Ft.length();o=this._clampDistance(a*this._scale);const l=a-o;this.object.position.addScaledVector(this._dollyDirection,l),this.object.updateMatrixWorld(),r=!!l}else if(this.object.isOrthographicCamera){const a=new $(this._mouse.x,this._mouse.y,0);a.unproject(this.object);const l=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=l!==this.object.zoom;const c=new $(this._mouse.x,this._mouse.y,0);c.unproject(this.object),this.object.position.sub(c).add(a),this.object.updateMatrixWorld(),o=Ft.length()}else this.zoomToCursor=!1;o!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(o).add(this.object.position):(ya.origin.copy(this.object.position),ya.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(ya.direction))<OA?this.object.lookAt(this.target):(pp.setFromNormalAndCoplanarPoint(this.object.up,this.target),ya.intersectPlane(pp,this.target))))}else if(this.object.isOrthographicCamera){const o=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),o!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>Rc||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Rc||this._lastTargetPosition.distanceToSquared(this.target)>Rc?(this.dispatchEvent(dp),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?ln/60*this.autoRotateSpeed*e:ln/60/60*this.autoRotateSpeed}_getZoomScale(e){const t=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*t)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,t){Ft.setFromMatrixColumn(t,0),Ft.multiplyScalar(-e),this._panOffset.add(Ft)}_panUp(e,t){this.screenSpacePanning===!0?Ft.setFromMatrixColumn(t,1):(Ft.setFromMatrixColumn(t,0),Ft.crossVectors(this.object.up,Ft)),Ft.multiplyScalar(e),this._panOffset.add(Ft)}_pan(e,t){const i=this.domElement;if(this.object.isPerspectiveCamera){const s=this.object.position;Ft.copy(s).sub(this.target);let r=Ft.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*r/i.clientHeight,this.object.matrix),this._panUp(2*t*r/i.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/i.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/i.clientHeight,this.object.matrix)):this.enablePan=!1}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:this.enableZoom=!1}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:this.enableZoom=!1}_updateZoomParameters(e,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const i=this.domElement.getBoundingClientRect(),s=e-i.left,r=t-i.top,o=i.width,a=i.height;this._mouse.x=s/o*2-1,this._mouse.y=-(r/a)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(ln*this._rotateDelta.x/t.clientHeight),this._rotateUp(ln*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let t=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(ln*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-ln*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(ln*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-ln*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),t=!0;break}t&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),i=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._rotateStart.set(i,s)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),i=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panStart.set(i,s)}}_handleTouchStartDolly(e){const t=this._getSecondPointerPosition(e),i=e.pageX-t.x,s=e.pageY-t.y,r=Math.sqrt(i*i+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{const i=this._getSecondPointerPosition(e),s=.5*(e.pageX+i.x),r=.5*(e.pageY+i.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(ln*this._rotateDelta.x/t.clientHeight),this._rotateUp(ln*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),i=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panEnd.set(i,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){const t=this._getSecondPointerPosition(e),i=e.pageX-t.x,s=e.pageY-t.y,r=Math.sqrt(i*i+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const o=(e.pageX+t.x)*.5,a=(e.pageY+t.y)*.5;this._updateZoomParameters(o,a)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(e){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId)return!0;return!1}_trackPointer(e){let t=this._pointerPositions[e.pointerId];t===void 0&&(t=new Se,this._pointerPositions[e.pointerId]=t),t.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){const t=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(e){const t=e.deltaMode,i={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(t){case 1:i.deltaY*=16;break;case 2:i.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(i.deltaY*=10),i}}function BA(n){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(n.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(n)&&(this._addPointer(n),n.pointerType==="touch"?this._onTouchStart(n):this._onMouseDown(n)))}function kA(n){this.enabled!==!1&&(n.pointerType==="touch"?this._onTouchMove(n):this._onMouseMove(n))}function zA(n){switch(this._removePointer(n),this._pointers.length){case 0:this.domElement.releasePointerCapture(n.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(s_),this.state=gt.NONE;break;case 1:const e=this._pointers[0],t=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:t.x,pageY:t.y});break}}function HA(n){let e;switch(n.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case mr.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(n),this.state=gt.DOLLY;break;case mr.ROTATE:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=gt.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=gt.ROTATE}break;case mr.PAN:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=gt.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=gt.PAN}break;default:this.state=gt.NONE}this.state!==gt.NONE&&this.dispatchEvent(Bf)}function VA(n){switch(this.state){case gt.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(n);break;case gt.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(n);break;case gt.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(n);break}}function GA(n){this.enabled===!1||this.enableZoom===!1||this.state!==gt.NONE||(n.preventDefault(),this.dispatchEvent(Bf),this._handleMouseWheel(this._customWheelEvent(n)),this.dispatchEvent(s_))}function WA(n){this.enabled!==!1&&this._handleKeyDown(n)}function XA(n){switch(this._trackPointer(n),this._pointers.length){case 1:switch(this.touches.ONE){case rr.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(n),this.state=gt.TOUCH_ROTATE;break;case rr.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(n),this.state=gt.TOUCH_PAN;break;default:this.state=gt.NONE}break;case 2:switch(this.touches.TWO){case rr.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(n),this.state=gt.TOUCH_DOLLY_PAN;break;case rr.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(n),this.state=gt.TOUCH_DOLLY_ROTATE;break;default:this.state=gt.NONE}break;default:this.state=gt.NONE}this.state!==gt.NONE&&this.dispatchEvent(Bf)}function $A(n){switch(this._trackPointer(n),this.state){case gt.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(n),this.update();break;case gt.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(n),this.update();break;case gt.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(n),this.update();break;case gt.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(n),this.update();break;default:this.state=gt.NONE}}function qA(n){this.enabled!==!1&&n.preventDefault()}function jA(n){n.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function YA(n){n.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}const Sa={示例企业A:"#1890FF",示例企业B:"#52C41A",示例企业C:"#FA8C16",示例企业D:"#F5222D",示例企业E:"#722ED1"},r_=[{name:"示例企业A",color:"#1890FF"},{name:"示例企业B",color:"#52C41A"},{name:"示例企业C",color:"#FA8C16"},{name:"示例企业D",color:"#F5222D"},{name:"示例企业E",color:"#722ED1"}];function KA(n){const e=()=>"#"+Math.floor(Math.random()*16777215).toString(16).padStart(6,"0");let t=e();for(;n.includes(t);)t=e();return t}function nl(n){if(!n||n==""||n=="未启用")return"#6b7280";if(Sa[n])return Sa[n];const e=Object.values(Sa),t=KA(e);return Sa[n]=t,r_.push({name:n,color:t}),t}function ZA(){return r_.map(n=>n.name)}let JA=[],QA=[],eR=[];function tR(n){let e=0;return n.split(",").forEach(i=>{const s=i.trim();if(s.includes("-")){const[r,o]=s.split("-").map(a=>parseInt(a.trim()));!isNaN(r)&&!isNaN(o)&&o>=r&&(e+=o-r+1)}else{const r=parseInt(s);isNaN(r)||(e+=1)}}),e}function nR(n){const e=JA.find(i=>i.roomId===n);if(!e)return 0;let t=0;return e.assignments.forEach(i=>{t+=tR(i.rackRange)}),t}function iR(n){return QA.includes(n)}function o_(n){return eR.includes(n)}async function sR(n){try{return await XS(n)}catch{return{roomId:n,cols:30,rows:22,maxRacks:660}}}async function rR(n){const e=await sR(n);return{cols:e.cols,rows:e.rows}}class oR{roomLayouts=new Map;async getRoomGridInfo(e){return await rR(e)}getRoomGridInfoSync(e){return{cols:30,rows:22}}isRoomInitialized(e){return this.roomLayouts.has(e)}initializeRoom(e,t=!1){if(this.roomLayouts.has(e)&&!t)return;const i=new Map,r=this.getRoomGridInfoSync(e).cols,o=660;for(let a=1;a<=o;a++){const l=Math.ceil(a/r),c=(a-1)%r+1;i.set(a,{id:a,enabled:!0,enterprise:null,color:"#f8fafc",position:{row:l,col:c},isHidden:!1,visibleIndex:a,name:null,roomName:e+"机房"})}this.roomLayouts.set(e,{roomId:e,racks:i})}parseRackRange(e){const t=[],i=e.split(",");for(const s of i){const r=s.trim();if(r.includes("-")){const[o,a]=r.split("-").map(l=>parseInt(l.trim()));if(!isNaN(o)&&!isNaN(a)&&o<=a)for(let l=o;l<=a;l++)t.push(l)}else{const o=parseInt(r);isNaN(o)||t.push(o)}}return t}executeRackCommand(e,t,i){try{const s=e.match(/^([^(]+)\((.+),\s*(true|false)\)$/);if(!s)return!1;const r=s[1].trim(),o=s[2].trim(),a=s[3]==="true",l=this.parseRackRange(o);return l.length===0?!1:(this.roomLayouts.has(r)||this.initializeRoom(r),a?t?this.assignRacksToEnterprise(r,t,l,i):(this.setMultipleRacksEnabled(r,l,!0),i&&this.setMultipleRacksColor(r,l,i)):this.setMultipleRacksEnabled(r,l,!1),!0)}catch{return!1}}executeBatchCommands(e,t,i){e.forEach(s=>{this.executeRackCommand(s,t,i)})}executeLayoutCommands(e){e.forEach(t=>{let i="";typeof t.target=="string"?i=t.target:typeof t.target=="number"?i=t.target.toString():Array.isArray(t.target)&&(i=t.target.join(",")),t.type==="hide"?i=`hide:${i}`:t.type==="show"&&(i=`show:${i}`),this.executeRackCommand(i,t.params?.enterprise,t.params?.color)})}setRackEnabled(e,t,i){const s=this.roomLayouts.get(e);if(!s)return;const r=s.racks.get(t);r&&(r.enabled=i,i||(r.enterprise=null,r.color="#f8fafc"))}setMultipleRacksEnabled(e,t,i){t.forEach(s=>{this.setRackEnabled(e,s,i)})}setRackColor(e,t,i,s){const r=this.roomLayouts.get(e);if(!r)return;const o=r.racks.get(t);o&&(o.color=i,s&&(o.enterprise=s))}setMultipleRacksColor(e,t,i,s){t.forEach(r=>{this.setRackColor(e,r,i,s)})}assignRacksToEnterprise(e,t,i,s){const r=s||nl(t);i.forEach(o=>{this.setRackEnabled(e,o,!0),this.setRackColor(e,o,r,t)})}getRoomLayout(e){const t=this.roomLayouts.get(e);return t?Array.from(t.racks.values()).filter(i=>i.enabled):[]}getRoomLayoutWithPlaceholders(e,t=!1){const i=this.roomLayouts.get(e);if(!i)return[];const s=Array.from(i.racks.values());if(!t)return s.filter(o=>o.enabled).map((o,a)=>({...o,isHidden:!1,visibleIndex:a+1}));let r=0;return s.filter(o=>o.enabled).map(o=>o.enterprise?(r++,{...o,isHidden:!1,visibleIndex:r}):{...o,isHidden:!0,color:"transparent"})}getRoomStats(e){const t=this.roomLayouts.get(e);if(!t)return{enabledRacks:0,usedRacks:0,enterprises:new Map};const s=Array.from(t.racks.values()).filter(a=>a.enabled),r=s.filter(a=>a.enterprise),o=new Map;return r.forEach(a=>{if(a.enterprise){const l=o.get(a.enterprise)||0;o.set(a.enterprise,l+1)}}),{enabledRacks:s.length,usedRacks:r.length,enterprises:o}}updateSingleRackFromBackend(e,t,i,s,r,o,a){const l=this.roomLayouts.get(e);if(!l)return;const c=l.racks.get(t);if(!c)return;const u=nl(i);c.enterprise=i,c.color=u,c.name=s,c.maintainer=r||null,c.KHMANAGE=o||null,c.roomName=a||null}}const Hn=new oR;let ri,rn,st,vn,as,jn,il,Xu,sl,hi="all",ao,zn=null,Zi=null,Ba=null;const mp=.95,Li={floors:5,roomsPerFloor:12,floorHeight:3,roomSize:{width:2,height:1.5,depth:2},floorRadius:12},cn={floors:[],rooms:[],dataFlows:[],labels:[]};let yn={rooms:[],networkTraffic:{in:0,out:0},systemLoad:{disk:0}},Ar={onRoomClick:null,onDataUpdate:null};async function aR(n,e={}){try{return Ar={...Ar,...e},e.floorCount&&(Li.floors=e.floorCount),ao=n,cR(n),uR(),await lR(),await fR(),await mR(),xR(),kf(),AR(),l_(),{scene:ri,camera:rn,renderer:st,controls:vn}}catch(t){throw t}}async function lR(){try{const n=await fetch("http://127.0.0.1:8002/api/config/data-center/1");if(n.ok){const t=await n.json();t.floor_count&&(Li.floors=t.floor_count)}const e=await fetch("http://127.0.0.1:8002/api/config/data-center/1/floors");if(e.ok){const t=await e.json()}}catch{}}function cR(n){ri=new oM,ri.background=null;const e=n.clientWidth||1920,t=n.clientHeight||1080;rn=new Pn(60,e/t,.1,1e3),rn.position.set(-18,20,-18),st=new NA({antialias:!0,alpha:!1,powerPreference:"high-performance"}),st.autoClear=!1,st.setClearColor(8900331,1),st.setSize(e,t),st.setPixelRatio(Math.min(window.devicePixelRatio,2)),st.toneMapping=bg,st.toneMappingExposure=1.2,n.appendChild(st.domElement),vn=new FA(rn,st.domElement),vn.enableDamping=!0,vn.dampingFactor=.05,vn.maxPolarAngle=Math.PI/2.2,vn.minDistance=10,vn.maxDistance=50,vn.target.set(0,5,0),as=new ZM,jn=new Se,il=new Ki,Xu=new Ki,sl=new Ki,ri.add(il),ri.add(Xu),ri.add(sl)}function uR(){const n=new YM(16777215,1);ri.add(n)}function ka(){const n=ZA();return n[Math.floor(Math.random()*n.length)]}async function fR(){try{const n=await hR();if(n.length>0)yn.rooms=n;else{const e=[],t=[1,2,3,4,5],i=[7,9];for(let s=1;s<=Li.floors;s++)for(let r=1;r<=6;r++){let o;s===1&&r===1?o="1-1":s===3&&r>=1&&r<=6?o=`3-${r}`:o=`${s}${r.toString().padStart(2,"0")}`,e.push({id:o,floor:s,room:r,disk:Math.random()*100,temperature:20+Math.random()*30,status:Math.random()>.8?"alert":"normal",enterprise:Math.random()>.3?ka():null,network:Math.random()*1e3,isOuterRoom:!1,isEnabled:!0})}for(const s of t)for(const r of i){const o=`${s}${r.toString().padStart(2,"0")}`;e.push({id:o,floor:s,room:r,disk:Math.random()*100,temperature:20+Math.random()*30,status:Math.random()>.8?"alert":"normal",enterprise:Math.random()>.3?ka():null,network:Math.random()*1e3,isOuterRoom:!0,isEnabled:!0})}yn.rooms=e}}catch{const e=[];for(let t=1;t<=Li.floors;t++)for(let i=1;i<=6;i++){const s=`${t}${i.toString().padStart(2,"0")}`;e.push({id:s,floor:t,room:i,disk:Math.random()*100,temperature:20+Math.random()*30,status:Math.random()>.8?"alert":"normal",enterprise:Math.random()>.3?ka():null,network:Math.random()*1e3,isOuterRoom:!1,isEnabled:!0})}yn.rooms=e}yn.networkTraffic={in:Math.random()*1e3,out:Math.random()*800},yn.systemLoad={disk:Math.random()*100}}async function hR(){try{const n=await fetch("http://127.0.0.1:8002/api/config/data-center/1/floors");if(n.ok){const e=await n.json(),t=[];for(const i of e){const s=await fetch(`http://127.0.0.1:8002/api/config/floors/${i.id}/rooms`);if(s.ok){const r=await s.json();for(const o of r){const a=`${i.floor_number}${o.room_number.toString().padStart(2,"0")}`;t.push({id:a,floor:i.floor_number,room:o.room_number,disk:Math.random()*100,temperature:20+Math.random()*30,status:Math.random()>.8?"alert":"normal",enterprise:Math.random()>.3?ka():null,network:Math.random()*1e3,isOuterRoom:o.room_number>6,isEnabled:!0,shapeType:o.shape||"rectangle",color:o.color||"#6b7280"})}}}return t}return[]}catch{return[]}}function dR(n,e){const t=document.createElement("canvas"),i=t.getContext("2d");t.width=256,t.height=64,i.font="Bold 24px Arial",i.fillStyle="rgba(255, 255, 255, 0.9)",i.strokeStyle="rgba(0, 0, 0, 0.8)",i.lineWidth=2,i.fillStyle="rgba(0, 0, 0, 0.6)",i.fillRect(0,0,t.width,t.height),i.strokeStyle="rgba(255, 255, 255, 0.9)",i.lineWidth=3,i.strokeRect(2,2,t.width-4,t.height-4),i.fillStyle="rgba(255, 255, 255, 0.9)",i.textAlign="center",i.textBaseline="middle",i.strokeStyle="rgba(0, 0, 0, 0.8)",i.lineWidth=2,i.strokeText(n,t.width/2,t.height/2),i.fillText(n,t.width/2,t.height/2);const s=new uM(t);s.needsUpdate=!0;const r=new zo({map:s,transparent:!0,alphaTest:.1,side:Gn}),o=new Vo(4,1),a=new bn(o,r);return a.position.copy(e),a.position.y+=1,a.userData={type:"roomLabel",roomId:n},a}function pR(){cn.labels.forEach(n=>{n&&rn&&n.lookAt(rn.position)})}async function mR(){for(let n=1;n<=Li.floors;n++)await gR(n)}async function gR(n){const e=(n-1)*Li.floorHeight,t=new Ki,i=Li.floorRadius,s=i*.5,r=new Nf;for(let h=0;h<6;h++){const g=h/6*Math.PI*2,_=Math.cos(g)*i,m=Math.sin(g)*i;h===0?r.moveTo(_,m):r.lineTo(_,m)}r.closePath();const o=new zu;for(let h=0;h<6;h++){const g=h/6*Math.PI*2,_=Math.cos(g)*s,m=Math.sin(g)*s;h===0?o.moveTo(_,m):o.lineTo(_,m)}r.holes.push(o);const a=new Al(r,{depth:.2,bevelEnabled:!1}),l=new WM({color:6583435,metalness:.3,roughness:.7,transparent:!0,opacity:.8}),c=new bn(a,l);c.position.y=e,c.rotation.x=-Math.PI/2,c.receiveShadow=!0,t.add(c);const u=new Of(i-.4,i+.4,6),f=new zo({color:16777215,transparent:!0,opacity:.8,side:Gn}),d=new bn(u,f);d.position.y=e+.11,d.rotation.x=-Math.PI/2,t.add(d),await _R(t,n,e,s,i),cn.floors.push(t),il.add(t)}async function _R(n,e,t,i,s){await gp(n,e,t,i,s,0,6);const r=s*1.2,o=s*1.5;await gp(n,e,t,r,o,6,12)}async function gp(n,e,t,i,s,r,o){const a=o-r,l=Math.PI*2/a,c=i*mp,u=s*mp;for(let f=0;f<a;f++){const d=r+f+1;let h;e===1&&d===1?h="1-1":e===3&&d>=1&&d<=6?h=`3-${d}`:e===4&&d>=1&&d<=6?h={1:"406",2:"401",3:"402",4:"403",5:"404",6:"405"}[d]:h=`${e}${d.toString().padStart(2,"0")}`;const g=yn.rooms.find(V=>V.id===h);if(!g||g.isOuterRoom&&!g.isEnabled)continue;let _=f;_=(f+6)%a,_=-_;const m=(-_-.5)*l,p=(c+u)/2,C=Math.cos(m)*p,b=Math.sin(m)*p,x=new $(C,t+Li.roomSize.height,b),w=new Nf,L=-f*l,P=(-f+1)*l;switch(g.shapeType){case"L-shape":const V=(L+P)/2,K=Math.cos(L)*c,ee=Math.sin(L)*c,se=Math.cos(P)*c,O=Math.sin(P)*c,k=Math.cos(P)*(c+(u-c)*.5),N=Math.sin(P)*(c+(u-c)*.5),ue=Math.cos(V)*u,ye=Math.sin(V)*u,Te=Math.cos(L)*u,Be=Math.sin(L)*u;w.moveTo(K,ee),w.lineTo(se,O),w.lineTo(k,N),w.lineTo(ue,ye),w.lineTo(Te,Be),w.closePath();break;case"double-length":const Ze=Math.cos(L)*c,Je=Math.sin(L)*c,ae=Math.cos(P)*c,ge=Math.sin(P)*c,le=(u-c)*2,oe=(L+P)/2,fe=Math.cos(oe),Ve=Math.sin(oe),D=ae+fe*le,v=ge+Ve*le,U=Ze+fe*le,F=Je+Ve*le;w.moveTo(Ze,Je),w.lineTo(ae,ge),w.lineTo(D,v),w.lineTo(U,F),w.closePath();break;default:const H=Math.cos(L)*c,B=Math.sin(L)*c,J=Math.cos(P)*c,X=Math.sin(P)*c,Z=u-c,ie=(L+P)/2,de=Math.cos(ie),T=Math.sin(ie),S=J+de*Z,z=X+T*Z,Y=H+de*Z,ce=B+T*Z;w.moveTo(H,B),w.lineTo(J,X),w.lineTo(S,z),w.lineTo(Y,ce),w.closePath();break}const M=new Al(w,{depth:Li.roomSize.height,bevelEnabled:!1}),y=a_(h),E=new zo({color:y,transparent:!0,opacity:.8}),I=new bn(M,E);if(I.position.y=t+.2,I.rotation.x=-Math.PI/2,I.userData={type:"room",roomId:h,data:g,originalColor:y},n.add(I),cn.rooms.push(I),r===0){const V=dR(h,x);V.userData.floor=e,sl.add(V),cn.labels.push(V)}}}function vR(n){const e=Hn.getRoomLayout(n);if(!e||e.length===0)return null;const t={};e.forEach(r=>{r.enterprise&&(t[r.enterprise]=(t[r.enterprise]||0)+1)});let i=null,s=0;return Object.entries(t).forEach(([r,o])=>{o>s&&(s=o,i=r)}),i}function a_(n){const e=yn.rooms.find(s=>s.id===n);if(e&&e.color)return parseInt(e.color.replace("#","0x"),16);parseInt(n.charAt(0));const t=parseInt(n.slice(-2));return t>=7&&t<=12?161499:vR(n)?1695718:7041664}function xR(){window.addEventListener("resize",ER),document.addEventListener("visibilitychange",TR),st.domElement.addEventListener("mousedown",yR),st.domElement.addEventListener("mouseup",SR),st.domElement.addEventListener("mousemove",bR)}let qr=null;function yR(n){const e=st.domElement.getBoundingClientRect();jn.x=(n.clientX-e.left)/e.width*2-1,jn.y=-((n.clientY-e.top)/e.height)*2+1,as.setFromCamera(jn,rn);const t=cn.rooms.filter(r=>r.visible&&r.parent&&r.parent.visible),s=as.intersectObjects(t).filter(r=>{const a=r.object.userData.data.floor;return hi==="all"?!0:a===hi});qr=s.length>0?s[0]:null}function SR(n){if(!qr){qr=null;return}const e=st.domElement.getBoundingClientRect();jn.x=(n.clientX-e.left)/e.width*2-1,jn.y=-((n.clientY-e.top)/e.height)*2+1,as.setFromCamera(jn,rn);const t=cn.rooms.filter(r=>r.visible&&r.parent&&r.parent.visible),s=as.intersectObjects(t).filter(r=>{const a=r.object.userData.data.floor;return hi==="all"?!0:a===hi});if(s.length>0&&qr.object===s[0].object){const o=s[0].object.userData.data;iR(o.id)&&Ar.onRoomClick&&Ar.onRoomClick(o)}qr=null}function bR(n){const e=st.domElement.getBoundingClientRect();jn.x=(n.clientX-e.left)/e.width*2-1,jn.y=-((n.clientY-e.top)/e.height)*2+1,as.setFromCamera(jn,rn);const t=cn.rooms.filter(r=>r.visible&&r.parent&&r.parent.visible),s=as.intersectObjects(t).filter(r=>{const a=r.object.userData.data.floor;return hi==="all"?!0:a===hi});if(s.length>0){const r=s[0].object;zn!==r&&(zn&&$u(zn),zn=r,MR(zn))}else zn&&($u(zn),zn=null)}function MR(n){if(!n||!n.userData)return;const e=n.userData.data?.id;if(!e)return;if(o_(e)){n.userData.originalScale||(n.userData.originalScale=n.scale.clone());const i=1.06;n.scale.set(n.userData.originalScale.x*i,n.userData.originalScale.y*i,n.userData.originalScale.z*i)}st&&st.domElement&&(st.domElement.style.cursor="pointer")}function $u(n){if(!n||!n.userData)return;const e=n.userData.data?.id;if(!e)return;o_(e)&&n.userData.originalScale&&n.scale.copy(n.userData.originalScale),st&&st.domElement&&(st.domElement.style.cursor="default")}function ER(){if(!ao||!rn||!st)return;const n=ao.clientWidth||1920,e=ao.clientHeight||1080;rn.aspect=n/e,rn.updateProjectionMatrix(),st.setSize(n,e)}function TR(){document.hidden?Zi&&(cancelAnimationFrame(Zi),Zi=null):Zi||kf()}function l_(){cn.labels.forEach(n=>{if(n&&n.userData&&n.userData.floor){const e=n.userData.floor;hi==="all"?n.visible=e===5:n.visible=e===hi}})}function wR(n){hi=n,cn.floors.forEach((e,t)=>{hi==="all"?e.visible=!0:e.visible=t+1===n}),l_()}function AR(){Ba=setInterval(()=>{RR(),CR(),Ar.onDataUpdate&&Ar.onDataUpdate(PR())},3600*1e3)}function RR(){yn.rooms.forEach(n=>{n.disk+=(Math.random()-.5)*2,n.disk=Math.max(0,Math.min(100,n.disk)),n.temperature+=(Math.random()-.5)*2,n.temperature=Math.max(15,Math.min(50,n.temperature))}),yn.systemLoad.disk+=(Math.random()-.5)*5,yn.systemLoad.disk=Math.max(0,Math.min(100,yn.systemLoad.disk))}function CR(){cn.rooms.forEach(n=>{const e=n.userData.roomId;if(e){const t=a_(e);n.material.color.setHex(t),n.userData.originalColor=t}})}function kf(){!st||!ri||!rn||(Zi=requestAnimationFrame(kf),vn&&vn.update(),pR(),st.render(ri,rn))}function PR(){const n=yn.rooms.filter(r=>r.isEnabled),e=n.length,t=n.filter(r=>r.status==="normal").length,i=n.filter(r=>r.status==="alert").length,s=new Set(yn.rooms.map(r=>r.enterprise)).size;return{totalServers:e,runningServers:t,alertCount:i,enterpriseCount:s}}function DR(){Zi&&(cancelAnimationFrame(Zi),Zi=null),Ba&&(clearInterval(Ba),Ba=null),zn&&($u(zn),zn=null),st&&st.domElement&&st.domElement.parentNode&&st.domElement.parentNode.removeChild(st.domElement),st&&st.dispose(),vn&&vn.dispose(),cn.floors.length=0,cn.rooms.length=0,cn.dataFlows.length=0,cn.labels.length=0,ri=null,rn=null,st=null,vn=null,as=null,jn=null,il=null,Xu=null,sl=null,ao=null}const c_=Nm("config",()=>{const n=Fe({id:1,name:"北京数据中心",floor_count:1}),e=Fe([]),t=Fe([]),i=Fe([]),s=Fe([]),r=async()=>{try{const g=await fetch("http://127.0.0.1:8002/api/config/data-center/1");if(g.ok){const _=await g.json();n.value=_}}catch{}},o=async()=>{try{const g=await fetch(`http://127.0.0.1:8002/api/config/data-center/${n.value.id}/floors`);if(g.ok){const _=await g.json();e.value=_;for(const m of _)await a(m.id)}}catch{}},a=async g=>{try{const _=await fetch(`http://127.0.0.1:8002/api/config/floors/${g}/rooms`);if(_.ok){const m=await _.json();t.value=[...t.value.filter(p=>p.floor_id!==g),...m];for(const p of m)await l(p.id),await c(p.id)}}catch{}},l=async g=>{try{const _=await fetch(`http://127.0.0.1:8002/api/config/rooms/${g}/layout`);if(_.ok){const m=await _.json();i.value=[...i.value.filter(p=>p.room_id!==g),m]}}catch{}},c=async g=>{try{const _=await fetch(`http://127.0.0.1:8002/api/config/rooms/${g}/grid`);if(_.ok){const m=await _.json();s.value=[...s.value.filter(p=>p.room_id!==g),...m]}}catch{}};return{dataCenterConfig:n,floors:e,rooms:t,layouts:i,grids:s,loadDataCenterConfig:r,loadFloors:o,loadRoomsByFloor:a,loadLayoutByRoom:l,loadGridByRoom:c,loadAllConfig:async()=>{await r(),await o()},getRoomsByFloor:g=>t.value.filter(_=>_.floor_id===g),getLayoutByRoom:g=>i.value.find(_=>_.room_id===g),getGridByRoom:g=>s.value.filter(_=>_.room_id===g)}}),LR={class:"three-scene-wrapper"},IR={class:"ui-overlay"},UR=Nn({__name:"ThreeScene",emits:["room-click"],setup(n,{expose:e,emit:t}){const i=Fe(),s=t;let r=null;return Mn(async()=>{if(await c_().loadDataCenterConfig(),i.value)try{r=await aR(i.value,{onRoomClick:a=>{s("room-click",a)},onDataUpdate:a=>{}})}catch{}}),Bs(()=>{r&&DR()}),e({updateFloorVisibility:wR}),(o,a)=>(De(),Oe("div",LR,[A("div",{ref_key:"containerRef",ref:i,class:"three-scene-canvas"},null,512),A("div",IR,[Av(o.$slots,"default",{},void 0)])]))}}),NR=On(UR,[["__scopeId","data-v-55d14669"]]),OR={},FR={class:"absolute top-4 left-4 z-30 animate-fade-in-up",style:{"--delay":"0.2s"}};function BR(n,e){return De(),Oe("div",FR,e[0]||(e[0]=[A("div",{class:"resource-overview-panel logo-panel"},[A("div",{class:"panel-header"},[A("div",{class:"header-icon"})]),A("div",{class:"panel-overlay"})],-1)]))}const kR=On(OR,[["render",BR],["__scopeId","data-v-4ff1fa36"]]),zR={class:"resource-overview-panel time-panel"},HR={class:"time-content"},VR={class:"current-time"},GR=Nn({__name:"TimePanel",props:{panelWidth:{default:330},panelHeight:{default:100}},setup(n){const e=Fe(""),t=()=>{const s=new Date;e.value=s.toLocaleString("zh-CN",{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit"})};let i;return Mn(()=>{t(),i=setInterval(t,1e3)}),Bs(()=>{i&&clearInterval(i)}),(s,r)=>(De(),Oe("header",{class:"absolute top-4 left-1/2 transform -translate-x-1/2 z-30",style:Dn({"--panel-width":s.panelWidth+"px","--panel-height":s.panelHeight+"px"})},[A("div",zR,[r[0]||(r[0]=hf('<div class="panel-header" style="margin-bottom:5px;" data-v-6d6e36ac><div class="header-icon" data-v-6d6e36ac><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-6d6e36ac><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" data-v-6d6e36ac></path></svg></div><h3 class="panel-title" style="font-size:24px;" data-v-6d6e36ac>资源监控平台</h3><div class="header-decoration" data-v-6d6e36ac></div></div>',1)),A("div",HR,[A("div",VR,He(e.value),1)]),r[1]||(r[1]=A("div",{class:"panel-overlay"},null,-1))])],4))}}),WR=On(GR,[["__scopeId","data-v-6d6e36ac"]]),XR={class:"absolute top-1/2 left-10 transform -translate-y-1/2 z-30"},$R={class:"overview-vertical"},qR={class:"overview-card primary"},jR={class:"card-content"},YR={class:"metric-row"},KR={class:"metric-value"},ZR={class:"overview-card powered"},JR={class:"card-content"},QR={class:"metric-row"},eC={class:"metric-value"},tC={class:"overview-card customer"},nC={class:"card-content"},iC={class:"metric-row"},sC={class:"metric-value"},rC={class:"overview-card selfuse"},oC={class:"card-content"},aC={class:"metric-row"},lC={class:"metric-value"},cC={class:"overview-card info"},uC={class:"card-content"},fC={class:"metric-row"},hC={class:"metric-value"},dC=Nn({__name:"ResourceOverview",emits:["openEnterprisePanel"],setup(n,{emit:e}){const t=e,i=()=>{t("openEnterprisePanel")},s=Fe({totalServers:0,totalITCabinetCount:0,totalEnterpriseCount:0,shouldBillCabinets:0,billedCabinets:0,reservedCabinets:0,availableCabinets:0,customerCabinets:0,selfUseCabinets:0});let r=null;const o=Fe(new Date),a=Fe(!1),l=async()=>{try{const d=await fetch("http://127.0.0.1:8002/api/config/resource-overview");if(!d.ok)throw new Error("Network response was not ok");const h=await d.json();return s.value.totalServers=h.total_servers||0,s.value.totalITCabinetCount=h.total_it_cabinet_count||0,s.value.totalEnterpriseCount=h.total_enterprise_count||0,s.value.shouldBillCabinets=h.should_bill_cabinets||0,s.value.billedCabinets=h.billed_cabinets||0,s.value.reservedCabinets=h.reserved_cabinets||0,s.value.availableCabinets=h.available_cabinets||0,s.value.customerCabinets=h.customer_cabinets||0,s.value.selfUseCabinets=h.self_use_cabinets||0,!0}catch{return await c(),!0}},c=async()=>{try{const d=await fetch("http://127.0.0.1:8002/api/config/resource-overview/refresh",{method:"POST"});if(!d.ok)throw new Error("Network response was not ok");const h=await d.json();return s.value.totalServers=h.total_servers||0,s.value.totalITCabinetCount=h.total_it_cabinet_count||0,s.value.totalEnterpriseCount=h.total_enterprise_count||0,s.value.shouldBillCabinets=h.should_bill_cabinets||0,s.value.billedCabinets=h.billed_cabinets||0,s.value.reservedCabinets=h.reserved_cabinets||0,s.value.availableCabinets=h.available_cabinets||0,s.value.customerCabinets=h.customer_cabinets||0,s.value.selfUseCabinets=h.self_use_cabinets||0,!0}catch{return!1}},u=async()=>{if(!a.value){a.value=!0;try{await l()&&(o.value=new Date)}catch{}finally{a.value=!1}}},f=()=>{r!==null&&clearInterval(r);const d=300*1e3;r=setInterval(()=>{u()},d)};return Mn(()=>{u(),f()}),Bs(()=>{r!==null&&(clearInterval(r),r=null)}),(d,h)=>(De(),Oe("div",XR,[A("div",{class:"resource-overview-panel vertical-layout",onClick:i},[h[10]||(h[10]=hf('<div class="panel-header" data-v-c3ee8a02><div class="header-icon" data-v-c3ee8a02><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-c3ee8a02><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" data-v-c3ee8a02></path></svg></div><h3 class="panel-title" data-v-c3ee8a02>资源概览</h3></div>',1)),A("div",$R,[A("div",qR,[h[1]||(h[1]=A("div",{class:"card-icon"},[A("svg",{class:"w-4 h-4",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24"},[A("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2 4h.01M17 16h.01"})])],-1)),A("div",jR,[A("div",YR,[h[0]||(h[0]=A("span",{class:"metric-label"},"总机柜数",-1)),A("span",KR,He(s.value.totalServers||0),1)])])]),A("div",ZR,[h[3]||(h[3]=A("div",{class:"card-icon"},[A("svg",{class:"w-4 h-4",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24"},[A("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M13 10V3L4 14h7v7l9-11h-7z"})])],-1)),A("div",JR,[A("div",QR,[h[2]||(h[2]=A("span",{class:"metric-label"},"已使用",-1)),A("span",eC,He(s.value.totalITCabinetCount||0),1)])])]),A("div",tC,[h[5]||(h[5]=A("div",{class:"card-icon"},[A("svg",{class:"w-4 h-4",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24"},[A("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"})])],-1)),A("div",nC,[A("div",iC,[h[4]||(h[4]=A("span",{class:"metric-label"},"空闲",-1)),A("span",sC,He(s.value.availableCabinets||0),1)])])]),A("div",rC,[h[7]||(h[7]=A("div",{class:"card-icon"},[A("svg",{class:"w-4 h-4",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24"},[A("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"})])],-1)),A("div",oC,[A("div",aC,[h[6]||(h[6]=A("span",{class:"metric-label"},"使用率",-1)),A("span",lC,He(s.value.totalServers>0?(s.value.totalITCabinetCount/s.value.totalServers*100).toFixed(1):0)+"%",1)])])]),A("div",cC,[h[9]||(h[9]=A("div",{class:"card-icon"},[A("svg",{class:"w-4 h-4",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24"},[A("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"})])],-1)),A("div",uC,[A("div",fC,[h[8]||(h[8]=A("span",{class:"metric-label"},"企业数",-1)),A("span",hC,He(s.value.totalEnterpriseCount),1)])])])]),h[11]||(h[11]=A("div",{class:"panel-overlay"},null,-1))])]))}}),pC=On(dC,[["__scopeId","data-v-c3ee8a02"]]),mC={class:"floor-control-container"},gC={class:"resource-overview-panel floor-selection-panel compact-height animate-fade-in-up",style:{"--delay":"0.5s"}},_C={class:"floor-grid compact"},vC=["onClick"],xC={class:"floor-content"},yC={class:"floor-label"},SC=Nn({__name:"FloorControls",props:{floors:{},currentFloor:{}},emits:["floor-change"],setup(n){return(e,t)=>(De(),Oe("div",mC,[A("div",gC,[A("div",_C,[A("button",{onClick:t[0]||(t[0]=i=>e.$emit("floor-change","all")),class:Vt(["floor-card compact",e.currentFloor==="all"?"floor-card-active":"floor-card-inactive"])},t[1]||(t[1]=[hf('<div class="floor-icon compact" data-v-2b7ea60d><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-2b7ea60d><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" data-v-2b7ea60d></path></svg></div><div class="floor-content" data-v-2b7ea60d><div class="floor-label" data-v-2b7ea60d>整体</div></div>',2)]),2),(De(!0),Oe(ht,null,xn(e.floors,i=>(De(),Oe("button",{key:i,onClick:s=>e.$emit("floor-change",i),class:Vt(["floor-card compact",e.currentFloor===i?"floor-card-active":"floor-card-inactive"])},[t[2]||(t[2]=A("div",{class:"floor-icon compact"},[A("svg",{class:"w-4 h-4",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24"},[A("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"})])],-1)),A("div",xC,[A("div",yC,He(i)+"F",1)])],10,vC))),128))]),t[3]||(t[3]=A("div",{class:"panel-overlay"},null,-1))])]))}}),bC=On(SC,[["__scopeId","data-v-2b7ea60d"]]),MC={class:"space-y-4"},EC={class:"grid-container overflow-auto border border-gray-200 rounded-md p-2"},TC=["onClick"],wC={class:"flex justify-between text-sm text-gray-600"},AC={class:"mt-4"},RC=Nn({__name:"CabinetGridEditor",props:{roomId:{}},emits:["save"],setup(n,{emit:e}){const t=e,i=Fe(10),s=Fe(10),r=Fe([]),o=Fe(""),a=Et(()=>r.value.filter(g=>g.isSelected).length),l=Et(()=>r.value.length);Mn(()=>{c()});const c=()=>{const g=[];for(let _=0;_<s.value;_++)for(let m=0;m<i.value;m++)g.push({id:`${_+1}-${m+1}`,isOccupied:!1,isSelected:!1});r.value=g},u=g=>{r.value[g].isSelected=!r.value[g].isSelected},f=()=>{r.value.forEach(g=>{g.isSelected=!1})},d=async()=>{r.value.filter(g=>g.isSelected),r.value.forEach(g=>{g.isSelected&&(g.isOccupied=!0)}),t("save")},h=()=>{const g=o.value.split(",").map(_=>_.trim());f(),g.forEach(_=>{if(_.includes("-")){const[m,p]=_.split("-").map(Number);if(!isNaN(m)&&!isNaN(p))for(let C=m-1;C<p;C++)C<r.value.length&&(r.value[C].isSelected=!0)}else{const m=Number(_)-1;!isNaN(m)&&m>=0&&m<r.value.length&&(r.value[m].isSelected=!0)}})};return(g,_)=>(De(),Oe("div",MC,[A("div",{class:"flex justify-between items-center"},[_[1]||(_[1]=A("h4",{class:"text-sm font-medium text-gray-700"},"机柜网格编辑器",-1)),A("div",{class:"flex space-x-2"},[A("button",{onClick:f,class:"px-3 py-1 text-xs bg-gray-100 text-gray-800 rounded hover:bg-gray-200 transition-colors"}," 清空选择 "),A("button",{onClick:d,class:"px-3 py-1 text-xs bg-indigo-500 text-white rounded hover:bg-indigo-600 transition-colors"}," 保存选择 ")])]),A("div",EC,[A("div",{class:"grid",style:Dn({gridTemplateColumns:`repeat(${i.value}, minmax(30px, 1fr))`,gridTemplateRows:`repeat(${s.value}, minmax(30px, 1fr))`,gap:"2px"})},[(De(!0),Oe(ht,null,xn(r.value,(m,p)=>(De(),Oe("div",{key:p,class:Vt(["grid-cell flex items-center justify-center text-xs font-medium cursor-pointer transition-colors",m.isOccupied?"bg-indigo-500 text-white":"bg-gray-100 text-gray-600 hover:bg-gray-200",m.isSelected?"ring-2 ring-indigo-500":""]),onClick:C=>u(p)},He(m.id),11,TC))),128))],4)]),A("div",wC,[A("div",null,"已选择: "+He(a.value)+" 个机柜",1),A("div",null,"总机柜数: "+He(l.value),1)]),A("div",AC,[_[2]||(_[2]=A("label",{class:"block text-sm font-medium text-gray-700 mb-1"},"输入机柜编号（用逗号分隔）",-1)),St(A("input",{"onUpdate:modelValue":_[0]||(_[0]=m=>o.value=m),type:"text",placeholder:"例如：1,3,5-10",class:"w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"},null,512),[[Ot,o.value]]),A("button",{onClick:h,class:"mt-2 px-3 py-1 text-xs bg-gray-100 text-gray-800 rounded hover:bg-gray-200 transition-colors"}," 应用选择 ")])]))}}),CC=On(RC,[["__scopeId","data-v-cb4e7cdc"]]),PC={class:"fixed bottom-20 left-20 z-40 flex flex-col items-center"},DC={key:0,class:"fixed bottom-32 left-10 bg-white p-3 rounded-lg shadow-lg text-sm z-50 animate-slide-up"},LC=["disabled"],IC={class:"flex justify-between items-center p-5 border-b border-gray-200"},UC={class:"flex border-b border-gray-200"},NC=["onClick"],OC={class:"p-5 overflow-y-auto"},FC={key:0,class:"space-y-4"},BC=["disabled"],kC=["disabled"],zC=["disabled"],HC={key:1,class:"space-y-4"},VC=["disabled"],GC=["disabled"],WC=["disabled"],XC=["disabled"],$C=["disabled"],qC=["disabled"],jC={key:2,class:"space-y-4"},YC=["disabled"],KC=["disabled"],ZC=["disabled"],JC=["disabled"],QC=["disabled"],eP=["disabled"],tP=["disabled"],nP=["disabled"],iP={key:3,class:"space-y-4"},sP=["disabled"],rP=["disabled"],oP=["disabled"],aP=["disabled"],lP=["disabled"],cP=["disabled"],uP={key:2,class:"fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"},fP={class:"bg-white rounded-lg shadow-xl max-w-4xl w-9/10 max-h-[90vh] flex flex-col"},hP={class:"flex justify-between items-center p-5 border-b border-gray-200"},dP={class:"flex-1 overflow-y-auto p-5"},pP=Nn({__name:"SettingsPanel",setup(n){const e=c_(),t=Fe(!1),i=Fe("基本配置"),s=Fe(!1),r=Fe(1),o=Fe(1),a=Fe(1),l=Fe(!1),c=Fe(""),u=["基本配置","楼层配置","机房配置","机柜排列"],f=Fe({name:"北京数据中心",floorCount:3}),d=Fe({floorNumber:1,floorName:"一楼",shape:"rectangle",width:100,depth:100}),h=Fe({roomNumber:1,roomName:"机房 A",shape:"rectangle",cabinetCount:100,positionX:0,positionY:0,positionZ:0,rotation:0,width:50,depth:50,height:30,color:"#6b7280"}),g=Fe({layoutType:"row",columns:10,rows:10,spacing:1,startPositionX:0,startPositionY:0});Mn(async()=>{await e.loadAllConfig(),await _()});const _=async()=>{try{const P=await fetch("http://127.0.0.1:8002/api/config/data-center/1");if(P.ok){const M=await P.json();f.value={name:M.name,floorCount:M.floor_count},a.value=M.id}}catch{}},m=(P,M=3e3)=>{c.value=P,setTimeout(()=>{c.value=""},M)},p=async()=>{if(!f.value.name.trim()){m("❌ 数据中心名称不能为空");return}l.value=!0;try{const P=await fetch("http://127.0.0.1:8002/api/config/data-center",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:f.value.name,floor_count:f.value.floorCount})});if(P.ok){const M=await P.json();a.value=M.id,m("✅ 基本配置已保存到数据库"),await e.loadAllConfig()}else m("❌ 保存失败，请重试")}catch(P){m("❌ 保存失败: "+P.message)}finally{l.value=!1}},C=async()=>{if(!d.value.floorName.trim()){m("❌ 楼层名称不能为空");return}l.value=!0;try{const P=await fetch("http://127.0.0.1:8002/api/config/floors",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({floor_number:d.value.floorNumber,floor_name:d.value.floorName,shape:d.value.shape,width:d.value.width,depth:d.value.depth,data_center_id:a.value})});if(P.ok){const M=await P.json();o.value=M.id,m("✅ 楼层配置已保存到数据库"),await e.loadAllConfig()}else m("❌ 保存失败，请先保存基本配置")}catch(P){m("❌ 保存失败: "+P.message)}finally{l.value=!1}},b=async()=>{if(!h.value.roomName.trim()){m("❌ 机房名称不能为空");return}l.value=!0;try{const P=await fetch("http://127.0.0.1:8002/api/config/rooms",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({room_number:h.value.roomNumber,room_name:h.value.roomName,shape:h.value.shape,color:h.value.color,cabinet_count:h.value.cabinetCount,position_x:h.value.positionX,position_y:h.value.positionY,position_z:h.value.positionZ,rotation:h.value.rotation,width:h.value.width,depth:h.value.depth,height:h.value.height,floor_id:o.value})});if(P.ok){const M=await P.json();r.value=M.id,m("✅ 机房配置已保存到数据库"),await e.loadAllConfig()}else m("❌ 保存失败，请先保存楼层配置")}catch(P){m("❌ 保存失败: "+P.message)}finally{l.value=!1}},x=async()=>{l.value=!0;try{const P=await fetch("http://127.0.0.1:8002/api/config/cabinet-layout",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({layout_type:g.value.layoutType,columns:g.value.columns,rows:g.value.rows,spacing:g.value.spacing,start_position_x:g.value.startPositionX,start_position_y:g.value.startPositionY,room_id:r.value})});if(P.ok){const M=await P.json();m("✅ 排列配置已保存到数据库"),await e.loadAllConfig()}else m("❌ 保存失败，请先保存机房配置")}catch(P){m("❌ 保存失败: "+P.message)}finally{l.value=!1}},w=()=>{if(r.value===1){m("⚠️ 请先保存机房配置");return}s.value=!0},L=async()=>{s.value=!1,m("✅ 网格配置已保存到数据库"),await e.loadAllConfig()};return(P,M)=>(De(),Oe("div",PC,[c.value?(De(),Oe("div",DC,He(c.value),1)):Ct("",!0),A("button",{class:"w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center shadow-xl hover:scale-110 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed z-50 mb-2",onClick:M[0]||(M[0]=y=>t.value=!0),title:"打开配置面板",disabled:l.value},M[22]||(M[22]=[A("svg",{class:"w-8 h-8",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24"},[A("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"}),A("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M15 12a3 3 0 11-6 0 3 3 0 016 0z"})],-1)]),8,LC),M[46]||(M[46]=A("span",{class:"text-white text-xs font-medium bg-black bg-opacity-70 px-2 py-1 rounded-md"},"设置",-1)),t.value?(De(),Oe("div",{key:1,class:"fixed inset-0 bg-black bg-opacity-50 z-39",onClick:M[1]||(M[1]=y=>t.value=!1)})):Ct("",!0),A("div",{class:Vt(["fixed left-0 top-0 bottom-0 w-96 bg-white shadow-lg z-41 transition-all duration-300",t.value?"translate-x-0":"-translate-x-full"])},[A("div",IC,[M[23]||(M[23]=A("h2",{class:"text-lg font-semibold text-gray-800"},"数据中心配置",-1)),A("button",{class:"text-gray-500 hover:text-gray-800 transition-colors",onClick:M[2]||(M[2]=y=>t.value=!1)},"✕")]),A("div",UC,[(De(),Oe(ht,null,xn(u,y=>A("button",{key:y,class:Vt(["flex-1 py-3 text-sm transition-colors",i.value===y?"text-indigo-600 border-b-2 border-indigo-600":"text-gray-600 hover:text-gray-800"]),onClick:E=>i.value=y},He(y),11,NC)),64))]),A("div",OC,[i.value==="基本配置"?(De(),Oe("div",FC,[A("div",null,[M[24]||(M[24]=A("label",{class:"block text-sm font-medium text-gray-700 mb-1"},"数据中心名称",-1)),St(A("input",{"onUpdate:modelValue":M[3]||(M[3]=y=>f.value.name=y),type:"text",placeholder:"输入数据中心名称",disabled:l.value,class:"w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-100"},null,8,BC),[[Ot,f.value.name]])]),A("div",null,[M[25]||(M[25]=A("label",{class:"block text-sm font-medium text-gray-700 mb-1"},"楼层数",-1)),St(A("input",{"onUpdate:modelValue":M[4]||(M[4]=y=>f.value.floorCount=y),type:"number",min:"1",max:"10",disabled:l.value,class:"w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-100"},null,8,kC),[[Ot,f.value.floorCount,void 0,{number:!0}]])]),A("button",{onClick:p,disabled:l.value,class:"w-full py-2 bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-md hover:shadow-lg transition-all disabled:opacity-60 disabled:cursor-not-allowed"},He(l.value?"保存中...":"保存基本配置"),9,zC)])):Ct("",!0),i.value==="楼层配置"?(De(),Oe("div",HC,[A("div",null,[M[26]||(M[26]=A("label",{class:"block text-sm font-medium text-gray-700 mb-1"},"楼层编号",-1)),St(A("input",{"onUpdate:modelValue":M[5]||(M[5]=y=>d.value.floorNumber=y),type:"number",min:"1",disabled:l.value,class:"w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-100"},null,8,VC),[[Ot,d.value.floorNumber,void 0,{number:!0}]])]),A("div",null,[M[27]||(M[27]=A("label",{class:"block text-sm font-medium text-gray-700 mb-1"},"楼层名称",-1)),St(A("input",{"onUpdate:modelValue":M[6]||(M[6]=y=>d.value.floorName=y),type:"text",placeholder:"例如：一楼",disabled:l.value,class:"w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-100"},null,8,GC),[[Ot,d.value.floorName]])]),A("div",null,[M[29]||(M[29]=A("label",{class:"block text-sm font-medium text-gray-700 mb-1"},"楼层形状",-1)),St(A("select",{"onUpdate:modelValue":M[7]||(M[7]=y=>d.value.shape=y),disabled:l.value,class:"w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-100"},M[28]||(M[28]=[A("option",{value:"rectangle"},"正方形",-1),A("option",{value:"trapezoid"},"梯形",-1),A("option",{value:"circle"},"圆形",-1)]),8,WC),[[to,d.value.shape]])]),A("div",null,[M[30]||(M[30]=A("label",{class:"block text-sm font-medium text-gray-700 mb-1"},"宽度 (m)",-1)),St(A("input",{"onUpdate:modelValue":M[8]||(M[8]=y=>d.value.width=y),type:"number",min:"10",disabled:l.value,class:"w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-100"},null,8,XC),[[Ot,d.value.width,void 0,{number:!0}]])]),A("div",null,[M[31]||(M[31]=A("label",{class:"block text-sm font-medium text-gray-700 mb-1"},"深度 (m)",-1)),St(A("input",{"onUpdate:modelValue":M[9]||(M[9]=y=>d.value.depth=y),type:"number",min:"10",disabled:l.value,class:"w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-100"},null,8,$C),[[Ot,d.value.depth,void 0,{number:!0}]])]),A("button",{onClick:C,disabled:l.value,class:"w-full py-2 bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-md hover:shadow-lg transition-all disabled:opacity-60 disabled:cursor-not-allowed"},He(l.value?"保存中...":"保存楼层配置"),9,qC)])):Ct("",!0),i.value==="机房配置"?(De(),Oe("div",jC,[A("div",null,[M[32]||(M[32]=A("label",{class:"block text-sm font-medium text-gray-700 mb-1"},"机房编号",-1)),St(A("input",{"onUpdate:modelValue":M[10]||(M[10]=y=>h.value.roomNumber=y),type:"number",min:"1",disabled:l.value,class:"w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-100"},null,8,YC),[[Ot,h.value.roomNumber,void 0,{number:!0}]])]),A("div",null,[M[33]||(M[33]=A("label",{class:"block text-sm font-medium text-gray-700 mb-1"},"机房名称",-1)),St(A("input",{"onUpdate:modelValue":M[11]||(M[11]=y=>h.value.roomName=y),type:"text",placeholder:"例如：机房 A",disabled:l.value,class:"w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-100"},null,8,KC),[[Ot,h.value.roomName]])]),A("div",null,[M[35]||(M[35]=A("label",{class:"block text-sm font-medium text-gray-700 mb-1"},"机房形状",-1)),St(A("select",{"onUpdate:modelValue":M[12]||(M[12]=y=>h.value.shape=y),disabled:l.value,class:"w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-100"},M[34]||(M[34]=[A("option",{value:"rectangle"},"正方形",-1),A("option",{value:"trapezoid"},"梯形",-1),A("option",{value:"circle"},"圆形",-1)]),8,ZC),[[to,h.value.shape]])]),A("div",null,[M[36]||(M[36]=A("label",{class:"block text-sm font-medium text-gray-700 mb-1"},"机柜数",-1)),St(A("input",{"onUpdate:modelValue":M[13]||(M[13]=y=>h.value.cabinetCount=y),type:"number",min:"1",disabled:l.value,class:"w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-100"},null,8,JC),[[Ot,h.value.cabinetCount,void 0,{number:!0}]])]),A("div",null,[M[37]||(M[37]=A("label",{class:"block text-sm font-medium text-gray-700 mb-1"},"位置 X",-1)),St(A("input",{"onUpdate:modelValue":M[14]||(M[14]=y=>h.value.positionX=y),type:"number",disabled:l.value,class:"w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-100"},null,8,QC),[[Ot,h.value.positionX,void 0,{number:!0}]])]),A("div",null,[M[38]||(M[38]=A("label",{class:"block text-sm font-medium text-gray-700 mb-1"},"位置 Y",-1)),St(A("input",{"onUpdate:modelValue":M[15]||(M[15]=y=>h.value.positionY=y),type:"number",disabled:l.value,class:"w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-100"},null,8,eP),[[Ot,h.value.positionY,void 0,{number:!0}]])]),A("div",null,[M[39]||(M[39]=A("label",{class:"block text-sm font-medium text-gray-700 mb-1"},"机房颜色",-1)),St(A("input",{"onUpdate:modelValue":M[16]||(M[16]=y=>h.value.color=y),type:"color",disabled:l.value,class:"w-full h-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-100"},null,8,tP),[[Ot,h.value.color]])]),A("button",{onClick:b,disabled:l.value,class:"w-full py-2 bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-md hover:shadow-lg transition-all disabled:opacity-60 disabled:cursor-not-allowed"},He(l.value?"保存中...":"保存机房配置"),9,nP)])):Ct("",!0),i.value==="机柜排列"?(De(),Oe("div",iP,[A("div",null,[M[41]||(M[41]=A("label",{class:"block text-sm font-medium text-gray-700 mb-1"},"排列方式",-1)),St(A("select",{"onUpdate:modelValue":M[17]||(M[17]=y=>g.value.layoutType=y),disabled:l.value,class:"w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-100"},M[40]||(M[40]=[A("option",{value:"row"},"行列排列",-1),A("option",{value:"circle"},"圆形排列",-1),A("option",{value:"custom"},"自定义",-1)]),8,sP),[[to,g.value.layoutType]])]),A("div",null,[M[42]||(M[42]=A("label",{class:"block text-sm font-medium text-gray-700 mb-1"},"列数",-1)),St(A("input",{"onUpdate:modelValue":M[18]||(M[18]=y=>g.value.columns=y),type:"number",min:"1",max:"20",disabled:l.value,class:"w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-100"},null,8,rP),[[Ot,g.value.columns,void 0,{number:!0}]])]),A("div",null,[M[43]||(M[43]=A("label",{class:"block text-sm font-medium text-gray-700 mb-1"},"行数",-1)),St(A("input",{"onUpdate:modelValue":M[19]||(M[19]=y=>g.value.rows=y),type:"number",min:"1",max:"20",disabled:l.value,class:"w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-100"},null,8,oP),[[Ot,g.value.rows,void 0,{number:!0}]])]),A("div",null,[M[44]||(M[44]=A("label",{class:"block text-sm font-medium text-gray-700 mb-1"},"间距 (m)",-1)),St(A("input",{"onUpdate:modelValue":M[20]||(M[20]=y=>g.value.spacing=y),type:"number",min:"0.1",step:"0.1",disabled:l.value,class:"w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-100"},null,8,aP),[[Ot,g.value.spacing,void 0,{number:!0}]])]),A("button",{onClick:x,disabled:l.value,class:"w-full py-2 bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-md hover:shadow-lg transition-all disabled:opacity-60 disabled:cursor-not-allowed"},He(l.value?"保存中...":"保存排列配置"),9,lP),A("button",{onClick:w,disabled:l.value,class:"w-full py-2 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"}," 打开网格编辑器 ",8,cP)])):Ct("",!0)])],2),s.value?(De(),Oe("div",uP,[A("div",fP,[A("div",hP,[M[45]||(M[45]=A("h3",{class:"text-lg font-semibold text-gray-800"},"机房内部排列编辑器",-1)),A("button",{class:"text-gray-500 hover:text-gray-800 transition-colors",onClick:M[21]||(M[21]=y=>s.value=!1)},"✕")]),A("div",dP,[dt(CC,{"room-id":r.value,onSave:L},null,8,["room-id"])])])])):Ct("",!0)]))}}),mP=On(pP,[["__scopeId","data-v-5f107c7d"]]),gP=async()=>(await En({url:"/api/feature-categories",method:"get"})).data,_P=async n=>(await En({url:"/api/features",method:"get",params:{category_code:n}})).data,vP=async(n,e)=>(await En({url:`/api/features/${n}`,method:"put",data:e})).data,_p=async(n,e=10)=>(await En({url:`/api/features/${n}/metrics`,method:"get",params:{limit:e}})).data,xP=async(n,e)=>(await En({url:`/api/features/${n}/metrics`,method:"post",data:e})).data,Cc=async n=>(await En({url:"/api/alerts",method:"get",params:{status:n}})).data,yP=async n=>(await En({url:"/api/alerts",method:"post",data:n})).data,SP=async n=>(await En({url:"/api/alerting/multi-channel",method:"post",data:n})).data,bP={class:"room-detail-panel resource-overview-panel z-[9999990]"},MP={class:"panel-header"},EP={class:"room-info"},TP={class:"room-id"},wP={class:"value"},AP={class:"rack-stats"},RP={class:"rack-stat-item"},CP={class:"stat-value"},PP={class:"rack-stat-item"},DP={class:"stat-value used"},LP={class:"rack-stat-item"},IP={class:"stat-value available"},UP={class:"rack-stat-item"},NP={class:"stat-value usage"},OP={class:"enterprise-legend-section"},FP={class:"legend-name"},BP={class:"legend-count"},kP={key:0,class:"no-enterprises"},zP={class:"feature-section"},HP={class:"section-title"},VP={class:"category-tabs"},GP=["onClick"],WP={class:"feature-grid"},XP={class:"feature-header"},$P={class:"feature-code"},qP={class:"feature-name"},jP=["title"],YP={class:"feature-meta"},KP={class:"feature-action-bar"},ZP=["onClick"],JP={class:"feature-action-status"},QP={key:0,class:"feature-actions"},e2={class:"action-row"},t2=["onUpdate:modelValue"],n2=["onClick"],i2={class:"action-row"},s2=["onUpdate:modelValue"],r2=["onUpdate:modelValue"],o2=["onClick"],a2={class:"action-row"},l2=["onUpdate:modelValue"],c2=["onUpdate:modelValue"],u2=["onClick"],f2=["onClick"],h2={class:"feature-history"},d2={class:"history-block"},p2={class:"history-value"},m2={class:"history-time"},g2={key:0,class:"history-empty"},_2={class:"history-block"},v2={class:"history-value"},x2={class:"history-time"},y2={key:0,class:"history-empty"},S2={key:0,class:"feature-empty"},b2={class:"alert-section"},M2={class:"alert-list"},E2={class:"alert-title"},T2={class:"alert-message"},w2={class:"alert-meta"},A2={class:"alert-severity"},R2={class:"alert-status"},C2={class:"alert-time"},P2={key:0,class:"alert-empty"},D2={class:"alert-actions"},L2=["disabled"],I2=Nn({__name:"DetailsPanel",props:{roomData:{}},emits:["close"],setup(n){const e=n,t=Et(()=>nR(e.roomData.id)),i=Et(()=>!r.value||r.value.length===0?[]:r.value.map(O=>({name:O.fkhname,color:nl(O.fkhname),count:O.cabinetCount})).sort((O,k)=>k.count-O.count)),s=Et(()=>i.value.length>6),r=Fe([]),o=Fe(0),a=Fe([]),l=Fe([]),c=Fe(""),u=Fe(""),f=Fe(!1),d=Fe("ALL"),h=Fe([]),g=Fe(null),_=Fe([]),m=Fe([]),p=Fe({}),C=Fe({}),b=Et(()=>d.value==="ALL"?a.value:a.value.filter(O=>O.category_code===d.value)),x=async()=>{try{const O=await gP();h.value=O}catch{}},w=O=>(p.value[O.code]||(p.value[O.code]={metricValue:"",status:O.status,severity:O.severity,message:"",channels:""}),p.value[O.code]),L=async O=>{if(g.value===O){g.value=null;return}g.value=O;try{const[k,N]=await Promise.all([_p(O),Cc()]);_.value=k,m.value=N.filter(ue=>ue.feature_code===O)}catch{}},P=async O=>{const k=w(O);if(k.metricValue){C.value[O.code]="提交中...";try{await xP(O.code,{metric_key:"manual_input",metric_value:k.metricValue,unit:O.unit}),C.value[O.code]="成功";const N=await _p(O.code);_.value=N,await I()}catch{C.value[O.code]="失败"}finally{setTimeout(()=>{C.value[O.code]=""},2e3)}}},M=async O=>{const k=w(O);C.value[O.code]="更新中...";try{await vP(O.code,{status:k.status,severity:k.severity}),C.value[O.code]="成功",await I()}catch{C.value[O.code]="失败"}finally{setTimeout(()=>{C.value[O.code]=""},2e3)}},y=async O=>{const k=w(O);if(k.message){C.value[O.code]="告警中...";try{await yP({feature_code:O.code,title:"手动触发告警",message:k.message,severity:k.severity}),C.value[O.code]="成功",await V();const N=await Cc();m.value=N.filter(ue=>ue.feature_code===O.code)}catch{C.value[O.code]="失败"}finally{setTimeout(()=>{C.value[O.code]=""},2e3)}}},E=async()=>{try{const O=await fetch("/api/stats/enterprises");if(!O.ok)throw new Error("Network response was not ok");const k=await O.json();r.value=k,o.value=0,r.value.forEach(N=>{o.value+=N.cabinetCount})}catch{}},I=async()=>{try{c.value="";const O=await _P();a.value=O}catch{c.value="功能模块加载失败",a.value=[]}},V=async()=>{try{u.value="";const O=await Cc();l.value=O}catch{u.value="告警列表加载失败",l.value=[]}},K=async O=>{try{f.value=!0;const k=O&&O.code,N=k?w(O):{channels:"短信,钉钉"},ue=N.channels?N.channels.split(/[,，]/).map(ye=>ye.trim()):["短信","钉钉"];await SP({feature_code:k?O.code:"7.02",message:k?`功能 ${O.name} 触发多渠道通知`:`机房${e.roomData.id}触发多渠道通知`,severity:"info",channels:ue}),k&&(C.value[O.code]="发送成功",setTimeout(()=>{C.value[O.code]=""},2e3)),await V()}catch{O&&O.code&&(C.value[O.code]="发送失败")}finally{f.value=!1}},ee=O=>{const k=new Date(O);return Number.isNaN(k.getTime())?"-":k.toLocaleString()},se=O=>({normal:"正常",warning:"注意",critical:"告警",active:"活跃",resolved:"已恢复"})[O]||O;return Mn(()=>{E(),x(),I(),V()}),dr(()=>e.roomData.id,(O,k)=>{O!==k&&(E(),I(),V())}),(O,k)=>(De(),Oe(ht,null,[dt(_o,{name:"backdrop-fade"},{default:Ls(()=>[A("div",{class:"fixed inset-0 bg-black/30 backdrop-blur-sm z-[9999900]",onClick:k[0]||(k[0]=N=>O.$emit("close"))})]),_:1}),dt(_o,{name:"panel-pop",appear:""},{default:Ls(()=>[A("div",bP,[A("div",MP,[k[4]||(k[4]=A("div",{class:"header-icon"},[A("svg",{class:"w-6 h-6",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24"},[A("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"})])],-1)),k[5]||(k[5]=A("h3",{class:"panel-title"},"机房详情",-1)),A("button",{class:"close-button",onClick:k[1]||(k[1]=N=>O.$emit("close"))},k[3]||(k[3]=[A("svg",{class:"w-4 h-4",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24"},[A("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M6 18L18 6M6 6l12 12"})],-1)]))]),A("div",EP,[A("div",TP,[k[6]||(k[6]=A("span",{class:"label"},"机房ID",-1)),A("span",wP,He(O.roomData.id),1)]),A("div",AP,[A("div",RP,[k[7]||(k[7]=A("span",{class:"stat-label"},"总机柜数",-1)),A("span",CP,He(t.value),1)]),A("div",PP,[k[8]||(k[8]=A("span",{class:"stat-label"},"已使用",-1)),A("span",DP,He(o.value||0),1)]),A("div",LP,[k[9]||(k[9]=A("span",{class:"stat-label"},"空闲",-1)),A("span",IP,He(t.value-(o.value||0)),1)]),A("div",UP,[k[10]||(k[10]=A("span",{class:"stat-label"},"使用率",-1)),A("span",NP,He(t.value>0?((o.value||0)/t.value*100).toFixed(1):"0.0")+"% ",1)])]),A("div",OP,[k[11]||(k[11]=A("h4",{class:"section-title"},"企业图注",-1)),A("div",{class:Vt(["enterprise-legend",{scrollable:s.value}])},[(De(!0),Oe(ht,null,xn(i.value,N=>(De(),Oe("div",{key:N.name,class:"legend-item"},[A("div",{class:"legend-color",style:Dn({backgroundColor:N.color})},null,4),A("span",FP,He(N.name),1),A("span",BP,"("+He(N.count)+")",1)]))),128)),i.value.length===0?(De(),Oe("div",kP," 暂无企业入驻 ")):Ct("",!0)],2)]),A("div",zP,[A("h4",HP,"功能模块 ("+He(a.value.length)+")",1),A("div",VP,[A("button",{class:Vt(["tab-item",{active:d.value==="ALL"}]),onClick:k[2]||(k[2]=N=>d.value="ALL")}," 全部 ",2),(De(!0),Oe(ht,null,xn(h.value,N=>(De(),Oe("button",{key:N.code,class:Vt(["tab-item",{active:d.value===N.code}]),onClick:ue=>d.value=N.code},He(N.name),11,GP))),128))]),A("div",WP,[(De(!0),Oe(ht,null,xn(b.value,N=>(De(),Oe("div",{key:N.code,class:Vt(["feature-item",N.severity])},[A("div",XP,[A("span",$P,He(N.code),1),A("span",{class:Vt(["feature-status",N.status])},He(se(N.status)),3)]),A("div",qP,He(N.name),1),A("div",{class:"feature-desc-preview",title:N.description},He(N.description),9,jP),A("div",YP,He(N.latest_value||"-")+" "+He(N.unit||""),1),A("div",KP,[A("button",{class:"action-button secondary",onClick:Or(ue=>L(N.code),["stop"])},He(g.value===N.code?"收起":"操作"),9,ZP),A("span",JP,He(C.value[N.code]||""),1)]),g.value===N.code?(De(),Oe("div",QP,[A("div",e2,[St(A("input",{"onUpdate:modelValue":ue=>w(N).metricValue=ue,class:"action-input",placeholder:"指标值"},null,8,t2),[[Ot,w(N).metricValue]]),A("button",{class:"action-button",onClick:Or(ue=>P(N),["stop"])}," 写入指标 ",8,n2)]),A("div",i2,[St(A("select",{"onUpdate:modelValue":ue=>w(N).status=ue,class:"action-select"},k[12]||(k[12]=[A("option",{value:"normal"},"正常",-1),A("option",{value:"warning"},"注意",-1),A("option",{value:"critical"},"告警",-1),A("option",{value:"active"},"活跃",-1),A("option",{value:"resolved"},"已恢复",-1)]),8,s2),[[to,w(N).status]]),St(A("select",{"onUpdate:modelValue":ue=>w(N).severity=ue,class:"action-select"},k[13]||(k[13]=[A("option",{value:"info"},"信息",-1),A("option",{value:"warning"},"警告",-1),A("option",{value:"critical"},"严重",-1)]),8,r2),[[to,w(N).severity]]),A("button",{class:"action-button",onClick:Or(ue=>M(N),["stop"])}," 更新状态 ",8,o2)]),A("div",a2,[St(A("input",{"onUpdate:modelValue":ue=>w(N).message=ue,class:"action-input",placeholder:"告警内容"},null,8,l2),[[Ot,w(N).message]]),N.code==="7.02"?St((De(),Oe("input",{key:0,"onUpdate:modelValue":ue=>w(N).channels=ue,class:"action-input",placeholder:"通道: 短信,钉钉,企业微信"},null,8,c2)),[[Ot,w(N).channels]]):Ct("",!0),N.code==="7.02"?(De(),Oe("button",{key:1,class:"action-button",onClick:Or(ue=>K(N),["stop"])}," 多渠道通知 ",8,u2)):(De(),Oe("button",{key:2,class:"action-button",onClick:Or(ue=>y(N),["stop"])}," 触发告警 ",8,f2))]),A("div",h2,[A("div",d2,[k[14]||(k[14]=A("div",{class:"history-title"},"最近指标",-1)),(De(!0),Oe(ht,null,xn(_.value,ue=>(De(),Oe("div",{key:ue.id,class:"history-item"},[A("span",p2,He(ue.metric_value)+" "+He(ue.unit||""),1),A("span",m2,He(ee(ue.collected_at)),1)]))),128)),_.value.length===0?(De(),Oe("div",g2," 暂无指标记录 ")):Ct("",!0)]),A("div",_2,[k[15]||(k[15]=A("div",{class:"history-title"},"最近告警",-1)),(De(!0),Oe(ht,null,xn(m.value,ue=>(De(),Oe("div",{key:ue.id,class:"history-item"},[A("span",v2,He(ue.message),1),A("span",x2,He(ee(ue.triggered_at)),1)]))),128)),m.value.length===0?(De(),Oe("div",y2," 暂无告警记录 ")):Ct("",!0)])])])):Ct("",!0)],2))),128)),a.value.length===0?(De(),Oe("div",S2,He(c.value||"暂无功能数据"),1)):Ct("",!0)])]),A("div",b2,[k[16]||(k[16]=A("h4",{class:"section-title"},"告警列表",-1)),A("div",M2,[(De(!0),Oe(ht,null,xn(l.value,N=>(De(),Oe("div",{key:N.id,class:Vt(["alert-item",N.severity])},[A("div",E2,He(N.title),1),A("div",T2,He(N.message),1),A("div",w2,[A("span",A2,He(N.severity),1),A("span",R2,He(N.status),1),A("span",C2,He(ee(N.triggered_at)),1)])],2))),128)),l.value.length===0?(De(),Oe("div",P2,He(u.value||"暂无告警数据"),1)):Ct("",!0)]),A("div",D2,[A("button",{class:"action-button",disabled:f.value,onClick:K},He(f.value?"发送中...":"发送多渠道通知"),9,L2)])])]),k[17]||(k[17]=A("div",{class:"panel-overlay"},null,-1))])]),_:1})],64))}}),U2=On(I2,[["__scopeId","data-v-e7d9dea8"]]);async function N2(){try{(await WS()).forEach(e=>{try{Hn.initializeRoom(e.roomId),e.assignments.forEach(t=>{const i=`${e.roomId}(${t.rackRange},${t.enabled})`,s=Hn.executeRackCommand(i,t.enterprise)})}catch{}})}catch{}}async function O2(n){try{const e=await Sf(n);if(!e)return;Hn.initializeRoom(e.roomId),e.assignments.forEach(t=>{const i=`${e.roomId}(${t.rackRange},${t.enabled})`,s=Hn.executeRackCommand(i,t.enterprise)})}catch{}}const F2={class:"room-layout-diagram"},B2={class:"panel-content-wrapper"},k2={class:"panel-header-detail"},z2={class:"panel-title-detail"},H2={class:"layout-section"},V2={class:"layout-container"},G2={class:"rack-grid-wrapper"},W2=["onClick"],X2={class:"rack-number"},$2={key:1,class:"text-gray-500"},q2=Nn({__name:"RoomLayoutDiagram",props:{roomData:{}},emits:["close"],setup(n,{emit:e}){const t=n,i=e,s=Fe(!1),r=Fe(null),o=Fe({rack:null,x:0,y:0}),a=(w,L)=>{L.stopPropagation(),r.value={...w,enterpriseName:w.enterprise==="未启用"?null:w.enterprise},s.value=!0},l=()=>{s.value=!1,r.value=null},c=w=>{const L=document.querySelector(".rack-tooltip");L&&!L.contains(w.target)&&(o.value.rack=null)};Et(()=>{if(!o.value.rack)return{};const w=15,L=250,P=120;let M=o.value.x+w,y=o.value.y-P-w;const E=window.innerWidth,I=window.innerHeight;return M+L>E&&(M=o.value.x-L-w),y<0&&(y=o.value.y+w),y+P>I&&(y=I-P-w),M<0&&(M=w),{left:`${M}px`,top:`${y}px`}});const u=Fe(0);Yv(()=>{Hn.isRoomInitialized(t.roomData.id)||O2(t.roomData.id),t.roomData.layoutCommands&&t.roomData.layoutCommands.length>0&&Hn.executeLayoutCommands(t.roomData.layoutCommands)}),Mn(()=>{b(),document.addEventListener("click",c)}),Bs(()=>{document.removeEventListener("click",c)});const f=Fe({cols:30,rows:22}),d=async()=>{try{const w=Hn.getRoomGridInfoSync(t.roomData.id);f.value=w}catch{}};Mn(()=>{b(),_(),d(),document.addEventListener("click",c)});const h=Et(()=>(u.value,Hn.getRoomLayoutWithPlaceholders(t.roomData.id,!0))),g=Fe([]),_=async()=>{try{const w=await Sf(t.roomData.id);w&&(g.value=w.areaFrames||[])}catch{g.value=[]}};Mn(()=>{b(),_(),document.addEventListener("click",c)});const m=(w,L)=>{const P=Hn.getRoomGridInfoSync(L),M=[],y=w.split(",");for(const ee of y){const se=ee.trim();if(se.includes("-")){const[O,k]=se.split("-").map(N=>parseInt(N.trim()));if(!isNaN(O)&&!isNaN(k)&&O<=k)for(let N=O;N<=k;N++)M.push(N)}else{const O=parseInt(se);isNaN(O)||M.push(O)}}let E=1/0,I=-1/0,V=1/0,K=-1/0;return M.forEach(ee=>{const se=Math.ceil(ee/P.cols),O=(ee-1)%P.cols+1;E=Math.min(E,se),I=Math.max(I,se),V=Math.min(V,O),K=Math.max(K,O)}),{startRow:E,endRow:I,startCol:V,endCol:K}},p=w=>{const L=m(w.rackRange,t.roomData.id);return{gridColumn:`${L.startCol} / ${L.endCol+1}`,gridRow:`${L.startRow} / ${L.endRow+1}`,border:`${w.borderWidth||3}px solid ${w.color}`}},C=w=>{if(!w||w.length===0)return;w.filter(P=>{if(!P.room_id)return!1;const M=P.room_id.toString(),y=t.roomData.id.toString(),E=M===y,I=M.slice(0,3)===y,V=M.includes(y);return E||I||V}).forEach((P,M)=>{const y=parseInt(P.cabinet_id);isNaN(y)||Hn.updateSingleRackFromBackend(t.roomData.id,y,P.FKHNAME,P.FENAME,P.maintainer,P.KHMANAGE,P.room_id)}),u.value++},b=async()=>{try{const w=await fetch(`/api/room/${t.roomData.id}/cabinets`);if(!w.ok)throw new Error(`HTTP error! status: ${w.status}`);const L=await w.json();L&&L.length>0,C(L)}catch{}},x=()=>{i("close")};return(w,L)=>{const P=af("RackDashboard");return De(),Oe(ht,null,[dt(_o,{name:"backdrop-fade"},{default:Ls(()=>[A("div",{class:"fixed inset-0 bg-black/30 backdrop-blur-sm z-30",onClick:L[0]||(L[0]=M=>w.$emit("close"))})]),_:1}),dt(_o,{name:"slide-left",appear:""},{default:Ls(()=>[A("div",F2,[A("div",B2,[A("div",k2,[L[3]||(L[3]=A("div",{class:"header-icon-detail"},[A("svg",{class:"w-6 h-6",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24"},[A("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"})])],-1)),A("h3",z2,He(w.roomData.id)+" 机房布局",1),A("button",{class:"close-button",onClick:L[1]||(L[1]=M=>x())},L[2]||(L[2]=[A("svg",{class:"w-4 h-4",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24"},[A("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M6 18L18 6M6 6l12 12"})],-1)]))]),A("div",H2,[A("div",V2,[A("div",G2,[A("div",{class:"rack-grid-large",style:Dn({gridTemplateColumns:`repeat(${f.value.cols}, 1fr)`,gridTemplateRows:`repeat(${f.value.rows}, 1fr)`})},[h.value.length>0?(De(!0),Oe(ht,{key:0},xn(h.value,M=>(De(),Oe("div",{key:M.id,class:Vt(["rack-cell-large",{"rack-used":M.enterprise,"rack-empty":!M.enterprise,"rack-hidden":M.isHidden}]),style:Dn({backgroundColor:M.enabled?M.color:"#f8fafc",borderColor:M.enabled?M.color:"#e2e8f0"}),onClick:y=>a(M,y)},[A("span",X2,He(M.visibleIndex),1)],14,W2))),128)):(De(),Oe("div",$2,"机房布局数据加载中..."))],4),(De(),es(uv,{to:"body"},[s.value&&r.value?(De(),es(P,{key:0,rack:r.value,"room-name":w.roomData.name,onClose:l},null,8,["rack","room-name"])):Ct("",!0)])),g.value.length>0?(De(),Oe("div",{key:0,class:"area-frames-overlay",style:Dn({gridTemplateColumns:`repeat(${f.value.cols}, 1fr)`,gridTemplateRows:`repeat(${f.value.rows}, 1fr)`})},[(De(!0),Oe(ht,null,xn(g.value,M=>(De(),Oe("div",{key:M.id,class:"area-frame",style:Dn(p(M))},[A("div",{class:Vt(["area-frame-label",`label-${M.labelPosition||"top"}`])},He(M.label),3)],4))),128))],4)):Ct("",!0)])])])]),L[4]||(L[4]=A("div",{class:"panel-overlay"},null,-1))])]),_:1})],64)}}}),j2=On(q2,[["__scopeId","data-v-80b48442"]]),Y2={key:0,class:"enterprise-overview-panel"},K2={class:"panel-content"},Z2={class:"search-section"},J2={class:"search-container"},Q2={class:"search-input-wrapper"},eD={class:"enterprise-section"},tD={class:"section-header"},nD={class:"section-actions"},iD=["disabled"],sD={class:"enterprise-container"},rD={key:0,class:"loading-state"},oD={key:1,class:"empty-state"},aD={class:"empty-description"},lD={key:2,class:"enterprise-list"},cD={class:"enterprise-card"},uD={class:"enterprise-header"},fD={class:"enterprise-identity"},hD={class:"enterprise-initial"},dD={class:"enterprise-info"},pD={class:"enterprise-name"},mD={class:"enterprise-metrics"},gD={class:"metric-item"},_D={class:"metric-value"},vD={class:"metric-item"},xD={class:"metric-value"},yD={class:"enterprise-distribution"},SD={class:"distribution-content"},bD={class:"room-tags"},MD=["onClick"],ED={class:"customer-manager"},TD={class:"manager-content"},wD={class:"manager-avatar"},AD={class:"manager-initial"},RD={class:"manager-info"},CD={class:"manager-name"},PD=Nn({__name:"EnterpriseOverviewPanel",emits:["close","room-click"],setup(n,{expose:e,emit:t}){const i=async b=>{await new Promise(w=>setTimeout(w,500));const x=[{fkhname:"示例企业A",totalSoldCabinets:120,cabinetCount:85,roomNames:"301机房, 302机房",khmanage:"张经理"},{fkhname:"示例企业B",totalSoldCabinets:80,cabinetCount:60,roomNames:"401机房",khmanage:"李经理"},{fkhname:"示例企业C",totalSoldCabinets:200,cabinetCount:150,roomNames:"301机房, 402机房, 501机房",khmanage:"王经理"},{fkhname:"示例企业D",totalSoldCabinets:50,cabinetCount:30,roomNames:"502机房",khmanage:"赵经理"},{fkhname:"示例企业E",totalSoldCabinets:100,cabinetCount:90,roomNames:"601机房",khmanage:"孙经理"}];return b?{success:!0,data:x.filter(L=>L.fkhname.includes(b)),msg:"success"}:{success:!0,data:x,msg:"success"}},s=t,r=Fe(!0);let o=Fe([]),a=Fe("");const l=Fe(!1);let c=null;const u=Fe(new Date),f=()=>{l.value=!l.value},d=b=>b?b.split(",").map(x=>x.trim()).filter(x=>x):[],h=()=>{},g=()=>{a.value="",o.value=[]},_=()=>{p(),u.value=new Date},m=b=>{s("room-click",b)},p=async()=>{try{r.value=!0;const b=await i(a.value);b.success&&(o.value=b.data.map(x=>({...x,color:nl(x.fkhname)})))}catch{}finally{r.value=!1}},C=()=>{c!==null&&clearInterval(c);const b=3600*1e3;c=setInterval(()=>{p(),u.value=new Date},b)};return Mn(()=>{p(),C()}),Bs(()=>{c!==null&&(clearInterval(c),c=null)}),e({isCollapsed:l,togglePanel:f,refreshData:_,lastUpdateTime:u}),(b,x)=>(De(),Oe(ht,null,[dt(_o,{name:"slide-left",appear:""},{default:Ls(()=>[l.value?Ct("",!0):(De(),Oe("div",Y2,[A("div",{class:"panel-header"},[x[2]||(x[2]=A("div",{class:"header-content"},[A("div",{class:"header-icon"},[A("svg",{class:"w-5 h-5",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24"},[A("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"})])]),A("div",{class:"header-text"},[A("h3",{class:"panel-title"},"企业信息概览"),A("p",{class:"panel-subtitle"},"Enterprise Overview Dashboard")])],-1)),A("div",{class:"close-button",onClick:f,"aria-label":"关闭企业信息概览面板"},x[1]||(x[1]=[A("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2"},[A("path",{d:"M18 6L6 18M6 6l12 12"})],-1)]))]),St(A("div",K2,[A("div",Z2,[A("div",J2,[A("div",Q2,[x[4]||(x[4]=A("svg",{class:"search-icon",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24"},[A("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"})],-1)),St(A("input",{"onUpdate:modelValue":x[0]||(x[0]=w=>Pt(a)?a.value=w:a=w),onKeyup:q0(p,["enter"]),onInput:h,placeholder:"搜索企业名称...",class:"search-input",type:"text"},null,544),[[Ot,Vn(a)]]),Vn(a)?(De(),Oe("button",{key:0,onClick:g,class:"clear-button","aria-label":"清除搜索"},x[3]||(x[3]=[A("svg",{class:"w-3 h-3",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24"},[A("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M6 18L18 6M6 6l12 12"})],-1)]))):Ct("",!0)])])]),A("div",eD,[A("div",tD,[x[6]||(x[6]=A("h4",{class:"section-title"},"企业列表",-1)),A("div",nD,[A("button",{onClick:_,class:"refresh-button",disabled:r.value,"aria-label":"刷新数据"},[(De(),Oe("svg",{class:Vt(["w-4 h-4",{"animate-spin":r.value}]),fill:"none",stroke:"currentColor",viewBox:"0 0 24 24"},x[5]||(x[5]=[A("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"},null,-1)]),2))],8,iD)])]),A("div",sD,[r.value?(De(),Oe("div",rD,x[7]||(x[7]=[A("div",{class:"loading-spinner"},null,-1),A("p",{class:"loading-text"},"正在加载企业信息...",-1)]))):Vn(o).length===0?(De(),Oe("div",oD,[x[8]||(x[8]=A("div",{class:"empty-icon"},[A("svg",{class:"w-12 h-12",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24"},[A("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"1",d:"M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"})])],-1)),x[9]||(x[9]=A("p",{class:"empty-title"},"暂无企业信息",-1)),A("p",aD,He(Vn(a)?"未找到匹配的企业":"请输入企业名称进行搜索"),1)])):(De(),Oe("div",lD,[(De(!0),Oe(ht,null,xn(Vn(o),(w,L)=>(De(),Oe("div",{key:w.fkhname,class:"enterprise-item",style:Dn({animationDelay:`${L*.1}s`})},[A("div",cD,[A("div",uD,[A("div",fD,[A("div",{class:"enterprise-avatar",style:Dn({backgroundColor:w.color})},[A("span",hD,He(w.fkhname.charAt(0)),1)],4),A("div",dD,[A("h5",pD,He(w.fkhname),1),x[10]||(x[10]=A("p",{class:"enterprise-subtitle"},"Enterprise",-1))])]),x[11]||(x[11]=A("div",{class:"enterprise-badge"},[A("span",{class:"badge-text"},"活跃")],-1))]),A("div",mD,[A("div",gD,[x[12]||(x[12]=A("div",{class:"metric-label"},"机柜总数",-1)),A("div",_D,He(w.totalSoldCabinets),1)]),x[14]||(x[14]=A("div",{class:"metric-divider"},null,-1)),A("div",vD,[x[13]||(x[13]=A("div",{class:"metric-label"},"已上电数",-1)),A("div",xD,He(w.cabinetCount),1)])]),A("div",yD,[x[15]||(x[15]=A("div",{class:"distribution-header"},[A("span",{class:"distribution-label"},"机房分布")],-1)),A("div",SD,[A("div",bD,[(De(!0),Oe(ht,null,xn(d(w.roomNames),P=>(De(),Oe("span",{key:P,class:"room-tag clickable-room-tag",onClick:M=>m(P.slice(0,3))},He(P.indexOf("机房")>-1?P:P+"机房"),9,MD))),128))])])]),A("div",ED,[A("div",TD,[A("div",wD,[A("span",AD,He(w.khmanage?w.khmanage.charAt(0):"待"),1)]),A("div",RD,[x[16]||(x[16]=A("span",{class:"manager-label"},"客户经理",-1)),A("span",CD,He(w.khmanage||"待分配"),1)])])])])],4))),128))]))])])],512),[[C0,!l.value]])]))]),_:1}),l.value?(De(),Oe("div",{key:0,class:"expand-button",onClick:f,"aria-label":"展开企业信息概览面板"},x[17]||(x[17]=[A("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2"},[A("path",{d:"M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"})],-1)]))):Ct("",!0)],64))}}),DD=On(PD,[["__scopeId","data-v-e6b7d8a6"]]),LD={class:"monitoring-dashboard"},ID=Nn({__name:"MonitoringDashboard",setup(n){const e=dy(),t=Fe(),i=Fe(),s=Fe(!1),r=Fe(null),o=Et(()=>e.isLoading),a=Et(()=>e.currentFloor),l=Et(()=>e.selectedRoom),c=Et(()=>[1,2,3,4,5]),u=m=>{e.selectFloor(m),t.value&&t.value.updateFloorVisibility(m)},f=m=>{r.value=m,s.value=!0,i.value&&!i.value.isCollapsed&&i.value.togglePanel(),e.setSelectedRoom(m)},d=()=>{s.value=!1,r.value=null},h=()=>{e.setSelectedRoom(null)},g=()=>{},_=async m=>{e.setSelectedRoom(null);try{const p=await Sf(m),C=[];if(p&&(p.assignments.forEach(b=>{b.rackRange.split(",").forEach(w=>{const L=w.trim();if(L.includes("-")){const[P,M]=L.split("-").map(y=>parseInt(y));for(let y=P;y<=M;y++)C.push({id:y,enterprise:b.enterprise,enabled:b.enabled,color:b.color||p.defaultColor})}else{const P=parseInt(L);isNaN(P)||C.push({id:P,enterprise:b.enterprise,enabled:b.enabled,color:b.color||p.defaultColor})}})}),p)){const b={id:m,name:`机房${m}`,floor:1};Do(()=>{e.setSelectedRoom(b),r.value=b,s.value=!0})}}catch{}};return Mn(()=>{setTimeout(()=>{e.setLoading(!1)},2e3)}),(m,p)=>{const C=af("LoadingScreen");return De(),Oe("div",LD,[o.value?(De(),es(C,{key:0})):Ct("",!0),dt(NR,{ref_key:"threeSceneRef",ref:t,onRoomClick:f},{default:Ls(()=>[dt(kR),dt(WR),dt(pC),dt(bC,{floors:c.value,"current-floor":a.value,onFloorChange:u},null,8,["floors","current-floor"])]),_:1},512),s.value&&r.value?(De(),es(U2,{key:1,"room-data":r.value,onClose:d},null,8,["room-data"])):Ct("",!0),l.value?(De(),es(j2,{key:2,"room-data":l.value,onClose:h},null,8,["room-data"])):Ct("",!0),dt(DD,{ref_key:"enterpriseOverviewRef",ref:i,onClose:g,onRoomClick:_},null,512),dt(mP)])}}}),UD=On(ID,[["__scopeId","data-v-40229641"]]),ND=fy({history:zx("/"),routes:[{path:"/",redirect:"/cockpit"},{path:"/cockpit",name:"monitoring",component:UD}]}),zf=K0(cx);zf.use(Q0());zf.use(ND);zf.mount("#app");N2();
