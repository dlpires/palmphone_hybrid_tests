webpackJsonp([6],{

/***/ 153:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EdiProfessorPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__home_home__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_auth__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_professor__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_forms__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_storage__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_firebase_app__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_firebase_app___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_firebase_app__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var EdiProfessorPage = (function () {
    function EdiProfessorPage(afAuth, navCtrl, navParams, formBuilder, provider, toastCtrl, storage, loadingCtrl) {
        this.afAuth = afAuth;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.formBuilder = formBuilder;
        this.provider = provider;
        this.toastCtrl = toastCtrl;
        this.storage = storage;
        this.loadingCtrl = loadingCtrl;
        //CARREGA OS DADOS VINDO POR PARAMETRO DA TELA DE PERFIL
        this.dados = this.navParams.get("dados");
        //RECEBE OS DADOS DO FORMULARIO PARA EDIÇÂO
        this.contact = this.navParams.data.contact || {};
        //CRIA O FORMULARIO
        this.createForm();
    }
    //CRIA UM FORM COM OS DADOS RECOLHIDOS DO FORM HTML
    EdiProfessorPage.prototype.createForm = function () {
        this.form = this.formBuilder.group({
            key: [this.contact.key],
            nomeProf: [this.contact.name, __WEBPACK_IMPORTED_MODULE_5__angular_forms__["f" /* Validators */].required],
            rgProf: [this.contact.rg, __WEBPACK_IMPORTED_MODULE_5__angular_forms__["f" /* Validators */].required],
            dataNascProf: [this.contact.dtNascimento, __WEBPACK_IMPORTED_MODULE_5__angular_forms__["f" /* Validators */].required],
        });
    };
    //FUNCAO PARA SALVAR OS DADOS
    EdiProfessorPage.prototype.save = function () {
        //CHAMA UM SHOEDIALOG PARA MOSTRAR O CARREGAMENTO DO APP
        var loading = this.showLoading();
        //VARIAVEL QUE RECEBE O VALOR DO FORM
        var formUser = this.form.value;
        //VERIFICA SE O FORM TEM DADOS VALIDOS
        if (this.filePhoto) {
            //PEGA O UID GERADO QUANDO FOI CRIADO O USUARIO
            var uuid = __WEBPACK_IMPORTED_MODULE_7_firebase_app__["auth"]().currentUser.uid;
            this.uploadPhoto(formUser, uuid);
            //SALVA NO STORAGE O UID DO USUARIO COMO CHAVE E UM OBJETO USER COM OS DADOS VINDO DO FIREBASE
            this.storage.set(uuid, formUser);
            //CHAMA A TELA DE HOME DO APP
            this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_0__home_home__["a" /* HomePage */]);
            //FECHA O LOADING
            loading.dismiss();
        }
        else {
            //PEGA O UID GERADO QUANDO FOI CRIADO O USUARIO
            var uuid = __WEBPACK_IMPORTED_MODULE_7_firebase_app__["auth"]().currentUser.uid;
            this.uploadSemPhoto(formUser, uuid);
            //SALVA NO STORAGE O UID DO USUARIO COMO CHAVE E UM OBJETO USER COM OS DADOS VINDO DO FIREBASE
            this.storage.set(uuid, formUser);
            //CHAMA A TELA DE HOME DO APP
            this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_0__home_home__["a" /* HomePage */]);
            //FECHA O LOADING
            loading.dismiss();
        }
    };
    EdiProfessorPage.prototype.uploadSemPhoto = function (item, uuid) {
        //CRIA UM OBJETO USUARIO E CARRREGA COM OS DADOS DO FORMULARIO
        var usuario = {
            nomeProf: item.nomeProf,
            dataNascProf: item.dataNascProf,
            rgProf: item.rgProf,
            emailProf: this.dados.emailProf,
            senhaProf: this.dados.senhaProf,
            disciplinas: [
                { dscDisc: this.dados.disciplinas }
            ],
            url: this.dados.url,
        };
        //CHAMA A FUNCAO QUE CRIA O USUARIO
        this.provider.update(usuario, uuid);
        //SALVA NO STORAGE O UID DO USUARIO COMO CHAVE E UM OBJETO USER COM OS DADOS VINDO DO FIREBASE
        this.storage.set(uuid, usuario);
    };
    //FUNCAO QUE CHAMA O UPLOAD DA FOTO
    EdiProfessorPage.prototype.uploadPhoto = function (item, uuid) {
        var _this = this;
        //CRIA UM OBJETO USUARIO E CARRREGA COM OS DADOS DO FORMULARIO
        var usuario = {
            nomeProf: item.nomeProf,
            dataNascProf: item.dataNascProf,
            rgProf: item.rgProf,
            emailProf: this.dados.emailProf,
            senhaProf: this.dados.senhaProf,
            disciplinas: [
                { dscDisc: this.dados.disciplinas }
            ],
            url: '',
        };
        //CHAMA A FUNCAO DE UPLOAD DO PROVIDER PROFESSOR
        var uploadTask = this.provider.uploadPhoto(this.filePhoto, uuid);
        uploadTask.then(function (UploadTaskSnapshot) {
            //RECEBE A URL DA IMAGEM QUE FOI SALVA NO FIREBASE
            usuario.url = uploadTask.snapshot.downloadURL;
            //CHAMA A FUNCAO QUE CRIA O USUARIO
            _this.provider.update(usuario, uuid);
            //SALVA NO STORAGE O UID DO USUARIO COMO CHAVE E UM OBJETO USER COM OS DADOS VINDO DO FIREBASE
            _this.storage.set(uuid, usuario);
        });
    };
    //PEGA A FOTO
    EdiProfessorPage.prototype.onPhoto = function (event) {
        this.filePhoto = event.target.files[0];
    };
    //PARA CRIAR UM TOAST
    EdiProfessorPage.prototype.toastMenssager = function (mensagen) {
        //CRIA UM TOAST DE CONFIRMAÇÂO DE SINCRONIZACAO
        var toast = this.toastCtrl.create({
            duration: 3000,
            position: 'bottom',
            message: mensagen
        });
        toast.present();
    };
    //FUNÇÃO RESPONSAVEL PELA CRIAÇÂO DO SHOWLOADING
    EdiProfessorPage.prototype.showLoading = function () {
        var loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        return loading;
    };
    EdiProfessorPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_3__angular_core__["m" /* Component */])({
            selector: 'page-edi-professor',template:/*ion-inline-start:"C:\Users\Julio\Desktop\teste2\palmphone_V3\src\pages\edi-professor\edi-professor.html"*/'<ion-header>\n\n\n\n  <ion-navbar>\n\n    <ion-title>Editar</ion-title>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n\n\n<ion-content padding>\n\n\n\n  <form [formGroup]="form" (ngSubmit)="save(); $event.preventDefault()">\n\n    <ion-item>\n\n      <label stacked>Nome</label>\n\n      <input id="nome" type="text"  [(ngModel)]="dados.nomeProf"  formControlName="nomeProf"/>\n\n    </ion-item>\n\n    \n\n\n\n    <ion-item>\n\n      <label stacked>Rg</label>\n\n      <input id="rg" type="text" [(ngModel)]="dados.rgProf" formControlName="rgProf"/>\n\n    </ion-item>\n\n\n\n\n\n    <ion-item>\n\n      <label stacked>Data Nascimento</label>\n\n      <input id="nascimento" type="date" displayFormat="DD/MM/YYYY" [(ngModel)]="dados.dataNascProf" formControlName="dataNascProf"/>\n\n    </ion-item>\n\n\n\n\n\n    <ion-item>\n\n      <ion-icon name="image" item-start></ion-icon>\n\n      <input type="file" accept="image/*" (change)="onPhoto($event)">\n\n    </ion-item>\n\n\n\n    <div padding>\n\n      <button ion-button block type="submit" [disabled]="!form.valid" (click)="save()">Salvar</button>\n\n    </div>\n\n    \n\n  </form>\n\n\n\n\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\Julio\Desktop\teste2\palmphone_V3\src\pages\edi-professor\edi-professor.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__providers_auth__["a" /* AuthProvider */],
            __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["g" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["h" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_5__angular_forms__["a" /* FormBuilder */],
            __WEBPACK_IMPORTED_MODULE_2__providers_professor__["a" /* ProfessorProvider */],
            __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["j" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_6__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["f" /* LoadingController */]])
    ], EdiProfessorPage);
    return EdiProfessorPage;
}());

