
function initDOMDetai() {
    $("#qty-add").click((e) => { 
        if (parseInt($("#qty-value").val())<99) {
            $("#qty-value").val(parseInt($("#qty-value").val())+1)
        }      
    });
    $("#qty-sub").click((e) => { 
        if (parseInt($("#qty-value").val())>1) {
            $("#qty-value").val(parseInt($("#qty-value").val())-1)
        }      
    });
    $("#qty-value").change(()=>{
        if ($("#qty-value").val() == "") {
            $("#qty-value").val(1)
        }
        if (parseInt($("#qty-value").val())<1) {
            $("#qty-value").val(1)
        }else if (parseInt($("#qty-value").val())>99) {
            $("#qty-value").val(99)
        }
    })
}

async function initDetail(t,id,data) { 
    const dataQuery = data[t][id]
    let temp = ""
    for (let i=0;i<dataQuery["moreInfo"]["theLoai"].length;i++) {
            if (i==dataQuery["moreInfo"]["theLoai"].length -1 ) 
            {
                temp+=`<span><a href="${resName}/timkiem.html?v=${dataQuery["moreInfo"]["theLoai"][i]}">${dataQuery["moreInfo"]["theLoai"][i]}. </a></span>`
            }else{
                temp+=`<span><a href="${resName}/timkiem.html?=${dataQuery["moreInfo"]["theLoai"][i]}">${dataQuery["moreInfo"]["theLoai"][i]}. </a></span>`
            }
    }
    dataQuery.theLoai2 = temp
    await fetch(`${resName}/asset/htm/detail.htm`)
    .then(async res => {
        let replaceHTML =(await res.text()).replace(/\${(.*?)}/g,(match,key)=>{            
            return eval('dataQuery' + key) || ''
        })
        $(".mid").html(replaceHTML + $(".mid").html())
    })
    .catch(err => console.log(err))

    document.title = dataQuery["ten"]

    initDOMDetai()
}

$(document).ready(async()=>{
    let data = await fetch(`${resName}/data.json`).then(res => res.json()).catch(err => console.log("Lỗi\n"+err))

    const urlQuery = new URLSearchParams(window.location.search)

    if (!urlQuery.get("type") || !urlQuery.get("id")) {
        $(".mid").html( `<h1>Không tìm thấy trang!</h1>`+ $(".mid").html())
    }else{
        switch (urlQuery.get("type")) {
            case "novel":{
                if (data["lightNovel"].length>parseInt(urlQuery.get("id")) && parseInt(urlQuery.get("id")) >=0) {
                    await initDetail("lightNovel",parseInt(urlQuery.get("id")),data)
                }else{
                    $(".mid").html( `<h1>Không tìm thấy trang!</h1>`+ $(".mid").html())
                }
                break
            }
            case "manga":{
                if (data["manga"].length>parseInt(urlQuery.get("id")) && parseInt(urlQuery.get("id")) >=0) {
                    await initDetail("manga",parseInt(urlQuery.get("id")),data)
                }else{
                    $(".mid").html( `<h1>Không tìm thấy trang!</h1>`+ $(".mid").html())
                }
                break
            }
            default:{
                $(".mid").html( `<h1>Không tìm thấy trang!</h1>`+ $(".mid").html())
            }
        }
    }
})