(this["webpackJsonpreact-courses"]=this["webpackJsonpreact-courses"]||[]).push([[0],{13:function(e,t,n){},14:function(e,t,n){},16:function(e,t,n){"use strict";n.r(t);var r=n(1),s=n.n(r),a=n(8),c=n.n(a),o=(n(13),n(2)),i=n(3),u=n(5),d=n(4),l=n(6),j=(n(14),n(0)),p=function(e){Object(u.a)(n,e);var t=Object(d.a)(n);function n(){var e;Object(o.a)(this,n);for(var r=arguments.length,s=new Array(r),a=0;a<r;a++)s[a]=arguments[a];return(e=t.call.apply(t,[this].concat(s))).state={name:""},e.handleChange=function(t){e.setState(Object(l.a)({},t.target.id,t.target.value)),console.log(e.state)},e.submitForm=function(t){t.preventDefault(),e.props.addCourse(e.state),e.setState({name:""})},e}return Object(i.a)(n,[{key:"render",value:function(){return Object(j.jsx)(j.Fragment,{children:Object(j.jsxs)("form",{className:"border",onSubmit:this.submitForm,children:[Object(j.jsx)("input",{type:"text",id:"name",name:"name",onChange:this.handleChange,value:this.state.name}),Object(j.jsx)("button",{children:"Add Course"})]})})}}]),n}(r.Component),h=function(e){Object(u.a)(n,e);var t=Object(d.a)(n);function n(){var e;Object(o.a)(this,n);for(var r=arguments.length,s=new Array(r),a=0;a<r;a++)s[a]=arguments[a];return(e=t.call.apply(t,[this].concat(s))).state={isEdit:!1,id:e.props.course.id,name:e.props.course.name},e.handleChange=function(t){e.setState(Object(l.a)({},t.target.id,t.target.value)),console.log("new state",e.state)},e.submitForm=function(t){t.preventDefault(),e.props.updateCourse(e.state.id,e.input.value)},e.renderCourse=function(){var t=e.props.deleteCourse;return Object(j.jsx)(j.Fragment,{children:Object(j.jsxs)("li",{children:[Object(j.jsx)("span",{children:e.props.course.name}),Object(j.jsx)("button",{className:"text-primary",onClick:e.toggleEdit,children:Object(j.jsx)("p",{style:{cursor:"pointer"},children:"Edit"})}),Object(j.jsx)("button",{className:"text-danger",onClick:function(){return t(e.props.course.id)},children:Object(j.jsx)("p",{style:{cursor:"pointer"},children:"Delete"})})]})})},e.renderEdit=function(){return console.log("props",e.props),Object(j.jsxs)("form",{className:"border",onSubmit:e.submitForm,children:[Object(j.jsx)("input",{type:"text",id:"name",name:"name",ref:function(t){return e.input=t},onChange:e.handleChange,defaultValue:e.state.name}),Object(j.jsx)("button",{onClick:e.toggleEdit,children:"Update Course"})]})},e.toggleEdit=function(){e.setState({isEdit:!e.state.isEdit})},e}return Object(i.a)(n,[{key:"render",value:function(){return Object(j.jsx)(j.Fragment,{children:this.state.isEdit?this.renderEdit():this.renderCourse()})}}]),n}(r.Component),b=function(e){Object(u.a)(n,e);var t=Object(d.a)(n);function n(){var e;Object(o.a)(this,n);for(var r=arguments.length,s=new Array(r),a=0;a<r;a++)s[a]=arguments[a];return(e=t.call.apply(t,[this].concat(s))).state={courses:[{id:1,name:"Python"},{id:2,name:"Flask"},{id:3,name:"Postgres"},{id:4,name:"Javascript"},{id:5,name:"Html"},{id:6,name:"Css"},{id:7,name:"React"}]},e.addCourse=function(t){console.log("Adding ...",t);var n=e.state.courses;n.push(t),e.setState({courses:n})},e.deleteCourse=function(t){var n=e.state.courses.filter((function(e){return e.id!==t}));e.setState({courses:n})},e.updateCourse=function(t,n){var r=e.state.courses.find((function(e){return e.id===t}));console.log("updating...",r)},e}return Object(i.a)(n,[{key:"render",value:function(){var e=this;return Object(j.jsx)("div",{className:"App container",children:Object(j.jsxs)("header",{className:"App-header",children:[Object(j.jsx)("h2",{children:"Courses List"}),Object(j.jsx)("ul",{children:this.state.courses.map((function(t){return Object(j.jsx)(h,{course:t,updateCourse:e.updateCourse,deleteCourse:e.deleteCourse},t.id)}))}),Object(j.jsx)(p,{addCourse:this.addCourse})]})})}}]),n}(r.Component),m=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,17)).then((function(t){var n=t.getCLS,r=t.getFID,s=t.getFCP,a=t.getLCP,c=t.getTTFB;n(e),r(e),s(e),a(e),c(e)}))};c.a.render(Object(j.jsx)(s.a.StrictMode,{children:Object(j.jsx)(b,{})}),document.getElementById("root")),m()}},[[16,1,2]]]);
//# sourceMappingURL=main.de8063d7.chunk.js.map