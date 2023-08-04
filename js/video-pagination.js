const itemList = document.querySelector('.videos');

function addItems() {
    let newItemRow = document.createElement('div');
    newItemRow.classList.add("video-row");

    for(let i = 0; i < 3; i++) {
      const newItem = document.createElement('div');
      newItem.setAttribute('id', 'video');
      newItem.setAttribute('onclick', 'mark(this)')
      newItemRow.appendChild(newItem);
    }

    itemList.appendChild(newItemRow);
    
}
addItems();

const scrollContainer = document.querySelector('.videos');
  scrollContainer.addEventListener('scroll', () => {
    if (scrollContainer.scrollTop + scrollContainer.clientHeight >= 
        scrollContainer.scrollHeight-20) {
      addItems();
  }
});

function mark(video) {
    const marked_videos = document.querySelectorAll(".marked");
    if (marked_videos.length > 0) {
        marked_videos[0].className = "";
    }
    video.setAttribute("class", "marked");

}
