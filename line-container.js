/* 入力フォームのサイズを整える */
function resize(msg){

    /* 表示行数上限を設定 */
    var max_rows = 6;

    var form = document.getElementById("form");
    var y = window.pageYOffset;

    /* フォームの高さを修正して取得 */
    msg.style.height = "auto"
    var h = msg.scrollHeight

    /* 1行の高さを取得 */
    if(!("init" in resize))
        resize.init = msg.clientHeight
    if(!("old" in resize))
        resize.old = resize.init
    if(!("margin" in resize))
        resize.margin = form.clientHeight - resize.init
    if(!("border" in resize))
        resize.border = window.getComputedStyle(msg).getPropertyValue("border-width")

    /* 表示行数上限設定 */
    if( h/resize.init > max_rows )
        h = max_rows * resize.init

    /* 高さを調節する */
    msg.style.height = h + parseInt(resize.border) + "px";
    form.style.height = h + resize.margin + "px";

    /* 行が増減した場合スクロール */
    if( h != resize.old ){
        window.scrollTo(0,y-resize.old+h);
        resize.old = h
    }

}

/* 送信フォームを表示 */
function openMsg(msg){
    resize(msg)
    document.getElementById("icon1").style.visibility = "hidden"
    document.getElementById("icon2").style.visibility = "hidden"
    document.getElementById("icon3").style.visibility = "visible"
    msg.style.width = "calc(100% - 38px - 38px - 40px)"
}

/* 送信フォームを非表示 */
function closeMsg(){

    var msg = document.getElementById("send-msg")
    document.getElementById("icon2").style.transitionDelay = "50ms"
    document.getElementById("icon1").style.visibility = "visible"
    document.getElementById("icon2").style.visibility = "visible"
    document.getElementById("icon3").style.visibility = "hidden"
    msg.style.width = "calc(100% - 38px - 38px - 38px - 50px)"
    
    var form = document.getElementById("form")
    msg.style.height = resize.init + parseInt(resize.border) + "px";
    document.getElementById("form").style.height = resize.init + resize.margin + "px";
    msg.scrollTop = 0
    document.getElementById("icon2").style.transitionDelay = "0s"
}

/* 空白の場合送信フォームを閉じる */
function checkEmpty(msg){
    if( msg.value == "" )
        closeMsg()
}

/* ページ読み込み時に最下部に移動 */
window.onload = function(){
    window.scrollTo(0,document.body.scrollHeight)
}