var Observable = require("data/observable").Observable;
var frameModdule = require("ui/frame");

function createViewModel(usuario, contra) {
    var viewModel = new Observable();

    viewModel.volver = function(){
        var topmost = frameModdule.topmost();
        topmost.goBack();

    }

    return viewModel;
}

exports.createViewModel = createViewModel;