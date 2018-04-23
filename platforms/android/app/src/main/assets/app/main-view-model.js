var Observable = require("data/observable").Observable;
var ObservableArray = require("data/observable-array").ObservableArray;
var frameModdule = require("ui/frame");
var dialogs = require("ui/dialogs");
var arrayUsuario = new ObservableArray (["admin", "usuario", "irene"]);
var arrayContra = new ObservableArray (["12345", "123456", "1234567"]);

function getMessage(usuario, contra) {
    //Valida el usuario
    var arrayVali = listaArray(usuario, contra);
    if (!arrayVali.getItem(0)) {
        dialogs.alert({
            title: "¡ERROR!",
            message: "El usuario introducido es erroneo.",
            okButtonText: "Atras."
        }).then(function () {
            console.log("Dialogo Cerrado.");
        });
        return "Error!";}
    //Valida la contraseña
    else if (!arrayVali.getItem(1)) {
        dialogs.alert({
            title: "¡ERROR!",
            message: "La contraseña introducida es erronea.",
            okButtonText: "Atras."
        }).then(function () {
            console.log("Dialogo Cerrado.");
        });
        return "Error!";
    //Si es correcto pasa a la siguiente pantalla
    } else {
        var topmost = frameModdule.topmost();
        const navigationEntry = {
            moduleName: "views/pagina",
            context: {usuario, contra},
            animated: false,

            clearHistory:false
        };

        topmost.navigate(navigationEntry);
    }
}


function createViewModel(page) {
    var viewModel = new Observable();
    //Esta funcion acciona el boton aceptar y hace que pasen los datos
    viewModel.onTap = function() {

        var contra = page.getViewById("contra").text;
        var usuario = page.getViewById("usuario").text;

        this.set("message", getMessage(usuario,contra));
    }
    //Esta funcion hace que el boton vacie los campos de texto
    viewModel.limpia = function(){
        this.set("message");
        this.set("usuario");
        this.set("contra");
    }
    //Esta funcion rellena los campos vacios
    viewModel.auto = function(){
        this.set("usuario", "admin");
        this.set("contra", "12345");
    }
    viewModel.registrar = function(){
    
        var contra = page.getViewById("contra").text;
        var usuario = page.getViewById("usuario").text;

        if(usuario !== "" && contra !== ""){
            arrayUsuario.push(usuario);
            arrayContra.push(contra);
        }
        
    }
    return viewModel;
}
function listaArray(usuario,contra){
    
    var i = 0;
    var validacion = false;
    var valiUsuario = false;
    var valiContra = false;
    console.log(usuario);
    console.log(contra);
    for( var i=0; i<= arrayUsuario.length; i++){
        var usuarray = arrayUsuario.getItem(i);
        var passarray = arrayContra.getItem(i);
        if(usuario === usuarray ){
            validacion = true;
            if(validacion){
                valiUsuario = true;
                if(contra == passarray){
                    valiContra = true;
                }
            }
        }else{
            validacion = false;
        }
        var arrayVali = new ObservableArray([valiUsuario, valiContra]);
    }
    return arrayVali;
}

exports.createViewModel = createViewModel;