//# sourceMappingURL=edi-professor.js.map

/***/ }),

/***/ 154:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CadProfessorPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__home_home__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_auth__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_professor__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_forms__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_storage__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_firebase_storage__ = __webpack_require__(223);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_firebase_storage___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_firebase_storage__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var CadProfessorPage = (function () {
    function CadProfessorPage(afAuth, navCtrl, navParams, formBuilder, provider, toastCtrl, storage, loadingCtrl, alertCtrl) {
        this.afAuth = afAuth;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.formBuilder = formBuilder;
        this.provider = provider;
        this.toastCtrl = toastCtrl;
        this.storage = storage;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        //ARQUIVO DAS DISCIPLINAS
        this.nomeDisciplinas = [
            {
                "dscDisc": "SIF039 - Redes de Computadores II"
            },
            {
                "dscDisc": "SIF033 - Engenharia de Software III"
            },
            {
                "dscDisc": "SIF040 - Projeto de Sistemas I"
            },
            {
                "dscDisc": "SIF068 - Tópicos em Linguagem de Programação"
            },
            {
                "dscDisc": "SIF012 - Linguagem de Programação IV"
            },
            {
                "dscDisc": "SIF032 - Engenharia de Software II"
            },
            {
                "dscDisc": "SIF035 - Interface Humano Computador"
            }
        ];
        //RECEBE OS DADOS DO FORMULARIO PARA EDIÇÂO
        this.contact = this.navParams.data.contact || {};
        //CRIA O FORMULARIO
        this.createForm();
    }
    //CRIA UM FORM COM OS DADOS RECOLHIDOS DO FORM HTML
    CadProfessorPage.prototype.createForm = function () {
        this.form = this.formBuilder.group({
            $key: [this.contact.key],
            nomeProf: [this.contact.name, __WEBPACK_IMPORTED_MODULE_5__angular_forms__["f" /* Validators */].required],
            rgProf: [this.contact.rg, __WEBPACK_IMPORTED_MODULE_5__angular_forms__["f" /* Validators */].required],
            disciplinas: [this.contact.disciplinas, __WEBPACK_IMPORTED_MODULE_5__angular_forms__["f" /* Validators */].required],
            dataNascProf: [this.contact.dtNascimento, __WEBPACK_IMPORTED_MODULE_5__angular_forms__["f" /* Validators */].required],
            emailProf: [this.contact.email, __WEBPACK_IMPORTED_MODULE_5__angular_forms__["f" /* Validators */].required],
            senhaProf: [this.contact.senha, __WEBPACK_IMPORTED_MODULE_5__angular_forms__["f" /* Validators */].required],
            url: '',
        });
    };
    //FUNCAO PARA SALVAR OS DADOS
    CadProfessorPage.prototype.save = function () {
        var _this = this;
        //CHAMA UM SHOEDIALOG PARA MOSTRAR O CARREGAMENTO DO APP
        var loading = this.showLoading();
        //VARIAVEL QUE RECEBE O VALOR DO FORM
        var formUser = this.form.value;
        //CHAMA A FUNÇÃO DE ATUALIZAR O USUARIO
        this.afAuth.createUser({
            email: formUser.emailProf,
            password: formUser.senhaProf
            //SE A ATUALIZAÇÂO DO USUARIO DEU CERTO ELE ATUALIZA OS OUTROS DADOS
        }).then(function (authUser) {
            //PEGA O UID GERADO QUANDO FOI CRIADO O USUARIO
            var uuid = authUser.uid;
            //FAZ O UPLOAD DA FOTO    
            _this.uploadPhoto(formUser, uuid);
            //MENSAGEM DE CADASTRO COM SUCESSO 
            _this.toastMenssager("Cadastro efetuado com sucesso");
            //TIRA O SHOWLOADING 
            loading.dismiss();
        }).catch(function (error) {
            //MOSTRA ERRO 
            _this.cancelar(error);
            //TIRA O SHOWLOADING 
            loading.dismiss();
        });
    };
    //FUNCAO QUE CHAMA O UPLOAD DA FOTO
    CadProfessorPage.prototype.uploadPhoto = function (item, uuid) {
        var _this = this;
        var uploadTask;
        //CRIA UM OBJETO USUARIO E CARRREGA COM OS DADOS DO FORMULARIO
        var usuario = {
            nomeProf: item.nomeProf,
            dataNascProf: item.dataNascProf,
            rgProf: item.rgProf,
            emailProf: item.emailProf,
            senhaProf: item.senhaProf,
            disciplinas: item.disciplinas,
            url: '',
        };
        if (this.filePhoto != null) {
            //CHAMA A FUNCAO DE UPLOAD DO PROVIDER PROFESSOR
            uploadTask = this.provider.uploadPhoto(this.filePhoto, uuid);
            uploadTask.then(function (UploadTaskSnapshot) {
                //RECEBE A URL DA IMAGEM QUE FOI SALVA NO FIREBASE
                usuario.url = uploadTask.snapshot.downloadURL;
                //CHAMA A FUNCAO QUE CRIA O USUARIO
                _this.provider.create(usuario, uuid);
                //SALVA NO STORAGE O UID DO USUARIO COMO CHAVE E UM OBJETO USER COM OS DADOS VINDO DO FIREBASE
                _this.storage.set(uuid, usuario);
                //CHAMA A TELA DE HOME DO APP
                _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_0__home_home__["a" /* HomePage */], { dados: usuario });
            });
        }
        else {
            //RECEBE A URL DA IMAGEM QUE FOI SALVA NO FIREBASE
            usuario.url = "https://firebasestorage.googleapis.com/v0/b/palmphone-ad0fb.appspot.com/o/fotoPerfilProfessor%2FvjJZVZPMYKhNDRQPuYI4RVsM6rv1.jpg?alt=media&token=a63c362b-a458-41b6-8d98-02a9a3deb093";
            //CHAMA A FUNCAO QUE CRIA O USUARIO
            this.provider.create(usuario, uuid);
            //SALVA NO STORAGE O UID DO USUARIO COMO CHAVE E UM OBJETO USER COM OS DADOS VINDO DO FIREBASE
            this.storage.set(uuid, usuario);
            //CHAMA A TELA DE HOME DO APP
            this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_0__home_home__["a" /* HomePage */], { dados: usuario });
        }
    };
    //PEGA A FOTO
    CadProfessorPage.prototype.onPhoto = function (event) {
        this.filePhoto = event.target.files[0];
    };
    //PARA CRIAR UM TOAST
    CadProfessorPage.prototype.toastMenssager = function (mensagen) {
        //CRIA UM TOAST DE CONFIRMAÇÂO DE SINCRONIZACAO
        var toast = this.toastCtrl.create({
            duration: 5000,
            position: 'bottom',
            message: mensagen
        });
        toast.present();
    };
    //FUNCAO PARA CANCELAR A CHAMDA
    CadProfessorPage.prototype.cancelar = function (erro) {
        var alert = this.alertCtrl.create({
            title: 'Alerta',
            message: erro,
            buttons: [
                {
                    text: 'OK',
                    handler: function () {
                    }
                }
            ]
        });
        //CHAMA O ALERTA PARA SER EXIBIDO
        alert.present();
    };
    //FUNÇÃO RESPONSAVEL PELA CRIAÇÂO DO SHOWLOADING
    CadProfessorPage.prototype.showLoading = function () {
        var loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        return loading;
    };
    CadProfessorPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_3__angular_core__["m" /* Component */])({
            selector: 'page-cad-professor',template:/*ion-inline-start:"C:\Users\Julio\Desktop\teste2\palmphone_V3\src\pages\cad-professor\cad-professor.html"*/'<ion-header>\n\n\n\n  <ion-navbar>\n\n    <ion-title>Professor</ion-title>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n\n\n<ion-content padding>\n\n\n\n  <form [formGroup]="form" (ngSubmit)="save(); $event.preventDefault()"> \n\n\n\n    <ion-item>\n\n      <ion-icon name="image" item-start></ion-icon>\n\n      <input type="file" accept="image/*" (change)="onPhoto($event)" required>\n\n    </ion-item>\n\n\n\n    <ion-item> \n\n        <label stacked>Nome</label>   \n\n      <input id="nome"  type="text"  formControlName="nomeProf"/>\n\n    </ion-item>\n\n    \n\n \n\n    <ion-item>\n\n      <label stacked>Rg</label>\n\n      <input id="rg" type="text"  formControlName="rgProf"/>\n\n    </ion-item>\n\n    \n\n\n\n    <ion-item>\n\n      <label stacked>Nascimento</label>\n\n      <input id="nascimento" type="text" displayFormat="DD/MM/YYYY"  formControlName="dataNascProf"/>\n\n    </ion-item>\n\n    \n\n\n\n    <ion-item>\n\n      <label stacked>Email</label>\n\n      <!--<input id="email" type="email"   formControlName="emailProf"/> -->\n\n      <input id="email2" type="email" placeholder="Email" formControlName="emailProf"/>\n\n    </ion-item>\n\n    \n\n\n\n    <ion-item>\n\n      <label stacked>Senha</label>\n\n      <input id="password2" type="password"   formControlName="senhaProf"/>\n\n    </ion-item>\n\n    \n\n\n\n    <ion-item>\n\n      <label>Disciplinas</label>\n\n      <select id="disciplinas"  multiple="true" cancelText="Cancelar" okText="Confirmar" formControlName="disciplinas">\n\n        <option value="SIF039 - Redes de Computadores II">SIF039 - Redes de Computadores II</option>\n\n        <option value="SIF033 - Engenharia de Software III">SIF033 - Engenharia de Software III</option>\n\n        <option value="SIF040 - Projeto de Sistemas I">SIF040 - Projeto de Sistemas I</option>\n\n        <option value="SIF068 - Tópicos em Linguagem de Programação">SIF068 - Tópicos em Linguagem de Programação</option>\n\n        <option value="SIF012 - Linguagem de Programação IV">SIF012 - Linguagem de Programação IV</option>\n\n        <option value="SIF032 - Engenharia de Software II">SIF032 - Engenharia de Software II</option>\n\n        <option value="SIF035 - Interface Humano Computador">SIF035 - Interface Humano Computador</option>\n\n      </select>\n\n    </ion-item>\n\n    \n\n\n\n    <div padding>\n\n      <button id="salvar" ion-button block type="submit" [disabled]="!form.valid">Salvar</button>\n\n    </div>\n\n    \n\n  </form>\n\n\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\Julio\Desktop\teste2\palmphone_V3\src\pages\cad-professor\cad-professor.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__providers_auth__["a" /* AuthProvider */],
            __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["g" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["h" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_5__angular_forms__["a" /* FormBuilder */],
            __WEBPACK_IMPORTED_MODULE_2__providers_professor__["a" /* ProfessorProvider */],
            __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["j" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_6__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["f" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["a" /* AlertController */]])
    ], CadProfessorPage);
    return CadProfessorPage;
}());

