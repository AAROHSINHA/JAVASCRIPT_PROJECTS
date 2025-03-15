const api_key = "______________________________"; // fill
const newsBoxes: NodeListOf<HTMLElement> =
  document.querySelectorAll(".news-box");
const navOptions = document.querySelector(
  ".nav-options ul"
) as HTMLUListElement;

const current_selected_mapping = new Map<number, string>([
  [1, "cricket"],
  [2, "finance"],
  [3, "politics"],
]);

interface Article {
  source: {
    id: string | null;
    name: string;
  };
  author: string | null;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
}

interface apiResult {
  status: string;
  articles: Article[];
}
// NOTE THAT INTERFACES do not get compiled in js
window.addEventListener("load", () => fetchData("cricket"));
function fetchData(query: string): void {
  const api_path = `https://newsapi.org/v2/everything?q=indian%20${query}&apiKey=${api_key}&pageSize=4`;
  const api_request = fetch(api_path);
  api_request
    .then((response) => response.json()) // .json() is a method that returns a promise
    .then((final_data: apiResult) => {
      const articles_data: apiResult = {
        status: "ok",
        articles: final_data.articles,
      };
      displayNews(articles_data.articles);
    })
    .catch((error) => {
      console.error("Error fetching data:", error); // In case of any error
    });
}

function displayNews(articles: Article[]): void {
  articles.forEach((article, index) => {
    const { source, author, title, description, url, urlToImage } = article;
    const { id, name } = source;
    const element = newsBoxes[index];
    const html = `
        <div class="image">
          <img src="${urlToImage}" alt="Description of the image">
</div>
        <div class="content">
          <h3 class="title">
            ${title}
          </h3>
          <p class="description">
            ${description}
          </p>
          <p class="author">${author}</p>
          <a href="${url}">READ MORE</a>
        </div>
    `;
    element.insertAdjacentHTML("afterbegin", html);
  });
}

// toggle logic
navOptions.addEventListener("click", (e) => {
  const target = e.target as HTMLElement;
  if (target && target.tagName.toLowerCase() == "li") {
    const query = target.getAttribute("query");
    let query_index: number = 1;
    if (query) {
      query_index = Number.parseInt(query);
    }
    const category: string | undefined =
      current_selected_mapping.get(query_index);
    if (typeof category === "string") {
      fetchData(category);
    } else {
      console.log(undefined);
    }
  }
});
