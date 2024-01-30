const mealsDb =(name) =>{
     const url =(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
     fetch(url)
    .then(res =>res.json())
    .then(data =>allMeals(data.meals))
    
    
}
const allMeals = meals =>{
    // console.log(meals)
    const update = document.getElementById('favorite-food');
    
    update.innerHTML = ''
   
    
    meals.forEach(meal => {
        const createElement= document.createElement('div');
    
        
        createElement.innerHTML= `
            <div class="card mb-3">
                <div class="row g-0">
                     <div class="col-md-4">
                         <img src="${meal.strMealThumb}" class="img-fluid rounded-start" alt="...">
                        </div>
                            <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title text-2xl">${meal.strMeal} ${meal.strArea} </h5>
                                <h5 class="card-title text-2xl"></h5>
                                <h5 class="card-title">${meal.strCategory}</h5>
                                <button style="color: red;" onclick=(mealsSearch(${meal.idMeal})) type="button" class="" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                More Details
                                </button>
                            </div>
                        </div>
                    </div>
             </div>
                    `
      update.appendChild(createElement);
     
        
    });
}
const searchPage =() =>{
    const searchInput = document.getElementById('search-input').value;
    
    mealsDb(searchInput);
    return(searchInput)
    
    
}

const mealsSearch = (idmeal) =>{
    const url =`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idmeal}`
    fetch(url)
    .then(res => res.json())
    .then(data => modalSet(data.meals[0]))
}
const modalSet = meal =>{
    // console.log(idmeals[0])
    const modalUpdate = document.getElementById('meal-modal');
    const createModalElement = document.createElement('div')
    createModalElement.innerHTML=`
                <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">${meal.strMeal} ${meal.strArea }</h5>
                <button type="button" style="color: red;" class="btn-close bg-warning btn" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                <img src="${meal.strMealThumb}" class="img-fluid rounded-start" alt="...">
                <h5 class=""> Category: ${meal.strCategory}</h5>
                <h5 class="card-title">${meal.strIngredient4}</h5>
                <p class="card-text">${meal.strInstructions}</p>
                </div>
                <div class="modal-footer">
                    <button type="button" style="color: red;" data-bs-dismiss="modal">Close</button>
                </div> `
    modalUpdate.appendChild(createModalElement);
}

mealsDb('')