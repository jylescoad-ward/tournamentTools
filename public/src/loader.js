var settings,st = {
    'containerDiv': "#loading",
    'contextElement': "span.context",
    'imageElement': "#loading-image"
};
module.exports.hide = function(){
    setTimeout(()=>{
        $(st.containerDiv).fadeOut("fast");
    },500)
}
module.exports.show = function(){
    $(st.containerDiv).fadeIn("fast");
}
module.exports.context = function(dt){
    $(st.containerDiv).children(st.contextElement).html(dt);
}
