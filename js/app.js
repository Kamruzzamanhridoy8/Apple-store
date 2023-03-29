

const url2 = 'https://openapi.programming-hero.com/api/phone/${id}'


const LoadPhoneData =async()=>{
    const url =`https://openapi.programming-hero.com/api/phones?search=iphone`
    const res = await fetch(url);
    const data = await res.json();
    console.log(data.data);
    displayPhoneData(data.data);
}

const displayPhoneData=(Phones)=>{
    const GetPhone = document.getElementById('Phone-container');
    
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




LoadPhoneData();