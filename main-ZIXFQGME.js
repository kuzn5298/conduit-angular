import{A as Wt,B as nt,C as qt,D as Jt,E as Yt,e as $t,f as zt,g as Ut,i as Bt,j as Ht,m as tt,n as z,o as Gt,r as Zt,s as Vt,t as et,u as Kt,v as Xt}from"./chunk-PF6GMMH3.js";import{A as Y,B as N,C as Et,D as Tt,E as Ot,G as Ct,Ra as k,S as bt,T as wt,U as Dt,W as Q,X as F,Z as Rt,a as D,b as R,ba as $,ea as P,f as q,ga as I,gb as C,ha as Mt,hb as b,ib as _t,k as xt,ka as Nt,kb as O,l as yt,m as It,n as vt,p as J,qa as kt,rb as Lt,sb as Ft,t as At,u as M,wa as jt,xa as Pt}from"./chunk-EKUP7J75.js";var L="PERFORM_ACTION",be="REFRESH",oe="RESET",se="ROLLBACK",re="COMMIT",ae="SWEEP",ce="TOGGLE_ACTION",we="SET_ACTIONS_ACTIVE",pe="JUMP_TO_STATE",ue="JUMP_TO_ACTION",gt="IMPORT_STATE",le="LOCK_CHANGES",de="PAUSE_RECORDING",j=class{constructor(n,e){if(this.action=n,this.timestamp=e,this.type=L,typeof n.type>"u")throw new Error('Actions may not have an undefined "type" property. Have you misspelled a constant?')}},it=class{constructor(){this.type=be}},ot=class{constructor(n){this.timestamp=n,this.type=oe}},st=class{constructor(n){this.timestamp=n,this.type=se}},rt=class{constructor(n){this.timestamp=n,this.type=re}},at=class{constructor(){this.type=ae}},ct=class{constructor(n){this.id=n,this.type=ce}};var pt=class{constructor(n){this.index=n,this.type=pe}},ut=class{constructor(n){this.actionId=n,this.type=ue}},lt=class{constructor(n){this.nextLiftedState=n,this.type=gt}},dt=class{constructor(n){this.status=n,this.type=le}},ft=class{constructor(n){this.status=n,this.type=de}};var G=new P("@ngrx/store-devtools Options"),Qt=new P("@ngrx/store-devtools Initial Config");function fe(){return null}var De="NgRx Store DevTools";function Re(t){let n={maxAge:!1,monitor:fe,actionSanitizer:void 0,stateSanitizer:void 0,name:De,serialize:!1,logOnly:!1,autoPause:!1,trace:!1,traceLimit:75,features:{pause:!0,lock:!0,persist:!0,export:!0,import:"custom",jump:!0,skip:!0,reorder:!0,dispatch:!0,test:!0},connectInZone:!1},e=typeof t=="function"?t():t,i=e.logOnly?{pause:!0,export:!0,test:!0}:!1,o=e.features||i||n.features;o.import===!0&&(o.import="custom");let c=Object.assign({},n,{features:o},e);if(c.maxAge&&c.maxAge<2)throw new Error(`Devtools 'maxAge' cannot be less than 2, got ${c.maxAge}`);return c}function te(t,n){return t.filter(e=>n.indexOf(e)<0)}function he(t){let{computedStates:n,currentStateIndex:e}=t;if(e>=n.length){let{state:o}=n[n.length-1];return o}let{state:i}=n[e];return i}function _(t){return new j(t,+Date.now())}function Me(t,n){return Object.keys(n).reduce((e,i)=>{let o=Number(i);return e[o]=me(t,n[o],o),e},{})}function me(t,n,e){return R(D({},n),{action:t(n.action,e)})}function Ne(t,n){return n.map((e,i)=>({state:ge(t,e.state,i),error:e.error}))}function ge(t,n,e){return t(n,e)}function Se(t){return t.predicate||t.actionsSafelist||t.actionsBlocklist}function ke(t,n,e,i){let o=[],c={},m=[];return t.stagedActionIds.forEach((u,g)=>{let s=t.actionsById[u];s&&(g&&St(t.computedStates[g],s,n,e,i)||(c[u]=s,o.push(u),m.push(t.computedStates[g])))}),R(D({},t),{stagedActionIds:o,actionsById:c,computedStates:m})}function St(t,n,e,i,o){let c=e&&!e(t,n.action),m=i&&!n.action.type.match(i.map(g=>ee(g)).join("|")),u=o&&n.action.type.match(o.map(g=>ee(g)).join("|"));return c||m||u}function ee(t){return t.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function xe(t){return{ngZone:t?Mt(jt):null,connectInZone:t}}var Z=(()=>{class t extends z{static{this.\u0275fac=(()=>{let e;return function(o){return(e||(e=kt(t)))(o||t)}})()}static{this.\u0275prov=$({token:t,factory:t.\u0275fac})}}return t})(),U={START:"START",DISPATCH:"DISPATCH",STOP:"STOP",ACTION:"ACTION"},ht=new P("@ngrx/store-devtools Redux Devtools Extension"),ye=(()=>{class t{constructor(e,i,o){this.config=i,this.dispatcher=o,this.zoneConfig=xe(this.config.connectInZone),this.devtoolsExtension=e,this.createActionStreams()}notify(e,i){if(this.devtoolsExtension)if(e.type===L){if(i.isLocked||i.isPaused)return;let o=he(i);if(Se(this.config)&&St(o,e,this.config.predicate,this.config.actionsSafelist,this.config.actionsBlocklist))return;let c=this.config.stateSanitizer?ge(this.config.stateSanitizer,o,i.currentStateIndex):o,m=this.config.actionSanitizer?me(this.config.actionSanitizer,e,i.nextActionId):e;this.sendToReduxDevtools(()=>this.extensionConnection.send(m,c))}else{let o=R(D({},i),{stagedActionIds:i.stagedActionIds,actionsById:this.config.actionSanitizer?Me(this.config.actionSanitizer,i.actionsById):i.actionsById,computedStates:this.config.stateSanitizer?Ne(this.config.stateSanitizer,i.computedStates):i.computedStates});this.sendToReduxDevtools(()=>this.devtoolsExtension.send(null,o,this.getExtensionConfig(this.config)))}}createChangesObservable(){return this.devtoolsExtension?new q(e=>{let i=this.zoneConfig.connectInZone?this.zoneConfig.ngZone.runOutsideAngular(()=>this.devtoolsExtension.connect(this.getExtensionConfig(this.config))):this.devtoolsExtension.connect(this.getExtensionConfig(this.config));return this.extensionConnection=i,i.init(),i.subscribe(o=>e.next(o)),i.unsubscribe}):It}createActionStreams(){let e=this.createChangesObservable().pipe(wt()),i=e.pipe(N(s=>s.type===U.START)),o=e.pipe(N(s=>s.type===U.STOP)),c=e.pipe(N(s=>s.type===U.DISPATCH),M(s=>this.unwrapAction(s.payload)),Tt(s=>s.type===gt?this.dispatcher.pipe(N(S=>S.type===et),At(1e3),Ot(1e3),M(()=>s),Et(()=>J(s)),Ct(1)):J(s))),u=e.pipe(N(s=>s.type===U.ACTION),M(s=>this.unwrapAction(s.payload))).pipe(F(o)),g=c.pipe(F(o));this.start$=i.pipe(F(o)),this.actions$=this.start$.pipe(Q(()=>u)),this.liftedActions$=this.start$.pipe(Q(()=>g))}unwrapAction(e){return typeof e=="string"?(0,eval)(`(${e})`):e}getExtensionConfig(e){let i={name:e.name,features:e.features,serialize:e.serialize,autoPause:e.autoPause??!1,trace:e.trace??!1,traceLimit:e.traceLimit??75};return e.maxAge!==!1&&(i.maxAge=e.maxAge),i}sendToReduxDevtools(e){try{e()}catch(i){console.warn("@ngrx/store-devtools: something went wrong inside the redux devtools",i)}}static{this.\u0275fac=function(i){return new(i||t)(I(ht),I(G),I(Z))}}static{this.\u0275prov=$({token:t,factory:t.\u0275fac})}}return t})(),H={type:tt},je="@ngrx/store-devtools/recompute",Pe={type:je};function Ie(t,n,e,i,o){if(i)return{state:e,error:"Interrupted by an error up the chain"};let c=e,m;try{c=t(e,n)}catch(u){m=u.toString(),o.handleError(u)}return{state:c,error:m}}function B(t,n,e,i,o,c,m,u,g){if(n>=t.length&&t.length===c.length)return t;let s=t.slice(0,n),S=c.length-(g?1:0);for(let r=n;r<S;r++){let l=c[r],y=o[l].action,p=s[r-1],a=p?p.state:i,A=p?p.error:void 0,E=m.indexOf(l)>-1?p:Ie(e,y,a,A,u);s.push(E)}return g&&s.push(t[t.length-1]),s}function _e(t,n){return{monitorState:n(void 0,{}),nextActionId:1,actionsById:{0:_(H)},stagedActionIds:[0],skippedActionIds:[],committedState:t,currentStateIndex:0,computedStates:[],isLocked:!1,isPaused:!1}}function Le(t,n,e,i,o={}){return c=>(m,u)=>{let{monitorState:g,actionsById:s,nextActionId:S,stagedActionIds:r,skippedActionIds:l,committedState:y,currentStateIndex:p,computedStates:a,isLocked:A,isPaused:x}=m||n;m||(s=Object.create(s));function E(h){let f=h,w=r.slice(1,f+1);for(let v=0;v<w.length;v++)if(a[v+1].error){f=v,w=r.slice(1,f+1);break}else delete s[w[v]];l=l.filter(v=>w.indexOf(v)===-1),r=[0,...r.slice(f+1)],y=a[f].state,a=a.slice(f),p=p>f?p-f:0}function T(){s={0:_(H)},S=1,r=[0],l=[],y=a[p].state,p=0,a=[]}let d=0;switch(u.type){case le:{A=u.status,d=1/0;break}case de:{x=u.status,x?(r=[...r,S],s[S]=new j({type:"@ngrx/devtools/pause"},+Date.now()),S++,d=r.length-1,a=a.concat(a[a.length-1]),p===r.length-2&&p++,d=1/0):T();break}case oe:{s={0:_(H)},S=1,r=[0],l=[],y=t,p=0,a=[];break}case re:{T();break}case se:{s={0:_(H)},S=1,r=[0],l=[],p=0,a=[];break}case ce:{let{id:h}=u;l.indexOf(h)===-1?l=[h,...l]:l=l.filter(w=>w!==h),d=r.indexOf(h);break}case we:{let{start:h,end:f,active:w}=u,v=[];for(let W=h;W<f;W++)v.push(W);w?l=te(l,v):l=[...l,...v],d=r.indexOf(h);break}case pe:{p=u.index,d=1/0;break}case ue:{let h=r.indexOf(u.actionId);h!==-1&&(p=h),d=1/0;break}case ae:{r=te(r,l),l=[],p=Math.min(p,r.length-1);break}case L:{if(A)return m||n;if(x||m&&St(m.computedStates[p],u,o.predicate,o.actionsSafelist,o.actionsBlocklist)){let f=a[a.length-1];a=[...a.slice(0,-1),Ie(c,u.action,f.state,f.error,e)],d=1/0;break}o.maxAge&&r.length===o.maxAge&&E(1),p===r.length-1&&p++;let h=S++;s[h]=u,r=[...r,h],d=r.length-1;break}case gt:{({monitorState:g,actionsById:s,nextActionId:S,stagedActionIds:r,skippedActionIds:l,committedState:y,currentStateIndex:p,computedStates:a,isLocked:A,isPaused:x}=u.nextLiftedState);break}case tt:{d=0,o.maxAge&&r.length>o.maxAge&&(a=B(a,d,c,y,s,r,l,e,x),E(r.length-o.maxAge),d=1/0);break}case et:{if(a.filter(f=>f.error).length>0)d=0,o.maxAge&&r.length>o.maxAge&&(a=B(a,d,c,y,s,r,l,e,x),E(r.length-o.maxAge),d=1/0);else{if(!x&&!A){p===r.length-1&&p++;let f=S++;s[f]=new j(u,+Date.now()),r=[...r,f],d=r.length-1,a=B(a,d,c,y,s,r,l,e,x)}a=a.map(f=>R(D({},f),{state:c(f.state,Pe)})),p=r.length-1,o.maxAge&&r.length>o.maxAge&&E(r.length-o.maxAge),d=1/0}break}default:{d=1/0;break}}return a=B(a,d,c,y,s,r,l,e,x),g=i(g,u),{monitorState:g,actionsById:s,nextActionId:S,stagedActionIds:r,skippedActionIds:l,committedState:y,currentStateIndex:p,computedStates:a,isLocked:A,isPaused:x}}}var ne=(()=>{class t{constructor(e,i,o,c,m,u,g,s){let S=_e(g,s.monitor),r=Le(g,S,u,s.monitor,s),l=Y(Y(i.asObservable().pipe(Dt(1)),c.actions$).pipe(M(_)),e,c.liftedActions$).pipe(vt(yt)),y=o.pipe(M(r)),p=xe(s.connectInZone),a=new xt(1);this.liftedStateSubscription=l.pipe(Rt(y),ie(p),bt(({state:E},[T,d])=>{let h=d(E,T);return T.type!==L&&Se(s)&&(h=ke(h,s.predicate,s.actionsSafelist,s.actionsBlocklist)),c.notify(T,h),{state:h,action:T}},{state:S,action:null})).subscribe(({state:E,action:T})=>{if(a.next(E),T.type===L){let d=T.action;m.next(d)}}),this.extensionStartSubscription=c.start$.pipe(ie(p)).subscribe(()=>{this.refresh()});let A=a.asObservable(),x=A.pipe(M(he));Object.defineProperty(x,"state",{value:Ht(x,{manualCleanup:!0,requireSync:!0})}),this.dispatcher=e,this.liftedState=A,this.state=x}ngOnDestroy(){this.liftedStateSubscription.unsubscribe(),this.extensionStartSubscription.unsubscribe()}dispatch(e){this.dispatcher.next(e)}next(e){this.dispatcher.next(e)}error(e){}complete(){}performAction(e){this.dispatch(new j(e,+Date.now()))}refresh(){this.dispatch(new it)}reset(){this.dispatch(new ot(+Date.now()))}rollback(){this.dispatch(new st(+Date.now()))}commit(){this.dispatch(new rt(+Date.now()))}sweep(){this.dispatch(new at)}toggleAction(e){this.dispatch(new ct(e))}jumpToAction(e){this.dispatch(new ut(e))}jumpToState(e){this.dispatch(new pt(e))}importState(e){this.dispatch(new lt(e))}lockChanges(e){this.dispatch(new dt(e))}pauseRecording(e){this.dispatch(new ft(e))}static{this.\u0275fac=function(i){return new(i||t)(I(Z),I(z),I(Zt),I(ye),I(Kt),I(Pt),I(Gt),I(G))}}static{this.\u0275prov=$({token:t,factory:t.\u0275fac})}}return t})();function ie({ngZone:t,connectInZone:n}){return e=>n?new q(i=>e.subscribe({next:o=>t.run(()=>i.next(o)),error:o=>t.run(()=>i.error(o)),complete:()=>t.run(()=>i.complete())})):e}var Fe=new P("@ngrx/store-devtools Is Devtools Extension or Monitor Present");function $e(t,n){return!!t||n.monitor!==fe}function ze(){let t="__REDUX_DEVTOOLS_EXTENSION__";return typeof window=="object"&&typeof window[t]<"u"?window[t]:null}function ve(t={}){return Nt([ye,Z,ne,{provide:Qt,useValue:t},{provide:Fe,deps:[ht,G],useFactory:$e},{provide:ht,useFactory:ze},{provide:G,deps:[Qt],useFactory:Re},{provide:Xt,deps:[ne],useFactory:Ue},{provide:Vt,useExisting:Z}])}function Ue(t){return t.state}var Be={user:null,isLoggedIn:!1},Ae=qt(Be,nt(Jt,(t,{user:n})=>R(D({},t),{user:n,isLoggedIn:!0})),nt(Yt,t=>R(D({},t),{user:null,isLoggedIn:!1})));var Ee={user:Ae};var Te=[{path:"",loadChildren:()=>import("./chunk-3XX2TBE7.js").then(t=>t.homeRoutes)},{path:"",loadChildren:()=>import("./chunk-OZVWZC4Z.js").then(t=>t.authRoutes)},{path:"article",loadChildren:()=>import("./chunk-EHGETAW6.js").then(t=>t.articleRoutes)},{path:"**",redirectTo:""}];var Oe={providers:[Lt({eventCoalescing:!0}),Wt(Ee),ve({maxAge:25,logOnly:!Ft()}),Bt(Te),$t()]};var V=class t{static \u0275fac=function(e){return new(e||t)};static \u0275cmp=k({type:t,selectors:[["app-header"]],decls:14,vars:0,consts:[[1,"navbar","navbar-light"],[1,"container"],["href","/",1,"navbar-brand"],[1,"nav","navbar-nav","pull-xs-right"],[1,"nav-item"],["href","/",1,"nav-link","active"],["href","/login",1,"nav-link"],["href","/register",1,"nav-link"]],template:function(e,i){e&1&&(C(0,"nav",0)(1,"div",1)(2,"a",2),O(3,"conduit"),b(),C(4,"ul",3)(5,"li",4)(6,"a",5),O(7,"Home"),b()(),C(8,"li",4)(9,"a",6),O(10,"Sign in"),b()(),C(11,"li",4)(12,"a",7),O(13,"Sign up"),b()()()()())},encapsulation:2})};var K=class t{static \u0275fac=function(e){return new(e||t)};static \u0275cmp=k({type:t,selectors:[["app-footer"]],decls:9,vars:0,consts:[[1,"container"],["href","/",1,"logo-font"],[1,"attribution"],["href","https://thinkster.io"]],template:function(e,i){e&1&&(C(0,"footer")(1,"div",0)(2,"a",1),O(3,"conduit"),b(),C(4,"span",2),O(5," An interactive learning project from "),C(6,"a",3),O(7,"Thinkster"),b(),O(8,". Code & design licensed under MIT. "),b()()())},encapsulation:2})};var X=class t{static \u0275fac=function(e){return new(e||t)};static \u0275cmp=k({type:t,selectors:[["app-root"]],decls:3,vars:0,template:function(e,i){e&1&&_t(0,"app-header")(1,"router-outlet")(2,"app-footer")},dependencies:[Ut,V,K],encapsulation:2})};zt(X,Oe).catch(t=>console.error(t));