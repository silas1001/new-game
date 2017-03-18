/**
 * Created by Tarnos on 2017-01-06.
 */

lotfw.service("logService", function(){
    this.logs = [];
    this.log = function(message) {
        this.logs.unshift(message);
        if(this.logs.length > 30){//can add a variable to set up how long the log is.
            this.logs.length = 30;
        }
    }
});