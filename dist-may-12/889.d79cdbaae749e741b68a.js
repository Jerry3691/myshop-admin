"use strict";(self.webpackChunkmyshops_admin=self.webpackChunkmyshops_admin||[]).push([[889],{75192:function(y,_,s){s.d(_,{H:function(){return b}});var t=s(90189),h=s(61116),A=[[["","additional",""]],[["thead"]],[["tbody"]],[["app-pagination"]]],f=["[additional]","thead","tbody","app-pagination"],b=function(){function e(){}return e.prototype.ngOnInit=function(){},e.\u0275fac=function(T){return new(T||e)},e.\u0275cmp=t.Xpm({type:e,selectors:[["app-page-body"]],inputs:{title:"title"},ngContentSelectors:f,decls:15,vars:3,consts:[[1,"container-fluid","mt--7"],[1,"row"],[1,"col"],[1,"card","shadow"],[1,"card-header","border-0","d-flex","justify-content-between"],[1,"mb-0"],[1,"table-responsive","desktop-overflow-none","order-tables-style"],[1,"table","align-items-center","table-flush"],[1,"card-footer","py-4"]],template:function(T,a){1&T&&(t.F$t(A),t.TgZ(0,"div",0),t.TgZ(1,"div",1),t.TgZ(2,"div",2),t.TgZ(3,"div",3),t.TgZ(4,"div",4),t.TgZ(5,"h3",5),t._uU(6),t.ALo(7,"titlecase"),t.qZA(),t.Hsn(8),t.qZA(),t.TgZ(9,"div",6),t.TgZ(10,"table",7),t.Hsn(11,1),t.Hsn(12,2),t.qZA(),t.qZA(),t.TgZ(13,"div",8),t.Hsn(14,3),t.qZA(),t.qZA(),t.qZA(),t.qZA(),t.qZA()),2&T&&(t.xp6(6),t.Oqu(t.lcZ(7,1,a.title)))},pipes:[h.rS],styles:[""]}),e}()},90065:function(y,_,s){s.d(_,{q:function(){return A}});var t=s(90189),h=["*"],A=function(){function f(){}return f.prototype.ngOnInit=function(){},f.\u0275fac=function(e){return new(e||f)},f.\u0275cmp=t.Xpm({type:f,selectors:[["app-page-header"]],ngContentSelectors:h,decls:4,vars:0,consts:[[1,"header","bg-gradient-dark","pb-8","pt-5","pt-md-8"],[1,"container-fluid"],[1,"header-body","invoice_list_header","mb--3","mb-md-0"]],template:function(e,v){1&e&&(t.F$t(),t.TgZ(0,"div",0),t.TgZ(1,"div",1),t.TgZ(2,"div",2),t.Hsn(3),t.qZA(),t.qZA(),t.qZA())},styles:[""]}),f}()},60407:function(y,_,s){s.d(_,{Q:function(){return T}});var t=s(90189),h=s(61116);function A(a,l){1&a&&(t.TgZ(0,"li",15),t.TgZ(1,"a",11),t._uU(2," ... "),t.qZA(),t.qZA())}var f=function(a){return{active:a}};function b(a,l){if(1&a){var g=t.EpF();t.ynx(0),t.TgZ(1,"li",16),t.NdJ("click",function(){var C=t.CHM(g).$implicit;return t.oxw().onPageChange(C)}),t.TgZ(2,"a",11),t._uU(3),t.qZA(),t.qZA(),t.BQk()}if(2&a){var d=l.$implicit,m=t.oxw();t.xp6(1),t.Q6J("ngClass",t.VKq(2,f,d===m.currentPage)),t.xp6(2),t.hij(" ",d," ")}}function e(a,l){1&a&&(t.TgZ(0,"li",15),t.TgZ(1,"a",11),t._uU(2," ... "),t.qZA(),t.qZA())}var v=function(a){return{disabled:a}},T=function(){function a(){this.pageChange=new t.vpe,this.currentPage=1,this.totalPage=1,this.visiblePageCount=5}return a.prototype.ngOnInit=function(){},a.prototype.onPageChange=function(l){l<1||l>this.totalPage||l===this.currentPage||this.pageChange.emit(l)},a.prototype.getVisiblePages=function(){var g,d,l=[];if(this.totalPage<=this.visiblePageCount)g=1,d=this.totalPage;else{var m=Math.floor(this.visiblePageCount/2),O=Math.ceil(this.visiblePageCount/2)-1;this.currentPage<=m+1?(g=1,d=this.visiblePageCount-1):this.currentPage>=this.totalPage-O?(g=this.totalPage-this.visiblePageCount+2,d=this.totalPage):(g=this.currentPage-m,d=this.currentPage+O)}for(var q=g;q<=d;q++)l.push(q);return l},a.prototype.shouldShowFirstEllipsis=function(){return this.currentPage>Math.ceil(this.visiblePageCount/2)},a.prototype.shouldShowLastEllipsis=function(){return this.currentPage<this.totalPage-Math.floor(this.visiblePageCount/2)},a.\u0275fac=function(g){return new(g||a)},a.\u0275cmp=t.Xpm({type:a,selectors:[["app-pagination"]],inputs:{currentPage:"currentPage",totalPage:"totalPage"},outputs:{pageChange:"pageChange"},decls:25,vars:15,consts:[["aria-label","..."],[1,"pagination","justify-content-end","mb-0"],["title","Start",1,"page-item",3,"ngClass","click"],["href","javascript:void(0)","tabindex","-1",1,"page-link"],[1,"fas","fa-angle-double-left"],[1,"sr-only"],["title","Previous",1,"page-item",3,"ngClass","click"],[1,"fas","fa-angle-left"],["class","page-item",4,"ngIf"],[4,"ngFor","ngForOf"],["title","Next",1,"page-item",3,"ngClass","click"],["href","javascript:void(0)",1,"page-link"],[1,"fas","fa-angle-right"],["title","End",1,"page-item",3,"ngClass","click"],[1,"fas","fa-angle-double-right"],[1,"page-item"],[1,"page-item",3,"ngClass","click"]],template:function(g,d){1&g&&(t.TgZ(0,"nav",0),t.TgZ(1,"ul",1),t.TgZ(2,"li",2),t.NdJ("click",function(){return d.onPageChange(1)}),t.TgZ(3,"a",3),t._UZ(4,"i",4),t.TgZ(5,"span",5),t._uU(6,"Start"),t.qZA(),t.qZA(),t.qZA(),t.TgZ(7,"li",6),t.NdJ("click",function(){return d.onPageChange(d.currentPage-1)}),t.TgZ(8,"a",3),t._UZ(9,"i",7),t.TgZ(10,"span",5),t._uU(11,"Previous"),t.qZA(),t.qZA(),t.qZA(),t.YNc(12,A,3,0,"li",8),t.YNc(13,b,4,4,"ng-container",9),t.YNc(14,e,3,0,"li",8),t.TgZ(15,"li",10),t.NdJ("click",function(){return d.onPageChange(d.currentPage+1)}),t.TgZ(16,"a",11),t._UZ(17,"i",12),t.TgZ(18,"span",5),t._uU(19,"Next"),t.qZA(),t.qZA(),t.qZA(),t.TgZ(20,"li",13),t.NdJ("click",function(){return d.onPageChange(d.totalPage)}),t.TgZ(21,"a",11),t._UZ(22,"i",14),t.TgZ(23,"span",5),t._uU(24,"End"),t.qZA(),t.qZA(),t.qZA(),t.qZA(),t.qZA()),2&g&&(t.xp6(2),t.Q6J("ngClass",t.VKq(7,v,1===d.currentPage)),t.xp6(5),t.Q6J("ngClass",t.VKq(9,v,1===d.currentPage)),t.xp6(5),t.Q6J("ngIf",d.shouldShowFirstEllipsis()),t.xp6(1),t.Q6J("ngForOf",d.getVisiblePages()),t.xp6(1),t.Q6J("ngIf",d.shouldShowLastEllipsis()),t.xp6(1),t.Q6J("ngClass",t.VKq(11,v,d.currentPage===d.totalPage)),t.xp6(5),t.Q6J("ngClass",t.VKq(13,v,d.currentPage===d.totalPage)))},directives:[h.mk,h.O5,h.sg],styles:[".disabled[_ngcontent-%COMP%] {\n  pointer-events: none;\n}"]}),a}()},51889:function(y,_,s){s.r(_),s.d(_,{UberModule:function(){return ue}});var t=s(22002),h=s(23278),A=s(78512),f=s(42693),b=s(44019),e=s(90189),v=function(){return v=Object.assign||function(r){for(var n,o=1,i=arguments.length;o<i;o++)for(var u in n=arguments[o])Object.prototype.hasOwnProperty.call(n,u)&&(r[u]=n[u]);return r},v.apply(this,arguments)},T=function(){function r(n){this.httpService=n,this.uberSubject=new A.X([]),this.uber$=this.uberSubject.asObservable(),this.currentPage=1,this.count=0}return r.prototype.getAllUberOrders=function(n,o,i){var u=this;void 0===n&&(n=10),void 0===o&&(o=1),void 0===i&&(i="");var p=new f.LE;return n&&(p=p.set("per_page",n)),o&&(p=p.set("page",o)),i&&(p=p.set("search",i)),this.httpService.getRequest("uber/",p).pipe((0,b.b)(function(c){u.count=c.totalCount,u.currentPage=c.page,u.uberSubject.next(c.data)}))},r.prototype.updateUberOrder=function(n){var o=this;return this.httpService.patchRequest("uber/"+n.id,n).pipe((0,b.b)(function(i){var u=o.uberSubject.getValue(),p=u.findIndex(function(c){return c.id===n.id});p>-1&&(u[p]=v(v({},u[p]),i.data),o.uberSubject.next(u))}))},r.\u0275fac=function(o){return new(o||r)(e.LFG(h.O))},r.\u0275prov=e.Yz7({token:r,factory:r.\u0275fac,providedIn:"root"}),r}(),a=s(11462),l=s(25201),g=s(3492),d=s(24075),m=s(61116),O=s(85288);function q(r,n){1&r&&(e.TgZ(0,"div",18),e._uU(1,"Name is required."),e.qZA())}function C(r,n){if(1&r&&(e.TgZ(0,"div"),e.YNc(1,q,2,0,"div",36),e.qZA()),2&r){var o=e.oxw();e.xp6(1),e.Q6J("ngIf",o.customerOrderForm.get("name").errors.required)}}function P(r,n){1&r&&(e.TgZ(0,"div",18),e._uU(1,"Mobile number is required."),e.qZA())}function D(r,n){1&r&&(e.TgZ(0,"div",18),e._uU(1,"Mobile number should contain only numbers. "),e.qZA())}function k(r,n){if(1&r&&(e.TgZ(0,"div"),e.YNc(1,P,2,0,"div",36),e.YNc(2,D,2,0,"div",36),e.qZA()),2&r){var o=e.oxw();e.xp6(1),e.Q6J("ngIf",o.customerOrderForm.get("mobileNumber").errors.required),e.xp6(1),e.Q6J("ngIf",o.customerOrderForm.get("mobileNumber").errors.pattern)}}function S(r,n){1&r&&(e.TgZ(0,"div",18),e._uU(1,"Purchase order number is required. "),e.qZA())}function J(r,n){if(1&r&&(e.TgZ(0,"div"),e.YNc(1,S,2,0,"div",36),e.qZA()),2&r){var o=e.oxw();e.xp6(1),e.Q6J("ngIf",o.customerOrderForm.get("purchaseOrderNumber").errors.required)}}function I(r,n){1&r&&(e.TgZ(0,"div",18),e._uU(1,"Pickup Date and time of trips are required. "),e.qZA())}function M(r,n){if(1&r&&(e.TgZ(0,"div"),e.YNc(1,I,2,0,"div",36),e.qZA()),2&r){var o=e.oxw();e.xp6(1),e.Q6J("ngIf",o.customerOrderForm.get("pickupDateTimeOfTrips").errors.required)}}function Q(r,n){1&r&&(e.TgZ(0,"div"),e._uU(1,"Return date time of trip is required"),e.qZA())}function Y(r,n){if(1&r&&(e.TgZ(0,"div",18),e.YNc(1,Q,2,0,"div",9),e.qZA()),2&r){var o=e.oxw();e.xp6(1),e.Q6J("ngIf",o.customerOrderForm.get("returnDateTimeOfTrips").errors.required)}}function R(r,n){1&r&&(e.TgZ(0,"div",18),e._uU(1,"Pick-up address is required."),e.qZA())}function w(r,n){if(1&r&&(e.TgZ(0,"div"),e.YNc(1,R,2,0,"div",36),e.qZA()),2&r){var o=e.oxw();e.xp6(1),e.Q6J("ngIf",o.customerOrderForm.get("pickUpAddress").errors.required)}}function E(r,n){1&r&&(e.TgZ(0,"div",18),e._uU(1,"Drop-off address is required."),e.qZA())}function L(r,n){if(1&r&&(e.TgZ(0,"div"),e.YNc(1,E,2,0,"div",36),e.qZA()),2&r){var o=e.oxw();e.xp6(1),e.Q6J("ngIf",o.customerOrderForm.get("dropOffAddress").errors.required)}}var j=function(){function r(n,o,i,u){this.fb=n,this.activeModal=o,this.uberService=i,this.toastrService=u,this.submit=!1}return r.prototype.ngOnInit=function(){var o,n=this;this.createCustomerOrderForm(),null===(o=this.customerOrderForm)||void 0===o||o.get("returnTripRequired").valueChanges.subscribe(function(i){var u=n.customerOrderForm.get("returnDateTimeOfTrips");i?u.setValidators([a.kI.required,x]):u.clearValidators(),u.updateValueAndValidity({emitEvent:!1})}),this.patchData(this.rideData)},r.prototype.onSubmit=function(){var n=this;this.submit=!0,!this.customerOrderForm.invalid&&this.uberService.updateUberOrder({id:this.rideData.id,purchaseOrderAmount:this.customerOrderForm.value.purchaseOrderAmount,status:this.customerOrderForm.value.status,pickupDateTimeOfTrips:this.customerOrderForm.value.pickupDateTimeOfTrips,returnDateTimeOfTrips:this.customerOrderForm.value.returnDateTimeOfTrips}).subscribe({next:function(o){n.activeModal.close(),n.toastrService.success("Uber Order updated"),n.submit=!1},error:function(o){n.toastrService.error("error")}})},r.prototype.patchData=function(n){this.customerOrderForm.patchValue({name:n.name,mobileNumber:n.mobileNumber,purchaseOrderNumber:n.purchaseOrderNumber,purchaseOrderAmount:n.purchaseOrderAmount,scheduledTrip:n.scheduledTrip.toString(),returnTripRequired:n.returnTripRequired,notes:n.notes,pickupDateTimeOfTrips:this.convertDate(n.pickupDateTimeOfTrips),returnDateTimeOfTrips:n.returnDateTimeOfTrips?this.convertDate(n.returnDateTimeOfTrips):null,pickUpAddress:n.pickUpAddress,dropOffAddress:n.dropOffAddress,status:n.status})},r.prototype.createCustomerOrderForm=function(){var n=(new Date).getTime();this.customerOrderForm=this.fb.group({name:["",a.kI.required],mobileNumber:["",[a.kI.required,a.kI.pattern("^[+]?[0-9]*$")]],purchaseOrderNumber:[n],purchaseOrderAmount:["",a.kI.required],scheduledTrip:["1",a.kI.required],returnTripRequired:[!1],notes:[""],pickupDateTimeOfTrips:["",a.kI.required],returnDateTimeOfTrips:[null],pickUpAddress:["",a.kI.required],dropOffAddress:["",a.kI.required],status:["",a.kI.required]}),this.customerOrderForm.get("returnDateTimeOfTrips").addValidators([x])},r.prototype.convertDate=function(n){return n.replace("T"," ").substring(0,16)},r.prototype.getDateFormat=function(n){void 0===n&&(n=new Date);var o=new Date(n);return o.getFullYear()+"-"+String(o.getMonth()+1).padStart(2,"0")+"-"+String(o.getDate()).padStart(2,"0")+"T"+String(o.getHours()).padStart(2,"0")+":"+String(o.getMinutes()).padStart(2,"0")},r.\u0275fac=function(o){return new(o||r)(e.Y36(a.qu),e.Y36(l.Kz),e.Y36(T),e.Y36(g._W))},r.\u0275cmp=e.Xpm({type:r,selectors:[["ng-component"]],inputs:{rideData:"rideData"},decls:83,vars:23,consts:[[1,"modal-header"],["id","modal-basic-title",1,"modal-title"],["type","button","aria-label","Close",1,"btn","btn-close",3,"click"],[1,"modal-body"],["id","form",3,"formGroup","ngSubmit"],[1,"row"],[1,"form-group","col-md-6"],["for","name"],["type","text","id","name","formControlName","name","noExtraSpaces","",1,"form-control",3,"maxlength","readonly"],[4,"ngIf"],["for","mobileNumber"],["type","text","id","mobileNumber","formControlName","mobileNumber","onlyNumber2","",1,"form-control",3,"plusAtStart","plus","maxlength","readonly"],["for","purchaseOrderNumber"],["type","text","id","purchaseOrderNumber","formControlName","purchaseOrderNumber","disabled","",1,"form-control"],["for","purchaseOrderAmount"],["type","text","id","purchaseOrderAmount","formControlName","purchaseOrderAmount","onlyNumber2","",1,"form-control",3,"decimal"],[1,"mb-1","col-md-6"],["for","type",1,"form-label"],[1,"text-danger"],[1,"d-flex","gap-2","flex-lg-row"],[1,"form-group"],["type","radio","name","scheduledTrip","id","type-1","formControlName","scheduledTrip","value","1","disabled",""],["for","type-1",1,"form-label","mx-3"],["type","radio","name","scheduledTrip","id","type-2","formControlName","scheduledTrip","value","2","disabled",""],["for","type-2",1,"form-label","mx-3"],[1,"form-check","col-md-6"],["type","checkbox","id","returnTripRequired","formControlName","returnTripRequired","disabled","",1,"form-check-input"],["for","returnTripRequired",1,"form-check-label"],[1,"form-group","col-md-12"],["for","notes"],["id","notes","formControlName","notes",1,"form-control",3,"readonly"],["for","pickupDateTimeOfTrips"],["type","datetime-local","id","pickupDateTimeOfTrips","formControlName","pickupDateTimeOfTrips",1,"form-control",3,"min","readonly"],[1,"form-group","col-md-6",3,"hidden"],["for","returnDateTimeOfTrips"],["type","datetime-local","id","returnDateTimeOfTrips","formControlName","returnDateTimeOfTrips",1,"form-control",3,"min","readonly"],["class","text-danger",4,"ngIf"],["for","pickUpAddress"],["type","text","id","pickUpAddress","formControlName","pickUpAddress",1,"form-control",3,"readonly"],["for","dropOffAddress"],["type","text","id","dropOffAddress","formControlName","dropOffAddress",1,"form-control",3,"readonly"],["for","status"],["formControlName","status","id","status",1,"form-control"],["value","1"],["value","2"],["value","3"],[1,"modal-footer"],["type","button",1,"btn","btn-outline-secondary",3,"click"],["type","submit","form","form",1,"btn","btn-primary"]],template:function(o,i){1&o&&(e.TgZ(0,"div",0),e.TgZ(1,"h4",1),e._uU(2,"Uber checkout"),e.qZA(),e.TgZ(3,"button",2),e.NdJ("click",function(){return i.activeModal.dismiss("Cross click")}),e.qZA(),e.qZA(),e.TgZ(4,"div",3),e.TgZ(5,"form",4),e.NdJ("ngSubmit",function(){return i.onSubmit()}),e.TgZ(6,"div",5),e.TgZ(7,"div",6),e.TgZ(8,"label",7),e._uU(9,"Job-seeker/Client Name"),e.qZA(),e._UZ(10,"input",8),e.YNc(11,C,2,1,"div",9),e.qZA(),e.TgZ(12,"div",6),e.TgZ(13,"label",10),e._uU(14,"Job-seeker/Client Mobile Number"),e.qZA(),e._UZ(15,"input",11),e.YNc(16,k,3,2,"div",9),e.qZA(),e.TgZ(17,"div",6),e.TgZ(18,"label",12),e._uU(19,"Purchase Order Number"),e.qZA(),e._UZ(20,"input",13),e.YNc(21,J,2,1,"div",9),e.qZA(),e.TgZ(22,"div",6),e.TgZ(23,"label",14),e._uU(24,"Purchase Order Amount"),e.qZA(),e._UZ(25,"input",15),e.qZA(),e.TgZ(26,"div",16),e.TgZ(27,"label",17),e._uU(28,"Scheduled Trip/ Flexible"),e.TgZ(29,"small",18),e._uU(30,"*"),e.qZA(),e.qZA(),e.TgZ(31,"div",19),e.TgZ(32,"div",20),e._UZ(33,"input",21),e.TgZ(34,"label",22),e._uU(35,"Scheduled"),e.qZA(),e.qZA(),e.TgZ(36,"div",20),e._UZ(37,"input",23),e.TgZ(38,"label",24),e._uU(39,"Flexible"),e.qZA(),e.qZA(),e.qZA(),e.qZA(),e.TgZ(40,"div",25),e._UZ(41,"input",26),e.TgZ(42,"label",27),e._uU(43,"Return Trip Required"),e.qZA(),e.qZA(),e.TgZ(44,"div",28),e.TgZ(45,"label",29),e._uU(46,"Notes"),e.qZA(),e._UZ(47,"textarea",30),e.qZA(),e.TgZ(48,"div",6),e.TgZ(49,"label",31),e._uU(50,"Pickup Date and Time of Trips"),e.qZA(),e._UZ(51,"input",32),e.YNc(52,M,2,1,"div",9),e.qZA(),e.TgZ(53,"div",33),e.TgZ(54,"label",34),e._uU(55," Return Date and Time of Trips"),e.qZA(),e._UZ(56,"input",35),e.YNc(57,Y,2,1,"div",36),e.qZA(),e.TgZ(58,"div",6),e.TgZ(59,"label",37),e._uU(60,"Pick-up Address"),e.qZA(),e._UZ(61,"input",38),e.YNc(62,w,2,1,"div",9),e.qZA(),e.TgZ(63,"div",6),e.TgZ(64,"label",39),e._uU(65,"Drop-off Address"),e.qZA(),e._UZ(66,"input",40),e.YNc(67,L,2,1,"div",9),e.qZA(),e.TgZ(68,"div",6),e.TgZ(69,"label",41),e._uU(70,"Status"),e.qZA(),e.TgZ(71,"select",42),e.TgZ(72,"option",43),e._uU(73,"Approve"),e.qZA(),e.TgZ(74,"option",44),e._uU(75,"Decline"),e.qZA(),e.TgZ(76,"option",45),e._uU(77,"Pending"),e.qZA(),e.qZA(),e.qZA(),e.qZA(),e.qZA(),e.qZA(),e.TgZ(78,"div",46),e.TgZ(79,"button",47),e.NdJ("click",function(){return i.activeModal.close()}),e._uU(80,"Cancel"),e.qZA(),e.TgZ(81,"button",48),e._uU(82,"Update"),e.qZA(),e.qZA()),2&o&&(e.xp6(5),e.Q6J("formGroup",i.customerOrderForm),e.xp6(5),e.Q6J("maxlength",255)("readonly",!0),e.xp6(1),e.Q6J("ngIf",i.customerOrderForm.get("name").invalid&&(i.customerOrderForm.get("name").dirty||i.customerOrderForm.get("name").touched||i.submit)),e.xp6(4),e.Q6J("plusAtStart",!0)("plus",!0)("maxlength",20)("readonly",!0),e.xp6(1),e.Q6J("ngIf",i.customerOrderForm.get("mobileNumber").invalid&&(i.customerOrderForm.get("mobileNumber").dirty||i.customerOrderForm.get("mobileNumber").touched||i.submit)),e.xp6(5),e.Q6J("ngIf",i.customerOrderForm.get("purchaseOrderNumber").invalid&&(i.customerOrderForm.get("purchaseOrderNumber").dirty||i.customerOrderForm.get("purchaseOrderNumber").touched||i.submit)),e.xp6(4),e.Q6J("decimal",!0),e.xp6(22),e.Q6J("readonly",!0),e.xp6(4),e.Q6J("min",i.getDateFormat())("readonly",!1),e.xp6(1),e.Q6J("ngIf",i.customerOrderForm.get("pickupDateTimeOfTrips").invalid&&(i.customerOrderForm.get("pickupDateTimeOfTrips").dirty||i.customerOrderForm.get("pickupDateTimeOfTrips").touched||i.submit)),e.xp6(1),e.Q6J("hidden",0==i.customerOrderForm.get("returnTripRequired").value),e.xp6(3),e.Q6J("min",i.getDateFormat())("readonly",!1),e.xp6(1),e.Q6J("ngIf",(i.submit||i.customerOrderForm.get("returnDateTimeOfTrips").touched)&&i.customerOrderForm.get("returnDateTimeOfTrips").invalid),e.xp6(4),e.Q6J("readonly",!0),e.xp6(1),e.Q6J("ngIf",i.customerOrderForm.get("pickUpAddress").invalid&&(i.customerOrderForm.get("pickUpAddress").dirty||i.customerOrderForm.get("pickUpAddress").touched||i.submit)),e.xp6(4),e.Q6J("readonly",!0),e.xp6(1),e.Q6J("ngIf",i.customerOrderForm.get("dropOffAddress").invalid&&(i.customerOrderForm.get("dropOffAddress").dirty||i.customerOrderForm.get("dropOffAddress").touched||i.submit)))},directives:[a._Y,a.JL,a.sg,a.Fj,a.JJ,a.u,d.v,a.nD,m.O5,O.g,a._,a.Wl,a.EJ,a.YN,a.Kr],styles:[".modal-header[_ngcontent-%COMP%]   .btn-close[_ngcontent-%COMP%] {\n      padding: calc(var(--bs-modal-header-padding-y) * 0.5) calc(var(--bs-modal-header-padding-x) * 0.5);\n      margin: calc(-0.5 * var(--bs-modal-header-padding-y)) calc(-0.5 * var(--bs-modal-header-padding-x)) calc(-0.5 * var(--bs-modal-header-padding-y)) auto;\n  }\n  .btn-close[_ngcontent-%COMP%]:hover {\n      color: #000;\n      text-decoration: none;\n      opacity: 0.75;\n  }\n  .btn-close[_ngcontent-%COMP%] {\n    box-sizing: content-box;\n    width: 1em;\n    height: 1em;\n    padding: 0.25em 0.25em;\n    color: #000;\n    background: transparent url('cross.e55a606ec01f3327b97d.svg') center/1em auto no-repeat;\n    border: 0;\n    border-radius: 0.375rem;\n    opacity: 0.5;\n}"]}),r}();function x(r){return r.parent.get("returnTripRequired").value&&!r.value?{required:!0}:null}var V=s(8481),U=s(85424),B=s(90065),H=s(75192),K=s(60407),$=function(){function r(n){this.datePipe=n}return r.prototype.transform=function(n){var o=n.replace("T"," ").substring(0,16),i=new Date(o);return this.datePipe.transform(i,"dd/MM/yyyy, hh:mm a")},r.\u0275fac=function(o){return new(o||r)(e.Y36(m.uU,16))},r.\u0275pipe=e.Yjl({name:"dateFormat",type:r,pure:!0}),r}();function z(r,n){if(1&r){var o=e.EpF();e.TgZ(0,"button",18),e.NdJ("click",function(){e.CHM(o);var u=e.oxw().$implicit;return e.oxw(2).readnotes(u.notes)}),e._uU(1,"Read notes"),e.qZA()}}var X=function(r){return{"btn btn-success":r}};function G(r,n){if(1&r){var o=e.EpF();e.TgZ(0,"tr"),e.TgZ(1,"td"),e._uU(2),e.qZA(),e.TgZ(3,"td"),e._uU(4),e.qZA(),e.TgZ(5,"td"),e._uU(6),e.ALo(7,"uppercase"),e.qZA(),e.TgZ(8,"td"),e._uU(9),e.qZA(),e.TgZ(10,"td"),e._uU(11),e.qZA(),e.TgZ(12,"td"),e._uU(13),e.qZA(),e.TgZ(14,"td"),e._uU(15),e.qZA(),e.TgZ(16,"td"),e._uU(17),e.qZA(),e.TgZ(18,"td"),e._uU(19),e.qZA(),e.TgZ(20,"td"),e.YNc(21,z,2,0,"button",10),e.qZA(),e.TgZ(22,"td"),e._uU(23),e.ALo(24,"dateFormat"),e.qZA(),e.TgZ(25,"td"),e._uU(26),e.ALo(27,"dateFormat"),e.qZA(),e.TgZ(28,"td"),e._uU(29),e.qZA(),e.TgZ(30,"td"),e._uU(31),e.qZA(),e.TgZ(32,"td"),e.TgZ(33,"span",11),e._uU(34),e.qZA(),e.qZA(),e.TgZ(35,"td"),e._uU(36),e.ALo(37,"date"),e.qZA(),e.TgZ(38,"td",12),e.TgZ(39,"div",13),e.TgZ(40,"a",14),e._UZ(41,"i",15),e.qZA(),e.TgZ(42,"div",16),e.TgZ(43,"a",17),e.NdJ("click",function(){var N=e.CHM(o).$implicit;return e.oxw(2).update(N)}),e._uU(44," Update "),e.qZA(),e.qZA(),e.qZA(),e.qZA(),e.qZA()}if(2&r){var i=n.$implicit,u=n.index,p=e.oxw(2);e.xp6(2),e.Oqu((p.currentPage-1)*p.perPage+(u+1)),e.xp6(2),e.Oqu(i.purchaseOrderNumber),e.xp6(2),e.Oqu(e.lcZ(7,18,i.name)),e.xp6(3),e.Oqu(i.consultant_name),e.xp6(2),e.Oqu(i.consultant_email),e.xp6(2),e.Oqu(i.mobileNumber),e.xp6(2),e.Oqu(i.purchaseOrderAmount),e.xp6(2),e.Oqu(1==i.scheduledTrip?"Yes":"No"),e.xp6(2),e.Oqu(1==i.returnTripRequired?"Yes":"No"),e.xp6(2),e.Q6J("ngIf",i.notes),e.xp6(2),e.Oqu(e.lcZ(24,20,i.pickupDateTimeOfTrips)),e.xp6(3),e.Oqu(i.returnDateTimeOfTrips?e.lcZ(27,22,i.returnDateTimeOfTrips):"N/A"),e.xp6(3),e.Oqu(i.pickUpAddress),e.xp6(2),e.Oqu(i.dropOffAddress),e.xp6(2),e.Q6J("ngClass",e.VKq(28,X,1==i.status)),e.xp6(1),e.Oqu(1==i.status?"Approved":2==i.status?"Declined":"Pending"),e.xp6(2),e.hij(" ",e.Dn7(37,24,i.created_at,"dd/MM/yyyy, hh:mm a","Australia/Adelaide")," "),e.xp6(3),e.Q6J("placement","left")}}function ee(r,n){if(1&r&&(e.ynx(0),e.YNc(1,G,45,30,"tr",9),e.BQk()),2&r){var o=e.oxw();e.xp6(1),e.Q6J("ngForOf",o.list)}}function te(r,n){1&r&&(e.TgZ(0,"tr"),e.TgZ(1,"th",19),e._uU(2,"No order found"),e.qZA(),e.qZA())}var re=function(){function r(n,o,i,u,p){var c=this;this.uberService=n,this.toastrService=o,this.ngbModal=i,this.route=u,this.router=p,this.list=[],this.currentPage=1,this.totalPage=1,this.perPage=10,this.count=1,this.search="",this.onSearch=function(Z){c.router.navigate([],{relativeTo:c.route,queryParams:{search:Z,page:1},queryParamsHandling:"merge"})},this.onPageChange=function(Z){c.currentPage=Z,c.navigateRoute()},this.navigateRoute=function(){c.router.navigate([],{relativeTo:c.route,queryParams:{page:c.currentPage}})}}return r.prototype.ngOnInit=function(){var n=this;this.uberService.uber$.subscribe(function(o){n.list=function(r,n){for(var o=0,i=n.length,u=r.length;o<i;o++,u++)r[u]=n[o];return r}([],o),n.currentPage=+n.uberService.currentPage,n.perPage=10,n.count=+n.uberService.count,n.totalPage=Math.ceil(n.count/n.perPage)}),this.route.queryParams.subscribe(function(o){n.search=o.search||""})},r.prototype.update=function(n){this.ngbModal.open(j,{size:"xl"}).componentInstance.rideData=n},r.prototype.readnotes=function(n){this.ngbModal.open(V.A).componentInstance.data={notes:n,cancelButtonText:"Close"}},r.\u0275fac=function(o){return new(o||r)(e.Y36(T),e.Y36(g._W),e.Y36(l.FF),e.Y36(U.gz),e.Y36(U.F0))},r.\u0275cmp=e.Xpm({type:r,selectors:[["ng-component"]],decls:45,vars:5,consts:[[1,"row"],[1,"col-lg-3","col-6","mb-2","mb-lg-0"],["type","search","name","search","placeholder","Search","id","",1,"form-control",3,"value","search"],["title","uber orders"],[1,"thead-light"],["scope","col"],[4,"ngIf","ngIfElse"],["noVoucherExist",""],[3,"currentPage","totalPage","pageChange"],[4,"ngFor","ngForOf"],["type","button","class","btn btn-primary read-more-btn",3,"click",4,"ngIf"],[3,"ngClass"],[1,"text-right","dropdown-fixed"],["ngbDropdown","",3,"placement"],["ngbDropdownToggle","",1,"btn","btn-sm","btn-icon-only","text-light"],[1,"fas","fa-ellipsis-v"],["ngbDropdownMenu","",1,"dropdown-menu-right","dropdown-menu-arrow"],[1,"dropdown-item",3,"click"],["type","button",1,"btn","btn-primary","read-more-btn",3,"click"],["colspan","8",1,"no-record-found"]],template:function(o,i){if(1&o&&(e.TgZ(0,"app-page-header"),e.TgZ(1,"div",0),e.TgZ(2,"div",1),e.TgZ(3,"input",2),e.NdJ("search",function(c){return i.onSearch(c.target.value)}),e.qZA(),e.qZA(),e.qZA(),e.qZA(),e.TgZ(4,"app-page-body",3),e.TgZ(5,"thead",4),e.TgZ(6,"tr"),e.TgZ(7,"th",5),e._uU(8,"#"),e.qZA(),e.TgZ(9,"th",5),e._uU(10,"Order no."),e.qZA(),e.TgZ(11,"th",5),e._uU(12,"Name"),e.qZA(),e.TgZ(13,"th",5),e._uU(14,"Consultant Name"),e.qZA(),e.TgZ(15,"th",5),e._uU(16,"Consultant Email"),e.qZA(),e.TgZ(17,"th",5),e._uU(18,"Mobile"),e.qZA(),e.TgZ(19,"th",5),e._uU(20,"Order Amount"),e.qZA(),e.TgZ(21,"th",5),e._uU(22,"Schedule Trip"),e.qZA(),e.TgZ(23,"th",5),e._uU(24,"Return Trip"),e.qZA(),e.TgZ(25,"th",5),e._uU(26,"Notes"),e.qZA(),e.TgZ(27,"th",5),e._uU(28,"Pickup Date Time"),e.qZA(),e.TgZ(29,"th",5),e._uU(30,"Return Date Time"),e.qZA(),e.TgZ(31,"th",5),e._uU(32,"Pick Up Address"),e.qZA(),e.TgZ(33,"th",5),e._uU(34,"Drop Off Address"),e.qZA(),e.TgZ(35,"th",5),e._uU(36,"Status"),e.qZA(),e.TgZ(37,"th",5),e._uU(38,"Time/Date Order Placed"),e.qZA(),e._UZ(39,"th",5),e.qZA(),e.qZA(),e.TgZ(40,"tbody"),e.YNc(41,ee,2,1,"ng-container",6),e.YNc(42,te,3,0,"ng-template",null,7,e.W1O),e.qZA(),e.TgZ(44,"app-pagination",8),e.NdJ("pageChange",function(c){return i.onPageChange(c)}),e.qZA(),e.qZA()),2&o){var u=e.MAs(43);e.xp6(3),e.Q6J("value",i.search),e.xp6(38),e.Q6J("ngIf",i.list.length)("ngIfElse",u),e.xp6(3),e.Q6J("currentPage",i.currentPage)("totalPage",i.totalPage)}},directives:[B.q,H.H,m.O5,K.Q,m.sg,m.mk,l.jt,l.iD,l.Vi],pipes:[m.gd,$,m.uU],encapsulation:2}),r}(),ne=s(48318),F=function(){function r(n){this.uberService=n}return r.prototype.resolve=function(n,o){var i=this,u=n.queryParams.page||1,c=n.queryParams.search;return new ne.y(function(Z){return i.uberService.getAllUberOrders(10,u,c).subscribe({next:function(N){Z.next(1),Z.complete()}.bind(i),error:function(N){Z.complete()}.bind(i)})})},r.\u0275fac=function(o){return new(o||r)(e.LFG(T))},r.\u0275prov=e.Yz7({token:r,factory:r.\u0275fac}),r}(),oe=[{path:"",component:re,resolve:{data:F},runGuardsAndResolvers:"paramsOrQueryParamsChange"}],ie=function(){function r(){}return r.\u0275fac=function(o){return new(o||r)},r.\u0275mod=e.oAB({type:r}),r.\u0275inj=e.cJS({providers:[],imports:[[U.Bz.forChild(oe)],U.Bz]}),r}(),ae=s(42101),ue=function(){function r(){}return r.\u0275fac=function(o){return new(o||r)},r.\u0275mod=e.oAB({type:r}),r.\u0275inj=e.cJS({providers:[F,m.uU],imports:[[t.m,ie,ae.K]]}),r}()}}]);