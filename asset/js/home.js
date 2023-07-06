let data

let menuFlag = false
let bannerAppear = 0
function cutString (s,n) {
    return s.slice(0,n) + "..."
}


$(document).ready(async()=>{    
    data = await fetch("/tiemsach/data.json").then(res => res.json()).catch(err => console.log("Lỗi\n"+err))
    let t=""
    for (let i=0;i<5;i++) {
        t+=`<div class="stack-item">
        <a href="/tiemsach/chitiet.html?type=novel&id=${i}">
        <div class="stack-img">
            <img src="${data["lightNovel"][i]["anhBiaSach"]}" alt="" srcset="">
        </div>
        <div class="stack-info" title="${data["lightNovel"][i]["ten"]}">
            <h3>${cutString(data["lightNovel"][i]["ten"],50)}</h3>
            <p class="artist">${data["lightNovel"][i]["tacGia"]}</p>
            <p class="stack-info-price">${data["lightNovel"][i]["gia"]} đ</p>
            <p class="rate-and-bought">(${data["lightNovel"][i]["moreInfo"]["danhGia"]}) Đã bán 12</p>
        </div>
        </a>
    </div>
        `
    }
    $(".stack-box").eq(0).html(t)

    t=""
    for (let i=0;i<5;i++) {
        t+=`
        <div class="stack-item">
        <a href="/tiemsach/chitiet.html?type=manga&id=${i}">
        <div class="stack-img">
            <img src="${data["manga"][i]["anhBiaSach"]}" alt="" srcset="">
        </div>
        <div class="stack-info" title="${data["manga"][i]["ten"]}">
            <h3>${cutString(data["manga"][i]["ten"],50)}</h3>
            <p class="artist">${data["manga"][i]["tacGia"]}</p>
            <p class="stack-info-price">${data["manga"][i]["gia"]} đ</p>
            <p class="rate-and-bought">(${data["manga"][i]["moreInfo"]["danhGia"]}) Đã bán 12</p>
        </div>
        </a>

    </div>
        `
    }
    $(".stack-box").eq(1).html(t)
    //init banner
    t=""
    let tt=""
    for (let i=0;i<data["banner"].length;i++) {
        t+=`<div class="banner">
        <img src="${data["banner"][i]["img"]}" alt="">
        <p>${data["banner"][i]["text"]}</p>
    </div>`
    tt+=`<div class="dot"></div>`
    }
    $(".img-banner-box").html(t)
    $(".list").html(tt)
    bannerAppear = data["banner"].length-1
    $(".dot").eq(data["banner"].length - 1- bannerAppear).addClass("dot-active");
    setInterval(()=>{   
        $(".dot").eq(data["banner"].length -1- bannerAppear).removeClass("dot-active");   
        $(".dot").eq(data["banner"].length - bannerAppear).addClass("dot-active");
        $(".banner").eq(bannerAppear).css({
            translate:"-120% 0",
        })
        bannerAppear--
        if (bannerAppear<0) {
            bannerAppear = data["banner"].length - 1
            $(".banner").css({
                translate:"0 0",
            })
            $(".dot").eq(data["banner"].length - 1- bannerAppear).addClass("dot-active");
        }
    },5000)




 $(window).resize(function (e) { 
       if ($(window).width()>1080) {
        $("nav").css({
            translate: "unset"
        })
       }else{
            $("nav").css({
                translate: "-100vw 0"
            })
            menuFlag=false
       }
    })
    $("#menuRe").click(()=>{
        if (menuFlag) {
            $("nav").css({
                translate: "-100vw 0"
            })
            
        }else{
            $("nav").css({
                translate: "unset"
            })
        }
        menuFlag=!menuFlag
    })
   
});