{
  const titleClickHandler = function (event) {
    event.preventDefault();
    const clickedElement = this;

    const activeLinks = document.querySelectorAll(".titles a.active");

    for (let activeLink of activeLinks) {
      activeLink.classList.remove("active");
    }

    clickedElement.classList.add("active");

    const activeArticles = document.querySelectorAll(".posts article.active");

    for (let activeArticle of activeArticles) {
      activeArticle.classList.remove("active");
    }

    const articleSelector = clickedElement.getAttribute("href");

    const targetArticle = document.querySelector(articleSelector);

    targetArticle.classList.add("active");
  };

  const links = document.querySelectorAll(".titles a");

  for (let link of links) {
    link.addEventListener("click", titleClickHandler);
  }

  const optArticleSelector = ".post",
    optTitleSelector = ".post-title",
    optTitleListSelector = ".titles";

  const generateTitleLinks = function () {
    /* remove contents of titleList */

    const titleList = document.querySelector(optTitleListSelector);

    titleList.innerHTML = "";

    /* for each article */
    /* get the article id */
    /* find the title element */
    /* get the title from the title element */
    /* create HTML of the link */
    /* insert link into titleList */
  };

  generateTitleLinks();
}
