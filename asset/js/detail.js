async function initDetail(t,id,data) {    
    await fetch("/tiemsach/asset/htm/detail.htm")
    .then(async res => {
        let replaceHTML =(await res.text()).replace(/\${(.*?)}/g,(match,key)=>{
            
            return eval(`data["${t}"][${id}]` + key) || ''
        })
        $(".mid").html(replaceHTML + $(".mid").html())
    })
    .catch(err => console.log(err))
}

$(document).ready(async()=>{
    let data = await fetch("/tiemsach/data.json").then(res => res.json()).catch(err => console.log("Lỗi\n"+err))

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