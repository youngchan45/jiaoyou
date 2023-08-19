
setTimeout(() => {
    setRem();
}, 1)
function setRem() {
    //初始化
    (function flexible(window, document) {
        function setRemUnit() {
            var initFontSize = 37.5;
            var iPhone6Width = 375;
            var clienWidth = window.document.documentElement.clientWidth || iPhone6Width;
            clienWidth=clienWidth>1024?1024:clienWidth;
            var nweFontSize = initFontSize * (clienWidth / iPhone6Width);
            document.documentElement.style.fontSize = nweFontSize+"px";
            // console.log(nweFontSize)
        }

        setRemUnit()

        // reset rem unit on page resize
        window.addEventListener('resize', setRemUnit)

    })(window, document)
}