//# sourceMappingURL=cad-professor.js.map

/***/ }),

/***/ 155:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ColetorPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__leitor_leitor__ = __webpack_require__(156);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ColetorPage = (function () {
    function ColetorPage(navCtrl, navParams, toastCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.toastCtrl = toastCtrl;
        //CARREGA OS DADOS VINDO POR PARAMETRO DO USUARIO LOGADO
        this.currentUser = this.navParams.get("dados");
        //CARREGA AS DISCIPLINAS DO PROFESSOR
        this.disciplina = this.currentUser.disciplinas;
        console.log(this.disciplina);
    }
    //CHAMA A PAGINA DO LEITOR DO CODIGO DE BARRA
    ColetorPage.prototype.abrirLeitor = function () {
        //FAZ UMA VERIFICAÇÂO PARA ATIVAR O BOTAO, SE NAO FOR SELECIONADO NEM UMA DAS OPÇOES ELE NAO DEIXA ABRIR A PAGINA SOLICITADA
        if (this.disc != null && this.numAula != null) {
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__leitor_leitor__["a" /* LeitorPage */]);
        }
        else if (this.disc == null) {
            //CRIA UM TOAST PARA ALERTAR SOBRE A SELECAO DA DISCIPLINA
            var toast = this.toastCtrl.create({
                duration: 3000,
                position: 'middle',
                message: 'Selecione a disciplina'
            });
            toast.present();
        }
        else if (this.numAula == null) {
            //CRIA UM TOAST PARA ALERTAR SOBRE A SELECAO DO NUMERO DE AULAS
            var toast = this.toastCtrl.create({
                duration: 3000,
                position: 'middle',
                message: 'Selecione o numero de aulas'
            });
            toast.present();
        }
    };
    //CARREGA OS DADOS DO CAMPO SELECIONADO
    ColetorPage.prototype.verificaNumAula = function (numAula) {
        this.numAula = numAula;
    };
    //CARREGA OS DADOS DO CAMPO SELECIONADO
    ColetorPage.prototype.verificaDisci = function (disc) {
        this.disc = disc;
    };
    ColetorPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-coletor',template:/*ion-inline-start:"C:\Users\Julio\Desktop\teste2\palmphone_V3\src\pages\coletor\coletor.html"*/'<ion-header>\n\n  \n\n  <ion-navbar>\n\n    <ion-title>Coletor </ion-title>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n<ion-content padding>\n\n<ion-card>\n\n  <ion-list>\n\n    <ion-item>\n\n      <h2>{{currentUser.nomeProf}}</h2>\n\n    </ion-item>\n\n  </ion-list>\n\n\n\n\n\n  <ion-list>\n\n    <ion-item>\n\n      <label>Disciplina:</label>\n\n      <select id="disciplina" [(ngModel)]="disc" (ionChange)="verificaDisci(disc)" interface="popover">       \n\n        <option *ngFor="let disc of disciplina" value="disc">{{disc}}</option>\n\n      </select>\n\n    </ion-item>\n\n  </ion-list>\n\n\n\n  <ion-list>\n\n    <ion-item>\n\n      <label>Nº de aulas:</label>\n\n      <select id="numero_aulas" [(ngModel)]="numAula" (ionChange)="verificaNumAula(numAula)" interface="popover">\n\n        <option value="1">1</option>\n\n        <option value="2">2</option>\n\n        <option value="3">3</option>\n\n        <option value="4">4</option>\n\n      </select>\n\n    </ion-item>\n\n  </ion-list>\n\n</ion-card>\n\n\n\n<ion-card>\n\n\n\n  <button id="abrir_leitor" ion-button full (click)="abrirLeitor()">\n\n      Coletar dados\n\n  </button>\n\n</ion-card>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\Julio\Desktop\teste2\palmphone_V3\src\pages\coletor\coletor.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ToastController */]])
    ], ColetorPage);
    return ColetorPage;
}());

