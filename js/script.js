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

  const tagClickHandler = function (event) {
    /* prevent default action for this event */
    event.preventDefault();

    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;

    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');
    console.log(href);

    /* make a new constant "tag" and extract tag from the "href" constant */

    const tag = clickedElement.innerHTML;
    console.log(tag);

    /* find all tag links with class active */

    const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');
    console.log(activeTags);

    /* START LOOP: for each active tag link */
    /* remove class active */
    /* END LOOP: for each active tag link */

    for (let activeTag of activeTags) {
      activeTag.classList.remove('active');
    }

    /* find all tag links with "href" attribute equal to the "href" constant */

    const hrefLinks = document.querySelectorAll('a[href="' + href + '"]');
    console.log(hrefLinks);

    /* START LOOP: for each found tag link */
    /* add class active */
    /* END LOOP: for each found tag link */

    for (let hrefLink of hrefLinks) {
      hrefLink.classList.add('active');
      console.log(hrefLink);
    }

    /* execute function "generateTitleLinks" with article selector as argument */

    generateTitleLinks(optArticleSelector);
    console.log(generateTitleLinks);
  };

  const addClickListenersToTags = function () {
    /* find all links to tags */

    const links = document.querySelectorAll('.post-tags .list a');
    for (let link of links) {
      link.addEventListener('click', tagClickHandler);
      console.log(link);
    }

    /* START LOOP: for each link */
    /* add tagClickHandler as event listener for that link */
    /* END LOOP: for each link */
  };

  addClickListenersToTags();
}
