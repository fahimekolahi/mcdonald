let menuWrapper = document.getElementById("menuWrapper")
let shopList = document.getElementById("shopList")
let cardTotal = document.getElementById("cardTotal")
let majmou = document.getElementById("majmou")
let ma = document.getElementById("ma")
let mtakhfif = document.getElementById("mtakhfif")
let pardakht = document.getElementById("pardakht")


let buyList = [
    {
        foodId: 1,
        count: 3,
    }
]




let foodList = [

    {
        name: "همبرگر معمولی",
        id: 1,
        cost: 10000,
        image: "./عطیو 3 copy.jpg",
        count: 0,

    },

    {
        name: "همبرگر مخصوص",
        id: 2,
        cost: 12000,
        image: "./عطیو 2 copy - copy.jpg",
        count: 0,

    },


    {
        name: "همبرگرمعمولی با قارچ",
        id: 3,
        cost: 14000,
        image: "./عطیو 2 copy - copyll.jpg",
        count: 0,

    },



    {
        name:
            " همبرگرمخصوص با قارچ",
        id: 4,
        cost: 16000,
        image: "./عطیو 1 copy.jpg",
        count: 0,

    },


    {
        name: " سیب زمینی سرخ کرده",
        id: 5,
        cost: 5000,
        image: "./sib.jpg",
        count: 0,

    },


    {
        name: "سیب زمینی با قارچ",
        id: 6,
        cost: 10000,
        image: "./sib.jpg",
        count: 0,

    },


    {
        name: " سالادسزار",
        id: 7,
        cost: 7000,
        image: "./سالاد سزار.jpg",
        count: 0,

    },


    {
        name: " سالادفصل",
        id: 8,
        cost: 6000,
        image: "./fasl.jpg",
        count: 0,

    },

    {
        name: " نوشابه",
        id: 9,
        cost: 3000,
        image: "./noos.jpg",
        count: 0,

    },

    {
        name: " نوشابه رژیمی",
        id: 10,
        cost: 3000,
        image: "./no.jpg",
        count: 0,

    },

]



function syncFromLocalStorageToBuyList() {
    let jsonData = localStorage.getItem("buy-list")
    if (jsonData) {
        buyList = JSON.parse(jsonData)
        addMenu()

    }

}


syncFromLocalStorageToBuyList()

function syncFromBuyListToLocalStorage() {
    let jsonBuyList = JSON.stringify(buyList)

    localStorage.setItem("buy-list", jsonBuyList)
}


function editCount(id, operator) {
    let temp = buyList

    const itemFinder = temp.find(item => item.foodId == id)

    if (itemFinder) {
        if (operator == "+") {
            itemFinder.count += 1
        } else {
            if (itemFinder.count > 1) {
                itemFinder.count -= 1
            } else {
                const indexFinder = temp.findIndex(item => item.id == id)
                temp.splice(indexFinder, 1)
            }
        }
    } else {
        if (operator == "+") {
            temp.push({
                foodId: id,
                count: 1
            })
        }
    }

    buyList = temp

    syncFromBuyListToLocalStorage()

    addMenu()
    render()
    totalSum()

    // console.log(temp)
}





function render() {
    let temp = buyList
    let finalShopList = ""
    buyList.forEach(item => {
        finalShopList += `
    <div class="flex gap-2 mt-[1rem] w-auto h-[2rem] px-1  bg-white text-black flex  justify-between mx-2">
    
    <p class="text-black">کد غذا : ${item.foodId}</p>
    <p class="text-black">تعداد : ${item.count}</p>
    
    
    
    
    
    </div>`
    })

    // console.log(temp)
    cardTotal.innerHTML = finalShopList

}


function totalSum() {
    let totalPrice = 0
    buyList.forEach(item => {

        let finder = foodList.find(food => food.id == item.foodId)
        totalPrice += item.count * finder.cost
    })


    // console.log(totalPrice)
    majmou.innerHTML = totalPrice

    return totalPrice
    // multi(loopResult)

}

// console.log(totalSum())
totalSum()







function multi(value) {
    let result = value * 0.02;
    ma.innerHTML = result;

    return result;

}
let loopResult = totalSum();









function takhfif() {
    let suming = totalSum()
    console.log(suming)
    let inputValue = document.getElementById("input").value;
    if (inputValue === "golden") {
        console.log("gn")
        suming = suming * 0.25;
        mtakhfif.innerHTML = suming;
        return suming;
    } else if (inputValue === "silver") {
        suming = suming * 0.15;
        mtakhfif.innerHTML = suming;
        return suming;
    } else if (inputValue === "bronze") {
        suming = suming * 0.10;
        mtakhfif.innerHTML = suming;
        return suming;
    } else {
        return 0
    }

    // console.log(suming)
}







function combineResult() {

    let result1 = totalSum();
    let result2 = multi(result1);
    let result3 = takhfif();

    let combining = result1 + result2 - result3;

    pardakht.innerHTML = combining


}



function resetValues() {
    document.getElementById("pardakht").textContent = "0";
    document.getElementById("mtakhfif").textContent = "0";
    document.getElementById("ma").textContent = "0";
    document.getElementById("majmou").textContent = "0";
    document.getElementById("cardTotal").textContent = "";

}




///dom part







function plusCount(id) {
    editCount(id, "+")
}

function decCount(id) {
    editCount(id, "-")
}













function addMenu() {


    let empty = ""
    foodList.forEach(item => {
        let foodCount = buyList.find(food => food.foodId == item.id)?.count ?? 0
        empty += `<div class="grid grid-cols-2 gap-2 my-2 w-auto text-[14px] border border-gray-400  xl:h-auto mx-2 rounded-[6px] p-2">
        
        <div class="flex  gap-4 border-black px-2 w-[100px] h-[90px] sm:w-[120px] md:w-[130px] my-auto">
        
        <img src="${item.image}" class="w-full">
        </div>

        <div class="flex flex-col gap-2 xl:my-2 xl:w-full">
        <p class="font-bold w-[100px] xl:text-[17px]">${item.name}  </p>
        <p>تومان ${item.cost}</p>
        
        <div class="flex gap-1">
        
        <button onclick="plusCount(${item.id})"> 
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" class="bi bi-plus-square-fill" viewBox="0 0 16 16">
  <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0"/>
</svg>
 </button>
        <p> ${foodCount}</p>
        <button onclick="decCount(${item.id})"> 
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" class="bi bi-dash-square-fill" viewBox="0 0 16 16">
  <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm2.5 7.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1"/>
</svg>
        </button>
        
        
         </div>
        </div>
        
        
        
        </div>
        </div>`


    })


    menuWrapper.innerHTML = empty
    multi(totalSum())
    combineResult()
    render()
}

addMenu()


