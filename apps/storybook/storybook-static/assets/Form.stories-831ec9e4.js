import{r as k,R as A}from"./index-76fb7be0.js";import"./_commonjsHelpers-de833af9.js";var At={exports:{}},ke={};/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var sr=k,nr=Symbol.for("react.element"),ir=Symbol.for("react.fragment"),lr=Object.prototype.hasOwnProperty,ar=sr.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,ur={key:!0,ref:!0,__self:!0,__source:!0};function jt(e,r,t){var i,s={},a=null,c=null;t!==void 0&&(a=""+t),r.key!==void 0&&(a=""+r.key),r.ref!==void 0&&(c=r.ref);for(i in r)lr.call(r,i)&&!ur.hasOwnProperty(i)&&(s[i]=r[i]);if(e&&e.defaultProps)for(i in r=e.defaultProps,r)s[i]===void 0&&(s[i]=r[i]);return{$$typeof:nr,type:e,key:a,ref:c,props:s,_owner:ar.current}}ke.Fragment=ir;ke.jsx=jt;ke.jsxs=jt;At.exports=ke;var d=At.exports,me=e=>e.type==="checkbox",re=e=>e instanceof Date,U=e=>e==null;const wt=e=>typeof e=="object";var P=e=>!U(e)&&!Array.isArray(e)&&wt(e)&&!re(e),kt=e=>P(e)&&e.target?me(e.target)?e.target.checked:e.target.value:e,or=e=>e.substring(0,e.search(/\.\d+(\.|$)/))||e,Et=(e,r)=>e.has(or(r)),ye=e=>Array.isArray(e)?e.filter(Boolean):[],T=e=>e===void 0,f=(e,r,t)=>{if(!r||!P(e))return t;const i=ye(r.split(/[,[\].]+?/)).reduce((s,a)=>U(s)?s:s[a],e);return T(i)||i===e?T(e[r])?t:e[r]:i};const Ve={BLUR:"blur",FOCUS_OUT:"focusout",CHANGE:"change"},q={onBlur:"onBlur",onChange:"onChange",onSubmit:"onSubmit",onTouched:"onTouched",all:"all"},z={max:"max",min:"min",maxLength:"maxLength",minLength:"minLength",pattern:"pattern",required:"required",validate:"validate"},Tt=A.createContext(null),Ee=()=>A.useContext(Tt),dr=e=>{const{children:r,...t}=e;return A.createElement(Tt.Provider,{value:t},r)};var Ot=(e,r,t,i=!0)=>{const s={defaultValues:r._defaultValues};for(const a in e)Object.defineProperty(s,a,{get:()=>{const c=a;return r._proxyFormState[c]!==q.all&&(r._proxyFormState[c]=!i||q.all),t&&(t[c]=!0),e[c]}});return s},W=e=>P(e)&&!Object.keys(e).length,Pt=(e,r,t,i)=>{t(e);const{name:s,...a}=e;return W(a)||Object.keys(a).length>=Object.keys(r).length||Object.keys(a).find(c=>r[c]===(!i||q.all))},_e=e=>Array.isArray(e)?e:[e],Rt=(e,r,t)=>t&&r?e===r:!e||!r||e===r||_e(e).some(i=>i&&(i.startsWith(r)||r.startsWith(i)));function Ie(e){const r=A.useRef(e);r.current=e,A.useEffect(()=>{const t=!e.disabled&&r.current.subject.subscribe({next:r.current.next});return()=>{t&&t.unsubscribe()}},[e.disabled])}function cr(e){const r=Ee(),{control:t=r.control,disabled:i,name:s,exact:a}=e||{},[c,y]=A.useState(t._formState),b=A.useRef(!0),g=A.useRef({isDirty:!1,isLoading:!1,dirtyFields:!1,touchedFields:!1,isValidating:!1,isValid:!1,errors:!1}),F=A.useRef(s);return F.current=s,Ie({disabled:i,next:V=>b.current&&Rt(F.current,V.name,a)&&Pt(V,g.current,t._updateFormState)&&y({...t._formState,...V}),subject:t._subjects.state}),A.useEffect(()=>{b.current=!0;const V=t._proxyFormState.isDirty&&t._getDirty();return V!==t._formState.isDirty&&t._subjects.state.next({isDirty:V}),g.current.isValid&&t._updateValid(!0),()=>{b.current=!1}},[t]),Ot(c,t,g.current,!1)}var H=e=>typeof e=="string",Lt=(e,r,t,i,s)=>H(e)?(i&&r.watch.add(e),f(t,e,s)):Array.isArray(e)?e.map(a=>(i&&r.watch.add(a),f(t,a))):(i&&(r.watchAll=!0),t),fr=e=>{const r=e.constructor&&e.constructor.prototype;return P(r)&&r.hasOwnProperty("isPrototypeOf")},qe=typeof window<"u"&&typeof window.HTMLElement<"u"&&typeof document<"u";function Q(e){let r;const t=Array.isArray(e);if(e instanceof Date)r=new Date(e);else if(e instanceof Set)r=new Set(e);else if(!(qe&&(e instanceof Blob||e instanceof FileList))&&(t||P(e)))if(r=t?[]:{},!Array.isArray(e)&&!fr(e))r=e;else for(const i in e)r[i]=Q(e[i]);else return e;return r}function mr(e){const r=Ee(),{control:t=r.control,name:i,defaultValue:s,disabled:a,exact:c}=e||{},y=A.useRef(i);y.current=i,Ie({disabled:a,subject:t._subjects.watch,next:F=>{Rt(y.current,F.name,c)&&g(Q(Lt(y.current,t._names,F.values||t._formValues,!1,s)))}});const[b,g]=A.useState(t._getWatch(i,s));return A.useEffect(()=>t._removeUnmounted()),b}function yr(e){const r=Ee(),{name:t,control:i=r.control,shouldUnregister:s}=e,a=Et(i._names.array,t),c=mr({control:i,name:t,defaultValue:f(i._formValues,t,f(i._defaultValues,t,e.defaultValue)),exact:!0}),y=cr({control:i,name:t}),b=A.useRef(i.register(t,{...e.rules,value:c}));return A.useEffect(()=>{const g=(F,V)=>{const D=f(i._fields,F);D&&(D._f.mount=V)};return g(t,!0),()=>{const F=i._options.shouldUnregister||s;(a?F&&!i._stateFlags.action:F)?i.unregister(t):g(t,!1)}},[t,i,a,s]),{field:{name:t,value:c,onChange:A.useCallback(g=>b.current.onChange({target:{value:kt(g),name:t},type:Ve.CHANGE}),[t]),onBlur:A.useCallback(()=>b.current.onBlur({target:{value:f(i._formValues,t),name:t},type:Ve.BLUR}),[t,i]),ref:g=>{const F=f(i._fields,t);F&&g&&(F._f.ref={focus:()=>g.focus(),select:()=>g.select(),setCustomValidity:V=>g.setCustomValidity(V),reportValidity:()=>g.reportValidity()})}},formState:y,fieldState:Object.defineProperties({},{invalid:{enumerable:!0,get:()=>!!f(y.errors,t)},isDirty:{enumerable:!0,get:()=>!!f(y.dirtyFields,t)},isTouched:{enumerable:!0,get:()=>!!f(y.touchedFields,t)},error:{enumerable:!0,get:()=>f(y.errors,t)}})}}const gr=e=>e.render(yr(e));var hr=(e,r,t,i,s)=>r?{...t[e],types:{...t[e]&&t[e].types?t[e].types:{},[i]:s||!0}}:{},Je=e=>/^\w*$/.test(e),Nt=e=>ye(e.replace(/["|']|\]/g,"").split(/\.|\[/));function C(e,r,t){let i=-1;const s=Je(r)?[r]:Nt(r),a=s.length,c=a-1;for(;++i<a;){const y=s[i];let b=t;if(i!==c){const g=e[y];b=P(g)||Array.isArray(g)?g:isNaN(+s[i+1])?{}:[]}e[y]=b,e=e[y]}return e}const We=(e,r,t)=>{for(const i of t||Object.keys(e)){const s=f(e,i);if(s){const{_f:a,...c}=s;if(a&&r(a.name)){if(a.ref.focus){a.ref.focus();break}else if(a.refs&&a.refs[0].focus){a.refs[0].focus();break}}else P(c)&&We(c,r)}}};var tt=e=>({isOnSubmit:!e||e===q.onSubmit,isOnBlur:e===q.onBlur,isOnChange:e===q.onChange,isOnAll:e===q.all,isOnTouch:e===q.onTouched}),rt=(e,r,t)=>!t&&(r.watchAll||r.watch.has(e)||[...r.watch].some(i=>e.startsWith(i)&&/^\.\w+/.test(e.slice(i.length)))),pr=(e,r,t)=>{const i=ye(f(e,t));return C(i,"root",r[t]),C(e,t,i),e},se=e=>typeof e=="boolean",$e=e=>e.type==="file",ne=e=>typeof e=="function",De=e=>{if(!qe)return!1;const r=e?e.ownerDocument:0;return e instanceof(r&&r.defaultView?r.defaultView.HTMLElement:HTMLElement)},Se=e=>H(e)||A.isValidElement(e),He=e=>e.type==="radio",Ce=e=>e instanceof RegExp;const st={value:!1,isValid:!1},nt={value:!0,isValid:!0};var Ut=e=>{if(Array.isArray(e)){if(e.length>1){const r=e.filter(t=>t&&t.checked&&!t.disabled).map(t=>t.value);return{value:r,isValid:!!r.length}}return e[0].checked&&!e[0].disabled?e[0].attributes&&!T(e[0].attributes.value)?T(e[0].value)||e[0].value===""?nt:{value:e[0].value,isValid:!0}:nt:st}return st};const it={isValid:!1,value:null};var Mt=e=>Array.isArray(e)?e.reduce((r,t)=>t&&t.checked&&!t.disabled?{isValid:!0,value:t.value}:r,it):it;function lt(e,r,t="validate"){if(Se(e)||Array.isArray(e)&&e.every(Se)||se(e)&&!e)return{type:t,message:Se(e)?e:"",ref:r}}var te=e=>P(e)&&!Ce(e)?e:{value:e,message:""},at=async(e,r,t,i,s)=>{const{ref:a,refs:c,required:y,maxLength:b,minLength:g,min:F,max:V,pattern:D,validate:v,name:N,valueAsNumber:B,mount:ge,disabled:Te}=e._f,x=f(r,N);if(!ge||Te)return{};const I=c?c[0]:a,Y=S=>{i&&I.reportValidity&&(I.setCustomValidity(se(S)?"":S||""),I.reportValidity())},O={},ue=He(a),oe=me(a),Oe=ue||oe,J=(B||$e(a))&&T(a.value)&&T(x)||De(a)&&a.value===""||x===""||Array.isArray(x)&&!x.length,X=hr.bind(null,N,t,O),K=(S,_,w,M=z.maxLength,G=z.minLength)=>{const $=S?_:w;O[N]={type:S?M:G,message:$,ref:a,...X(S?M:G,$)}};if(s?!Array.isArray(x)||!x.length:y&&(!Oe&&(J||U(x))||se(x)&&!x||oe&&!Ut(c).isValid||ue&&!Mt(c).isValid)){const{value:S,message:_}=Se(y)?{value:!!y,message:y}:te(y);if(S&&(O[N]={type:z.required,message:_,ref:I,...X(z.required,_)},!t))return Y(_),O}if(!J&&(!U(F)||!U(V))){let S,_;const w=te(V),M=te(F);if(!U(x)&&!isNaN(x)){const G=a.valueAsNumber||x&&+x;U(w.value)||(S=G>w.value),U(M.value)||(_=G<M.value)}else{const G=a.valueAsDate||new Date(x),$=ce=>new Date(new Date().toDateString()+" "+ce),Z=a.type=="time",de=a.type=="week";H(w.value)&&x&&(S=Z?$(x)>$(w.value):de?x>w.value:G>new Date(w.value)),H(M.value)&&x&&(_=Z?$(x)<$(M.value):de?x<M.value:G<new Date(M.value))}if((S||_)&&(K(!!S,w.message,M.message,z.max,z.min),!t))return Y(O[N].message),O}if((b||g)&&!J&&(H(x)||s&&Array.isArray(x))){const S=te(b),_=te(g),w=!U(S.value)&&x.length>S.value,M=!U(_.value)&&x.length<_.value;if((w||M)&&(K(w,S.message,_.message),!t))return Y(O[N].message),O}if(D&&!J&&H(x)){const{value:S,message:_}=te(D);if(Ce(S)&&!x.match(S)&&(O[N]={type:z.pattern,message:_,ref:a,...X(z.pattern,_)},!t))return Y(_),O}if(v){if(ne(v)){const S=await v(x,r),_=lt(S,I);if(_&&(O[N]={..._,...X(z.validate,_.message)},!t))return Y(_.message),O}else if(P(v)){let S={};for(const _ in v){if(!W(S)&&!t)break;const w=lt(await v[_](x,r),I,_);w&&(S={...w,...X(_,w.message)},Y(w.message),t&&(O[N]=S))}if(!W(S)&&(O[N]={ref:I,...S},!t))return O}}return Y(!0),O};function br(e,r){const t=r.slice(0,-1).length;let i=0;for(;i<t;)e=T(e)?i++:e[r[i++]];return e}function vr(e){for(const r in e)if(!T(e[r]))return!1;return!0}function L(e,r){const t=Array.isArray(r)?r:Je(r)?[r]:Nt(r),i=t.length===1?e:br(e,t),s=t.length-1,a=t[s];return i&&delete i[a],s!==0&&(P(i)&&W(i)||Array.isArray(i)&&vr(i))&&L(e,t.slice(0,-1)),e}function Ue(){let e=[];return{get observers(){return e},next:s=>{for(const a of e)a.next(s)},subscribe:s=>(e.push(s),{unsubscribe:()=>{e=e.filter(a=>a!==s)}}),unsubscribe:()=>{e=[]}}}var Ae=e=>U(e)||!wt(e);function ee(e,r){if(Ae(e)||Ae(r))return e===r;if(re(e)&&re(r))return e.getTime()===r.getTime();const t=Object.keys(e),i=Object.keys(r);if(t.length!==i.length)return!1;for(const s of t){const a=e[s];if(!i.includes(s))return!1;if(s!=="ref"){const c=r[s];if(re(a)&&re(c)||P(a)&&P(c)||Array.isArray(a)&&Array.isArray(c)?!ee(a,c):a!==c)return!1}}return!0}var Bt=e=>e.type==="select-multiple",xr=e=>He(e)||me(e),Me=e=>De(e)&&e.isConnected,Gt=e=>{for(const r in e)if(ne(e[r]))return!0;return!1};function je(e,r={}){const t=Array.isArray(e);if(P(e)||t)for(const i in e)Array.isArray(e[i])||P(e[i])&&!Gt(e[i])?(r[i]=Array.isArray(e[i])?[]:{},je(e[i],r[i])):U(e[i])||(r[i]=!0);return r}function Wt(e,r,t){const i=Array.isArray(e);if(P(e)||i)for(const s in e)Array.isArray(e[s])||P(e[s])&&!Gt(e[s])?T(r)||Ae(t[s])?t[s]=Array.isArray(e[s])?je(e[s],[]):{...je(e[s])}:Wt(e[s],U(r)?{}:r[s],t[s]):ee(e[s],r[s])?delete t[s]:t[s]=!0;return t}var Be=(e,r)=>Wt(e,r,je(r)),It=(e,{valueAsNumber:r,valueAsDate:t,setValueAs:i})=>T(e)?e:r?e===""?NaN:e&&+e:t&&H(e)?new Date(e):i?i(e):e;function Ge(e){const r=e.ref;if(!(e.refs?e.refs.every(t=>t.disabled):r.disabled))return $e(r)?r.files:He(r)?Mt(e.refs).value:Bt(r)?[...r.selectedOptions].map(({value:t})=>t):me(r)?Ut(e.refs).value:It(T(r.value)?e.ref.value:r.value,e)}var Fr=(e,r,t,i)=>{const s={};for(const a of e){const c=f(r,a);c&&C(s,a,c._f)}return{criteriaMode:t,names:[...e],fields:s,shouldUseNativeValidation:i}},fe=e=>T(e)?e:Ce(e)?e.source:P(e)?Ce(e.value)?e.value.source:e.value:e,_r=e=>e.mount&&(e.required||e.min||e.max||e.maxLength||e.minLength||e.pattern||e.validate);function ut(e,r,t){const i=f(e,t);if(i||Je(t))return{error:i,name:t};const s=t.split(".");for(;s.length;){const a=s.join("."),c=f(r,a),y=f(e,a);if(c&&!Array.isArray(c)&&t!==a)return{name:t};if(y&&y.type)return{name:a,error:y};s.pop()}return{name:t}}var Sr=(e,r,t,i,s)=>s.isOnAll?!1:!t&&s.isOnTouch?!(r||e):(t?i.isOnBlur:s.isOnBlur)?!e:(t?i.isOnChange:s.isOnChange)?e:!0,Vr=(e,r)=>!ye(f(e,r)).length&&L(e,r);const Dr={mode:q.onSubmit,reValidateMode:q.onChange,shouldFocusError:!0};function Cr(e={},r){let t={...Dr,...e};const i=e.resetOptions&&e.resetOptions.keepDirtyValues;let s={submitCount:0,isDirty:!1,isLoading:!0,isValidating:!1,isSubmitted:!1,isSubmitting:!1,isSubmitSuccessful:!1,isValid:!1,touchedFields:{},dirtyFields:{},errors:{}},a={},c=P(t.defaultValues)?Q(t.defaultValues)||{}:{},y=t.shouldUnregister?{}:Q(c),b={action:!1,mount:!1,watch:!1},g={mount:new Set,unMount:new Set,array:new Set,watch:new Set},F,V=0;const D={isDirty:!1,dirtyFields:!1,touchedFields:!1,isValidating:!1,isValid:!1,errors:!1},v={watch:Ue(),array:Ue(),state:Ue()},N=tt(t.mode),B=tt(t.reValidateMode),ge=t.criteriaMode===q.all,Te=n=>l=>{clearTimeout(V),V=window.setTimeout(n,l)},x=async n=>{if(D.isValid||n){const l=t.resolver?W((await J()).errors):await K(a,!0);l!==s.isValid&&(s.isValid=l,v.state.next({isValid:l}))}},I=n=>D.isValidating&&v.state.next({isValidating:n}),Y=(n,l=[],u,m,h=!0,o=!0)=>{if(m&&u){if(b.action=!0,o&&Array.isArray(f(a,n))){const p=u(f(a,n),m.argA,m.argB);h&&C(a,n,p)}if(o&&Array.isArray(f(s.errors,n))){const p=u(f(s.errors,n),m.argA,m.argB);h&&C(s.errors,n,p),Vr(s.errors,n)}if(D.touchedFields&&o&&Array.isArray(f(s.touchedFields,n))){const p=u(f(s.touchedFields,n),m.argA,m.argB);h&&C(s.touchedFields,n,p)}D.dirtyFields&&(s.dirtyFields=Be(c,y)),v.state.next({name:n,isDirty:_(n,l),dirtyFields:s.dirtyFields,errors:s.errors,isValid:s.isValid})}else C(y,n,l)},O=(n,l)=>{C(s.errors,n,l),v.state.next({errors:s.errors})},ue=(n,l,u,m)=>{const h=f(a,n);if(h){const o=f(y,n,T(u)?f(c,n):u);T(o)||m&&m.defaultChecked||l?C(y,n,l?o:Ge(h._f)):G(n,o),b.mount&&x()}},oe=(n,l,u,m,h)=>{let o=!1,p=!1;const E={name:n};if(!u||m){D.isDirty&&(p=s.isDirty,s.isDirty=E.isDirty=_(),o=p!==E.isDirty);const j=ee(f(c,n),l);p=f(s.dirtyFields,n),j?L(s.dirtyFields,n):C(s.dirtyFields,n,!0),E.dirtyFields=s.dirtyFields,o=o||D.dirtyFields&&p!==!j}if(u){const j=f(s.touchedFields,n);j||(C(s.touchedFields,n,u),E.touchedFields=s.touchedFields,o=o||D.touchedFields&&j!==u)}return o&&h&&v.state.next(E),o?E:{}},Oe=(n,l,u,m)=>{const h=f(s.errors,n),o=D.isValid&&se(l)&&s.isValid!==l;if(e.delayError&&u?(F=Te(()=>O(n,u)),F(e.delayError)):(clearTimeout(V),F=null,u?C(s.errors,n,u):L(s.errors,n)),(u?!ee(h,u):h)||!W(m)||o){const p={...m,...o&&se(l)?{isValid:l}:{},errors:s.errors,name:n};s={...s,...p},v.state.next(p)}I(!1)},J=async n=>await t.resolver(y,t.context,Fr(n||g.mount,a,t.criteriaMode,t.shouldUseNativeValidation)),X=async n=>{const{errors:l}=await J();if(n)for(const u of n){const m=f(l,u);m?C(s.errors,u,m):L(s.errors,u)}else s.errors=l;return l},K=async(n,l,u={valid:!0})=>{for(const m in n){const h=n[m];if(h){const{_f:o,...p}=h;if(o){const E=g.array.has(o.name),j=await at(h,y,ge,t.shouldUseNativeValidation,E);if(j[o.name]&&(u.valid=!1,l))break;!l&&(f(j,o.name)?E?pr(s.errors,j,o.name):C(s.errors,o.name,j[o.name]):L(s.errors,o.name))}p&&await K(p,l,u)}}return u.valid},S=()=>{for(const n of g.unMount){const l=f(a,n);l&&(l._f.refs?l._f.refs.every(u=>!Me(u)):!Me(l._f.ref))&&Pe(n)}g.unMount=new Set},_=(n,l)=>(n&&l&&C(y,n,l),!ee(Ye(),c)),w=(n,l,u)=>Lt(n,g,{...b.mount?y:T(l)?c:H(n)?{[n]:l}:l},u,l),M=n=>ye(f(b.mount?y:c,n,e.shouldUnregister?f(c,n,[]):[])),G=(n,l,u={})=>{const m=f(a,n);let h=l;if(m){const o=m._f;o&&(!o.disabled&&C(y,n,It(l,o)),h=De(o.ref)&&U(l)?"":l,Bt(o.ref)?[...o.ref.options].forEach(p=>p.selected=h.includes(p.value)):o.refs?me(o.ref)?o.refs.length>1?o.refs.forEach(p=>(!p.defaultChecked||!p.disabled)&&(p.checked=Array.isArray(h)?!!h.find(E=>E===p.value):h===p.value)):o.refs[0]&&(o.refs[0].checked=!!h):o.refs.forEach(p=>p.checked=p.value===h):$e(o.ref)?o.ref.value="":(o.ref.value=h,o.ref.type||v.watch.next({name:n})))}(u.shouldDirty||u.shouldTouch)&&oe(n,h,u.shouldTouch,u.shouldDirty,!0),u.shouldValidate&&ce(n)},$=(n,l,u)=>{for(const m in l){const h=l[m],o=`${n}.${m}`,p=f(a,o);(g.array.has(n)||!Ae(h)||p&&!p._f)&&!re(h)?$(o,h,u):G(o,h,u)}},Z=(n,l,u={})=>{const m=f(a,n),h=g.array.has(n),o=Q(l);C(y,n,o),h?(v.array.next({name:n,values:y}),(D.isDirty||D.dirtyFields)&&u.shouldDirty&&(s.dirtyFields=Be(c,y),v.state.next({name:n,dirtyFields:s.dirtyFields,isDirty:_(n,o)}))):m&&!m._f&&!U(o)?$(n,o,u):G(n,o,u),rt(n,g)&&v.state.next({}),v.watch.next({name:n}),!b.mount&&r()},de=async n=>{const l=n.target;let u=l.name;const m=f(a,u),h=()=>l.type?Ge(m._f):kt(n);if(m){let o,p;const E=h(),j=n.type===Ve.BLUR||n.type===Ve.FOCUS_OUT,er=!_r(m._f)&&!t.resolver&&!f(s.errors,u)&&!m._f.deps||Sr(j,f(s.touchedFields,u),s.isSubmitted,B,N),Le=rt(u,g,j);C(y,u,E),j?(m._f.onBlur&&m._f.onBlur(n),F&&F(0)):m._f.onChange&&m._f.onChange(n);const Ne=oe(u,E,j,!1),tr=!W(Ne)||Le;if(!j&&v.watch.next({name:u,type:n.type}),er)return D.isValid&&x(),tr&&v.state.next({name:u,...Le?{}:Ne});if(!j&&Le&&v.state.next({}),I(!0),t.resolver){const{errors:Ze}=await J([u]),rr=ut(s.errors,a,u),et=ut(Ze,a,rr.name||u);o=et.error,u=et.name,p=W(Ze)}else o=(await at(m,y,ge,t.shouldUseNativeValidation))[u],o?p=!1:D.isValid&&(p=await K(a,!0));m._f.deps&&ce(m._f.deps),Oe(u,p,o,Ne)}},ce=async(n,l={})=>{let u,m;const h=_e(n);if(I(!0),t.resolver){const o=await X(T(n)?n:h);u=W(o),m=n?!h.some(p=>f(o,p)):u}else n?(m=(await Promise.all(h.map(async o=>{const p=f(a,o);return await K(p&&p._f?{[o]:p}:p)}))).every(Boolean),!(!m&&!s.isValid)&&x()):m=u=await K(a);return v.state.next({...!H(n)||D.isValid&&u!==s.isValid?{}:{name:n},...t.resolver||!n?{isValid:u}:{},errors:s.errors,isValidating:!1}),l.shouldFocus&&!m&&We(a,o=>o&&f(s.errors,o),n?h:g.mount),m},Ye=n=>{const l={...c,...b.mount?y:{}};return T(n)?l:H(n)?f(l,n):n.map(u=>f(l,u))},Ke=(n,l)=>({invalid:!!f((l||s).errors,n),isDirty:!!f((l||s).dirtyFields,n),isTouched:!!f((l||s).touchedFields,n),error:f((l||s).errors,n)}),Ht=n=>{n?_e(n).forEach(l=>L(s.errors,l)):s.errors={},v.state.next({errors:s.errors})},Yt=(n,l,u)=>{const m=(f(a,n,{_f:{}})._f||{}).ref;C(s.errors,n,{...l,ref:m}),v.state.next({name:n,errors:s.errors,isValid:!1}),u&&u.shouldFocus&&m&&m.focus&&m.focus()},Kt=(n,l)=>ne(n)?v.watch.subscribe({next:u=>n(w(void 0,l),u)}):w(n,l,!0),Pe=(n,l={})=>{for(const u of n?_e(n):g.mount)g.mount.delete(u),g.array.delete(u),f(a,u)&&(l.keepValue||(L(a,u),L(y,u)),!l.keepError&&L(s.errors,u),!l.keepDirty&&L(s.dirtyFields,u),!l.keepTouched&&L(s.touchedFields,u),!t.shouldUnregister&&!l.keepDefaultValue&&L(c,u));v.watch.next({}),v.state.next({...s,...l.keepDirty?{isDirty:_()}:{}}),!l.keepIsValid&&x()},Re=(n,l={})=>{let u=f(a,n);const m=se(l.disabled);return C(a,n,{...u||{},_f:{...u&&u._f?u._f:{ref:{name:n}},name:n,mount:!0,...l}}),g.mount.add(n),u?m&&C(y,n,l.disabled?void 0:f(y,n,Ge(u._f))):ue(n,!0,l.value),{...m?{disabled:l.disabled}:{},...t.shouldUseNativeValidation?{required:!!l.required,min:fe(l.min),max:fe(l.max),minLength:fe(l.minLength),maxLength:fe(l.maxLength),pattern:fe(l.pattern)}:{},name:n,onChange:de,onBlur:de,ref:h=>{if(h){Re(n,l),u=f(a,n);const o=T(h.value)&&h.querySelectorAll&&h.querySelectorAll("input,select,textarea")[0]||h,p=xr(o),E=u._f.refs||[];if(p?E.find(j=>j===o):o===u._f.ref)return;C(a,n,{_f:{...u._f,...p?{refs:[...E.filter(Me),o,...Array.isArray(f(c,n))?[{}]:[]],ref:{type:o.type,name:n}}:{ref:o}}}),ue(n,!1,void 0,o)}else u=f(a,n,{}),u._f&&(u._f.mount=!1),(t.shouldUnregister||l.shouldUnregister)&&!(Et(g.array,n)&&b.action)&&g.unMount.add(n)}}},ze=()=>t.shouldFocusError&&We(a,n=>n&&f(s.errors,n),g.mount),zt=(n,l)=>async u=>{u&&(u.preventDefault&&u.preventDefault(),u.persist&&u.persist());let m=Q(y);if(v.state.next({isSubmitting:!0}),t.resolver){const{errors:h,values:o}=await J();s.errors=h,m=o}else await K(a);W(s.errors)?(v.state.next({errors:{}}),await n(m,u)):(l&&await l({...s.errors},u),ze()),v.state.next({isSubmitted:!0,isSubmitting:!1,isSubmitSuccessful:W(s.errors),submitCount:s.submitCount+1,errors:s.errors})},Qt=(n,l={})=>{f(a,n)&&(T(l.defaultValue)?Z(n,f(c,n)):(Z(n,l.defaultValue),C(c,n,l.defaultValue)),l.keepTouched||L(s.touchedFields,n),l.keepDirty||(L(s.dirtyFields,n),s.isDirty=l.defaultValue?_(n,f(c,n)):_()),l.keepError||(L(s.errors,n),D.isValid&&x()),v.state.next({...s}))},Qe=(n,l={})=>{const u=n||c,m=Q(u),h=n&&!W(n)?m:c;if(l.keepDefaultValues||(c=u),!l.keepValues){if(l.keepDirtyValues||i)for(const o of g.mount)f(s.dirtyFields,o)?C(h,o,f(y,o)):Z(o,f(h,o));else{if(qe&&T(n))for(const o of g.mount){const p=f(a,o);if(p&&p._f){const E=Array.isArray(p._f.refs)?p._f.refs[0]:p._f.ref;if(De(E)){const j=E.closest("form");if(j){j.reset();break}}}}a={}}y=e.shouldUnregister?l.keepDefaultValues?Q(c):{}:m,v.array.next({values:h}),v.watch.next({values:h})}g={mount:new Set,unMount:new Set,array:new Set,watch:new Set,watchAll:!1,focus:""},!b.mount&&r(),b.mount=!D.isValid||!!l.keepIsValid,b.watch=!!e.shouldUnregister,v.state.next({submitCount:l.keepSubmitCount?s.submitCount:0,isDirty:l.keepDirty||l.keepDirtyValues?s.isDirty:!!(l.keepDefaultValues&&!ee(n,c)),isSubmitted:l.keepIsSubmitted?s.isSubmitted:!1,dirtyFields:l.keepDirty||l.keepDirtyValues?s.dirtyFields:l.keepDefaultValues&&n?Be(c,n):{},touchedFields:l.keepTouched?s.touchedFields:{},errors:l.keepErrors?s.errors:{},isSubmitting:!1,isSubmitSuccessful:!1})},Xe=(n,l)=>Qe(ne(n)?n(y):n,l),Xt=(n,l={})=>{const u=f(a,n),m=u&&u._f;if(m){const h=m.refs?m.refs[0]:m.ref;h.focus&&(h.focus(),l.shouldSelect&&h.select())}},Zt=n=>{s={...s,...n}};return ne(t.defaultValues)&&t.defaultValues().then(n=>{Xe(n,t.resetOptions),v.state.next({isLoading:!1})}),{control:{register:Re,unregister:Pe,getFieldState:Ke,_executeSchema:J,_focusError:ze,_getWatch:w,_getDirty:_,_updateValid:x,_removeUnmounted:S,_updateFieldArray:Y,_getFieldArray:M,_reset:Qe,_updateFormState:Zt,_subjects:v,_proxyFormState:D,get _fields(){return a},get _formValues(){return y},get _stateFlags(){return b},set _stateFlags(n){b=n},get _defaultValues(){return c},get _names(){return g},set _names(n){g=n},get _formState(){return s},set _formState(n){s=n},get _options(){return t},set _options(n){t={...t,...n}}},trigger:ce,register:Re,handleSubmit:zt,watch:Kt,setValue:Z,getValues:Ye,reset:Xe,resetField:Qt,clearErrors:Ht,unregister:Pe,setError:Yt,setFocus:Xt,getFieldState:Ke}}function Ar(e={}){const r=A.useRef(),[t,i]=A.useState({isDirty:!1,isValidating:!1,isLoading:!0,isSubmitted:!1,isSubmitting:!1,isSubmitSuccessful:!1,isValid:!1,submitCount:0,dirtyFields:{},touchedFields:{},errors:{},defaultValues:ne(e.defaultValues)?void 0:e.defaultValues});r.current||(r.current={...Cr(e,()=>i(a=>({...a}))),formState:t});const s=r.current.control;return s._options=e,Ie({subject:s._subjects.state,next:a=>{Pt(a,s._proxyFormState,s._updateFormState,!0)&&i({...s._formState})}}),A.useEffect(()=>{s._stateFlags.mount||(s._updateValid(),s._stateFlags.mount=!0),s._stateFlags.watch&&(s._stateFlags.watch=!1,s._subjects.state.next({})),s._removeUnmounted()}),A.useEffect(()=>{e.values&&!ee(e.values,s._defaultValues)&&s._reset(e.values,s._options.resetOptions)},[e.values,s]),A.useEffect(()=>{t.submitCount&&s._focusError()},[s,t.submitCount]),r.current.formState=Ot(t,s),r.current}function jr({components:e,render:r,fields:t,id:i,...s}){let{control:a}=Ee(),c=t==null?void 0:t.find(b=>b.id===i),y=k.useCallback(b=>{var g,F;if(c){let V=c==null?void 0:c.type;if(r)return r(b);if(e!=null&&e[V])return(g=e[V])==null?void 0:g.call(e,b);if(e!=null&&e.default)return(F=e.default)==null?void 0:F.call(e,b)}return null},[r,e,c]);return c?d.jsx(gr,{control:a,render:b=>(y==null?void 0:y({...b,field:{...c,...b.field,id:i,onChange:g=>{var F;b.field.onChange(g),(F=s.onChange)==null||F.call(s,g)}}}))??d.jsx(d.Fragment,{}),name:i}):null}var qt=jr,Jt=k.createContext({components:{}});function wr({components:e,children:r}){return d.jsx(Jt.Provider,{value:{components:e??{}},children:r})}var kr=()=>k.useContext(Jt)??{},Er=wr;function Tr(e){var g;let{fields:r,getFieldDefaultValue:t,...i}=e||{},[s,a]=k.useState(r??void 0),c=k.useMemo(()=>r==null?void 0:r.reduce((F,V)=>(F[V.id]=t?t(V):V.value,F),{}),[r,t]),y=(i==null?void 0:i.defaultValues)||c,b=Ar({...i,defaultValues:y});return r&&JSON.stringify(s)!==JSON.stringify(r)&&((g=b.reset)==null||g.call(b,y),a(r)),{methods:b,formProps:{methods:b,fields:r}}}var le=Tr;function Or({id:e,onSubmit:r,className:t,style:i,methods:{handleSubmit:s},onChange:a,fields:c,children:y,...b}){let g=kr(),F=k.useMemo(()=>({...g.components,...b.components}),[g.components,b.components]),V=k.useCallback(D=>k.Children.map(D,v=>{var N;if(k.isValidElement(v)){let B=v;if((B==null?void 0:B.type)===qt)return k.cloneElement(B,{components:F,fields:c,onChange:a});if((N=B.props)!=null&&N.children)return k.cloneElement(B,{...B.props,children:V(B.props.children)})}return v}),[c,F,a]);return d.jsx("form",{id:e,onSubmit:r?s(r):void 0,className:t,style:i,children:V(y)})}function $t({getFieldDefaultValue:e,...r}){let{methods:t}=le(r!=null&&r.fields?{fields:r.fields,getFieldDefaultValue:e}:void 0),i=k.useMemo(()=>r.methods??t,[r.methods,t]);return d.jsx(dr,{...i,children:d.jsx(Or,{...r,methods:i})})}$t.Field=qt;var R=$t,Pr=(e=>(e.Bool="boolean",e.Date="date",e.Datetime="datetime",e.List="list",e.Dict="dict",e.link="link",e.Float="float",e.Integer="integer",e.String="string",e.Time="time",e.Default="default",e))(Pr||{});const ie=[{default:null,helper_text:null,id:"name",label:"Name",max_length:null,min_length:null,multiple:!1,required:!1,type:"string",values:null},{default:null,helper_text:null,id:"surname",label:"Surname",max_length:null,min_length:null,multiple:!1,required:!1,type:"string",values:null},{default:null,helper_text:null,id:"email",label:"Email",max_length:null,min_length:null,multiple:!1,required:!1,type:"string",values:null},{default:null,helper_text:null,id:"active",label:"Active",max_length:null,min_length:null,multiple:!1,required:!1,type:"boolean",values:null}],we=[{default:null,helper_text:null,id:"name",label:"Name",value:"John",max_length:null,min_length:null,multiple:!1,required:!1,type:"string",values:null},{default:null,helper_text:null,id:"surname",label:"Surname",value:"Doe",max_length:null,min_length:null,multiple:!1,required:!1,type:"string",values:null},{default:null,helper_text:null,id:"email",label:"Email",value:"john@doe.com",max_length:null,min_length:null,multiple:!1,required:!1,type:"string",values:null},{default:null,helper_text:null,id:"active",label:"Active",max_length:null,min_length:null,multiple:!1,required:!1,type:"boolean",values:null}],Nr={title:"Form",component:R},ae=({children:e})=>d.jsx(Er,{components:{boolean:({field:r})=>d.jsxs("div",{style:{display:"flex"},children:[d.jsx("input",{...r,type:"checkbox",checked:r.value,onChange:t=>r.onChange(t.target.checked)}),d.jsx("div",{children:r.label})]}),string:({field:r})=>d.jsx(d.Fragment,{children:d.jsx("input",{...r,placeholder:r.label,onChange:t=>r.onChange(t.target.value)})}),default:()=>d.jsx("div",{children:"Component not found"})},children:e}),he=()=>{const{methods:e}=le(),[r,t]=k.useState({});return d.jsxs(d.Fragment,{children:[d.jsx(ae,{children:d.jsx(R,{methods:e,fields:ie,onSubmit:i=>t(i),children:d.jsxs("div",{children:[d.jsx("div",{style:{display:"grid",gridTemplateColumns:"auto auto auto auto",gridGap:"8px 20px"},children:ie.map(i=>d.jsx(R.Field,{id:i.id},`field-${i.id}`))}),d.jsx("button",{style:{marginTop:20},children:"Submit"})]})})}),d.jsx("br",{}),JSON.stringify(r)]})},pe=()=>{const{methods:e}=le(),[r,t]=k.useState({});return d.jsxs(d.Fragment,{children:[d.jsx(ae,{children:d.jsxs(R,{methods:e,fields:ie,onSubmit:i=>t(i),children:[d.jsxs("div",{children:[d.jsx("div",{style:{display:"grid",gridTemplateColumns:"auto auto auto auto",gridGap:"8px 20px"},children:ie.map(i=>d.jsx(R.Field,{id:i.id},`field-${i.id}`))}),d.jsx("button",{style:{marginTop:20},children:"Submit"})]}),d.jsxs("div",{style:{marginTop:20,display:"flex",gap:4},children:[d.jsx("button",{type:"button",onClick:()=>e.reset({}),children:"Reset"}),d.jsx("button",{type:"button",onClick:()=>e.setValue("name",""),children:"Clean name field"}),d.jsx("button",{type:"button",onClick:()=>e.register("name"),children:"register name field"}),d.jsx("button",{type:"button",onClick:()=>e.unregister("name"),children:"Unregister name field"})]})]})}),d.jsx("br",{}),JSON.stringify(r)]})},be=()=>{const[e,r]=k.useState({});return d.jsxs(d.Fragment,{children:[d.jsx(ae,{children:d.jsx(R,{fields:ie,onSubmit:t=>r(t),onChange:t=>console.log(t),getFieldDefaultValue:t=>t.value,children:d.jsxs("div",{children:[d.jsxs("div",{style:{display:"grid",gridTemplateColumns:"auto auto auto auto",gridGap:"8px 20px"},children:[d.jsx(R.Field,{id:"name",label:"Your name"}),d.jsx(R.Field,{id:"surname",label:"Your surname"}),d.jsx(R.Field,{id:"email",label:"Email",render:({field:t})=>d.jsx("input",{...t,type:"email",onChange:i=>t.onChange(i.target.value)})}),d.jsx(R.Field,{id:"active",label:"Is Active?"})]}),d.jsx("button",{style:{marginTop:20},children:"Submit"})]})})}),d.jsx("br",{}),JSON.stringify(e)]})},ve=()=>{const{formProps:e}=le({fields:we,getFieldDefaultValue:i=>i.value}),[r,t]=k.useState();return d.jsxs(d.Fragment,{children:[d.jsx(ae,{children:d.jsx(R,{...e,onSubmit:i=>t(i),children:d.jsxs("div",{children:[d.jsx("div",{style:{display:"grid",gridTemplateColumns:"auto auto auto auto",gridGap:"8px 20px"},children:we.map(i=>d.jsx(R.Field,{id:i.id},`field-${i.id}`))}),d.jsx("button",{style:{marginTop:20},children:"Submit"})]})})}),d.jsx("br",{}),JSON.stringify(r)]})},xe=()=>{const[e,r]=k.useState([]);k.useEffect(()=>{setTimeout(()=>{r(we)},2e3)},[]);const{formProps:t}=le({fields:e,getFieldDefaultValue:a=>a.value}),[i,s]=k.useState();return d.jsxs(d.Fragment,{children:["Values will load after 2 seconds",d.jsx(ae,{children:d.jsx(R,{...t,onSubmit:a=>s(a),children:d.jsxs("div",{children:[d.jsx("div",{style:{display:"grid",gridTemplateColumns:"auto auto auto auto",gridGap:"8px 20px"},children:we.map(a=>d.jsx(R.Field,{id:a.id},`field-${a.id}`))}),d.jsx("button",{style:{marginTop:20},children:"Submit"})]})})}),d.jsx("br",{}),JSON.stringify(i)]})},Fe=()=>{const{methods:e}=le(),[r,t]=k.useState({});return d.jsxs(d.Fragment,{children:[d.jsx(ae,{children:d.jsx(R,{methods:e,fields:ie,onSubmit:i=>t(i),children:d.jsxs("div",{children:[d.jsxs("div",{style:{display:"grid",gridTemplateColumns:"auto auto auto auto",gridGap:"8px 20px"},children:[d.jsx(R.Field,{id:"name",render:({field:i})=>d.jsx("input",{...i,placeholder:i.label,onChange:s=>{i.onChange(s.target.value),e.setValue("surname","Test")}})}),d.jsx(R.Field,{id:"surname",render:({field:i})=>d.jsx("input",{...i,placeholder:i.label,onChange:s=>i.onChange(s.target.value)})})]}),d.jsx("button",{style:{marginTop:20},children:"Submit"})]})})}),d.jsx("br",{}),JSON.stringify(r)]})};var ot,dt,ct;he.parameters={...he.parameters,docs:{...(ot=he.parameters)==null?void 0:ot.docs,source:{originalSource:`() => {
  const {
    methods
  } = useForm();
  const [submitData, setSubmitData] = useState({});
  return <>
      <GeneralFormProvider>
        <Form methods={methods} fields={fields} onSubmit={values => setSubmitData(values)}>
          <div>
            <div style={{
            display: "grid",
            gridTemplateColumns: "auto auto auto auto",
            gridGap: "8px 20px"
          }}>
              {fields.map((field: {
              id: string;
            }) => <Form.Field key={\`field-\${field.id}\`} id={field.id} />)}
            </div>
            <button style={{
            marginTop: 20
          }}>Submit</button>
          </div>
        </Form>
      </GeneralFormProvider>
      <br />
      {JSON.stringify(submitData)}
    </>;
}`,...(ct=(dt=he.parameters)==null?void 0:dt.docs)==null?void 0:ct.source}}};var ft,mt,yt;pe.parameters={...pe.parameters,docs:{...(ft=pe.parameters)==null?void 0:ft.docs,source:{originalSource:`() => {
  const {
    methods
  } = useForm();
  const [submitData, setSubmitData] = useState({});
  return <>
      <GeneralFormProvider>
        <Form methods={methods} fields={fields} onSubmit={values => setSubmitData(values)}>
          <div>
            <div style={{
            display: "grid",
            gridTemplateColumns: "auto auto auto auto",
            gridGap: "8px 20px"
          }}>
              {fields.map((field: {
              id: string;
            }) => <Form.Field key={\`field-\${field.id}\`} id={field.id} />)}
            </div>
            <button style={{
            marginTop: 20
          }}>Submit</button>
          </div>

          <div style={{
          marginTop: 20,
          display: "flex",
          gap: 4
        }}>
            <button type="button" onClick={() => methods.reset({})}>
              Reset
            </button>
            <button type="button" onClick={() => methods.setValue("name", "")}>
              Clean name field
            </button>
            <button type="button" onClick={() => methods.register("name")}>
              register name field
            </button>
            <button type="button" onClick={() => methods.unregister("name")}>
              Unregister name field
            </button>
          </div>
        </Form>
      </GeneralFormProvider>
      <br />
      {JSON.stringify(submitData)}
    </>;
}`,...(yt=(mt=pe.parameters)==null?void 0:mt.docs)==null?void 0:yt.source}}};var gt,ht,pt;be.parameters={...be.parameters,docs:{...(gt=be.parameters)==null?void 0:gt.docs,source:{originalSource:`() => {
  const [submitData, setSubmitData] = useState({});
  return <>
      <GeneralFormProvider>
        <Form fields={fields} onSubmit={values => setSubmitData(values)} onChange={values => console.log(values)} getFieldDefaultValue={field => field.value}>
          <div>
            <div style={{
            display: "grid",
            gridTemplateColumns: "auto auto auto auto",
            gridGap: "8px 20px"
          }}>
              <Form.Field id="name" label="Your name" />
              <Form.Field id="surname" label="Your surname" />
              <Form.Field id="email" label="Email" render={({
              field
            }) => <input {...field} type="email" onChange={e => field.onChange(e.target.value)} />} />
              <Form.Field id="active" label="Is Active?" />
            </div>
            <button style={{
            marginTop: 20
          }}>Submit</button>
          </div>
        </Form>
      </GeneralFormProvider>
      <br />
      {JSON.stringify(submitData)}
    </>;
}`,...(pt=(ht=be.parameters)==null?void 0:ht.docs)==null?void 0:pt.source}}};var bt,vt,xt;ve.parameters={...ve.parameters,docs:{...(bt=ve.parameters)==null?void 0:bt.docs,source:{originalSource:`() => {
  const {
    formProps
  } = useForm({
    fields: fieldsWithValues,
    getFieldDefaultValue: field => field.value
  });
  const [submitData, setSubmitData] = useState();
  return <>
      <GeneralFormProvider>
        <Form {...formProps} onSubmit={values => setSubmitData(values)}>
          <div>
            <div style={{
            display: "grid",
            gridTemplateColumns: "auto auto auto auto",
            gridGap: "8px 20px"
          }}>
              {fieldsWithValues.map(field => <Form.Field key={\`field-\${field.id}\`} id={field.id} />)}
            </div>
            <button style={{
            marginTop: 20
          }}>Submit</button>
          </div>
        </Form>
      </GeneralFormProvider>
      <br />
      {JSON.stringify(submitData)}
    </>;
}`,...(xt=(vt=ve.parameters)==null?void 0:vt.docs)==null?void 0:xt.source}}};var Ft,_t,St;xe.parameters={...xe.parameters,docs:{...(Ft=xe.parameters)==null?void 0:Ft.docs,source:{originalSource:`() => {
  const [fields, setFields] = useState<Field[]>([]);
  useEffect(() => {
    setTimeout(() => {
      setFields(fieldsWithValues);
    }, 2000);
  }, []);
  const {
    formProps
  } = useForm({
    fields,
    getFieldDefaultValue: field => field.value
  });
  const [submitData, setSubmitData] = useState();
  return <>
      Values will load after 2 seconds
      <GeneralFormProvider>
        <Form {...formProps} onSubmit={values => setSubmitData(values)}>
          <div>
            <div style={{
            display: "grid",
            gridTemplateColumns: "auto auto auto auto",
            gridGap: "8px 20px"
          }}>
              {fieldsWithValues.map(field => <Form.Field key={\`field-\${field.id}\`} id={field.id} />)}
            </div>
            <button style={{
            marginTop: 20
          }}>Submit</button>
          </div>
        </Form>
      </GeneralFormProvider>
      <br />
      {JSON.stringify(submitData)}
    </>;
}`,...(St=(_t=xe.parameters)==null?void 0:_t.docs)==null?void 0:St.source}}};var Vt,Dt,Ct;Fe.parameters={...Fe.parameters,docs:{...(Vt=Fe.parameters)==null?void 0:Vt.docs,source:{originalSource:`() => {
  const {
    methods
  } = useForm();
  const [submitData, setSubmitData] = useState({});
  return <>
      <GeneralFormProvider>
        <Form methods={methods} fields={fields} onSubmit={values => setSubmitData(values)}>
          <div>
            <div style={{
            display: "grid",
            gridTemplateColumns: "auto auto auto auto",
            gridGap: "8px 20px"
          }}>
              <Form.Field id="name" render={({
              field
            }) => <input {...field} placeholder={field.label} onChange={e => {
              field.onChange(e.target.value);
              methods.setValue("surname", "Test");
            }} />} />
              <Form.Field id="surname" render={({
              field
            }) => <input {...field} placeholder={field.label} onChange={e => field.onChange(e.target.value)} />} />
            </div>
            <button style={{
            marginTop: 20
          }}>Submit</button>
          </div>
        </Form>
      </GeneralFormProvider>
      <br />
      {JSON.stringify(submitData)}
    </>;
}`,...(Ct=(Dt=Fe.parameters)==null?void 0:Dt.docs)==null?void 0:Ct.source}}};const Ur=["Default","WithFormProvider","Render","WithDefaultValues","WithChangingFields","WithInternalDependency"];export{he as Default,be as Render,xe as WithChangingFields,ve as WithDefaultValues,pe as WithFormProvider,Fe as WithInternalDependency,Ur as __namedExportsOrder,Nr as default};
//# sourceMappingURL=Form.stories-831ec9e4.js.map
