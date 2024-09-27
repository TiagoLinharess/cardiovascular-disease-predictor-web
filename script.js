const feedbackMessage = (numReturned) => {
  console.log(numReturned);
  const feedback = document.getElementById("feedback-message");
  if (numReturned === 0) {
    feedback.style.display = "block";
    feedback.style.backgroundColor = "#7FFFD4";
    feedback.innerText = "Não possui doença cardíaca";
    setTimeout(() => {
      feedback.style.display = "none";
    }, 2000);
    return;
  }
  feedback.style.display = "block";
  feedback.style.backgroundColor = "#DE3163";
  feedback.innerText = "Possui doença cardíaca";
  setTimeout(() => {
    feedback.style.display = "none";
  }, 2000);
};

const onClick = () => {
  postFormData();
};



const postFormData = async () => {
  const age = document.getElementById("age").value;
  const sex = document.getElementById("sex").value;
  const cp = document.getElementById("cp").value;
  const trestbps = document.getElementById("trestbps").value;
  const chol = document.getElementById("chol").value;
  const fbs = document.getElementById("fbs").value;
  const restecg = document.getElementById("restecg").value;
  const thalach = document.getElementById("thalach").value;
  const exang = document.getElementById("exang").value;
  const oldpeak = document.getElementById("oldpeak").value;
  const slope = document.getElementById("slope").value;
  const ca = document.getElementById("ca").value;
  const thal = document.getElementById("thal").value;

  const formData = new FormData();
  const url = "http://localhost:5000/predict";
  formData.append('age', age);
  formData.append('sex', sex);
  formData.append('cp', cp);
  formData.append('trestbps', trestbps);
  formData.append('chol', chol);
  formData.append('fbs', fbs);
  formData.append('restecg', restecg);
  formData.append('thalach', thalach);
  formData.append('exang', exang);
  formData.append('oldpeak', oldpeak);
  formData.append('slope', slope);
  formData.append('ca', ca);
  formData.append('thal', thal);

  fetch(url, { method: "POST", body: formData })
  .then((response) => {
    if (response.status >= 400) {
        return response.text()
        .then(error => {
            const errorJson = JSON.parse(error);
            throw new Error(errorJson.error);
        })
    }
    return response.json();
  })
  .then((data) => {
    feedbackMessage(data.predict);
  })
  .catch((error) => {
    presentError(error);
  });
}

const presentError = async (error) => {
  alert(error);
}