//# sourceMappingURL=coletor.js.map

/***/ }),

/***/ 156:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LeitorPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_forms__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_barcode_scanner__ = __webpack_require__(271);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_common__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_storage__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_dialogs__ = __webpack_require__(273);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var LeitorPage = (function () {
    function LeitorPage(navCtrl, navParams, barcode, alertCtrl, toastCtrl, formBuilder, datepipe, storage, platform, dialogs) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.barcode = barcode;
        this.alertCtrl = alertCtrl;
        this.toastCtrl = toastCtrl;
        this.formBuilder = formBuilder;
        this.datepipe = datepipe;
        this.storage = storage;
        this.platform = platform;
        this.dialogs = dialogs;
        this.lista = [];
        //RESPONSAVEL POR TRAZER OS DADOS DO FORMULARIO HTML
        this.dados = this.navParams.data.dados || {};
        //CRIA UM OBJETO DO TIPO FORM
        this.createForm();
    }
    //CRIA O FORMULARIO COM OS DADOS VINDO DA TELA QUANDO USAR O MODO MANUAL
    LeitorPage.prototype.createForm = function () {
        //FORMATA DATA ATUAL
        var dataAtual = this.datepipe.transform(new Date(), "dd/MM/yyyy/-HH-mm-ss");
        this.form = this.formBuilder.group({
            ra: ['', [__WEBPACK_IMPORTED_MODULE_0__angular_forms__["f" /* Validators */].required]],
            data: dataAtual //DATA QUE FOI FEITO A DIGITAÇÃO  
        });
    };
    //VAI FINALIZAR A CHAMADA SALVANDO OS DADOS DA LISTA NO STORAGE
    LeitorPage.prototype.saveStorage = function () {
        var _this = this;
        if (this.verificaListaEstaVazia()) {
            var alert_1 = this.alertCtrl.create({
                title: 'Confirmação',
                message: 'Deseja finalizar a chamada?',
                buttons: [
                    {
                        text: 'Confirmar',
                        handler: function () {
                            //FORMATA DATA ATUAL, QUE SERA A CHAVE PRIMARIA 
                            var dataAtual = _this.datepipe.transform(new Date(), "ddMMyyyyHHmmss");
                            //SALVA NO STORAGE O UID DO USUARIO COMO CHAVE E UM OBJETO USER COM OS DADOS VINDO DO FIREBASE
                            _this.storage.set(dataAtual, _this.lista);
                            //CAHAMA O TOAST DE CONFIRMACAO 
                            _this.toastMenssager('Chamada finalizada');
                            //VOLTA PARA A TELA ANTERIOR
                            _this.navCtrl.pop();
                        }
                    }
                ]
            });
            //CHAMA O ALERTA PARA SER EXIBIDO
            alert_1.present();
        }
    };
    //FUNCAO PARA SALVAR OS DADO DIGITADOS PELO USUARIO NA LISTA
    LeitorPage.prototype.saveManual = function () {
        var _this = this;
        //SE O FORMULARIO FOR VALIDO
        if (this.form.valid) {
            var alert_2 = this.alertCtrl.create({
                title: 'Confirmação da leitura',
                message: 'Deseja salvar este RA: ' + this.form.value.ra + ' ?',
                buttons: [
                    {
                        text: 'Confirmar',
                        handler: function () {
                            //PREENCHE A LISTA COM OS DADOS
                            _this.lista.push(_this.form.value);
                            //CHAMA UM ALERTA SONORO QUANDO SALVA MANUAL
                            _this.dialogs.beep(1);
                            //LIMPA FORMULARIO
                            _this.createForm();
                            //CAHAMA O TOAST DE CONFIRMACAO 
                            _this.toastMenssager('RA Salvo');
                        }
                    }
                ]
            });
            //CHAMA O ALERTA PARA SER EXIBIDO
            alert_2.present();
        }
    };
    //FUNCAO DO LEITOR DE CODIGO DE BARRA
    LeitorPage.prototype.scanBarcode = function () {
        var _this = this;
        //CONFIGURA AS OPÇõES DO LEITOR
        var options = {
            //OQUE VAI SER EXIBIDO QUANDO EFETUAR A LEITURA
            prompt: "Posicione o código de barras sobre a linha vermelha",
            //CONFIGURAÇÂO DO BEEP DO LEITOR
            disableSuccessBeep: false,
        };
        //FUNCAO QUE LE OS DADOS
        this.barcode.scan(options).then(function (valor) {
            if (valor.text != "") {
                var alert_3 = _this.alertCtrl.create({
                    title: 'Confirmação da leitura',
                    message: 'Deseja salvar este RA: ' + valor.text + ' ?',
                    buttons: [
                        {
                            text: 'Confirmar',
                            handler: function () {
                                //FORMATA DATA ATUAL
                                var data = _this.datepipe.transform(new Date(), "dd/MM/yyyy/-HH-mm-ss");
                                //ADICIONA O TEXTO PEGO DO SCAN E JOGA NA VARIAVEL RA
                                var ra = valor.text;
                                //SALVA OS DADOS NA LISTA/
                                _this.lista.push({ ra: ra, data: data });
                                //CAHAMA O TOAST DE CONFIRMACAO 
                                _this.toastMenssager('RA Salvo');
                                _this.scanBarcode();
                            }
                        }
                    ]
                });
                //CHAMA O ALERTA PARA SER EXIBIDO
                alert_3.present();
            }
            else {
                //CRIA UM ALERTA E EXIBE A MENSAGEM DE ERRO
                var alert_4 = _this.alertCtrl.create({
                    title: 'Captura nao realizada teste ionic!',
                    buttons: ['Fechar']
                });
                alert_4.present();
            }
        })
            .catch(function (err) {
            //CRIA UM ALERTA E EXIBE A MENSAGEM DE ERRO
            var alert = _this.alertCtrl.create({
                title: 'Atenção!',
                subTitle: err,
                buttons: ['Fechar']
            });
            alert.present();
        });
    };
    //FUNCAO PARA VERIFICAR SE A LISTA ESTA VAZIA 
    LeitorPage.prototype.verificaListaEstaVazia = function () {
        //CASO A LISTA SEJA MENOR OU IGUALA 0 CRIA UM ALERTA
        if (this.lista.length <= 0) {
            var alert_5 = this.alertCtrl.create({
                title: 'Atenção',
                subTitle: 'Sem dados para finalizar a chamada!!',
                buttons: ['Ok']
            });
            alert_5.present();
            return false;
        }
        else {
            return true;
        }
    };
    //FUNCAO PARA CANCELAR A CHAMDA
    LeitorPage.prototype.cancelar = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Cancelamento',
            message: 'Deseja cancelar a chamada e voltar a pagina anterior?',
            buttons: [
                {
                    text: 'Confirmar',
                    handler: function () {
                        _this.navCtrl.pop();
                    }
                }
            ]
        });
        //CHAMA O ALERTA PARA SER EXIBIDO
        alert.present();
    };
    //PARA CRIAR UM TOAST
    LeitorPage.prototype.toastMenssager = function (mensagen) {
        //CRIA UM TOAST DE CONFIRMAÇÂO DE SINCRONIZACAO
        var toast = this.toastCtrl.create({
            duration: 3000,
            position: 'bottom',
            message: mensagen
        });
        toast.present();
    };
    LeitorPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["m" /* Component */])({
            selector: 'page-leitor',template:/*ion-inline-start:"C:\Users\Julio\Desktop\teste2\palmphone_V3\src\pages\leitor\leitor.html"*/'<ion-header>\n\n  \n\n  <ion-navbar hideBackButton>\n\n    <ion-title>Coleta de Dados</ion-title>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n  <ion-content padding>\n\n    <ion-card>\n\n      <form [formGroup]="form" (ngSubmit)="saveManual(); $event.preventDefault()">\n\n        <ion-item>         \n\n          <input id="ra" type="number" placeholder="Insira o RA:" formControlName="ra"/>\n\n        </ion-item> \n\n          \n\n        <button id="botao_salvar" ion-button full type="submit" [disabled]="form.invalid">Salvar</button>\n\n      </form>\n\n\n\n      <button id="botao_finalizar" ion-button full type="submit" color="secondary" (click)="saveStorage()">Finalizar Chamada</button>\n\n    </ion-card>\n\n    \n\n    <ion-card>\n\n      <button id="botao_cancelar" ion-button full type="submit" color="danger" (click)="cancelar()">Cancelar</button>\n\n    </ion-card>\n\n\n\n    <ion-card>\n\n      <button id="botao_camera" ion-button full color="light" (click)="scanBarcode()">Camera</button>\n\n    </ion-card>\n\n\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\Julio\Desktop\teste2\palmphone_V3\src\pages\leitor\leitor.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["g" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["h" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_barcode_scanner__["a" /* BarcodeScanner */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["j" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_0__angular_forms__["a" /* FormBuilder */],
            __WEBPACK_IMPORTED_MODULE_4__angular_common__["d" /* DatePipe */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["i" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_6__ionic_native_dialogs__["a" /* Dialogs */]])
    ], LeitorPage);
    return LeitorPage;
}());

