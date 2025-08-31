import{r as De,g as Te,a as mt}from"./vendor-D3F3s8fL.js";function gt(e,t){for(var n=0;n<t.length;n++){const r=t[n];if(typeof r!="string"&&!Array.isArray(r)){for(const o in r)if(o!=="default"&&!(o in e)){const a=Object.getOwnPropertyDescriptor(r,o);a&&Object.defineProperty(e,o,a.get?a:{enumerable:!0,get:()=>r[o]})}}}return Object.freeze(Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}))}var re={exports:{}},H={};/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var me;function kt(){if(me)return H;me=1;var e=De(),t=Symbol.for("react.element"),n=Symbol.for("react.fragment"),r=Object.prototype.hasOwnProperty,o=e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,a={key:!0,ref:!0,__self:!0,__source:!0};function i(s,f,u){var d,p={},y=null,m=null;u!==void 0&&(y=""+u),f.key!==void 0&&(y=""+f.key),f.ref!==void 0&&(m=f.ref);for(d in f)r.call(f,d)&&!a.hasOwnProperty(d)&&(p[d]=f[d]);if(s&&s.defaultProps)for(d in f=s.defaultProps,f)p[d]===void 0&&(p[d]=f[d]);return{$$typeof:t,type:s,key:y,ref:m,props:p,_owner:o.current}}return H.Fragment=n,H.jsx=i,H.jsxs=i,H}var ge;function Et(){return ge||(ge=1,re.exports=kt()),re.exports}var k=Et(),c=De();const O=Te(c),Ie=gt({__proto__:null,default:O},[c]);function ke(e,t){if(typeof e=="function")return e(t);e!=null&&(e.current=t)}function Le(...e){return t=>{let n=!1;const r=e.map(o=>{const a=ke(o,t);return!n&&typeof a=="function"&&(n=!0),a});if(n)return()=>{for(let o=0;o<r.length;o++){const a=r[o];typeof a=="function"?a():ke(e[o],null)}}}}function A(...e){return c.useCallback(Le(...e),e)}function q(e){const t=Ct(e),n=c.forwardRef((r,o)=>{const{children:a,...i}=r,s=c.Children.toArray(a),f=s.find(bt);if(f){const u=f.props.children,d=s.map(p=>p===f?c.Children.count(u)>1?c.Children.only(null):c.isValidElement(u)?u.props.children:null:p);return k.jsx(t,{...i,ref:o,children:c.isValidElement(u)?c.cloneElement(u,void 0,d):null})}return k.jsx(t,{...i,ref:o,children:a})});return n.displayName=`${e}.Slot`,n}var Eo=q("Slot");function Ct(e){const t=c.forwardRef((n,r)=>{const{children:o,...a}=n;if(c.isValidElement(o)){const i=wt(o),s=xt(a,o.props);return o.type!==c.Fragment&&(s.ref=r?Le(r,i):i),c.cloneElement(o,s)}return c.Children.count(o)>1?c.Children.only(null):null});return t.displayName=`${e}.SlotClone`,t}var _t=Symbol("radix.slottable");function bt(e){return c.isValidElement(e)&&typeof e.type=="function"&&"__radixId"in e.type&&e.type.__radixId===_t}function xt(e,t){const n={...t};for(const r in t){const o=e[r],a=t[r];/^on[A-Z]/.test(r)?o&&a?n[r]=(...s)=>{const f=a(...s);return o(...s),f}:o&&(n[r]=o):r==="style"?n[r]={...o,...a}:r==="className"&&(n[r]=[o,a].filter(Boolean).join(" "))}return{...e,...n}}function wt(e){let t=Object.getOwnPropertyDescriptor(e.props,"ref")?.get,n=t&&"isReactWarning"in t&&t.isReactWarning;return n?e.ref:(t=Object.getOwnPropertyDescriptor(e,"ref")?.get,n=t&&"isReactWarning"in t&&t.isReactWarning,n?e.props.ref:e.props.ref||e.ref)}function T(e,t,{checkForDefaultPrevented:n=!0}={}){return function(o){if(e?.(o),n===!1||!o.defaultPrevented)return t?.(o)}}function Mt(e,t){const n=c.createContext(t),r=a=>{const{children:i,...s}=a,f=c.useMemo(()=>s,Object.values(s));return k.jsx(n.Provider,{value:f,children:i})};r.displayName=e+"Provider";function o(a){const i=c.useContext(n);if(i)return i;if(t!==void 0)return t;throw new Error(`\`${a}\` must be used within \`${e}\``)}return[r,o]}function $e(e,t=[]){let n=[];function r(a,i){const s=c.createContext(i),f=n.length;n=[...n,i];const u=p=>{const{scope:y,children:m,...x}=p,l=y?.[e]?.[f]||s,v=c.useMemo(()=>x,Object.values(x));return k.jsx(l.Provider,{value:v,children:m})};u.displayName=a+"Provider";function d(p,y){const m=y?.[e]?.[f]||s,x=c.useContext(m);if(x)return x;if(i!==void 0)return i;throw new Error(`\`${p}\` must be used within \`${a}\``)}return[u,d]}const o=()=>{const a=n.map(i=>c.createContext(i));return function(s){const f=s?.[e]||a;return c.useMemo(()=>({[`__scope${e}`]:{...s,[e]:f}}),[s,f])}};return o.scopeName=e,[r,Nt(o,...t)]}function Nt(...e){const t=e[0];if(e.length===1)return t;const n=()=>{const r=e.map(o=>({useScope:o(),scopeName:o.scopeName}));return function(a){const i=r.reduce((s,{useScope:f,scopeName:u})=>{const p=f(a)[`__scope${u}`];return{...s,...p}},{});return c.useMemo(()=>({[`__scope${t.scopeName}`]:i}),[i])}};return n.scopeName=t.scopeName,n}var z=globalThis?.document?c.useLayoutEffect:()=>{},St=Ie[" useId ".trim().toString()]||(()=>{}),Rt=0;function oe(e){const[t,n]=c.useState(St());return z(()=>{n(r=>r??String(Rt++))},[e]),e||(t?`radix-${t}`:"")}var At=Ie[" useInsertionEffect ".trim().toString()]||z;function Pt({prop:e,defaultProp:t,onChange:n=()=>{},caller:r}){const[o,a,i]=Ot({defaultProp:t,onChange:n}),s=e!==void 0,f=s?e:o;{const d=c.useRef(e!==void 0);c.useEffect(()=>{const p=d.current;p!==s&&console.warn(`${r} is changing from ${p?"controlled":"uncontrolled"} to ${s?"controlled":"uncontrolled"}. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled value for the lifetime of the component.`),d.current=s},[s,r])}const u=c.useCallback(d=>{if(s){const p=Dt(d)?d(e):d;p!==e&&i.current?.(p)}else a(d)},[s,e,a,i]);return[f,u]}function Ot({defaultProp:e,onChange:t}){const[n,r]=c.useState(e),o=c.useRef(n),a=c.useRef(t);return At(()=>{a.current=t},[t]),c.useEffect(()=>{o.current!==n&&(a.current?.(n),o.current=n)},[n,o]),[n,r,a]}function Dt(e){return typeof e=="function"}var Fe=mt();const Tt=Te(Fe);var It=["a","button","div","form","h2","h3","img","input","label","li","nav","ol","p","select","span","svg","ul"],P=It.reduce((e,t)=>{const n=q(`Primitive.${t}`),r=c.forwardRef((o,a)=>{const{asChild:i,...s}=o,f=i?n:t;return typeof window<"u"&&(window[Symbol.for("radix-ui")]=!0),k.jsx(f,{...s,ref:a})});return r.displayName=`Primitive.${t}`,{...e,[t]:r}},{});function Lt(e,t){e&&Fe.flushSync(()=>e.dispatchEvent(t))}function B(e){const t=c.useRef(e);return c.useEffect(()=>{t.current=e}),c.useMemo(()=>(...n)=>t.current?.(...n),[])}function $t(e,t=globalThis?.document){const n=B(e);c.useEffect(()=>{const r=o=>{o.key==="Escape"&&n(o)};return t.addEventListener("keydown",r,{capture:!0}),()=>t.removeEventListener("keydown",r,{capture:!0})},[n,t])}var Ft="DismissableLayer",fe="dismissableLayer.update",jt="dismissableLayer.pointerDownOutside",Wt="dismissableLayer.focusOutside",Ee,je=c.createContext({layers:new Set,layersWithOutsidePointerEventsDisabled:new Set,branches:new Set}),We=c.forwardRef((e,t)=>{const{disableOutsidePointerEvents:n=!1,onEscapeKeyDown:r,onPointerDownOutside:o,onFocusOutside:a,onInteractOutside:i,onDismiss:s,...f}=e,u=c.useContext(je),[d,p]=c.useState(null),y=d?.ownerDocument??globalThis?.document,[,m]=c.useState({}),x=A(t,b=>p(b)),l=Array.from(u.layers),[v]=[...u.layersWithOutsidePointerEventsDisabled].slice(-1),g=l.indexOf(v),E=d?l.indexOf(d):-1,C=u.layersWithOutsidePointerEventsDisabled.size>0,_=E>=g,w=zt(b=>{const R=b.target,W=[...u.branches].some(ne=>ne.contains(R));!_||W||(o?.(b),i?.(b),b.defaultPrevented||s?.())},y),M=Bt(b=>{const R=b.target;[...u.branches].some(ne=>ne.contains(R))||(a?.(b),i?.(b),b.defaultPrevented||s?.())},y);return $t(b=>{E===u.layers.size-1&&(r?.(b),!b.defaultPrevented&&s&&(b.preventDefault(),s()))},y),c.useEffect(()=>{if(d)return n&&(u.layersWithOutsidePointerEventsDisabled.size===0&&(Ee=y.body.style.pointerEvents,y.body.style.pointerEvents="none"),u.layersWithOutsidePointerEventsDisabled.add(d)),u.layers.add(d),Ce(),()=>{n&&u.layersWithOutsidePointerEventsDisabled.size===1&&(y.body.style.pointerEvents=Ee)}},[d,y,n,u]),c.useEffect(()=>()=>{d&&(u.layers.delete(d),u.layersWithOutsidePointerEventsDisabled.delete(d),Ce())},[d,u]),c.useEffect(()=>{const b=()=>m({});return document.addEventListener(fe,b),()=>document.removeEventListener(fe,b)},[]),k.jsx(P.div,{...f,ref:x,style:{pointerEvents:C?_?"auto":"none":void 0,...e.style},onFocusCapture:T(e.onFocusCapture,M.onFocusCapture),onBlurCapture:T(e.onBlurCapture,M.onBlurCapture),onPointerDownCapture:T(e.onPointerDownCapture,w.onPointerDownCapture)})});We.displayName=Ft;var Ht="DismissableLayerBranch",qt=c.forwardRef((e,t)=>{const n=c.useContext(je),r=c.useRef(null),o=A(t,r);return c.useEffect(()=>{const a=r.current;if(a)return n.branches.add(a),()=>{n.branches.delete(a)}},[n.branches]),k.jsx(P.div,{...e,ref:o})});qt.displayName=Ht;function zt(e,t=globalThis?.document){const n=B(e),r=c.useRef(!1),o=c.useRef(()=>{});return c.useEffect(()=>{const a=s=>{if(s.target&&!r.current){let f=function(){He(jt,n,u,{discrete:!0})};const u={originalEvent:s};s.pointerType==="touch"?(t.removeEventListener("click",o.current),o.current=f,t.addEventListener("click",o.current,{once:!0})):f()}else t.removeEventListener("click",o.current);r.current=!1},i=window.setTimeout(()=>{t.addEventListener("pointerdown",a)},0);return()=>{window.clearTimeout(i),t.removeEventListener("pointerdown",a),t.removeEventListener("click",o.current)}},[t,n]),{onPointerDownCapture:()=>r.current=!0}}function Bt(e,t=globalThis?.document){const n=B(e),r=c.useRef(!1);return c.useEffect(()=>{const o=a=>{a.target&&!r.current&&He(Wt,n,{originalEvent:a},{discrete:!1})};return t.addEventListener("focusin",o),()=>t.removeEventListener("focusin",o)},[t,n]),{onFocusCapture:()=>r.current=!0,onBlurCapture:()=>r.current=!1}}function Ce(){const e=new CustomEvent(fe);document.dispatchEvent(e)}function He(e,t,n,{discrete:r}){const o=n.originalEvent.target,a=new CustomEvent(e,{bubbles:!1,cancelable:!0,detail:n});t&&o.addEventListener(e,t,{once:!0}),r?Lt(o,a):o.dispatchEvent(a)}var ae="focusScope.autoFocusOnMount",ce="focusScope.autoFocusOnUnmount",_e={bubbles:!1,cancelable:!0},Ut="FocusScope",qe=c.forwardRef((e,t)=>{const{loop:n=!1,trapped:r=!1,onMountAutoFocus:o,onUnmountAutoFocus:a,...i}=e,[s,f]=c.useState(null),u=B(o),d=B(a),p=c.useRef(null),y=A(t,l=>f(l)),m=c.useRef({paused:!1,pause(){this.paused=!0},resume(){this.paused=!1}}).current;c.useEffect(()=>{if(r){let l=function(C){if(m.paused||!s)return;const _=C.target;s.contains(_)?p.current=_:D(p.current,{select:!0})},v=function(C){if(m.paused||!s)return;const _=C.relatedTarget;_!==null&&(s.contains(_)||D(p.current,{select:!0}))},g=function(C){if(document.activeElement===document.body)for(const w of C)w.removedNodes.length>0&&D(s)};document.addEventListener("focusin",l),document.addEventListener("focusout",v);const E=new MutationObserver(g);return s&&E.observe(s,{childList:!0,subtree:!0}),()=>{document.removeEventListener("focusin",l),document.removeEventListener("focusout",v),E.disconnect()}}},[r,s,m.paused]),c.useEffect(()=>{if(s){xe.add(m);const l=document.activeElement;if(!s.contains(l)){const g=new CustomEvent(ae,_e);s.addEventListener(ae,u),s.dispatchEvent(g),g.defaultPrevented||(Vt(Yt(ze(s)),{select:!0}),document.activeElement===l&&D(s))}return()=>{s.removeEventListener(ae,u),setTimeout(()=>{const g=new CustomEvent(ce,_e);s.addEventListener(ce,d),s.dispatchEvent(g),g.defaultPrevented||D(l??document.body,{select:!0}),s.removeEventListener(ce,d),xe.remove(m)},0)}}},[s,u,d,m]);const x=c.useCallback(l=>{if(!n&&!r||m.paused)return;const v=l.key==="Tab"&&!l.altKey&&!l.ctrlKey&&!l.metaKey,g=document.activeElement;if(v&&g){const E=l.currentTarget,[C,_]=Kt(E);C&&_?!l.shiftKey&&g===_?(l.preventDefault(),n&&D(C,{select:!0})):l.shiftKey&&g===C&&(l.preventDefault(),n&&D(_,{select:!0})):g===E&&l.preventDefault()}},[n,r,m.paused]);return k.jsx(P.div,{tabIndex:-1,...i,ref:y,onKeyDown:x})});qe.displayName=Ut;function Vt(e,{select:t=!1}={}){const n=document.activeElement;for(const r of e)if(D(r,{select:t}),document.activeElement!==n)return}function Kt(e){const t=ze(e),n=be(t,e),r=be(t.reverse(),e);return[n,r]}function ze(e){const t=[],n=document.createTreeWalker(e,NodeFilter.SHOW_ELEMENT,{acceptNode:r=>{const o=r.tagName==="INPUT"&&r.type==="hidden";return r.disabled||r.hidden||o?NodeFilter.FILTER_SKIP:r.tabIndex>=0?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_SKIP}});for(;n.nextNode();)t.push(n.currentNode);return t}function be(e,t){for(const n of e)if(!Zt(n,{upTo:t}))return n}function Zt(e,{upTo:t}){if(getComputedStyle(e).visibility==="hidden")return!0;for(;e;){if(t!==void 0&&e===t)return!1;if(getComputedStyle(e).display==="none")return!0;e=e.parentElement}return!1}function Gt(e){return e instanceof HTMLInputElement&&"select"in e}function D(e,{select:t=!1}={}){if(e&&e.focus){const n=document.activeElement;e.focus({preventScroll:!0}),e!==n&&Gt(e)&&t&&e.select()}}var xe=Xt();function Xt(){let e=[];return{add(t){const n=e[0];t!==n&&n?.pause(),e=we(e,t),e.unshift(t)},remove(t){e=we(e,t),e[0]?.resume()}}}function we(e,t){const n=[...e],r=n.indexOf(t);return r!==-1&&n.splice(r,1),n}function Yt(e){return e.filter(t=>t.tagName!=="A")}var Jt="Portal",Be=c.forwardRef((e,t)=>{const{container:n,...r}=e,[o,a]=c.useState(!1);z(()=>a(!0),[]);const i=n||o&&globalThis?.document?.body;return i?Tt.createPortal(k.jsx(P.div,{...r,ref:t}),i):null});Be.displayName=Jt;function Qt(e,t){return c.useReducer((n,r)=>t[n][r]??n,e)}var Q=e=>{const{present:t,children:n}=e,r=en(t),o=typeof n=="function"?n({present:r.isPresent}):c.Children.only(n),a=A(r.ref,tn(o));return typeof n=="function"||r.isPresent?c.cloneElement(o,{ref:a}):null};Q.displayName="Presence";function en(e){const[t,n]=c.useState(),r=c.useRef(null),o=c.useRef(e),a=c.useRef("none"),i=e?"mounted":"unmounted",[s,f]=Qt(i,{mounted:{UNMOUNT:"unmounted",ANIMATION_OUT:"unmountSuspended"},unmountSuspended:{MOUNT:"mounted",ANIMATION_END:"unmounted"},unmounted:{MOUNT:"mounted"}});return c.useEffect(()=>{const u=U(r.current);a.current=s==="mounted"?u:"none"},[s]),z(()=>{const u=r.current,d=o.current;if(d!==e){const y=a.current,m=U(u);e?f("MOUNT"):m==="none"||u?.display==="none"?f("UNMOUNT"):f(d&&y!==m?"ANIMATION_OUT":"UNMOUNT"),o.current=e}},[e,f]),z(()=>{if(t){let u;const d=t.ownerDocument.defaultView??window,p=m=>{const l=U(r.current).includes(CSS.escape(m.animationName));if(m.target===t&&l&&(f("ANIMATION_END"),!o.current)){const v=t.style.animationFillMode;t.style.animationFillMode="forwards",u=d.setTimeout(()=>{t.style.animationFillMode==="forwards"&&(t.style.animationFillMode=v)})}},y=m=>{m.target===t&&(a.current=U(r.current))};return t.addEventListener("animationstart",y),t.addEventListener("animationcancel",p),t.addEventListener("animationend",p),()=>{d.clearTimeout(u),t.removeEventListener("animationstart",y),t.removeEventListener("animationcancel",p),t.removeEventListener("animationend",p)}}else f("ANIMATION_END")},[t,f]),{isPresent:["mounted","unmountSuspended"].includes(s),ref:c.useCallback(u=>{r.current=u?getComputedStyle(u):null,n(u)},[])}}function U(e){return e?.animationName||"none"}function tn(e){let t=Object.getOwnPropertyDescriptor(e.props,"ref")?.get,n=t&&"isReactWarning"in t&&t.isReactWarning;return n?e.ref:(t=Object.getOwnPropertyDescriptor(e,"ref")?.get,n=t&&"isReactWarning"in t&&t.isReactWarning,n?e.props.ref:e.props.ref||e.ref)}var se=0;function nn(){c.useEffect(()=>{const e=document.querySelectorAll("[data-radix-focus-guard]");return document.body.insertAdjacentElement("afterbegin",e[0]??Me()),document.body.insertAdjacentElement("beforeend",e[1]??Me()),se++,()=>{se===1&&document.querySelectorAll("[data-radix-focus-guard]").forEach(t=>t.remove()),se--}},[])}function Me(){const e=document.createElement("span");return e.setAttribute("data-radix-focus-guard",""),e.tabIndex=0,e.style.outline="none",e.style.opacity="0",e.style.position="fixed",e.style.pointerEvents="none",e}var S=function(){return S=Object.assign||function(t){for(var n,r=1,o=arguments.length;r<o;r++){n=arguments[r];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(t[a]=n[a])}return t},S.apply(this,arguments)};function Ue(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var o=0,r=Object.getOwnPropertySymbols(e);o<r.length;o++)t.indexOf(r[o])<0&&Object.prototype.propertyIsEnumerable.call(e,r[o])&&(n[r[o]]=e[r[o]]);return n}function rn(e,t,n){if(n||arguments.length===2)for(var r=0,o=t.length,a;r<o;r++)(a||!(r in t))&&(a||(a=Array.prototype.slice.call(t,0,r)),a[r]=t[r]);return e.concat(a||Array.prototype.slice.call(t))}var X="right-scroll-bar-position",Y="width-before-scroll-bar",on="with-scroll-bars-hidden",an="--removed-body-scroll-bar-size";function ie(e,t){return typeof e=="function"?e(t):e&&(e.current=t),e}function cn(e,t){var n=c.useState(function(){return{value:e,callback:t,facade:{get current(){return n.value},set current(r){var o=n.value;o!==r&&(n.value=r,n.callback(r,o))}}}})[0];return n.callback=t,n.facade}var sn=typeof window<"u"?c.useLayoutEffect:c.useEffect,Ne=new WeakMap;function ln(e,t){var n=cn(null,function(r){return e.forEach(function(o){return ie(o,r)})});return sn(function(){var r=Ne.get(n);if(r){var o=new Set(r),a=new Set(e),i=n.current;o.forEach(function(s){a.has(s)||ie(s,null)}),a.forEach(function(s){o.has(s)||ie(s,i)})}Ne.set(n,e)},[e]),n}function un(e){return e}function dn(e,t){t===void 0&&(t=un);var n=[],r=!1,o={read:function(){if(r)throw new Error("Sidecar: could not `read` from an `assigned` medium. `read` could be used only with `useMedium`.");return n.length?n[n.length-1]:e},useMedium:function(a){var i=t(a,r);return n.push(i),function(){n=n.filter(function(s){return s!==i})}},assignSyncMedium:function(a){for(r=!0;n.length;){var i=n;n=[],i.forEach(a)}n={push:function(s){return a(s)},filter:function(){return n}}},assignMedium:function(a){r=!0;var i=[];if(n.length){var s=n;n=[],s.forEach(a),i=n}var f=function(){var d=i;i=[],d.forEach(a)},u=function(){return Promise.resolve().then(f)};u(),n={push:function(d){i.push(d),u()},filter:function(d){return i=i.filter(d),n}}}};return o}function fn(e){e===void 0&&(e={});var t=dn(null);return t.options=S({async:!0,ssr:!1},e),t}var Ve=function(e){var t=e.sideCar,n=Ue(e,["sideCar"]);if(!t)throw new Error("Sidecar: please provide `sideCar` property to import the right car");var r=t.read();if(!r)throw new Error("Sidecar medium not found");return c.createElement(r,S({},n))};Ve.isSideCarExport=!0;function hn(e,t){return e.useMedium(t),Ve}var Ke=fn(),le=function(){},ee=c.forwardRef(function(e,t){var n=c.useRef(null),r=c.useState({onScrollCapture:le,onWheelCapture:le,onTouchMoveCapture:le}),o=r[0],a=r[1],i=e.forwardProps,s=e.children,f=e.className,u=e.removeScrollBar,d=e.enabled,p=e.shards,y=e.sideCar,m=e.noRelative,x=e.noIsolation,l=e.inert,v=e.allowPinchZoom,g=e.as,E=g===void 0?"div":g,C=e.gapMode,_=Ue(e,["forwardProps","children","className","removeScrollBar","enabled","shards","sideCar","noRelative","noIsolation","inert","allowPinchZoom","as","gapMode"]),w=y,M=ln([n,t]),b=S(S({},_),o);return c.createElement(c.Fragment,null,d&&c.createElement(w,{sideCar:Ke,removeScrollBar:u,shards:p,noRelative:m,noIsolation:x,inert:l,setCallbacks:a,allowPinchZoom:!!v,lockRef:n,gapMode:C}),i?c.cloneElement(c.Children.only(s),S(S({},b),{ref:M})):c.createElement(E,S({},b,{className:f,ref:M}),s))});ee.defaultProps={enabled:!0,removeScrollBar:!0,inert:!1};ee.classNames={fullWidth:Y,zeroRight:X};var pn=function(){if(typeof __webpack_nonce__<"u")return __webpack_nonce__};function vn(){if(!document)return null;var e=document.createElement("style");e.type="text/css";var t=pn();return t&&e.setAttribute("nonce",t),e}function yn(e,t){e.styleSheet?e.styleSheet.cssText=t:e.appendChild(document.createTextNode(t))}function mn(e){var t=document.head||document.getElementsByTagName("head")[0];t.appendChild(e)}var gn=function(){var e=0,t=null;return{add:function(n){e==0&&(t=vn())&&(yn(t,n),mn(t)),e++},remove:function(){e--,!e&&t&&(t.parentNode&&t.parentNode.removeChild(t),t=null)}}},kn=function(){var e=gn();return function(t,n){c.useEffect(function(){return e.add(t),function(){e.remove()}},[t&&n])}},Ze=function(){var e=kn(),t=function(n){var r=n.styles,o=n.dynamic;return e(r,o),null};return t},En={left:0,top:0,right:0,gap:0},ue=function(e){return parseInt(e||"",10)||0},Cn=function(e){var t=window.getComputedStyle(document.body),n=t[e==="padding"?"paddingLeft":"marginLeft"],r=t[e==="padding"?"paddingTop":"marginTop"],o=t[e==="padding"?"paddingRight":"marginRight"];return[ue(n),ue(r),ue(o)]},_n=function(e){if(e===void 0&&(e="margin"),typeof window>"u")return En;var t=Cn(e),n=document.documentElement.clientWidth,r=window.innerWidth;return{left:t[0],top:t[1],right:t[2],gap:Math.max(0,r-n+t[2]-t[0])}},bn=Ze(),j="data-scroll-locked",xn=function(e,t,n,r){var o=e.left,a=e.top,i=e.right,s=e.gap;return n===void 0&&(n="margin"),`
  .`.concat(on,` {
   overflow: hidden `).concat(r,`;
   padding-right: `).concat(s,"px ").concat(r,`;
  }
  body[`).concat(j,`] {
    overflow: hidden `).concat(r,`;
    overscroll-behavior: contain;
    `).concat([t&&"position: relative ".concat(r,";"),n==="margin"&&`
    padding-left: `.concat(o,`px;
    padding-top: `).concat(a,`px;
    padding-right: `).concat(i,`px;
    margin-left:0;
    margin-top:0;
    margin-right: `).concat(s,"px ").concat(r,`;
    `),n==="padding"&&"padding-right: ".concat(s,"px ").concat(r,";")].filter(Boolean).join(""),`
  }
  
  .`).concat(X,` {
    right: `).concat(s,"px ").concat(r,`;
  }
  
  .`).concat(Y,` {
    margin-right: `).concat(s,"px ").concat(r,`;
  }
  
  .`).concat(X," .").concat(X,` {
    right: 0 `).concat(r,`;
  }
  
  .`).concat(Y," .").concat(Y,` {
    margin-right: 0 `).concat(r,`;
  }
  
  body[`).concat(j,`] {
    `).concat(an,": ").concat(s,`px;
  }
`)},Se=function(){var e=parseInt(document.body.getAttribute(j)||"0",10);return isFinite(e)?e:0},wn=function(){c.useEffect(function(){return document.body.setAttribute(j,(Se()+1).toString()),function(){var e=Se()-1;e<=0?document.body.removeAttribute(j):document.body.setAttribute(j,e.toString())}},[])},Mn=function(e){var t=e.noRelative,n=e.noImportant,r=e.gapMode,o=r===void 0?"margin":r;wn();var a=c.useMemo(function(){return _n(o)},[o]);return c.createElement(bn,{styles:xn(a,!t,o,n?"":"!important")})},he=!1;if(typeof window<"u")try{var V=Object.defineProperty({},"passive",{get:function(){return he=!0,!0}});window.addEventListener("test",V,V),window.removeEventListener("test",V,V)}catch{he=!1}var L=he?{passive:!1}:!1,Nn=function(e){return e.tagName==="TEXTAREA"},Ge=function(e,t){if(!(e instanceof Element))return!1;var n=window.getComputedStyle(e);return n[t]!=="hidden"&&!(n.overflowY===n.overflowX&&!Nn(e)&&n[t]==="visible")},Sn=function(e){return Ge(e,"overflowY")},Rn=function(e){return Ge(e,"overflowX")},Re=function(e,t){var n=t.ownerDocument,r=t;do{typeof ShadowRoot<"u"&&r instanceof ShadowRoot&&(r=r.host);var o=Xe(e,r);if(o){var a=Ye(e,r),i=a[1],s=a[2];if(i>s)return!0}r=r.parentNode}while(r&&r!==n.body);return!1},An=function(e){var t=e.scrollTop,n=e.scrollHeight,r=e.clientHeight;return[t,n,r]},Pn=function(e){var t=e.scrollLeft,n=e.scrollWidth,r=e.clientWidth;return[t,n,r]},Xe=function(e,t){return e==="v"?Sn(t):Rn(t)},Ye=function(e,t){return e==="v"?An(t):Pn(t)},On=function(e,t){return e==="h"&&t==="rtl"?-1:1},Dn=function(e,t,n,r,o){var a=On(e,window.getComputedStyle(t).direction),i=a*r,s=n.target,f=t.contains(s),u=!1,d=i>0,p=0,y=0;do{if(!s)break;var m=Ye(e,s),x=m[0],l=m[1],v=m[2],g=l-v-a*x;(x||g)&&Xe(e,s)&&(p+=g,y+=x);var E=s.parentNode;s=E&&E.nodeType===Node.DOCUMENT_FRAGMENT_NODE?E.host:E}while(!f&&s!==document.body||f&&(t.contains(s)||t===s));return(d&&Math.abs(p)<1||!d&&Math.abs(y)<1)&&(u=!0),u},K=function(e){return"changedTouches"in e?[e.changedTouches[0].clientX,e.changedTouches[0].clientY]:[0,0]},Ae=function(e){return[e.deltaX,e.deltaY]},Pe=function(e){return e&&"current"in e?e.current:e},Tn=function(e,t){return e[0]===t[0]&&e[1]===t[1]},In=function(e){return`
  .block-interactivity-`.concat(e,` {pointer-events: none;}
  .allow-interactivity-`).concat(e,` {pointer-events: all;}
`)},Ln=0,$=[];function $n(e){var t=c.useRef([]),n=c.useRef([0,0]),r=c.useRef(),o=c.useState(Ln++)[0],a=c.useState(Ze)[0],i=c.useRef(e);c.useEffect(function(){i.current=e},[e]),c.useEffect(function(){if(e.inert){document.body.classList.add("block-interactivity-".concat(o));var l=rn([e.lockRef.current],(e.shards||[]).map(Pe),!0).filter(Boolean);return l.forEach(function(v){return v.classList.add("allow-interactivity-".concat(o))}),function(){document.body.classList.remove("block-interactivity-".concat(o)),l.forEach(function(v){return v.classList.remove("allow-interactivity-".concat(o))})}}},[e.inert,e.lockRef.current,e.shards]);var s=c.useCallback(function(l,v){if("touches"in l&&l.touches.length===2||l.type==="wheel"&&l.ctrlKey)return!i.current.allowPinchZoom;var g=K(l),E=n.current,C="deltaX"in l?l.deltaX:E[0]-g[0],_="deltaY"in l?l.deltaY:E[1]-g[1],w,M=l.target,b=Math.abs(C)>Math.abs(_)?"h":"v";if("touches"in l&&b==="h"&&M.type==="range")return!1;var R=Re(b,M);if(!R)return!0;if(R?w=b:(w=b==="v"?"h":"v",R=Re(b,M)),!R)return!1;if(!r.current&&"changedTouches"in l&&(C||_)&&(r.current=w),!w)return!0;var W=r.current||w;return Dn(W,v,l,W==="h"?C:_)},[]),f=c.useCallback(function(l){var v=l;if(!(!$.length||$[$.length-1]!==a)){var g="deltaY"in v?Ae(v):K(v),E=t.current.filter(function(w){return w.name===v.type&&(w.target===v.target||v.target===w.shadowParent)&&Tn(w.delta,g)})[0];if(E&&E.should){v.cancelable&&v.preventDefault();return}if(!E){var C=(i.current.shards||[]).map(Pe).filter(Boolean).filter(function(w){return w.contains(v.target)}),_=C.length>0?s(v,C[0]):!i.current.noIsolation;_&&v.cancelable&&v.preventDefault()}}},[]),u=c.useCallback(function(l,v,g,E){var C={name:l,delta:v,target:g,should:E,shadowParent:Fn(g)};t.current.push(C),setTimeout(function(){t.current=t.current.filter(function(_){return _!==C})},1)},[]),d=c.useCallback(function(l){n.current=K(l),r.current=void 0},[]),p=c.useCallback(function(l){u(l.type,Ae(l),l.target,s(l,e.lockRef.current))},[]),y=c.useCallback(function(l){u(l.type,K(l),l.target,s(l,e.lockRef.current))},[]);c.useEffect(function(){return $.push(a),e.setCallbacks({onScrollCapture:p,onWheelCapture:p,onTouchMoveCapture:y}),document.addEventListener("wheel",f,L),document.addEventListener("touchmove",f,L),document.addEventListener("touchstart",d,L),function(){$=$.filter(function(l){return l!==a}),document.removeEventListener("wheel",f,L),document.removeEventListener("touchmove",f,L),document.removeEventListener("touchstart",d,L)}},[]);var m=e.removeScrollBar,x=e.inert;return c.createElement(c.Fragment,null,x?c.createElement(a,{styles:In(o)}):null,m?c.createElement(Mn,{noRelative:e.noRelative,gapMode:e.gapMode}):null)}function Fn(e){for(var t=null;e!==null;)e instanceof ShadowRoot&&(t=e.host,e=e.host),e=e.parentNode;return t}const jn=hn(Ke,$n);var Je=c.forwardRef(function(e,t){return c.createElement(ee,S({},e,{ref:t,sideCar:jn}))});Je.classNames=ee.classNames;var Wn=function(e){if(typeof document>"u")return null;var t=Array.isArray(e)?e[0]:e;return t.ownerDocument.body},F=new WeakMap,Z=new WeakMap,G={},de=0,Qe=function(e){return e&&(e.host||Qe(e.parentNode))},Hn=function(e,t){return t.map(function(n){if(e.contains(n))return n;var r=Qe(n);return r&&e.contains(r)?r:(console.error("aria-hidden",n,"in not contained inside",e,". Doing nothing"),null)}).filter(function(n){return!!n})},qn=function(e,t,n,r){var o=Hn(t,Array.isArray(e)?e:[e]);G[n]||(G[n]=new WeakMap);var a=G[n],i=[],s=new Set,f=new Set(o),u=function(p){!p||s.has(p)||(s.add(p),u(p.parentNode))};o.forEach(u);var d=function(p){!p||f.has(p)||Array.prototype.forEach.call(p.children,function(y){if(s.has(y))d(y);else try{var m=y.getAttribute(r),x=m!==null&&m!=="false",l=(F.get(y)||0)+1,v=(a.get(y)||0)+1;F.set(y,l),a.set(y,v),i.push(y),l===1&&x&&Z.set(y,!0),v===1&&y.setAttribute(n,"true"),x||y.setAttribute(r,"true")}catch(g){console.error("aria-hidden: cannot operate on ",y,g)}})};return d(t),s.clear(),de++,function(){i.forEach(function(p){var y=F.get(p)-1,m=a.get(p)-1;F.set(p,y),a.set(p,m),y||(Z.has(p)||p.removeAttribute(r),Z.delete(p)),m||p.removeAttribute(n)}),de--,de||(F=new WeakMap,F=new WeakMap,Z=new WeakMap,G={})}},zn=function(e,t,n){n===void 0&&(n="data-aria-hidden");var r=Array.from(Array.isArray(e)?e:[e]),o=Wn(e);return o?(r.push.apply(r,Array.from(o.querySelectorAll("[aria-live], script"))),qn(r,o,n,"aria-hidden")):function(){return null}},te="Dialog",[et,Co]=$e(te),[Bn,N]=et(te),tt=e=>{const{__scopeDialog:t,children:n,open:r,defaultOpen:o,onOpenChange:a,modal:i=!0}=e,s=c.useRef(null),f=c.useRef(null),[u,d]=Pt({prop:r,defaultProp:o??!1,onChange:a,caller:te});return k.jsx(Bn,{scope:t,triggerRef:s,contentRef:f,contentId:oe(),titleId:oe(),descriptionId:oe(),open:u,onOpenChange:d,onOpenToggle:c.useCallback(()=>d(p=>!p),[d]),modal:i,children:n})};tt.displayName=te;var nt="DialogTrigger",rt=c.forwardRef((e,t)=>{const{__scopeDialog:n,...r}=e,o=N(nt,n),a=A(t,o.triggerRef);return k.jsx(P.button,{type:"button","aria-haspopup":"dialog","aria-expanded":o.open,"aria-controls":o.contentId,"data-state":ye(o.open),...r,ref:a,onClick:T(e.onClick,o.onOpenToggle)})});rt.displayName=nt;var pe="DialogPortal",[Un,ot]=et(pe,{forceMount:void 0}),at=e=>{const{__scopeDialog:t,forceMount:n,children:r,container:o}=e,a=N(pe,t);return k.jsx(Un,{scope:t,forceMount:n,children:c.Children.map(r,i=>k.jsx(Q,{present:n||a.open,children:k.jsx(Be,{asChild:!0,container:o,children:i})}))})};at.displayName=pe;var J="DialogOverlay",ct=c.forwardRef((e,t)=>{const n=ot(J,e.__scopeDialog),{forceMount:r=n.forceMount,...o}=e,a=N(J,e.__scopeDialog);return a.modal?k.jsx(Q,{present:r||a.open,children:k.jsx(Kn,{...o,ref:t})}):null});ct.displayName=J;var Vn=q("DialogOverlay.RemoveScroll"),Kn=c.forwardRef((e,t)=>{const{__scopeDialog:n,...r}=e,o=N(J,n);return k.jsx(Je,{as:Vn,allowPinchZoom:!0,shards:[o.contentRef],children:k.jsx(P.div,{"data-state":ye(o.open),...r,ref:t,style:{pointerEvents:"auto",...r.style}})})}),I="DialogContent",st=c.forwardRef((e,t)=>{const n=ot(I,e.__scopeDialog),{forceMount:r=n.forceMount,...o}=e,a=N(I,e.__scopeDialog);return k.jsx(Q,{present:r||a.open,children:a.modal?k.jsx(Zn,{...o,ref:t}):k.jsx(Gn,{...o,ref:t})})});st.displayName=I;var Zn=c.forwardRef((e,t)=>{const n=N(I,e.__scopeDialog),r=c.useRef(null),o=A(t,n.contentRef,r);return c.useEffect(()=>{const a=r.current;if(a)return zn(a)},[]),k.jsx(it,{...e,ref:o,trapFocus:n.open,disableOutsidePointerEvents:!0,onCloseAutoFocus:T(e.onCloseAutoFocus,a=>{a.preventDefault(),n.triggerRef.current?.focus()}),onPointerDownOutside:T(e.onPointerDownOutside,a=>{const i=a.detail.originalEvent,s=i.button===0&&i.ctrlKey===!0;(i.button===2||s)&&a.preventDefault()}),onFocusOutside:T(e.onFocusOutside,a=>a.preventDefault())})}),Gn=c.forwardRef((e,t)=>{const n=N(I,e.__scopeDialog),r=c.useRef(!1),o=c.useRef(!1);return k.jsx(it,{...e,ref:t,trapFocus:!1,disableOutsidePointerEvents:!1,onCloseAutoFocus:a=>{e.onCloseAutoFocus?.(a),a.defaultPrevented||(r.current||n.triggerRef.current?.focus(),a.preventDefault()),r.current=!1,o.current=!1},onInteractOutside:a=>{e.onInteractOutside?.(a),a.defaultPrevented||(r.current=!0,a.detail.originalEvent.type==="pointerdown"&&(o.current=!0));const i=a.target;n.triggerRef.current?.contains(i)&&a.preventDefault(),a.detail.originalEvent.type==="focusin"&&o.current&&a.preventDefault()}})}),it=c.forwardRef((e,t)=>{const{__scopeDialog:n,trapFocus:r,onOpenAutoFocus:o,onCloseAutoFocus:a,...i}=e,s=N(I,n),f=c.useRef(null),u=A(t,f);return nn(),k.jsxs(k.Fragment,{children:[k.jsx(qe,{asChild:!0,loop:!0,trapped:r,onMountAutoFocus:o,onUnmountAutoFocus:a,children:k.jsx(We,{role:"dialog",id:s.contentId,"aria-describedby":s.descriptionId,"aria-labelledby":s.titleId,"data-state":ye(s.open),...i,ref:u,onDismiss:()=>s.onOpenChange(!1)})}),k.jsxs(k.Fragment,{children:[k.jsx(Xn,{titleId:s.titleId}),k.jsx(Jn,{contentRef:f,descriptionId:s.descriptionId})]})]})}),ve="DialogTitle",lt=c.forwardRef((e,t)=>{const{__scopeDialog:n,...r}=e,o=N(ve,n);return k.jsx(P.h2,{id:o.titleId,...r,ref:t})});lt.displayName=ve;var ut="DialogDescription",dt=c.forwardRef((e,t)=>{const{__scopeDialog:n,...r}=e,o=N(ut,n);return k.jsx(P.p,{id:o.descriptionId,...r,ref:t})});dt.displayName=ut;var ft="DialogClose",ht=c.forwardRef((e,t)=>{const{__scopeDialog:n,...r}=e,o=N(ft,n);return k.jsx(P.button,{type:"button",...r,ref:t,onClick:T(e.onClick,()=>o.onOpenChange(!1))})});ht.displayName=ft;function ye(e){return e?"open":"closed"}var pt="DialogTitleWarning",[_o,vt]=Mt(pt,{contentName:I,titleName:ve,docsSlug:"dialog"}),Xn=({titleId:e})=>{const t=vt(pt),n=`\`${t.contentName}\` requires a \`${t.titleName}\` for the component to be accessible for screen reader users.

If you want to hide the \`${t.titleName}\`, you can wrap it with our VisuallyHidden component.

For more information, see https://radix-ui.com/primitives/docs/components/${t.docsSlug}`;return c.useEffect(()=>{e&&(document.getElementById(e)||console.error(n))},[n,e]),null},Yn="DialogDescriptionWarning",Jn=({contentRef:e,descriptionId:t})=>{const r=`Warning: Missing \`Description\` or \`aria-describedby={undefined}\` for {${vt(Yn).contentName}}.`;return c.useEffect(()=>{const o=e.current?.getAttribute("aria-describedby");t&&o&&(document.getElementById(t)||console.warn(r))},[r,e,t]),null},bo=tt,xo=rt,wo=at,Mo=ct,No=st,So=lt,Ro=dt,Ao=ht;/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Qn=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),er=e=>e.replace(/^([A-Z])|[\s-_]+(\w)/g,(t,n,r)=>r?r.toUpperCase():n.toLowerCase()),Oe=e=>{const t=er(e);return t.charAt(0).toUpperCase()+t.slice(1)},yt=(...e)=>e.filter((t,n,r)=>!!t&&t.trim()!==""&&r.indexOf(t)===n).join(" ").trim();/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var tr={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const nr=c.forwardRef(({color:e="currentColor",size:t=24,strokeWidth:n=2,absoluteStrokeWidth:r,className:o="",children:a,iconNode:i,...s},f)=>c.createElement("svg",{ref:f,...tr,width:t,height:t,stroke:e,strokeWidth:r?Number(n)*24/Number(t):n,className:yt("lucide",o),...s},[...i.map(([u,d])=>c.createElement(u,d)),...Array.isArray(a)?a:[a]]));/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const h=(e,t)=>{const n=c.forwardRef(({className:r,...o},a)=>c.createElement(nr,{ref:a,iconNode:t,className:yt(`lucide-${Qn(Oe(e))}`,`lucide-${e}`,r),...o}));return n.displayName=Oe(e),n};/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const rr=[["path",{d:"M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2",key:"169zse"}]],Po=h("activity",rr);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const or=[["rect",{width:"20",height:"5",x:"2",y:"3",rx:"1",key:"1wp1u1"}],["path",{d:"M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8",key:"1s80jp"}],["path",{d:"M10 12h4",key:"a56b0p"}]],Oo=h("archive",or);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ar=[["path",{d:"M12 5v14",key:"s699le"}],["path",{d:"m19 12-7 7-7-7",key:"1idqje"}]],Do=h("arrow-down",ar);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const cr=[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"m12 5 7 7-7 7",key:"xquz4c"}]],To=h("arrow-right",cr);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const sr=[["path",{d:"m5 12 7-7 7 7",key:"hav0vg"}],["path",{d:"M12 19V5",key:"x0mq9r"}]],Io=h("arrow-up",sr);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ir=[["path",{d:"m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526",key:"1yiouv"}],["circle",{cx:"12",cy:"8",r:"6",key:"1vp47v"}]],Lo=h("award",ir);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const lr=[["path",{d:"M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z",key:"1b4qmf"}],["path",{d:"M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2",key:"i71pzd"}],["path",{d:"M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2",key:"10jefs"}],["path",{d:"M10 6h4",key:"1itunk"}],["path",{d:"M10 10h4",key:"tcdvrf"}],["path",{d:"M10 14h4",key:"kelpxr"}],["path",{d:"M10 18h4",key:"1ulq68"}]],$o=h("building-2",lr);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ur=[["path",{d:"M8 6v6",key:"18i7km"}],["path",{d:"M15 6v6",key:"1sg6z9"}],["path",{d:"M2 12h19.6",key:"de5uta"}],["path",{d:"M18 18h3s.5-1.7.8-2.8c.1-.4.2-.8.2-1.2 0-.4-.1-.8-.2-1.2l-1.4-5C20.1 6.8 19.1 6 18 6H4a2 2 0 0 0-2 2v10h3",key:"1wwztk"}],["circle",{cx:"7",cy:"18",r:"2",key:"19iecd"}],["path",{d:"M9 18h5",key:"lrx6i"}],["circle",{cx:"16",cy:"18",r:"2",key:"1v4tcr"}]],Fo=h("bus",ur);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const dr=[["path",{d:"M8 2v4",key:"1cmpym"}],["path",{d:"M16 2v4",key:"4m81vk"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",key:"1hopcy"}],["path",{d:"M3 10h18",key:"8toen8"}]],jo=h("calendar",dr);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const fr=[["path",{d:"M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2",key:"5owen"}],["circle",{cx:"7",cy:"17",r:"2",key:"u2ysq9"}],["path",{d:"M9 17h6",key:"r8uit2"}],["circle",{cx:"17",cy:"17",r:"2",key:"axvx0g"}]],Wo=h("car",fr);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const hr=[["path",{d:"M3 3v16a2 2 0 0 0 2 2h16",key:"c24i48"}],["path",{d:"M18 17V9",key:"2bz60n"}],["path",{d:"M13 17V5",key:"1frdt8"}],["path",{d:"M8 17v-3",key:"17ska0"}]],Ho=h("chart-column",hr);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const pr=[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]],qo=h("check",pr);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const vr=[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]],zo=h("chevron-down",vr);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const yr=[["path",{d:"m15 18-6-6 6-6",key:"1wnfg3"}]],Bo=h("chevron-left",yr);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const mr=[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]],Uo=h("chevron-right",mr);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const gr=[["path",{d:"m18 15-6-6-6 6",key:"153udz"}]],Vo=h("chevron-up",gr);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const kr=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["line",{x1:"12",x2:"12",y1:"8",y2:"12",key:"1pkeuh"}],["line",{x1:"12",x2:"12.01",y1:"16",y2:"16",key:"4dfq90"}]],Ko=h("circle-alert",kr);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Er=[["path",{d:"M21.801 10A10 10 0 1 1 17 3.335",key:"yps3ct"}],["path",{d:"m9 11 3 3L22 4",key:"1pflzl"}]],Zo=h("circle-check-big",Er);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Cr=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["line",{x1:"10",x2:"10",y1:"15",y2:"9",key:"c1nkhi"}],["line",{x1:"14",x2:"14",y1:"15",y2:"9",key:"h65svq"}]],Go=h("circle-pause",Cr);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _r=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["polygon",{points:"10 8 16 12 10 16 10 8",key:"1cimsy"}]],Xo=h("circle-play",_r);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const br=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m15 9-6 6",key:"1uzhvr"}],["path",{d:"m9 9 6 6",key:"z0biqf"}]],Yo=h("circle-x",br);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const xr=[["rect",{width:"8",height:"4",x:"8",y:"2",rx:"1",ry:"1",key:"tgr4d6"}],["path",{d:"M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2",key:"116196"}]],Jo=h("clipboard",xr);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const wr=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["polyline",{points:"12 6 12 12 16 14",key:"68esgv"}]],Qo=h("clock",wr);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Mr=[["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}],["polyline",{points:"7 10 12 15 17 10",key:"2ggqvy"}],["line",{x1:"12",x2:"12",y1:"15",y2:"3",key:"1vk2je"}]],ea=h("download",Mr);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Nr=[["path",{d:"M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",key:"1nclc0"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]],ta=h("eye",Nr);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Sr=[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",key:"1rqfz7"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["path",{d:"M10 9H8",key:"b1mrlr"}],["path",{d:"M16 13H8",key:"t4e002"}],["path",{d:"M16 17H8",key:"z1uh3a"}]],na=h("file-text",Sr);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Rr=[["path",{d:"M10 20a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341L21.74 4.67A1 1 0 0 0 21 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14z",key:"sc7q7i"}]],ra=h("funnel",Rr);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ar=[["path",{d:"M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z",key:"c3ymky"}],["path",{d:"M12 5 9.04 7.96a2.17 2.17 0 0 0 0 3.08c.82.82 2.13.85 3 .07l2.07-1.9a2.82 2.82 0 0 1 3.79 0l2.96 2.66",key:"4oyue0"}],["path",{d:"m18 15-2-2",key:"60u0ii"}],["path",{d:"m15 18-2-2",key:"6p76be"}]],oa=h("heart-handshake",Ar);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Pr=[["path",{d:"M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z",key:"c3ymky"}]],aa=h("heart",Pr);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Or=[["path",{d:"M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8",key:"5wwlr5"}],["path",{d:"M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",key:"1d0kgt"}]],ca=h("house",Or);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Dr=[["path",{d:"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4",key:"1uf3rs"}],["polyline",{points:"16 17 21 12 16 7",key:"1gabdz"}],["line",{x1:"21",x2:"9",y1:"12",y2:"12",key:"1uyos4"}]],sa=h("log-out",Dr);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Tr=[["rect",{width:"20",height:"16",x:"2",y:"4",rx:"2",key:"18n3k1"}],["path",{d:"m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7",key:"1ocrg3"}]],ia=h("mail",Tr);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ir=[["path",{d:"M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",key:"1r0f0z"}],["circle",{cx:"12",cy:"10",r:"3",key:"ilqhr7"}]],la=h("map-pin",Ir);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Lr=[["line",{x1:"4",x2:"20",y1:"12",y2:"12",key:"1e0a9i"}],["line",{x1:"4",x2:"20",y1:"6",y2:"6",key:"1owob3"}],["line",{x1:"4",x2:"20",y1:"18",y2:"18",key:"yk5zj1"}]],ua=h("menu",Lr);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $r=[["path",{d:"M7.9 20A9 9 0 1 0 4 16.1L2 22Z",key:"vv11sd"}]],da=h("message-circle",$r);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Fr=[["path",{d:"M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",key:"1lielz"}]],fa=h("message-square",Fr);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const jr=[["path",{d:"M6 18h8",key:"1borvv"}],["path",{d:"M3 22h18",key:"8prr45"}],["path",{d:"M14 22a7 7 0 1 0 0-14h-1",key:"1jwaiy"}],["path",{d:"M9 14h2",key:"197e7h"}],["path",{d:"M9 12a2 2 0 0 1-2-2V6h6v4a2 2 0 0 1-2 2Z",key:"1bmzmy"}],["path",{d:"M12 6V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3",key:"1drr47"}]],ha=h("microscope",jr);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Wr=[["path",{d:"M5 3v16h16",key:"1mqmf9"}],["path",{d:"m5 19 6-6",key:"jh6hbb"}],["path",{d:"m2 6 3-3 3 3",key:"tkyvxa"}],["path",{d:"m18 16 3 3-3 3",key:"1d4glt"}]],pa=h("move-3d",Wr);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Hr=[["polygon",{points:"3 11 22 2 13 21 11 13 3 11",key:"1ltx0t"}]],va=h("navigation",Hr);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const qr=[["path",{d:"M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z",key:"1a0edw"}],["path",{d:"M12 22V12",key:"d0xqtd"}],["polyline",{points:"3.29 7 12 12 20.71 7",key:"ousv84"}],["path",{d:"m7.5 4.27 9 5.15",key:"1c824w"}]],ya=h("package",qr);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const zr=[["path",{d:"M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z",key:"foiqr5"}]],ma=h("phone",zr);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Br=[["path",{d:"m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z",key:"wa1lgi"}],["path",{d:"m8.5 8.5 7 7",key:"rvfmvr"}]],ga=h("pill",Br);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ur=[["polygon",{points:"6 3 20 12 6 21 6 3",key:"1oa8hb"}]],ka=h("play",Ur);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Vr=[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]],Ea=h("plus",Vr);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Kr=[["path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",key:"v9h5vc"}],["path",{d:"M21 3v5h-5",key:"1q7to0"}],["path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",key:"3uifl3"}],["path",{d:"M8 16H3v5",key:"1cv678"}]],Ca=h("refresh-cw",Kr);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Zr=[["path",{d:"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",key:"1357e3"}],["path",{d:"M3 3v5h5",key:"1xhq8a"}]],_a=h("rotate-ccw",Zr);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Gr=[["path",{d:"M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z",key:"1c8476"}],["path",{d:"M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7",key:"1ydtos"}],["path",{d:"M7 3v4a1 1 0 0 0 1 1h7",key:"t51u73"}]],ba=h("save",Gr);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Xr=[["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}],["path",{d:"m21 21-4.3-4.3",key:"1qie3q"}]],xa=h("search",Xr);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Yr=[["path",{d:"M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z",key:"1qme2f"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]],wa=h("settings",Yr);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Jr=[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}]],Ma=h("shield",Jr);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Qr=[["circle",{cx:"8",cy:"21",r:"1",key:"jimo8o"}],["circle",{cx:"19",cy:"21",r:"1",key:"13723u"}],["path",{d:"M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12",key:"9zh506"}]],Na=h("shopping-cart",Qr);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const eo=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M8 14s1.5 2 4 2 4-2 4-2",key:"1y1vjs"}],["line",{x1:"9",x2:"9.01",y1:"9",y2:"9",key:"yxxnd0"}],["line",{x1:"15",x2:"15.01",y1:"9",y2:"9",key:"1p4y9e"}]],Sa=h("smile",eo);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const to=[["path",{d:"M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z",key:"4pj2yx"}],["path",{d:"M20 3v4",key:"1olli1"}],["path",{d:"M22 5h-4",key:"1gvqau"}],["path",{d:"M4 17v2",key:"vumght"}],["path",{d:"M5 18H3",key:"zchphs"}]],Ra=h("sparkles",to);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const no=[["path",{d:"M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7",key:"1m0v6g"}],["path",{d:"M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z",key:"ohrbg2"}]],Aa=h("square-pen",no);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ro=[["path",{d:"M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z",key:"r04s7s"}]],Pa=h("star",ro);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const oo=[["path",{d:"M11 2v2",key:"1539x4"}],["path",{d:"M5 2v2",key:"1yf1q8"}],["path",{d:"M5 3H4a2 2 0 0 0-2 2v4a6 6 0 0 0 12 0V5a2 2 0 0 0-2-2h-1",key:"rb5t3r"}],["path",{d:"M8 15a6 6 0 0 0 12 0v-3",key:"x18d4x"}],["circle",{cx:"20",cy:"10",r:"2",key:"ts1r5v"}]],Oa=h("stethoscope",oo);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ao=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["circle",{cx:"12",cy:"12",r:"6",key:"1vlfrh"}],["circle",{cx:"12",cy:"12",r:"2",key:"1c9p78"}]],Da=h("target",ao);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const co=[["rect",{width:"16",height:"16",x:"4",y:"3",rx:"2",key:"1wxw4b"}],["path",{d:"M4 11h16",key:"mpoxn0"}],["path",{d:"M12 3v8",key:"1h2ygw"}],["path",{d:"m8 19-2 3",key:"13i0xs"}],["path",{d:"m18 22-2-3",key:"1p0ohu"}],["path",{d:"M8 15h.01",key:"a7atzg"}],["path",{d:"M16 15h.01",key:"rnfrdf"}]],Ta=h("tram-front",co);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const so=[["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6",key:"4alrt4"}],["path",{d:"M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2",key:"v07s0e"}],["line",{x1:"10",x2:"10",y1:"11",y2:"17",key:"1uufr5"}],["line",{x1:"14",x2:"14",y1:"11",y2:"17",key:"xtxkd"}]],Ia=h("trash-2",so);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const io=[["polyline",{points:"22 17 13.5 8.5 8.5 13.5 2 7",key:"1r2t7k"}],["polyline",{points:"16 17 22 17 22 11",key:"11uiuu"}]],La=h("trending-down",io);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const lo=[["polyline",{points:"22 7 13.5 15.5 8.5 10.5 2 17",key:"126l90"}],["polyline",{points:"16 7 22 7 22 13",key:"kwv8wd"}]],$a=h("trending-up",lo);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const uo=[["path",{d:"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",key:"wmoenq"}],["path",{d:"M12 9v4",key:"juzpu7"}],["path",{d:"M12 17h.01",key:"p32p05"}]],Fa=h("triangle-alert",uo);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const fo=[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}],["polyline",{points:"16 11 18 13 22 9",key:"1pwet4"}]],ja=h("user-check",fo);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ho=[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}],["line",{x1:"17",x2:"22",y1:"8",y2:"13",key:"3nzzx3"}],["line",{x1:"22",x2:"17",y1:"8",y2:"13",key:"1swrse"}]],Wa=h("user-x",ho);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const po=[["path",{d:"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2",key:"975kel"}],["circle",{cx:"12",cy:"7",r:"4",key:"17ys0d"}]],Ha=h("user",po);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const vo=[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}],["path",{d:"M22 21v-2a4 4 0 0 0-3-3.87",key:"kshegd"}],["path",{d:"M16 3.13a4 4 0 0 1 0 7.75",key:"1da9ce"}]],qa=h("users",vo);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const yo=[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]],za=h("x",yo);/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const mo=[["path",{d:"M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",key:"1xq2db"}]],Ba=h("zap",mo);function Ua(e){const t=e+"CollectionProvider",[n,r]=$e(t),[o,a]=n(t,{collectionRef:{current:null},itemMap:new Map}),i=l=>{const{scope:v,children:g}=l,E=O.useRef(null),C=O.useRef(new Map).current;return k.jsx(o,{scope:v,itemMap:C,collectionRef:E,children:g})};i.displayName=t;const s=e+"CollectionSlot",f=q(s),u=O.forwardRef((l,v)=>{const{scope:g,children:E}=l,C=a(s,g),_=A(v,C.collectionRef);return k.jsx(f,{ref:_,children:E})});u.displayName=s;const d=e+"CollectionItemSlot",p="data-radix-collection-item",y=q(d),m=O.forwardRef((l,v)=>{const{scope:g,children:E,...C}=l,_=O.useRef(null),w=A(v,_),M=a(d,g);return O.useEffect(()=>(M.itemMap.set(_,{ref:_,...C}),()=>void M.itemMap.delete(_))),k.jsx(y,{[p]:"",ref:w,children:E})});m.displayName=d;function x(l){const v=a(e+"CollectionConsumer",l);return O.useCallback(()=>{const E=v.collectionRef.current;if(!E)return[];const C=Array.from(E.querySelectorAll(`[${p}]`));return Array.from(v.itemMap.values()).sort((M,b)=>C.indexOf(M.ref.current)-C.indexOf(b.ref.current))},[v.collectionRef,v.itemMap])}return[{Provider:i,Slot:u,ItemSlot:m},x,r]}var go=c.createContext(void 0);function Va(e){const t=c.useContext(go);return e||t||"ltr"}export{Q as $,To as A,$o as B,No as C,Ro as D,ca as E,Da as F,ta as G,aa as H,P as I,$e as J,Ua as K,oe as L,la as M,va as N,Mo as O,wo as P,T as Q,bo as R,Eo as S,xo as T,Ha as U,A as V,Va as W,za as X,Pt as Y,Ba as Z,B as _,Ao as a,z as a0,qo as a1,Fa as a2,Ca as a3,Fe as a4,Be as a5,zn as a6,nn as a7,Je as a8,q as a9,Io as aA,Do as aB,Go as aC,na as aD,Na as aE,Jo as aF,La as aG,ga as aH,Oo as aI,qe as aa,We as ab,Vo as ac,ea as ad,Ea as ae,Ho as af,ra as ag,ja as ah,Aa as ai,Ia as aj,xa as ak,ia as al,ba as am,fa as an,Yo as ao,Wa as ap,sa as aq,ya as ar,Wo as as,Fo as at,Ta as au,pa as av,ka as aw,_a as ax,$a as ay,Ko as az,So as b,O as c,ma as d,Qo as e,zo as f,Oa as g,jo as h,wa as i,k as j,ua as k,da as l,Ma as m,Sa as n,Ra as o,Xo as p,Bo as q,c as r,Uo as s,Lo as t,qa as u,Po as v,Zo as w,Pa as x,ha as y,oa as z};
