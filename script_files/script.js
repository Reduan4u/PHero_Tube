

// Category Segment
const handleCategory = async () => {

    const response = await fetch("https://openapi.programming-hero.com/api/videos/categories");
    const data = await response.json();

    const categoryContainer = document.getElementById('category-container');
    data.data.forEach((category) => {
        const div = document.createElement("div");
        div.innerHTML = `
        <input onclick="handleVideos('${category.category_id}')" class="join-item btn" type="radio" name="options" aria-label="${category.category}" />
        `
        categoryContainer.appendChild(div);

    })
};


// Video Segment 
const handleVideos = async (categoryId) => {

    const response = await fetch(`
https://openapi.programming-hero.com/api/videos/category/${categoryId}
`)
    const data = await response.json();

    const videoContainer = document.getElementById('VideoContainer');
    data.data.forEach((video) => {
        const div = document.createElement("div");
        div.innerHTML = `
        <div id="VideoContainer" class="card bg-base-100 ">
        <figure><img class="w-full h-56" src="${video.thumbnail}" alt="Shoes" /></figure>
        <div class="stat-value text-xs bg-gray-700 text-white w-1/3 rounded-md p-1 -mt-10 ml-52 text-center">3hrs
                    56min
                    ago
                </div>
        <div class=" flex pb-6 pt-12 gap-5">
            <div class="avatar">
                <div class="w-14 h-14 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                    <img src="${video.authors[0].profile_picture}" />
                </div>
            </div>
            <div>
                <h2 class="card-title">${video.title}</h2>
                <div class="flex gap-4">
                    <p>${video.authors[0].profile_name}</p>
                    <p>${video.authors[0].verified}</p>
                </div>
                <div>
                    <p> ${video.others.views}</p>
                </div>
            </div>
        </div>
    </div>

`
        videoContainer.appendChild(div);

    })
};




handleCategory()