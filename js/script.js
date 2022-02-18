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

  const generateTitleLinks = function (customSelector = '') {
    const titleList = document.querySelector(optTitleListSelector);

    titleList.innerHTML = '';

    const articles = document.querySelectorAll(
      optArticleSelector + customSelector
    );

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

  const tagClickHandler = function (event) {
    event.preventDefault();

    const clickedElement = this;

    const href = clickedElement.getAttribute('href');

    const tag = href.replace('#tag-', '');

    const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');

    for (let activeTag of activeTags) {
      activeTag.classList.remove('active');
    }

    const hrefLinks = document.querySelectorAll('a[href="' + href + '"]');

    for (let hrefLink of hrefLinks) {
      hrefLink.classList.add('active');
    }

    generateTitleLinks('[data-tags~="' + tag + '"]');
  };

  const addClickListenersToTags = function () {
    const links = document.querySelectorAll('.post-tags .list a');
    for (let link of links) {
      link.addEventListener('click', tagClickHandler);
    }
  };

  addClickListenersToTags();

  const optArticleAuthorSelector = '.post-author';

  const generateAuthors = function () {
    const articles = document.querySelectorAll(optArticleSelector);

    for (let article of articles) {
      const authorWrappers = article.querySelector(optArticleAuthorSelector);

      let html = '';

      const articleAuthors = article.getAttribute('data-author');

      const linkHTML =
        '<a href="#author-' + articleAuthors + '">' + articleAuthors + '</a>';

      html = html + linkHTML;

      authorWrappers.innerHTML = 'by ' + html;
    }
  };

  generateAuthors();

  const authorClickHandler = function (event) {
    event.preventDefault();

    const clickedElement = this;

    const href = clickedElement.getAttribute('href');

    const author = href.replace('#author-', '');

    const activeAuthors = document.querySelectorAll(
      'a.active[href^="#author-"]'
    );

    for (let activeAuthor of activeAuthors) {
      activeAuthor.classList.remove('active');
    }

    const hrefLinks = document.querySelectorAll('a[href="' + href + '"]');

    for (let hrefLink of hrefLinks) {
      hrefLink.classList.add('active');
    }

    generateTitleLinks('[data-author="' + author + '"]');
  };

  const addClickListenersToAuthors = function () {
    const links = document.querySelectorAll('.post p a');
    for (let link of links) {
      link.addEventListener('click', authorClickHandler);
    }
  };

  addClickListenersToAuthors();
}
