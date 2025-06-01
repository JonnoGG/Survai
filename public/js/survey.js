import { redirectIfNotLoggedIn } from "./auth.js";
import { apiFetch } from "./api.js";

await redirectIfNotLoggedIn();

const surveyId = window.location.pathname.split("/").pop();
if (!surveyId) {
    alert("Missing survey ID.");
    window.location.href = "/surveys";
}

const container = document.querySelector("#surveyContainer");
const titleInput = document.querySelector("#surveyTitle");
const descInput = document.querySelector("#surveyDescription");
const addQuestionBtn = document.querySelector("#addQuestionBtn");
const editBtn = document.querySelector("#editBtn");
const viewResponsesBtn = document.querySelector("#viewResponsesBtn");

try {
    const res = await apiFetch(`/api/surveys/${surveyId}`);
    const json = await res.json();
    const survey = json.data.survey;

    titleInput.value = survey.title;
    descInput.value = survey.description;

    //TODO: add hasResponses to endpoint to allow editing survey
    //const hasResponses = survey.responses_count && survey.responses_count > 0;
    const hasResponses = true;

    if (!hasResponses) {
        addQuestionBtn.hidden = false;
        editBtn.hidden = false;
        titleInput.disabled = false;
        descInput.disabled = false;
    } else {
        viewResponsesBtn.hidden = false;
        viewResponsesBtn.addEventListener("click", () => {
            window.location.href = `/surveys/${surveyId}/responses`;
        });
    }
    for (const q of survey.questions) {
        const question = document.createElement("div");
        question.className = "question space-y-4 py-4";
        question.innerHTML = `
      <input type="text" class="questionText input-base" value="${q.text}" ${hasResponses ? "disabled" : ""} />
      <select class="questionType input-base" ${hasResponses ? "disabled" : ""}>
        <option value="text" ${q.question_type === "text" ? "selected" : ""}>Text</option>
        <option value="multiple_choice" ${
            q.question_type === "multiple_choice" ? "selected" : ""
        }>Multiple Choice</option>
        <option value="yes_no" ${q.question_type === "yes_no" ? "selected" : ""}>Yes/No</option>
        <option value="rating" ${q.question_type === "rating" ? "selected" : ""}>Rating</option>
      </select>
      <label class="block">
        <input type="checkbox" class="questionRequired mr-2" ${q.required ? "checked" : ""} ${
            hasResponses ? "disabled" : ""
        }/>Required
      </label>
      <div class="questionOptions ${q.question_type === "multiple_choice" ? "" : "hidden"} space-y-4">
        <div class="optionList space-y-2">
          ${(q.options || [])
              .map(
                  (opt) =>
                      `<input type="text" class="optionText input-base" value="${opt.option_text}" ${
                          hasResponses ? "disabled" : ""
                      }/>`
              )
              .join("")}
        </div>
        ${
            hasResponses
                ? ""
                : '<button type="button" class="addOption px-2 py-1 text-sm bg-gray-200 rounded-xl">+ Add Option</button>'
        }
      </div>
    `;

        container.appendChild(question);

        const typeSelect = question.querySelector(".questionType");
        const optionsDiv = question.querySelector(".questionOptions");
        const optionList = question.querySelector(".optionList");
        const addOptionBtn = question.querySelector(".addOption");

        if (!hasResponses) {
            typeSelect.addEventListener("change", () => {
                optionsDiv.classList.toggle("hidden", typeSelect.value !== "multiple_choice");
            });

            if (addOptionBtn) {
                addOptionBtn.addEventListener("click", () => {
                    const input = document.createElement("input");
                    input.type = "text";
                    input.placeholder = "Option text";
                    input.className = "optionText input-base";
                    optionList.appendChild(input);
                });
            }
        }
    }
} catch (err) {
    console.error("Failed to load survey:", err);
    alert("Error loading survey. Try again later.");
    window.location.href = "/surveys";
}
