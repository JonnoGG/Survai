import { redirectIfNotLoggedIn } from "./auth.js";
import { apiFetch } from "./api.js";

await redirectIfNotLoggedIn();

const renderSurveys = (surveys) => {
    const surveyContainer = document.querySelector("#surveyContainer");
    for (const survey of surveys) {
        const a = document.createElement("a");
        a.href = `/surveys/${survey.id}`;
        a.className = "p-4 flex items-center justify-between hover:bg-gray-200 block";

        const contentDiv = document.createElement("div");

        // Title
        const title = document.createElement("h3");
        title.className = "font-semibold text-lg";
        title.textContent = survey.title;

        // Metadata
        const meta = document.createElement("p");
        meta.className = "text-sm text-violet-600";

        const created = new Date(survey.created_at).toLocaleDateString();
        const responses = survey.responses_count ?? 0;
        const questions = survey.questions_count ?? 0;

        meta.textContent = `${created} · ${questions} question${
            questions !== 1 ? "s" : ""
        } · ${responses} response${responses !== 1 ? "s" : ""}`;

        contentDiv.appendChild(title);
        contentDiv.appendChild(meta);
        a.appendChild(contentDiv);
        surveyContainer.appendChild(a);
    }
};

try {
    const res = await apiFetch("/surveys/all", {
        method: "GET"
    });

    if (!res.ok) {
        throw new Error("Failed to fetch surveys.");
    }

    const data = await res.json();
    console.log(data);

    renderSurveys(data.data.surveys);
} catch (err) {
    console.error("Error loading surveys: ", err);
}
