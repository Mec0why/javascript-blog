{
  const templates = {
    articleLink: Handlebars.compile(
      document.querySelector('#template-article-link').innerHTML
    ),
    tagLink: Handlebars.compile(
      document.querySelector('#template-tag-link').innerHTML
    ),
    authorLink: Handlebars.compile(
      document.querySelector('#template-author-link').innerHTML
    ),
    tagCloudLink: Handlebars.compile(
      document.querySelector('#template-tag-cloud-link').innerHTML
    ),
  };

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
    optArticleTagsSelector = '.post-tags .list',
    optCloudClassCount = 5,
    optCloudClassPrefix = 'tag-size-',
    optTagsListSelector = '.tags.list',
    optAuthorsListSelector = '.authors.list';

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

      /*const linkHTML =
        '<li><a href="#' +
        articleId +
        '"><span>' +
        articleTitle +
        '</span></a></li>';*/

      const linkHTMLData = { id: articleId, title: articleTitle };
      const linkHTML = templates.articleLink(linkHTMLData);

      html = html + linkHTML;
    }

    titleList.innerHTML = html;

    const links = document.querySelectorAll('.titles a');
    for (let link of links) {
      link.addEventListener('click', titleClickHandler);
    }
  };

  generateTitleLinks();

  const calculateTagsParams = function (tags) {
    const params = {
      max: 0,
      min: 9999999,
    };

    for (let tag in tags) {
      if (tags[tag] > params.max) {
        params.max = tags[tag];
      }
      if (tags[tag] < params.min) {
        params.min = tags[tag];
      }
    }

    return params;
  };

  const calculateTagClass = function (count, params) {
    const normalizedCount = count - params.min;
    const normalizedMax = params.max - params.min;
    const percentage = normalizedCount / normalizedMax;
    const classNumber = Math.floor(percentage * (optCloudClassCount - 1) + 1);
    return optCloudClassPrefix + classNumber;
  };

  const generateTags = function () {
    let allTags = {};

    const articles = document.querySelectorAll(optArticleSelector);

    for (let article of articles) {
      const tagWrappers = article.querySelector(optArticleTagsSelector);

      let html = '';

      const articleTags = article.getAttribute('data-tags');

      const articleTagsArray = articleTags.split(' ');

      for (let tag of articleTagsArray) {
        /*const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';*/
        const linkHTMLData = { id: tag, title: tag };
        const linkHTML = templates.tagLink(linkHTMLData);

        html = html + linkHTML;

        if (!allTags[tag]) {
          allTags[tag] = 1;
        } else {
          allTags[tag]++;
        }
      }
      tagWrappers.innerHTML = html;
    }
    const tagList = document.querySelector(optTagsListSelector);

    const tagsParams = calculateTagsParams(allTags);

    /* let allTagsHTML = ''; */
    const allTagsData = { tags: [] };

    for (let tag in allTags) {
      /*allTagsHTML +=
        '<li><a href="#tag-' +
        tag +
        '"' +
        ' class="' +
        calculateTagClass(allTags[tag], tagsParams) +
        '">' +
        tag +
        '</a></li>';*/

      allTagsData.tags.push({
        tag: tag,
        count: allTags[tag],
        className: calculateTagClass(allTags[tag], tagsParams),
      });
    }

    tagList.innerHTML = templates.tagCloudLink(allTagsData);
    console.log(allTagsData);
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

  const calculateAuthorsParams = function (authors) {
    const params = {
      max: 0,
      min: 9999999,
    };

    for (let author in authors) {
      if (authors[author] > params.max) {
        params.max = authors[author];
      }
      if (authors[author] < params.min) {
        params.min = authors[author];
      }
    }

    return params;
  };

  const generateAuthors = function () {
    let allAuthors = {};

    const articles = document.querySelectorAll(optArticleSelector);

    for (let article of articles) {
      const authorWrappers = article.querySelector(optArticleAuthorSelector);

      let html = '';

      const author = article.getAttribute('data-author');

      /* const linkHTML = '<a href="#author-' + author + '">' + author + '</a>';*/
      const linkHTMLData = { id: author, title: author };
      const linkHTML = templates.authorLink(linkHTMLData);

      html = html + linkHTML;

      if (!allAuthors[author]) {
        allAuthors[author] = 1;
      } else {
        allAuthors[author]++;
      }

      authorWrappers.innerHTML = 'by ' + html;
    }
    const authorList = document.querySelector(optAuthorsListSelector);

    const authorsParams = calculateAuthorsParams(allAuthors);

    let allAuthorsHTML = '';

    for (let author in allAuthors) {
      allAuthorsHTML +=
        '<li><a href="#author-' +
        author +
        '"' +
        ' class="' +
        calculateTagClass(allAuthors[author], authorsParams) +
        '">' +
        author +
        '</a>' +
        ' (' +
        allAuthors[author] +
        ')' +
        '</li>';
    }

    authorList.innerHTML = allAuthorsHTML;
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
