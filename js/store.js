function renderProducts(data){
const grid=document.getElementById("productGrid");
grid.innerHTML="";

data.forEach(item=>{
const message = encodeURIComponent(
`Hi Apex Trailers, I would like to enquire about: ${item.name}`
);

grid.innerHTML+=`
<div class="card" data-cat="${item.cat}">
<img src="https://via.placeholder.com/600x400">
<div class="content">
<h3>${item.name}</h3>
<div class="price">${item.price}</div>
<a class="whatsapp-btn"
href="https://wa.me/27111234567?text=${message}"
target="_blank">
Enquire on WhatsApp
</a>
</div>
</div>`;
});
}

function filterCategory(cat){
document.querySelectorAll('.card').forEach(card=>{
card.style.display=(cat==='all'||card.dataset.cat===cat)?'flex':'none';
});
}