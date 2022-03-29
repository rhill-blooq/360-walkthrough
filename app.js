// Copyright (c) 2022 8th Wall, Inc.
//
// app.js is the main entry point for your 8th Wall app. Code here will execute after head.html
// is loaded, and before body.html is loaded.

AFRAME.registerComponent('auto-play-video', {
    schema: {
        video: {type: 'string'},
    },
    init() {
        const video = document.querySelector(this.data.video)
        video.play()
    },
})

AFRAME.registerComponent('hotspots',{
    init:function(){
        this.el.addEventListener('reloadspots',function(evt){

            //get the entire current spot group and scale it to 0
            var currspotgroup=document.getElementById(evt.detail.currspots);
            currspotgroup.setAttribute("scale","0 0 0");

            //get the entire new spot group and scale it to 1
            var newspotgroup=document.getElementById(evt.detail.newspots);
            newspotgroup.setAttribute("scale","1 1 1");
        });
    }
});

AFRAME.registerComponent('spot',{
    schema:{
        linkto:{type:"string",default:""},
        spotgroup:{type:"string",default:""}
    },
    init:function(){

        //add image source of hotspot icon
        this.el.setAttribute("src","#hotspot");
        //make the icon look at the camera all the time
        this.el.setAttribute("look-at","#cam");

        var data=this.data;

        this.el.addEventListener('click',function(){
            //set the skyimage source to the new image as per the spot
            var sky=document.getElementById("skybox");
            sky.setAttribute("src",data.linkto);

            var spotcomp=document.getElementById("spots");
            var currspots=this.parentElement.getAttribute("id");
            //create event for spots component to change the spots data
            spotcomp.emit('reloadspots',{newspots:data.spotgroup,currspots:currspots});
        });
    }
});