//# sourceMappingURL=leitor.js.map

/***/ }),

/***/ 157:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PerfilPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__providers_professor__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__edi_professor_edi_professor__ = __webpack_require__(153);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var PerfilPage = (function () {
    function PerfilPage(navCtrl, navParams, provider, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.provider = provider;
        this.loadingCtrl = loadingCtrl;
        this.currentUser = null;
        //RECEBE DADOS POR PARAMETRO DA TELA DE HOME
        this.currentUser = this.navParams.get("dados");
    }
    PerfilPage.prototype.ionViewCanEnter = function () {
        var _this = this;
        //CRIA O LOADING
        var loading = this.showLoading();
        //BUSCA O OBJETO DO USUARIO QUE ESTA LOGADO 
        var subscribe = this.provider.get().subscribe(function (c) {
            subscribe.unsubscribe();
            //E CARREGA O OBJETO COM OS DADOS
            _this.currentUser.url = c.url;
            //FECHA O LOADING
            loading.dismiss();
        });
    };
    //MANDA OS DADOS PARA A PAGINA DE EDIÇÂO
    PerfilPage.prototype.editarProfessor = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__edi_professor_edi_professor__["a" /* EdiProfessorPage */], { dados: this.currentUser });
    };
    //FUNÇÃO RESPONSAVEL PELA CRIAÇÂO DO SHOWLOADING
    PerfilPage.prototype.showLoading = function () {
        var loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        return loading;
    };
    PerfilPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["m" /* Component */])({
            selector: 'page-perfil',template:/*ion-inline-start:"C:\Users\Julio\Desktop\teste2\palmphone_V3\src\pages\perfil\perfil.html"*/'<ion-header>\n\n  \n\n  <ion-navbar>\n\n    <ion-title>Perfil Usuário </ion-title>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n\n\n<ion-content padding>\n\n\n\n  <ion-item >\n\n    \n\n      <img src="{{currentUser.url}}" alt="Imagem de perfil" height="150" right="150" class="photoPerfil"/>\n\n    \n\n  </ion-item>\n\n\n\n  <ion-item>\n\n    <h2>{{currentUser.nomeProf}}</h2>\n\n  </ion-item>\n\n\n\n  <ion-item>\n\n    <p>{{currentUser.emailProf}}</p>\n\n  </ion-item>\n\n\n\n  <ion-item>\n\n    <p>{{currentUser.rgProf}}</p>\n\n  </ion-item>\n\n\n\n  <ion-item>\n\n    <p>{{currentUser.dataNascProf  }}</p>\n\n  </ion-item>\n\n\n\n  <ion-fab bottom right>\n\n    <button ion-fab icon-only color="danger" (click)="editarProfessor()">\n\n      <ion-icon name="create"></ion-icon>\n\n    </button>\n\n  </ion-fab>\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\Julio\Desktop\teste2\palmphone_V3\src\pages\perfil\perfil.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["g" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["h" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_0__providers_professor__["a" /* ProfessorProvider */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["f" /* LoadingController */]])
    ], PerfilPage);
    return PerfilPage;
}());

//# sourceMappingURL=perfil.js.map

/***/ }),

/***/ 169:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 169;

/***/ }),

/***/ 170:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BaseProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var extractError = function (error) {
    // In a real world app, we might use a remote logging infrastructure
    var errMsg;
    if (error instanceof Response) {
        var body = error.json() || '';
        var err = body || JSON.stringify(body);
        errMsg = error.status + " - " + (error.statusText || '') + " " + err;
    }
    else {
        errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return errMsg;
};
var BaseProvider = (function () {
    function BaseProvider() {
    }
    BaseProvider.prototype.handlePromiseError = function (error) {
        return Promise.reject(extractError(error));
    };
    BaseProvider.prototype.handleObservableError = function (error) {
        return __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__["Observable"].throw(extractError(error));
    };
    BaseProvider.prototype.mapListKeys = function (list) {
        return list
            .snapshotChanges()
            .map(function (actions) { return actions.map(function (action) { return (__assign({ $key: action.key }, action.payload.val())); }); });
    };
    BaseProvider.prototype.mapObjectKey = function (object) {
        return object
            .snapshotChanges()
            .map(function (action) { return (__assign({ $key: action.key }, action.payload.val())); });
    };
    BaseProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["A" /* Injectable */])()
    ], BaseProvider);
    return BaseProvider;
}());

//# sourceMappingURL=base.js.map

/***/ }),

/***/ 229:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ColetorProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_angularfire2_database__ = __webpack_require__(96);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ColetorProvider = (function () {
    function ColetorProvider(db) {
        this.db = db;
    }
    //FUNCAO RESPONSAVEL POR SALVAR OS DADOS NO FIREBASE, RECEBE UMA LISTA E A CHAVE
    ColetorProvider.prototype.saveChamadas = function (dados, uuid) {
        return this.db.object("/chamada/" + uuid) // CHAMADAS SERA O NOME DA CHAVE ONDE FICARA OS DADOS
            .set(dados)
            .catch();
    };
    ColetorProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0_angularfire2_database__["a" /* AngularFireDatabase */]])
    ], ColetorProvider);
    return ColetorProvider;
}());

