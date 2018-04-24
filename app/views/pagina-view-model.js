var Observable = require("data/observable").Observable;
var frameModdule = require("ui/frame");

function createViewModel(usuario, contra) {
    var viewModel = new Observable();
    var date = new Date();

    viewModel.set("usuario","Usuario: " + usuario);
    viewModel.set("contra","Contraseña: " + contra);
    viewModel.set("hora","Hora: "  + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds());
    console.log(date.getDate() + "/" + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds());
    viewModel.set("fecha","Fecha: " + date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear());
    console.log(date.getDate() + "/" + (date.getMonth()+ 1) + "/" + date.getFullYear() + " " + date.getHours());
    
    viewModel.volver = function(){
        var topmost = frameModdule.topmost();
        topmost.goBack();

    }
    viewModel.actualizar = function(){
        var topmost = frameModdule.topmost();
            const navigationEntry = {
                moduleName: "views/pagina",
                context: {usuario, contra},
                animated: false,

                clearHistory:false
            };

            topmost.navigate(navigationEntry);
    }

    return viewModel;
}

exports.createViewModel = createViewModel;