"use strict";(self.webpackChunkmyshops_admin=self.webpackChunkmyshops_admin||[]).push([[393],{28393:function(nt,Z,u){u.r(Z),u.d(Z,{ConsultantsModule:function(){return et}});var x=u(51703),p=u(85424),C=u(48318),h=u(21248),t=u(90189),T=function(){function e(n){this.ConsultantsService=n}return e.prototype.resolve=function(n,r){var a=this,s=n.queryParams.search,i=n.queryParams.page,o=n.queryParams.perPage;return new C.y(function(c){return a.ConsultantsService.getConsultantsList(s,i,o).subscribe({next:function(g){c.next({users:g.response,page:g.page,perPage:g.perPage,count:g.count}),c.complete()}.bind(a),error:function(g){c.complete()}.bind(a)})})},e.\u0275fac=function(r){return new(r||e)(t.LFG(h.Y))},e.\u0275prov=t.Yz7({token:e,factory:e.\u0275fac}),e}(),F=u(59937),P=u(92987),A=u(3492),S=u(25201),U=u(90065),J=u(75192),f=u(61116),L=u(60407),l=u(11462),_=function(){return _=Object.assign||function(e){for(var n,r=1,a=arguments.length;r<a;r++)for(var s in n=arguments[r])Object.prototype.hasOwnProperty.call(n,s)&&(e[s]=n[s]);return e},_.apply(this,arguments)};function I(e,n){if(1&e){var r=t.EpF();t.ynx(0),t.TgZ(1,"select",17),t.NdJ("change",function(i){t.CHM(r);var o=t.oxw(),c=o.$implicit,g=o.index;return t.oxw(2).changeStatus(c.id,i.target.value,g)}),t.TgZ(2,"option",18),t._uU(3,"Approve"),t.qZA(),t.TgZ(4,"option",18),t._uU(5,"Decline"),t.qZA(),t.TgZ(6,"option",18),t._uU(7,"Pending"),t.qZA(),t.qZA(),t.BQk()}if(2&e){var a=t.oxw().$implicit;t.xp6(1),t.Q6J("ngModel",a.isApprove),t.xp6(1),t.Q6J("value",1),t.xp6(2),t.Q6J("value",2),t.xp6(2),t.Q6J("value",3)}}function N(e,n){if(1&e){var r=t.EpF();t.TgZ(0,"span",20),t.NdJ("click",function(){return t.CHM(r),t.oxw(4).isStatusChange=!0}),t._UZ(1,"i",21),t._uU(2," Approved "),t.qZA()}}function Y(e,n){if(1&e){var r=t.EpF();t.TgZ(0,"span",20),t.NdJ("click",function(){return t.CHM(r),t.oxw(4).isStatusChange=!0}),t._UZ(1,"i",22),t._uU(2," Declined "),t.qZA()}}function w(e,n){if(1&e){var r=t.EpF();t.TgZ(0,"span",20),t.NdJ("click",function(){return t.CHM(r),t.oxw(4).isStatusChange=!0}),t._UZ(1,"i",23),t._uU(2," Pending "),t.qZA()}}function E(e,n){if(1&e&&(t.ynx(0),t.YNc(1,N,3,0,"span",19),t.YNc(2,Y,3,0,"span",19),t.YNc(3,w,3,0,"span",19),t.BQk()),2&e){var r=t.oxw().$implicit;t.xp6(1),t.Q6J("ngIf",1==r.isApprove),t.xp6(1),t.Q6J("ngIf",2==r.isApprove),t.xp6(1),t.Q6J("ngIf",3==r.isApprove)}}var Q=function(e){return[e]};function R(e,n){if(1&e){var r=t.EpF();t.TgZ(0,"tr"),t.TgZ(1,"td"),t._uU(2),t.qZA(),t.TgZ(3,"td"),t._uU(4),t.ALo(5,"titlecase"),t.qZA(),t.TgZ(6,"td"),t._uU(7),t.qZA(),t.TgZ(8,"td"),t._uU(9),t.qZA(),t.TgZ(10,"td"),t.YNc(11,I,8,4,"ng-container",12),t.YNc(12,E,4,3,"ng-container",12),t.qZA(),t.TgZ(13,"td"),t._uU(14),t.ALo(15,"date"),t.qZA(),t.TgZ(16,"td"),t.TgZ(17,"button",13),t.NdJ("click",function(){var g=t.CHM(r).$implicit;return t.oxw(2).deleteUser(g.id)}),t._UZ(18,"i",14),t.qZA(),t.TgZ(19,"a",15),t._UZ(20,"i",16),t.qZA(),t.qZA(),t.qZA()}if(2&e){var a=n.$implicit,s=n.index,i=t.oxw(2);t.xp6(2),t.Oqu((i.currentPage-1)*i.perPage+(s+1)),t.xp6(2),t.Oqu(t.lcZ(5,8,a.first_name)),t.xp6(3),t.Oqu(a.last_name),t.xp6(2),t.Oqu(a.email),t.xp6(2),t.Q6J("ngIf",i.isStatusChange),t.xp6(1),t.Q6J("ngIf",!i.isStatusChange),t.xp6(2),t.Oqu(t.xi3(15,10,a.created_at,"dd/MM/yyyy")),t.xp6(5),t.Q6J("routerLink",t.VKq(13,Q,"./edit/"+a.id))}}function M(e,n){if(1&e&&(t.ynx(0),t.YNc(1,R,21,15,"tr",11),t.BQk()),2&e){var r=t.oxw();t.xp6(1),t.Q6J("ngForOf",r.users)}}function O(e,n){1&e&&(t.TgZ(0,"tr"),t.TgZ(1,"th",24),t._uU(2,"No record found"),t.qZA(),t.qZA())}var k=function(){function e(n,r,a,s,i){var o=this;this.route=n,this.router=r,this.consultantService=a,this.toastrService=s,this.modalService=i,this.users=[],this.currentPage=1,this.totalPage=1,this.perPage=10,this.count=1,this.isStatusChange=!1,this.search="",this.onSearch=function(c){o.router.navigate([],{relativeTo:o.route,queryParams:{search:c,page:1},queryParamsHandling:"merge"})},this.onPageChange=function(c){o.currentPage=c,o.navigateRoute()},this.navigateRoute=function(){o.router.navigate([],{relativeTo:o.route,queryParams:{page:o.currentPage}})},this.changeStatus=function(c,g,d){o.consultantService.updateConsultantStatus(c,g).subscribe({next:function(m){var q=o.users[d];q.isApprove=g,o.users[d]=q,o.isStatusChange=!1,o.toastrService.success("Status change successfully")},error:function(m){o.toastrService.error(m.error.message||"Something went wrong")}})},this.deleteUser=function(c){var g=o.modalService.open(F.p,{centered:!0});g.componentInstance.data={title:"You are about to delete an user.",body:"This will delete the user permanently.",confirmButtonText:"Delete user",cancelButtonText:"Cancel"},g.closed.subscribe(function(d){d&&o.consultantService.deleteConsultant(c,"",o.currentPage,o.perPage).subscribe({next:function(m){o.users=m.response,o.currentPage=+m.page,o.perPage=+m.perPage,o.count=+m.totalCount,o.totalPage=Math.ceil(o.count/o.perPage),o.toastrService.success("User deleted successfully")}.bind(o),error:function(m){o.toastrService.error(m.message)}.bind(o)})})}}return e.prototype.ngOnInit=function(){var n=this;this.route.data.subscribe(function(r){n.users=r.data.users,n.currentPage=+r.data.page,n.perPage=+r.data.perPage,n.count=+r.data.count,n.totalPage=Math.ceil(n.count/n.perPage)}),this.route.queryParams.subscribe(function(r){n.search=r.search||""})},e.prototype.sendEmail=function(n){var r=this,a={consultant_email:n.email,consultant_name:n.first_name+" "+n.last_name,client_name:"",client_email:"",company_name:"",purchaseOrderNumber:"",amount:null};this.consultantService.getCompanyVoucherPrices().subscribe(function(s){r.modalService.open(P.X,{size:"xl"}).componentInstance.data=_(_(_({},a),s),{type:"consultant"})})},e.\u0275fac=function(r){return new(r||e)(t.Y36(p.gz),t.Y36(p.F0),t.Y36(h.Y),t.Y36(A._W),t.Y36(S.FF))},e.\u0275cmp=t.Xpm({type:e,selectors:[["app-consultants-list"]],decls:28,vars:5,consts:[[1,"row"],[1,"col-lg-3","col-6","mb-2","mb-lg-0"],["type","search","name","search","placeholder","Search","id","",1,"form-control",3,"value","search"],[1,"col-lg-9","col-6","mb-2","mb-lg-0","text-right"],["routerLink","./add",1,"btn","btn-primary"],["title","Users List"],[1,"thead-light"],["scope","col"],[4,"ngIf","ngIfElse"],["noEquipmentExist",""],[3,"currentPage","totalPage","pageChange"],[4,"ngFor","ngForOf"],[4,"ngIf"],[1,"btn",3,"click"],[1,"fa","fa-trash","text-danger"],["routerLinkActive","router-link-active",1,"btn",3,"routerLink"],[1,"fa","fa-edit","text-warning"],[1,"",3,"ngModel","change"],[3,"value"],["class","badge badge-dot mr-4",3,"click",4,"ngIf"],[1,"badge","badge-dot","mr-4",3,"click"],[1,"bg-success"],[1,"bg-danger"],[1,"bg-warning"],["colspan","8",1,"no-record-found"]],template:function(r,a){if(1&r&&(t.TgZ(0,"app-page-header"),t.TgZ(1,"div",0),t.TgZ(2,"div",1),t.TgZ(3,"input",2),t.NdJ("search",function(o){return a.onSearch(o.target.value)}),t.qZA(),t.qZA(),t.TgZ(4,"div",3),t.TgZ(5,"a",4),t._uU(6," Add new user "),t.qZA(),t.qZA(),t.qZA(),t.qZA(),t.TgZ(7,"app-page-body",5),t.TgZ(8,"thead",6),t.TgZ(9,"tr"),t.TgZ(10,"th",7),t._uU(11,"#"),t.qZA(),t.TgZ(12,"th",7),t._uU(13,"First name"),t.qZA(),t.TgZ(14,"th",7),t._uU(15,"Last name"),t.qZA(),t.TgZ(16,"th",7),t._uU(17,"Email"),t.qZA(),t.TgZ(18,"th",7),t._uU(19,"Status"),t.qZA(),t.TgZ(20,"th",7),t._uU(21,"Created On"),t.qZA(),t._UZ(22,"th",7),t.qZA(),t.qZA(),t.TgZ(23,"tbody"),t.YNc(24,M,2,1,"ng-container",8),t.YNc(25,O,3,0,"ng-template",null,9,t.W1O),t.qZA(),t.TgZ(27,"app-pagination",10),t.NdJ("pageChange",function(o){return a.onPageChange(o)}),t.qZA(),t.qZA()),2&r){var s=t.MAs(26);t.xp6(3),t.Q6J("value",a.search),t.xp6(21),t.Q6J("ngIf",a.users.length)("ngIfElse",s),t.xp6(3),t.Q6J("currentPage",a.currentPage)("totalPage",a.totalPage)}},directives:[U.q,p.yS,J.H,f.O5,L.Q,f.sg,p.Od,l.EJ,l.JJ,l.On,l.YN,l.Kr],pipes:[f.rS,f.uU],styles:[""]}),e}(),D=u(3796),v=function(){return v=Object.assign||function(e){for(var n,r=1,a=arguments.length;r<a;r++)for(var s in n=arguments[r])Object.prototype.hasOwnProperty.call(n,s)&&(e[s]=n[s]);return e},v.apply(this,arguments)};function j(e,n){1&e&&(t.TgZ(0,"small",23),t._uU(1," Please enter first name "),t.qZA())}function z(e,n){1&e&&(t.TgZ(0,"small",23),t._uU(1," Please enter email "),t.qZA())}function B(e,n){1&e&&(t.TgZ(0,"small",23),t._uU(1," Please enter a valid email "),t.qZA())}function H(e,n){if(1&e&&(t.TgZ(0,"div",16),t._UZ(1,"input",24),t.YNc(2,z,2,0,"small",18),t.YNc(3,B,2,0,"small",18),t.qZA()),2&e){var a,s,r=t.oxw();t.xp6(2),t.Q6J("ngIf",(null==(a=r.registerForm.get("email"))?null:a.hasError("required"))&&(r.registerForm.get("email").dirty||r.registerForm.get("email").touched||r.submitted)),t.xp6(1),t.Q6J("ngIf",!(null!=(s=r.registerForm.get("email"))&&s.hasError("required"))&&r.registerForm.get("email").invalid&&(r.registerForm.get("email").dirty||r.registerForm.get("email").touched||r.submitted))}}function $(e,n){1&e&&(t.TgZ(0,"small",23),t._uU(1," Please enter password "),t.qZA())}function G(e,n){if(1&e&&(t.TgZ(0,"small",23),t._uU(1),t.qZA()),2&e){var r=t.oxw();t.xp6(1),t.hij(" ",r.errMessage," ")}}var y=function(){function e(n,r,a,s,i){var o=this;this.authService=n,this.fb=r,this.toasterService=a,this.router=s,this.route=i,this.submitted=!1,this.loginFailed=!1,this.errMessage="",this.returnUrl="",this.title="Add consultant",this.isEdit=!1,this.id="",this.onSubmit=function(){o.submitted=!0,o.loginFailed=!1,!o.registerForm.invalid&&(o.isEdit?o.editConsultant(o.registerForm.value,o.id):o.addNewConsultant())}}return e.prototype.ngOnInit=function(){this.init()},e.prototype.init=function(){var n=this;this.route.params.subscribe(function(r){r.id?(n.title="Edit consultant",n.isEdit=!0,n.id=r.id,n.createEditConsultantForm(),n.route.data.subscribe(function(a){n.userData=a.consultant.user,n.patchFormData(n.userData)})):(n.title="Add consultant",n.isEdit=!1,n.createAddConsultantForm())})},e.prototype.createAddConsultantForm=function(){this.registerForm=this.fb.group({first_name:["",l.kI.required],last_name:[""],email:["",[l.kI.required,l.kI.email,l.kI.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$")]],password:["",[l.kI.required,l.kI.pattern("")]]})},e.prototype.createEditConsultantForm=function(){this.registerForm=this.fb.group({first_name:["",l.kI.required],last_name:[""],password:["",[l.kI.pattern("")]]})},e.prototype.patchFormData=function(n){this.registerForm.patchValue({first_name:n.first_name,last_name:n.last_name})},e.prototype.addNewConsultant=function(){var n=this;this.authService.registerUser(v(v({},this.registerForm.value),{isAdmin:!0})).subscribe({next:function(r){n.toasterService.success("consultant added successfully"),n.router.navigate(["./consultant"])}.bind(this),error:function(r){n.loginFailed=!0,n.errMessage=r().message}.bind(this)})},e.prototype.editConsultant=function(n,r){var a=this,s={};this.userData.first_name!=n.first_name&&(s.first_name=n.first_name),this.userData.last_name!=n.last_name&&(s.last_name=n.last_name),n.password&&(s.password=n.password),this.authService.updateConsultant(s,r).subscribe({next:function(i){a.toasterService.success("consultant update successfully"),a.router.navigate(["./consultant"])}.bind(this),error:function(i){a.loginFailed=!0,a.errMessage=i().message}.bind(this)})},e.\u0275fac=function(r){return new(r||e)(t.Y36(D.e),t.Y36(l.qu),t.Y36(A._W),t.Y36(p.F0),t.Y36(p.gz))},e.\u0275cmp=t.Xpm({type:e,selectors:[["ng-component"]],decls:29,vars:6,consts:[[1,"header","bg-gradient-dark","pb-8","pt-5","pt-md-8"],[1,"container-fluid"],[1,"header-body"],[1,"row"],[1,"container-fluid","mt--7"],[1,"row","justify-content-center"],[1,"col-xl-6"],[1,"card","bg-secondary","shadow"],[1,"card-header","bg-white","border-0"],[1,"row","align-items-center"],[1,"col-8"],[1,"mb-0"],["routerLink","/consultant",1,"btn","btn-sm"],[1,"fa","fa-arrow-left"],[1,"card-body"],["autocomplete","off",3,"formGroup","submit"],[1,"mb-3"],["type","text","placeholder","First Name","formControlName","first_name",1,"form-control"],["class","form-text text-danger",4,"ngIf"],["type","text","placeholder","Last Name","formControlName","last_name",1,"form-control"],["class","mb-3",4,"ngIf"],["type","password","placeholder","Password","formControlName","password","autocomplete","pppp",1,"form-control"],["type","submit",1,"btn","btn-primary"],[1,"form-text","text-danger"],["type","email","placeholder","Email","formControlName","email",1,"form-control"]],template:function(r,a){if(1&r&&(t.TgZ(0,"div",0),t.TgZ(1,"div",1),t.TgZ(2,"div",2),t._UZ(3,"div",3),t.qZA(),t.qZA(),t.qZA(),t.TgZ(4,"div",4),t.TgZ(5,"div",5),t.TgZ(6,"div",6),t.TgZ(7,"div",7),t.TgZ(8,"div",8),t.TgZ(9,"div",9),t.TgZ(10,"div",10),t.TgZ(11,"h3",11),t.TgZ(12,"a",12),t._UZ(13,"i",13),t.qZA(),t._uU(14),t.qZA(),t.qZA(),t.qZA(),t.qZA(),t.TgZ(15,"div",14),t.TgZ(16,"form",15),t.NdJ("submit",function(){return a.onSubmit()}),t.TgZ(17,"div",16),t._UZ(18,"input",17),t.YNc(19,j,2,0,"small",18),t.qZA(),t.TgZ(20,"div",16),t._UZ(21,"input",19),t.qZA(),t.YNc(22,H,4,2,"div",20),t.TgZ(23,"div",16),t._UZ(24,"input",21),t.YNc(25,$,2,0,"small",18),t.qZA(),t.YNc(26,G,2,1,"small",18),t.TgZ(27,"button",22),t._uU(28,"Submit"),t.qZA(),t.qZA(),t.qZA(),t.qZA(),t.qZA(),t.qZA(),t.qZA()),2&r){var s=void 0,i=void 0,o=void 0;t.xp6(14),t.hij("\xa0 ",a.title," "),t.xp6(2),t.Q6J("formGroup",a.registerForm),t.xp6(3),t.Q6J("ngIf",(null==(s=a.registerForm.get("first_name"))?null:s.hasError("required"))&&(a.registerForm.get("first_name").dirty||a.registerForm.get("first_name").touched||a.submitted)),t.xp6(3),t.Q6J("ngIf",!a.isEdit),t.xp6(3),t.Q6J("ngIf",(null==(i=a.registerForm.get("password"))?null:i.hasError("required"))&&(a.registerForm.get("password").dirty||a.registerForm.get("password").touched||a.submitted)),t.xp6(1),t.Q6J("ngIf",!(null!=(o=a.registerForm.get("email"))&&o.hasError("required"))&&a.submitted&&a.loginFailed&&a.errMessage)}},directives:[p.yS,l._Y,l.JL,l.sg,l.Fj,l.JJ,l.u,f.O5],styles:[""]}),e}(),b=function(){function e(n){this.ConsultantsService=n}return e.prototype.resolve=function(n,r){var a=this,s=n.params.id;return new C.y(function(i){return a.ConsultantsService.getConsultantsDetails(s).subscribe({next:function(o){i.next({user:o.response,userId:s}),i.complete()}.bind(a),error:function(o){i.complete()}.bind(a)})})},e.\u0275fac=function(r){return new(r||e)(t.LFG(h.Y))},e.\u0275prov=t.Yz7({token:e,factory:e.\u0275fac}),e}(),K=[{path:"",component:k,resolve:{data:T},runGuardsAndResolvers:"paramsOrQueryParamsChange"},{path:"add",component:y},{path:"edit/:id",component:y,resolve:{consultant:b}}],V=function(){function e(){}return e.\u0275fac=function(r){return new(r||e)},e.\u0275mod=t.oAB({type:e}),e.\u0275inj=t.cJS({imports:[[p.Bz.forChild(K)],p.Bz]}),e}(),W=u(22002),X=u(42101),tt=u(23897),et=function(){function e(){}return e.\u0275fac=function(r){return new(r||e)},e.\u0275mod=t.oAB({type:e}),e.\u0275inj=t.cJS({providers:[T,b],imports:[[W.m,X.K,V,x._t,tt.o]]}),e}()}}]);