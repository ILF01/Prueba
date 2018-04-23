var Observable = require("data/observable").Observable;
var ObservableArray = require("data/observable-array").ObservableArray;
var frameModdule = require("ui/frame");
var dialogs = require("ui/dialogs");

function getMessage(usuario, contra) {
    //Valida el usuario
    var listadoArray = listaArray(usuario);
    if (!listadoArray) {
        dialogs.alert({
            title: "¡ERROR!",
            message: "El usuario introducido es erroneo.",
            okButtonText: "Atras."
        }).then(function () {
            console.log("Dialogo Cerrado.");
        });
        return "Error!";}
    //Valida la contraseña
    else if ( contra != 12345) {
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

    return viewModel;
}
function listaArray(usuario){
    var array = new ObservableArray (["admin", "usuario", "irene"]);
    var i = 0;
    var validacion = false;
    var vali = false;
    console.log(usuario);
    for( var i=0; i<= array.length; i++){
        if(usuario === array.getItem(i)){
            validacion = true;
            vali = true;;
        }else{
            validacion = false;
        }
    }
    return vali;
}


exports.createViewModel = createViewModel;
