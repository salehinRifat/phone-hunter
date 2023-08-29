const loadPhone = async (phoneName, isLoadedAll) =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${phoneName}`);
    const data = await res.json();
    let phones = data.data;
    showPhone(phones, isLoadedAll);
}
let showPhone = (phones, isLoadedAll) => {
    let containerDiv = document.getElementById('card-container');
    containerDiv.textContent = '';

    let loadMore = document.getElementById('loadMore');
    if(phones.length > 12 && !isLoadedAll){
      loadMore.classList.remove('hidden');
    }else{
      loadMore.classList.add('hidden');
    }

    // Slicing the phones
    if(!isLoadedAll){
      phones = phones.slice(0,12);
    }

    phones.forEach(phone => {
        let div = document.createElement('div');
        div.classList = 'card bg-base-100 shadow-xl';
        div.innerHTML = `
        <figure><img src="${phone.image}" alt="mobiles" /></figure>
        <div class="card-body text-center">
          <h2 class="text-2xl">${phone.phone_name}</h2>
          <p class="my-4">There are many variations of passages of available, but the majority have suffered</p>
          <div class="card-actions justify-center">
            <button class="btn btn-primary" onclick="showDetails('${phone.slug}')">Show Details</button>
          </div>
        </div>
        `
        containerDiv.appendChild(div);
      });
      loadingAnimation(false);
}

// Search input and button functions
let searched = (isLoadedAll) => {
    let searchValue = document.getElementById('search-input').value;
    loadingAnimation(true);
    loadPhone(searchValue, isLoadedAll);
}

// Loading Animation
let loadingAnimation =  (isLoad) =>{
  let loading = document.getElementById('loading-animation');
  if(isLoad){
    loading.classList.remove('hidden');
  }else{
    loading.classList.add('hidden');
  }
}

// show Details
let showDetails = async (id) =>{
  const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
  const data = await res.json();
  let phoneData = data.data;
  // console.log(phoneData);
  show_phone_details.showModal();

  // adding details to the modal
  let detailsContainer = document.getElementById('details-container');
  detailsContainer.innerHTML = `
    <div class="text-center">
    <img src="${phoneData.image}" alt="mobiles" class="inline-block"/>
    </div>
    <h3 class="font-bold text-lg text-center">${phoneData.name}</h3>
    <div>
    <h3 class="text-lg font-bold">Storage: </h3> <span>${phoneData.mainFeatures.storage}</span>
    <h3 class="text-lg font-bold">Dispaly Size: </h3> <span>${phoneData.mainFeatures.displaySize}</span>
    <h3 class="text-lg font-bold">Chipset: </h3> <span>${phoneData.mainFeatures.chipSet}</span>
    <h3 class="text-lg font-bold">Memory: </h3> <span>${phoneData.mainFeatures.memory}</span>
    <h3 class="text-lg font-bold">Release Date: </h3> <span>${phoneData.releaseDate}</span>
    </div>
    <div class="p-5 bg-gray-300 mt-5">
        <p>WLAN: ${phoneData?.others?.WLAN}</p>
        <p>Bluetooth: ${phoneData?.others?.Bluetooth}</p>
        <p>GPS: ${phoneData?.others?.GPS}</p>
        <p>NFC: ${phoneData?.others?.NFC}</p>
        <p>Radio: ${phoneData?.others?.Radio}</p>
        <p>USB: ${phoneData?.others?.USB}</p>
    </div>
  `
}

// Loadmore Button
let loadMore = (isShown) =>{
  searched(true);
}
