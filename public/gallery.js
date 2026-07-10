const filterBtns = document.querySelectorAll('.filterBtn');
const galleryCards = document.querySelectorAll('.galleryCard');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => filterGallery(btn));
});

function filterGallery(btn){
    const selectedCat = btn.dataset.cat;

    filterBtns.forEach(filterBtn => {
        filterBtn.classList.remove('active');
    });
    btn.classList.add('active');

    galleryCards.forEach(card => {
        if(selectedCat === 'ALL' || card.dataset.cat === selectedCat){
            card.classList.remove('hidden');
        }else{
            card.classList.add('hidden');
        }
    });
}