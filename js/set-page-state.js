const formContainer = document.querySelector('.ad-form');
const formContainerElements = formContainer.querySelectorAll('input, select, textarea, button');
const filterContainer = document.querySelector('.map__filters');
const filterContainerElements = filterContainer.querySelectorAll('input, select, textarea, button');

const setNoActiveState = () => {
  formContainer.classList.add('ad-form--disabled');
  formContainerElements.forEach((element) => {
    element.setAttribute('disabled', 'disabled');
  });
  filterContainer.classList.add('ad-form--disabled');
  filterContainerElements.forEach((element) => {
    element.setAttribute('disabled', 'disabled');
  });
};

// const setActiveState = () => {
//   formContainer.classList.remove('ad-form--disabled');
//   formContainerElements.forEach((element) => {
//     element.removeAttribute('disabled', 'disabled');
//   });
//   filterContainer.classList.remove('ad-form--disabled');
//   filterContainerElements.forEach((element) => {
//     element.removeAttribute('disabled', 'disabled');
//   });
// };

// export {setNoActiveState, setActiveState};
export default setNoActiveState;
