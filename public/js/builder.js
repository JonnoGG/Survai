let surveyId = null;
const container = document.querySelector("#surveyContainer");
const addBtn = document.querySelector("#addBtn");
const publishBtn = document.querySelector("#publishBtn");
import { redirectIfNotLoggedIn } from "./auth.js";
import { apiFetch } from "./api.js";

await redirectIfNotLoggedIn();

addBtn.addEventListener("click", () => {

  const question = document.createElement("div");
  question.classList = "question space-y-4 py-4";
  question.innerHTML = `
    <input type="text" placeholder="Question text" class="questionText input-base" />
    <select class="questionType input-base">
      <option value="text">Text</option>
      <option value="multiple_choice">Multiple Choice</option>
      <option value="yes_no">Yes/No</option>
      <option value="rating">Rating</option>
    </select>
    <label class="block"><input type="checkbox" class="questionRequired mr-2" />Required</label>
    <div class="questionOptions hidden space-y-4">
      
      <div class="optionList space-y-4">
        <input type="text" placeholder="Option text" class="optionText input-base"></input>
        <input type="text" placeholder="Option text" class="optionText input-base"></input>
      </div>
      <button type="button" class="addOption px-2 py-1 text-sm bg-gray-200 rounded-xl">+ Add Option</button>
    </div>
  `;

  container.appendChild(question);

  const typeSelect = question.querySelector(".questionType");
  const optionsDiv = question.querySelector(".questionOptions");
  const optionList = question.querySelector(".optionList");
  const addOptionBtn = question.querySelector(".addOption");

  typeSelect.addEventListener("change", () => {
    optionsDiv.classList.toggle("hidden", typeSelect.value !== "multiple_choice");
  });

  addOptionBtn.addEventListener("click", () => {
    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Option text";
    input.className = "optionText input-base";
    optionList.appendChild(input);
  });
});

publishBtn.addEventListener("click", async () => {
  const title = document.getElementById("surveyTitle").value.trim();
  const description = document.getElementById("surveyDescription").value.trim();

  if (!title) return alert("Survey must have a title");

  console.log(title, description);
  try {
    if (!surveyId) {
      const res = await apiFetch("/api/surveys", {
        method: "POST",
        body: JSON.stringify({ title, description }),
      });

      const json = await res.json();
      surveyId = json.data.survey.id;
    }

    const allQuestions = [...container.querySelectorAll(".question")].map(block => {
      const text = block.querySelector(".questionText").value.trim();
      const type = block.querySelector(".questionType").value;
      const required = block.querySelector(".questionRequired").checked;

      let options = [];
      if (type === "multiple_choice") {
        options = [...block.querySelectorAll(".optionText")].map(opt => ({
          option_text: opt.value.trim()
        })).filter(opt => opt.option_text !== "");
      }

      return { text, question_type: type, required, options };
    });

    const qRes = await apiFetch(`/api/surveys/${surveyId}/questions`, {
        method: "PUT",
        body: JSON.stringify({ questions: allQuestions }),
    });

    const qJson = await qRes.json();
    if (qJson.status === "success") {
      alert("Survey saved.");
      window.location.href = "/surveys";
    } else {
      alert("Error saving questions.");
    }
  } catch (err) {
    console.error(err);
    alert("Something went wrong. Please try again later.");
  }
});
