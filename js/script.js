{
  const titleClickHandler = function (event) {
    event.preventDefault();
    const clickedElement = this;

    const activeLinks = document.querySelectorAll('.titles a.active');

    for (let activeLink of activeLinks) {
      activeLink.classList.remove('active');
    }

    clickedElement.classList.add('active');

    const activeArticles = document.querySelectorAll('.posts article.active');

    for (let activeArticle of activeArticles) {
      activeArticle.classList.remove('active');
    }

    const articleSelector = clickedElement.getAttribute('href');

    const targetArticle = document.querySelector(articleSelector);

    targetArticle.classList.add('active');
  };

  const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles',
    optArticleTagsSelector = '.post-tags .list';

  const generateTitleLinks = function () {
    const titleList = document.querySelector(optTitleListSelector);

    titleList.innerHTML = '';

    const articles = document.querySelectorAll(optArticleSelector);

    let html = '';

    for (let article of articles) {
      const articleId = article.getAttribute('id');

      const articleTitle = article.querySelector(optTitleSelector).innerHTML;

      const linkHTML =
        '<li><a href="#' +
        articleId +
        '"><span>' +
        articleTitle +
        '</span></a></li>';

      html = html + linkHTML;
    }

    titleList.innerHTML = html;

    const links = document.querySelectorAll('.titles a');
    for (let link of links) {
      link.addEventListener('click', titleClickHandler);
    }
  };

  generateTitleLinks();

  function generateTags() {
    /* find all articles */

    const articles = document.querySelectorAll(optArticleSelector);

    /* START LOOP: for every article: */

    let html = '';

    for (article of articles) {
      /* find tags wrapper */

      const tagWrappers = article.querySelector(optArticleTagsSelector);

      /* make html variable with empty string */

      /* get tags from data-tags attribute */

      const articleTags = article.getAttribute('data-tags');
      console.log(articleTags);

      /* split tags into array */
      /* START LOOP: for each tag */
      /* generate HTML of the link */
      /* add generated code to html variable */
      /* END LOOP: for each tag */
      /* insert HTML of all the links into the tags wrapper */
      /* END LOOP: for every article: */
    }
  }

  generateTags();
}
