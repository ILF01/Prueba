var Observable = require("data/observable").Observable;
var frameModdule = require("ui/frame");

function createViewModel(usuario, contra) {
    var viewModel = new Observable();
    var date = new Date();

    viewModel.set("usuario","Usuario: " + usuario);
    viewModel.set("contra","Contraseña: " + contra);
   viewModel.set("fecha","Fecha: " + date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds());
    console.log(date.getDate() + "/" + (date.getMonth()+ 1) + "/" + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds());
    viewModel.volver = function(){
        var topmost = frameModdule.topmost();
        topmost.goBack();

    }

    return viewModel;
}

exports.createViewModel = createViewModel;