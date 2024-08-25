const feedbackForm = document.querySelector(".feedback-form");
let formDataFromEL = {}; // Пустий обєкт - варто врахувати при перезавантаженні форми

const fillFormFields = () => {
    const formDataFromLS = JSON.parse(localStorage.getItem("feedback-form-state"));
    
    if (formDataFromLS === null) { // local storage is empty?
        return;
    }
    formDataFromEL = formDataFromLS; // Заповнюємо пустий обєкт щоб не втрачати дані у властивостях

  for (const key in formDataFromLS) {
    if (formDataFromLS.hasOwnProperty(key)) {
      feedbackForm.elements[key].value = formDataFromLS[key];
    }
  }
}
fillFormFields();

const inputText = (event) => {
  const propKey = event.target.name;
  formDataFromEL[propKey] = feedbackForm.elements[propKey].value.trim();
  localStorage.setItem("feedback-form-state", JSON.stringify(formDataFromEL));
  }

const onSubmit = (event) => {
  if ((formDataFromEL.email === undefined || formDataFromEL.message === undefined) || (formDataFromEL.email === "" || formDataFromEL.message === "")) {
    return alert("Fill please all fields");
  } else {
    console.log(formDataFromEL);
    event.preventDefault();
    event.target.reset();
    formDataFromEL = {};
    localStorage.removeItem("feedback-form-state");
  }
}
feedbackForm.addEventListener("input", inputText);
feedbackForm.addEventListener("submit", onSubmit);



