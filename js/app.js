

const url2 = 'https://openapi.programming-hero.com/api/phone/${id}'


const LoadPhoneData =async(SearchItem='iphone')=>{
    const url =`https://openapi.programming-hero.com/api/phones?search=${SearchItem}`
    const res = await fetch(url);
    const data = await res.json();
    console.log(data.data);
    displayPhoneData(data.data);
}

const displayPhoneData=(Phones)=>{
    const GetPhone = document.getElementById('Phone-container');
    GetPhone.innerHTML=''
    Phones=Phones.slice(0,20)

    const Nophopne= document.getElementById('noPhone-found')
    if (Phones.length === 0) {
        Nophopne.classList.remove('d-none')
    } else {
        Nophopne.classList.add('d-none')
    }

    Phones.forEach( phone => {
        const CreatDiv = document.createElement('div')
        CreatDiv.classList.add('col')
        CreatDiv.innerHTML = `
        <div class="card p-4 rounded-5">
            <img src="${phone.image}" class="card-img-top alt="...">
            <div class="card-body">
                <h5 class="card-title">${phone.phone_name}</h5>
                <p class="card-text">this is new release phone which is Purai Chomolokkho</p>
            </div>
        </div>
        `;
        GetPhone.appendChild(CreatDiv);
    });

    
}

document.getElementById('Search-button').addEventListener('click',function(){
    const SearchInputBox = document.getElementById('Search-input-box');
    const SeachBoxValue= SearchInputBox.value;
    LoadPhoneData(SeachBoxValue);
    SearchInputBox.value=''
})

document.getElementById('Search-input-box').addEventListener("keypress", function(event) {
    const searchbox= document.getElementById('Search-input-box')
    const boxvalue = searchbox.value;
    console.log(event.key);
    if (event.key === "Enter") {
        LoadPhoneData(boxvalue);
        searchbox.value=''
    }
});

LoadPhoneData();