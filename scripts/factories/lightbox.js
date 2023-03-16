function lightboxFactory(data) {
  const { title, video } = data;
  const controlsLeft = generateControl("controls-left", "fa-chevron-left", "Previous");
  const controlsRight = generateControl("controls-right", "fa-chevron-right", "Next");

  function generateControl(className, iconClass, ariaLabel) {
    const control = document.createElement("div");
    control.role = "button";
    control.className = `controls ${className}`;
    control.innerHTML = `
      <span class="img prev-image">
        <i aria-hidden="true" class="fa-solid ${iconClass}"></i>
      </span>
      <p class="sr-only">${ariaLabel}</p>
    `;
    return control;
  }


  // Function création media lightbox
  function generateMediaLightbox() {
    const wrapper = document.createElement("div");
    wrapper.className = "lightbox-content";

    const media = generateMedia(data);
    media.className = "lightbox-media";
    if (video) {
      media.controls = true;
    }

    const btnPlay = document.createElement("button");
    btnPlay.className = "btn-play";
    btnPlay.onclick = () => playLightbox(btnPlay);
    btnPlay.setAttribute("aria-label", "pause lightbox");
    btnPlay.innerHTML = '<i class="fa-solid fa-pause"></i>';

    const textContent = document.createElement("div");
    textContent.className = "text-content";
    const mediaText = document.createElement("p");
    mediaText.className = "lightbox-title";
    mediaText.textContent = title;

    wrapper.appendChild(media);
    wrapper.appendChild(textContent);
    textContent.appendChild(mediaText);
    textContent.appendChild(btnPlay);

    return wrapper;
  }

  function createItemLightbox(numItem) {
    const item = document.createElement("li");
    item.className = `lightbox-item item-${numItem}`;
    item.setAttribute("aria-hidden", numItem === 0 ? false : true);
    item.appendChild(controlsLeft);
    item.appendChild(controlsRight);
    item.appendChild(generateMediaLightbox());
    return item;
  }

  return { createItemLightbox };
}