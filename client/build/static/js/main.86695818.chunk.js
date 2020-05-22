(this["webpackJsonptask-board-client"]=this["webpackJsonptask-board-client"]||[]).push([[0],{165:function(e,a,t){},166:function(e,a,t){"use strict";t.r(a);var r=t(0),n=t.n(r),o=t(18),s=t.n(o),c=t(15),i=t(79),l=t(14),d=t(60),u=t(80),p=t.n(u),m=t(81),b=t(6),f={id:"0",username:"",token:"",currentBoardID:"0",loggedIn:!1};var h=t(44),k={boards:[]};var E=Object(l.c)({auth:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:f,a=arguments.length>1?arguments[1]:void 0;switch(a.type){case"LOGIN_SUCCESS":return Object(b.a)({},e,{id:a.payload.id,username:a.payload.username,token:a.payload.token,currentBoardID:a.payload.currentBoardID,loggedIn:a.payload.loggedIn});case"SET_CURRENT_BOARD":return Object(b.a)({},e,{currentBoardID:a.payload});case"LOGOUT":return Object(b.a)({},f);default:return e}},task:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:k,a=arguments.length>1?arguments[1]:void 0;switch(a.type){case"LOAD_BOARDS":return Object(b.a)({},e,{boards:a.payload});case"ADD_BOARD":return Object(b.a)({},e,{boards:[].concat(Object(h.a)(e.boards),[a.payload])});case"EDIT_BOARD":return Object(b.a)({},e,{boards:e.boards.map((function(e){return e.id===a.payload.id?Object(b.a)({},e,{name:a.payload.name}):e}))});case"DELETE_BOARD":return Object(b.a)({},e,{boards:e.boards.filter((function(e){return e.id!==a.payload}))});case"ADD_LIST":return Object(b.a)({},e,{boards:e.boards.map((function(e){return e.id===a.payload.boardID?Object(b.a)({},e,{taskList:[].concat(Object(h.a)(e.taskList),[a.payload.taskList])}):e}))});case"EDIT_LIST":return Object(b.a)({},e,{boards:e.boards.map((function(e){return e.id===a.payload.boardID?Object(b.a)({},e,{taskList:e.taskList.map((function(e){return e.id===a.payload.taskList.id?Object(b.a)({},e,{name:a.payload.taskList.name}):e}))}):e}))});case"DELETE_LIST":return Object(b.a)({},e,{boards:e.boards.map((function(e){return e.id===a.payload.boardID?Object(b.a)({},e,{taskList:e.taskList.filter((function(e){return e.id!==a.payload.id}))}):e}))});case"ADD_TASK":return Object(b.a)({},e,{boards:e.boards.map((function(e){return e.id===a.payload.boardID?Object(b.a)({},e,{taskList:e.taskList.map((function(e){return e.id===a.payload.listID?Object(b.a)({},e,{tasks:[].concat(Object(h.a)(e.tasks),[a.payload.task])}):e}))}):e}))});case"EDIT_TASK":return Object(b.a)({},e,{boards:e.boards.map((function(e){return e.id===a.payload.boardID?Object(b.a)({},e,{taskList:e.taskList.map((function(e){return e.id===a.payload.listID?Object(b.a)({},e,{tasks:e.tasks.map((function(e){return e.id===a.payload.id?Object(b.a)({},e,{name:a.payload.name}):e}))}):e}))}):e}))});case"DELETE_TASK":return Object(b.a)({},e,{boards:e.boards.map((function(e){return e.id===a.payload.boardID?Object(b.a)({},e,{taskList:e.taskList.map((function(e){return e.id===a.payload.listID?Object(b.a)({},e,{tasks:e.tasks.filter((function(e){return e.id!==a.payload.id}))}):e}))}):e}))});case"LOAD_BOARD":return Object(b.a)({},e,{boards:e.boards.map((function(e){return e.id===a.payload.id?Object(b.a)({},e,{name:a.payload.name,taskList:a.payload.taskList}):e}))});case"MOVE_TASK":return Object(b.a)({},e,{boards:e.boards.map((function(e){return e.id===a.payload.boardID?Object(b.a)({},e,{taskList:e.taskList.map((function(e){return e.id===a.payload.id?Object(b.a)({},e,{tasks:a.payload.tasks}):e}))}):e}))});case"LOGOUT":return Object(b.a)({},k);default:return e}}}),g={key:"main",storage:p.a},v=Object(d.a)(g,E),O=Object(l.a)(m.a),y=Object(l.e)(v,O),D=Object(d.b)(y),I=t(20),w=t(21),T=t(22),j=t(23),x=t(31),L=t(29),B=t(25),S=t(7),M=t.n(S),A=t(13),C=t(83),N=t(82),P=t.n(N),_=function(e){return{type:"LOGIN_SUCCESS",payload:e}},R=function(){return{type:"LOGOUT"}},U=function(e){return{type:"LOAD_BOARDS",payload:e}},G=t(168),F=t(169),K=t(170),J=t(171),z=t(172),W=t(173),H=t(183),V=t(184),Y=t(185),$=t(174),q=function(e){Object(j.a)(t,e);var a=Object(T.a)(t);function t(){var e;Object(I.a)(this,t);for(var r=arguments.length,n=new Array(r),o=0;o<r;o++)n[o]=arguments[o];return(e=a.call.apply(a,[this].concat(n))).state={isOpen:!1},e.toggle=function(){e.setState({isOpen:!e.state.isOpen})},e}return Object(w.a)(t,[{key:"render",value:function(){var e=this.state.isOpen,a=this.props,t=a.username,r=a.logout;return n.a.createElement(G.a,{color:"dark",dark:!0,expand:"md",fixed:"top"},n.a.createElement(F.a,{href:"/"},"Task Board"),n.a.createElement(K.a,{onClick:this.toggle}),n.a.createElement(J.a,{isOpen:e,navbar:!0,className:"justify-content-end"},n.a.createElement(z.a,{navbar:!0},n.a.createElement(W.a,null,n.a.createElement(x.b,{to:"/taskBoard",className:"nav-link",activeClassName:"active"},"Home")),n.a.createElement(W.a,null,n.a.createElement(x.b,{to:"/boards",className:"nav-link",activeClassName:"active"},"Boards")),n.a.createElement(H.a,{nav:!0,inNavbar:!0},n.a.createElement(V.a,{nav:!0,caret:!0},t),n.a.createElement(Y.a,{right:!0},n.a.createElement($.a,{onClick:r},"Logout"))))))}}]),t}(n.a.Component),Q={logout:R},X=Object(c.b)((function(e){var a=e.auth;return{loggedIn:a.loggedIn,username:a.username}}),Q)(q),Z=t(175),ee=t(176),ae=t(177),te=t(178),re=function(e){var a=e.label,t=e.type,r=e.name,o=e.value,s=e.onChange,c=e.showError,i=e.errorMessage,l=e.rows,d=e.maxLength;return n.a.createElement(Z.a,null,n.a.createElement(ee.a,null,a),n.a.createElement(ae.a,{type:t,name:r,value:o,onChange:s,invalid:c,rows:l,maxLength:d}),n.a.createElement(te.a,null,i))},ne=t(182),oe=t(179),se=t(180),ce=t(181),ie=function(e){Object(j.a)(t,e);var a=Object(T.a)(t);function t(){var e;Object(I.a)(this,t);for(var r=arguments.length,n=new Array(r),o=0;o<r;o++)n[o]=arguments[o];return(e=a.call.apply(a,[this].concat(n))).state={showDelete:!1},e.showDelete=function(){e.setState({showDelete:!0})},e.deleteAction=function(){e.props.deleteAction(),e.setState({showDelete:!1})},e.closeDelete=function(){e.setState({showDelete:!1})},e}return Object(w.a)(t,[{key:"render",value:function(){var e=this.props,a=e.modalOpen,t=e.modalAction,r=e.modalType,o=e.submitModal,s=e.closeModal,c=e.children;return n.a.createElement("div",null,n.a.createElement(ne.a,{isOpen:a,centered:!0},n.a.createElement(oe.a,{toggle:s},t," ",r),n.a.createElement(se.a,null,c),n.a.createElement(ce.a,{className:"Edit"===t?"justify-content-between":""},"Edit"===t&&n.a.createElement(C.a,{color:"primary",onClick:this.showDelete},"Delete"),n.a.createElement(C.a,{color:"primary",onClick:o},"Edit"===t?"Save":t))),n.a.createElement(ne.a,{isOpen:this.state.showDelete,centered:!0,size:"sm"},n.a.createElement(se.a,null,"Are you sure you want to delete?"),n.a.createElement(ce.a,{centered:!0,className:"justify-content-center"},n.a.createElement(C.a,{color:"primary",onClick:this.closeDelete},"No"),n.a.createElement(C.a,{color:"primary",onClick:this.deleteAction},"Yes"))))}}]),t}(n.a.Component),le=function(){var e=Object(A.a)(M.a.mark((function e(a,t){var r,n,o,s,c,i=arguments;return M.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(r=i.length>2&&void 0!==i[2]?i[2]:{},e.prev=1,n=y.getState(),null!=(o=n.auth.token)&&""!==o){e.next=7;break}return y.dispatch({type:"LOGOUT"}),e.abrupt("return",{status:!1,error:"not logged in"});case 7:return s="POST"===t||"PUT"===t?{body:JSON.stringify(r)}:{},e.next=10,fetch("/api/"+a,Object(b.a)({method:t,headers:{Accept:"application/json",authorization:"Bearer ".concat(o),"Content-Type":"application/json"}},s));case 10:if(401!==(c=e.sent).status){e.next=14;break}return y.dispatch({type:"LOGOUT"}),e.abrupt("return",{status:!1,error:"Not logged"});case 14:return e.next=16,c.json();case 16:return e.abrupt("return",e.sent);case 19:if(e.prev=19,e.t0=e.catch(1),console.log(e.t0),!e.t0.error){e.next=24;break}return e.abrupt("return",{status:!1,error:e.t0.error});case 24:return e.abrupt("return",{status:!1,error:""});case 25:case"end":return e.stop()}}),e,null,[[1,19]])})));return function(a,t){return e.apply(this,arguments)}}(),de=function(){var e=Object(A.a)(M.a.mark((function e(a,t){var r,n,o,s=arguments;return M.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=s.length>2&&void 0!==s[2]?s[2]:{},e.prev=1,n="POST"===t||"PUT"===t?{body:JSON.stringify(r)}:{},e.next=5,fetch("/api/"+a,Object(b.a)({method:t,headers:{Accept:"application/json","Content-Type":"application/json"}},n));case 5:return o=e.sent,e.next=8,o.json();case 8:return e.abrupt("return",e.sent);case 11:if(e.prev=11,e.t0=e.catch(1),console.log(e.t0),!e.t0.error){e.next=16;break}return e.abrupt("return",{status:!1,error:e.t0.error});case 16:return e.abrupt("return",{status:!1,error:""});case 17:case"end":return e.stop()}}),e,null,[[1,11]])})));return function(a,t){return e.apply(this,arguments)}}(),ue=function(e){Object(j.a)(t,e);var a=Object(T.a)(t);function t(){var e;Object(I.a)(this,t);for(var r=arguments.length,o=new Array(r),s=0;s<r;s++)o[s]=arguments[s];return(e=a.call.apply(a,[this].concat(o))).state={boardID:"0",boardName:"",modalOpen:!1,modalAction:"",showError:!1,errorMessage:""},e.loadBoards=Object(A.a)(M.a.mark((function a(){var t,r;return M.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,le("board","GET");case 2:!0===(t=a.sent).status&&(r=t.boards,e.props.loadBoards(r));case 4:case"end":return a.stop()}}),a)}))),e.submitModal=function(){var a=e.state.modalAction;"Delete"===a?e.deleteBoard():"Edit"===a?e.editBoard():e.createBoard()},e.deleteBoard=Object(A.a)(M.a.mark((function a(){var t;return M.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return t=e.state.boardID,a.next=3,le("board/"+t,"DELETE");case 3:if(!0!==a.sent.status){a.next=8;break}return e.props.deleteBoard(t),e.closeModal(),a.abrupt("return",!0);case 8:e.setState({showError:!0,errorMessage:"Please try again"});case 9:case"end":return a.stop()}}),a)}))),e.editBoard=Object(A.a)(M.a.mark((function a(){var t,r,n,o;return M.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:if(t=e.state,r=t.boardID,""!==(n=t.boardName)){a.next=4;break}return e.setState({showError:!0,errorMessage:"Please enter name"}),a.abrupt("return",!1);case 4:return o={id:r,name:n},a.next=7,le("board/"+r,"PUT",o);case 7:if(!0!==a.sent.status){a.next=12;break}return e.props.editBoard(o),e.closeModal(),a.abrupt("return",!0);case 12:e.setState({showError:!0,errorMessage:"Board name in use"});case 13:case"end":return a.stop()}}),a)}))),e.createBoard=Object(A.a)(M.a.mark((function a(){var t,r,n,o;return M.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:if(""!==(t=e.state.boardName)){a.next=4;break}return e.setState({showError:!0,errorMessage:"Please enter name"}),a.abrupt("return",!1);case 4:return a.next=6,le("board","POST",{name:t});case 6:if(!0!==(r=a.sent).status){a.next=13;break}return n=r.boardID,o={id:n,name:t,taskList:[]},e.props.addBoard(o),e.closeModal(),a.abrupt("return",!0);case 13:e.setState({showError:!0,errorMessage:"Board name in use"});case 14:case"end":return a.stop()}}),a)}))),e.onChange=function(a){var t=a.currentTarget.name,r=a.currentTarget.value;e.setState(Object(B.a)({},t,r))},e.openCreateModal=function(){e.setState({modalOpen:!0,modalAction:"Create"})},e.openEditModal=function(a){var t=a.id,r=a.name;e.setState({modalOpen:!0,modalAction:"Edit",boardID:t,boardName:r})},e.closeModal=function(){e.setState({modalOpen:!1,boardName:"",boardID:"0",showError:!1,errorMessage:""})},e.actionsFormatter=function(a,t){return n.a.createElement("div",{className:"btn-actions"},n.a.createElement(C.a,{outline:!0,color:"primary",size:"sm",onClick:function(){return e.openEditModal(t)}},"Edit"))},e}return Object(w.a)(t,[{key:"componentDidMount",value:function(){this.loadBoards()}},{key:"render",value:function(){var e=this.state,a=e.boardName,t=e.modalOpen,r=e.modalAction,o=this.props.boards,s=[{dataField:"name",text:"Board Name",sort:!0},{dataField:"actions",text:"Actions",isDummyField:!0,formatter:this.actionsFormatter,headerStyle:function(){return{width:"130px"}}}];return n.a.createElement("div",{className:"App"},n.a.createElement(X,null),n.a.createElement("div",{className:"section"},n.a.createElement("div",{className:"d-inline-block mb-2"},n.a.createElement("h3",null,"Boards ")),n.a.createElement(C.a,{color:"success",className:"float-right",onClick:this.openCreateModal},"Create Board"),n.a.createElement(P.a,{bootstrap4:!0,keyField:"id",data:o,columns:s})),n.a.createElement(ie,{modalOpen:t,modalAction:r,modalType:"Board",deleteAction:this.deleteBoard,submitModal:this.submitModal,closeModal:this.closeModal},"Delete"===r?n.a.createElement("p",null,"Board: ",a):n.a.createElement(re,{name:"boardName",label:"Select Board",type:"text",value:a,onChange:this.onChange,showError:this.state.showError,errorMessage:this.state.errorMessage,maxLength:25})))}}]),t}(n.a.Component),pe={loadBoards:U,addBoard:function(e){return{type:"ADD_BOARD",payload:e}},editBoard:function(e){return{type:"EDIT_BOARD",payload:e}},deleteBoard:function(e){return{type:"DELETE_BOARD",payload:e}}},me=Object(c.b)((function(e){return{boards:e.task.boards}}),pe)(ue),be=t(35),fe=function(e){var a=e.label,t=e.name,r=e.value,o=e.selectLabel,s=e.options,c=e.onChange;return n.a.createElement(Z.a,null,n.a.createElement(ee.a,null,a),n.a.createElement(ae.a,{type:"select",name:t,value:r,onChange:c,className:"pointer"},n.a.createElement("option",{value:"0"},o),s.map((function(e,a){return n.a.createElement("option",{value:e.id,key:a},e.name)}))))},he=t(86),ke=t(87),Ee=function(e){var a=e.id,t=e.name,r=e.index,o=e.editTask;return n.a.createElement(be.b,{key:a,draggableId:a,index:r},(function(e,a){return n.a.createElement("div",Object.assign({ref:e.innerRef},e.draggableProps,e.dragHandleProps,{style:(a.isDragging,r=e.draggableProps.style,Object(b.a)({position:"relative",userSelect:"none",padding:"16px 8px",margin:"0 0 12px 0",background:"#FFF",boxShadow:"0 1px 1px rgba(0,0,0, .20)",border:"1px solid #fff"},r)),onClick:o}),n.a.createElement("span",{className:"btn-span"},t));var r}))},ge=function(e){var a=e.id,t=e.name,r=e.tasks,o=e.showEdit,s=e.showAddTask,c=e.showEditTask;return n.a.createElement(be.c,{droppableId:a},(function(e,a){return n.a.createElement("div",Object.assign({ref:e.innerRef,className:"relative",style:(i=a.isDraggingOver,{background:i?"lightblue":"#f3f5f7",borderRadius:"4px",border:"1px solid #eee",padding:8,width:300,minWidth:300,marginRight:10,marginBottom:30})},e.droppableProps),n.a.createElement("div",{className:"tasklist-header",onClick:o},n.a.createElement("h4",null,t)),n.a.createElement("div",{className:"task-create-container",onClick:s},n.a.createElement(he.a,{icon:ke.a})),n.a.createElement("div",{className:"task-container"},r&&r.map((function(e,a){return n.a.createElement(Ee,{key:a,id:e.id,name:e.name,index:a,editTask:function(){return c(e)}})})),e.placeholder));var i}))},ve=t(61),Oe=function(e,a,t){var r=Array.from(e),n=r.splice(a,1),o=Object(ve.a)(n,1)[0];return r.splice(t,0,o),r},ye=function(e,a,t,r){var n=Array.from(e),o=Array.from(a),s=n.splice(t,1),c=Object(ve.a)(s,1)[0];return o.splice(r,0,c),{sourceItems:n,destinationItems:o}},De=function(e){Object(j.a)(t,e);var a=Object(T.a)(t);function t(){var e;Object(I.a)(this,t);for(var r=arguments.length,n=new Array(r),o=0;o<r;o++)n[o]=arguments[o];return(e=a.call.apply(a,[this].concat(n))).state={listID:"0",listName:"",taskID:"0",taskName:"",modalOpen:!1,modalAction:"",modalType:"",showError:!1,errorMessage:""},e.checkAuth=Object(A.a)(M.a.mark((function a(){var t,r,n,o,s,c;return M.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,le("auth/verify","GET");case 2:if(!0!==(t=a.sent).status){a.next=11;break}return r=t.user,n=t.token,o=t.boards,s=r.currentBoard?r.currentBoard:"0",c={id:r.id,username:r.name,token:n,currentBoardID:s,loggedIn:!0},e.props.loginSuccess(c),e.props.loadBoards(o),e.loadBoard(s),a.abrupt("return",!0);case 11:case"end":return a.stop()}}),a)}))),e.submitModal=function(){var a=e.state,t=a.modalAction;"Task"===a.modalType?"Edit"===t?e.editTask():e.createTask():"Edit"===t?e.editList():e.createList()},e.deleteList=Object(A.a)(M.a.mark((function a(){var t,r,n;return M.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return t=e.props.currentBoardID,r=e.state.listID,a.next=4,le("taskList/"+r,"DELETE");case 4:if(!0!==a.sent.status){a.next=10;break}return n={boardID:t,id:r},e.props.deleteList(n),e.closeModal(),a.abrupt("return",!0);case 10:e.setState({showError:!0,errorMessage:"Please try again"});case 11:case"end":return a.stop()}}),a)}))),e.editList=Object(A.a)(M.a.mark((function a(){var t,r,n,o,s;return M.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:if(t=e.props.currentBoardID,r=e.state,n=r.listID,""!==(o=r.listName)){a.next=5;break}return e.setState({showError:!0,errorMessage:"Please enter name"}),a.abrupt("return",!1);case 5:return a.next=7,le("taskList/"+n,"PUT",{name:o});case 7:if(!0!==a.sent.status){a.next=13;break}return s={id:n,name:o,tasks:[]},e.props.editList({boardID:t,taskList:s}),e.closeModal(),a.abrupt("return",!0);case 13:e.setState({showError:!0,errorMessage:"Please try again"});case 14:case"end":return a.stop()}}),a)}))),e.createList=Object(A.a)(M.a.mark((function a(){var t,r,n,o,s;return M.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:if(t=e.props.currentBoardID,""!==(r=e.state.listName)){a.next=5;break}return e.setState({showError:!0,errorMessage:"Please enter name"}),a.abrupt("return",!1);case 5:return a.next=7,le("taskList","POST",{name:r,boardID:t});case 7:if(!0!==(n=a.sent).status){a.next=14;break}return o=n.taskListID,s={id:o,name:r,tasks:[]},e.props.addList({boardID:t,taskList:s}),e.closeModal(),a.abrupt("return",!0);case 14:e.setState({showError:!0,errorMessage:"Please try again"});case 15:case"end":return a.stop()}}),a)}))),e.deleteTask=Object(A.a)(M.a.mark((function a(){var t,r,n,o,s;return M.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return t=e.props.currentBoardID,r=e.state,n=r.listID,o=r.taskID,a.next=4,le("task/"+o,"DELETE");case 4:if(!0!==a.sent.status){a.next=10;break}return s={boardID:t,listID:n,id:o},e.props.deleteTask(s),e.closeModal(),a.abrupt("return",!0);case 10:e.setState({showError:!0,errorMessage:"Please try again"});case 11:case"end":return a.stop()}}),a)}))),e.editTask=Object(A.a)(M.a.mark((function a(){var t,r,n,o,s,c;return M.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:if(t=e.props.currentBoardID,r=e.state,n=r.listID,o=r.taskID,""!==(s=r.taskName)){a.next=5;break}return e.setState({showError:!0,errorMessage:"Please enter name"}),a.abrupt("return",!1);case 5:return a.next=7,le("task/"+o,"PUT",{name:s});case 7:if(!0!==a.sent.status){a.next=13;break}return c={boardID:t,listID:n,id:o,name:s},e.props.editTask(c),e.closeModal(),a.abrupt("return",!0);case 13:e.setState({showError:!0,errorMessage:"Please try again"});case 14:case"end":return a.stop()}}),a)}))),e.createTask=Object(A.a)(M.a.mark((function a(){var t,r,n,o,s,c,i;return M.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:if(t=e.props.currentBoardID,r=e.state,n=r.listID,""!==(o=r.taskName)){a.next=5;break}return e.setState({showError:!0,errorMessage:"Please enter name"}),a.abrupt("return",!1);case 5:return a.next=7,le("task","POST",{name:o,listID:n});case 7:if(!0!==(s=a.sent).status){a.next=14;break}return c=s.taskID,i={id:c,name:o},e.props.addTask({boardID:t,listID:n,task:i}),e.closeModal(),a.abrupt("return",!0);case 14:e.setState({showError:!0,errorMessage:"Please try again"});case 15:case"end":return a.stop()}}),a)}))),e.openCreateModal=function(){e.setState({modalOpen:!0,modalAction:"Create",modalType:"List"})},e.openCreateTaskModal=function(a){var t=a.id,r=a.name;e.setState({modalOpen:!0,modalAction:"Create",modalType:"Task",listID:t,listName:r})},e.openEditModal=function(a){var t=a.id,r=a.name;e.setState({modalOpen:!0,modalAction:"Edit",modalType:"List",listID:t,listName:r})},e.openEditTaskModal=function(a,t){var r=a.id,n=a.name;e.setState({modalOpen:!0,modalAction:"Edit",modalType:"Task",listID:r,listName:n,taskID:t.id,taskName:t.name})},e.closeModal=function(){e.setState({modalOpen:!1,modalType:"",listName:"",listID:"0",taskID:"0",taskName:"",showError:!1,errorMessage:""})},e.onChange=function(a){var t=a.currentTarget.name,r=a.currentTarget.value;e.setState(Object(B.a)({},t,r))},e.onDefaultBoardChange=function(a){var t=a.currentTarget.value;e.props.setCurrentBoard(t),e.loadBoard(t),le("user/board/"+t,"GET")},e.loadBoard=function(){var a=Object(A.a)(M.a.mark((function a(t){var r,n;return M.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:if("0"!==t){a.next=2;break}return a.abrupt("return",!1);case 2:return a.next=4,le("board/"+t,"GET");case 4:!0===(r=a.sent).status&&r.board&&(n=r.board,e.props.loadBoard(n));case 6:case"end":return a.stop()}}),a)})));return function(e){return a.apply(this,arguments)}}(),e.onDragEnd=function(a){var t=e.props,r=t.currentBoardID,n=t.currentBoard,o=a.source,s=a.destination;if(s){var c=n.taskList,i=o.droppableId,l=s.droppableId,d=o.index,u=s.index,p={sourceID:i,destinationID:l,sourceIndex:d,destinationIndex:u};if(o.droppableId===s.droppableId){var m=Ie(c,l),b=Oe(m,d,u);return e.props.moveTask({boardID:r,id:l,tasks:b}),void le("taskList/updateOrder","POST",p)}var f=Ie(c,i),h=Ie(c,l),k=ye(f,h,d,u),E=k.sourceItems,g=k.destinationItems;e.props.moveTask({boardID:r,id:i,tasks:E}),e.props.moveTask({boardID:r,id:l,tasks:g}),le("taskList/updateOrder","POST",p)}else console.log("Dropped outside")},e}return Object(w.a)(t,[{key:"componentDidMount",value:function(){this.checkAuth()}},{key:"render",value:function(){var e=this,a=this.props,t=a.boards,r=a.currentBoardID,o=a.currentBoard,s=this.state,c=s.listName,i=s.taskName,l=s.modalOpen,d=s.modalAction,u=s.modalType;return n.a.createElement("div",{className:"App"},n.a.createElement(X,null),n.a.createElement("div",{className:"board-tools"},n.a.createElement("div",{className:"select-board"},n.a.createElement(fe,{name:"defaultBoard",label:"Board Name",value:r,selectLabel:"Select Board",options:t,onChange:this.onDefaultBoardChange})),"0"!==this.props.currentBoardID&&n.a.createElement(C.a,{color:"success",onClick:this.openCreateModal},"Create List")),n.a.createElement("div",{className:"d-flex ml-2"},n.a.createElement(be.a,{onDragEnd:this.onDragEnd},o&&o.taskList&&o.taskList.map((function(a,t){return n.a.createElement(ge,{key:t,id:a.id,name:a.name,tasks:a.tasks,showEdit:function(){return e.openEditModal(a)},showAddTask:function(){return e.openCreateTaskModal(a)},showEditTask:function(t){return e.openEditTaskModal(a,t)}})})))),n.a.createElement(ie,{modalOpen:l,modalAction:d,modalType:u,deleteAction:"List"===u?this.deleteList:this.deleteTask,submitModal:this.submitModal,closeModal:this.closeModal},n.a.createElement("div",null,"List"===u?n.a.createElement("div",null,n.a.createElement(re,{name:"listName",label:"List Name",type:"text",value:c,onChange:this.onChange,showError:this.state.showError,errorMessage:"Please enter a name",maxLength:25})):n.a.createElement("div",null,n.a.createElement("p",null,"List ",c),n.a.createElement(re,{name:"taskName",label:"Task",type:"textarea",value:i,onChange:this.onChange,showError:this.state.showError,errorMessage:this.state.errorMessage,rows:3})))))}}]),t}(n.a.Component),Ie=function(e,a){var t=e.filter((function(e){return e.id===a}))[0];return null==t?[]:t.tasks},we={addList:function(e){return{type:"ADD_LIST",payload:e}},editList:function(e){return{type:"EDIT_LIST",payload:e}},deleteList:function(e){return{type:"DELETE_LIST",payload:e}},addTask:function(e){return{type:"ADD_TASK",payload:e}},editTask:function(e){return{type:"EDIT_TASK",payload:e}},deleteTask:function(e){return{type:"DELETE_TASK",payload:e}},loadBoard:function(e){return{type:"LOAD_BOARD",payload:e}},loadBoards:U,moveTask:function(e){return{type:"MOVE_TASK",payload:e}},setCurrentBoard:function(e){return{type:"SET_CURRENT_BOARD",payload:e}},loginSuccess:_},Te=Object(c.b)((function(e){var a=e.task,t=e.auth,r=a.boards,n=t.currentBoardID,o=function(e,a){return e.filter((function(e){return e.id===a}))[0]}(r,n);return{boards:r,currentBoardID:n,currentBoard:o}}),we)(De),je=function(e){Object(j.a)(t,e);var a=Object(T.a)(t);function t(){var e;Object(I.a)(this,t);for(var r=arguments.length,n=new Array(r),o=0;o<r;o++)n[o]=arguments[o];return(e=a.call.apply(a,[this].concat(n))).state={username:"demo",password:"demo",showError:!1,errorInput:"",errorMessage:""},e.checkLogin=Object(A.a)(M.a.mark((function a(){var t,r,n,o,s,c,i;return M.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:if(t=e.state,r=t.username,n=t.password,""!==r){a.next=4;break}return e.setState({showError:!0,errorInput:"username",errorMessage:"Please enter username"}),a.abrupt("return",!1);case 4:if(""!==n){a.next=7;break}return e.setState({showError:!0,errorInput:"password",errorMessage:"Please enter password"}),a.abrupt("return",!1);case 7:return a.next=9,de("auth/login","POST",{username:r,password:n});case 9:if(!0!==(o=a.sent).status){a.next=15;break}return s=o.user,c=o.token,i={id:s.id,username:s.name,token:c,currentBoardID:s.currentBoard?s.currentBoard:"0",loggedIn:!0},e.props.loginSuccess(i),a.abrupt("return",!0);case 15:e.setState({showError:!0,errorInput:"password",errorMessage:"Invalid username or password"});case 16:case"end":return a.stop()}}),a)}))),e.onChange=function(a){var t,r=a.currentTarget.name,n=a.currentTarget.value;e.setState((t={},Object(B.a)(t,r,n),Object(B.a)(t,"showError",!1),t))},e}return Object(w.a)(t,[{key:"render",value:function(){var e=this.state,a=e.username,t=e.password;return n.a.createElement("div",{className:"login-form"},n.a.createElement("h1",{className:"pb-4"},n.a.createElement("span",{className:"font-weight-bold"},"Task Board")),n.a.createElement(re,{name:"username",label:"Username",type:"text",value:a,onChange:this.onChange,showError:"username"===this.state.errorInput&&this.state.showError,errorMessage:this.state.errorMessage}),n.a.createElement(re,{name:"password",label:"Password",type:"password",value:t,onChange:this.onChange,showError:"password"===this.state.errorInput&&this.state.showError,errorMessage:this.state.errorMessage}),n.a.createElement(C.a,{className:"btn-lg btn-dark btn-block mt-4",onClick:this.checkLogin},"Login"))}}]),t}(n.a.Component),xe={loginSuccess:_},Le=Object(c.b)((function(e){return{loggedIn:e.auth.loggedIn}}),xe)(je),Be=t(43),Se=function(e){var a=e.loggedIn,t=Object(Be.a)(e,["loggedIn"]);return a?n.a.createElement(L.a,{to:"/taskBoard"}):n.a.createElement(L.b,t)},Me=function(e){var a=e.loggedIn,t=Object(Be.a)(e,["loggedIn"]);return a?n.a.createElement(L.b,t):n.a.createElement(L.a,{to:"/"})},Ae=function(e){Object(j.a)(t,e);var a=Object(T.a)(t);function t(){return Object(I.a)(this,t),a.apply(this,arguments)}return Object(w.a)(t,[{key:"render",value:function(){return n.a.createElement(x.a,null,n.a.createElement(L.d,null,n.a.createElement(Se,{exact:!0,path:"/",component:Le,loggedIn:this.props.loggedIn}),n.a.createElement(Me,{path:"/taskBoard",component:Te,loggedIn:this.props.loggedIn}),n.a.createElement(Me,{path:"/boards",component:me,loggedIn:this.props.loggedIn})))}}]),t}(n.a.Component),Ce=Object(c.b)((function(e){return{loggedIn:e.auth.loggedIn}}),void 0)(Ae);t(163),t(164),t(165);var Ne=function(){return n.a.createElement(c.a,{store:y},n.a.createElement(i.a,{loading:null,persistor:D},n.a.createElement(Ce,{loggedIn:!0})))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(n.a.createElement(n.a.StrictMode,null,n.a.createElement(Ne,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},89:function(e,a,t){e.exports=t(166)}},[[89,1,2]]]);
//# sourceMappingURL=main.86695818.chunk.js.map