const resName = ""
// ================/bansach==================

let data

let menuFlag = false
let bannerAppear = 0
function cutString (s,n) {
    return s.slice(0,n) + "..."
}

function getRanContent(data) {
    const list = new Set
    let tempData={}
    while (list.size<5) {
        switch (Math.floor(Math.random()*2)) {
            case 0:{
                let n = Math.floor(Math.random()*data["lightNovel"].length)
                tempData=data["lightNovel"][n]
                tempData.type="novel"
                tempData.id=n
                break
            }
            case 1:{
                let n = Math.floor(Math.random()*data["manga"].length)
                tempData=data["manga"][n]
                tempData.type="manga"
                tempData.id=n
                break
            }
        }
        list.add(tempData)
    }
    return Array.from(list)

}


$(document).ready(async()=>{    
    $("#search-btn").click(async()=>{
        if ($("#search-input").val().trim())
        window.location.href=`${resName}/timkiem.html?v=`+$("#search-input").val().trim()
    })

    $("#search-input").keypress(async(e)=>{
        if (e.key=='Enter' && $("#search-input").val().trim())
            window.location.href=`${resName}/timkiem.html?v=`+$("#search-input").val().trim()
    })

    data = await fetch(`${resName}/data.json`).then(res => res.json()).catch(err => console.log("Lỗi\n"+err))
    let t=""
    let tempData=getRanContent(data)
    for (let i=0;i<5;i++) {
        t+=`<div class="stack-item">
        <a href="${resName}/chitiet.html?type=${tempData[i]["type"]}&id=${tempData[i]["id"]}">
        <div class="stack-img">
            <img src="${tempData[i]["anhBiaSach"]}" alt="" srcset="">
        </div>
        <div class="stack-info" title="${tempData[i]["ten"]}">
            <h3>${cutString(tempData[i]["ten"],50)}</h3>
            <p class="artist">${tempData[i]["tacGia"]}</p>
            <p class="stack-info-price">${tempData[i]["gia"]} đ</p>
            <p class="rate-and-bought">(${tempData[i]["moreInfo"]["danhGia"]}) Đã bán 12</p>
        </div>
        </a>
    </div>
        `
    }
    $(".stack-box").eq(0).html(t)

    t=""
    for (let i=0;i<5;i++) {
        t+=`<div class="stack-item">
        <a href="${resName}/chitiet.html?type=novel&id=${i}">
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
    $(".stack-box").eq(1).html(t)

    t=""
    for (let i=0;i<5;i++) {
        t+=`
        <div class="stack-item">
        <a href="${resName}/chitiet.html?type=manga&id=${i}">
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
    $(".stack-box").eq(2).html(t)
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