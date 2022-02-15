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

  const generateTags = function () {
    const articles = document.querySelectorAll(optArticleSelector);

    for (let article of articles) {
      const tagWrappers = article.querySelector(optArticleTagsSelector);

      let html = '';

      const articleTags = article.getAttribute('data-tags');

      const articleTagsArray = articleTags.split(' ');

      for (let tag of articleTagsArray) {
        const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';

        html = html + linkHTML;
      }

      tagWrappers.innerHTML = html;
    }
  };

  generateTags();
}
