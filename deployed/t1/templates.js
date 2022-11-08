export const main = (slide) => {
  return `
  <main class="main">
    <h1 class="main__title">Кейсы</h1>

    <section class="content main__content">
      <h2 class="content__title">
        ${slide.content.title}
      </h2>
      <p class="content__text">
        ${slide.content.text}
      </p>
    
      ${buttons()}
      ${datasheet(slide.datasheet)}
    </section>
    
    ${laptop(slide.displayImg)}
    
    <div class="magnetic-circle magnetic-circle_pos1">
      <div class="circle"></div>
    </div>
    <div class="magnetic-circle magnetic-circle_pos2">
      <div class="circle"></div>
    </div>
    <div class="magnetic-circle magnetic-circle_pos3">
      <div class="circle"></div>
    </div>
  </main>`;
};

export const buttons = () => {
  return `
  <section class="buttons content__buttons">
    <button class="button button_left" disabled>
      <img
        class="button__img"
        src="./assets/icons/left-arrow.svg"
        alt="arrow"
      />
    </button>
    <button class="button button_right">
      <img
        class="button__img"
        src="./assets/icons/right-arrow.svg"
        alt="arrow"
      />
    </button>
  </section>`;
};

export const datasheet = (datasheet) => {
  let result = "";
  datasheet.forEach((item) => {
    result += datasheetItem(item);
  });

  return `
  <section class="datasheet">
    ${result}
  </section>`;
};

export const datasheetItem = (datasheetItem) => {
  return `
  <div class="datasheet__item">
    <h3 class="datasheet__title">${datasheetItem.title}</h3>
    <p class="datasheet__text">${datasheetItem.text}</p>
  </div>`;
};

export const laptop = (displayImg) => {
  return `
  <section class="laptop laptop_rotation">
    <img
      class="laptop__img"
      src="./assets/images/laptop.svg"
      alt="laptop"
    />
    <div class="laptop__display" style="${laptopDisplayCss(displayImg)}"></div>
  </section>`;
};

export const laptopDisplayCss = (imgUrl) => `
  background: linear-gradient(
    117.55deg,
    rgba(22, 48, 39, 0.02) 1.22%,
    rgba(69, 98, 87, 0) 119.48%
  ),
  url(${imgUrl});`;
