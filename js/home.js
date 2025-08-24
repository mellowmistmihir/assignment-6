//  category fetch 


const loadCategories = () =>{
        fetch('https://openapi.programming-hero.com/api/peddy/categories')
        .then (res=> res.json())
        .then (data => displayCategories(data.categories))
        .catch((error) => console.log(error))
        
 
}

// pets fetch 

const loadpets = () => {
     fetch ('https://openapi.programming-hero.com/api/peddy/pets')
     .then (res => res.json())
     .then(data => displaypets(data.pets))
     .catch(error => console.log(error))
}





const activeClassRemove =()=>{
 const buttons =  document.getElementsByClassName('category-btn')
 for (let btn of buttons){
   btn.classList.remove('active')
 }
}




const loadcategoriesPets = (category) =>{

   fetch (`https://openapi.programming-hero.com/api/peddy/category/${category}`)
     .then (res => res.json())
     .then(data =>{
      activeClassRemove()
      const activeBtn = document.getElementById(`btn-${category}`)
      activeBtn.classList.add('active')
      displaypets (data.data)
      
     })
     .catch(error => console.log(error))
}

const loadDetails =(petId)=>{
     fetch (`https://openapi.programming-hero.com/api/peddy/pet/${petId}`)
     .then (res => res.json())
     .then(data => displayDitails (data.petData))
     .catch(error => console.log(error))
}

const displayDitails = (petData) => {
     
     const detailsConteiner = document.getElementById('modal-content')

     detailsConteiner.innerHTML =`
      
    <figure class="h-[200px] w-[300px] mx-auto">
      <img class="h-full w-full object-cover rounded-lg"
        src="${petData.image}"
        alt="${petData.pet_name}" />
    </figure>
    <div class="card-body">
      <h4 class="text-xl font-bold mt-4">${petData.pet_name}</h4>
      <p class="text-sm text-gray-600">🐾 Breed : ${petData.breed || "Not Available"}</p>
      <p class="text-sm text-gray-600">🎂 Birth : ${petData.date_of_birth || "Unknown"}</p>
      <p class="text-sm text-gray-600">♀ Gender : ${petData.gender || "Unknown"}</p>
      <p class="text-sm text-gray-600">💲 Price : ${petData.price ? "$" + petData.price : "N/A"}</p>
      <p class="text-sm text-gray-600">💉 Vaccinated : ${petData.vaccinated_status || "Not available"}</p>
    </div>
     <div class="divider"></div>
    <div class="mt-4">
      <h3 class="text-lg font-semibold">Details Information</h3>
      <p class="text-gray-600 mt-2">${petData.pet_details || "No details provided"}</p>
    </div>
     `
     
     document.getElementById('showModalData').click()
}


  const loadaddPhoto = (petId) =>{
      fetch (`https://openapi.programming-hero.com/api/peddy/pet/${petId}`)
     .then (res => res.json())
     .then(data =>displayaddPHoto (data.petData))
     .catch(error => console.log(error))
  
  }

  const displayaddPHoto = (petData) => {
         const photoConteiner = document.getElementById('addpets')
  const figure = document.createElement('figure');
  figure.className = "h-[200px] w-[300px] mx-auto ";
  
  figure.innerHTML = `
    <img class="h-full w-full object-cover rounded-lg "
      src="${petData.image}"
      alt="${petData.pet_name}" />
  `;

 
  photoConteiner.appendChild(figure);

             
      
  }
// category : "Cat"
// category_icon: "https://i.ibb.co.com/N7dM2K1/cat.png"
// id:1



// breed : "Bengal"
// category: "Cat"
// date_of_birth: "2022-11-10"
// gender: "Male"
// image : "https://i.ibb.co.com/QXbXctF/pet-7.jpg"
// petId :  7
// pet_details :"This male Bengal cat, born on November 10, 2022, is energetic and playful. He loves exploring, climbing, and playing with interactive toys. Fully vaccinated and priced at $950, he's perfect for anyone looking for an active, intelligent, and lively cat."
// pet_name : "Max"
// price : 950
// vaccinated_status : null
// [[Prototype]] : Object



// display pets

const displaypets = (pets) => {
    const petConteiner = document.getElementById('pets')
    petConteiner.innerHTML = "";
 
    if(pets.length==0){
      petConteiner.classList.remove("grid")
      petConteiner.innerHTML = `
        <div class = "flex justify-center items-center gap-5 py-10  bg-gray-300 rounded-t-lg">
             <img src="images/error.webp" alt="">
             
        </div>
        <div class="text-center space-y-5 mb-20  bg-gray-300 pb-10 rounded-b-lg">
<h3 class="text-2xl font-bold ">No Information Available</h3>
<p class="text-gray-400">It is a long established fact that a reader will be distracted by the readable <br>
   content of a page when looking at 
its layout. The point of using Lorem Ipsum is that it has a.</p>
</div>
      `;
      return;
    }else{
      petConteiner.classList.add("grid")
    }
    pets.forEach(pet => {
        const card = document.createElement('div')
        card.classList = " border rounded-2xl shadow p-4"
       
        card.innerHTML=`
           
  <figure class="h-[200px] w-[300px]">
    <img class="h-full w-full object-cover"
      src=${pet.image}
      alt="Shoes" />
  </figure>
  <div class="card-body">
    <h4 class="text-xl font-bold">${pet.pet_name}</h4>
<p class="text-sm text-gray-600">🐾 Breed : ${pet.breed} </p>
<p class="text-sm text-gray-600">🎂 Birth : ${pet.date_of_birth}</p>
<p class="text-sm text-gray-600"> ♀ Gender : ${pet.gender} </p>
<p class="text-sm text-gray-600">💲price : ${pet.price} </p>
  </div>
  <div class="flex gap-5">
  <div>
    <button onclick="loadaddPhoto('${pet.petId}')"  class="border rounded-lg px-4 py-2 text-[#0E7A81]">
          <img class="w-5 object-cover" src="https://img.icons8.com/?size=100&id=24816&format=png&color=000000" alt="">
    </button>
  </div>
  <div>
     <button class="border rounded-lg px-4 py-2 text-[#0E7A81]">
       Adopt
     </button>
  </div>
  <div>
       <button onclick="loadDetails('${pet.petId}')" class="border rounded-lg px-4 py-2 text-[#0E7A81]">
           Details
       </button>
  </div>
</div>
        
        `
        petConteiner.append(card)
    });

    
} 





// display category 

 const displayCategories = (categories) =>{
    const categoriesConteiner = document.getElementById('categories')
    categories.forEach(item => {
       

        // create a button 
   const buttonConteiner = document.createElement('div')
         buttonConteiner.innerHTML = `
               <button id="btn-${item.category}" onclick ="loadcategoriesPets('${item.category}')" class="btn category-btn"> ${item.category}</button>
         `
     categoriesConteiner.append(buttonConteiner)
    });
 }


loadCategories()
loadpets()

