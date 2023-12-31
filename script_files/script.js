// Category Segment
const handleCategory = async () => {
    const response = await fetch("https://openapi.programming-hero.com/api/videos/categories");
    const data = await response.json();
    const categories = data.data;
    const categoryContainer = document.getElementById('category-container');
    categories.forEach((category) => {
        const categoryDiv = document.createElement("div");
        categoryDiv.innerHTML = `
        <input onclick="handleVideos('${category.category_id}')" class="hover:bg-red-600 hover:text-white btn btn-xs sm:btn-sm md:btn-md lg:btn-lg" type="radio" name="options" aria-label="${category.category}" /> `;
        categoryContainer.appendChild(categoryDiv);
    });
};
// Video Segment 
let activeId;
const handleVideos = async (categoryId) => {
    activeId = categoryId;
    const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`);
    const data = await response.json();
    const videos = data.data;
    const videoContainer = document.getElementById('VideoContainer');
    videoContainer.innerText = "";
    videos.forEach((videoData) => {
        const postTime = videoData.others.posted_date;
        const videoDiv = document.createElement("div");
        videoDiv.innerHTML = `<div id="VideoContainer" class="card bg-base-100 shadow-xl">
        <figure><img class="w-full h-56" src="${videoData.thumbnail}" alt="Shoes" /></figure>
        ${postTime > 0 ? `
        <div class="stat-value text-xs font-normal bg-gray-700 text-white rounded-md p-1 mb-5 -mt-10 ml-48 mr-2 text-center">
        ${Math.floor(postTime / 3600)}hrs ${Math.floor((postTime % 3600) / 60)}min ago</div > ` : `
                <div hidden class="stat-value text-xs font-normal bg-gray-700 text-white rounded-md  p-1 -mt-10 ml-48 mr-2 text-center">
                ${Math.floor(postTime / 3600)}hrs ${Math.floor((postTime % 3600) / 60)}min ago</div > `}
    <div class=" flex pl-4 pb-6 pt-6 gap-5">
        <div class="avatar">
            <div class="w-14 h-14 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img src="${videoData.authors[0].profile_picture}" />
            </div>
        </div>
        <div>
            <h2 class="card-title">${videoData.title}</h2>
            <div class="flex gap-2 mt-2 items-center">
                <p class="font-serif" >${videoData.authors[0].profile_name}</p>
                <p>${videoData.authors[0].verified ? '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">  < g clip - path="url(#clip0_11_215)" ><path d="M19.375 10.0001C19.375 10.8001 18.3922 11.4595 18.1953 12.197C17.9922 12.9595 18.5063 14.022 18.1203 14.6892C17.7281 15.3673 16.5484 15.4486 15.9984 15.9986C15.4484 16.5486 15.3672 17.7282 14.6891 18.1204C14.0219 18.5064 12.9594 17.9923 12.1969 18.1954C11.4594 18.3923 10.8 19.3751 10 19.3751C9.2 19.3751 8.54062 18.3923 7.80312 18.1954C7.04062 17.9923 5.97813 18.5064 5.31094 18.1204C4.63281 17.7282 4.55156 16.5486 4.00156 15.9986C3.45156 15.4486 2.27187 15.3673 1.87969 14.6892C1.49375 14.022 2.00781 12.9595 1.80469 12.197C1.60781 11.4595 0.625 10.8001 0.625 10.0001C0.625 9.20012 1.60781 8.54075 1.80469 7.80325C2.00781 7.04075 1.49375 5.97825 1.87969 5.31106C2.27187 4.63293 3.45156 4.55168 4.00156 4.00168C4.55156 3.45168 4.63281 2.272 5.31094 1.87981C5.97813 1.49387 7.04062 2.00793 7.80312 1.80481C8.54062 1.60793 9.2 0.625122 10 0.625122C10.8 0.625122 11.4594 1.60793 12.1969 1.80481C12.9594 2.00793 14.0219 1.49387 14.6891 1.87981C15.3672 2.272 15.4484 3.45168 15.9984 4.00168C16.5484 4.55168 17.7281 4.63293 18.1203 5.31106C18.5063 5.97825 17.9922 7.04075 18.1953 7.80325C18.3922 8.54075 19.375 9.20012 19.375 10.0001Z" fill="#2568EF"/><path d="M12.7094 7.20637L9.14062 10.7751L7.29062 8.92669C6.88906 8.52512 6.23749 8.52512 5.83593 8.92669C5.43437 9.32825 5.43437 9.97981 5.83593 10.3814L8.43124 12.9767C8.82187 13.3673 9.45624 13.3673 9.84687 12.9767L14.1625 8.66106C14.5641 8.2595 14.5641 7.60794 14.1625 7.20637C13.7609 6.80481 13.1109 6.80481 12.7094 7.20637Z" fill="#FFFCEE"/> </g > <defs><clipPath id="clip0_11_215"><rect width="20" height="20" fill="white" /> </clipPath>  </defs>  </svg > ' : ""} </p >
            </div >
            <div>
                <p class="font-semibold"> ${videoData.others.views}</p>
            </div>
        </div >
    </div >
    </div > `
        videoContainer.appendChild(videoDiv);
    })
    // Empty Segment 
    const videoContainer2 = document.getElementById("EmptyContainer");
    videoContainer2.innerText = "";
    const videoItem = data.data.length;
    if (videoItem < 1) {
        const div = document.createElement("div");
        div.innerHTML = `
        <div class="justify-center my-20">
<img class="mx-auto" src="./images/Icon.png" alt="">
<p class="font-bold text-4xl mt-10 text-center">Oops!! Sorry, There is no <br> content here</p>
    </div>
                      `
        videoContainer2.appendChild(div)
    }
}
// Sort Segment 
const sortByView = async () => {
    const response = await fetch(`
    https://openapi.programming-hero.com/api/videos/category/${activeId}`);
    const data = await response.json();
    const sortedVideos = data.data;
    const sortedView = [...sortedVideos].sort((a, b) => parseFloat(b.others.views) - parseFloat(a.others.views));
    const videoContainer = document.getElementById('VideoContainer');
    videoContainer.innerText = "";
    sortedView.forEach((videoData) => {
        const sortedVideoDiv = document.createElement("div");
        const postTime = videoData.others.posted_date;
        sortedVideoDiv.innerHTML = `
        <div id="VideoContainer" class="card bg-base-100 shadow-xl">
        <figure><img class="w-full h-56" src="${videoData.thumbnail}" alt="Shoes" /></figure>
        ${postTime > 0 ? ` <div class="stat-value text-xs font-normal bg-gray-700 text-white rounded-md p-1 mb-5 -mt-10 ml-48 mr-2 text-center">
        ${Math.floor(postTime / 3600)}hrs ${Math.floor((postTime % 3600) / 60)}min ago</div > ` : `
                <div hidden class="stat-value text-xs font-normal bg-gray-700 text-white rounded-md  p-1 -mt-10 ml-48 mr-2 text-center">
                ${Math.floor(postTime / 3600)}hrs ${Math.floor((postTime % 3600) / 60)}min ago</div > `}
    <div class=" flex pl-4 pb-6 pt-6 gap-5">
        <div class="avatar">
            <div class="w-14 h-14 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img src="${videoData.authors[0].profile_picture}" />
            </div>
        </div> 
        <div> 
            <h2 class="card-title">${videoData.title}</h2>
            <div class="flex gap-2 mt-2">
                <p class="font-serif">${videoData.authors[0].profile_name}</p>
                <p>${videoData.authors[0].verified ? '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">  < g clip - path="url(#clip0_11_215)" ><path d="M19.375 10.0001C19.375 10.8001 18.3922 11.4595 18.1953 12.197C17.9922 12.9595 18.5063 14.022 18.1203 14.6892C17.7281 15.3673 16.5484 15.4486 15.9984 15.9986C15.4484 16.5486 15.3672 17.7282 14.6891 18.1204C14.0219 18.5064 12.9594 17.9923 12.1969 18.1954C11.4594 18.3923 10.8 19.3751 10 19.3751C9.2 19.3751 8.54062 18.3923 7.80312 18.1954C7.04062 17.9923 5.97813 18.5064 5.31094 18.1204C4.63281 17.7282 4.55156 16.5486 4.00156 15.9986C3.45156 15.4486 2.27187 15.3673 1.87969 14.6892C1.49375 14.022 2.00781 12.9595 1.80469 12.197C1.60781 11.4595 0.625 10.8001 0.625 10.0001C0.625 9.20012 1.60781 8.54075 1.80469 7.80325C2.00781 7.04075 1.49375 5.97825 1.87969 5.31106C2.27187 4.63293 3.45156 4.55168 4.00156 4.00168C4.55156 3.45168 4.63281 2.272 5.31094 1.87981C5.97813 1.49387 7.04062 2.00793 7.80312 1.80481C8.54062 1.60793 9.2 0.625122 10 0.625122C10.8 0.625122 11.4594 1.60793 12.1969 1.80481C12.9594 2.00793 14.0219 1.49387 14.6891 1.87981C15.3672 2.272 15.4484 3.45168 15.9984 4.00168C16.5484 4.55168 17.7281 4.63293 18.1203 5.31106C18.5063 5.97825 17.9922 7.04075 18.1953 7.80325C18.3922 8.54075 19.375 9.20012 19.375 10.0001Z" fill="#2568EF"/><path d="M12.7094 7.20637L9.14062 10.7751L7.29062 8.92669C6.88906 8.52512 6.23749 8.52512 5.83593 8.92669C5.43437 9.32825 5.43437 9.97981 5.83593 10.3814L8.43124 12.9767C8.82187 13.3673 9.45624 13.3673 9.84687 12.9767L14.1625 8.66106C14.5641 8.2595 14.5641 7.60794 14.1625 7.20637C13.7609 6.80481 13.1109 6.80481 12.7094 7.20637Z" fill="#FFFCEE"/> </g > <defs><clipPath id="clip0_11_215"><rect width="20" height="20" fill="white" /> </clipPath>  </defs>  </svg > ' : ""} </p > 
                </div > 
                <div>
                <p class="font-semibold"> ${videoData.others.views}</p>
                </div> 
            </div > 
        </div >
    </div >
    `
        videoContainer.appendChild(sortedVideoDiv);
    })
}
handleVideos("1000");
handleCategory();