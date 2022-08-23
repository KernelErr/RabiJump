import{c as r,a as e,_ as d,b0 as h,j as a,Q as C,aZ as i,aP as l,bb as u,X as m}from"./index.fb700652.js";import{C as f}from"./ContentHeader.af246c83.js";import{S as p}from"./SwitchThemeButton.f8b4d481.js";import{u as g}from"./useTranslation.2253e192.js";function _(t){return e("svg",{...d({viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",width:"1em",height:"1em",focusable:!1,"aria-hidden":!0},t),children:e("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M6.5 2C4.567 2 3 3.567 3 5.5V18.5C3 20.433 4.567 22 6.5 22H12C12.8284 22 13.5 21.3284 13.5 20.5C13.5 19.6716 12.8284 19 12 19H6.5C6.22386 19 6 18.7761 6 18.5V5.5C6 5.22386 6.22386 5 6.5 5H12C12.8284 5 13.5 4.32843 13.5 3.5C13.5 2.67157 12.8284 2 12 2H6.5ZM15.9393 5.93934C16.5251 5.35355 17.4749 5.35355 18.0607 5.93934L23.0607 10.9393C23.2045 11.0832 23.313 11.2489 23.3862 11.4258C23.4595 11.6027 23.5 11.7966 23.5 12C23.5 12.2034 23.4595 12.3973 23.3862 12.5742C23.313 12.7511 23.2045 12.9168 23.0607 13.0607L18.0607 18.0607C17.4749 18.6464 16.5251 18.6464 15.9393 18.0607C15.3536 17.4749 15.3536 16.5251 15.9393 15.9393L18.3787 13.5H11C10.1716 13.5 9.5 12.8284 9.5 12C9.5 11.1716 10.1716 10.5 11 10.5H18.3787L15.9393 8.06066C15.3536 7.47487 15.3536 6.52513 15.9393 5.93934Z",fill:"currentColor"})})}const w=r(_,"exit"),b=w,v="_root_19qrf_1",x="_section_19qrf_2",S="_wrapSwitch_19qrf_14",H="_sep_19qrf_20",L="_label_19qrf_28",o={root:v,section:x,wrapSwitch:S,sep:H,label:L};function B(){const{t,i18n:s}=g();return h(n=>[n.app,n.switchTheme]),a(C,{children:[e(f,{title:t(i.Config)}),a("div",{className:o.section,children:[a("div",{children:[e("div",{className:o.label,children:t(i.Language)}),e(l,{style:{width:"100%"},defaultValue:s.language,onChange:n=>s.changeLanguage(n),children:u.map(([n,c],q)=>e(l.Option,{value:n,children:c},n))})]}),a("div",{children:[e("div",{className:o.label,children:"Action"}),e("a",{href:"#/",children:e(m,{block:!0,icon:e(b,{}),children:t(i.switch_backend)})})]}),a("div",{children:[e("div",{className:o.label,children:t("Theme")}),e(p,{block:!0})]})]})]})}export{B as default};