//# sourceMappingURL=coletor.js.map

/***/ }),

/***/ 270:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/cad-professor/cad-professor.module": [
		498,
		5
	],
	"../pages/coletor/coletor.module": [
		499,
		4
	],
	"../pages/edi-professor/edi-professor.module": [
		500,
		3
	],
	"../pages/leitor/leitor.module": [
		501,
		2
	],
	"../pages/login/login.module": [
		502,
		1
	],
	"../pages/perfil/perfil.module": [
		503,
		0
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 270;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 315:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(316);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(336);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 336:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pages_edi_professor_edi_professor__ = __webpack_require__(153);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_barcode_scanner__ = __webpack_require__(271);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_leitor_leitor__ = __webpack_require__(156);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_cad_professor_cad_professor__ = __webpack_require__(154);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_platform_browser__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_ionic_angular__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_splash_screen__ = __webpack_require__(313);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_status_bar__ = __webpack_require__(314);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__app_component__ = __webpack_require__(496);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_home_home__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_coletor_coletor__ = __webpack_require__(155);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_login_login__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_perfil_perfil__ = __webpack_require__(157);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__providers_auth__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__ionic_storage__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__ionic_native_dialogs__ = __webpack_require__(273);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__app_firebase_config__ = __webpack_require__(497);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19_angularfire2__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20_angularfire2_auth__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__providers_professor__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22_angularfire2_database__ = __webpack_require__(96);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__providers_base__ = __webpack_require__(170);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__providers_coletor__ = __webpack_require__(229);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

























var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_6__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_4__pages_cad_professor_cad_professor__["a" /* CadProfessorPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_coletor_coletor__["a" /* ColetorPage */],
                __WEBPACK_IMPORTED_MODULE_10__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_11__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_3__pages_leitor_leitor__["a" /* LeitorPage */],
                __WEBPACK_IMPORTED_MODULE_0__pages_edi_professor_edi_professor__["a" /* EdiProfessorPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_14__pages_perfil_perfil__["a" /* PerfilPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_5__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_7_ionic_angular__["d" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_10__app_component__["a" /* MyApp */], {}, {
                    links: [
                        { loadChildren: '../pages/cad-professor/cad-professor.module#CadProfessorPageModule', name: 'CadProfessorPage', segment: 'cad-professor', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/coletor/coletor.module#ColetorPageModule', name: 'ColetorPage', segment: 'coletor', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/edi-professor/edi-professor.module#EdiProfessorPageModule', name: 'EdiProfessorPage', segment: 'edi-professor', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/leitor/leitor.module#LeitorPageModule', name: 'LeitorPage', segment: 'leitor', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/login/login.module#LoginPageModule', name: 'LoginPage', segment: 'login', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/perfil/perfil.module#PerfilPageModule', name: 'PerfilPage', segment: 'perfil', priority: 'low', defaultHistory: [] }
                    ]
                }),
                __WEBPACK_IMPORTED_MODULE_16__ionic_storage__["a" /* IonicStorageModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_19_angularfire2__["a" /* AngularFireModule */].initializeApp(__WEBPACK_IMPORTED_MODULE_18__app_firebase_config__["a" /* FIREBASE_CONFIG */]),
                __WEBPACK_IMPORTED_MODULE_20_angularfire2_auth__["b" /* AngularFireAuthModule */],
                __WEBPACK_IMPORTED_MODULE_22_angularfire2_database__["b" /* AngularFireDatabaseModule */]
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_7_ionic_angular__["b" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_4__pages_cad_professor_cad_professor__["a" /* CadProfessorPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_coletor_coletor__["a" /* ColetorPage */],
                __WEBPACK_IMPORTED_MODULE_10__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_11__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_3__pages_leitor_leitor__["a" /* LeitorPage */],
                __WEBPACK_IMPORTED_MODULE_0__pages_edi_professor_edi_professor__["a" /* EdiProfessorPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_14__pages_perfil_perfil__["a" /* PerfilPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_9__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_8__ionic_native_splash_screen__["a" /* SplashScreen */],
                { provide: __WEBPACK_IMPORTED_MODULE_6__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_7_ionic_angular__["c" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_15__providers_auth__["a" /* AuthProvider */],
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["d" /* DatePipe */],
                __WEBPACK_IMPORTED_MODULE_21__providers_professor__["a" /* ProfessorProvider */],
                __WEBPACK_IMPORTED_MODULE_2__ionic_native_barcode_scanner__["a" /* BarcodeScanner */],
                __WEBPACK_IMPORTED_MODULE_23__providers_base__["a" /* BaseProvider */],
                __WEBPACK_IMPORTED_MODULE_24__providers_coletor__["a" /* ColetorProvider */],
                __WEBPACK_IMPORTED_MODULE_17__ionic_native_dialogs__["a" /* Dialogs */],
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 47:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProfessorProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base__ = __webpack_require__(170);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angularfire2_auth__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_database__ = __webpack_require__(96);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angularfire2__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_firebase_app__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_firebase_app___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_firebase_app__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_firebase_storage__ = __webpack_require__(223);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_firebase_storage___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_firebase_storage__);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var ProfessorProvider = (function (_super) {
    __extends(ProfessorProvider, _super);
    function ProfessorProvider(db, afAuth, firebaseApp) {
        var _this = _super.call(this) || this;
        _this.db = db;
        _this.afAuth = afAuth;
        _this.firebaseApp = firebaseApp;
        _this.PATH = 'professor/';
        return _this;
    }
    //BUSCA APENAS UM OBJETO
    ProfessorProvider.prototype.get = function () {
        //PEGA O UID DO USUARIO LOGADO
        var key = __WEBPACK_IMPORTED_MODULE_5_firebase_app__["auth"]().currentUser.uid;
        return this.db.object(this.PATH + key).snapshotChanges()
            .map(function (c) {
            return __assign({ key: c.key }, c.payload.val());
        });
    };
    //UPDATE DO USUARIO
    ProfessorProvider.prototype.update = function (user, uuid) {
        return this.db.list("/professor/")
            .update(uuid, { nomeProf: user.nomeProf, rgProf: user.rgProf, dataNascProf: user.dataNascProf, url: user.url })
            .catch();
    };
    //CRIA O USUARIO
    ProfessorProvider.prototype.create = function (user, uuid) {
        return this.db.object("/professor/" + uuid)
            .set(user)
            .catch();
    };
    //FAZ O UPLOAD DA FOTO
    ProfessorProvider.prototype.uploadPhoto = function (file, userId) {
        return __WEBPACK_IMPORTED_MODULE_5_firebase_app__["storage"]().ref().child("/fotoPerfilProfessor/" + (userId + '.jpg')).put(file);
    };
    ProfessorProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_angularfire2_database__["a" /* AngularFireDatabase */],
            __WEBPACK_IMPORTED_MODULE_1_angularfire2_auth__["a" /* AngularFireAuth */],
            __WEBPACK_IMPORTED_MODULE_4_angularfire2__["b" /* FirebaseApp */]])
    ], ProfessorProvider);
    return ProfessorProvider;
}(__WEBPACK_IMPORTED_MODULE_0__base__["a" /* BaseProvider */]));

