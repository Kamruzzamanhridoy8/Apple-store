




const LoadPhoneData =async(SearchItem='iphone',dataLimit)=>{
    spinnerArea(true)
    const url =`https://openapi.programming-hero.com/api/phones?search=${SearchItem}`
    const res = await fetch(url);
    const data = await res.json();
    console.log(data.data);
    displayPhoneData(data.data,dataLimit);
}

const displayPhoneData=(Phones,dataLimit)=>{
    const GetPhone = document.getElementById('Phone-container');
    GetPhone.innerHTML=''

    const seeMore = document.getElementById('Show-all-sec')
    if (dataLimit && Phones.length > 10) {
        Phones=Phones.slice(0,10)
        seeMore.classList.remove('d-none')
    }else{
        seeMore.classList.add('d-none')
    }

    const Nophone= document.getElementById('noPhone-found')
    if (Phones.length === 0) {
        Nophone.classList.remove('d-none')
    } else {
        Nophone.classList.add('d-none')
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
            <button onclick="showDetais('${phone.slug}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Details</button>
        </div>
        `;
        GetPhone.appendChild(CreatDiv);
    });

    spinnerArea(false)
}

function SeearchCall(dataLimit) {
    const SearchInputBox = document.getElementById('Search-input-box');
    const SeachBoxValue= SearchInputBox.value;
    LoadPhoneData(SeachBoxValue , dataLimit);
    // SearchInputBox.value=''
}

document.getElementById('Search-button').addEventListener('click',function(){
    SeearchCall(10)
})

document.getElementById('Search-input-box').addEventListener("keypress", function(event) {
    console.log(event.key);
    if (event.key === "Enter") {
        SeearchCall(10)
        // searchbox.value=''
    }
});


const spinnerArea = (IsLoading)=>{
    const Spinner = document.getElementById('Spinner-area')
    if (IsLoading) {
        Spinner.classList.remove('d-none')
    } else {
        Spinner.classList.add('d-none')
    }

}



document.getElementById('See-more-btn').addEventListener('click',function(){
    SeearchCall()
})

const showDetais = async (id)=>{
    const url = `https://openapi.programming-hero.com/api/phone/${id}`
    const res = await fetch(url);
    const data= await res.json();
    displayPhonedetails(data.data);
}

const displayPhonedetails = (phone)=>{
    console.log(phone);
    const phonetitle = document.getElementById('exampleModalLabel')
    phonetitle.innerText=phone.name;
    const phonedetails= document.getElementById('phone-detail-info');
    phonedetails.innerHTML=`
        <p>Brand: ${phone.brand}</p>
        <p>ChipSet: ${phone.mainFeatures.chipSet}</p>
        <p>Display Size: ${phone.mainFeatures.displaySize}</p>
        <p>Memory: ${phone.mainFeatures.memory}</p>
        <p>Sensors: ${phone.mainFeatures.sensors[0]},${phone.mainFeatures.sensors[1]},${phone.mainFeatures.sensors[2]},${phone.mainFeatures.sensors[3]},${phone.mainFeatures.sensors[4]},${phone.mainFeatures.sensors[5]}</p>
        <p>Storage: ${phone.mainFeatures.storage}</p>
        <p>Release Date: ${phone.releaseDate}</p>
<p>Others: <br> Bluetooth: ${phone.others.Bluetooth},<br> GPS: ${phone.others.GPS},<br> NFC: ${phone.others.NFC},<br> USB: ${phone.others.USB}, <br> Radio: ${phone.others.Radio}, <br> WLAN: ${phone.others.WLAN}</p>
    `
}


LoadPhoneData();