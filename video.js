

// Creating Catagories
const loadCatagories = () =>{
    fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => displayCata(data.categories))
    .catch((error)=>console.log(error))
}

const loadVideo = (showSearch ='') =>{
    fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title= ${showSearch}`)
    .then((res) => res.json())
    .then((data) => displayVideo(data.videos))
    .catch((error)=>console.log(error))
}


// Bg Color remove after click
const removeBackColor = ()=>{
  const buttons = document.getElementsByClassName('cataVideo')
  for(let btn of buttons){
     btn.classList.remove('bg-[rgb(255,31,61)]', 'text-white');
  }
}


const loadCataVideos = (id) =>{
  fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
  .then((res) => res.json())
  .then((data) => {
    removeBackColor();
     const activeBtn = document.getElementById(`btn-${id}`);
     activeBtn.classList.add('bg-[rgb(255,31,61)]', 'text-white');

    displayVideo(data.category)
  })
  .catch((error)=>console.log(error))
}


const displayCata = (category)=>{
    const createCategoryBtn = document.getElementById('categories');
          category.forEach((items)=>{
            console.log(items)
            const buttonDiv = document.createElement('div')
            buttonDiv.innerHTML =`
            <button id="btn-${items.category_id}" onclick="loadCataVideos(${items.category_id})" class="btn cataVideo">${items.category}</button>
            `

            createCategoryBtn.append(buttonDiv);
          })
}

// const videoObbj ={
//     "category_id": "1003",
//     "video_id": "aaak",
//     "thumbnail": "https://i.ibb.co/ZNggzdm/cake.jpg",
//     "title": "Beyond The Pale",
//     "authors": [
//         {
//             "profile_picture": "https://i.ibb.co/MZ2vbXR/jimm.jpg",
//             "profile_name": "Jim Gaffigan",
//             "verified": false
//         }
//     ],
//     "others": {
//         "views": "2.6K",
//         "posted_date": "15400"
//     },
//     "description": "'Beyond The Pale' by Jim Gaffigan, with 2.6K views, is a comedic gem that explores everyday observations and family life with a light-hearted and witty approach. Jim's humor is accessible and delightful, making this show perfect for anyone who enjoys clean, observational comedy."
// }

// Time Function
function getTime(time) {
  const hour =parseInt(time/3600);
  let reminder =(time%3600);
  const min = parseInt(reminder/60);

  return `${hour}hrs ${min} min ago`;
}

// Video Detail Function
const getVideoDetail =async(videoID)=>{
  const uri = `https://openapi.programming-hero.com/api/phero-tube/video/${videoID}`;
  const res = await fetch(uri);
  const data = await res.json();
  displayDetail(data.video);
}

// display Detail
const displayDetail =(video)=>{
  const detailedCon = document.getElementById('modal-container');
     detailedCon.innerHTML =`
     <img src="${video.thumbnail}" alt="">
     <p>${video.description}</p>
     `
  document.getElementById("displayDetailModal").showModal();
}

const displayVideo = (videos)=>{
    const createVideoContainer = document.getElementById('video-container');
       createVideoContainer.innerHTML ='';
        if(videos.length == 0){
          createVideoContainer.classList.remove('grid');
          createVideoContainer.innerHTML =`
          <div class="flex flex-col justify-center items-center mt-60"> <img class="h-[200px] w-[200px] " src="Icon.png" alt=""><p class="text-5xl font-bold h-[600px] w-[600px] text-center mt-6">Oops!! Sorry, There is no content here</p></div>
          `
          return;
        }
        else{
          createVideoContainer.classList.add('grid');
        }

          videos.forEach((video)=>{
            console.log(video)
            const div = document.createElement('div')
            div.classList ='card card-compact w-full h-full';
            div.innerHTML =`  
            <figure class="h-[250px] relative">
    <img
      src=${video.thumbnail}
      class="h-full w-full object-cover"
      alt="Shoes" />
      ${video.others.posted_date?.length ==  0? '':`<span class="absolute right-2 bottom-2 bg-black text-white rounded-md p-1 text-xs">${getTime(video.others.posted_date)}</span>`}
      
  </figure>
  <div class="py-3">
    <div class="flex gap-3">
        <div><img class="h-12 w-12 rounded-full object-cover" src=${video.authors[0].profile_picture} alt=""></div>
        <div class="grid grid-rows-3 space-y-1">
        <h3 class="text-2xl font-bold">${video.title}</h3>
        <p class="flex items-center text-xs text-[rgba(23,23,23,0.7)] gap-1">${video.authors[0].profile_name} ${video.authors[0].verified == true ? `<img class="w-5 h-5" src="https://img.icons8.com/?size=48&id=D9RtvkuOe31p&format=png" alt=""></p>`:''}
        <p class="text-xs text-[rgba(23,23,23,0.7)]">${video.others.views} views</p>
        </div>
    </div>
    <div class="text-center"><button onclick="getVideoDetail('${video.video_id}')" class="btn px-2 bg-green-100  h-7 w-24 text-xs ">Details</button></div>
  </div>`
            createVideoContainer.append(div);
          })
}

document.getElementById('input-search').addEventListener('keyup', (e)=>{
  loadVideo(e.target.value);
})


loadCatagories();
loadVideo();