//# sourceMappingURL=professor.js.map

/***/ }),

/***/ 496:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pages_login_login__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_status_bar__ = __webpack_require__(314);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_splash_screen__ = __webpack_require__(313);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_home_home__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_angularfire2_auth__ = __webpack_require__(70);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var MyApp = (function () {
    function MyApp(platform, statusBar, splashScreen, afAuth) {
        var _this = this;
        //FUNCAO PARA VERIFICAR SE JA ESTA LOGADO
        var authObserver = afAuth.authState.subscribe(function (user) {
            //SE EXISTIR UM USUARIO LOGADO ENTRA E CHAMA A PAGINA DE HOME
            if (user) {
                _this.rootPage = __WEBPACK_IMPORTED_MODULE_5__pages_home_home__["a" /* HomePage */];
                authObserver.unsubscribe();
            }
            else {
                //SE NAO CHAMA A PAGINA DE LOGIN
                _this.rootPage = __WEBPACK_IMPORTED_MODULE_0__pages_login_login__["a" /* LoginPage */];
                authObserver.unsubscribe();
            }
        });
        platform.ready().then(function () {
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["m" /* Component */])({template:/*ion-inline-start:"C:\Users\Julio\Desktop\teste2\palmphone_V3\src\app\app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n\n'/*ion-inline-end:"C:\Users\Julio\Desktop\teste2\palmphone_V3\src\app\app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["i" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_6_angularfire2_auth__["a" /* AngularFireAuth */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 497:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FIREBASE_CONFIG; });
var FIREBASE_CONFIG = {
    apiKey: "AIzaSyBSWkJ8NXtScoU6aQwQiVCSAvbl06GgRfU",
    authDomain: "palmphone-ad0fb.firebaseapp.com",
    databaseURL: "https://palmphone-ad0fb.firebaseio.com",
    projectId: "palmphone-ad0fb",
    storageBucket: "palmphone-ad0fb.appspot.com",
    messagingSenderId: "585043096980"
};
//# sourceMappingURL=app.firebase.config.js.map

/***/ }),

/***/ 55:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__providers_professor__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_coletor__ = __webpack_require__(229);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__login_login__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__coletor_coletor__ = __webpack_require__(155);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__perfil_perfil__ = __webpack_require__(157);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ionic_angular__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_auth__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_storage__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_firebase_app__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_firebase_app___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_firebase_app__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var HomePage = (function () {
    function HomePage(navCtrl, afAuth, storage, coletor, alertCtrl, toastCtrl, navParams, provider, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.afAuth = afAuth;
        this.storage = storage;
        this.coletor = coletor;
        this.alertCtrl = alertCtrl;
        this.toastCtrl = toastCtrl;
        this.navParams = navParams;
        this.provider = provider;
        this.loadingCtrl = loadingCtrl;
        this.currentUser = null;
    }
    HomePage.prototype.ionViewCanEnter = function () {
        var _this = this;
        //BUSCA O OBJETO DO USUARIO QUE ESTA LOGADO 
        var subscribe = this.provider.get().subscribe(function (c) {
            subscribe.unsubscribe();
            //PEGA O UID DO USUARIO QUE ESTA LOGADO
            var key = __WEBPACK_IMPORTED_MODULE_9_firebase_app__["auth"]().currentUser.uid;
            //SALVA NO STORAGE O UID DO USUARIO COMO CHAVE E UM OBJETO USER COM OS DADOS VINDO DO FIREBASE
            _this.storage.set(key, c);
            //E CARREGA O OBJETO COM OS DADOS
            _this.currentUser = c;
        });
    };
    HomePage.prototype.abrirTelaPerfil = function () {
        //CHAMA A TELA DE PERFIL DO USUARIO E PASSA COMO PARAMETRO O OBJETO 
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__perfil_perfil__["a" /* PerfilPage */], { dados: this.currentUser });
    };
    //CHAMA A TELA DE COLETA
    HomePage.prototype.abrirTelaColeta = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__coletor_coletor__["a" /* ColetorPage */], { dados: this.currentUser });
    };
    //FUNCAO PARA DESLOGAR
    HomePage.prototype.singnOut = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Sair',
            message: 'Deseja sair do aplicativo?',
            buttons: [
                {
                    text: 'Confirmar',
                    handler: function () {
                        //CHAMA FUNCAO PARA DELETAR DADOS DO USUARIO GRAVADOS NO STORAGE
                        _this.deletarDadosUsuarioLogado();
                        //CHAMA FUNCAO QUE DESLOGA O USUARIO
                        _this.afAuth.logoutUser()
                            .then(function () {
                            //RETORNA PARA A PAGINA DE LOGIN E APAGA OS DADOS SALVOS
                            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__login_login__["a" /* LoginPage */]);
                        })
                            .catch(function (error) {
                            console.error(error);
                        });
                    }
                }
            ]
        });
        //CHAMA O ALERTA PARA SER EXIBIDO
        alert.present();
    };
    //FUNCAO PARA SINCRONIZAR OS DADOS DAS CHAMADAS SALVOS NO STORAGE COM O FIREBASE
    HomePage.prototype.sincronizar = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Confirmação',
            message: 'Deseja sincronizar os dados com o servidor?',
            buttons: [
                {
                    text: 'Confirmar',
                    handler: function () {
                        //PEGA O UID DO USUARIO QUE ESTA LOGADO
                        var uid = __WEBPACK_IMPORTED_MODULE_9_firebase_app__["auth"]().currentUser.uid;
                        //FOREACH PARA CORRER O STORAGE
                        _this.storage.forEach(function (value, key) {
                            //VERIFICA OS DADOS DAS CHAMAS QUE FOREM DIFERENTE DO UID DO USUARIO
                            if (key != uid) {
                                //CHAMA FUNCAO PARA SALVAR NO FIREBASE
                                _this.coletor.saveChamadas(value, key);
                                //CHAMA FUNCAO PARA APAGAR DADOS DO STORAGE
                                _this.deletarStorage(uid);
                            }
                        });
                        //CHAMA O TOAST
                        _this.toastMenssager('Sincronização Realizada com sucesso!');
                    }
                }
            ]
        });
        //CHAMA O ALERTA PARA SER EXIBIDO
        alert.present();
    };
    //FUNCAO PARA DELETAR AS CHAMADAS DO STORAGE
    HomePage.prototype.deletarStorage = function (uid) {
        var _this = this;
        this.storage.forEach(function (value, key) {
            //VERIFICA PARA APAGAR SOMENTE OS DADOS DAS CHAMADAS
            if (key != uid) {
                //REMOVE A CHAMADA
                _this.storage.remove(key);
            }
        });
    };
    //FUNCAO PARA DELETAR OS DADOS DO USUARIO SALVO NO STORAGE
    HomePage.prototype.deletarDadosUsuarioLogado = function () {
        //PEGA O UID DO USUARIO QUE ESTA LOGADO
        var uid = __WEBPACK_IMPORTED_MODULE_9_firebase_app__["auth"]().currentUser.uid;
        //REMOVE O DADOS DO USUARIO 
        this.storage.remove(uid);
    };
    //FUNCAO PARA DELETAR AS CHAMADAS DO STORAGE
    HomePage.prototype.verificarStorage = function () {
        var _this = this;
        this.storage.length().then(function (val) {
            if (val == 1) {
                _this.toastMenssager('Sem dados para sincronizar');
            }
            else {
                _this.sincronizar();
            }
        });
    };
    //PARA CRIAR UM TOAST
    HomePage.prototype.toastMenssager = function (mensagen) {
        //CRIA UM TOAST DE CONFIRMAÇÂO DE SINCRONIZACAO
        var toast = this.toastCtrl.create({
            duration: 3000,
            position: 'bottom',
            message: mensagen
        });
        toast.present();
    };
    //FUNÇÃO RESPONSAVEL PELA CRIAÇÂO DO SHOWLOADING
    HomePage.prototype.showLoading = function () {
        var loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        return loading;
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_5__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"C:\Users\Julio\Desktop\teste2\palmphone_V3\src\pages\home\home.html"*/'<script src="https://www.gstatic.com/firebasejs/4.10.0/firebase.js"></script>\n\n<ion-content padding>\n\n  <ion-card class="btnPrincipais">\n\n    <button id="perfil" ion-button full (click)="abrirTelaPerfil()">\n\n      Perfil\n\n    </button>\n\n\n\n    <button id="coleta" ion-button  full (click)="abrirTelaColeta()">\n\n      Iniciar coleta\n\n    </button>\n\n\n\n    <button id="sincronizar" ion-button full button-md color="secondary" (click)="verificarStorage()">\n\n      Sincronizar\n\n    </button>\n\n  </ion-card>\n\n\n\n  <ion-card> \n\n    <button id="sair" ion-button full button-md color="danger" (click)="singnOut()">\n\n      Sair\n\n    </button>\n\n  </ion-card>\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\Julio\Desktop\teste2\palmphone_V3\src\pages\home\home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_6_ionic_angular__["g" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_7__providers_auth__["a" /* AuthProvider */],
            __WEBPACK_IMPORTED_MODULE_8__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_1__providers_coletor__["a" /* ColetorProvider */],
            __WEBPACK_IMPORTED_MODULE_6_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_6_ionic_angular__["j" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_6_ionic_angular__["h" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_0__providers_professor__["a" /* ProfessorProvider */],
            __WEBPACK_IMPORTED_MODULE_6_ionic_angular__["f" /* LoadingController */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 62:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angularfire2_auth__ = __webpack_require__(70);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AuthProvider = (function () {
    function AuthProvider(afAuth) {
        this.afAuth = afAuth;
    }
    AuthProvider.prototype.signIn = function (user) {
        return this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
    };
    AuthProvider.prototype.createUser = function (user) {
        return this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password);
    };
    AuthProvider.prototype.logoutUser = function () {
        return this.afAuth.auth.signOut();
    };
    AuthProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_angularfire2_auth__["a" /* AngularFireAuth */]])
    ], AuthProvider);
    return AuthProvider;
}());

