(this["webpackJsonpmy-app"]=this["webpackJsonpmy-app"]||[]).push([[3],{394:function(e,a,s){"use strict";s.d(a,"a",(function(){return g}));var t=s(8),i=s(79),n=s(1),c=(s(0),s(20)),r=s(23),d=function(e){return{isAuth:e.auth.isAuth}};function g(e){return Object(r.b)(d)((function(a){var s=a.isAuth,r=Object(i.a)(a,["isAuth"]);return s?Object(n.jsx)(e,Object(t.a)({},r)):Object(n.jsx)(c.a,{to:"/login"})}))}},395:function(e,a,s){e.exports={dialogsContainer:"Dialogs_dialogsContainer__3xYxC",dialogName:"Dialogs_dialogName__16_Nc"}},396:function(e,a,s){e.exports={dialogItem:"DialogItem_dialogItem__2RuWv",avatar:"DialogItem_avatar__12OzI",userName:"DialogItem_userName__2bG4n"}},397:function(e,a,s){e.exports={message:"Message_message__1MOXo",leftaling:"Message_leftaling__2uzk7",rightaling:"Message_rightaling__2_fi9",messageAv:"Message_messageAv__b86z7",userName:"Message_userName__3djD8"}},403:function(e,a,s){"use strict";s.r(a);var t=s(168),i=s(1),n=(s(0),s(395)),c=s.n(n),r=s(28),d=s(396),g=s.n(d),l=s(393),o=function(e){var a="/dialogs/".concat(e.id);return Object(i.jsxs)(l.a,{className:g.a.dialogItem,children:[Object(i.jsx)("img",{src:e.img,className:g.a.avatar,alt:"avatar"}),Object(i.jsx)(r.b,{to:a,className:g.a.userName,children:e.name})]})},m=s(397),j=s.n(m),u=function(e){return Object(i.jsxs)("div",{className:j.a.message+" "+(1===e.userId?j.a.leftaling:j.a.rightaling),children:[Object(i.jsx)("img",{src:e.avatar,className:j.a.messageAv,alt:"avatar"}),Object(i.jsxs)("div",{className:j.a.userName,children:[" ",e.message," "]})]})},b=s(125),x=s(169),h=s(54),O=s(97),p=s(343),_=s(382),f=s(379),v=s(342),N=s(383),y=Object(O.a)(50),I=Object(x.a)({form:"addNewMessage"})((function(e){return Object(i.jsxs)("form",{onSubmit:e.handleSubmit,style:{padding:"15px"},children:[Object(i.jsx)("div",{children:Object(i.jsx)(b.a,{name:"addNewMessage",component:h.b,placeholder:"Type your message here...",validate:[O.b,y],style:{width:"calc(100% - 20px)",maxWidth:"calc(100% - 20px)",padding:"10px",maxHeight:"70px",marginBottom:"10px"}})}),Object(i.jsx)("div",{style:{textAlign:"right"},children:Object(i.jsx)(N.a,{type:"submit",variant:"outlined",color:"primary",children:"Send your message"})})]})})),M=function(e){var a=e.dialogs.map((function(e){return Object(i.jsx)(o,{name:e.name,id:e.id,img:e.img},e.id)})),s=e.messages.map((function(e){return Object(i.jsx)(u,{message:e.message,id:e.id,userId:e.userId,avatar:e.avatar},e.id)}));return Object(i.jsx)(p.a,{style:{width:"100%",paddingBottom:"20px",height:"650px"},children:Object(i.jsxs)(_.a,{container:!0,style:{padding:"15px",height:"100%"},spacing:2,children:[Object(i.jsx)(_.a,{item:!0,xs:4,children:Object(i.jsx)(p.a,{style:{height:"100%",padding:"15px",overflow:"auto",marginBottom:"20px"},children:Object(i.jsx)(f.a,{children:a})})}),Object(i.jsx)(_.a,{item:!0,xs:8,children:Object(i.jsxs)(p.a,{className:c.a.dialogsContainer,children:[Object(i.jsxs)("div",{children:[Object(i.jsx)(v.a,{variant:"h4",className:c.a.dialogName,children:"Igor"}),Object(i.jsx)("div",{children:s})]}),Object(i.jsx)(p.a,{children:Object(i.jsx)(I,{onSubmit:function(a){e.addMessage(a.addNewMessage)}})})]})})]})})},w=s(23),A=s(19),D=s(394);a.default=Object(A.d)(Object(w.b)((function(e){return{dialogs:e.dialogsPage.dialogs,messages:e.dialogsPage.messages}}),(function(e){return{addMessage:function(a){e(Object(t.a)(a))}}})),D.a)(M)}}]);
//# sourceMappingURL=3.af3c032b.chunk.js.map