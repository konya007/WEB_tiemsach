`<h2>Kết quả tìm kiếm</h2><div class="stack-box"></div>`

function findInJSON(str, json) {
    for (const key in json) {
      if (typeof json[key] === 'object') {
        if (findInJSON(str, json[key])) {
          return true;
        }
        
      } else if (typeof json[key] === 'string' && json[key].toUpperCase().includes(str.toUpperCase()) && !["nhaXuatBan","anhBiaSach","thongTin"].includes(key)) {
        return true;
      }
    }    
    return false;
}

$(document).ready(async()=>{
    let data = await fetch(`${resName}/data.json`).then(res => res.json()).catch(err => console.log("Lỗi\n"+err))
    const urlQuery = new URLSearchParams(window.location.search)

    let temp = ""
        let d=0
    if (!urlQuery.get("v")) {
        $(".mid").html( `<h1>Lỗi đường dẫn</h1>`+ $(".mid").html())
    }else{
        if (urlQuery.get("t")==null || urlQuery.get("t")=='novel'){
            for (let i=0;i<data["lightNovel"].length;i++) {
                if (findInJSON(urlQuery.get("v").trim(), data["lightNovel"][i])) {
                    d++
                    temp+=`<div class="stack-item">
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
            }
        }

        if (urlQuery.get("t")==null || urlQuery.get("t")=='manga') {
            for (let i=0;i<data["manga"].length;i++) {
                if (findInJSON(urlQuery.get("v").trim(), data["manga"][i])) {
                    d++
                    temp+=`<div class="stack-item">
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
            }
        }
        
    }
    if (d>0) {
        $(".mid").html( `<h2>Kết quả tìm kiếm cho: ${urlQuery.get("v").trim()}</h2><div class="stack-box-find">${temp}</div>`+$(".mid").html())
    }else{
        $(".mid").html( `<h2>Không có kết quả cho: ${urlQuery.get("v").trim()}`+$(".mid").html())
    }
})