//# sourceMappingURL=auth.js.map

/***/ }),

/***/ 91:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__cad_professor_cad_professor__ = __webpack_require__(154);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_professor__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__home_home__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_auth__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_forms__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_storage__ = __webpack_require__(51);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var LoginPage = (function () {
    function LoginPage(navCtrl, alertCtrl, navParams, formBuilder, toastCtrl, afAuth, loadingCtrl, provider, storage) {
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.navParams = navParams;
        this.formBuilder = formBuilder;
        this.toastCtrl = toastCtrl;
        this.afAuth = afAuth;
        this.loadingCtrl = loadingCtrl;
        this.provider = provider;
        this.storage = storage;
        //TRABAMENTO DOS CARACTERES DIGITADOS DURANTE O LOGIN
        var emailRegex = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
        //PREENCHE O OBJETO DO FORM COM OS DADOS VINDO DA TELA DE LOGIN
        this.signinForm = this.formBuilder.group({
            email: ['', __WEBPACK_IMPORTED_MODULE_6__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_6__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_6__angular_forms__["f" /* Validators */].pattern(emailRegex)])],
            password: ['', [__WEBPACK_IMPORTED_MODULE_6__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_6__angular_forms__["f" /* Validators */].minLength(6)]],
        });
    }
    //FUNÇÃO DE LOGIN
    LoginPage.prototype.signIn = function () {
        var _this = this;
        //CHAMA UM SHOEDIALOG PARA MOSTRAR O CARREGAMENTO DO APP
        var loading = this.showLoading();
        //SE OS DADOS DO FORMULARIO FOREM VALIDOS ELE AUTENTICA 
        this.afAuth.signIn(this.signinForm.value)
            .then(function () {
            //CHAMA A TELA DE HOME DO APP
            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__home_home__["a" /* HomePage */]);
            //FECHA O LOADING
            loading.dismiss();
        })
            .catch(function (error) {
            var toast = _this.toastCtrl.create({ duration: 3000, position: 'bottom' });
            if (error.code == 'auth/invalid-email') {
                toast.setMessage('O e-mail digitado não é valido.');
            }
            else if (error.code == 'auth/user-disabled') {
                toast.setMessage('O usuário está desativado.');
            }
            else if (error.code == 'auth/user-not-found') {
                toast.setMessage('O usuário não foi encontrado.');
            }
            else if (error.code == 'auth/wrong-password') {
                toast.setMessage('A senha digitada não é valida.');
            }
            toast.present();
            //TIRA O SHOWLOADING 
            loading.dismiss();
        });
    };
    //FUNÇÃO RESPONSAVEL PELA CRIAÇÂO DO SHOWLOADING
    LoginPage.prototype.showLoading = function () {
        var loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        return loading;
    };
    LoginPage.prototype.cadastrar = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_0__cad_professor_cad_professor__["a" /* CadProfessorPage */]);
    };
    LoginPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_3__angular_core__["m" /* Component */])({
            selector: 'page-login',template:/*ion-inline-start:"C:\Users\Julio\Desktop\teste2\palmphone_V3\src\pages\login\login.html"*/'<script src="https://www.gstatic.com/firebasejs/4.12.1/firebase.js"></script>\n\n<ion-header>\n\n  <ion-toolbar>\n\n    <ion-title>Login</ion-title>\n\n  </ion-toolbar>\n\n</ion-header>\n\n\n\n<ion-content padding>\n\n  <form [formGroup]="signinForm" (ngSubmit)="signIn(); $event.preventDefault()">\n\n\n\n    <ion-item>\n\n      <ion-icon name="mail" item-start color="primary"></ion-icon>\n\n      <input id="email" type="email" placeholder="Email" formControlName="email"/>\n\n    </ion-item>\n\n\n\n    <ion-item>\n\n      <ion-icon name="lock" item-start color="primary"></ion-icon>\n\n      <input id="password" type="password" placeholder="Senha" formControlName="password"/>\n\n    </ion-item>\n\n\n\n    <br>\n\n    <button id="entrar" ion-button full type="submit" [disabled]="signinForm.invalid">ENTRAR</button>\n\n\n\n  </form>\n\n\n\n  <button id="cadastrar" ion-button full button-md (click)="cadastrar()">CADASTRAR NOVO USUÁRIO</button>\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\Julio\Desktop\teste2\palmphone_V3\src\pages\login\login.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4_ionic_angular__["g" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["h" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_6__angular_forms__["a" /* FormBuilder */],
            __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["j" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_5__providers_auth__["a" /* AuthProvider */],
            __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["f" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1__providers_professor__["a" /* ProfessorProvider */],
            __WEBPACK_IMPORTED_MODULE_7__ionic_storage__["b" /* Storage */]])
    ], LoginPage);
    return LoginPage;
}());

//# sourceMappingURL=login.js.map

/***/ })

},[315]);
//# sourceMappingURL=main.js.map